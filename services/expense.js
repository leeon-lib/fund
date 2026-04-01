var models = require('../models');
var Expense = models.Expense;

exports.create = function(data, callback) {
	var expense = new Expense(data);
	expense.save(callback);
};

exports.getByUserId = function(userId, callback) {
	Expense.find({ user_id: userId, deleted_at: null })
		.sort({ date: -1 })
		.exec(callback);
};

exports.getById = function(id, callback) {
	Expense.findOne({ _id: id }, callback);
};

exports.update = function(id, data, callback) {
	data.updated_at = Date.now();
	Expense.findByIdAndUpdate(id, { $set: data }, { new: true }, callback);
};

exports.remove = function(id, callback) {
	Expense.findByIdAndUpdate(id, { $set: { deleted_at: new Date().toISOString() } }, callback);
};

exports.getSummaryByUserId = function(userId, callback) {
	Expense.aggregate([
		{ $match: { user_id: userId, deleted_at: null } },
		{ $group: {
			_id: '$type',
			total: { $sum: '$amount' },
			count: { $sum: 1 }
		}}
	], callback);
};

exports.getCategorySummary = function(userId, type, callback) {
	Expense.aggregate([
		{ $match: { user_id: userId, type: type, deleted_at: null } },
		{ $group: {
			_id: '$category',
			total: { $sum: '$amount' },
			count: { $sum: 1 }
		}},
		{ $sort: { total: -1 } }
	], callback);
};
