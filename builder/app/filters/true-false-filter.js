angular.module('gyldendalAppIlog').filter('trueFalse', function() {
    return function(text) {
        if (text) {
            return 'Ja';
        }
        return 'Nej';
    }
});
