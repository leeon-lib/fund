/**
 * ===== 后台管理 =====
 *
 * @author	Liyn
 * @data	2016.05.24
 */
var UserService = require('../services/user');
var ActivityService = require('../services/activity');
var FundService = require('../services/fund');
var ExpenseService = require('../services/expense');
var admin = {};

// 仪表盘页
admin.showDashboard = function(req, res, next)
{/*{{{*/
	var userId = req.signedCookies && Object.keys(req.signedCookies)[0];

	ActivityService.getRecentAll(10, function(err, activities) {
		if (err) { activities = []; }

		UserService.getAllUndeleted(function(err, users) {
			if (err) { users = []; }

			FundService.getByUserId(userId, function(err, funds) {
				if (err) { funds = []; }

				ExpenseService.getByUserId(userId, function(err, expenses) {
					if (err) { expenses = []; }

					var totalIncome = 0;
					var totalExpense = 0;
					expenses.forEach(function(e) {
						if (e.type === 'income') {
							totalIncome += e.amount;
						} else {
							totalExpense += e.amount;
						}
					});

					var totalInvested = 0;
					var totalCurrent = 0;
					funds.forEach(function(f) {
						totalInvested += f.buy_price * f.amount;
						totalCurrent += f.current_price * f.amount;
					});

					res.render('admin/dashboard', {
						userCount: users.length,
						fundCount: funds.length,
						totalInvested: totalInvested.toFixed(2),
						totalReturn: (totalCurrent - totalInvested).toFixed(2),
						totalIncome: totalIncome.toFixed(2),
						totalExpense: totalExpense.toFixed(2),
						balance: (totalIncome - totalExpense).toFixed(2),
						activities: activities
					});
				});
			});
		});
	});
}/*}}}*/

module.exports = admin;
