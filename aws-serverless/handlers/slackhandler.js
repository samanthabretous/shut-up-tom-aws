import https from 'https';
import React from 'react';
import sourceMapSupport from 'source-map-support';
import { WebClient } from '@slack/client';
import { storeTeam, retrieveTeam } from '../src/oauth.js';
import Bot from '../src/bot.js';
import { renderReact } from './reacthandler';

// slack authorization tokens
const client = {
	id: process.env.CLIENT_ID || "169193513941.181075192628",
	secret: process.env.CLIENT_SECRET
};
sourceMapSupport.install();

const bundleLocation = 'https://s3.amazonaws.com/dev.shut-up-tom.com/bundle.js';
const styleLocation = 'https://s3.amazonaws.com/dev.shut-up-tom.com/style.min.css';

export const authorized = (event, context, callback) => {
	const code = event.queryStringParameters.code;
	https.get(`https://slack.com/api/oauth.access?client_id=${client.id}&client_secret=${client.secret}&code=${code}`, response => {
		var body = '';
		response.on('data', chunk => body += chunk);
		response.on('end', () => {
			const jsonBody = JSON.parse(body);
			storeTeam(jsonBody)
				.catch(error => console.log(error));

			// remove sensitive data before sending to client
			delete jsonBody.access_token;
			delete jsonBody.bot;

			callback(null, {
				statusCode: 200,
				headers: {
					'Content-Type': 'text/html',
					// 'Location': `${reactLocation}`,
					'Set-Cookie': `team_id=${jsonBody.team_id}`
				},
				body: renderReact('/prod/authorized', { status: 302 }, { authorized: true, team: jsonBody }),
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
