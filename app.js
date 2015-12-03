var express = require('express');
var app = express();

var exec = require('child-process-promise').exec;
var execFile = require('child-process-promise').execFile;

//request handled here
app.get('/', function (req, res) {
	// console.log(req.query);
	// have version in req.query.v and components in
	// req.query.components
	exec('bash scripts/version-init.sh ' + req.query.v)
	.then(function(result) {
		console.log(result.stdout);
		console.log(result.stderr);
		console.log('Initialized MUI version');

		//do actual building
		return execFile('scripts/create-entry-file.js', [req.query.v.replace(/[.]/g, '-'), req.query.components.replace(/\s/g, '')]);
	})
	.then(function (result) {
		console.log(result.stdout);
		console.log(result.stderr);
		console.log('Created entry.js file for webpack build');

		return exec('bash scripts/kickoff-webpack-build.sh ' + req.query.v.replace(/[.]/g, '-'));
	})
	.then(function (result) {
		console.log(result.stdout);
		console.log(result.stderr);
		console.log('Produced build output');

		return res.send("check the build folder for the version you specified :)");
	})
	.fail(function (err) {
		console.error('ERROR: ', err);

		return res.send("oops something went wrong: " + err);
	});
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});