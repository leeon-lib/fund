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

// 基金管理
var fund = require('./controllers/fund');
router.get('/funds', fund.showList);
router.get('/funds/create', fund.showCreate);
router.post('/funds', fund.create);
router.get('/funds/:id/edit', fund.showEdit);
router.post('/funds/:id/update', fund.update);
router.post('/funds/:id/delete', fund.remove);

// 收支管理
var expense = require('./controllers/expense');
router.get('/expenses', expense.showList);
router.get('/expenses/create', expense.showCreate);
router.get('/expenses/summary', expense.showSummary);
router.post('/expenses', expense.create);
router.get('/expenses/:id/edit', expense.showEdit);
router.post('/expenses/:id/update', expense.update);
router.post('/expenses/:id/delete', expense.remove);

// 个人资料
var profile = require('./controllers/profile');
router.get('/profile', profile.show);
router.get('/profile/edit', profile.showEdit);
router.post('/profile/update', profile.update);
router.get('/profile/password', profile.showChangePassword);
router.post('/profile/password', profile.changePassword);

module.exports = router;
