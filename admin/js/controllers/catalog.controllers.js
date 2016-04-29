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
