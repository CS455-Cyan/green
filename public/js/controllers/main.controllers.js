/***																					***\

	Filename: main.controllers.js
	Author: CS455 Cyan

	Copyright (c) 2015 University of North Alabama

\***																					***/

angular.module('Catalog')
.controller
(
	'HomeCtrl',
	[
		'$scope',
		'$rootScope',
		'API',
		function($scope, $rootScope, API)
		{
			//
		}
	]
).controller
(
	'CategoryCtrl',
	[
		'$scope',
		'$rootScope',
		'$routeParams',
		'API',
		function($scope, $rootScope, $routeParams, API)
		{
			$scope.category;
			for(var i in $rootScope.programs) {
				if($rootScope.programs[i]._id == $routeParams.category) {
					$scope.category = $rootScope.programs[i];
				}
			}
		}
	]
);
