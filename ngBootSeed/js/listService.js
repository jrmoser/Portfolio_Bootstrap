/**
 * Created by jarodmoser on 12/11/15.
 */

var lists = [];

(function () {
	'use strict';

	angular.module('listService', [])
		.controller('listService', listService);

	listService.$inject = [];

	function listService() {
		var ls = this;
		ls.lists = [];
		ls.addItem = addItem;
		ls.addList = addList;
		ls.removeItem = removeItem;
		ls.changePriority = changePriority;

		function addList(listName) {
			if (listName === undefined){
				return;
			}

			ls.lists.push({
				name: listName,
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

			ls.item = undefined;
		}

		function removeItem(item, listIndex) {
			item.deleted = !item.done;
			item.archived = item.done;
			ls.lists[listIndex].items = ls.itemsArray.filter(function (element) {
				return !element.deleted;
			});
		}

		function changePriority(item) {
			// Cycle through priority
			item.priority = item.priority === 'High' ? 'Med' : item.priority === 'Med' ? 'Low' : 'High';
		}
	}

}());

//var lists = [];