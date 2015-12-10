var express = require('express');

var promiseFromChildProcess = require('./promise-from-child-process.js');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;

var fs = require('fs');
var cuid = require('cuid');
var normalHandler = require('./normal-handler.js');

var app = express();

// populate hash for version master folders
var masterHash = {};
var contents = fs.readdirSync('./webpack-builder/');

if(contents === undefined || contents === null || contents.length === 0) {
	console.log("Error reading webpack-builder directory");
	process.exit;
}

contents.forEach(function (dir) {
	if(dir.match(/.+[-].+[-].+/g) !== null) {
		masterHash[dir] = true;
	}
});

// assign id to request
var requestId = function requestId(req, res, next) {
  req.requestId = cuid();
  next();
};
app.use(requestId);

// configure route
app.get('/', function (req, res) {
	// res.write('This may take a couple minutes (for real)..');

	var masterFolder = req.query.v.replace(/[.]/g, '-');

	if(masterHash[masterFolder] === undefined) {
		//set to false and initialize first
		masterHash[masterFolder] = false;

		promiseFromChildProcess(exec('bash scripts/version-init.sh ' + req.query.v))
		.then(function (result) {
			console.log(result);
			console.log("Initialized MUI version " + req.query.v);
			masterHash[masterFolder] = true;

			return normalHandler(req, res);
		})
		.catch(function (err) {
			console.error('ERROR: ', err);
			res.send("oops something went wrong: " + err);
		});
	}

	else if(masterHash[masterFolder] === true) {
		//continue as usual
		normalHandler(req, res)
		.catch(function (err) {
			console.error('ERROR: ', err);
			res.send("oops something went wrong: " + err);
		});	
	}

	else if(masterHash[masterFolder] === false) {
		//check every three seconds
		var checker = setInterval(function () {
			if(masterHash[masterFolder] === false) {
				//do nothing, let interval repeat
			}

			else {
				//clear interval and continue as usual
				clearInterval(checker);
				normalHandler(req, res)
				.catch(function (err) {
					console.error('ERROR: ', err);
					res.send("oops something went wrong: " + err);
				});	
			}
		}, 3000);
	}

	else {
		res.send("oops something went wrong: hit else");
	}
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});