/**
 * Created by jarodmoser on 12/11/15.
 */
(function () {
	'use strict';

	angular.module('directives', [])
		.directive('jmTrashArchive', jmTrashArchive);

	function jmTrashArchive() {
		return{
			restrict: 'E',
			template: function(elem, attr){
				var removeListOrItem = attr.type === 'item' ? "ic.removeItem(item)" : attr.type === 'list' ? "lc.removeList(list)" : '';
				return `<a href="" ng-click=${removeListOrItem} class="glyphicon glyphicon-trash"
		   ng-class="{ 'glyphicon-folder-open': ${attr.type}.done, 'alert-danger': !${attr.type}.done }"></a>
		<input type="checkbox" ng-model="${attr.type}.done"/>`
			}
		}
	}

}());
