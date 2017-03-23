/**
 * ===== 注册与登录 =====
 *
 * @author	Liyn
 * @data	2016.05.24
 */
var config     = require('../config');
var mail       = require('../common/mail');
var User       = require('../services').User;
var validator  = require('validator');
var utility    = require('utility');
var eventproxy = require('eventproxy');
var auth       = require('../middlewares/auth');
var sign       = {};

/**
 * 登录页面
 */
sign.showSignin = function(req, res, next)
{/*{{{*/
	var data = {
		type: 'signin',
		title: 'Express'
	};
	res.render('sign/signin', data);
};/*}}}*/

/**
 * 注册页面
 */
sign.showSignup = function(req, res, next)
{/*{{{*/
	var data = {
		type: 'signup',
		title: 'Express'
	};
	res.render('sign/signup', data);
};/*}}}*/

/**
 * 登录
 */
sign.login = function(req, res, next)
{/*{{{*/
	var email    = validator.trim(req.body.email).toLowerCase();
	var password = validator.trim(req.body.password);

	var ep = new eventproxy();
	ep.on('login_error', function(msg) {
		res.status(200);
		res.render('sign/signin', { email: email, error_no: 1, error_msg: msg });
	});

	User.getUserByMail(email, function(err, user) {
		if (! user || utility.md5(password) !== user.password) {
			return ep.emit('login_error', '用户名或密码错误');
		}
		if (! user.is_activated) {
			return ep.emit('login_error', '该账户暂未激活');
		}
		// 设置cookie、session
		auth.genSession(user, res);

		res.redirect('/index');
	});
};/*}}}*/

/**
 * 注册账号
 */
sign.register = function(req, res, next)
{/*{{{*/
	var email =	validator.trim(req.body.email).toLowerCase();
	var password = validator.trim(req.body.password);
	var repassword = validator.trim(req.body.repassword);
	var ep = new eventproxy();

	// 错误处理
	ep.on('register_error', function(msg) {
		res.status(200);
		res.send({ err: true, msg: msg });
	});

	// 数据验证
	if ([email, password, repassword].some(function (item) { return item === ''; })) {
		return ep.emit('register_error', '请填写完整信息');
	}
	if (! validator.isEmail(email)) {
		return ep.emit('register_error', '请填写合法邮箱');
	}
	if (password.length < 6) {
		return ep.emit('register_error', '密码长度不可少于6位');
	}
	if (password != repassword) {
		return ep.emit('register_error', '两次密码输入不一致');
	}

	// 检测邮箱是否可用
	User.getUserByMail(email, function(err, user) {
		if (user) {
			return ep.emit('register_error', '该邮箱已被注册');
		} else {
			return ep.emit('createUser');
		}
	});

	// 写入用户数据
	ep.all('createUser', function() {
		User.create(email, utility.md5(password), function(err, user) {
			if (err) {
				return next(err);
			}

			// 发送激活邮件
			mail.sendActivate(email, utility.md5(user.email + user.password + config.secret_key), user.id);

			var mailHost = 'http://mail.' + email.substring(email.indexOf('@')+1, email.indexOf('.')) + '.com/';
			res.render('sign/activate', {
				title: '注册成功',
				content: '我们已向您的注册邮箱发送了一封激活邮件，请在24小时内登录邮箱点击邮件中的链接予以激活账户。',
				loginURL: mailHost,
			});
		});
	});
};/*}}}*/

/**
 * 重置密码
 */
sign.resetPassword = function(req, res, next)
{/*{{{*/

};/*}}}*/

/**
 * 重置密码页面
 */
sign.showResetPassword = function(req, res, next)
{/*{{{*/
	res.render('sign/reset');
}/*}}}*/

// 重置密码
sign.resetPassword = function(req, res, next)
{/*{{{*/
	var email = validator.trim(req.body.email).toLowerCase();

	var ep = new eventproxy();
	ep.on('error', function(msg) {
		res.status(200);
		res.render('sign/reset', { err: true, msg: msg });
	});

	if (! validator.isEmail(email)) {
		return ep.emit('error', '请填写合法的邮箱');
	}

	UserService.getUserByMail(email, function(err, user) {
		if (! user) {
			return ep.emit('error', '请填写正确的注册邮箱');
		}

		mail.sendResetPassword(email, '111', 'Liyn');
	});
};/*}}}*/

/**
 * 激活账户
 * @author	Liyn
 * @data	2016.06.10
 */
sign.activate = function(req, res, next)
{/*{{{*/
	var id = validator.trim(req.query.id);
	var key = validator.trim(req.query.key);

	var ep = new eventproxy();
	ep.on('error', function() {
		res.render('sign/activate', {
			title: '操作失败',
			content: '激活账户的链接错误或已失效！',
			loginURL: '',
			is_activate: false,
		});
	});

	User.getUserById(id, function(err, user) {
		if (err) {
			return next(err);
		}
		if (! user) {
			ep.emit('error');
		}
		var realKey = utility.md5(user.email + user.password + config.secret_key);
		if (realKey != key) {
			ep.emit('error');
		}

		user.is_activated = true;
		user.save(function(err) {
			if (err) {
				return next(err);
			}

			res.render('sign/activate', {
				title: '激活成功',
				content: '您的账户已激活成功，欢迎使用！',
				loginURL: '',
				is_activate: true,
			});
		});
	});
}/*}}}*/

module.exports = sign;
