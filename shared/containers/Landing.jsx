import React from "react";
import { SlackButton } from '../components';

const Landing = (props) => (
  <section className="landing_page">
    <h1>Reinventing friendships</h1>
    <p>No longer yell at your coworkers for being loud. Let us do that for you.</p>
    <SlackButton clientId={props.clientId}/>
    <a style={{background: 'red', color: 'white'}} href="/prod/auth?code=">Fake Slack Auth</a>
  </section>
)

export default Landing;
