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
		lc.listName = '';
		lc.addList = addList;
		lc.removeList = removeList;
		lc.lists = listService.lists;

		// define functions
		function addList(listName) {

			listService.addList(listName);

			lc.name = undefined;

			//wrapping the $state.go function in another function makes it possible to add list name from the nav bar
			setTimeout( function () {
					$state.go('^.list', {listIndex: lc.lists.length - 1});
				}, 1
			);
		}

		function removeList() {
			//this will remove a to do list
		}
	}

}());
