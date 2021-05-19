const copy = require('recursive-copy');
const { templatesDir } = require('./config/constants')


const options = {
  overwrite: true,
  expand: true,
  dot: true,
  junk: true,
};

copy(`./src/${templatesDir}`, `./build/${templatesDir}`, options)
	.then(function(results) {
		console.info('Copied ' + results.length + ' files');
	})
	.catch(function(error) {
		console.error('Copy failed: ' + error);
	});