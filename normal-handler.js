// var exec = require('child-process-promise').exec;
// var execFile = require('child-process-promise').execFile;
// var AdmZip = require('adm-zip');

var promiseFromChildProcess = require('./promise-from-child-process.js');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;

module.exports = function (req, res) {
	// return promiseFromChildProcess(exec('bash scripts/create-temp-request-dir.sh ' + req.query.v.replace(/[.]/g, '-') + ' ' + req.requestId))
	return promiseFromChildProcess(exec('bash scripts/create-temp-request-dir.sh ' + req.requestId))
	.then(function (result) {
		// console.log(result);
		// console.log("Created temp folder for request " + req.requestId);

		return promiseFromChildProcess(execFile('scripts/create-entry-file.js', [req.requestId, req.query.components.replace(/\s/g, '')]));
	})
	.then(function (result) {
		// console.log(result);
		// console.log('Created entry.js file for webpack build for request ' + req.requestId);

		return promiseFromChildProcess(exec('bash scripts/kickoff-webpack-build.sh ' + req.requestId));
	})
	.then(function (result) {

		// --> HERE

		// console.log(result);
		// console.log('Produced build output for request ' + req.requestId);

		// create zip file and send it
		// var zip = new AdmZip();
		// zip.addLocalFile('webpack-builder/temp/' + req.requestId + '/build/bundle.js');
		// zip.addLocalFile('webpack-builder/temp/' + req.requestId + '/build/bundle.js.map');
		// zip.writeZip('webpack-builder/temp/' + req.requestId + '/build/bundle-with-map.zip');

		// return res.download('webpack-builder/temp/' + req.requestId + '/build/bundle-with-map.zip');

		// right now, just send single bundle file - worry about zipping later
		// res.download('webpack-builder/temp/' + req.requestId + '/build/bundle.js', req.requestId + '.js');
		res.download('webpack-builder/temp/' + req.requestId + '/build/bundle.js', req.requestId + '.js', function (err) {
			if(err) {
				console.log("Error in download call: ", err);
				res.send(400, "Error in download call: " + err);
			}
			promiseFromChildProcess(exec('rm -R webpack-builder/temp/' + req.requestId))
			.then(function (result) {})
			.catch(function (error) {
				console.log("Error in deleting folder: ", error);
				res.send(400, "Error in deleting folder: " + error);
			});
		});
	});	
};