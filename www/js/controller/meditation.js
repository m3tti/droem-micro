angular.module('droem')
.controller('MeditationCtrl', function($rootScope, $scope, $timeout, $cordovaLocalNotification, $cordovaNativeAudio) {
    function init() {
      if(!$rootScope.meditationInitialized || typeof $rootScope.meditationInitialized === "undefined") {
        $rootScope.meditationInitialized = true;
        $rootScope.meditation = false;
        $cordovaNativeAudio
            .preloadComplex('meditation_end', 'audio/gong.mp3', 1, 1)
            .then(function (msg) {
              console.log(msg);
            }, function (error) {
              console.error(error);
            });
            
        $rootScope.data = {
          meditationEnd: 10
        };
      }
    }

    function playWakeUpSound() {
      $cordovaNativeAudio.play('meditation_end');
      $rootScope.meditation = false;
    }

    $scope.toggleWBTB = function() {
      $rootScope.meditation = !$rootScope.meditation;
      if($rootScope.meditation) {
        $rootScope.meditationTimeout = $timeout(playWakeUpSound, 60000 * $scope.data.meditationEnd);
      } else {
        $timeout.cancel($rootScope.meditationTimeout);
        $cordovaNativeAudio.stop('meditation_end');
      }
    };

    init();
});
