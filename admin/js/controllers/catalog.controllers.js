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
						$scope.currentlySelected = {
							area: null
						}

						$scope.refreshRequirements = function() {
							CatalogAPI.listGeneralRequirements(function(areas) {
								$scope.areas = areas;
								$scope.currentlySelected.group = null;
							});
						}
						
						$scope.addRequirement = function(area) {
							var requirement = {
								name: '',
								separator: "AND",
								items: [],
								isNew: true
							};
							$scope.removeEmptyItems(area.requirements, function(item){
								if(item && item.name && item.items) {
									return !item.name.length && !item.items.length;
								}
								else return true;
							});
							area.requirements.push(requirement);
							$scope.currentlySelected.group = requirement;
						}
						
						$scope.removeRequirement = function(requirements, id) {
							if(confirm("Delete requirement?")) {
								CatalogAPI.removeGeneralRequirement($scope.currentlySelected.area.area, id, function(success) {
									$scope.refreshRequirements();
									if(success) {
										alert("Requirement removed successfully")
									} else {
										alert("Requirement could not be removed")
									}
								});
							}
						}
						
						$scope.removeItem = function(items, id) {
							if(confirm("Delete item?")) {
								$scope.removeByIndex(items, id);
							}
						}
						
						$scope.addItem = function(items) {
							var item = {
								courses: [],
								isWriteIn: false,
								separator: 'AND',
								isWriteIn: false,
								writeIn: {
									hours: {}
								}
							}
							items.push(item);
						}

						$scope.addCourse = function(item) {
							// first get rid of any empty items to avoid errors
							$scope.removeEmptyItems(item.courses, function(i) {
								return !i;
							});
							item.courses.push(null);
						}
						
						$scope.cancelRequirement = function() {
							$scope.refreshRequirements();
						}
						
						$scope.removeByIndex = function(list, index) {
							list.splice(index, 1);
						}
						
						$scope.removeEmptyItems = function(list, isEmpty) {
							for(var i=0; i<list.length; i++) {
								if(isEmpty(list[i])) {
									list.splice(i, 1);
									i--; // everything gets shifted back by one
								}
							}
							return list;
						}
						
						$scope.removeById = function(list, id) {
							for(var i in list) {
								if(list[i]._id == id) {
									list.splice(i, 1);
								}
							}
						}

						//make a call to the database to update a requirement with given id
						$scope.updateRequirement = function() {
							var action = CatalogAPI.updateGeneralRequirement;
							if($scope.currentlySelected.group.isNew) {
								action = CatalogAPI.addGeneralRequirement;
							}
							action($scope.currentlySelected.area.area, $scope.currentlySelected.group, function(success) {
									$scope.refreshRequirements();
									if(success) {
										alert("Changes saved successfully")
									} else {
										alert("Changes could not be saved")
									}
								});
						}
						
						$scope.cancel = function() {
							$scope.refreshRequirements();
						}
						
						// Load data initially
						$scope.refreshRequirements();
						CatalogAPI.listCourses(function(courses) {
							$scope.allCourses = courses;
						});
					}
				]
		);
		
	}
)
(
	angular
);
