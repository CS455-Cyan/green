/***																					***\

	Filename: catalog.routes.js
	Author: CS455 Cyan

	Copyright (c) 2015 University of North Alabama
	
\***																					***/

(
	function(angular)
	{
		'use strict';

		angular.module('AppAdmin')
		.config
		(
			[
				'$routeProvider',
				function($routeProvider)
				{
					$routeProvider.when
					(
						'/catalog',
						{
							templateUrl: 'views/catalog/index.html',
							controller: 'Catalog-HomeCtrl'
						}
					).when
					(
						'/catalog/programs/categories',
						{
							templateUrl: 'views/catalog/programs/categories.html',
							controller: 'Catalog-CategoriesCtrl'
						}
					).when
					(
						'/catalog/programs/departments/:categoryID/:departmentID',
						{
							templateUrl: 'views/catalog/programs/departments.html',
							controller: 'Catalog-DepartmentsCtrl'
						}
					).when
					(
						'/catalog/programs/programs/:categoryID/:programID',
						{
							templateUrl: 'views/catalog/programs/programs.html',
							controller: 'Catalog-ProgramsCtrl'
						}
					).when
					(
						'/catalog/programs/programs/:categoryID/:departmentID/:programID',
						{
							templateUrl: 'views/catalog/programs/programs.html',
							controller: 'Catalog-ProgramsCtrl'
						}
					);

				}
			]
		);

	}
)
(
	angular
);
