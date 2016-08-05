var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var config = require('./config.js').config;

// var token = process.env.SLACK_API_TOKEN || '';
// var rtm = new RtmClient(token, { logLevel: 'debug' });

var rtm = new RtmClient(config.SLACK_API_TOKEN, { logLevel: 'error' });

rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
	console.log('Message:', message);

	var user = rtm.dataStore.getUserById(message.user)
	var dm   = rtm.dataStore.getDMByName(user.name);

	rtm.sendMessage(user.name + ' ぺろぺろぺろぺろ', dm.id);
});

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded(reaction) {
	console.log('Reaction added:', reaction);
});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved(reaction) {
	console.log('Reaction removed:', reaction);
});

console.log("----- Slack bot START -----\n");