import { render } from 'react-dom';
import React from 'react';
import App from '../../aws-serverless/shared/App';
import { BrowserRouter as Router } from 'react-router-dom';

render((
    <Router>
      <App team={window} clientId="169193513941.181075192628"/>
    </Router>
), document.getElementById('root'),
() => console.log("App rendered"));
