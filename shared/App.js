import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Main, Landing, Logo } from "./containers";
import { RedirectWithStatus } from "./components";

const App = (props) => {
  return (
    <Logo>
      <Switch>
        <Route path="/prod/:teamId" render={({ match }) => (
          <Main relPath={match.path} relURL={match.url} />
        )} />
      <Route path="/prod" render={() => {
        console.log(!props.authorized)
        return !props.authorized 
          ? <Landing clientId={props.clientId} />
          : <RedirectWithStatus 
              status={302}
              from="/prod"
              to="/prod/teamId/info"
            />
      }} />
      </Switch>
    </Logo>
  );
}
const mapStateToProps = (state) => {
  console.log(state)
  return state;
}
export default connect(mapStateToProps)(App)