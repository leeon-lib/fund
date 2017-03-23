var models = require('../models');
var User = models.User;
var utility = require('utility');

/**
 * 添加用户
 */
exports.create = function(email, password, callback)
{/*{{{*/
	var user = new User();
	user.email = email;
	user.password = password;

	user.save(callback);
};/*}}}*/

/**
 * 根据email获取用户
 */
exports.getUserByMail = function (email, callback)
{/*{{{*/
	User.findOne({ email: email }, callback);
};/*}}}*/

// 根据ID获取用户
exports.getUserById = function(id, callback)
{/*{{{*/
	User.findOne({ _id: id }, callback);
}/*}}}*/

// 获取未删除的所有用户
exports.getAllUndeleted = function(callback)
{/*{{{*/
	User.find({ deleted_at: null }, callback);
}/*}}}*/
