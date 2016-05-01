/***																					***\

	Filename: main.controllers.js
	Author: CS455 Cyan

	Copyright (c) 2015 University of North Alabama

\***																					***/

angular.module('Catalog')
.controller
(
	'HomeCtrl',
	[
		'$scope',
		'$rootScope',
		'API',
        '$sanitize',
		function($scope, $rootScope, API, $sanitize)
		{
			$rootScope.breadcrumbs = [{text: 'About UNA Catalog'}];
		}
	]
).controller
(
	'TextSectionCtrl',
	[
		'$scope',
		'$rootScope',
		'$routeParams',
		'API',
        '$sanitize',
		function($scope, $rootScope, $routeParams, API, $sanitize)
		{
			API.getTextSection($routeParams.section, function(textSection) {
				$scope.textSection = textSection;
				$rootScope.breadcrumbs = [{text: textSection.title}];
			});
		}
	]
).controller
(
	'GeneralRequirementsCtrl',
	[
		'$scope',
		'$rootScope',
		'$routeParams',
		'API',
        '$sanitize',
		function($scope, $rootScope, $routeParams, API, $sanitize)
		{
			$rootScope.breadcrumbs = [{text: 'General Education Requirements'}];
			API.listGeneralRequirements(function(generalRequirements) {
				$scope.generalRequirements = generalRequirements;
			});
		}
	]
).controller
(
	'CategoryCtrl',
	[
		'$scope',
		'$rootScope',
		'$routeParams',
		'API',
        '$sanitize',
		function($scope, $rootScope, $routeParams, API, $sanitize)
		{
			API.getCategory($routeParams.category, function(category) {
				$rootScope.category = category;
				$rootScope.breadcrumbs = [{text: category.name}];
			});
		}
	]
).controller
(
	'DepartmentCtrl',
	[
		'$scope',
		'$rootScope',
		'$routeParams',
		'API',
        '$sanitize',
		function($scope, $rootScope, $routeParams, API, $sanitize)
		{
			API.getDepartment($routeParams.category, $routeParams.department, function(category, department) {
				$scope.category = category;
				$scope.department = department;
				$rootScope.breadcrumbs = [
					{
						text: category.name,
						url: '#/programs/category/' + category._id
					},
					{
						text: department.name
					}
				];
			});
		}
	]
).controller
(
	'ProgramCtrl',
	[
		'$scope',
		'$rootScope',
		'$routeParams',
		'API',
        '$sanitize',
		function($scope, $rootScope, $routeParams, API, $sanitize)
		{
			API.getProgram(
				$routeParams.category,
				$routeParams.department,
				$routeParams.program,
				function(category, department, program) {
					console.log(category, department, program)
					$scope.category = category;
					$scope.department = department;
					$scope.program = program;
					$rootScope.breadcrumbs = [];
					$rootScope.breadcrumbs.push({
						text: category.name,
						url: '#/programs/category/' + category._id
					});
					if(department) {
						$rootScope.breadcrumbs.push({
							text: department.name,
							url: '#/programs/category/' + category._id + '/department/' + department._id
						});
					}
					$rootScope.breadcrumbs.push({text: program.name});
				}
			);
		}
	]
).controller
(
	'CoursesCtrl',
	[
		'$scope',
		'$rootScope',
		'$routeParams',
		'API',
        '$sanitize',
		function($scope, $rootScope, $routeParams, API, $sanitize)
		{
			$rootScope.breadcrumbs = [{text: 'Courses'}];
			API.listSubjects(function(subjects) {
				$rootScope.subjects = subjects;
			});
		}
	]
).controller
(
	'SubjectCtrl',
	[
		'$scope',
		'$rootScope',
		'$location',
		'$routeParams',
		'API',
        '$sanitize',
		function($scope, $rootScope, $location, $routeParams, API, $sanitize)
		{
			
			/*
				Function: $scope.goToCourse
				Description: Navigate to a specified course and make it available to the $rootScope
				Input:
					course: course object
				Output:
				Created: Tyler Yasaka 04/17/2016
				Modified:
			*/
			/*$scope.goToCourse = function(course) {
				$rootScope.course = course;
				$location.path('/courses/course/' + course._id);
			}*/
			API.getSubject($routeParams.subject, function(subject, courses) {
				$scope.subject = subject;
				$scope.courses = courses;
				$rootScope.breadcrumbs = [
					{text: 'Courses', url: '#/courses'},
					{text: subject.name}
				];
			});
		}
	]
).controller
(
	'CourseCtrl',
	[
		'$scope',
		'$rootScope',
		'$routeParams',
		'API',
        '$sanitize',
		function($scope, $rootScope, $routeParams, API, $sanitize)
		{
			API.getCourse($routeParams.course, function(course) {
				$scope.course = course;
				$rootScope.breadcrumbs = [
					{text: 'Courses', url: '#/courses'},
					{text: course.subject.name, url: '#/courses/subject/' + course.subject._id},
					{text: course.subject.abbreviation + course.number}
				];
			});
		}
	]
).controller
(
	'FacultyAndStaffCtrl',
	[
		'$scope',
		'$rootScope',
		'$routeParams',
		'API',
        '$sanitize',
		function($scope, $rootScope, $routeParams, API, $sanitize)
		{
			$rootScope.breadcrumbs = [{text: 'Faculty and Staff'}];
			API.getFacultyAndStaff(function(facultyAndStaff) {
				$scope.facultyAndStaff = facultyAndStaff;
			});
		}
	]
);
