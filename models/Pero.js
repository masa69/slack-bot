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
	var _ = require('lodash');

	var lists = config.peros;

	var message = null;
	var channel = null;

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
		if (!rtm) {
			rtm = obj.rtmClient;
		}

		var slackMessageObj = obj.slackMessageObj;

		checkText(slackMessageObj.text, function(res)
		{
			if (!res) {
				callback(false);
				return;
			}
			setMessage('呼んだ？ぺろぺろぺろぺろ');
			/**
			 * DM の場合
			 */
			// var user = rtm.dataStore.getUserById(slackMessageObj.user);
			// var dm   = rtm.dataStore.getDMByName(user.name);
			// setChannel(dm.id);

			/**
			 * チャンネルの場合
			 */
			setChannel(slackMessageObj.channel);
			callback(true);
		});
	};

	var checkText = function(text, callback)
	{
		var res = false;

		_.map(lists, function(value)
		{
			var reg = new RegExp(value, 'igm');
			if (reg.test(text)) {
				// console.log('まっち！');
				res = true;
			}
		});

		callback(res);
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

	var setChannel = function(slackChannel)
	{
		channel = slackChannel;
	};

	module.exports.Pero = self;
})();