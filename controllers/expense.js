/**
 * ===== 收支管理 =====
 *
 * @author	Devin
 */
var ExpenseService = require('../services/expense');
var validator = require('validator');
var expense = {};

var CATEGORIES = {
	expense: ['餐饮', '交通', '购物', '住房', '娱乐', '医疗', '教育', '其他'],
	income: ['工资', '奖金', '投资收益', '兼职', '其他']
};

// 收支列表页
expense.showList = function(req, res, next) {
	var userId = req.signedCookies && Object.keys(req.signedCookies)[0];
	ExpenseService.getByUserId(userId, function(err, expenses) {
		if (err) {
			return next(err);
		}

		var totalIncome = 0;
		var totalExpense = 0;
		expenses.forEach(function(e) {
			if (e.type === 'income') {
				totalIncome += e.amount;
			} else {
				totalExpense += e.amount;
			}
		});

		res.render('expense/list', {
			expenses: expenses,
			totalIncome: totalIncome.toFixed(2),
			totalExpense: totalExpense.toFixed(2),
			balance: (totalIncome - totalExpense).toFixed(2),
			categories: CATEGORIES
		});
	});
};

// 添加收支页面
expense.showCreate = function(req, res, next) {
	res.render('expense/create', { categories: CATEGORIES });
};

// 添加收支
expense.create = function(req, res, next) {
	var userId = req.signedCookies && Object.keys(req.signedCookies)[0];
	var data = {
		user_id: userId,
		type: req.body.type,
		category: validator.trim(req.body.category),
		amount: parseFloat(req.body.amount) || 0,
		description: validator.trim(req.body.description || ''),
		date: req.body.date || Date.now()
	};

	if (!data.category || !data.amount) {
		return res.send({ err: true, msg: '请填写完整信息' });
	}

	ExpenseService.create(data, function(err) {
		if (err) {
			return next(err);
		}
		res.redirect('/expenses');
	});
};

// 编辑收支页面
expense.showEdit = function(req, res, next) {
	var id = req.params.id;
	ExpenseService.getById(id, function(err, expenseItem) {
		if (err) {
			return next(err);
		}
		if (!expenseItem) {
			return res.status(404).send('Not Found');
		}
		res.render('expense/edit', { expense: expenseItem, categories: CATEGORIES });
	});
};

// 更新收支
expense.update = function(req, res, next) {
	var id = req.params.id;
	var data = {
		type: req.body.type,
		category: validator.trim(req.body.category),
		amount: parseFloat(req.body.amount) || 0,
		description: validator.trim(req.body.description || ''),
		date: req.body.date || Date.now()
	};

	ExpenseService.update(id, data, function(err) {
		if (err) {
			return next(err);
		}
		res.redirect('/expenses');
	});
};

// 删除收支
expense.remove = function(req, res, next) {
	var id = req.params.id;
	ExpenseService.remove(id, function(err) {
		if (err) {
			return next(err);
		}
		res.redirect('/expenses');
	});
};

// 收支汇总页面
expense.showSummary = function(req, res, next) {
	var userId = req.signedCookies && Object.keys(req.signedCookies)[0];
	ExpenseService.getSummaryByUserId(userId, function(err, summary) {
		if (err) {
			return next(err);
		}

		var incomeTotal = 0;
		var expenseTotal = 0;
		summary.forEach(function(s) {
			if (s._id === 'income') {
				incomeTotal = s.total;
			} else {
				expenseTotal = s.total;
			}
		});

		ExpenseService.getCategorySummary(userId, 'expense', function(err, expenseCategories) {
			if (err) {
				return next(err);
			}
			ExpenseService.getCategorySummary(userId, 'income', function(err, incomeCategories) {
				if (err) {
					return next(err);
				}
				res.render('expense/summary', {
					incomeTotal: incomeTotal.toFixed(2),
					expenseTotal: expenseTotal.toFixed(2),
					balance: (incomeTotal - expenseTotal).toFixed(2),
					expenseCategories: expenseCategories,
					incomeCategories: incomeCategories
				});
			});
		});
	});
};

module.exports = expense;
