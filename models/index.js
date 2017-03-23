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

exports.User = mongoose.model('User');
