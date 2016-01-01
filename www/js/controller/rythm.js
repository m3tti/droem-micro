angular.module('droem')
.controller('RythmCtrl', function($scope, $rootScope, $timeout, $cordovaNativeAudio) {
    function init() {
      if(!$rootScope.rythmInitialized || typeof $rootScope.rythmInitialized === "undefined") {
        $rootScope.rythmInitialized = true;

        $cordovaNativeAudio
          .preloadComplex('beep', 'audio/9_beeps.mp3', 1, 1)
          .then(function (msg) {
            console.log(msg);
          }, function (error) {
            console.error(error);
          });

        $rootScope.data = {
          rythmSleepEnd: 1
        };
      }
    }

    function randomTimeout() {
      return (Math.floor(Math.random() * 4) + 1) * 300000;
    }

    function playBeeps() {
      if($rootScope.napping) {
        $cordovaNativeAudio.play('beep');

        $rootScope.rythmTimeout = $timeout(function() {
          playBeeps();
        }, randomTimeout());
      }
    }

    $scope.toggleNapping = function() {
      $rootScope.napping = !$rootScope.napping;
      if($rootScope.napping) {
        $rootScope.rythmTimeout = $timeout(function() {
          playBeeps();
        }, 3600000 * $rootScope.data.rythmSleepEnd);
      }
      else {
        $timeout.cancel($rootScope.rythmTimeout);
        $cordovaNativeAudio.stop('beep');
      }
    };

    init();
});
