/**
 * Created by jarodmoser on 12/11/15.
 */
(function () {
	'use strict';

	angular.module('itemsController', [])
		.controller('itemsController', itemsController);

	itemsController.$inject = ['$location'];

	function itemsController($location) {

		// list everything
		var ic = this;
		ic.addItem = addItem;
		ic.removeItem = removeItem;
		ic.changePriority = changePriority;
		ic.listIndex = $location.url();
		ic.listIndex = ic.listIndex.substr(ic.listIndex.length - 1);

		// makes global var accessible in this controller
		ic.lists = lists;
		ic.itemsArray = ic.lists[ic.listIndex].items;

		// define functions
		function addItem(item, priority) {
			if (item === undefined) {
				return;
			}
			item = item.trim();
			if (item === ''){
				return;
			}

			ic.itemsArray.push({
				priority: priority,
				todoItem: item,
				done: false,
				dateAdded: new Date(),
				archived: false,
				dateArchived: '',
				deleted: false,
				editing: false
			});

			ic.item = undefined;
		}

		function removeItem(item) {
			item.deleted = !item.done;
			item.archived = item.done;
			lists[ic.listIndex].items = ic.itemsArray.filter(function (element){
				return !element.deleted;
			});
		}

		function changePriority(item) {
			// Cycle through priority
			item.priority = item.priority === 'High' ? 'Med' : item.priority === 'Med' ? 'Low' : 'High';
		}
	}

}());
