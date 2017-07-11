import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Main, Landing, Logo } from "./containers";
import { RedirectWithStatus } from "./components";

const App = (props) => {
  console.log(props)
  return (
    <Logo>
      <Switch>
        <Route path="/prod/team/:teamId" render={({ match }) => (
          <Main relPath={match.path} relURL={match.url} />
        )} />
        <Route path="/prod/:authorized" render={({ match }) => ( <RedirectWithStatus 
            status={302}
            from={match.url}
            to={`/prod/team/${props.team.team_id}/info`}
          /> 
        )}/>
        <Route path="/prod" render={() => (<Landing clientId={props.clientId} />)} />
      </Switch>
    </Logo>
  );
}
const mapStateToProps = (state) => {
  console.log(state)
  return state;
}
export default withRouter(connect(mapStateToProps)(App));
