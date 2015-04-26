'use strict';

angular.module('transmedApp')

// First modal configs & actions
.controller('FirstPopupCtrl', function ($scope, $log, ngDialog) {
  	
  	$scope.openSecond = function (dataVideo) {
    	ngDialog.close();

	   	ngDialog.open({
		    // url from index.html at the root
		    template: 'app/main/modal/modal2.html',
		    plain: false,
		    controller: 'SecondPopupCtrl',
		    className: 'ngdialog-theme-default',
		    data: dataVideo,
		    closeByEscape: false,
		    closeByDocument: false,
		    showClose: false,
		    cache: false
		});

  	};

})

// Second modal configs & actions
 .controller('SecondPopupCtrl', function ($scope, $log, ngDialog) {

 	$scope.feedback = '';

  	$scope.closeSecond = function () {
    	ngDialog.close();
  	};

  	$scope.submitForm = function (answer){

  		$log.debug(answer);

  		// answer control double check -> normally Angular prevents the answer to be posted
  		if (answer.length < 1 || answer.length >= 140) {
  			answer = undefined;
  			$scope.feedback = 'Il n\'y a rien à envoyer.';
  		}

  		ngDialog.close();
  	};

});