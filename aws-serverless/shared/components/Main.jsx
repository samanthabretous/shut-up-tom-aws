import React from 'react';
import { Route } from 'react-router-dom';
import { Dashboard } from "../components";

const Main = ({ pathname }) => (
  <div>
    <Route path={`${pathname}/dashboard`} component={Dashboard} />
  </div>
)

export default Main;
