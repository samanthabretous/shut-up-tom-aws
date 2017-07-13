# Shut Up Tom

### Have you ever want to yell out in rage because your office environment is too loud for no reason. Well now you don't have to. Shut Up Tom will do the dirty work for you. A friendly 'hey shut up' Slack message will be sent to all your coworkers when the noise levels are unbearable. With the option to go into party mode, library mode or modes in between, Shut Up Tom will put your mind to ease.

## Getting started

* [Create an AWS account](https://aws.amazon.com/free/) if haven't got one already
* [Install Serverless](https://serverless.com/framework/docs/providers/aws/guide/installation/) and [configure your AWS credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
* [Create your Slack app](https://api.slack.com/slack-apps#create-app) and configure its credentials by creating a `local.yml` file:

	```
	# Local variables -- DO NOT COMMIT!

	dev:
	  slack:
	    clientId: "<Your Dev Slack App Client ID>"
	    clientSecret: <Your Dev Slack App Client Secret>

	production:
	  slack:
	    clientId: "<Your Production Slack App Client ID>"
	    clientSecret: <Your Production Slack App Client Secret>
	```

  Note that the client id must be quoted otherwise it is interpreted as a number. Do not commit this file. It is already Git ignored.
* Deploy the server to AWS Lambda:

	```
	serverless deploy
	```

  Make a note of the endpoints output once it has deployed, e.g.:

	```
	endpoints:
	  GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod
	  GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/authorized
	  POST - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/event
	```

* Go to your [Slack app](https://api.slack.com/apps) settings and update them to point to your server:
  * Select 'OAuth & Permissions' and in the 'Redirect URL(s)' box paste the `authorized` endpoint
  * Select 'Event Subscriptions' and in the 'Request URL' box paste the `event` endpoint
