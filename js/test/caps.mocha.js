/**
 * test describe for parsing capabilities
 *
 * check capabilities for parsed user-agent strings
 *
 * Copyright (c) 2013 Commenthol
 * Released under the MIT License
 */

/*globals describe,it*/

"use strict";

// module dependencies
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var jsyaml = require('js-yaml');
var capsParser = require('../index');
var extend = require('mergee').extend;

// directory of test resources
var resourcesDir = __dirname + "/../../test/resources/",
	capsDir = __dirname + "/../../",
	testcasesFile = 'test_capabilities.json',
	content = fs.readFileSync(resourcesDir + testcasesFile, 'utf8'),
	testcases = JSON.parse(content);

// capability files under test
var capsFiles = [
	'caps_device_type.yaml',
	'caps_user_view.yaml',
	'caps_ie_compatibility.yaml'
];

capsFiles = capsFiles.map(function(file) {
	return path.normalize(capsDir + file);
});

describe('device type tests', function() {
	var capsparser = capsParser(capsFiles);

	testcases.forEach(function(tc) {
		describe(tc.string, function() {
			var capabilities = capsparser.parse(tc);
			it('- device type', function() {
				assert.equal(capabilities.device.type, tc.capabilities.device.type);
			});
			it('- user view', function() {
				assert.equal(capabilities.user.view, tc.capabilities.user.view);
			});
			it('- ie compatibility mode', function() {
				if (tc.capabilities.browser && tc.capabilities.browser.ie_compatibility_mode) {
					assert.deepEqual(capabilities.browser, tc.capabilities.browser);
				}
			});
		});
	});
});
