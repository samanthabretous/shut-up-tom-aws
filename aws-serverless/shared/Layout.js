import React from 'react';

const Layout = ({ content, bundleLocation, styleLocation }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Shut Up To</title>
      <link rel="stylesheet" href={styleLocation} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src={bundleLocation} defer></script>
    </head>
    <body>
        <div id="reactContainer" />
        <div id="reactHelloContainer"
            dangerouslySetInnerHTML={ {__html: content} } />
    </body>
  </html>
);

export default Layout;
