var models = require('../models');
var Fund = models.Fund;

exports.create = function(data, callback) {
	var fund = new Fund(data);
	fund.save(callback);
};

exports.getByUserId = function(userId, callback) {
	Fund.find({ user_id: userId, deleted_at: null })
		.sort({ created_at: -1 })
		.exec(callback);
};

exports.getById = function(id, callback) {
	Fund.findOne({ _id: id }, callback);
};

exports.update = function(id, data, callback) {
	data.updated_at = Date.now();
	Fund.findByIdAndUpdate(id, { $set: data }, { new: true }, callback);
};

exports.remove = function(id, callback) {
	Fund.findByIdAndUpdate(id, { $set: { deleted_at: new Date().toISOString() } }, callback);
};
