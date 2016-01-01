angular.module('droem')
.controller('SyncCtrl', function($scope, $http, $cordovaBarcodeScanner, Diary) {
  function callback(scan_result, my_ip) {
      var interface_array = scan_result.text.split("\n");
      alert(JSON.stringify(scan_result));
      alert(my_ip);

      interface_array.forEach(function(int) {
        var int_ip = getIP(int);
        var int_subnet = int_ip.substring(0, int_ip.lastIndexOf("."))
        var my_subnet = my_ip.substring(0, my_ip.lastIndexOf("."));

        alert("my: " + my_subnet + " int:" + int_subnet);
        //alert("int_ip: " + int_ip + "\nint_subnet: " + int_subnet + "\nmy_subnet: " + my_subnet);

        if(int_subnet === my_subnet) {
          var url = encodeURI("https://" + int_ip + ":3000/");

          Diary.get_all().then(function(result) {
            $http.post(url + 'sync', result).then(function(response) {
              var data = response.data;

              alert(data);

              data.forEach(function(entry) {
                Diary.save(entry);
              });

              showSyncDone();
            }, function(response) {
              $scope.failure = JSON.stringify(response);
              showSyncFailure();
            });
          });
        } else {
          showSyncFailure();
        }
      });
    }

    function getIP(interface_desc) {
      return interface_desc.split(",")[1];
    }

    function showSyncDone() {
      alert("Done!");
    }

    function showSyncFailure() {
      alert("Failure!\n" + JSON.stringify($scope.failure));
    }

    $scope.sync = function() {
      console.log("sync");

      $cordovaBarcodeScanner.scan().then(
          function (result) {
            networkinterface.getIPAddress(
              function (ip) {
                callback(result, ip);
            });
          },
          function (error) {
              alert("Scanning failed: " + error);
          }
       );
    };
});
