const chokidar = require('chokidar');
const path = require('path');


exports.appendSuffix = function(filePath, suffix) {
	var parts = path.parse(filePath);
	parts.name += suffix;
	delete parts.base;
	return path.format(parts);
};


exports.watch = function(inputDir, addOrChange, unlink) {
	const OPERATION = { add: true, change: true, unlink: true };
	const filter = /\.png$|\.jpe?g$/;
	var watcher = chokidar.watch('.', { cwd: inputDir, awaitWriteFinish: true });
	return watcher.on('all', function(operation, path) {
		if (!OPERATION[operation] || !filter.test(path))
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
