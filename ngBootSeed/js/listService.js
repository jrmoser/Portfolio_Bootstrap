(function () {
	'use strict';

	angular.module('listService', [
		'ngStorage'
	])
		.service('listService', listService);

	listService.$inject = ['$localStorage'];

	function listService($localStorage) {
		var ls = this;
		ls.lists = $localStorage.lists ? $localStorage.lists : [];
		ls.index = $localStorage.index ? $localStorage.index : 0;
		ls.addItem = addItem;
		ls.addList = addList;
		ls.removeItem = removeItem;
		ls.removeList = removeList;
		ls.changePriority = changePriority;

		function storage(){
			$localStorage.lists = ls.lists;
			$localStorage.index = ls.index;
		}

		function indexAdjustment(index){
			//I know it's quirky, but I had to mess with these indexes so that I could continue to use the parameters that I passed into the ui-router for the list view.
			var realListIndex = 0;
			for(var i = 0; i < ls.lists.length; i++) {
				realListIndex = ls.lists[i].index === index ? i : realListIndex + '';
			}
			return realListIndex;
		}

		function addList(listName) {
			ls.lists.push({
				index: ls.index + '',
				archived: false,
				name: listName,
				deleted: false,
				done: false,
				items: []
			});

			ls.index++;
			storage();
		}

		function removeList(list) {
			list.deleted = !list.done;
			list.archived = list.archived ? false : list.done;
			ls.lists = ls.lists.filter(function (element) {
				return !element.deleted;
			});
			storage();
		}

		function addItem(item, priority, listIndex) {
			var realListIndex = indexAdjustment(listIndex);
			ls.lists[realListIndex].items.push({
				priority: priority,
				name: item,
				done: false,
				dateAdded: new Date(),
				archived: false,
				dateArchived: '',
				deleted: false,
				editing: false
			});
			storage();
		}

		function removeItem(item, listIndex) {
			var realListIndex = indexAdjustment(listIndex);
			item.deleted = !item.done;
			item.archived = item.archived ? false : item.done;
			ls.lists[realListIndex].items = ls.lists[realListIndex].items.filter(function (element) {
				return !element.deleted;
			});
			storage();
		}

		function changePriority(item) {
			// Cycle through priority
			item.priority = item.priority === 'High' ? 'Med' : item.priority === 'Med' ? 'Low' : 'High';
			storage();
		}
	}
}());