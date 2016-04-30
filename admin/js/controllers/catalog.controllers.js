/***																					***\

	Filename: catalog.controllers.js
	Author: CS455 Cyan

	Copyright (c) 2015 University of North Alabama

\***																					***/

(
	function(angular)
	{
		'use strict';

		angular.module('AppAdmin')
		.controller
		(
			'Catalog-HomeCtrl',
			[
				'$scope',
				'$rootScope',
				'$location',
				function($scope, $rootScope, $location)
				{
					// ...
				}
			]
		).controller(
				'Catalog-General-RequirementsCtrl',
				[
						'$scope',
						'$rootScope',
						'$location',
						'CatalogAPI',
						function($scope, $rootScope, $location, CatalogAPI)
						{
							$scope.editRequirement = false;
							$scope.editWriteIn = false;
							$scope.editCourseList = false;
							$scope.requirementID = requirements._id;
							
							var callback = function(areas){
								$scope.areas = areas;
							}
							
							$scope.pushRequirementsChange = function()
							
							//make a call to the database to update a requirement with given id
							$scope.updateRequirement = function(requirementId) {
								console.log("updateZRquirement");
								
								
								//CatalogAPI.updateRequirement(requirementId, callback);
							}
						}
				]
		);
		
	}
)
(
	angular
);
