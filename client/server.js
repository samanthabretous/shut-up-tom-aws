const path = require('path');
const express = require('express');
const app = express();
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router, matchPath } from 'react-router-dom';
import App from './app/shared/App.js';

const staticPath = path.join(__dirname, './app/build');
app.use(express.static(staticPath));
import { createReact } from '../aws-serverless/handlers/slackhandler';

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'app/index.html'))
// })

app.get('*', (req, res) => {
  let markup = '';
  let status = 200;

  // if (process.env.UNIVERSAL) {
    const context = {};
    // markup = renderToString(
    //   <Router location={req.url} context={context}>
    //     <App authorized={true}/>
    //   </Router>,
    // );
    // console.log(req.url)
    // console.log(markup)
    // context.url will contain the URL to redirect to if a <Redirect> was used
    console.log(context)
    if (context.url) {
      return res.redirect(302, context.url);
    }

    if (context.is404) {
      status = 404;
    }
  // }

  return res.status(status).send(createReact(req.url, context, 'bundle.js', 'css/style.min.css', {}, true));
});


app.listen(3000, () => {
  console.log('Shut Up tom client is listening to port 3000');
});
