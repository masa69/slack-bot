var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var config = require('./config.js').config;

var MessageFactory = require('./models/MessageFactory.js').MessageFactory;

// var token = process.env.SLACK_API_TOKEN || '';

/**
 * logLevel: 'debug', 'error'
 */
var rtm = new RtmClient(config.SLACK_API_TOKEN, { logLevel: 'error' });

MessageFactory.init(rtm);

rtm.start();

// BOTが参加しているチャンネルでメッセージのやりときがあった時に呼ばれる
rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
	MessageFactory.sendMessage(message, function(res, mes)
	{
		console.log(mes);
	});
});

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded(reaction) {
	console.log('Reaction added:', reaction);
});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved(reaction) {
	console.log('Reaction removed:', reaction);
});

console.log("----- Slack bot START -----\n");