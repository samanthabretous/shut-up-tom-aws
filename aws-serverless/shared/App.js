import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Main, Landing, Logo } from "./components";

export default (props) => {
  return (
    <Logo>
      <Switch>
        <Route path="/prod/:install/:teamId" render={(props) => (
            <Main relPath={props.match.path} relURL={props.match.url} />
        )} />
        <Route path="/prod/:install" render={(prop) => <Landing clientId={props.clientId} />} />
      </Switch>
    </Logo>
  );
}
