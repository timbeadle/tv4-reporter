/*
 * grunt-tv4
 * https://github.com/Bartvds/grunt-tv4
 *
 * Copyright (c) 2013 Bart van der Schoor
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
	/*eslint no-unused-vars:0 */

	require('load-grunt-tasks')(grunt);

	var util = require('util');

	//used by format checker
	var dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;
	var dateValidateCallback = function (data, schema) {
		if (typeof data !== 'string' || !dateRegex.test(data)) {
			// return error message
			return 'value must be string of the form: YYYY-MM-DD';
		}
		return null;
	};

	grunt.initConfig({
		eslint: {
			options: {
				configFile: '.eslintrc'
			},
			src: [
				'Gruntfile.js',
				'lib/**/*.js',
				'tasks/**/*.js'
			]
		},
		'release-it': {
			options: {
				pkgFiles: ['package.json'],
				commitMessage: 'Release %s',
				tagName: '%s',
				tagAnnotation: 'Release %s',
				buildCommand: false
			}
		}
	});

	grunt.registerTask('test', ['eslint']);
	grunt.registerTask('default', ['test']);
};
