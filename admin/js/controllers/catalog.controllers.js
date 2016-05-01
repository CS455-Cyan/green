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
							$scope.currentlySelected = {
								area: null
							}
							//$scope.requirementID = requirements._id;
							
							$scope.clickCollapse = function(id) {
								//
							}
							
							$scope.formatCourseSearch = function(model) {
								console.log(model)
								if(model && model.name) {
									return model.name;
								}
								return null;
							}
							
							$scope.matchCourse = function(keyword) {
									return function(item) {
										return (
											(item.title.search(keyword.title) > -1) ||
											(item.subject.abbreviation.search(keyword.subject.abbreviation) > -1)
										);
									};
							}
							
							CatalogAPI.listGeneralRequirements(function(areas) {
								$scope.areas = areas;
								//console.log(generalRequirements)
							});
							
							CatalogAPI.listCourses(function(courses) {
								$scope.allCourses = courses;
							});
							
							var callback = function(areas){
								$scope.areas = areas;
							}
							
							$scope.pushRequirementsChange = function() {
								//
							}
							
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
