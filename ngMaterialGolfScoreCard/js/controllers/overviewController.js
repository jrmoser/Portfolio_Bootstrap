(function () {
	'use strict';

	angular.module('overview', [])
		.controller('overview', overview);

	overview.$inject = ['$mdSidenav'];

	function overview($mdSidenav) {

		// list everything
		var overview = this;
		overview.closeMenu = closeMenu;
		overview.openMenu = openMenu;


		// define functions
		function closeMenu () {
			$mdSidenav('left').close();
		}

		function openMenu () {
			$mdSidenav('left').close();
		}

	}

}());