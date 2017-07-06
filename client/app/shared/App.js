import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Main, Landing, Logo } from "./containers";
import { RedirectWithStatus } from "./components";

export default (props) => {
  console.log(props);
  return (
    <Logo>
      <Switch>
        <Route path="/prod/:page/:teamId" render={({ match }) => (
          <Main relPath={match.path} relURL={match.url} />
        )} />
      <Route path="/prod/:page" render={() => {
        return !props.authorized 
          ? <Landing clientId={props.clientId} />
          : <RedirectWithStatus 
              status={302}
              from="/prod/landing"
              to="/prod/main/teamId/info"
            />
      }} />
      </Switch>
    </Logo>
  );
}
