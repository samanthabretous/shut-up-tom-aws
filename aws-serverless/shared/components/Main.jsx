import React from "react";
import { NavLink, Switch, Route } from 'react-router-dom';
import { CustomMessages, Dashboard, Info } from "../components";

const Main = (props) => (
  <div className="main-container">
    <aside className="sidebar">
      <nav>
        <NavLink className="link__dashboard" to={`${props.relURL}/dashboard`}><i className="fa fa-home fa-2x" aria-hidden="true"></i></NavLink>
        <NavLink className="link__info" to={`${props.relURL}/info`}><i className="fa fa-info fa-2x" aria-hidden="true"></i></NavLink>
        <NavLink className="link__custom-messages" to={`${props.relURL}/custom-messages`}><i className="fa fa-comments fa-2x" aria-hidden="true"></i></NavLink>
        <NavLink className="link__graph" to={`${props.relURL}/graph`}><i className="fa fa-signal fa-2x" aria-hidden="true"></i></NavLink>
        <NavLink className="link__schedule" to={`${props.relURL}/schedule`}><i className="fa fa-clock-o fa-2x" aria-hidden="true"></i></NavLink>
      </nav>
    </aside>
    <Switch>
      <Route path={`${props.relPath}/custom-messages`} component={CustomMessages}/>
      <Route path={`${props.relPath}/dashboard`} component={Dashboard}/>
      <Route path={`${props.relPath}/info`} component={Info}/>
    </Switch>
  </div>
)

export default Main;
