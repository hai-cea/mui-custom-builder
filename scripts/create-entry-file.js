#!/usr/bin/env node

//ideally have multiple component maps for different versions
//in case there are any changes in require statements

var Promise = require('bluebird');
var writeFileAsync = Promise.promisify(require('fs').writeFile);
// var fs = require('fs');
var map = require('./component-map.js');

// console.log(process.argv[2]);
// console.log(process.argv[3].split(','));
// console.log(map);

//build file contents
var components, fileContent = [
	"const React = require('react');\n",
	"const ReactDOM = require('react-dom');\n",
	"const injectTapEventPlugin = require('react-tap-event-plugin');\n\n"
];

// fileContent.push("const React = require('react');\n");
// fileContent.push("const ReactDOM = require('react-dom');\n");
// fileContent.push("const injectTapEventPlugin = require('react-tap-event-plugin');\n\n");

//are all components required?
if(process.argv[3] === 'ALL') {
	fileContent.push("const mui = require('material-ui');\n\n");
}

else {
	components = process.argv[3].split(',');
	for(var i = 0; i < components.length; i++) {
		fileContent.push("const " + components[i] + " = require('material-ui/lib/" + map[components[i]] + "');\n");
	}
}

fileContent.push("\n(function () {\n\twindow.React = React;\n\twindow.ReactDOM = ReactDOM\n");
// fileContent.push("\twindow.React = React;\n");
// fileContent.push("\twindow.ReactDOM = ReactDOM\n");

if(process.argv[3] === 'ALL') {
	fileContent.push("\twindow.mui = mui\n");
}

else {
	fileContent.push("\twindow.mui = {\n");
	for(var i = 0; i < components.length; i++) {
		fileContent.push("\t\t" + components[i] + ": " + components[i] + ",\n");
	}
	fileContent.push("\t};\n");
}

fileContent.push("\tinjectTapEventPlugin();\n})();\n");
// fileContent.push("})();\n");

return writeFileAsync('webpack-builder/temp/' + process.argv[2] + '/entry.js', fileContent.join(''));