import path from 'path';
import express from 'express';
import axios from 'axios';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router, matchPath } from 'react-router-dom';
import App from '../shared/App';
import { renderReact } from '../aws-serverless/handlers/reacthandler';

const bundle = '\"/bundle.js\"';
const style = '\"/style.min.css\"';

const app = express();
const staticPath = path.join(__dirname, '../client/app/build');
app.use(express.static(staticPath));

app.get('/auth', (req, res) => {
  axios.get('https://slack.com/api/oauth.access', {
    params: {
      client_id: process.env.SLACK_ID,
      client_secret: process.env.SLACK_SECRET,
      code: req.query.code
    }
  })
  .then((response) => {
    console.log("response====")
    const markup = renderReact('/prod/auth?code', { status: 302 }, {team: {id: 'TZ54654'}, authorized: true}, bundle, style);
    res.send(markup)
  });
})


app.get('*', (req, res) => {
  let status = 200;
  const context = {};
  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    return res.redirect(302, context.url);
  }

  if (context.is404) {
    status = 404;
  }
  const routes = ['/prod', '/prod/main/:teamId/info', '/prod/:authorized'];

  const match = routes.reduce((acc, route) => matchPath(req.url, route, { exact: true }) || acc, null);

  if (!match) {
    res.status(404).send('No Match');
    return;
  }
  let dataObj = {}
  if(match.path === '/prod/:authorized') {
    dataObj = {team: {id: 'TZ54654'}, authorized: true}
  }
  console.log("server bundle", bundle)
  const markup = renderReact(req.url, context,dataObj, bundle, style);
  // console.log(markup);
  res.status(status).send(markup);


});

app.listen(3000, () => {
  console.log('Shut Up tom client is listening to port 3000');
});
