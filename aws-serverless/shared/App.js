import React from 'react';
import { Route } from 'react-router-dom';
import { Main, Landing, Logo } from "./components";

export default ({ team, clientId }) => {
  console.log(team);
  console.log(clientId);
  return (
    <Logo>
      <Route exact path="/" render={() => <Landing clientId={clientId} />} />
      <Route path="/:teamId" component={Main} />
    </Logo>
  );
}
