angular.module('droem')
.controller('WildCtrl', function($rootScope, $scope, $timeout, $cordovaLocalNotification, $cordovaNativeAudio) {

    $cordovaNativeAudio
        .preloadComplex('wild_end', 'audio/wild_beep.mp3', 1, 1)
        .then(function (msg) {
          console.log(msg);
        }, function (error) {
          console.error(error);
        });

    function wildTimeout() {
      return 30000;
    }

    function playWakeUpSound() {
      $rootScope.wildCount += 1;
      $cordovaNativeAudio.play('wild_end');

      if($rootScope.wildCount <= 60) {
        $rootScope.wildTimeout = $timeout(playWakeUpSound, wildTimeout());
      }
    }

    $scope.toggleWILD = function() {
      $rootScope.wild = !$rootScope.wild;
      if($rootScope.wild) {
        $rootScope.wildCount = 0;
        $rootScope.wildTimeout = $timeout(playWakeUpSound, wildTimeout());
      } else {
        $timeout.cancel($rootScope.wildTimeout);
        $cordovaNativeAudio.stop('wild_end');
      }
    };
});
