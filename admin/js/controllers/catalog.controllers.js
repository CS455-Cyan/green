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
                       CatalogAPI.listCategories(callback);
                    };
                    $scope.pushChange = function(category){
                        CatalogAPI.updateCategory(category._id, category, function(success){
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
                    
                    CatalogAPI.getDepartment($scope.categoryID, $scope.departmentID, function(category, department){
                        $scope.department = department;
                        $scope.category = category;
                    });
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
				    })
                }
			]
		);
		
	}
)
(
	angular
);
