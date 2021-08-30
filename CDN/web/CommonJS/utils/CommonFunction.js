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