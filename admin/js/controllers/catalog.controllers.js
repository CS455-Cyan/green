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
		)
        .controller
		(
			'Catalog-CategoriesCtrl',
			[
				'$scope',
				'$rootScope',
				'$location',
				'CatalogAPI',
				function($scope, $rootScope, $location, CatalogAPI)
				{
					$scope.editName = false;
					$scope.editDescription = false;
					$scope.addCategory = false;
					$scope.addDepartment = false;
					$scope.addProgram = false;
					$scope.save = false;
					$scope.discard = false;
					var callback = function(categories){
						$scope.categories = categories;
					};
					CatalogAPI.listCategories(callback);
					$scope.refresh = function(){
							console.log("refresh")
						 CatalogAPI.listCategories(callback);
					};
					$scope.pushCategoryChange = function(category){
							console.log("pushCategoryChange");
							CatalogAPI.updateCategory(category._id, category, function(success){
									if(success){
											$scope.refresh();
									}else{
											//send a flag
									}
							});
					};
					$scope.pushDepartmentChange = function(category, department){
							console.log("pushDepartmentChange");
							CatalogAPI.updateDepartment(category.id, department._id, department, function(success){
									if(success){
											$scope.refresh();
									}else{
											//send a flag
									}
							});
					};
				}
			]
		)
        .controller
		(
			'Catalog-DepartmentsCtrl',
			[
				'$scope',
				'$rootScope',
				'$location',
				'CatalogAPI',
				'$routeParams',
				function($scope, $rootScope, $location, CatalogAPI, $routeParams)
				{
					$scope.departmentID = $routeParams.departmentID;
					$scope.categoryID = $routeParams.categoryID;
					$scope.editName = false;
					$scope.editDescription = false;
					$scope.addDepartment = false;
					$scope.addProgram = false;
					$scope.save = false;
					$scope.discard = false;

					CatalogAPI.getDepartment($scope.categoryID, $scope.departmentID, function(category, department){
							$scope.department = department;
							$scope.category = category;
					});
					$scope.pushDepartmentChange = function(category, department){
					console.log("pushDepartmentChange");
					CatalogAPI.updateDepartment(category.id, department._id, department, function(success){
						if(success){
							$scope.refresh();
						}else{
							//send a flag
						}
					});
					};
					$scope.refresh = function(){
						console.log("refresh")
						CatalogAPI.getDepartment($scope.categoryID, $scope.departmentID, function(category, department){
							$scope.department = department;
							$scope.category = category;
						});
					};
				}
			]
		)
        .controller
		(
			'Catalog-ProgramsCtrl',
			[
				'$scope',
				'$rootScope',
				'$location',
				'CatalogAPI',
				'$routeParams',
				function($scope, $rootScope, $location, CatalogAPI, $routeParams)
				{
					$scope.programID = $routeParams.programID;
					$scope.departmentID = $routeParams.departmentID;
					$scope.categoryID = $routeParams.categoryID;

					CatalogAPI.getProgram($scope.categoryID, $scope.departmentID, $scope.programID, function(category, department, program){
						$scope.program = program;
					});
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
							});
						}
						
						$scope.removeRequirement = function(requirements, id, callback) {			
							CatalogAPI.removeGeneralRequirement($scope.currentlySelected.area.area, id, function(success) {
								callback(success);
							});
						}
						
						//make a call to the database to update a requirement with given id
						$scope.updateRequirement = function(group, callback) {
							var action = CatalogAPI.updateGeneralRequirement;
							if(group.isNew) {
								action = CatalogAPI.addGeneralRequirement;
							}
							action($scope.currentlySelected.area.area, group, function(success) {
								callback(success);
							});
						}
						
					}
				]
		);
		
	}
)
(
	angular
);
