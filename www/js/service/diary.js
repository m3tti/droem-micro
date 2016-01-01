angular.module('droem')
.factory('Diary', function($localForage, $q) {
  function dateSort(a, b) {
    a = new Date(a.timestamp);
    b = new Date(b.timestamp)

    return a>b ? -1 : a<b ? 1 : 0;
  }

  return {
    save: function(entry) {
      if(!entry.id) {
        entry.id = UUID.generate();
      }
      return $localForage.setItem(entry.id, entry); //promise
    },
    remove: function(entry) {
      return $localForage.removeItem(entry.id); //promise
    },
    find: function(id) {
      return $localForage.getItem(id); //promise
    },

    get_all: function() {
      return $q(function(resolve, reject) {
        var items = [];
        $localForage.iterate(function(value, key, iterationNumber) {
          items.push(value);
        }).then(function(result) {
          items.sort(dateSort);

          resolve(items);
        });
      });
    }
  }
})
