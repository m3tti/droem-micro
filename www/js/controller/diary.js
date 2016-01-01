angular.module('droem')
.controller('DiaryCtrl', function($scope, Diary) {
    function refresh() {
      Diary.get_all().then(function(result) {
        console.log(result);
        $scope.entries = result;
      });
    }

    $scope.searchTerm = "";

    $scope.$on('$ionicView.enter', function() {
       refresh();
    })

    $scope.remove = function(entry) {
      Diary.remove(entry).then(function(result) {
        refresh();
      });
    };

    refresh();
});
