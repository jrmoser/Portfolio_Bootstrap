/**
 * Created by jarodmoser on 12/11/15.
 */
(function () {
	'use strict';

	angular.module('listsController', [])
		.controller('listsController', listsController);

	listsController.$inject = ['$state'];

	function listsController($state) {

		// list everything
		var lc = this;
		lc.listName = '';
		lc.addList = addList;
		lc.removeList = removeList;

		// makes global var accessible in this controller
		lc.lists = lists;

		// define functions
		function addList(listName) {
			if (listName === undefined){
				return;
			}

			lists.push({
				name: listName,
				items: []
			});


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
