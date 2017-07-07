const path = require('path');
const express = require('express');
const app = express();
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router, matchPath } from 'react-router-dom';
import App from '../shared/App';
import { createReact } from '../aws-serverless/handlers/slackhandler';

const staticPath = path.join(__dirname, '../client/app/build');
console.log(__dirname)
console.log(staticPath)
app.use(express.static(staticPath));

app.get('*', (req, res) => {
  console.log(req.url);
  if(req.url === '/style.min.css') {
    console.log("enter")
    return res.sendFile(path.join(__dirname, './app/build/style.min.css'))
  }
  if(req.url === '/bundle.js') {
    return res.sendFile(path.join(__dirname, './app/build/bundle.js'))
  }
  let status = 200;
  const context = {};
  // console.log(markup)
  // context.url will contain the URL to redirect to if a <Redirect> was used
  console.log(context)
  if (context.url) {
    return res.redirect(302, context.url);
  }

  if (context.is404) {
    status = 404;
  }

  const markup = createReact(req.url, context, '\"bundle.js\"', '\"style.min.css\"', {}, true)
  console.log(markup)
  return res.status(status).send(markup);
});

app.listen(3000, () => {
  console.log('Shut Up tom client is listening to port 3000');
});
