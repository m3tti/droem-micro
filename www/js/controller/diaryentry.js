angular.module('droem')
.controller('DiaryEntryCtrl', function($scope, $state, $stateParams, $ionicPopup, $timeout, $cordovaCamera, Diary, Enum) {
  $scope.techniques = Enum.technique_list;
  $scope.dream_types = Enum.dream_types;

  function refresh() {
    Diary.find($stateParams.id).then(function(entry) {
      console.log(entry);
      if(!entry) {
        $scope.entry = {};
      } else {
        $scope.entry = entry;
      }
    });
  }

  $scope.$on('$ionicView.enter', function() {
     refresh();
  });

  $scope.showTechniquesPopup = function() {
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      templateUrl: 'templates/popup-techniques.html',
      title: 'Angewendete Techniken',
      subTitle: 'Wähle bitte deine angewendeten Techniken aus.',
      scope: $scope,
      buttons: [
        {
          text: '<b>OK</b>',
          type: 'button-positive'
        }
      ]
    });
  };

  $scope.translate = Enum.translate;

  $scope.toggleSelection = function(technique) {
      if(typeof $scope.entry.techniques === "undefined") {
        $scope.entry.techniques = [];
      }
     var idx = $scope.entry.techniques.indexOf(technique);
     // is currently selected
     if (idx > -1) {
       $scope.entry.techniques.splice(idx, 1);
     }
     // is newly selected
     else {
       $scope.entry.techniques.push(technique);
     }
   };

   $scope.takePicture = function() {
     var options = {
       quality: 50,
       destinationType: Camera.DestinationType.DATA_URL,
       sourceType: Camera.PictureSourceType.CAMERA,
       allowEdit: true,
       encodingType: Camera.EncodingType.JPEG,
       //popoverOptions: CameraPopoverOptions,
       saveToPhotoAlbum: false,
       correctOrientation:false
     };

     $cordovaCamera.getPicture(options).then(function(imageData) {
       $scope.entry.image = "data:image/jpeg;base64," + imageData;
     }, function(err) {
       alert("error");
     });
   };

  $scope.save = function() {
    if(typeof $scope.entry.id === "undefined") {
      //$scope.entry.id = UUID.generate();
      $scope.entry.timestamp = new Date();
    }

    $scope.entry.modifiedAt = new Date();
    Diary.save($scope.entry).then(function(result) {
      $scope.entry = result;
      $state.go('tab.diary', {id: $scope.entry.id});
    });
  };

  refresh();
});
