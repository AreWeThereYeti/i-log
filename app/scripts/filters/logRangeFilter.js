angular.module('gyldendal.filters', [])
  .filter('logRange', function() {
    return function (objects, range) {
      var filtered_list = [];
      if(range) {
        for (var i = 0; i < objects.length; i++) {
          var two_days_ago = new Date().getTime() - range * 86400000;

          // objects[i].timestamp should match the data format for logs
          var last_modified = new Date(objects[i].timestamp * 1000).getTime();
          if (two_days_ago <= last_modified) {
            filtered_list.push(objects[i]);
          }
        }
        return filtered_list;
      } else {
        return objects;
      }

    }
  });