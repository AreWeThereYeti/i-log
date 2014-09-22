"use strict";

app.controller('LogMenubarCtrl', [ function () {
  //Save reference to controller in order to avoid reference soup
  var LogMenubar = this;

  //Test variable. If you see it when the app runs you are good to go
  LogMenubar.testVar = 'This is data from the menubar!';
}]);