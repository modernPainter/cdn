//分享到微博 参数说明：title说明文字，pic小图片，url分享要链接到的地址
function postToWb(title, pic, url) {
	var _t = encodeURI(title); //当前页面title，使用document.title
	var _url = encodeURIComponent(url); //当前页的链接地址使用document.location
	var _appkey = 801298467; //你从腾讯获得的appkey，如果有appkey,直接写入key值，例如：_appkey=123456
	var _pic = encodeURI(pic); //（例如：var _pic='图片url1|图片url2|图片url3....）
	var _site = location.origin; //你的网站地址
	var _u = 'http://v.t.qq.com/share/share.php?title=' + _t + '&url=' + _url + '&appkey=' + _appkey + '&site=' + _site + '&pic=' + _pic;
	w = window.screen.width, h = window.screen.height;
	window.open(_u, '分享到腾讯微博', "height=480,width=608,top=" + (h - 480) / 2 + ",left=" + (w - 608) / 2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}

//分享到QQ空间  参数说明：title标题，summary摘要，pic小图片，url分享要链接到的地址
function postToQzone(title, summary, pic, url) {
	var p = {
		url: url,
		showcount: '1',
		/*是否显示分享总数,显示：'1'，不显示：'0' */
		desc: '',
		/*默认分享理由(可选)*/
		summary: summary,
		/*分享摘要(可选)*/
		title: title,
		/*分享标题(可选)*/
		site: '',
		/*分享来源 如：腾讯网(可选)*/
		pics: pic,
		/*分享图片的路径(可选)*/
		style: '203',
		width: 98,
		height: 22
	};
	var s = [];
	for(var i in p) {
		s.push(i + '=' + encodeURIComponent(p[i] || ''));
	}
	var _u = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + s.join('&');
	w = window.screen.width, h = window.screen.height;
	window.open(_u, '分享到QQ空间和朋友网', "height=580,width=708,top=" + (h - 580) / 2 + ",left=" + (w - 708) / 2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}

//分享到QQ邮箱
function postToQQEmail(title, summary, pic, url) {
	var p = {
		url: url,
		/*当前页面url，使用location.href*/
		to: 'qqmail',
		desc: '',
		/*默认分享理由(可选)*/
		summary: summary,
		/*摘要(可选)*/
		title: title,
		/*分享标题(可选)*/
		site: '',
		/*分享来源 如：腾讯网(可选)*/
		pics: pic /*分享图片的路径(可选)*/
	};
	var s = [];
	for(var i in p) {
		s.push(i + '=' + encodeURIComponent(p[i] || ''));
	}
	w = window.screen.width, h = window.screen.height;
	var _u = 'http://mail.qq.com/cgi-bin/qm_share?' + s.join("&");
	window.open(_u, '分享到QQ邮箱', "height=580,width=708,top=" + (h - 580) / 2 + ",left=" + (w - 708) / 2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
};

//分享到新浪微博
function shareToSina(articleTitle, articleURL, articlePic) {
	var url = "http://v.t.sina.com.cn/share/share.php",
		_url = articleURL,
		_title = articleTitle,
		_appkey = '',
		_ralateUid = '',
		c = '',
		pic = articlePic;
	w = window.screen.width, h = window.screen.height;
	c = url + "?url=" + encodeURIComponent(_url) + "&appkey=" + _appkey + "&title=" + _title + "&pic=" + pic + "&ralateUid=" + _ralateUid + "&language=";
	window.open(c, "shareQQ", "height=480,width=608,top=" + (h - 480) / 2 + ",left=" + (w - 608) / 2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}
//分享到开心
function shareToKaixin(articleTitle, articleURL) {
	var url = "http://www.kaixin001.com/rest/records.php",
		_url = articleURL,
		_title = articleTitle,
		c = '',
		pic = [],
		w = window.screen.width,
		h = window.screen.height;
	c = url + "?content=" + encodeURIComponent(_title) + "&url=" + _url + "&&starid=&aid=&style=11&t=10";
	var win = window.open(c, "shareQQ", "height=480,width=608,top=" + (h - 480) / 2 + ",left=" + (w - 608) / 2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}
//分享到人人
function shareToRenren(articleTitle, articleURL) {
	var url = "http://widget.renren.com/dialog/share",
		_url = articleURL,
		_title = articleTitle,
		c = '',
		pic = [],
		w = window.screen.width,
		h = window.screen.height;
	c = url + "?resourceUrl=" + _url + "&title=" + _title + "&charset=GB2312";
	window.open(c, "shareQQ", "height=480,width=608,top=" + (h - 480) / 2 + ",left=" + (w - 608) / 2 + ",toolbar=no,menubar=no,resizable=yes,location=yes,status=no");
}