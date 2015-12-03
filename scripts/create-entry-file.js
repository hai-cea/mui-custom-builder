#!/usr/bin/env node

//ideally have multiple component maps for different versions
//in case there are any changes in require statements

var fs = require('fs');
var map = require('./component-map.js');

// console.log(process.argv[2]);
// console.log(process.argv[3].split(','));
// console.log(map);

//build file contents
var fileContent = [], components;
fileContent.push("const React = require('react');\n");
fileContent.push("const ReactDOM = require('react-dom');\n");
fileContent.push("const injectTapEventPlugin = require('react-tap-event-plugin');\n\n");

//are all components required?
if(process.argv[3] === 'ALL') {
	fileContent.push("const mui = require('material-ui');\n\n");
}

else {
	components = process.argv[3].split(',');
	components.forEach(function(comp) {
		fileContent.push("const " + comp + " = require('material-ui/lib/" + map[comp] + "');\n");
	});
}

fileContent.push("\n(function () {\n");
fileContent.push("\twindow.React = React;\n");
fileContent.push("\twindow.ReactDOM = ReactDOM\n");

if(process.argv[3] === 'ALL') {
	fileContent.push("\twindow.mui = mui\n");
}

else {
	fileContent.push("\twindow.mui = {\n");
	components.forEach(function(comp) {
		fileContent.push("\t\t" + comp + ": " + comp + ",\n");
	});
	fileContent.push("\t};\n");
}

fileContent.push("\tinjectTapEventPlugin();\n");
fileContent.push("})();\n");

fs.writeFileSync('webpack-builder/' + process.argv[2] + '/entry.js', fileContent.join(''));