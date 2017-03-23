/**
 * ===== 用户管理 =====
 *
 * @author	Liyn
 * @data	2016.05.24
 */
var config     = require('../config');
var User       = require('../services/user');
var validator  = require('validator');
var utility    = require('utility');
var eventproxy = require('eventproxy');
var user       = {};

// 列表页
user.showList = function(req, res, next)
{/*{{{*/
	User.getAllUndeleted(function(err, users) {
		if (err) {
			return next(err);
		}

		res.send(users);
	});
}/*}}}*/

module.exports = user;
