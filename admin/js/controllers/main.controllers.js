/***																					***\

	Filename: main.controllers.js
	Author: Mitchel R Moon, Tyler Yasaka

	Copyright (c) 2015 University of North Alabama

\***																					***/

(
	function(angular)
	{
		'use strict';

		angular.module('AppAdmin')
		.controller
		(
			'HomeCtrl',
			[
				'$scope',
				'$rootScope',
				'$location',
				function($scope, $rootScope, $location)
				{
					$scope.goToApp =
						function(url)
						{
							$location.path(url);
						};
				}
			]
		).controller
		(
			'LoginCtrl',
			[
				'$rootScope',
				'$scope',
				'$http',
				'$location',
				function($rootScope, $scope, $http, $location)
				{

					$scope.error = '';
					$scope.loginForm = {};

					//delete this when we integrate with the backend
					// start delete
					$scope.login = function() {
						$location.path('/');
						$rootScope.apps = [
							{
								"id": "catalog",
								"name": "Catalog",
								"url": "/catalog"
							},
							{
								"id": "catalogRequest",
								"name": "Curriculum Change Request",
								"url": "/curriculum-change-request"
							}
						];
					}
					// end delete
					
					// Uncomment this code when we integrate with the backend
					/*$scope.login =
						function()
						{
		      		$http.post
		      		(
		      			'/apps/api/admin/login',
		      			$scope.loginForm
		      		).success
		      		(
		      			function(data)
		      			{
		          		if(data.success == true)
		          		{
		          			$location.path('/');
		          			$rootScope.apps = data.apps;
		        			}
		            	else
		            	{
		            		$scope.error = 'Invalid credentials';
		            		console.log($scope.error);
		            	}
		          	}
		          ).error
		          (
		          	function(data)
		          	{
		          		$scope.error = "Couldn't connect to server";
		              console.log('Error: ' + data);
		          	}
		          );
						};*/
				}
			]
		);
		
	}
)
(
	angular
);