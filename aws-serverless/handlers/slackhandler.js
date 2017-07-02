import https from 'https';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router, matchPath } from 'react-router-dom';
import sourceMapSupport from 'source-map-support';
import { WebClient } from '@slack/client';
import { storeAccessToken, retrieveAccessToken } from '../src/oauth.js';
import { makeStaticMarkup } from '../src/utils.js';
import { renderTemplate } from '../src/templates.js';
import Bot from '../src/bot.js';
import { App } from '../shared';
const client = {
	id: process.env.CLIENT_ID,
	secret: process.env.CLIENT_SECRET
};
sourceMapSupport.install();

export const install = (event, context, callback) => {
	const mountMeImFamous = renderToString((
		<Router context={{}} location="/">
			<App clientId={client.id} />
		</Router>
	));
	console.log("event", event);
	callback(null, {
		statusCode: 200,
		headers: {
			'Content-Type': 'text/html'
		},
		body: renderTemplate(mountMeImFamous)
	});
};

export const authorized = (event, context, callback) => {
	const code = event.queryStringParameters.code;
console.log("context", context);
	https.get(`https://slack.com/api/oauth.access?client_id=${client.id}&client_secret=${client.secret}&code=${code}`, response => {
		var body = '';
		response.on('data', chunk => body += chunk);
		response.on('end', () => {
			const jsonBody = JSON.parse(body);
			storeAccessToken(jsonBody.team_id, jsonBody.bot.bot_access_token)
				.catch(error => console.log(error));

			// remove sensitive data before sending to client
			delete jsonBody.access_token;
			delete jsonBody.bot;
			console.log("jsonBody",jsonBody);

			var mountMeImFamous = renderToString((
				<Router context={{}} location={`/prod/install/${jsonBody.team_id}/info`}>
					<App team={jsonBody}/>
				</Router>
			));
			callback(null, {
				statusCode: 200,
				headers: {
					'Content-Type': 'text/html',
					'Set-Cookie': `team_id=${jsonBody.team_id}`
				},
				body: renderTemplate(mountMeImFamous)
			});
		});
	});

};

export const event = (event, context, callback) => {
	const jsonBody = JSON.parse(event.body);
	const response = {
		statusCode: 200
	};
	console.log("===============",jsonBody.type);
	switch (jsonBody.type) {
		case 'url_verification':
			response.headers = {
				'Content-Type': 'application/x-www-form-urlencoded'
			};
			response.body = jsonBody.challenge;
			console.log("+++++++++++++", response)
			break;

		case 'event_callback':
			console.log("============ event_callback", jsonBody.team_id)
			retrieveAccessToken(jsonBody.team_id)
				.then(botAccessToken => handleEvent(jsonBody.event, botAccessToken))
				.catch(error => console.log(error));
			break;
	}

	callback(null, response);
};

const handleEvent = (event, token) => {
	const bot = new Bot(new WebClient(token));

	switch (event.type) {
		case 'message':
			// ignore ourselves
			if (!(event.subtype && event.subtype === 'bot_message')) {
				bot.process(event);
			}
			break;
	}
};
