/*本地永久存储*/
var local = {
		//本地永久存储--存储数据
		set: function(key, value) {
			try {
				localStorage.setItem(key, value);
			} catch (oException) {
				if (oException.name == 'QuotaExceededError') {
					console.log('超出该浏览器本地永久存储限额！');
				}
			}
		},
		//本地永久存储--读取数据
		get: function(key) {
			localStorage.getItem(key);
		},
		//本地永久存储--删除数据
		remove: function(key) {
			localStorage.removeItem(key);
		},
		//本地永久存储--读取某项数据的次数
		views: function() {

		},
		//本地永久存储--查看该页面共有多少条数据
		sum: function() {
			return localStorage.length;
		},
		//本地永久存储--清除该页面所有本地永久存储数据
		clear: function() {
			localStorage.clear();
		},
		//本地永久存储--展示该页面所有本地永久存储数据
		showAll: function() {
			if (localStorage.length > 0) {
				for (var i = localStorage.length - 1; i >= 0; i--) {
					console.log('第' + (i + 1) + '条数据的键值为：' + localStorage.key(i) + '，数据为：' + localStorage.getItem(localStorage.key(i)));
				}
			} else {
				console.log("localStorage没有存储数据！")
			}
		},
		//本地永久存储--对页面的访问次数
		counts: function() {
			if (localStorage.pagecount) {
				localStorage.pagecount = Number(localStorage.pagecount) + 1;
			} else {
				localStorage.pagecount = 1;
			}
			console.log("您对本页访问了" + localStorage.pagecount + "次！");
		}
	}
	/*本地临时存储*/
var session = {
		//本地临时存储--存储数据
		set: function(key, value) {
			try {
				sessionStorage.setItem(key, value);
			} catch (oException) {
				if (oException.name == 'QuotaExceededError') {
					console.log('超出该浏览器本地临时存储限额！');
				}
			}
		},
		//本地临时存储--读取数据
		get: function(key) {
			sessionStorage.getItem(key);
		},
		//本地临时存储--删除数据
		remove: function(key) {
			sessionStorage.removeItem(key);
		},
		//本地临时存储--读取某项数据的次数
		views: function() {

		},
		//本地临时存储--查看该页面共有多少条数据
		sum: function() {
			return sessionStorage.length;
		},
		//本地临时存储--清除该页面所有本地临时存储数据
		clear: function() {
			sessionStorage.clear();
		},
		//本地临时存储--展示该页面所有本地临时存储数据
		showAll: function() {
			if (sessionStorage.length > 0) {
				for (var i = sessionStorage.length - 1; i >= 0; i--) {
					console.log('第' + (i + 1) + '条数据的键值为：' + sessionStorage.key(i) + '，数据为：' + sessionStorage.getItem(sessionStorage.key(i)));
				}
			} else {
				console.log("sessionStorage没有存储数据！")
			}
		},
		//本地临时存储--对页面的访问次数
		counts: function() {
			if (sessionStorage.pagecount) {
				sessionStorage.pagecount = Number(sessionStorage.pagecount) + 1;
			} else {
				sessionStorage.pagecount = 1;
			}
			console.log("您对本页访问了" + sessionStorage.pagecount + "次！");
		}
	}
	/*cookies的存储*/
var cookies = {
	/*cookies的存储，cname,cvalue,exdays的类型要求均为字符串*/
	
	/*cookies的存储，时间单位可以为秒s，小时h，天d，如74天为74d，没有单位则为s*/
	set: function(cname, cvalue, exdays) {
		var d = new Date(),
			exdays = cookies.getsec(exdays),
			cname = cname.toString(),
			cvalue = cvalue.toString();
		d.setTime(d.getTime() + (exdays));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	},
	
	/*cookies的存储，以天为单位*/
	setCookie: function(cname, cvalue, exdays) {
		var d = new Date();
		var cname = cname.toString(),
			cvalue = cvalue.toString(),
			exdays = Number(exdays);
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	},
	
	/*cookies的读取，cname的类型是字符串*/
	get: function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	},
	
	//cookies--倒序展示该页面所有存储的所有cookie数据
	showAllR: function() {
		var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
		if (keys!=null) {
			for (var i = keys.length - 1; i >= 0; i--) {
				console.log('第' + (i + 1) + '条数据的键值为：' + keys[i] + '，数据为：' + cookies.get(keys[i]));
			}
		} else {
			console.log("cookies没有存储数据！");
		}
	},
	
	//cookies--正序展示该页面所有存储的所有cookie数据
	showAll: function() {
		var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
		if (keys!=null) {
			for (var i = 1; i <= keys.length; i++) {
				console.log('第' + i + '条数据的键值为：' + keys[i-1] + '，数据为：' + cookies.get(keys[i-1]));
			}
		} else {
			console.log("cookies没有存储数据！");
		}
	},
	
	/*删除cookies*/
	remove: function(name) {
		var exp = new Date(),
			name = name.toString();
		exp.setTime(exp.getTime() - 1);
		var cval = cookies.get(name);
		if (cval != null) {
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		}
	},
	
	//删除当前页的所有cookies
	clear: function() {
		var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
		if (keys!=null) {
			for (var i = keys.length; i--;)
				document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
				console.log("cookies的存储数据已经删除完毕！");
		}else{
		   console.log("cookies没有存储数据！");
		}
	},
	
	/*检测 cookies 是否创建，username的类型是字符串*/
	check: function(username) {
		var user = cookies.get(username);
		if (user != "") {
			alert(user + "的值已存入cookies中！");
		} else {
			user = prompt("请输入想存入的值", "");
			if (user != "" && user != null) {
				cookies.set(username, user, 365);
			}
		}
	},
	
	/*当存入cookies的时候，判断时间的单位，返回对应的实际毫秒时间*/
	getsec: function(str) {
		var str = str.toString(),
			relnum = new RegExp("^[0-9]*$"),
			str1 = str.substring(0, str.length - 1),
			str2 = str.slice(-1);
		if (str2 == "s") {
			return str1 * 1000; //注意：字符串与数字相乘得到的结果是数字
		} else if (str2 == "h") {
			return str1 * 60 * 60 * 1000;
		} else if (str2 == "d") {
			return str1 * 24 * 60 * 60 * 1000;
		} else if (relnum.test(str)) {
			str = Number(str * 1000);
			return str;
		}
	}
}
/*URL传参*/
var TheURL={
	/*URL的拼装*/
	json2url:function (obj){
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
	},
	appendParams:function (url, params){
		if(arguments.length == 1){
			params = arguments[0];
			url = "";
		}
		if(typeof url != "undefined" && url != null && url != "" && url != "null"){
			var pms = TheURL.json2url(params);
			if(pms == ""){
				pms += Math.random();
			}
			return url += ((url.indexOf('?') != -1) ? '&' : '?') + location.search.substring(1) + "&" + pms;
		}else{
			return "";
		}
	},
	getParams:function (name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if(r) {
	        return decodeURI(r[2]);
	    }
	    return null;
	},
	getInterfaceURL:function (uri) {
		return window.location.protocol + '//' + window.location.host + '/' + uri;
	}
}
