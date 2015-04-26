'use strict';

angular.module('transmedApp')

.controller('MainCtrl', function ($scope, $log, ngDialog) {

  $scope.videos = [
    {'title' : 'video 1', 'question' : 'question 1'},
    {'title' : 'video 2', 'question' : 'question 2'}
  ];

  // initial action button, open the first modal
  $scope.openDefault = function (dataVideo) {

    ngDialog.open({
      // url from index.html at the root
      template: 'app/main/modal/modal1.html',
      plain: false,
      controller: 'FirstPopupCtrl',
      className: 'ngdialog-theme-default',
      data: dataVideo,
      closeByEscape: false,
      closeByDocument: false,
      showClose: false,
      cache: false
    });

  };

});