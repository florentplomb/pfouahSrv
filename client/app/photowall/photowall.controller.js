'use strict';

angular.module('transmedApp')
	.controller('WallCtrl', function ($scope, $http, $log, StaticService, ApiService, localStorageService){
		$scope.error = '';

		// Local storage functions
	  	function addItem(key, val) {
	   		return localStorageService.set(key, val);
	  	};

	   	function getItem(key) {
	   		return localStorageService.get(key);
	  	};

	  	$scope.getItem = function(key) {
	  		return localStorageService.get(key);
	  	};

	  	// function removeItem(key) {
   		// 		return localStorageService.remove(key);
  		// }

	  	// Page loading
		ApiService.getUsers(
			function(data){
				$scope.datas = data;

				for (var i = $scope.datas.length - 1; i >= 0; i--) {
					$scope.datas[i].imgUrl = 'http://pfouah2015.herokuapp.com/api/images/' + data[i].imgId._id;
					// $log.debug($scope.datas[i].imgUrl);
				
				}

				
			},
			function(error){
				$scope.error = error;
			}
		);

		// Get code at page loading if doesn't exist previously
		if (getItem('code') === null) {
			ApiService.getCode(
				function(data){
					addItem('code', data.code);
				},
				function(error){
					$scope.error = error;
				}
			);
		};

		$scope.likePlayer = function(photo){
			var res = getItem(photo._id);
			var code = getItem('code');

			if(res === null){
				if (code !== null) {
					addItem(photo._id, photo._id);

					$http({
						method: 'GET',
						url: 'http://pfouah2015.herokuapp.com/api/limitLikes'
					}).success(function (data){
						
						console.log(data);
						console.log(photo.imgId._id);
						var vote = {"like": "p", "check": data.code}

						$http({
							method: 'POST',
							url: 'http://pfouah2015.herokuapp.com/api/images/' +photo.imgId._id + '/liked',
							data: vote
						}).success(function (data){
							

							photo.imgId.like ++;
							console.log(data);
						}).error(function (data){
							console.log(data);
						});	

					}).error(function (data){
						errorCallback(data);
					});	

					console.log('ok');
				}else{
					$scope.error = 'Vous n\'avez pas les permissions requises pour voter. Veuillez recharger la page.';
				}

			}else{
				$scope.error = 'Vous avez déjà voté pour cette image auparavant!';
			}

			$scope.marginStyle = {
			    'margin-bottom' : '0px'
			};
		};

		$scope.dislikePlayer = function(photo){
			var res = getItem(photo._id);
			var code = getItem('code');

			if(res === null){
				if (code !== null) {
					addItem(photo._id, photo._id);

					$http({
						method: 'GET',
						url: 'http://pfouah2015.herokuapp.com/api/limitLikes'
					}).success(function (data){
						
						console.log(data);
						console.log(photo.imgId._id);
						var vote = {"like": "n", "check": data.code}

						$http({
							method: 'POST',
							url: 'http://pfouah2015.herokuapp.com/api/images/' +photo.imgId._id + '/liked',
							data: vote
						}).success(function (data){
							photo.imgId.like --;
							console.log(data);
						}).error(function (data){
							console.log(data);
						});	

					}).error(function (data){
						errorCallback(data);
					});	

					console.log('ok');
				}else{
					$scope.error = 'Vous n\'avez pas les permissions requises pour voter. Veuillez recharger la page.';
				}

			}else{
				$scope.error = 'Vous avez déjà voté pour cette image auparavant!';
			}
		};
	});