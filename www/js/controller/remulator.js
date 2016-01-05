angular.module('droem')
.controller('RemulatorCtrl', function($scope, $rootScope, $timeout, $cordovaFlashlight, $cordovaDevice, $ionicPopup) {
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
            flash(0);
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
        // Keep screen awake on IOS
        if($cordovaDevice.getPlatform() === "iOS") {
          window.plugins.insomnia.keepAwake();
        }
        $scope.showAlert();

        $rootScope.remulatorTimeout = $timeout(function() {
          flash(0);
        }, 3600000 * $rootScope.data.remulatorSleepEnd);
      }
      else {
        // Disable screen awake
        if($cordovaDevice.getPlatform() === "iOS") {
          window.plugins.insomnia.allowSleepAgain();
        }

        $timeout.cancel($rootScope.remulatorTimeout);
        $cordovaFlashlight.switchOff().then(
            function (success) {},
            function (error) { /* error */ });
      }
    };

    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: '!!! iOS Hack !!!',
        template: 'Make it dark',
        cssClass: 'darkPopup'
      });
    };

    init();
});
