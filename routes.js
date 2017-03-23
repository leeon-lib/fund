var express = require('express');
var router = express.Router();

// 前台默认页
router.get('/', function(req, res, next) { res.render('sign/signin');});

// 注册与登录
var sign = require('./controllers/sign');
router.get('/signin', sign.showSignin);
router.post('/signin', sign.login);
router.get('/signup', sign.showSignup);
router.post('/signup', sign.register);
router.get('/resetpassword', sign.showResetPassword);
router.post('/resetpassword', sign.resetPassword);
router.post('/login/forget', sign.resetPassword);
router.get('/activate_account', sign.activate);

var admin = require('./controllers/admin');
router.get('/dashboard', admin.showDashboard);

// 用户管理
var user = require('./controllers/user');
router.get('/users', user.showList);

module.exports = router;
