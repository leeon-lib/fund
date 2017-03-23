/**
 * 发送邮件
 * @author	Liyn
 * @data	2016.05.29
 */
var config        = require('../config');
var mailer        = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter   = mailer.createTransport(smtpTransport(config.mail_opts));
var SITE_ROOT_URL = 'http://127.0.0.1:3000';

// 发送自定义邮件
var sendMail = function(sendParams)
{/*{{{*/
	transporter.sendMail(sendParams, function(err, info) {
		if (err) {
			console.log(err);
		}
	});
}/*}}}*/
exports.sendMail = sendMail;

// 发送激活邮件
exports.sendActivate = function(to, token, id)
{/*{{{*/
	var html = '<h3>您好</h3>';
	html += '<p>请点击以下链接以激活账户：</p>';
	html += '<a href="' + SITE_ROOT_URL + '/activate_account?key=' + token + '&id=' + id + '">点击激活</a>';

	var from = 'Liyn <sviplee@126.com>';
	exports.sendMail({
		from: from,
		to: to,
		subject: '激活账户',
		html: html
	});
}/*}}}*/

// 发送重置密码邮件
exports.sendResetPassword = function(to, token, name)
{/*{{{*/
	var html = '<h3>您好，' + name + '</h3>';
	html += '<p>请点击以下链接以重置账户密码：</p>';
	html += '<a href="' + SITE_ROOT_URL + '/reset_password?key=' + token + '&name=' + name + '">点击激活</a>';

	var from = 'Liyn <sviplee@126.com>';
	exports.sendMail({
		from: from,
		to: to,
		subject: '重置密码',
		html: html
	});
}/*}}}*/
