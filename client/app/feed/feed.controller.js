'use strict';

angular.module('transmedApp')
	.controller('FeedCtrl', function ($scope, $http, $log, TweetService){

		TweetService.getTweets(
			function(data){
				$scope.datas = data;
			},
			function(error){
				$scope.error = error;
			}
		);


		var bearerToken = function(){
		    var consumerKey = encodeURIComponent('dXQ5VccrbKbQVvFFuDR1igBxi');
		    var consumerSecret = encodeURIComponent('oNcCuayrTLcx1cmn9F1OVmo19p3i0AIOtUFdYaloVhN79UZymj');
		    var credentials = btoa(consumerKey + ':' + consumerSecret);

		    return credentials;
		};

		$log.debug('Basic ' + bearerToken());

	});