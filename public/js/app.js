/***																					***\

	Filename: app.js
	Author: CS455 Cyan

	Copyright (c) 2015 University of North Alabama

\***																					***/

(
	function(angular)
	{
		'use strict';

		angular.module
		(
			'Catalog',
			[
				'ngRoute',
				'ngResource',
				'ui.bootstrap'
			]
		).run
		(
			[
				'$http',
				'$rootScope',
				'$location',
				'$resource',
				function($http, $rootScope, $location, $resource)
				{
					// This runs when this angular app is first loaded.
				}
			]
		);

	}
)
(
	angular
);
