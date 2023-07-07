# tv4-reporter

[![npm version](https://img.shields.io/npm/v/tv4-reporter.svg)](https://www.npmjs.com/package/tv4-reporter)
[![Downloads/month](https://img.shields.io/npm/dm/tv4-reporter.svg)](https://www.npmjs.com/package/tv4-reporter)
[![Build Status](https://travis-ci.com/timbeadle/tv4-reporter.svg?branch=master)](https://travis-ci.com/timbeadle/tv4-reporter)
[![Dependency Status](https://david-dm.org/timbeadle/tv4-reporter.svg)](https://david-dm.org/timbeadle/tv4-reporter)
[![devDependency Status](https://david-dm.org/timbeadle/tv4-reporter/dev-status.svg)](https://david-dm.org/timbeadle/tv4-reporter#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/timbeadle/tv4-reporter/badges/gpa.svg)](https://codeclimate.com/github/timbeadle/tv4-reporter)
[![DepShield Badge](https://depshield.sonatype.org/badges/timbeadle/tv4-reporter/depshield.svg)](https://depshield.github.io)
[![Known Vulnerabilities](https://snyk.io/test/github/timbeadle/tv4-reporter/badge.svg)](https://snyk.io/test/github/timbeadle/tv4-reporter)

> Reporters to display usable [Tiny Validator tv4](https://github.com/geraintluff/tv4) output of [json-schema](http://jsonschema.org) validation.

This module is used by various dependents to render `tv4` validation result objects in a compact but highly readable (and possibly colourful) format. Functionality is tuned for both CLI output as well as plain-text or pre-formatted HTML/CSS.

**Note:** at this point this is *not* a 'validator' or 'test runner', nor is it a finished application. It is a library to use as dependency in `tv4` based testers. Use plain `tv4` and pass the result(s) to one of `tv4-reporters` helpers. If you are looking for a validator see one of the implementing tv4 wrappers for convenience (some linked below).

## Features

* Indented, tree-like display.
* Single and multiple errors.
* Optionally display summaries.
* Recursive sub-errors (as generated by `anyOf`, `oneOf` etc).
* Missing sub-schemas (optionally report as fail or pass reason).
* Various output writer/coloriser modes using [ministyle](https://github.com/Bartvds/ministyle) and [miniwrite](https://github.com/Bartvds/miniwrite).

## Examples

(possibly outdated)

1. Examples of many different kind of errors in [this Travis-Ci build](https://travis-ci.org/Bartvds/grunt-tv4/jobs/14469941).
1. Bulk reporter with single error:

  [![WebStorm example](https://raw.github.com/timbeadle/tv4-reporter/master/media/webstorm-example-01.png)](https://raw.github.com/timbeadle/tv4-reporter/master/media/webstorm-example-01.png)

## Installation

```shell
$ npm install tv4-reporter --save-dev
```

## Usage

Still very-much in flux so possibly outdated examples.

Minimal use case (likely this is spread over the implementing application):
````js
// assemble the components
var tv4 = require('tv4');
var out = require('miniwrite').console();
var style = require('ministyle').ansi();
var reporter = require('tv4-reporter').getReporter(out, style);

// now validate
var result = tv4.validateMultiple(myValue, mySchema);
if (!result.valid || result.missing.length > 0) {
	// get data object (might get these in bulk/async from somewhere)
	var res = reporter.createTest(mySchema, myValue, 'my special test', true);

	// report error
	reporter.reportResult(res);

	// if you have a many results you can use bulk to print nicely with summaries
	reporter.reportBulk([res, res2, res3], [pass1, pass2]);

	// only totals
	reporter.reportTotals(3, 4);
}
````

Bulk reporting:
````js
// if you have a many results you can use bulk to print nicely with summaries
reporter.reportBulk([res, res2, res3], [pass1, pass2]);

// only totals
reporter.reportTotals(3, 4);
````

For more API surface like (partial) reporter and various helpers see the exports in the main module. Also see the 'known dependants' for more examples.

## Output

Report output and styling done via extensible mini-api's:

* [ministyle](https://github.com/Bartvds/ministyle) (bundled with plain, ansi, html/css etc + utils)
* [miniwrite](https://github.com/Bartvds/miniwrite) (bundled with streaming console.log, line buffer, node-streams etc + utils)

## Known dependents

* [grunt-tv4](https://github.com/timbeadle/grunt-tv4) (bulk validator with http lookup for grunt)
* ~~[chai-json-schema](https://github.com/Bartvds/chai-json-schema) (assertion wrappers)~~ (update in progress)
* (planned) a commandline validator (cued for extraction from `grunt-tv4`)
* (planned) a json-schema assert()-ion (chai-json-schema without chai)

## Future

1. Output will likely be tuned over time.
1. Current version is very functional but doesn't yet do anything specific for each validation rule type.

## Release history

* See [CHANGELOG](https://github.com/timbeadle/tv4-reporter/blob/main-4.x/CHANGELOG.md)

## Build

Nothing much here as the code is still being extracted from the original projects.

~~Install development dependencies in your git checkout:~~

    $ npm install

~~Build and run tests:~~

    $ grunt

See the `Gruntfile.js` for additional commands.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

*Note:* this is an opinionated module: please create a [ticket](https://github.com/timbeadle/tv4-reporter/issues) to discuss any big ideas. Pull requests for bug fixes are of course always welcome.

## License

Copyright (c) 2013 Bart van der Schoor

Licensed under the MIT license.
