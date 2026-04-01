var config = require('../config');
var mongoose = require('mongoose');

mongoose.connect(config.db, {
	server: { poolSize: 20 }
}, function (err) {
	if (err) {
		console.log('connect err：' + err);
		process.exit(1);
	}
});

require('./user');
require('./fund');
require('./expense');
require('./activity');

exports.User = mongoose.model('User');
exports.Fund = mongoose.model('Fund');
exports.Expense = mongoose.model('Expense');
exports.Activity = mongoose.model('Activity');
