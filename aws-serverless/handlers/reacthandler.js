import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router, matchPath } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import sourceMapSupport from 'source-map-support';
import { retrieveTeam } from '../src/oauth.js';
import { renderTemplate } from '../src/templates.js';
import App from '../../shared/App';
import reducer from '../../redux/reducer'

// slack authorization tokens
const client = {
  id: process.env.CLIENT_ID || "169193513941.181075192628",
  secret: process.env.CLIENT_SECRET
};
sourceMapSupport.install();


//server side react rendering
export const renderReact = (location, context,dataObj, bundle, style) => {
  let store = createStore(reducer)

  const mountMeImFamous = renderToString((
    <Provider store={store}>
      <Router context={context} location={location}>
        <App />
      </Router>
    </Provider>
  ));
  const preloadedState = Object.assign({}, store.getState(), dataObj)
  store = createStore(reducer, preloadedState)
  const finalState = store.getState();
  console.log("finalState", finalState)
  return renderTemplate(mountMeImFamous, finalState, bundle, style)
}

export const landing = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    body: renderReact('/prod', {}),
  });
};
