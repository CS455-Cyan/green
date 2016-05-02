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
			function($scope, $rootScope, $location，CatalogAPI)
			{
				$scope.form={}
				$scope.Besure=function()
                    		{
		                        var x;
		                        var r=confirm("Are you sure you want to delete this item?");
		                        if (r==true)
		                        {
		                            x="Delete";
		                        }
		                        else
		                        {
		                            x="Cancel Delete";
		                        }
                    		}
                    
		                    CatalogAPI.listCourses(function(data){
		                        $scope.courses = data;
		                    })
		                    
		                    $scope.Addform =false
		                    $scope.add_offering=false
		                    $scope.Edit=function(course)
		                    {
		                        $scope.Addform= true;
		                        $scope.form=course
		                        $scope.formTitle ="Edit"
		                    }
		                    $scope.Addcourse=function()
		                    {
		                        $scope.Addform = true;
		                        $scope.form={}
		                    }
                
				}
			]
		);
		
	}
)
(
	angular
);

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
			'Catalog-TextSectionListCtrl',
			[
				'$scope',
				'$rootScope',
				'$location',
				'$sanitize',
				'CatalogAPI',
				function($scope, $rootScope, $location, $sanitize, CatalogAPI)
				{
					$scope.refresh = function() {
						CatalogAPI.listTextSections(function(sections) {
							$scope.textSections = sections;
							$scope.$apply();
						});
					}
					
					$scope.newTextSection = function() {
						$location.path('/catalog/text-sections/new')
					}
					
					$scope.removeTextSection = function(id) {
						CatalogAPI.deleteTextSection(id, function(success) {
							if(success) {
									alert("Section deleted successfully.")
							} else {
									alert("There was an error.")
							}
							$scope.refresh();
						});
					}
					
					$scope.refresh();
				}
			]
		).controller
		(
			'Catalog-TextSectionEditCtrl',
			[
				'$scope',
				'$rootScope',
				'$location',
				'$sanitize',
				'CatalogAPI',
				'$routeParams',
				function($scope, $rootScope, $location, $sanitize, CatalogAPI, $routeParams)
				{
					CKEDITOR.replace('userEditor');
					
					// Detect creation of new section and mark it as new
					if($routeParams.id == "new") {
						$scope.textSection = {
							isNew: true
						}
					}
					//otherwise retrieve data
					else {
						CatalogAPI.getTextSection($routeParams.id, function(data) {
							$scope.textSection = data;
							CKEDITOR.instances.userEditor.setData(data.content);
							$scope.$apply();
						});
					}
					
					$scope.updateTextSection = function(){
						// execute after response from server
						var callback = function(data){
							
							if(data) {
									alert("Changes were saved successfully.")
							} else {
									alert("There was an error saving your changes.")
							}
							$scope.$apply(function(){
								$location.url('/catalog/text-sections');
							});
						}
						
						// data to send
						var payload = {
							title: $scope.textSection.title,
							content: CKEDITOR.instances.userEditor.getData()
						};
						
						// create if new, update otherwise
						if($scope.textSection.isNew) {
							CatalogAPI.addTextSection(payload, callback);
						} else {
							CatalogAPI.updateTextSection($scope.textSection._id, payload, callback);
						}
					}
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
						$scope.$apply();
					};
					CatalogAPI.listCategories(callback);
					$scope.refresh = function(){
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
								$scope.$apply();
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
								$scope.$apply();
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
						$scope.$apply();
					});
					$scope.pushDepartmentChange = function(category, department){
					console.log("pushDepartmentChange");
					CatalogAPI.updateDepartment(category.id, department._id, department, function(success){
						if(success){
							$scope.refresh();
						}else{
							//send a flag
						}
						$scope.$apply();
					});
					};
					$scope.refresh = function(){
						CatalogAPI.getDepartment($scope.categoryID, $scope.departmentID, function(category, department){
							$scope.department = department;
							$scope.category = category;
						});
						$scope.$apply();
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
							$scope.$apply();
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
								$scope.$apply();
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
								$scope.$apply();
							});
						}
						
						$scope.removeRequirement = function(requirements, id, callback) {			
							CatalogAPI.removeGeneralRequirement($scope.currentlySelected.area.area, id, function(success) {
								callback(success);
								$scope.$apply();
							});
						}
						
						$scope.addRequirement = function(group, callback) {
							CatalogAPI.addGeneralRequirement($scope.currentlySelected.area.area, group, function(success) {
								callback(success);
								$scope.$apply();
							});
						}
						
						$scope.updateRequirement = function(group, callback) {
							CatalogAPI.updateGeneralRequirement($scope.currentlySelected.area.area, group, function(success) {
								callback(success);
								$scope.$apply();
							});
						}
						
					}
				]
		).controller
		(
			'Catalog-HomeCtrl',
			[
				'$scope',
				'$rootScope',
				'$location',
			function($scope, $rootScope, $location，CatalogAPI)
			{
				$scope.form={}
				
				// Paul 4/28/2016
				$scope.Besure=function() {
						var x;
						var r=confirm("Are you sure you want to delete this item?");
						if (r==true)
						{
								x="Delete";
						}
						else
						{
								x="Cancel Delete";
						}
					}

					CatalogAPI.listCourses(function(data){
							$scope.courses = data;
					})

					$scope.Addform =false
					$scope.add_offering=false
					$scope.Edit=function(course)
					{
							$scope.Addform= true;
							$scope.form=course
							$scope.formTitle ="Edit"
					}
					$scope.Addcourse=function()
					{
							$scope.Addform = true;
							$scope.form={}
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
						$scope.$apply();
					}
					CatalogAPI.getFacultyAndStaff(facultyAndStaffCallback);
					
					$scope.updateFacultyAndStaff = function(){
						var callback = function(data){
							if(data) {
									alert("Changes were saved successfully.")
							} else {
									alert("There was an error saving your changes.")
							}
							$scope.$apply();
						}
						var payload = {
							content: CKEDITOR.instances.userEditor.getData()
						};
						CatalogAPI.updateFacultyAndStaff(payload, callback);
					}
					
				}
			]
		);
		
	}
)
(
	angular
);