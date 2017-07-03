import https from 'https';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router, matchPath } from 'react-router-dom';
import sourceMapSupport from 'source-map-support';
import { WebClient } from '@slack/client';
import { storeTeam, retrieveTeam } from '../src/oauth.js';
import { makeStaticMarkup } from '../src/utils.js';
import { renderTemplate } from '../src/templates.js';
import Bot from '../src/bot.js';
import { App } from '../shared';
const client = {
	id: process.env.CLIENT_ID,
	secret: process.env.CLIENT_SECRET
};
sourceMapSupport.install();
const createReact = (location, context) => {
	const mountMeImFamous = renderToString((
		<Router context={context} location={location}>
			<App clientId={client.id} />
		</Router>
	));
	return renderTemplate(mountMeImFamous)
}
export const install = (event, context, callback) => {
	callback(null, {
		statusCode: 200,
		headers: {
			'Content-Type': 'text/html'
		},
		body: createReact('/prod/install', {}),
	});
};

export const authorized = (event, context, callback) => {
	const code = event.queryStringParameters.code;
console.log("event", event);
	https.get(`https://slack.com/api/oauth.access?client_id=${client.id}&client_secret=${client.secret}&code=${code}`, response => {
		var body = '';
		console.log('response', response)
		response.on('data', chunk => body += chunk);
		response.on('end', () => {
			const jsonBody = JSON.parse(body);
			storeTeam(jsonBody)
				.catch(error => console.log(error));

			// remove sensitive data before sending to client
			delete jsonBody.access_token;
			delete jsonBody.bot;

			const reactLocation = `/prod/install/${jsonBody.team_id}/info`;
			callback(null, {
				statusCode: 200,
				headers: {
					'Content-Type': 'text/html',
					// 'Location': `${reactLocation}`,
					'Set-Cookie': `team_id=${jsonBody.team_id}`
				},
				body: createReact(reactLocation, {}),
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
			retrieveTeam(jsonBody.team_id)
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
