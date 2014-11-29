angular.module('gyldendal.filters')
  .filter('reportRange', function() {
    return function (objects, range) {
      var filtered_list = [];
      if(range) {
        for (var i = 0; i < objects.length; i++) {
          var one_day = 24*60*60*1000;
          var today = new Date().getTime();

          var last_modified = new Date(objects[i].content.from).getTime();

          var diffDays = Math.round(Math.abs((today - last_modified)/(one_day)));

          if (diffDays < last_modified) {
            filtered_list.push(objects[i]);
          }
        }
        return filtered_list;
      } else {
        return objects;
      }

    }
  });