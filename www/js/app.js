// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('droem', ['ionic', 'LocalForageModule', 'ngCordova'])

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
    cordova.plugins.backgroundMode.enable();
  });
})

.config(function($stateProvider, $urlRouterProvider, $localForageProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.transition('android');
  $ionicConfigProvider.tabs.style('standard').position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center').positionPrimaryButtons('left');


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
        'tab-diary': {
            templateUrl: 'templates/tab-diary-detail.html',
            controller: 'DiaryEntryCtrl'
        }
      }
  })
  .state('tab.diary-edit', {
      url: '/diary/edit/:id',
      views:{
        'tab-diary': {
            templateUrl: 'templates/tab-diary-edit.html',
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
        'tab-technique': {
          templateUrl: 'templates/technique-wbtb.html',
          controller: 'WbtbCtrl'
        }
      }
    })
    .state('tab.technique-fild', {
        url: '/technique/fild',
        views: {
            'tab-technique': {
                templateUrl: 'templates/technique-fild.html',
                controller: 'FildCtrl'
            }
        }
    })
    .state('tab.technique-rythmnapping', {
        url: '/technique/rythm',
        views: {
            'tab-technique': {
                templateUrl: 'templates/technique-rythm.html',
                controller: 'RythmCtrl'
            }
        }
    })
    .state('tab.technique-reality', {
        url: '/technique/reality',
        views: {
            'tab-technique': {
                templateUrl: 'templates/technique-reality.html',
                controller: 'RealityCtrl'
            }
        }
    })
    .state('tab.technique-meditation', {
        url: '/technique/meditation',
        views: {
            'tab-technique': {
                templateUrl: 'templates/technique-meditation.html',
                controller: 'MeditationCtrl'
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


  // Configure LocalForage
  $localForageProvider.config({
        driver      : localforage.WEBSQL, // if you want to force a driver
        name        : 'droem', // name of the database and prefix for your data, it is "lf" by default
        version     : 1.0, // version of the database, you shouldn't have to use this
        storeName   : 'droem', // name of the table
        description : 'The droem storage.'
    });
});
