const chokidar = require('chokidar');
const path = require('path');
const sharp = require('sharp');


const FILE_TYPES = /\.png$|\.jpe?g$|\.webp$|\.tiff$/;
const OPERATION = { add: true, change: true, unlink: true };


exports.appendSuffix = function(filePath, suffix) {
	var parts = path.parse(filePath);
	parts.name += suffix;
	delete parts.base;
	return path.format(parts);
};


exports.watch = function(inputDir, addOrChange, unlink) {
	var watcher = chokidar.watch('.', { cwd: inputDir, awaitWriteFinish: true, persistent: false });
	return watcher.on('all', function(operation, path) {
		if (!OPERATION[operation] || !FILE_TYPES.test(path))
			return;
		if (operation === 'unlink')
			unlink(path);
		else
			addOrChange(path);
	});
};


exports.resize = function*(input, width, height, output) {
	//use default configurations
	sharp(input).resize(width, height).max().toFile(output);
};
