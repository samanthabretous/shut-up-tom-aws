import React from "react";

const Landing = (props) => (
  <a
    className="button__slack"
    href={`https://slack.com/oauth/authorize?&client_id=${props.clientId}&scope=commands,bot,incoming-webhook,channels:history`}
  >
    <img
      alt="Add to Slack"
      height="40"
      width="139"
      src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
    />
  </a>
)

export default Landing;
