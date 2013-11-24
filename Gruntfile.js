/*
 * grunt-tv4
 * https://github.com/Bartvds/grunt-tv4
 *
 * Copyright (c) 2013 Bart van der Schoor
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
	/*jshint unused:false*/

	grunt.loadNpmTasks('grunt-contrib-jshint');

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
		jshint: {
			options: grunt.util._.defaults(grunt.file.readJSON('.jshintrc'), {
				reporter: './node_modules/jshint-path-reporter'
			}),
			all: [
				'Gruntfile.js',
				'lib/**/*.js',
				'tasks/**/*.js'
			]
		}
	});

	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('default', ['test']);
};
