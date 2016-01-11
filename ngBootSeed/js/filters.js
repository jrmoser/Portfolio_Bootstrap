(function () {
	'use strict';

	angular.module('filters', [])
		.filter('uppercaseFirstLetter', uppercaseFirstLetter);

	function uppercaseFirstLetter(){
		return function (input){
			input = input || '';
			var out = input[0].toUpperCase();
			for (var i = 1; i < input.length; i++){
				out += input[i].toLowerCase();
			}
			return out;
		};
	}
}());