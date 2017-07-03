import AWS from 'aws-sdk';

const database = new AWS.DynamoDB.DocumentClient();
const teamTableName = process.env.TEAM_TABLE_NAME;

export const retrieveTeam = (teamId) => {
	const params = {
		TableName: teamTableName,
		Key: {
			teamId: teamId
		}
	};

	return new Promise((resolve, reject) => {
		database.get(params).promise()
			.then(result => resolve(result.Item.botAccessToken))
			.catch(error => reject(new Error(`Error retrieving OAuth access token: ${error}`)));
	});
};

export const storeTeam = (team) => {
	const params = {
		TableName: teamTableName,
		Item: {
			teamId: team.team_id,
			botAccessToken: team.bot.bot_access_token,
			teamName: team.team_name,
			webhook: team.incoming_webhook,
		}
	};

	return new Promise((resolve, reject) => {
		database.put(params).promise()
			.then(result => resolve())
			.catch(error => reject(new Error(`Error storing OAuth access token: ${error}`)));
	});
};
