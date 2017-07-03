import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Main, Landing, Logo } from "./components";

export default (props) => {
  console.log(props)
  return (
    <Logo>
      <Switch>
        <Route path="/prod/:fillerParam/:teamId" render={({ match }) => (
          <Main relPath={match.path} relURL={match.url} />
        )} />
      <Route path="/prod/:fillerParam" render={(prop) => {
        return prop.match.params.fillerParam === 'install'
          ? <Landing clientId={props.clientId} />
          : <Redirect to="/prod/fillerParam/teamId/info"/>
      }} />
      </Switch>
    </Logo>
  );
}
