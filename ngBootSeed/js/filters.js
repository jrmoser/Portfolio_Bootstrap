(function () {
	'use strict';

	angular.module('filters', [
			"pascalprecht.translate",
			"ngCookies"
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

		// translation data

		var english = {
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
			NOITEMS: 'There are no items to show',
			ALLARCHIVED: 'All items are Archived',
			NOARCHIVED: 'No items are Archived',
			SHOWARCHIVED: 'Show Archived Items'
		};

		var spanish = {
			TITLE: 'Listas de Quehaceres',
			HOME: 'Inicio',
			INFO: 'Info',
			LANG: 'Cambia el Idioma:',
			ARCHIVEDTAB: 'Listas Archivadas',
			ARCHIVEDTABDETAILS: 'Listas Archivadas:',
			HIGH: 'Alto',
			MED: 'Med',
			LOW: 'Bajo',
			ADD: 'A\xf1\xe1delo',
			LISTTITLE: 'Quehacer para ',
			HOWTO: 'Si necesita cambiar un quehacer, o un nombre de la lista , haga clic sobre \xe9l desde la vista de lista, y podr\xe1 editarlo',
			CREDIT: 'Listas de Quehaceres creado por Jarod Moser',
			HOMEDETAILS: 'La p\xe1gina de inicio s\xf3lo mostrar\xe1 art\xcdculos de alta prioridad',
			HOMETITLE: 'Listas de Quehaceres de Alta Prioridad',
			ADDLIST: 'A\xf1\xe1de una Lista',
			ADDITEM: 'A\xf1\xe1de un Quehacer',
			SORT: 'Ordenar por',
			DATE: 'Fecha agregada',
			PRIORITY: 'Prioridad',
			NOITEMS: 'No hay quehaceres para mostrar',
			ALLARCHIVED: 'Todos los quehaceres son archivados',
			NOARCHIVED: 'No hay quehaceres que son archivados',
			SHOWARCHIVED: 'Mostrar Quehaceres Archivados'
		};

		var pigLatin = {
			TITLE: 'Odotay Istslay',
			HOME: 'Omehay',
			INFO: 'Aboutyay',
			LANG: 'Angechay Anguagelay:',
			ARCHIVEDTAB: 'Archivedyay Istslay',
			ARCHIVEDTABDETAILS: 'Archivedyay Istslay:',
			HIGH: 'Ighhay',
			MED: 'Edmay',
			LOW: 'Owlay',
			ADD: 'Addyay',
			LISTTITLE: 'Odotay orfay ',
			HOWTO: 'Ifyay youyay eednay otay angechay anyay itemyay, oryay ayay istlay amenay, ustjay ickclay onyay ityay omfray ethay istlay iewvay, andyay youyay illway ebay ableyay otay edityay ityay',
			CREDIT: 'Odotay Istlay Appyay Ybay Jarod Moser',
			HOMEDETAILS: 'Ethay Omehay agepay illway onlyyay isplayday Ighhay ioritypray itemsyay',
			HOMETITLE: 'Odotay Istslay Ighhay Ioritypray',
			ADDLIST: 'Addyay Istlay',
			ADDITEM: 'Addyay Itemyay',
			SORT: 'Ortsay Ybay',
			DATE: 'Ateday Addedyay',
			PRIORITY: 'Ioritypray',
			NOITEMS: 'Erethay areway onay itemsway otay owshay',
			ALLARCHIVED: 'Allway itemsway areway Archivedway',
			NOARCHIVED: 'Onay itemsway areway Archivedway',
			SHOWARCHIVED: 'Owshay Archivedyay Itemsyay'
		};


		$translateProvider
			.translations('en', english)
			.translations('sp', spanish)
			.translations('pl', pigLatin);
		$translateProvider.useSanitizeValueStrategy('escape');
		$translateProvider.preferredLanguage('en');
		$translateProvider.useLocalStorage();
	}

}());