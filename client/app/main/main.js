'use strict';

angular.module('transmedApp')
  .config(function ($stateProvider) {
    $stateProvider
      // .state('main', {
      //   url: '/',
      //   templateUrl: 'app/main/main.html',
      //   controller: 'MainCtrl'
      // })
      // .state('rankings', {
      // 	url: '/ranking',
      // 	templateUrl: 'app/ranking/ranking.html',
      // 	controller: 'RankingCtrl'
      // })
      .state('photowall',{
        url: '/',
        templateUrl: 'app/photowall/photowall.html',
        controller: 'WallCtrl'
      })
      // .state('partner', {
      //   url: '/partner',
      //   templateUrl: 'app/partner/partner.html',
      //   controller: 'PartnerCtrl'
      // })
      // .state('feed', {
      //   url: '/feed',
      //   templateUrl: 'app/feed/feed.html',
      //   controller: 'FeedCtrl'
      // });
  });