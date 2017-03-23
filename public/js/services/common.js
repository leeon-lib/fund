/**
 * 错误提示处理
 * @param    string    错误提示内容
 * @return   boolean   false
 */
function showErrorMsg(msg, ms)
{/*{{{*/
	var ms = arguments[1] || 3000;

	var documentWidth = $(document.body).width();
	var divWidth = documentWidth / 4;
	var leftPrecent = (documentWidth - divWidth) / 2 / documentWidth * 100;

	var html = '<div class="alert alert-danger showErrorBox" \
			style="display:none; \
			width: '+ documentWidth/4 +'px; \
			word-break:break-all; \
			text-align:center; \
			position:fixed; \
			top:20px; \
			z-index:10000; \
			left: '+ leftPrecent +'%;">';
		html += '<span>' + msg + '</span></div>';

	if ($('.showErrorBox').length == 0) {

		$('body').prepend(html);

		$('.showErrorBox').fadeIn(500);

		setTimeout(function() {
			$('.showErrorBox').fadeOut(500);
			setTimeout(function() {
				$('.showErrorBox').remove();
			}, 500);
		}, ms);
	}

	return false;
}/*}}}*/

/**
 * 成功提示处理
 * @param    string    错误提示内容
 * @return   boolean   false
 */
function showSuccessMsg(msg, ms)
{/*{{{*/
	var ms = arguments[1] || 3000;

	var documentWidth = $(document.body).width();
	var divWidth = documentWidth / 4;
	var leftPrecent = (documentWidth - divWidth) / 2 / documentWidth * 100;

	var html = '<div class="alert alert-success showErrorBox" \
	style="display:none; \
	width: '+ documentWidth/4 +'px; \
	word-break:break-all; \
	text-align:center; \
	position:fixed; \
	top:20px; \
	z-index:10000; \
	left: '+ leftPrecent +'%;">';
	html += '<span>' + msg + '</span></div>';

	if ($('.showErrorBox').length == 0) {

		$('body').prepend(html);

		$('.showErrorBox').fadeIn(500);

		setTimeout(function() {
			$('.showErrorBox').fadeOut(500);
			setTimeout(function() {
				$('.showErrorBox').remove();
			}, 500);
		}, ms);
	}

	return false;
}/*}}}*/

/**
 * input空值验证
 * @param    object    数组对象
 * @return   boolean   是否通过验证
 */
function validator(arrs)
{/*{{{*/
	var length = arrs.length;
	for (var i=0; i<length; i++) {
		var _this = arrs[i];
		if ($.trim(_this.val()) == '') {
			_this.focus();
			_this.error_msg = _this.error_msg || '请填写完整信息';
			return showErrorMsg(_this.error_msg);
		}
	}
	return true;
}/*}}}*/

/**
 * 获取图片并返回拼接的图片标签
 * @param    int	宽度
 * @param    int    高度
 * @param    string 文件名称
 * @return   string 图片标签
 */
function getLoadingHtml(width, height, fileName)
{/*{{{*/
	var width = arguments[0] || '20';
	var height = arguments[1] || '20';
	var fileName = arguments[2] || '0';

	return '<img width="'+width+'px" height="'+height+'px" src="/images/loaders/loader'+fileName+'.gif" />';
}/*}}}*/

/**
 * 按钮加载状态开关
 * @param    obj    按钮对象
 * @param    bool   开关
 */
function turnButton(obj)
{/*{{{*/
	if (obj.getAttribute('disabled')) {
		obj.removeAttribute('disabled');
		obj.innerHTML = obj.original_html;
	} else {
		obj.setAttribute('disabled', true);
		obj.original_html = obj.innerHTML;
		obj.innerHTML = getLoadingHtml();
	}
}/*}}}*/
