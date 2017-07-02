import { minify } from 'html-minifier';
import onLambda from '../utils/onLambda';

export default function generateHTML(markup, serverState, is404) {

  /* THIS IS HORRIBLE !!! */

  // To be replaced with cloudfront AND process.env.CLIENT_BUNDLE_LOCATION
  const bundleLocation = 'https://s3-eu-west-1.amazonaws.com/aquest-client/';

  const serverStateNode = Object.keys(serverState).length ?
    `<script>window.STATE_FROM_SERVER=${JSON.stringify(serverState)}</script>` :
    '';

  const jsBundleLocation = onLambda ?
    bundleLocation + 'bundle.js' :
    require('../../../../dev_server/config.js').url + 'bundle.js';

  const cssBundleNode = onLambda ?
    `<link rel="stylesheet" href="${bundleLocation}bundle.css">` :
    '';

  // For APIG to modify the response statusCode. Until a better solution...
  const commentFor404 = is404 ? '<!-- 404 -->' : '';

  return minify(`<!DOCTYPE html>
  ${commentFor404}
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Aquest</title>
      ${cssBundleNode}
    </head>
    <body>
    <div id="root">${markup}</div>
    <script src="${jsBundleLocation}"></script>
    ${serverStateNode}
    </body>
  </html>`, {
    removeComments: false, // needed for 404s
    collapseWhitespace: true, // needed for 404s (APIG's regex '.*' does not match carriage returns, and '(.|\n)*' does't seem to work). Whitespaces should be css only.
    removeTagWhitespace: false, // 'true' is not HTML5 compliant :'( too bad for brandwidth
  });
}
