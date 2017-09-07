#!/usr/bin/env node

const co = require('co');
const fs = require('fs-extra');
const path = require('path');
const { appendSuffix, watch, resize } = require('./autosize');
const program = require('commander');


const run = function(delegate) {
	co(function*() {
		try {
			yield delegate();
		} catch (e) { console.log(e); }
	});
};


const validateConfig = function(configs) {
	if (!Array.isArray(configs))
		throw new Error('config is not an array');
	for (let config of configs) {
		let { inputDir, maxWidth, maxHeight, suffix, outputDir } = config;
		if (typeof maxWidth !== 'number' || maxWidth < 1)
			throw new Error('invalid maxWidth');
		if (typeof maxHeight !== 'number' || maxHeight < 1)
			throw new Error('invalid maxHeight');
		if (typeof suffix !== 'string')
			throw new Error('invalid suffix');
		fs.readdirSync(inputDir);
		fs.readdirSync(outputDir);
	}
};


const handleAdd = function(filePath) {
	var { inputDir, maxWidth, maxHeight, suffix, outputDir } = this;
	var outputPath = path.join(outputDir, appendSuffix(filePath, suffix));
	var inputPath = path.join(inputDir, filePath);
	run(function*() {
		yield fs.ensureDir(path.parse(outputPath).dir);
		yield resize(inputPath, maxWidth, maxHeight, outputPath);
	});
};


const handleRemove = function(filePath) {
	var { inputDir, maxWidth, maxHeight, suffix, outputDir } = this;
	var outputPath = path.join(outputDir, appendSuffix(filePath, suffix));
	run(function*() {
		yield fs.remove(outputPath);
	});
};


run(function* Main() {
	if (require.main !== module)
		return;

	program
		.version('0.1.0')
		.arguments('<configPath>')
		.option('--watch', 'watch files for change automatically')
		.action((arg) => program.configPath = arg);
	program.parse(process.argv);

	if(!program.configPath)
		return console.error('missing argument');

	var configs = yield fs.readJson(program.configPath);
	validateConfig(configs);

	for (let config of configs)
		watch(config.inputDir, handleAdd.bind(config), handleRemove.bind(config), !!program.watch);
});
