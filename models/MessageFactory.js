(function()
{
	'use strict';

	var self = {};

	var rtm = null;

	var message = null;

	self.init = function(rtmClient)
	{
		if (!rtm) {
			rtm = rtmClient;
		}
	};

	self.sendMessage = function(slackMessage)
	{
		message = slackMessage;

		console.log('Message:', message);

		var user = rtm.dataStore.getUserById(message.user)
		var dm   = rtm.dataStore.getDMByName(user.name);

		rtm.sendMessage(user.name + ' ぺろぺろぺろぺろ', dm.id);
	};

	module.exports.MessageFactory = self;
})();