# img-autosize
Read all images in a directory and automatically resize them to various sizes, optimized for http serving.

## Installation
```
npm install -g img-autosize
```

## Usage
```
img-autosize config.json
img-autosize --watch config.json
```

## Example Config
```json
[{
	"inputDir": "test_input",
	"maxWidth": 400,
	"maxHeight": 400,
	"suffix": "_m",
	"outputDir": "test_output"
}]
```

## How it works
1. read config file which is an array of `{ inputDir, maxWidth, maxHeight, suffix, outputDir }`
2. watch every jpeg, jpg, and png files in `inputDir` and its descentdant for changes
3. if a new file is added, a resized version of that file with `suffix` is created to the `outputDir`.
4. if a file is deleted, all resized version of that file is also deleted.
5. if a file is changed, similar to when a file is created.

- Don't use inputDir and outputDir as the same folder or is a descendant of one another as it can cause infinite loop
- We use [chokidar](https://github.com/paulmillr/chokidar) and [sharp](https://github.com/lovell/sharp).