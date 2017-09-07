require('jasmine-co').install();
const autosize = require('../src/autosize');
const path = require('path');
const fs = require('fs');


const inputDir = path.join(__dirname, '../test_input');
const outputDir = path.join(__dirname, '../test_output');


describe('autosize.appendSuffix(filePath, suffix)', function() {
	it('should work', function() {
		expect(autosize.appendSuffix('/abc/def.jpg', '_l')).toEqual('/abc/def_l.jpg');
		expect(autosize.appendSuffix('def.jpg', '_l')).toEqual('def_l.jpg');
	});
});
