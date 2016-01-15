/**
 * Created by jarodmoser on 12/11/15.
 */
(function () {
	'use strict';

	angular.module('listsController', [])
		.controller('listsController', listsController);

	listsController.$inject = ['$state', 'listService'];

	function listsController($state, listService) {

		// list everything
		var lc = this;
		lc.addList = addList;
		lc.removeList = removeList;
		lc.changeLanguage = changeLanguage;
		lc.lists = listService.lists;
		lc.index = listService.index;
		// define functions
		function addList(listName) {
			if (listName === undefined) {
				return;
			}

			listService.addList(listName);

			lc.listName = undefined;

			//wrapping the $state.go function in another function makes it possible to add list name from the nav bar
			setTimeout(function () {
				$state.go('^.list', {listIndex: lc.index});
				lc.index = listService.index;
				}, 1
			);
		}

		function removeList(listName) {
			listService.removeList(listName);
			lc.lists = listService.lists;
		}

		// change language, if the about tab gets more functionality, move this to another controller

		function changeLanguage(lang) {
			listService.changeLanguage(lang);
		}
	}

}());
