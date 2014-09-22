angular.module('gyldendal.services')
		.factory('DateService', [function() {
			 var date = {
				year: [ 2014, 2015, 2016, 2017,2018,2019,2020],
				month : [
					{
						val : 1,
						month :'Januar'
					},
					{
						val : 2,
						month :'Februar'
					},
					{
						val : 3,
						month :'Marts'
					},
					{
						val : 4,
						month :'April'
					},
					{
						val : 5,
						month :'Maj'
					},
					{
						val : 6,
						month :'Juni'
					},
					{
						val : 7,
						month :'Juli'
					},
					{
						val : 8,
						month :'August'
					},
					{
						val : 9,
						month :'September'
					},
					{
						val : 10,
						month :'Oktober'
					},
					{
						val : 11,
						month :'November'
					},
					{
						val : 12,
						month :'December'
					}
				],
			day : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26 ,27, 28, 29, 30,31]
			};

			date.daysInMonth = function(month, year) {
				return new Date(year, month, 0).getDate();
			};

			return date;
		}]);