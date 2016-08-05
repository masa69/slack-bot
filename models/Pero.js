/**
 * 特定のメッセージが含まれていたらペロペロするBOT
 */
(function()
{
	'use strict';

	var self = {};

	// RtmClient
	var rtm = null;

	var config = require('./../config.js').config;

	var lists = config.peros;

	var message = null
	var channel = null

	self.init = function(obj, callback)
	{
		if (!obj.rtmClient) {
			callback(false);
			return;
		}
		if (!obj.slackMessageObj) {
			callback(false);
			return;
		}

		rtm = obj.rtmClient;

		setMessage('ぺろぺろぺろぺろ');
		setChannel(obj.slackMessageObj);

		callback(true);
	};

	self.getMessage = function()
	{
		return message;
	};

	var setMessage = function(slackMessage)
	{
		message = slackMessage;
	};

	self.getChannel = function()
	{
		return channel;
	};

	var setChannel = function(slackMessageObj)
	{
		/**
		 * DM の場合
		 */
		// var user = rtm.dataStore.getUserById(slackMessageObj.user);
		// var dm   = rtm.dataStore.getDMByName(user.name);
		// channel = dm.id;

		/**
		 * チャンネルの場合
		 */
		channel = slackMessageObj.channel;
	};

	module.exports.Pero = self;
})();