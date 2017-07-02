export class Bot {
	constructor(web) {
		this.web = web;
	}
	process(event) {
		console.log("Bot file this.web", this.web);
		console.log("Bot File: event", event);
		this.web.reactions.add(":smile:", {channel: event.channel, timestamp: event.event_ts})
			.catch(error => console.log(`Error adding Slack reaction: ${error}`));
	}
};
