/**
 * ===== 后台管理 =====
 *
 * @author	Liyn
 * @data	2016.05.24
 */
var admin =  {};

// 仪表盘页
admin.showDashboard = function(req, res, next)
{/*{{{*/
	res.render('admin/dashboard', {
        user: 111,
        suc: 222
    });
}/*}}}*/

module.exports = admin;
