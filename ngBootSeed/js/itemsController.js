(function () {
	'use strict';

	angular.module('itemsController', [])
		.controller('itemsController', itemsController);

	itemsController.$inject = ['$location', 'listService'];

	function itemsController($location, listService) {

		// list everything
		var ic = this;
		ic.addItem = addItem;
		ic.removeItem = removeItem;
		ic.changePriority = changePriority;
		ic.listIndex = $location.url();
		ic.equalsIndex = ic.listIndex.indexOf('=');
		ic.listIndex = ic.listIndex.substr(ic.equalsIndex + 1);
		ic.lists = listService.lists;

		// define functions
		function addItem(item, priority) {
			if (item === undefined) {
				return;
			}
			item = item.trim();
			if (item === '') {
				return;
			}

			listService.addItem(item, priority, ic.listIndex);

			ic.item = undefined;
		}

		function removeItem(item) {
			listService.removeItem(item, ic.listIndex);
		}

		function changePriority(item) {
			listService.changePriority(item);
		}
	}

}());