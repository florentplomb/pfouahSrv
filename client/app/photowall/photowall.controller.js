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
					// $scope.datas[i].imgUrl = 'http://localhost:9000/api/images/' + data[i].imgId._id;
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

		 var fingerprint = new Fingerprint({
		       ie_activex: true,
		       screen_resolution: true,
		       canvas: true
		      }).get();
		      
		$scope.likePlayer = function(photo){
			var res = getItem(photo._id);
			

			


			if(res === null){
				if (fingerprint !== null) {
					addItem(photo._id, photo._id);


						var vote = {
					       "like": "p",
					       "check": fingerprint
					      }

					      
						$http({
							method: 'POST',
							// url: 'http://localhost:9000/api/images/' +photo.imgId._id + '/liked',
							url: 'http://pfouah2015.herokuapp.com/api/images/' +photo.imgId._id + '/liked',
							data: vote
						}).success(function (data){

							photo.imgId.like ++;
							
						}).error(function (data){
							
						});	

				

					
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
				if (fingerprint !== null) {
					addItem(photo._id, photo._id);

						var vote = {
					       "like": "n",
					       "check": fingerprint
					      }
						$http({
							method: 'POST',
							// url: 'http://localhost:9000/api/images/' +photo.imgId._id + '/liked',
							url: 'http://pfouah2015.herokuapp.com/api/images/' +photo.imgId._id + '/liked',
							data: vote
						}).success(function (data){
							

							photo.imgId.like --;
							
						}).error(function (data){
							
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