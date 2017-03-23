/**
 * ===== 中间件 =====
 *
 * @author	Liyn
 * @data	2016.05.24
 */
function genSession(user, res)
{/*{{{*/
	var token = user._id + '###';
	var opts = {
		path: '/',
		maxAge: 1000 * 60 * 60 *24 * 30,
		signed: true,
		httpOnly: true
	};

	res.cookie(user._id, token, opts);
}/*}}}*/

exports.genSession = genSession;
