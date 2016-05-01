/***																					***\

	Filename: catalog-api.services.js
	Author: CS455 Cyan

	Copyright (c) 2015 University of North Alabama

\***																					***/


angular.module('AppAdmin')
.service
(
	'CatalogAPI',
	function() {

		/*
			Function: API.listTextSections
			Description: Fetch a list of all text sections
			Input:
				callback: function to execute once text sections are found
			Output:
				callback is called when text sections are found, with the text section passed in as a parameter
			Created: Tyler Yasaka 04/19/2016
			Modified:
		*/
		this.listTextSections = function(callback) {
			console.log('listTextSections')
			callback(textSections);
		};
		
		/*
			Function: API.listGeneralRequirements
			Description: Fetch a list of all general requirements
			Input:
				callback: function to execute once general requirements are found
			Output:
				callback is called when general requirements are found, with the general requirements passed in as a parameter
			Created: Tyler Yasaka 04/19/2016
			Modified:
		*/
		this.listGeneralRequirements = function(callback) {
			console.log('listGeneralRequirements')
			callback(generalRequirements);
			getHTTP('/catalog/generalRequirements', function(res) {
				callback(res.data);
			});
		};
		
		/*
			Function: API.addGeneralRequirement
			Description: Add a general requirement to an area
			Input:
				callback: function to execute on completion
			Output:
				callback is called on completion, with the result passed in as a parameter
			Created: Tyler Yasaka 05/1/2016
			Modified:
		*/
		this.addGeneralRequirement = function(area, requirementObject, callback) {
			console.log('addGeneralRequirement')
			callback(true);
		};
		
		/*
			Function: API.updateGeneralRequirement
			Description: Update a general requirement
			Input:
				requirementObject: new data
				callback: function to execute once backend returns data
			Output:
			Created: Seth Putman 04/27/2016
			Modified:
		*/
		this.updateGeneralRequirement = function(area, requirementObject, callback) {
			var data = {
				success: true
			}
			callback(data.success);
		};
		
		/*
			Function: API.removeGeneralRequirement
			Description: Remove a general requirement from an area
			Input:
				callback: function to execute on completion
			Output:
				callback is called on completion, with the result passed in as a parameter
			Created: Tyler Yasaka 05/1/2016
			Modified:
		*/
		this.removeGeneralRequirement = function(area, requirementId, callback) {
			console.log('addGeneralRequirement')
			callback(true);
		};
		
		/*
			Function: API.getTextSection
			Description: Fetch a specific text section by id
			Input:
				id: id of text section to fetch (String)
				callback: function to execute once the text section is found
			Output:
				callback is called when text section is found, with the text section passed in as a parameter
			Created: Tyler Yasaka 04/19/2016
			Modified:
		*/
		this.getTextSection = function(id, callback) {
			console.log('getTextSection')
			for(var t in textSections) {
				if(textSections[t]._id == id) {
					callback(textSections[t]);
				}
			}
		};
		
		/*
			Function: API.listCategories
			Description: Fetch a list of all categories
			Input:
				callback: function to execute once categories are found
			Output:
				callback is called when categories are found, with the categories passed in as a parameter
			Created: Tyler Yasaka 04/17/2016
			Modified:
		*/
		this.listCategories = function(callback) {
			console.log('listCategories')
			callback(categories);
		};
			
		/*
			Function: API.getCategory
			Description: Fetch a specific category by id
			Input:
				id: id of category to fetch (String)
				callback: function to execute once the category is found
			Output:
				callback is called when category is found, with the category passed in as a parameter
			Created: Tyler Yasaka 04/17/2016
			Modified:
		*/
		this.getCategory = function(id, callback) {
			console.log('getCategory')
			for(var c in categories) {
				if(categories[c]._id == id) {
					callback(categories[c]);
				}
			}
		};
        
        /*
			Function: API.updateCategory
			Description: Update a category by ID
			Input:
				id: id of category to fetch (String)
                category: the specific category's object
				callback: function to execute once the category is changed
			Output:
				callback is called when category is changed, with a boolean flag passed in as a parameter
			Created: Graem Cook 4/27/2016
			Modified:
		*/
		this.updateCategory = function(id, category, callback) {
            console.log("updateCategory");
            callback(true);
		};
		
		/*
			Function: API.getDepartment
			Description: Fetch a specific department by id
			Input:
				categoryId: id of program category (String)
				departmentId: id of program department (String)
				callback: function to execute once the department is found
			Output:
				callback is called when program is found, with the category and department passed in as parameters
			Created: Tyler Yasaka 04/19/2016
			Modified:
		*/
		this.getDepartment = function(categoryId, departmentId, callback) {
			console.log('getDepartment')
			var result = {
				category: null,
				department: null,
			};
			for(var c in categories) {
				if(categories[c]._id == categoryId) {
					result.category = categories[c];
					for(var d in categories[c].departments) {
						if(categories[c].departments[d]._id == departmentId) {
							result.department = categories[c].departments[d];
						}
					}
				}
			}
			callback(result.category, result.department);
		};
        
        /*
			Function: API.updateDepartment
			Description: Update a department by ID
			Input:
				id: id of department to fetch (String)
                category: the specific department's object
				callback: function to execute once the department is changed
			Output:
				callback is called when department is changed, with a boolean flag passed in as a parameter
			Created: Graem Cook 4/28/2016
			Modified:
		*/
		this.updateDepartment = function(categoryID, departmentID, department, callback) {
            console.log("updateDepartment")
			callback(true);
		};
		
		/*
			Function: API.getProgram
			Description: Fetch a specific program by id
			Input:
				categoryId: id of program category (String)
				departmentId: id of program department (String)
				programId: id of program (String)
				callback: function to execute once the program is found
			Output:
				callback is called when program is found, with the category, department, and program passed in as parameters
			Created: Tyler Yasaka 04/17/2016
			Modified:
		*/
		this.getProgram = function(categoryId, departmentId, programId, callback) {
			if(departmentId) {
				getHTTP(
					'/catalog/programs/categories/' +
					categoryId +
					'/departments/' +
					departmentId +
					'/programs/' +
					programId,
					function(res) {
						callback(res.data.category, res.data.department, res.data.program);
					}
				);
			}
			else {
				getHTTP(
					'/catalog/programs/categories/' +
					categoryId +
					'/programs/' +
					programId,
					function(res) {
						callback(res.data.category, null, res.data.program);
					}
				);
			}
		};
		
        /*
			Function: API.updateProgram
			Description: Update a program by ID
			Input:
				categoryID: id of category program is in (String)
				departmentID: id of department program is in (String)
				programID: id of program to update (String)
				program: data to update (object)
				callback: function to execute once the department is changed
			Output:
				callback is called when department is changed, with a boolean flag passed in as a parameter
			Created: Graem Cook 4/28/2016
			Modified:
				Tyler Yasaka 5/1/2016
		*/
		this.updateProgram = function(categoryID, departmentID, programID, program, callback) {
			var url = '/admin/catalog/programs/categoies/' + categoryID;
			if(departmentID) {
				url += '/departments/' + departmentID;
			}
			url += '/programs/' + programID;
			putHTTP(url, program, function(res) {
					callback(res.success);
			}
		};
							
		this.deleteProgram = function(categoryID, departmentID, programID, callback) {
			var url = '/admin/catalog/programs/categoies/' + categoryID;
			if(departmentID) {
				url += '/departments/' + departmentID;
			}
			url += '/programs/' + programID;
			deleteHTTP(url, function(res) {
					callback(res.success);
			}
		};
		
		
		/*
			Function: API.listCourses
			Description: Fetch a list of all courses
			Input:
				callback: function to execute once courses are found
			Output:
				callback is called when courses are found, with the courses passed in as a parameter
			Created: Tyler Yasaka 04/30/2016
			Modified:
		*/
		this.listCourses = function(callback) {
			getHTTP('/catalog/courses', function(res) {
				callback(res.data);
			});
		};

		/*
			Function: API.getCourse
			Description: Fetch a specific course by id
			Input:
				id: id of course to fetch (String)
				callback: function to execute once the course is found
			Output:
				callback is called when course is found, with the course passed in as a parameter
			Created: Tyler Yasaka 04/17/2016
			Modified:
		*/
		this.getCourse = function(id, callback) {
			console.log('getCourse')
			for(var c in courses) {
				if(courses[c]._id == id) {
					callback(courses[c]);
				}
			}
		};

		/*
			Function: API.listSubjects
			Description: Fetch a list of all subjects
			Input:
				callback: function to execute once subjects are found
			Output:
				callback is called when subjects are found, with the subjects passed in as a parameter
			Created: Tyler Yasaka 04/17/2016
			Modified:
		*/
		this.listSubjects = function(callback) {
			console.log('listSubjects')
			callback(subjects);
		};
		
		/*
			Function: API.getSubject
			Description: Fetch a list of all courses for a given subject
			Input:
				subject: id of subject to find courses for
				callback: function to execute once courses are found
			Output:
				callback is called when courses are found, with the courses passed in as a parameter
			Created: Tyler Yasaka 04/17/2016
			Modified:
		*/
		this.getSubject = function(subjectId, callback) {
			console.log('getSubject')
			var result = {
				subject: null,
				courses: []
			};
			for(var s in subjects) {
				if(subjects[s]._id == subjectId) {
					result.subject = subjects[s];
				}
			}
			for(var c in courses) {
				if(courses[c].subject._id == subjectId) {
					result.courses.push(courses[c]);
				}
			}
			callback(result.subject, result.courses);
		};
		
		/*
			Function: API.getTextSection
			Description: Fetch a specific text section by id
			Input:
				id: id of text section to fetch (String)
				callback: function to execute once the text section is found
			Output:
				callback is called when text section is found, with the text section passed in as a parameter
			Created: Tyler Yasaka 04/19/2016
			Modified:
		*/
		this.getFacultyAndStaff = function(callback) {
			console.log('getFacultyAndStaff')
			callback(facultyAndStaff);
		};
		
        /*
			Function: this.updateFacultyAndStaff
			Description: Updates the Faculty And Staff
			Input:
				id: id of text section to fetch (String)
				callback: function to execute once the text section is found
			Output:
				callback is called when text section is found, with the text section passed in as a parameter
			Created: Sean Vaccaro 4/23/2016
			Modified:
		*/
        this.updateFacultyAndStaff = function(facultyAndStaffData, callback){
            facultyAndStaff = facultyAndStaffData;
            callback(true);
        };
        
		// Sample data
		
		var textSections = [
			{
				"title": "Description of the University",
				"content": "Yolo.",
				"_id": "5714799b0d1ca57305e7edcf"
			},
			{
				"title": "Admission to the University",
				"content": "Yeah brah",
				"_id": "5714799b0d1ca57305e7edc1"
			},
			{
				"title": "Expenses",
				"content": "Student debt for everybody",
				"_id": "5714799b0d1ca57305e7edce"
			}
		];
		
		var generalRequirements = [
			{
				"_id": "5714799b0d1ca57305e7edd0",
				"area": "I",
				"name": "Written Composition",
				"__v": 5,
				"requirements": [
					{
						"credit": "1 - 3",
						"separator": "OR",
						"name": "'WTF' requirements",
						"_id": "5714799b0d1ca57305e7edd1",
						"items": [
							{
								"credit": "1 - 3",
								"separator": "AND",
								"_id": "5714799b0d1ca57305e7edd2",
								"isWriteIn": true,
								"writeIn": {
									"content": "Sing the alphabet backwards",
									"hours": {
										"min": 1,
										"max": 3
									}
								},
								"courses": []
							}
						]
					},
					{
						"credit": "6 - 7",
						"separator": "AND",
						"name": "'why do I need these' requirements",
						"_id": "5716e87951e5065204965464",
						"items": [
							{
								"credit": "6 - 7",
								"separator": "OR",
								"_id": "5716e87951e5065204965465",
								"isWriteIn": false,
								"courses": [
									{
										"_id": "571339a2145ab8b471163d11",
										"title": "Programming Languages",
										"number": "410W",
										"description": "Fortran...",
										"subject": {
											"_id": "5714799b0d1ca57305e7edd4",
											"name": "Computer Science",
											"abbreviation": "CS",
											"__v": 0
										},
										"__v": 0,
										"hours": {
											"min": 3,
											"max": 4
										},
										"offerings": []
									},
									{
										"_id": "571339a2145ab8b471163d96",
										"title": "Artificial Intelligence",
										"number": "470",
										"description": "Robots and stuff...",
										"subject": {
											"_id": "5714799b0d1ca57305e7edd4",
											"name": "Computer Science",
											"abbreviation": "CS",
											"__v": 0
										},
										"__v": 0,
										"hours": {
											"min": 3,
											"max": 3
										},
										"offerings": []
									}
								]
							},
							{
								"credit": "6 - 7",
								"separator": "OR",
								"_id": "5716e87951e5065204965465",
								"isWriteIn": false,
								"courses": [
									{
										"_id": "571339a2145ab8b471163d97",
										"title": "Calculus I",
										"number": "127",
										"description": "Integrals and Derivatives",
										"hours": {
											min: 4,
											max: 5
										},
										"__v": 0,
										"hours": {
											"min": 3,
											"max": 4
										},
										"offerings": []
									},
									{
										"_id": "571339a2145ab8b471163d96",
										"title": "Artificial Intelligence",
										"number": "470",
										"description": "Robots and stuff...",
										"subject": {
											"_id": "5714799b0d1ca57305e7edd4",
											"name": "Computer Science",
											"abbreviation": "CS",
											"__v": 0
										},
										"__v": 0,
										"hours": {
											"min": 3,
											"max": 3
										},
										"offerings": []
									}
								]
							}
						]
					}
				]
			},
			{
				"_id": "5714799c0d1ca57305e7eddb",
				"area": "II",
				"name": "Humanities and Fine Arts",
				"__v": 0,
				"requirements": [
					{
						"credit": "3 - 4",
						"separator": "OR",
						"name": "'Make it stop' requirements",
						"_id": "5714799c0d1ca57305e7eddc",
						"items": [
							{
								"credit": "0",
								"separator": "OR",
								"_id": "5714799c0d1ca57305e7eddd",
								"isWriteIn": false,
								"courses": [
									{
										"_id": "571339a2145ab8b471163d11",
										"title": "Programming Languages",
										"number": "410W",
										"description": "Fortran...",
										"subject": {
											"_id": "5714799b0d1ca57305e7edd4",
											"name": "Computer Science",
											"abbreviation": "CS",
											"__v": 0,
										},
										"hours": {
											"min": 3,
											"max": 4
										},
										"offerings": []
									}
								]
							}
						]
					}
				]
			},
			{
				"_id": "5714799c0d1ca57305e7ede8",
				"area": "III",
				"name": "Natural Sciences and Mathematics",
				"__v": 0,
				"requirements": [
					{
						"credit": "0",
						"separator": "OR",
						"name": "requirement",
						"_id": "5714799c0d1ca57305e7ede9",
						"items": [
							{
								"credit": "0",
								"separator": "AND",
								"isWriteIn": false,
								"_id": "5714799c0d1ca57305e7edea",
								"courses": []
							}
						]
					}
				]
			},
			{
				"_id": "5714799c0d1ca57305e7edeb",
				"area": "IV",
				"name": "History, Social and Behavioral Sciences",
				"__v": 0,
				"requirements": [
					{
						"credit": "0",
						"separator": "OR",
						"name": "requirement",
						"_id": "5714799c0d1ca57305e7edec",
						"items": [
							{
								"credit": "0",
								"separator": "OR",
								"isWriteIn": false,
								"_id": "5714799c0d1ca57305e7eded",
								"courses": []
							}
						]
					}
				]
			},
			{
				"_id": "5714799c0d1ca57305e7edee",
				"area": "V",
				"name": "Additional Requirements",
				"__v": 0,
				"requirements": [
					{
						"credit": "0",
						"separator": "OR",
						"name": "requirement",
						"_id": "5714799c0d1ca57305e7edef",
						"items": [
							{
								"credit": "0",
								"separator": "OR",
								"isWriteIn": false,
								"_id": "5714799c0d1ca57305e7edf0",
								"courses": []
							}
						]
					}
				]
			}
		];
		
		var categories = [
			{
				"_id": "1",
				"name": "Interdisciplinary Studies",
			},
			{
				"_id": "2",
				"name": "College of Arts and Sciences",
			},
			{
				"_id": "3",
				"name": "College of Business",
				"description": "a description",
				departments: [
					{
						"_id": "10",
						"name": "Accounting and Business Law",
						"description": "a description",
						"programs": [
							{
								"_id": "31",
								"name": "Accounting",
								"type": "minor",
								"description": "a description",
								"requirements": []
							}
						]
					},
					{
						"_id": "11",
						"name": "Computer Science and Information Systems",
						"description": "a description",
						"programs": [
							{
								"_id": "32",
								"name": "Computer Science",
								"type": "major",
								"description": "a description",
								"requirements": [
									{
										"name": "Core Requirements",
										"_id": "571339a3145ab8b471163da0",
										separator: "AND",
										"items": [
											{
												"separator": "OR",
												"_id": "571339a3145ab8b471163da2",
												isWriteIn: false,
												"courses": [
													{
														"_id": "571339a2145ab8b471163d96",
														"title": "Artificial Intelligence",
														"number": "470",
														"description": "Robots and stuff...",
														"hours": {
															min: 3,
															max: 3
														},
														"subject": {
															"_id": "1",
															"name": "Computer Science",
															"abbreviation": "CS",
															"__v": 0
														},
														"__v": 0,
														"offerings": []
													},
													{
														"_id": "571339a2145ab8b471163d11",
														"title": "Programming Languages",
														"number": "410W",
														"description": "Fortran...",
														"hours": {
															min: 3,
															max: 3
														},
														"subject": {
															"_id": "1",
															"name": "Computer Science",
															"abbreviation": "CS",
															"__v": 0
														},
														"__v": 0,
														"offerings": []
													}
												],
												credit: "3"
											},
											{
												"separator": "AND",
												"_id": "571339a3145ab8b471163da3",
												isWriteIn: false,
												"courses": [
													{
														"_id": "571339a2145ab8b471163d97",
														"title": "Calculus I",
														"number": "127",
														"description": "Integrals and Derivatives",
														"hours": {
															min: 4,
															max: 5
														},
														"subject": {
															"_id": "3",
															"name": "Math",
															"abbreviation": "MA",
															"__v": 0
														},
														"__v": 0,
														"offerings": []
													},
													{
														"_id": "571339a2145ab8b471163d01",
														"title": "Calculus II",
														"number": "127",
														"description": "More Integrals and Derivatives",
														"hours": {
															min: 4,
															max: 4
														},
														"subject": {
															"_id": "3",
															"name": "Math",
															"abbreviation": "MA",
															"__v": 0
														},
														"__v": 0,
														"offerings": []
													}
												],
												credit: "8 - 9"
											}
										],
										credit: "11 - 12"
									},
									{
										"name": "Other requirements",
										"_id": "571339a3145ab8b471163da3",
										"items": [
											{
												"separator": "OR",
												"_id": "571339a3145ab8b471163da2",
												"courses": [
													{
														"_id": "571339a2145ab8b471163d98",
														"title": "Software Engineering",
														"number": "455",
														"description": "Test test test",
														"hours": {
															min: 3,
															max: 3
														},
														"subject": {
															"_id": "1",
															"name": "Computer Science",
															"abbreviation": "CS",
															"__v": 0
														},
														"__v": 0,
														"offerings": []
													}
												],
												credit: "3"
											},
											{
												"separator": "AND",
												"_id": "571339a2145ab8b471163d98",
												"courses": [],
												"writeIn": {
													"content": "Do a rain dance",
													"hours": {
														min: 2,
														max: 4
													}
												},
												"credit": "2 - 4"
											}
										],
										credit: "5 - 7"
									}
								]
							},
							{
								"_id": "33",
								"name": "Human Computer Interaction/User Experience (HCI/UX)",
								"type": "minor",
								"description": "a description",
								"requirements": []
							}
						]
					},
					{
						"_id": "12",
						"name": "Economics and Finance",
						"description": "a description",
						"programs": [
							{
								"_id": "34",
								"name": "Economics",
								"type": "minor",
								"description": "a description",
								"requirements": []
							}
						]
					},
					{
						"_id": "13",
						"name": "Management and Marketing",
						"description": "a description",
						"programs": [
							{
								"_id": "35",
								"name": "Human Resource Management",
								"type": "minor",
								"description": "a description",
								"requirements": []
							},
							{
								"_id": "37",
								"name": "Marketing Communications and Technology",
								"type": "minor",
								"description": "a description",
								"requirements": []
							},
							{
								"_id": "36",
								"name": "Project Management",
								"type": "minor",
								"description": "a description",
								"requirements": []
							}
						]
					}
				],
				programs: [
					{
						"_id": "38",
						"name": "Underwater Basket Weaving",
						"type": "certificate",
						"description": "a description",
						"requirements": []
					}
				]
			},
			{
				"_id": "4",
				"name": "College of Education and Human Sciences",
			},
			{
				"_id": "5",
				"name": "College of Nursing",
			}
		];
		
		var subjects = [
			{
				"_id": "1",
				"name": "Computer Science",
				"abbreviation": "CS",
				"__v": 0
			},
			{
				"_id": "3",
				"name": "Math",
				"abbreviation": "MA",
				"__v": 0
			},
			{
				"_id": "2",
				"name": "Psychology",
				"abbreviation": "PY",
				"__v": 0
			}
		];
		
		var courses = [
			{
				"_id": "571339a2145ab8b471163d96",
				"title": "Artificial Intelligence",
				"number": "470",
				"description": "Robots and stuff...",
				"hours": {
					min: 3,
					max: 3
				},
				"subject": {
					"_id": "1",
					"name": "Computer Science",
					"abbreviation": "CS",
					"__v": 0
				},
				"__v": 0,
				"offerings": ["Fall", "Spring"]
			},
			{
				"_id": "571339a2145ab8b471163d11",
				"title": "Programming Languages",
				"number": "410W",
				"description": "Fortran...",
				"hours": {
					min: 3,
					max: 3
				},
				"subject": {
					"_id": "1",
					"name": "Computer Science",
					"abbreviation": "CS",
					"__v": 0
				},
				"__v": 0,
				"offerings": []
			},
			{
				"_id": "571339a2145ab8b471163d97",
				"title": "Calculus I",
				"number": "127",
				"description": "Integrals and Derivatives",
				"hours": {
					min: 4,
					max: 5
				},
				"subject": {
					"_id": "3",
					"name": "Math",
					"abbreviation": "MA",
					"__v": 0
				},
				"__v": 0,
				"offerings": []
			},
			{
				"_id": "571339a2145ab8b471163d01",
				"title": "Calculus II",
				"number": "127",
				"description": "More Integrals and Derivatives",
				"hours": {
					min: 4,
					max: 4
				},
				"subject": {
					"_id": "3",
					"name": "Math",
					"abbreviation": "MA",
					"__v": 0
				},
				"__v": 0,
				"offerings": []
			},
			{
				"_id": "571339a2145ab8b471163d98",
				"title": "Software Engineering",
				"number": "455",
				"description": "Test test test",
				"hours": {
					min: 3,
					max: 3
				},
				"subject": {
					"_id": "1",
					"name": "Computer Science",
					"abbreviation": "CS",
					"__v": 0
				},
				"__v": 0,
				"offerings": []
			}
		];
		
		var facultyAndStaff = "Dr. Roden... 'Nuff said."
		
		var urlPrefix = ''; // easily change api url
		
		var getHTTP = function(theUrl, callback) {
			theUrl += urlPrefix;
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function() { 
				if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
					callback(JSON.parse(xmlHttp.responseText));
				}
			}
			xmlHttp.open("GET", theUrl, true); // true for asynchronous 
			xmlHttp.send(null);
		}
		
		var postHTTP = function(theUrl, payload, callback) {
			theUrl += urlPrefix;
			var xmlHttp = new XMLHttpRequest();
			http.setRequestHeader("Content-type", "application/json");
			xmlHttp.onreadystatechange = function() { 
				if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
					callback(JSON.parse(xmlHttp.responseText));
				}
			}
			xmlHttp.open("POST", theUrl, true); // true for asynchronous 
			xmlHttp.send(JSON.stringify(payload));
		}
		
		var putHTTP = function(theUrl, payload, callback) {
			theUrl += urlPrefix;
			var xmlHttp = new XMLHttpRequest();
			http.setRequestHeader("Content-type", "application/json");
			xmlHttp.onreadystatechange = function() { 
				if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
					callback(JSON.parse(xmlHttp.responseText));
				}
			}
			xmlHttp.open("PUT", theUrl, true); // true for asynchronous 
			xmlHttp.send(JSON.stringify(payload));
		}
		
		var deleteHTTP = function(theUrl, callback) {
			theUrl = urlPrefix + theUrl;
			var xmlHttp = new XMLHttpRequest();
			http.setRequestHeader("Content-type", "application/json");
			xmlHttp.onreadystatechange = function() { 
				if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
					callback(JSON.parse(xmlHttp.responseText));
				}
			}
			xmlHttp.open("DELETE", theUrl, true); // true for asynchronous 
			xmlHttp.send(null);
		}
	}
);