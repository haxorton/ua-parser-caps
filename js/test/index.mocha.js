/**
 * test suite for caps parser
 *
 * Copyright (c) 2013 Commenthol
 * Released under the MIT License
 */

/*globals suite,test*/

"use strict";

// module dependencies
var assert = require('assert'),
	fs = require('fs'),
	path = require('path'),
	jsyaml = require('js-yaml'),
	capsparserM = require('../index'),
	extend = require('../util/extend').extend;

// directory of test resources
var resourcesDir = __dirname + "/../../test/resources/parser/";

/**
 * generate the test batches from the testcases.yaml file
 *
 * @param {String} file : filename of testcases yaml file
 * @return {Object} batch for vows tests
 */
function batch(file) {
	// load tests
	var content = fs.readFileSync(resourcesDir + file, 'utf8');
	var testcases = jsyaml.safeLoad(content);

	testcases.forEach(function(tc) {

		// add path to all test files
		tc.setup.files = tc.setup.files.map(function(file) {
			return path.normalize(resourcesDir + file);
		});

		test(tc.test, function() {
			var capsparser = capsparserM(tc.setup.files);
			//~ capsparser.printCaps();
			var result = capsparser.parser(tc.setup.uaparsed).parse();
			assert.deepEqual(result, tc.result);
		});
	});
}

suite('capability parser tests basic', function() {
	batch("testcases_basic.yaml");
});

suite('capability parser tests regexes', function() {
	batch("testcases_regexes.yaml");
});

suite('capability parser tests extends', function() {
	batch("testcases_extends.yaml");
});

suite('capability parser tests filemerge', function() {
	batch("testcases_filemerge.yaml");
});

suite('capability parser tests brand-model', function() {
	batch("testcases_brandmodel.yaml");
});