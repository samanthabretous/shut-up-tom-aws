import https from 'https';
import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import sourceMapSupport from 'source-map-support';
import { WebClient } from '@slack/client';
import OAuth from '../src/oauth.js';
import { installTemplate, authorizedTemplate } from '../src/templates.js';
import Bot from '../src/bot.js';

const client = {
	id: process.env.CLIENT_ID,
	secret: process.env.CLIENT_SECRET
};
sourceMapSupport.install();
export const install = (event, context, callback) => {
	console.log(installTemplate);
	callback(null, {
		statusCode: 200,
		headers: {
			'Content-Type': 'text/html'
		},
		body: installTemplate(client.id)
	});
};

export const authorized = (event, context, callback) => {
	const code = event.queryStringParameters.code;

	https.get(`https://slack.com/api/oauth.access?client_id=${client.id}&client_secret=${client.secret}&code=${code}`, response => {
		var body = '';
		console.log("authorized==========",response)
		response.on('data', chunk => body += chunk);
		response.on('end', () => {
			const jsonBody = JSON.parse(body);
			OAuth.storeAccessToken(jsonBody.team_id, jsonBody.bot.bot_access_token)
				.catch(error => console.log(error));
		});
	});

	callback(null, {
		statusCode: 200,
		headers: {
			'Content-Type': 'text/html'
		},
		body: authorizedTemplate()
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
			OAuth.retrieveAccessToken(jsonBody.team_id)
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
