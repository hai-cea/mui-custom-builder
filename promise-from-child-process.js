var Promise = require('bluebird');

module.exports = function (childProcess) {
	return new Promise(function (resolve, reject) {
		childProcess.addListener("error", reject);
		childProcess.addListener("exit", resolve);
	});
};