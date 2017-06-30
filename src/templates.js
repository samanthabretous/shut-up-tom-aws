import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import App from './App'

export const installTemplate = (clientId) =>
	`<!DOCTYPE html>
	<html>
		<head>
			<title>Shut Up Tom</title>
		</head>
		<body>
			<h1>Shut Up Tom</h1>
				${renderToString(<Router context={{}}>
												<App gists={"gists"} />
										</Router>)}
			<p>Click the button to add @shut-up-tom to Slack!</p>
			<a href="https://slack.com/oauth/authorize?scope=bot&client_id=${clientId}">
				<img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"/>
			</a>
		</body>
	</html>`;

export const authorizedTemplate = (renderMe) => `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Universal React Router 4 Demo</title>
        <style>
            body {
                font-family: Helvetica Neue, Arial, sans-serif;
                margin: 0;
            }
            html { box-sizing: border-box; }
            *, *:before, *:after { box-sizing: inherit; }
        </style>
    </head>
    <body>
        <div id="app">${renderToString(<Router context={{}}>
                        <App gists={gists} />
                    </Router>)}</div>
    </body>
</html>`;
