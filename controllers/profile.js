/**
 * ===== 用户资料 =====
 *
 * @author	Devin
 */
var User = require('../services/user');
var validator = require('validator');
var utility = require('utility');
var profile = {};

// 个人资料页面
profile.show = function(req, res, next) {
	var userId = req.signedCookies && Object.keys(req.signedCookies)[0];
	User.getUserById(userId, function(err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.redirect('/signin');
		}
		res.render('profile/show', { user: user });
	});
};

// 编辑资料页面
profile.showEdit = function(req, res, next) {
	var userId = req.signedCookies && Object.keys(req.signedCookies)[0];
	User.getUserById(userId, function(err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.redirect('/signin');
		}
		res.render('profile/edit', { user: user });
	});
};

// 更新资料
profile.update = function(req, res, next) {
	var userId = req.signedCookies && Object.keys(req.signedCookies)[0];
	User.getUserById(userId, function(err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.redirect('/signin');
		}

		user.name = validator.trim(req.body.name || '');
		user.updated_at = Date.now();

		user.save(function(err) {
			if (err) {
				return next(err);
			}
			res.redirect('/profile');
		});
	});
};

// 修改密码页面
profile.showChangePassword = function(req, res, next) {
	res.render('profile/password');
};

// 修改密码
profile.changePassword = function(req, res, next) {
	var userId = req.signedCookies && Object.keys(req.signedCookies)[0];
	var oldPassword = validator.trim(req.body.old_password);
	var newPassword = validator.trim(req.body.new_password);
	var confirmPassword = validator.trim(req.body.confirm_password);

	if (!oldPassword || !newPassword || !confirmPassword) {
		return res.render('profile/password', { error_msg: '请填写完整信息' });
	}
	if (newPassword.length < 6) {
		return res.render('profile/password', { error_msg: '新密码长度不可少于6位' });
	}
	if (newPassword !== confirmPassword) {
		return res.render('profile/password', { error_msg: '两次密码输入不一致' });
	}

	User.getUserById(userId, function(err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.redirect('/signin');
		}
		if (utility.md5(oldPassword) !== user.password) {
			return res.render('profile/password', { error_msg: '原密码错误' });
		}

		user.password = utility.md5(newPassword);
		user.updated_at = Date.now();

		user.save(function(err) {
			if (err) {
				return next(err);
			}
			res.render('profile/password', { success_msg: '密码修改成功' });
		});
	});
};

module.exports = profile;
