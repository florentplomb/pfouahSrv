'use strict';

angular.module('appToiletteApp')
  .controller('MainCtrl', function ($scope, $document, $rootScope, $http, $window,$timeout) {



    console.log('inCtrl');
    $scope.score = 0;

    $rootScope.inAction = false;
    $scope.go = false;

    $scope.counter = 5;
    var stopped;

    $http({
        method: 'GET',
        url: 'Http://localhost:9000/api/things'
      }).success(function (data){
        
        $scope.users = data;
      }).error(function (data){
        errorCallback(data);
    }); 

  

    $document.on('keyup', function(){
      if(!$rootScope.inAction && $scope.go){
              $scope.countdown();
        $rootScope.inAction = true;
      }else if($scope.go){
         $scope.$apply(function() {
        $scope.score++;

      });
      }
     
      
    })
    //timeout function
    //1000 milliseconds = 1 second
    //Every second counts
    //Cancels a task associated with the promise. As a result of this, the //promise will be resolved with a rejection.  
    $scope.countdown = function() {
        $rootScope.inAction = true;
       
        stopped = $timeout(function() {
           
         $scope.counter--; 

         if ($scope.counter === 0) {
          $rootScope.inAction = false;
         
          $scope.go = false;

          if (!$scope.isPseudoOk) {
             $http({
              method: 'PUT',
              url: 'http://localhost:9000/api/things/' + $scope.pseudoId,
              data: {
                "pseudo": angular.lowercase($scope.pseudo),
                "score": $scope.score
              }
              }).success(function (data){
                $scope.users.update(data);
              }).error(function (data){
                errorCallback(data);
            });
          }else{

          $http({
              method: 'POST',
              url: 'http://localhost:9000/api/things',
              data: {
                "pseudo": $scope.pseudo,
                "score": $scope.score
              }
            }).success(function (data){
              $scope.users.push(data);
            }).error(function (data){
              errorCallback(data);
          });
          };

          return false;
         }; 
         $scope.countdown();   
        }, 1000);
        
      };
       
    $scope.retry = function(){
      $scope.counter = 5;
      // $rootScope.inAction = true;
      $scope.go = true;
      $scope.score = 0;
    }

    $scope.check = function(pseudo){
      console.log(pseudo);
      $scope.isPseudoOk = true;
      angular.forEach($scope.users,function(value,index){
         
         var pseudoToCheck = angular.lowercase(value.pseudo);
         console.log(pseudoToCheck);
         if (pseudo === pseudoToCheck) {
           $scope.isPseudoOk = false;
           
           $scope.pseudoId = value._id;
           // console.log($scope.pseudoId);
         };
      });

      $scope.pseudo = pseudo;
      
    }
        
   

    

  });
