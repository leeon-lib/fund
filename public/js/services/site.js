/**
 *
 *
 */
var loginForm = $('.form-login');
var loginButton = $('.btn-login');

var registerForm = $('.form-register');
var registerButton = $('.btn-register')

var site = {};

$(function() {
	var returnError = $('.return-error');
	if (returnError.length > 0) {
		showErrorMsg(returnError.text());
		returnError.remove();
	}
});
// 注册
registerButton.on('click', function(obj)
{/*{{{*/
	var obj = this;

	turnButton(obj);

	var email      = $('input[name = "email"]');
	var password   = $('input[name = "password"]');
	var repassword = $('input[name = "repassword"]');

	// 验证空值
	var approved = validator([ email, password, repassword ]);
	if (! approved) {
		turnButton(obj);
		return false;
	}
	if ($.trim(password.val()) !== $.trim(repassword.val())) {
		turnButton(obj);
		return showErrorMsg('两次密码输入不一致');
	}

	registerForm.submit();
});/*}}}*/

// 登录
loginButton.on('click', function()
{/*{{{*/
	var obj = this;
	turnButton(obj);

	var email = $('input[name="email"]');
	var password = $('input[name="password"]');

	// input空值验证
	var approved = validator([ email, password ]);
	if (! approved) {
		turnButton(obj);
		return false;
	}
	loginForm.submit();
});/*}}}*/

// 忘记密码
site.reset = function(obj)
{/*{{{*/
	turnButton(obj);
	var email = $('input[name="email"]');
	if (! validator([email])) {
		turnButton(obj);
		return false;
	}
	$('.form-resetpassword').submit();
};/*}}}*/
