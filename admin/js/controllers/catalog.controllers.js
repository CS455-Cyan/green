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
				'$sanitize',
				function($scope, $rootScope, $location, $sanitize)
				{
					//
				}
			]
		).controller
		(
			'Catalog-CategoriesCtrl',
			[
				'$scope',
				'$rootScope',
				'$location',
				'CatalogAPI',
				'$sanitize',
				function($scope, $rootScope, $location, CatalogAPI, $sanitize)
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
				'$sanitize',
				function($scope, $rootScope, $location, CatalogAPI, $routeParams, $sanitize)
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
				'$sanitize',
				function($scope, $rootScope, $location, CatalogAPI, $routeParams, $sanitize)
				{
					$scope.programID = $routeParams.programID;
					$scope.departmentID = $routeParams.departmentID;
					$scope.categoryID = $routeParams.categoryID;
					
					$scope.refresh = function() {
						CatalogAPI.getProgram($scope.categoryID, $scope.departmentID, $scope.programID, function(category, department, program){
							$scope.program = program;
						});
					}

					$scope.updateProgram = function(group, callback) {
						CatalogAPI.updateProgram(
							$scope.categoryID,
							$scope.departmentID,
							$scope.programID,
							$scope.program,
							function(success) {
								callback(success);
							}
						);
					}
					
					$scope.refresh();
				}
			]
		).controller(
				'Catalog-General-RequirementsCtrl',
				[
					'$scope',
					'$rootScope',
					'$location',
					'CatalogAPI',
					'$sanitize',
					function($scope, $rootScope, $location, CatalogAPI, $sanitize)
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
						
						$scope.addRequirement = function(group, callback) {
							CatalogAPI.addGeneralRequirement($scope.currentlySelected.area.area, group, function(success) {
								callback(success);
							});
						}
						
						$scope.updateRequirement = function(group, callback) {
							CatalogAPI.updateGeneralRequirement($scope.currentlySelected.area.area, group, function(success) {
								callback(success);
							});
						}
						
					}
				]
		).controller
		(
			'Catalog-FacultyAndStaffCtrl',
			[
				'$scope',
				'$rootScope',
				'$location',
				'$sanitize',
				'CatalogAPI',
				function($scope, $rootScope, $location, $sanitize, CatalogAPI)
				{
					CKEDITOR.replace('userEditor');
					var facultyAndStaffCallback = function(data) {
							CKEDITOR.instances.userEditor.setData(data);
					}
					$scope.facultyAndStaff = CatalogAPI.getFacultyAndStaff(facultyAndStaffCallback)
					//var data = CKEDITOR.instances.userEditor.getData();
					$scope.updateFacultyAndStaff = function(){
							var callback = function(data){
									if(data) {
											alert("Changes were saved successfully.")
									} else {
											alert("There was an error saving your changes.")
									}
							}
					CatalogAPI.updateFacultyAndStaff(CKEDITOR.instances.userEditor.getData(), callback);
					}
				}
			]
		);
		
	}
)
(
	angular
);
