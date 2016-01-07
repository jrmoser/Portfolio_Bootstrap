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
		ls.removeList = removeList;
		ls.changePriority = changePriority;

		function addList(listName) {
			ls.lists.push({
				archived: false,
				name: listName,
				deleted: false,
				done: false,
				items: []
			});

		}

		function removeList(list) {
			list.deleted = !list.done;
			list.archived = list.done;
			ls.lists = ls.lists.filter(function (element) {
				return !element.deleted;
			});
		}

		function addItem(item, priority, listIndex) {
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