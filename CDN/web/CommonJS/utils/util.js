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

/*去除字符串左右两端的空格(trim(str))*/
/*删除左右两端的空格*/
function trim(str) {　　
	return str.replace(/(^\s*)|(\s*$)/g, "");　　
}
/*删除左边的空格*/
function ltrim(str) {　　
	return str.replace(/(^\s*)/g, "");　　
}
/*删除右边的空格*/
function rtrim(str) {　　
	return str.replace(/(\s*$)/g, "");　　
}


//截取路径后面的值
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function GetRequest2() {

    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    var str = "";
    if (url.indexOf("?") != -1) {
        str = url.substr(1);
    }
    return str;
}

function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

//首次进入页面，取得当前时间上一个月的日期
function lastmonth() {
	//var strTime="2011-04-16";    									  //字符串日期格式           
	//var date= new Date(Date.parse(strTime.replace(/-/g,  "/")));      //转换成Data();	
	var myDate = new Date();
	return myDate.getFullYear() + "/" + appendZero(myDate.getMonth() + 1) + "/" + appendZero(myDate.getDate());
}

function TransForm(obj) {
	var item = obj.split("-");
	return item[0] + "." + item[1];
}
//补0函数
function appendZero(s) {
	return("00" + s).substr((s + "").length);
}

function judgeTimeMsg(time) {
	var date1 = new Date(time), //开始时间
		date2 = new Date(), //结束时间
		date3 = date2.getTime() - date1.getTime(), //时间差的毫秒数	
		days = Math.floor(date3 / (24 * 3600 * 1000)), //计算出相差天数	
		leave1 = date3 % (24 * 3600 * 1000), //计算天数后剩余的毫秒数
		hours = Math.floor(leave1 / (3600 * 1000)), //计算出小时数	
		leave2 = leave1 % (3600 * 1000), //计算小时数后剩余的毫秒数
		minutes = Math.floor(leave2 / (60 * 1000)), //计算相差分钟数	
		leave3 = leave2 % (60 * 1000), //计算分钟数后剩余的毫秒数
		seconds = Math.round(leave3 / 1000), //计算相差秒数
		result; //要输出的结果
	//console.info(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒");
	if(days > 0) {
		if(days == 1) {
			result = "昨天";
		} else {
			result = days + "天前";
		}
	} else {
		if(hours > 0) {
			result = hours + "小时前";
		} else {
			if(minutes > 0) {
				result = minutes + "分钟前";
			} else {
				result = seconds + "秒前";
			}
		}
	}
	result = result.toString();
	console.info(result);
	return result;
}
//judgeTimeMsg("2016/12/5");
/*比较版本号的新旧---按数值计算*/
function CompareVersion1(NewestVersion, OldVersion) {
	function addcompute(version) {
		var numarry = version.split("."),
			unit = 0;
		for(var i = 1; i <= numarry.length; i++) {
			unit = unit + Number(numarry[i - 1]) * Math.pow(10, numarry.length - i);
			if(i == numarry.length) {
				return unit;
			}
		}
	}
	var num1 = addcompute(NewestVersion),
		num2 = addcompute(OldVersion);
	if(num1 > num2) {
		return true;
	} else {
		return false;
	}
}
/*CompareVersion2("4.9.6","4.8.7");*/
/*比较版本号的新旧---按点位数比较*/
function CompareVersion2(NewestVersion, OldVersion) {
	function addcompute(ArryUnit1, ArryUnit2) {
		var num1 = Number(ArryUnit1);
		num2 = Number(ArryUnit2);
		if(num1 > num2) {
			return 1;
		} else if(num1 == num2) {
			return 2;
		} else if(num1 < num2) {
			return 3;
		}
	}
	var NewestArry = NewestVersion.split("."),
		OldArry = OldVersion.split("."),
		result = true;
	if(addcompute(NewestArry.length, OldArry.length) == 1) {
		result = true;
	} else if(addcompute(NewestArry.length, OldArry.length) == 2) {
		for(var i = 0; i <= NewestArry.length - 1; i++) {
			if(addcompute(NewestArry[i], OldArry[i]) == 1) {
				result = true;
				break;
			} else if(addcompute(NewestArry[i], OldArry[i]) == 3) {
				result = false;
				break;
			}
			if(i == NewestArry.length - 1) {
				if(addcompute(NewestArry[i], OldArry[i]) == 2) {
					result = false;
					break;
				}
			}
		}
	}
	return result;
}
/*CompareVersion2("3.9.6","3.9.5653");*/
/*判断浏览器*/
function browserRedirect() {
	var sUserAgent = navigator.userAgent.toLowerCase(),
		bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
		bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
		bIsMidp = sUserAgent.match(/midp/i) == "midp",
		bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
		bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
		bIsAndroid = sUserAgent.match(/android/i) == "android",
		bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
		bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		/*要执行的代码*/
		/*window.location.href="";*/
	}
}
/*判断本地图片是否出现*/
function CheckImgExists(imgurl) {
	var ImgObj = new Image(); //判断图片是否存在  
	ImgObj.src = imgurl;
	if(ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
		console.info(ImgObj.fileSize + "," + ImgObj.width + "," + ImgObj.height + ".");
		return true;
	} else {
		return false;
	}
}
//页面使用如下
/*onerror="$(this).hide().parent('.NewVideoImg').addClass('errorUrlImg')"*/

/*onscroll*/

/*
$.parseJSON()

$.inArray("John", Array)
*/

/*
 var a={"m1":{"m5":5,"m6":{"m7":7,"m8":8}},"m2":"2"},b={"m3":"3","m4":"4"};
var c=$.extend(true,{}, a,b);
console.info(JSON.stringify(c));
 */

/*比较版本号的大小*/
function CompareVersion(NewestVersion, OldVersion) {
	function addcompute(ArryUnit1, ArryUnit2) {
		var num1 = Number(ArryUnit1);
		num2 = Number(ArryUnit2);
		if(num1 > num2) {
			return 1;
		} else if(num1 == num2) {
			return 2;
		} else if(num1 < num2) {
			return 3;
		}
	}
	var NewestArry = NewestVersion.split("."),
		OldArry = OldVersion.split("."),
		result = true;
	if(addcompute(NewestArry.length, OldArry.length) == 1) {
		result = true;
	} else if(addcompute(NewestArry.length, OldArry.length) == 2) {
		for(var i = 0; i <= NewestArry.length - 1; i++) {
			if(addcompute(NewestArry[i], OldArry[i]) == 1) {
				result = true;
				break;
			} else if(addcompute(NewestArry[i], OldArry[i]) == 3) {
				result = false;
				break;
			}
			if(i == NewestArry.length - 1) {
				if(addcompute(NewestArry[i], OldArry[i]) == 2) {
					result = true;
					break;
				}
			}
		}
	}
	return result;
}

/*修改URL的参数*/
function changeURLPar(url, ref, value) {
	var str = "";
	if(url.indexOf('?') != -1)
		str = url.substr(url.indexOf('?') + 1);
	else
		return url + "?" + ref + "=" + value;
	var returnurl = "";
	var setparam = "";
	var arr;
	var modify = "0";
	if(str.indexOf('&') != -1) {
		arr = str.split('&');
		for(i in arr) {
			if(arr[i].split('=')[0] == ref) {
				setparam = value;
				modify = "1";
			} else {
				setparam = arr[i].split('=')[1];
			}
			returnurl = returnurl + arr[i].split('=')[0] + "=" + setparam + "&";
		}
		returnurl = returnurl.substr(0, returnurl.length - 1);
		if(modify == "0")
			if(returnurl == str)
				returnurl = returnurl + "&" + ref + "=" + value;
	} else {
		if(str.indexOf('=') != -1) {
			arr = str.split('=');
			if(arr[0] == ref) {
				setparam = value;
				modify = "1";
			} else {
				setparam = arr[1];
			}
			returnurl = arr[0] + "=" + setparam;
			if(modify == "0")
				if(returnurl == str)
					returnurl = returnurl + "&" + ref + "=" + value;
		} else
			returnurl = ref + "=" + value;
	}
	return url.substr(0, url.indexOf('?')) + "?" + returnurl;
}

//时区转换		
function formatTimeZone(time, offset) {
	var d = new Date(time); //创建一个Date对象 time时间 offset 时区  中国为  8		    
	var localTime = d.getTime();
	var localOffset = d.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数		    
	var utc = localTime + localOffset; //utc即GMT时间		    
	var wishTime = utc + (3600000 * offset);
	return new Date(wishTime);
}

/*判断入参是不是一个数组*/
function isArrayFn(value) {
	if(typeof Array.isArray === "function") {
		return Array.isArray(value);
	} else {
		return Object.prototype.toString.call(value) === "[object Array]";
	}
}

//把文件转化为base64的字符串
function analysisImage(file) {
	return new Promise((resolve, reject) => {
		var reader = new FileReader();
		reader.onload = function(event) {
			var getstr = event.target.result.replace(/^data:.*?base64,/g, '');
			resolve(getstr)
		}
		reader.readAsDataURL(file);
	})
}
//将base64转换为blob
function dataURLtoBlob(dataurl) {
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while(n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {
		type: mime
	});
}
//将blob转换为file
function blobToFile(theBlob, fileName) {
	theBlob.lastModifiedDate = new Date();
	theBlob.name = fileName;
	return theBlob;
}
//调用
/*  var blob = dataURLtoBlob(base64Data);
  var file = blobToFile(blob, imgName);*/
 

//判断当前浏览类型
function BrowserType() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
	var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
	var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
	var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
	var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
	var showBGFun = function() {
		document.getElementById("VisualizContainer").style.backgroundImage = "url(img/expbj.jpg)";
	}
	if(isIE) {
		var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp["$1"]);
		if(fIEVersion <= 9) {
			var text1 = "您的IE" + fIEVersion + "版本有点低啊，想体验大屏，请升级最新版本，或者使用谷歌浏览器吧！"
			alert(text1);
			return;
		}
	}
	if(isFF) {
		var version = Number((navigator.userAgent.toLowerCase().match(/firefox\/[\d.]+/gi) + "").replace(/[^0-9.]/ig, ""));
		if(version <= 45) {
			showBGFun();
			var text1 = "您的火狐浏览器版本号" + version + ".*.*偏低，想体验大屏，请升级最新版本，或者使用谷歌浏览器吧！";
			//console.log(text1);
			return;
		}
	}

}

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