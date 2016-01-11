(function () {
	'use strict';

	angular.module('directives', [])
		.directive('jmTrashArchive', jmTrashArchive)
		.directive('jmEditable', jmEditable)
		.directive('jmNotTheDroids', jmNotTheDroids);

	function jmTrashArchive() {
		return{
			restrict: 'E',
			template: function(elem, attr){
				var removeListOrItem = attr.type === 'item' ? "ic.removeItem(item)" : attr.type === 'list' ? "lc.removeList(list)" : '';
				return `<a href="" ng-click=${removeListOrItem} class="glyphicon glyphicon-trash"
		   ng-class="{ 'glyphicon-folder-close': ${attr.type}.done, 'glyphicon-folder-open': ${attr.type}.archived && ${attr.type}.done, 'alert-danger': !${attr.type}.done }"></a>
		<input type="checkbox" ng-model="${attr.type}.done"/>`
			}
		}
	}

	function  jmNotTheDroids(){
		return{
			restrict: 'EA',
			template: `<h4 ng-hide="list.items.length"><i class="alert-danger"> There are no items to show </i></h4>`
		}
	}

	function jmEditable(){
		return{
			restrict: 'EA',
			scope: {
				type: '='
			},
			template: '<span ng-hide="type.editing" ng-click="type.editing = true">{{type.name | uppercaseFirstLetter}}</span><input ng-show="type.editing" ng-model="type.name" ng-blur="type.editing = false" autofocus/>'
			//  http://stackoverflow.com/questions/21794575/how-to-make-a-double-click-editable-table-in-angularjs-way
		}
	}

}());
