angular.module('droem')
.controller('RemulatorCtrl', function($scope, $rootScope, $timeout, $cordovaFlashlight) {
    function init() {
      if(!$rootScope.remulatorInitialized || typeof $rootScope.remulatorInitialized === "undefined") {
        $rootScope.remulatorInitialized = true;

        $cordovaFlashlight.available().then(function(availability) {
          $scope.flashlightAvailable = true; // is available
        }, function () {
          $scope.flashlightAvailable = false;
          showErrorMsg("Flashlight not available");
        });

        $rootScope.data = {
          remulatorSleepEnd: 1,
          blinkTimes: 10,
          flashTimeout: 1
        };
      }
    }

    function randomTimeout() {
      return (Math.floor(Math.random() * 4) + 1) * 300000;
    }

    function flash(count) {
      if($rootScope.remulator) {
        if(count < $scope.data.blinkTimes) {
          $cordovaFlashlight.switchOn().then(function(success) {
            // Lights off after 1s
            $rootScope.remulatorTimeout = $timeout(function() {
              $cordovaFlashlight.switchOff().then(function(success) {
                // wait 1s to swich back on again
                $rootScope.remulatorTimeout = $timeout(function() {
                  flash(count+1);
                }, 1000 * $scope.data.flashTimeout);
              }, function(error) {});
            }, 1000 * $scope.data.flashTimeout);
          }, function(error) {});
        } else {
          $rootScope.remulatorTimeout = $timeout(function() {
            flash();
          }, randomTimeout());
        }
      }
    }

    function showErrorMsg(msg) {
      alert(msg);
    }

    $scope.toggleRemulator = function() {
      $rootScope.remulator = !$rootScope.remulator;
      if($rootScope.remulator) {
        $rootScope.remulatorTimeout = $timeout(function() {
          flash(0);
        }, 3600000 * $rootScope.data.remulatorSleepEnd);
      }
      else {
        $timeout.cancel($rootScope.remulatorTimeout);
        $cordovaFlashlight.switchOff().then(
            function (success) {},
            function (error) { /* error */ });

      }
    };

    init();
});
