import path from 'path';
import express from 'express';
import https from 'https';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router, matchPath } from 'react-router-dom';
import App from '../shared/App';
import { createReact } from '../aws-serverless/handlers/slackhandler';
const bundle = '\"bundle.js\"';
const style = '\"style.min.css\"';

const app = express();
const staticPath = path.join(__dirname, '../client/app/build');
app.use(express.static(staticPath));

app.get('/auth', (req, res) => {
  https.get(`https://slack.com/api/oauth.access?client_id=${process.env.SLACK_ID}&client_secret=${process.env.SLACK_SECRET}&code=${req.query.code}`, response => {
    var body = '';
    console.log("response====")
    response.on('data', chunk => body += chunk);
    response.on('end', () => {
      const jsonBody = JSON.parse(body);
      console.log("jsonBody", jsonBody)

      // remove sensitive data before sending to client
      delete jsonBody.access_token;
      delete jsonBody.bot;

      const markup = createReact('/prod', { status: 302 }, bundle, style, jsonBody, false);
      res.send(markup)
    });
  });
})


app.get('*', (req, res) => {
  let status = 200;
  const context = {};
  // console.log(markup)
  // context.url will contain the URL to redirect to if a <Redirect> was used
  console.log("context",context)
  if (context.url) {
    return res.redirect(302, context.url);
  }

  if (context.is404) {
    status = 404;
  }

    console.log("url", req.url)
  const routes = ['/prod', '/prod/:teamId'];

  const match = routes.reduce((acc, route) => matchPath(req.url, route, { exact: true }) || acc, null);

  if (!match) {
    res.status(404).send('No Match');
    return;
  }
  console.log("match========", match)

  const markup = createReact(req.url, context, bundle, style, {authorized: false});
  // console.log(markup);
  res.status(status).send(markup);


});

app.listen(3000, () => {
  console.log('Shut Up tom client is listening to port 3000');
});
