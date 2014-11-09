angular.module('gyldendal.filters')
  .filter('reportRange', function() {
    return function (objects, range) {
      var filtered_list = [];
      if(range) {
        for (var i = 0; i < objects.length; i++) {
          var two_days_ago = new Date().getTime() - range * 86400000;
          var last_modified = new Date(objects[i].content.from).getTime();
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