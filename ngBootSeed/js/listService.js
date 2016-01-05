/**
 * Created by jarodmoser on 12/11/15.
 */

(function () {
	'use strict';

	angular.module('listService', [])
		.service('listService', listService);

	listService.$inject = [];

	function listService() {
		var ls = this;
		ls.lists = [];
		ls.addItem = addItem;
		ls.addList = addList;
		ls.removeItem = removeItem;
		ls.changePriority = changePriority;

		function addList(listName) {
			if (listName === undefined) {
				return;
			}

			ls.lists.push({
				name: listName,
				deleted: false,
				items: []
			});

		}

		function addItem(item, priority, listIndex) {
			if (item === undefined) {
				return;
			}
			item = item.trim();
			if (item === '') {
				return;
			}

			ls.lists[listIndex].items.push({
				priority: priority,
				todoItem: item,
				done: false,
				dateAdded: new Date(),
				archived: false,
				dateArchived: '',
				deleted: false,
				editing: false
			});
		}

		function removeItem(item, listIndex) {
			item.deleted = !item.done;
			item.archived = item.done;
			ls.lists[listIndex].items = ls.lists[listIndex].items.filter(function (element) {
				return !element.deleted;
			});
		}

		function changePriority(item) {
			// Cycle through priority
			item.priority = item.priority === 'High' ? 'Med' : item.priority === 'Med' ? 'Low' : 'High';
		}
	}

}());