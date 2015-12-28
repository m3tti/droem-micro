// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('droem', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.diary', {
    url: '/diary',
    views: {
      'tab-diary': {
        templateUrl: 'templates/tab-diary.html',
        controller: 'DiaryCtrl'
      }
    }
  })
  .state('tab.diary-detail', {
      url: '/diary/:id',
      views:{
        'tab-diary-detail': {
            templateUrl: 'templates/tab-diary-detail.html',
            controller: 'DiaryEntryCtrl'
        }
      } 
  })

  .state('tab.technique', {
      url: '/technique',
      views: {
        'tab-technique': {
          templateUrl: 'templates/tab-technique.html',
          controller: 'TechniqueCtrl'
        }
      }
    })
    .state('tab.technique-wbtb', {
      url: '/technique/wbtb',
      views: {
        'tab-technique-wbtb': {
          templateUrl: 'templates/technique-wbtb.html',
          controller: 'WbtbCtrl'
        }
      }
    })
    .state('tab.technique-fild', {
        url: '/technique/fild',
        views: {
            'tab-technique-fild': {
                templateUrl: 'templates/technique-fild.html',
                controller: 'FildCtrl'
            } 
        }
    })
    .state('tab.technique-rythmnapping', {
        url: '/technique/rythm',
        views: {
            'tab-technique-rythm': {
                templateUrl: 'templates/technique-rythm.html',
                controller: 'RythmCtrl'
            }
        }
    })

  .state('tab.sync', {
    url: '/sync',
    views: {
        'tab-sync': {
            templateUrl: 'templates/tab-sync.html',
            controller: 'SyncCtrl'
        }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/diary');

});
