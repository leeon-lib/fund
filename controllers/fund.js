/**
 * ===== 基金管理 =====
 *
 * @author	Devin
 */
var FundService = require('../services/fund');
var validator = require('validator');
var fund = {};

// 基金列表页
fund.showList = function(req, res, next) {
	var userId = req.signedCookies && Object.keys(req.signedCookies)[0];
	if (!userId) {
		return res.render('fund/list', {
			funds: [],
			totalInvested: '0.00',
			totalCurrent: '0.00',
			totalReturn: '0.00',
			returnRate: '0.00'
		});
	}
	FundService.getByUserId(userId, function(err, funds) {
		if (err) {
			return next(err);
		}

		var totalInvested = 0;
		var totalCurrent = 0;
		funds.forEach(function(f) {
			totalInvested += f.buy_price * f.amount;
			totalCurrent += f.current_price * f.amount;
		});

		res.render('fund/list', {
			funds: funds,
			totalInvested: totalInvested.toFixed(2),
			totalCurrent: totalCurrent.toFixed(2),
			totalReturn: (totalCurrent - totalInvested).toFixed(2),
			returnRate: totalInvested > 0 ? ((totalCurrent - totalInvested) / totalInvested * 100).toFixed(2) : '0.00'
		});
	});
};

// 添加基金页面
fund.showCreate = function(req, res, next) {
	res.render('fund/create');
};

// 添加基金
fund.create = function(req, res, next) {
	var userId = req.signedCookies && Object.keys(req.signedCookies)[0];
	if (!userId) { return res.redirect('/signin'); }
	var data = {
		user_id: userId,
		name: validator.trim(req.body.name),
		code: validator.trim(req.body.code || ''),
		amount: parseFloat(req.body.amount) || 0,
		buy_price: parseFloat(req.body.buy_price) || 0,
		current_price: parseFloat(req.body.current_price) || 0,
		buy_date: req.body.buy_date || Date.now(),
		note: validator.trim(req.body.note || '')
	};

	if (!data.name) {
		return res.send({ err: true, msg: '请填写基金名称' });
	}

	FundService.create(data, function(err, fund) {
		if (err) {
			return next(err);
		}
		res.redirect('/funds');
	});
};

// 编辑基金页面
fund.showEdit = function(req, res, next) {
	var id = req.params.id;
	FundService.getById(id, function(err, fundItem) {
		if (err) {
			return next(err);
		}
		if (!fundItem) {
			return res.status(404).send('Not Found');
		}
		res.render('fund/edit', { fund: fundItem });
	});
};

// 更新基金
fund.update = function(req, res, next) {
	var id = req.params.id;
	var data = {
		name: validator.trim(req.body.name),
		code: validator.trim(req.body.code || ''),
		amount: parseFloat(req.body.amount) || 0,
		buy_price: parseFloat(req.body.buy_price) || 0,
		current_price: parseFloat(req.body.current_price) || 0,
		buy_date: req.body.buy_date || Date.now(),
		note: validator.trim(req.body.note || '')
	};

	FundService.update(id, data, function(err) {
		if (err) {
			return next(err);
		}
		res.redirect('/funds');
	});
};

// 删除基金
fund.remove = function(req, res, next) {
	var id = req.params.id;
	FundService.remove(id, function(err) {
		if (err) {
			return next(err);
		}
		res.redirect('/funds');
	});
};

module.exports = fund;
