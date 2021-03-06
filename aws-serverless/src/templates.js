import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';

const bundleLocation = 'https://s3.amazonaws.com/dev.shut-up-tom.com/bundle.js';
const styleLocation = 'https://s3.amazonaws.com/dev.shut-up-tom.com/style.min.css';

export const renderTemplate = (mountMeImFamous, preloadedState, bundle, style) => {
  console.log("bundle", bundle )
return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Shut Up To</title>
  		<link rel="stylesheet" href=${style || styleLocation}>
  		<meta name="viewport" content="width=device-width, initial-scale=1.0">
  		<script src=${bundle || bundleLocation} defer></script>
    </head>
    <body>
      <div id="root">${mountMeImFamous}</div>
      <script>
        console.log('run template script')
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
    </body>
  </html>`};
