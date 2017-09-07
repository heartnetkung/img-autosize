require('jasmine-co').install();
const logic = require('../src/logic');
const path = require('path');
const fs = require('fs');


const inputDir = path.join(__dirname, '../test_input');
const outputDir = path.join(__dirname, '../test_output');


describe('logic.appendSuffix(filePath, suffix)', function() {
	it('should handle both file and path', function() {
		expect(logic.appendSuffix('/abc/def.jpg', '_l')).toEqual('/abc/def_l.jpg');
		expect(logic.appendSuffix('def.jpg', '_l')).toEqual('def_l.jpg');
	});
});


describe('logic.watch(inputDir, addOrChange, unlink, persistent)', function() {
	it('should work in non-watch mode', function(cb) {
		const set = new Set();
		var chokidar = logic.watch('test_input', (path) => set.add(path), () => null, false);
		chokidar.on('ready', function() {
			expect(set.has('423751522.jpg'));
			expect(set.has('shot.png'));
			expect(set.has('inner/8NPnVH6.jpeg'));
			expect(set.size).toBe(3);
			cb();
		});
	})
});
