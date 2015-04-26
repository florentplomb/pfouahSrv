'use strict';
// https://zkillboard.com/api/kills/characterID/91706280/
// http://pfouah2015.herokuapp.com/api/users

angular.module('transmedApp')
	.factory('ApiService', function($http, ApiUrl){
		return{
			getScores : function(callback, errorCallback){
				$http({
					method: 'GET',
					url: ApiUrl + 'api/users/scores'
				}).success(function (data){
					callback(data);
				}).error(function (data){
					errorCallback(data);
				});
			},
		
			getUsers : function(callback, errorCallback){
				$http({
					method: 'GET',
					url: ApiUrl + 'api/users'
				}).success(function (data){
					callback(data);
					console.log(data);
				}).error(function (data){
					errorCallback(data);
				});				
			},

			getCode: function(callback, errorCallback){
				$http({
					method: 'GET',
					url: ApiUrl + 'api/limitLikes'
				}).success(function (data){
					callback(data);
				}).error(function (data){
					errorCallback(data);
				});	
			},

			likeImage: function(id, vote, callback, errorCallback){
				$http({
					method: 'POST',
					url: ApiUrl + 'api/images/' + id + '/liked',
					data: vote
				}).success(function (data){
					callback(data);
				}).error(function (data){
					errorCallback(data);
				});	
			}
		};
	})

	.factory('StaticService', function($http){
		return{
			getScores : function(callback, errorCallback){
				$http({
					method: 'GET',
					url: 'assets/json/users.scores.json'
				}).success(function (data){
					callback(data);
				}).error(function (data){
					errorCallback(data);
				});
			},

			postUser:function(user, callback, errorCallback){
				$http({
					method: 'PUT',
					url: 'assets/json/users.scores.json'
				}).success(function(data){
					callback(data);
				}).error(function(data){
					errorCallback(data);
				});
			},

			getUsers : function(callback, errorCallback){
				$http({
					method: 'GET',
					url: 'assets/json/users.json'
				}).success(function (data){
					callback(data);
				}).error(function (data){
					errorCallback(data);
				});				
			},

			getCode: function(callback, errorCallback){
				$http({
					method: 'GET',
					url: 'http://pfouah2015.herokuapp.com/api/limitLikes'
				}).success(function (data){
					// renvoie data.code = 'eai031429712519415eai03' par ex.
					callback(data);
				}).error(function (data){
					errorCallback(data);
				});	
			}
		};
	});