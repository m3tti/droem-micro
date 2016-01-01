angular.module('droem')
.controller('WbtbCtrl', function($rootScope, $scope, $timeout, $cordovaLocalNotification, $cordovaNativeAudio) {
    function init() {
      if(!$rootScope.wbtbInitialized || typeof $rootScope.wbtbInitialized === "undefined") {
        $rootScope.wbtbInitialized = true;
        $rootScope.wbtb = false;
        $cordovaNativeAudio
            .preloadComplex('wakeup', 'audio/ocean.mp3', 1, 1)
            .then(function (msg) {
              console.log(msg);
            }, function (error) {
              console.error(error);
            });

        $rootScope.data = {
          wakeupTime: 4.5
        };
      }
    }

    function wakeupCall() {
      if($rootScope.wbtb) {
          //wake up long mp3
          $cordovaNativeAudio.loop('wakeup');

          $cordovaLocalNotification.schedule({
            id: 1,
            title: "Aufwachen!",
            message: "Jetzt bitte 30 Minuten wach bleiben!",
            icon: "bw.png"
          });
          $rootScope.$on('$cordovaLocalNotification:click',
          function (event, notification, state) {
            if (notification.id == 1) {
              $timeout(function() {
                $cordovaNativeAudio.stop('wakeup');
                $rootScope.wbtb = false;
              }, 500);
            }
          });
      }
    }

    $scope.toggleWBTB = function() {
      $rootScope.wbtb = !$rootScope.wbtb;
      if($rootScope.wbtb) {
        // Sleep for 4.5 Hours
        //$rootScope.timeout = $timeout(wakeupCall, 500);
        $rootScope.wbtbTimeout = $timeout(wakeupCall, 3600000 * $rootScope.data.wakeupTime);
      } else {
        $timeout.cancel($rootScope.wbtbTimeout);
        $cordovaNativeAudio.stop('wakeup');
      }
    };

    init();
});
