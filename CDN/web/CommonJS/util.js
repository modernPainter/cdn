/*防抖动函数*/
function debounce(fn, delayTime, options) {
	if(options) {
		fn();
	}
	var timer;
	return function() {
		var context = this
		var args = arguments
		clearTimeout(timer)
		timer = setTimeout(function() {
			fn.apply(context, args)
		}, delayTime)
	}
}
/*生成num位数的随机的token，默认为10位*/
function getToken(num = 10) {
	var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	var str = '';
	for(var i = 0; i < num; i++) {
		var pos = Math.floor(Math.random() * (arr.length));
		str += arr[pos];
	}
	return str
}
/*获取字符串所需要的总字位数（不是字符串的长度）*/
function GetLength(str) {
	var realLength = 0,
		len = str.length,
		charCode = -1;
	for(var i = 0; i < len; i++) {
		charCode = str.charCodeAt(i);
		if(charCode >= 0 && charCode <= 128) realLength += 1;
		else realLength += 2;
	}
	return realLength;
};
/*时间格式化*/
Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S": this.getMilliseconds()
	}
	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}
/*格式化时间，也获取当前格式化以后的时间*/
function getFormatDate(date, pattern) {
	if(date == undefined) {
		date = new Date();
	}
	if(pattern == undefined) {
		pattern = "yyyy-MM-dd hh:mm:ss";
	}
	return date.format(pattern);
}
function json2url(obj){
	var rtn = "", sign = "&";
	if(typeof obj != "undefined" && obj != null){
		for(var item in obj){
			rtn += item + "=" + obj[item] + sign;
		}
		if(rtn.substring(rtn.length-1) == sign){
			rtn += Math.random();
		}
	}
	return rtn;
}
function appendParams(url, params){
	if(arguments.length == 1){
		params = arguments[0];
		url = "";
	}
	if(typeof url != "undefined" && url != null && url != "" && url != "null"){
		var pms = json2url(params);
		if(pms == ""){
			pms += Math.random();
		}
		return url += ((url.indexOf('?') != -1) ? '&' : '?') + location.search.substring(1) + "&" + pms;
	}else{
		return "";
	}
}
function getParams(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if(r) {
        return decodeURI(r[2]);
    }
    return null;
}
function getInterfaceURL(uri) {
	return window.location.protocol + '//' + window.location.hostname + '/' + uri;
}
/*vue-resource的请求打断写法*/
/* this.$http.get('/someUrl', {

    // use before callback
    before(request) {

      // abort previous request, if exists
      if (this.previousRequest) {
        this.previousRequest.abort();
      }

      // set previous request on Vue instance
      this.previousRequest = request;
    }

  }).then(response => {
    // success callback
  }, response => {
    // error callback
  });*/