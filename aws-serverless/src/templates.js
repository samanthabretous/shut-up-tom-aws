import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';

export const renderTemplate = (mountMeImFamous, bundleLocation, styleLocation) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Shut Up To</title>
		<link rel="stylesheet" href=${styleLocation}>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script src=${bundleLocation} defer></script>
  </head>
  <body>
      <div id="root">${mountMeImFamous}</div>
  </body>
</html>`;