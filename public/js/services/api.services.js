/***																					***\

	Filename: api.services.js
	Author: CS455 Cyan

	Copyright (c) 2015 University of North Alabama

\***																					***/


angular.module('Catalog')
.service
(
	'API',
	function() {
		var programs =  [
			{
				"_id": "1",
				"name": "Interdisciplinary Studies",
				"description": "a description",
			},
			{
				"_id": "2",
				"name": "College of Arts and Sciences",
				"description": "a description",
			},
			{
				"_id": "3",
				"name": "College of Business",
				"description": "a description",
				departments: [
					{
						"name": "Accounting and Business Law",
						"description": "a description",
						"programs": [
							{
								"name": "Accounting",
								"type": "minor",
								"description": "a description",
								"requirements": []
							}
						]
					},
					{
						"name": "Computer Science and Information Systems",
						"description": "a description",
						"programs": [
							{
								"name": "Computer Science",
								"type": "major",
								"description": "a description",
								"requirements": []
							},
							{
								"name": "Human Computer Interaction/User Experience (HCI/UX)",
								"type": "minor",
								"description": "a description",
								"requirements": []
							}
						]
					},
					{
						"name": "Economics and Finance",
						"description": "a description",
						"programs": [
							{
								"name": "Economics",
								"type": "minor",
								"description": "a description",
								"requirements": []
							}
						]
					},
					{
						"name": "Management and Marketing",
						"description": "a description",
						"programs": [
							{
								"name": "Human Resource Management",
								"type": "minor",
								"description": "a description",
								"requirements": []
							},
							{
								"name": "Marketing Communications and Technology",
								"type": "minor",
								"description": "a description",
								"requirements": []
							},
							{
								"name": "Project Management",
								"type": "minor",
								"description": "a description",
								"requirements": []
							}
						]
					}
				]
			},
			{
				"_id": "4",
				"name": "College of Education and Human Sciences",
				"description": "a description",
			},
			{
				"_id": "5",
				"name": "College of Nursing",
				"description": "a description",
			}
		];
		this.listPrograms = function(callback) {
			callback(programs);
		}
	}
);