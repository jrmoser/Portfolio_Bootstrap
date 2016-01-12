(function () {
	'use strict';

	angular.module('filters', [
			"pascalprecht.translate"
		])
		.filter('uppercaseFirstLetter', uppercaseFirstLetter)
		.config(translator);

	function uppercaseFirstLetter() {
		return function (input) {
			input = input || '';
			var out = input[0].toUpperCase();
			for (var i = 1; i < input.length; i++) {
				out += input[i].toLowerCase();
			}
			return out;
		};
	}

	translator.$inject = ['$translateProvider'];

	function translator($translateProvider) {
		$translateProvider.translations('en', {
			TITLE: 'Todo Lists',
			HOME: 'Home',
			INFO: 'About',
			LANG: 'Change Language:',
			ARCHIVEDTAB: 'Archived Lists',
			ARCHIVEDTABDETAILS: 'Archived Lists:',
			HIGH: 'High',
			MED: 'Med',
			LOW: 'Low',
			ADD: 'Add',
			LISTTITLE: 'Todo for ',
			HOWTO: 'If you need to change an item, or a list name, just click on it from the list view, and you will be able to edit it',
			CREDIT: 'Todo List App by Jarod Moser',
			HOMEDETAILS: 'The Home page will only display High priority items',
			HOMETITLE: 'Todo Lists High Priority',
			ADDLIST: 'Add List',
			ADDITEM: 'Add Item',
			SORT: 'Sort By',
			DATE: 'Date Added',
			PRIORITY: 'Priority',
			SHOWARCHIVED: 'Show Archived Items'
		});
		$translateProvider.useSanitizeValueStrategy('escape');
		$translateProvider.preferredLanguage('en');
	}

}());