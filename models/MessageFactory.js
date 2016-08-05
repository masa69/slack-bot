(function()
{
	'use strict';

	var self = {};

	// RtmClient
	var rtm = null;

	var _ = require('lodash');

	var messageModels = {
		Pero: require('./Pero.js').Pero,
	};


	self.init = function(rtmClient)
	{
		if (!rtm) {
			rtm = rtmClient;
		}
	};


	/**
	 * メッセージを送る
	 *
	 * @param object slackMessageObj
	 * @param function(boolean, string) callback(result, resultMessage)
	 */
	self.sendMessage = function(slackMessageObj, callback)
	{
		if (!slackMessageObj) {
			callback(false, 'ERROR: メッセージを受け取れませんでした');
			return;
		}
		console.log('Message:', slackMessageObj);

		selectModel(slackMessageObj, function(modelName)
		{
			if (messageModels[modelName] === undefined) {
				return;
			}
			var model = messageModels[modelName];

			var message = model.getMessage();
			var channel = model.getChannel();

			sendToSlack(message, channel, function(res, mes)
			{
				callback(res, mes);
			});
		});
	};


	/**
	 * メッセージの内容を見てモデルを選択する
	 *
	 * @param object slackMessageObj
	 * @param function(string) callback(modelName)
	 */
	var selectModel = function(slackMessageObj, callback)
	{
		_.map(messageModels, function(model, key)
		{
			var param = {
				rtmClient: rtm,
				slackMessageObj: slackMessageObj,
			};

			model.init(param, function(res)
			{
				if (!res) {
					return;
				}
				callback(key);
			});
		});
	};


	/**
	 * Slack にメッセージを送る
	 *
	 * @param string message
	 * @param string channel
	 * @param function(boolean, string) callback(result, resultMessage)
	 *
	 * DMしたい時:
	 * var user = rtm.dataStore.getUserById(slackMessageObj.user);
	 * var dm   = rtm.dataStore.getDMByName(user.name);
	 * dm.id を channel に指定する
	 */
	var sendToSlack = function(message, channel, callback)
	{
		if (!message || !channel) {
			callback(false, 'ERROR: invalid parameter');
			return;
		}
		rtm.sendMessage(message, channel, function messageSent() {
			callback(true, 'SUCCESS: channel message');
		});
	};


	module.exports.MessageFactory = self;
})();