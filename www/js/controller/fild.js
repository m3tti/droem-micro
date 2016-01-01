angular.module('droem')
.controller('FildCtrl', function($rootScope, $scope, $interval, $cordovaDeviceMotion, $cordovaNativeAudio) {
  $scope.z_axis = 0;
  $scope.count = 0;
  $rootScope.fildRunning = false;

  function init() {
    if(!$rootScope.fildInitialized || typeof $rootScope.fildInitialized === "undefined") {
      $cordovaNativeAudio
          .preloadComplex('wakeup', 'audio/ocean.mp3', 1, 1)
          .then(function (msg) {
            console.log(msg);
          }, function (error) {
            console.error(error);
          });

      $rootScope.data = {
        sensitivity: 1
      }
    }
  }

  function onSuccess(acceleration) {
    var gravity = $rootScope.data.sensitivity * 9.81;

    $scope.z_delta = Math.abs($scope.z_axis - (gravity * acceleration.z));

    $scope.z_axis = Math.abs(gravity * acceleration.z);

    checkDeltas();
  }

  function onError() {
    alert('onError!');
  }

  function checkDeltas() {
    if($scope.z_delta < 9.81) {
      $scope.count++;
    }
    else {
      $scope.count = 0;
      $cordovaNativeAudio.stop('wakeup');
    }

    if($scope.count == 10*10) {
      $cordovaNativeAudio.loop('wakeup');
    }
  }

  $scope.toggleFild = function() {
    $rootScope.fildRunning = !$rootScope.fildRunning;

    if($rootScope.fildRunning) {
      $rootScope.watchID = $interval(function() {
        $cordovaDeviceMotion.getCurrentAcceleration().then(onSuccess, onError);
      }, 100);
    } else {
      $interval.cancel($rootScope.watchID);
      $cordovaNativeAudio.stop('wakeup');
      $scope.count = 0;
    }
  };

  init();
});
