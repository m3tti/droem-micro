angular.module('droem')
.controller('RealityCtrl', function($rootScope, $scope, $timeout, $cordovaLocalNotification) {
    function randomTimeout() {
      return 3600000;
      //return 1000;
    }

    function realityCheck() {
      var currentTime = new Date();

      if(currentTime.getHours() < 22 && currentTime.getHours() > 7) {
        $cordovaLocalNotification.schedule({
          title: "Bist du wach?",
          message: "Schaue dich um? Kannst du Texte zwei mal lesen ohne das sich was verändert? Wie bist du hier her gekommen?",
          icon: "droem.png"
        });
      }
      $rootScope.realityTimeout = $timeout(realityCheck, randomTimeout());
    }

    $scope.toggleRealityCheck = function() {
      $rootScope.realityCheckIsRunning = !$rootScope.realityCheckIsRunning;

      if($rootScope.realityCheckIsRunning) {
        $rootScope.realityTimeout = $timeout(realityCheck, randomTimeout());
      } else {
        $timeout.cancel($rootScope.realityTimeout);
      }
    }
});
