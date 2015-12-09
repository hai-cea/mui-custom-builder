var exec = require('child-process-promise').exec;
var execFile = require('child-process-promise').execFile;
// var AdmZip = require('adm-zip');

module.exports = function (req, res) {
	return exec('bash scripts/create-temp-request-dir.sh ' + req.query.v.replace(/[.]/g, '-') + ' ' + req.requestId)
	.then(function (result) {
		console.log(result.stderr);
		console.log("Created temp folder for request " + req.requestId);

		return execFile('scripts/create-entry-file.js', [req.requestId, req.query.components.replace(/\s/g, '')]);
	})
	.then(function (result) {
		console.log(result.stderr);
		console.log('Created entry.js file for webpack build for request ' + req.requestId);

		return exec('bash scripts/kickoff-webpack-build.sh ' + req.requestId);
	})
	.then(function (result) {
		console.log(result.stderr);
		console.log('Produced build output for request ' + req.requestId);

		// create zip file and send it
		// var zip = new AdmZip();
		// zip.addLocalFile('webpack-builder/temp/' + req.requestId + '/build/bundle.js');
		// zip.addLocalFile('webpack-builder/temp/' + req.requestId + '/build/bundle.js.map');
		// zip.writeZip('webpack-builder/temp/' + req.requestId + '/build/bundle-with-map.zip');

		// return res.download('webpack-builder/temp/' + req.requestId + '/build/bundle-with-map.zip');

		// right now, just send single bundle file - worry about zipping later
		return res.download('webpack-builder/temp/' + req.requestId + '/build/bundle.js');
	})
	.then(function () {
		console.log("Successfully handled request " + req.requestId);
		console.log("Deleting its temp folder..");

		return exec('rm -R webpack-builder/temp/' + req.requestId);
	})
	.then(function (result) {
		console.log(result.stderr);
		console.log("Deleted temp folder for request " + req.requestId);
	});
};