angular.module('gyldendalAppIlog').filter('customDate', function() {
    return function(text) {

        var filteredText;

        switch(text) {

            case 'datetime':
                filteredText = 'Dato og tid (dd:mm:yyyy, hh:mm)';
                break;

            case 'date':
                filteredText = 'Dato (dd:mm:yyyy)';
                break;

            case 'time':
                filteredText = 'Tid (hh:mm)';
                break;

        }

        return filteredText;

    };
});
