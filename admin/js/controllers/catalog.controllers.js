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
            'Catalog-HomeCtrl',
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
