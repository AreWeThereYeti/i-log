angular.module('gyldendal.services')

  .service('statcalcservice', function(){

    // statistical helper functions
    // takes as input an array of numeric values and returns a float (highers/lowest/sum/average)

     var highest = function(val){
      var max = 0;
      for(var i= 0; i<val.length; i++){
        if(parseFloat(val[i])>max){
          max = parseFloat(val[i]);
        }
      }
      return max;
    };

     var lowest = function(val){
      var min = 99999999;
      for(var i= 0; i<val.length; i++){
        if(parseFloat(val[i])<min){
          min = parseFloat(val[i]);
        }
      }
      return min;
    };

    var average = function(val){
      var sum = 0;
      for(var i= 0; i<val.length; i++){
        sum += parseFloat(val[i]);
      }
      return sum/val.length;
    };

     var sum = function(val){
      var sum = 0;
      for(var i= 0; i<val.length; i++){
        sum += parseFloat(val[i]);
      }
      return sum;
    };

    return{
      highest: highest,
      lowest: lowest,
      average: average,
      sum: sum
    };

  });
