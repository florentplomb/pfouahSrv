'use strict';

angular.module('transmedApp')
	.factory('TweetService', function($http, TwitterUrl){
		return{
			getTweets : function(callback, errorCallback){
				$http({
					method: 'GET',
					// https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2
					url: TwitterUrl + 'statuses/user_timeline.json?screen_name=eve_status&count=2'
				}).success(function (data){
					callback(data);
				}).error(function (data){
					errorCallback(data);
				});
			}
		};
	});