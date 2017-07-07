import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';

// const bundleLocation = 'https://s3.amazonaws.com/dev.shut-up-tom.com/bundle.js';
// const styleLocation = 'https://s3.amazonaws.com/dev.shut-up-tom.com/css/style.min.css';

export const renderTemplate = (mountMeImFamous, bundle, style) => `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Shut Up To</title>
  		<link rel="stylesheet" href=${style}>
  		<meta name="viewport" content="width=device-width, initial-scale=1.0">
  		<script src=${bundle} defer></script>
    </head>
    <body>
        <div id="root">${mountMeImFamous}</div>
    </body>
  </html>`;
