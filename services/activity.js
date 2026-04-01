var models = require('../models');
var Activity = models.Activity;

exports.create = function(data, callback) {
	var activity = new Activity(data);
	activity.save(callback);
};

exports.getByUserId = function(userId, limit, callback) {
	if (typeof limit === 'function') {
		callback = limit;
		limit = 20;
	}
	Activity.find({ user_id: userId })
		.sort({ created_at: -1 })
		.limit(limit)
		.exec(callback);
};

exports.getRecentAll = function(limit, callback) {
	if (typeof limit === 'function') {
		callback = limit;
		limit = 50;
	}
	Activity.find({})
		.sort({ created_at: -1 })
		.limit(limit)
		.exec(callback);
};

exports.countByAction = function(callback) {
	Activity.aggregate([
		{ $group: {
			_id: '$action',
			count: { $sum: 1 }
		}},
		{ $sort: { count: -1 } }
	], callback);
};
