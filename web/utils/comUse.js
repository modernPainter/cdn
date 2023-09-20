/*存储类*/
const memory = {
	get: function (key) {
		return localStorage.getItem(key);
	},
	set: function (key, value) {
		return localStorage.setItem(key, value);
	},
	remove: function (key) {
		return localStorage.removeItem(key);
	},
	removeAll: function () {
		return localStorage.clear();
	},
}
/*方法类*/
const ComUse = {
	//URL截取路径后面的值
	GetRequest: function () {
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
	},
	GetUrlRequest: function (urlStr) {
		var theRequest = new Object();
		var strs = urlStr.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = (strs[i].substr(strs[i].indexOf('=') + 1));
		}
		return theRequest;
	},
	getUrlParam: function (k) {
		var t = decodeURIComponent(window.location.search);
		if (t) {
			var re = new RegExp("(^|&)" + k + "=(.[^&]*)(&|$)");
			var r = t.substr(1).match(re);
			if (r != null) return unescape(r[2]);
		}
		return "";
	},
	GetRequest2: function () {
		var url = location.search,
			str = ""; //获取url中"?"符后的字串
		if (url.indexOf("?") != -1) {
			str = url.substr(1);
			var strObj = GetUrlRequest(str);
			//var theRequest = new Object();
			var str = "userId=" + strObj.userId + "&casCookie=" + strObj.casCookie + "&sessionId=" + strObj.sessionId + "&empName=" + strObj.empName;
		}
		return str;
	},
	changeURLArg: function (url, arg, arg_val) {
		var pattern = arg + '=([^&]*)';
		var replaceText = arg + '=' + arg_val;
		if (url.match(pattern)) {
			var tmp = '/(' + arg + '=)([^&]*)/gi';
			tmp = url.replace(eval(tmp), replaceText);
			return tmp;
		} else {
			if (url.match('[\?]')) {
				return url + '&' + replaceText;
			} else {
				return url + '?' + replaceText;
			}
		}
		return url + '\n' + arg + '\n' + arg_val;
	},
	delURLArg(name) {//删除链接上面参数
		var loca = window.location;
		var baseUrl = loca.origin + loca.pathname + "?";
		var query = loca.search.substr(1);
		if (query.indexOf(name) > -1) {
			var obj = {}
			var arr = query.split("&");
			for (var i = 0; i < arr.length; i++) {
				arr[i] = arr[i].split("=");
				obj[arr[i][0]] = arr[i][1];
			};
			delete obj[name];
			var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
			return url
		} else {
			return window.location.href;
		};
	},
	urlEncode: function (param, key, encode) { //对象转URL字符串的
		/*
		 * param 将要转为URL参数字符串的对象 
		 * key URL参数字符串的前缀 
		 * encode true/false 是否进行URL编码,默认为true 
		 * return URL参数字符串 
		 */
		if (param == null) return '';
		var paramStr = '';
		var t = typeof (param);
		if (t == 'string' || t == 'number' || t == 'boolean') {
			paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
		} else {
			for (var i in param) {
				var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
				paramStr += urlEncode(param[i], k, encode)
			}
		}
		return paramStr;
		/*
			var obj = {name: 'charming',id: 1}
			var s = urlEncode(obj)
			console.log(s.slice(1)) // name=charming&id=1	
			var s = urlEncode(obj,'name')
			console.log(s.slice(1))  //name.name=charming&name.id=1			
		*/
	},
	loadCssCode(code) {//js往网页添加样式
		var style = document.createElement('style');
		style.type = 'text/css';
		style.rel = 'stylesheet';
		try {
			//for Chrome Firefox Opera Safari
			style.appendChild(document.createTextNode(code));
		} catch (ex) {
			//for IE
			style.styleSheet.cssText = code;
		}
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(style);
	},
	listSplitFun: function (list, num) { //数组的拆分
		let index = 0
		let array = []
		while (index < data.length) {
			array.push(data.slice(index, index += num));
		}
		return array;
	},
	unique: function (arr) {
		var result = [],
			hash = {};
		for (var i = 0, elem;
			(elem = arr[i]) != null; i++) {
			if (!hash[elem]) {
				result.push(elem);
				hash[elem] = true;
			}
		}
		return result;
	},
	trimStr: function (str) { //去掉内容两边的空格
		return str.replace(/(^\s*)|(\s*$)/g, "");
	},
	ArrayPickup: function (elem, obj0) { /*取Json数组指定属性的值，返回一个集合数组*/
		var newArry0 = [],
			KeyArray = [],
			/*obj=$.parseJSON(obj0);*/
			obj = obj0;
		$.each(obj[0], function (key, val) {
			KeyArray.push(key);
		});
		if ($.inArray(elem, KeyArray) == -1) { //不存在此属性
			//console.log('不存在属性：', elem);
			return [];
		} else {
			$.each(obj, function (index, item) {
				newArry0.push(item[elem]);
			});
			return newArry0;
		}
	},
	ArraySum: function (obj1) {
		var sum = 0;
		if (obj1 == null || obj1 == []) {
			console.log("求和数组没有值，或者为空")
		} else {
			for (var i = 0; i < obj1.length; i++) {
				sum = sum + Number(obj1[i]);
			}
			return sum;
		}
	},
	FormatNum: function (num) { //数字带千分位符转化,toFixed(0)中表示小数位数
		if (num != "" && num != null && num != undefined) {
			return (Number(num).toFixed(0) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
		} else {
			return "0";
		}
	},
	HoverTip: function (GetOption, idx, GetChart) { //图标光标滑动事件
		var counts = GetOption.series[0].data.length; //获取所有点数量
		var dataIndex = 0;

		function autoHoverTip() {
			for (var i = 0; i < counts; i++) {
				(function (i) {
					setTimeout(function () {
						GetChart.dispatchAction({
							type: 'showTip',
							seriesIndex: 1,
							dataIndex: i
						});
					}, 5000 * i);
				})(i);
			}
		}
		setTimeout(function () {
			autoHoverTip();
			setInterval(autoHoverTip, counts * 5600);
		}, 500);
	},
	/*日期计算类方法*/
	getYearMonth: function () { //获取当前时间  年-月
		var date = new Date(),
			year = date.getFullYear(),
			month = date.getMonth() + 1;
		month = (month < 10 ? "0" + month : month);
		return (year.toString() + "-" + month.toString());
	},
	getTimeFun: function () { //获取当前时间  年-月-日  时-分-秒
		var now = new Date(),
			year = now.getFullYear(), //年
			month = now.getMonth() + 1, //月
			day = now.getDate(), //日
			hh = now.getHours(), //时
			mm = now.getMinutes(), //分
			ss = now.getSeconds(); //秒
		var clock = year + "-";
		if (month < 10)
			clock += "0";
		clock += month + "-";
		if (day < 10)
			clock += "0";
		clock += day + " ";
		if (hh < 10)
			clock += "0";
		clock += hh + ":";
		if (mm < 10) clock += '0';
		clock += mm + ":";
		if (ss < 10) clock += '0';
		clock += ss;
		return clock;
	},
	getMonthLength: function (yearMonth = (new Date().getFullYear() + '-' + (new Date().getMonth() + 1))) { //获得某月的最后一天是几号，不填则是现在月份('2017-10')
		var inputYear = yearMonth.split('-')[0],
			month = yearMonth.split('-')[1],
			inputMonth = month++;
		if (month > 12) {
			inputMonth -= 12;
			inputYear++;
		}
		var new_date = new Date(inputYear, inputMonth, 1);
		return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();
	},
	getMonthAllArry: function (yearMonth = new Date().getFullYear() + '-' + new Date().getMonth() + 1) { //获取某月全部数组1号开始，最后一天结束，不填则是现在月份('2017-10')
		var year1 = yearMonth.split('-')[0],
			month1 = yearMonth.split('-')[1],
			monthLength = ComUse.getMonthLength(year1 + '-' + month1),
			getArray = [];
		for (var i = 1; i <= monthLength; i++) {
			getArray.push(i + "号");
		}
		return getArray;
	},
	computedMonthDate: function (dates1, dates2, yearMonth = new Date().getFullYear() + '-' + new Date().getMonth() + 1) { //遍历某年某月的开始某号到结束某号的所有天数(8,15,'2017-10')
		var date1 = dates1 || 1,
			date2 = dates2 || new Date().getDate(),
			maxLength = ComUse.getMonthLength(yearMonth),
			getArray = [];
		if (date1 > date2) {
			console.warn("开始日期应当不超过结束日期(或者今天)");
			return;
		} else if (date1 > maxLength || date2 > maxLength) {
			console.warn("该月最多是" + maxLength + "号！");
			return;
		} else {
			for (var i = date1; i <= dates2; i++) {
				getArray.push(i + "号");
			}
			return getArray;
		}
	},
	getDateArry: function (start, end) { //遍历开始日期至结束日期的所有日期，返回数组('2014-5-8','2014-6-1')
		function getDate(datestr) {
			var temp = datestr.split("-");
			var date = new Date(temp[0], temp[1] - 1, temp[2]);
			return date;
		}
		var startTime = getDate(start),
			endTime = getDate(end),
			getArray = [];
		if ((endTime.getTime() - startTime.getTime()) < 0) {
			console.warn("开始日期应当不超过结束日期");
			return;
		}
		while ((endTime.getTime() - startTime.getTime()) >= 0) {
			var year = startTime.getFullYear(),
				month0 = startTime.getMonth() + 1,
				month = month0.toString().length == 1 ? "0" + month0.toString() : month0,
				day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate(),
				thisDate = year + "-" + month + "-" + day;
			getArray.push(thisDate);
			startTime.setDate(startTime.getDate() + 1);
		}
		return getArray;
	},
	getMonthArry: function (start, end) { //遍历开始月份至结束月份的所有月份  //传入的格式YYYY-MM
		var result = [],
			s = start.split("-"),
			e = end.split("-"),
			min = new Date(),
			max = new Date();
		min.setFullYear(s[0], s[1] * 1 - 1, 1); //开始日期
		max.setFullYear(e[0], e[1] * 1 - 1, 1); //结束日期
		var curr = min;
		while (curr <= max) {
			var month0 = curr.getMonth() + 1;
			var str = curr.getFullYear().toString() + "-" + ((month0 < 10 ? "0" + month0 : month0).toString());
			result.push(str);
			curr.setMonth(curr.getMonth() + 1);
		}
		return result;
	},
	stampTotime: function (times) { //时间戳转换成日期格式
		var time0, time1;
		time1 = String(times);
		if (time1.length == 13) {
			time0 = Number(times);
		} else if (time1.length == 10) {
			time0 = Number(times) * 1000;
		} else {
			console.warn("你输入的时间戳长度不正确，请检查！", time1.length);
			return '';
		}
		var date = new Date(time0), //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			Y = date.getFullYear() + '-',
			M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
			D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ',
			/*D = date.getDate() + ' ',*/
			h = date.getHours() + ':',
			m = date.getMinutes() + ':',
			s = date.getSeconds();
		return Y + M + D + h + m + s;
	},
	timeTostamp: function (str, types) { //日期格式转换成 时间戳
		if (str.length < 10 || (10 < str.length && str.length < 18)) {
			console.warn('传入的时间长度有误，请检查！', str.length);
			return '';
		} else if (str.length == 10) {
			//str=str+' '+ComUse.getTimeFun().split(" ")[1];   //拼接今天时间
		}
		var date = new Date(str),
			types = types || 1,
			timestamp;
		// 以下有三种方式输出获取，第一、第二种：会精确到毫秒，第三种：只能精确到秒，毫秒用000替代
		if (types == 1) {
			timestamp = date.getTime();
		} else if (types == 2) {
			timestamp = date.valueOf();
		} else if (types == 3) {
			timestamp = Date.parse(date);
		}
		return String(timestamp);
	},
	computeTimediff: function (startTime) { //根据起始的时间戳计算时间差距，并转化为n年n月n周n日n时n分n秒    对象类型数据
		var date0 = new Date().getTime() - Number(startTime), //时间差的毫秒数
			//计算出年的数目
			leave1 = date0 % (365 * 24 * 3600 * 1000), //计算年数后剩余的毫秒数
			years = Math.floor(date0 / (365 * 24 * 3600 * 1000)), //计算出相差年数
			//计算出月的数目
			leave2 = leave1 % (31 * 24 * 3600 * 1000), //计算月数后剩余的毫秒数
			months = Math.floor(leave1 / (31 * 24 * 3600 * 1000)), //计算出相差月数			
			//计算出周的数目
			leave3 = leave2 % (7 * 24 * 3600 * 1000), //计算周数后剩余的毫秒数
			weeks = Math.floor(leave2 / (7 * 24 * 3600 * 1000)), //计算出相差周数
			//计算出天数
			leave6 = leave3 % (24 * 3600 * 1000), //计算天数后剩余的毫秒数
			days = Math.floor(leave3 / (24 * 3600 * 1000)),
			//计算相差小时数
			leave7 = leave6 % (3600 * 1000), //计算小时数后剩余的毫秒数					
			hours = Math.floor(leave6 / (3600 * 1000)),
			//计算相差分钟数
			leave8 = leave7 % (60 * 1000), //计算分钟数后剩余的毫秒数			
			minutes = Math.floor(leave7 / (60 * 1000)),
			//计算相差秒数
			seconds = Math.round(leave8 / 1000);
		//console.log("相差"+years+"年 "+months+"月 "+weeks+"周 "+days+"天"+hours+"小时 "+minutes+"分钟"+seconds+"秒");
		return {
			'year': years,
			'month': months,
			'week': weeks,
			'day': days,
			'hour': hours,
			'minute': minutes,
			'second': seconds
		};
	},
	computeTimelong: function (startTime) { //根据起始的时间戳计算时间差距，并转化为n 年/月/周/日/时/分钟/秒（任选其一）前  字符串类型的数据
		var date0 = new Date().getTime() - Number(startTime), //时间差的毫秒数
			years = Math.floor(date0 / (365 * 24 * 3600 * 1000)), //计算出年的数目
			months = Math.floor(date0 / (30 * 24 * 3600 * 1000)), //计算出月的数目
			weeks = Math.floor(date0 / (7 * 24 * 3600 * 1000)), //计算出周的数目
			days = Math.floor(date0 / (24 * 3600 * 1000)), //计算出天数
			hours = Math.floor(date0 / (3600 * 1000)), //计算相差小时数		
			minutes = Math.floor(date0 / (60 * 1000)), //计算相差分钟数
			seconds = Math.round(date0 / 1000); //计算相差秒数
		var result;
		if (seconds == 0) {
			result = '刚刚';
		} else if (0 < seconds && seconds < 60) {
			result = seconds + '秒前';
		} else if (0 < minutes && minutes < 60) {
			result = minutes + '分钟前';
		} else if (0 < hours && hours < 24) {
			result = hours + '小时前';
		} else if (0 < days && days < 7) {
			result = days + '天前';
		} else if (0 < weeks && weeks < 5) {
			result = weeks + '周前';
		} else if (0 < months && months < 12) {
			result = months + '月前';
		} else if (0 < years) {
			result = years + '年前';
		}
		return result;
	},
	computeDaylong: function (startTime) { //根据起始的时间戳计算时间差距，并转化为n 天/小时/分钟/秒（任选其一）前，  字符串类型数据
		var date0 = new Date().getTime() - Number(startTime), //时间差的毫秒数
			days = Math.floor(date0 / (24 * 3600 * 1000)), //计算出天数
			hours = Math.floor(date0 / (3600 * 1000)), //计算相差小时数		
			minutes = Math.floor(date0 / (60 * 1000)), //计算相差分钟数
			seconds = Math.round(date0 / 1000); //计算相差秒数
		var result;
		if (seconds == 0) {
			result = '刚刚';
		} else if (0 < seconds && seconds < 60) {
			result = seconds + '秒前';
		} else if (0 < minutes && minutes < 60) {
			result = minutes + '分钟前';
		} else if (0 < hours && hours < 24) {
			result = hours + '小时前';
		} else if (0 < days) {
			result = days + '天前';
		}
		return result;
	},
	getTimeRange(timeType) { //获取范围时间--数组形式
		var timeRange = [];

		function stampTotime(times) { //标准时间转换成日期格式
			var Y = times.getFullYear() + '-',
				M = (times.getMonth() + 1 < 10 ? '0' + (times.getMonth() + 1) : times.getMonth() + 1) + '-',
				D = (times.getDate() < 10 ? '0' + times.getDate() : times.getDate());
			return Y + M + D;
		};
		switch (timeType) {
			case 1: //今天
				var end = new Date(),
					start = new Date();
				timeRange = [stampTotime(start), stampTotime(end)];
				break;
			case 2: //近2天
				var end = new Date(),
					start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
				timeRange = [stampTotime(start), stampTotime(end)];
				break;
			case 3: //近3天
				var end = new Date(),
					start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
				timeRange = [stampTotime(start), stampTotime(end)];
				break;
			case 5: //近5天
				var end = new Date(),
					start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 4);
				timeRange = [stampTotime(start), stampTotime(end)];
				break;
			case 7: //近7天
				var end = new Date(),
					start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
				timeRange = [stampTotime(start), stampTotime(end)];
				break;
			case 14: //近14天
				var end = new Date(),
					start = new Date();
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 13);
				timeRange = [stampTotime(start), stampTotime(end)];
				break;
			case 0: //本月
				var year = new Date().getFullYear(),
					month = new Date().getMonth() + 1;
				month = (month < 10 ? "0" + month : month);
				var day = new Date().getDate();
				day = (day < 10 ? '0' + day : day);
				var start = year.toString() + "-" + month.toString() + "-01",
					end = year.toString() + "-" + month.toString() + "-" + day.toString();
				timeRange = [start, end];
				break;
			default:
				var end = new Date(),
					start = new Date(),
					num = Number(timeType) - 1;
				start.setTime(start.getTime() - 3600 * 1000 * 24 * num);
				timeRange = [stampTotime(start), stampTotime(end)];
				break;
		}
		return timeRange;
	},
	getDay: function (num, str) {
		var today = new Date();
		var nowTime = today.getTime();
		var ms = 24 * 3600 * 1000 * num;
		today.setTime(parseInt(nowTime + ms));
		var oYear = today.getFullYear();
		var oMoth = (today.getMonth() + 1).toString();
		if (oMoth.length <= 1) oMoth = '0' + oMoth;
		var oDay = today.getDate().toString();
		if (oDay.length <= 1) oDay = '0' + oDay;
		return oYear + str + oMoth + str + oDay;
	},
	/*时间日期区域结束*/
	filter: function (getArray, getObj, type) { //数组过滤（可以模糊匹配，也可以完全匹配）不能过滤数字
		var getKey = '',
			getval = '',
			filterVal = [];
		for (var key in getObj) {
			getKey = key;
			getval = getObj[key];
		}
		getArray.forEach(function (item, idx) {
			if (typeof item[getKey] == "boolean") {
				if (item[getKey] === getval) {
					filterVal.push(item);
				}
			} else {
				var num = item[getKey].indexOf(getval); //String(item[getKey])可以过滤数字
				if (type == true) { //完全匹配
					if (num == 0) {
						filterVal.push(item);
					}
				} else { //模糊匹配
					if (num > -1) {
						filterVal.push(item);
					}
				}
			}
		});
		return filterVal;
	},
	/*使用方法，format(json)这样为格式化代码。format(json,true)为开启压缩模式。*/
	JSONformat: function (txt, compress) { /*是否为压缩模式*/ /* 格式化JSON源码(对象转换为JSON文本) */
		var indentChar = '    ';
		if (/^\s*$/.test(txt)) {
			alert('数据为空,无法格式化! ');
			return;
		}
		try {
			var data = eval('(' + txt + ')');
		} catch (e) {
			alert('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err');
			return;
		};
		var draw = [],
			last = false,
			This = this,
			line = compress ? '' : '\n',
			nodeCount = 0,
			maxDepth = 0;

		var notify = function (name, value, isLast, indent /*缩进*/, formObj) {
			nodeCount++; /*节点计数*/
			for (var i = 0, tab = ''; i < indent; i++) tab += indentChar; /* 缩进HTML */
			tab = compress ? '' : tab; /*压缩模式忽略缩进*/
			maxDepth = ++indent; /*缩进递增并记录*/
			if (value && value.constructor == Array) { /*处理数组*/
				draw.push(tab + (formObj ? ('"' + name + '":') : '') + '[' + line); /*缩进'[' 然后换行*/
				for (var i = 0; i < value.length; i++)
					notify(i, value[i], i == value.length - 1, indent, false);
				draw.push(tab + ']' + (isLast ? line : (',' + line))); /*缩进']'换行,若非尾元素则添加逗号*/
			} else if (value && typeof value == 'object') { /*处理对象*/
				draw.push(tab + (formObj ? ('"' + name + '":') : '') + '{' + line); /*缩进'{' 然后换行*/
				var len = 0,
					i = 0;
				for (var key in value) len++;
				for (var key in value) notify(key, value[key], ++i == len, indent, true);
				draw.push(tab + '}' + (isLast ? line : (',' + line))); /*缩进'}'换行,若非尾元素则添加逗号*/
			} else {
				if (typeof value == 'string') value = '"' + value + '"';
				draw.push(tab + (formObj ? ('"' + name + '":') : '') + value + (isLast ? '' : ',') + line);
			};
		};
		var isLast = true,
			indent = 0;
		notify('', data, isLast, indent, false);
		return draw.join('');
	},
	/*判断数据是否为空*/
	judgeEmpty: function (data) {
		var type0 = typeof data,
			result = false;
		if (type0 == "string" && data.trim() != "") {
			result = true;
		}
		if (type0 == "object" && Array.isArray(data) && data.length > 0) {
			result = true;
		}
		if (type0 == "object" && Object.prototype.toString.call(data) == "[object Object]" && JSON.stringify(data) != "{}") {
			result = true;
		}
		return result;
	},
	/*js数据的计算*/
	add: function (a, b) { //加法运算
		var c, d, e;
		try {
			c = a.toString().split(".")[1].length;
		} catch (f) {
			c = 0;
		}
		try {
			d = b.toString().split(".")[1].length;
		} catch (f) {
			d = 0;
		}
		return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) + this.mul(b, e)) / e;
	},
	sub: function (a, b) { //减法运算
		var c, d, e;
		try {
			c = a.toString().split(".")[1].length;
		} catch (f) {
			c = 0;
		}
		try {
			d = b.toString().split(".")[1].length;
		} catch (f) {
			d = 0;
		}
		return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) - this.mul(b, e)) / e;
	},
	mul: function (a, b) { //乘法运算
		var c = 0,
			d = a.toString(),
			e = b.toString();
		try {
			c += d.split(".")[1].length;
		} catch (f) { }
		try {
			c += e.split(".")[1].length;
		} catch (f) { }
		return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
	},
	div: function (a, b) { //除法运算
		var c, d, e = 0,
			f = 0;
		try {
			e = a.toString().split(".")[1].length;
		} catch (g) { }
		try {
			f = b.toString().split(".")[1].length;
		} catch (g) { }
		return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), this.mul(c / d, Math.pow(
			10, f - e));
	},
	getBrowserType: function () {
		var u = navigator.userAgent,
			result;
		if ((u.match(
			/(phone|pad|pod|iPhone|iPod|iOS|iPad|Android|Adr|MicroMessenger|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
		))) {
			if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
				result = "Android";
			} else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
				result = "iPhone";
			} else if (u.indexOf('MicroMessenger') > -1) {
				result = "weixin";
			} else {
				result = "others"
			}
		} else {
			result = "PC";
		}
		return result;
	},
	consoleListen: function (callBack) { //控制台打开时候的触发回调函数
		var devtools = function () { };
		console.log("%c", devtools);
		devtools.toString = function () {
			if (!!callBack) {
				callBack()
			}
		};
	},
	pageListen: function (callBack1, callBack2) { //监听页面的打开与隐藏
		window.addEventListener("visibilitychange", function () {
			if (!document.hidden) {
				if (!!callBack1) {
					callBack1();
				}
			} else {
				if (!!callBack2) {
					callBack2();
				}
			}
		});
	},
	lastChildren: function (obj) { //最深节点的内容
		var getstr = "";

		function loop(obj0) {
			if (obj0.children().length == 0) {
				getstr = obj0.html();
			} else {
				loop(obj0.children().eq(0));
			}
		}
		loop(obj);
		return getstr;
	},
	kindlevelsort: function (allList, typeKey, levelKey, descend = true) { //处理数组，分类key,排序key,是否降序
		var typelist = [],
			newlist = [];
		allList.forEach((cell) => {
			var idx = typelist.findIndex((item) => {
				return cell[typeKey] == item;
			});
			if (idx == -1) {
				typelist.push(cell[typeKey])
			}
		})
		typelist.forEach((cell1) => {
			var filterObj = {};
			filterObj[typeKey] = cell1;
			var list = ComUse.filter(allList, filterObj, true);
			list = list.sort(function (a, b) {
				if (descend) {
					return b[levelKey] - a[levelKey];
				} else {
					return a[levelKey] - b[levelKey];
				}
			})
			newlist = newlist.concat(list);
		})
		return newlist;
	},
	delParam: function (paramKeys) {
		var url = location.href;
		var urlParam = window.location.search.substr(1); //页面参数
		console.log(urlParam);
		var beforeUrl = url.substr(0, url.indexOf("?")); //页面主地址（参数之前地址）
		var nextUrl = "";
		var arr = new Array();
		if (urlParam != "") {
			var urlParamArr = urlParam.split("&"); //将参数按照&符分成数组
			for (var i = 0; i < urlParamArr.length; i++) {
				var paramArr = urlParamArr[i].split("="); //将参数键，值拆开
				//如果键雨要删除的不一致，则加入到参数中
				if (isStrInArray(paramArr[0], paramKeys) == false) {
					arr.push(urlParamArr[i]);
				}
			}
		}
		if (arr.length > 0) {
			nextUrl = "?" + arr.join("&");
		}
		url = beforeUrl + nextUrl;
		return url;
	},
	isStrInArray: function (str, arr) {
		let n = arr.length;
		for (let i = 0; i < n; i++) {
			if (arr[i] == str) {
				return true;
			}
		}
		return false;
	},
	scrollFun(callback1, callback2) {
		$(window).scroll(function () {
			var scrollTop = $(this).scrollTop(),    //滚动条距离顶部的高度
				scrollHeight = $(document).height(),   //当前页面的总高度
				clientHeight = $(this).height();    //当前可视的页面高度
			if (scrollTop + clientHeight >= scrollHeight) {   //距离顶部+当前高度 >=文档总高度 即代表滑动到底部
				callback1();
			} else if (scrollTop <= 0) { //回到顶部
				callback2();
			}
		});
	},
}
/*音频的调用*/
const audio = {
	create: function () {
		var audio = document.createElement("audio");
		var OpenHappyBirthday = function () {
			if (audio.canPlayType("audio/mp3")) {
				audio.src = "../CommonJS/warn.mp3";
			} else if (audio.canPlayType("audio/ogg")) {
				audio.src = "../CommonJS/warn.mp3";
			}
			audio.muted = true;
			audio.pause();
			void

				function ShowHappyBirthday() {
					audio.muted = false;
					audio.play();
					audio.loop = true;
				}();
		};
		OpenHappyBirthday();
	},
	/*create1: function(cmd) {
		$(function() {
			var file = [];
			file['mp3'] = '../CommonJS/warn.mp3';
			file['ogg'] = '../CommonJS/warn.mp3';
			audio.audioplayer('audioplane', file, true);
			if(cmd == "stop" || cmd == false) {
				audio.audioplayer('audioplane');
			} else {
				audio.audioplayer('audioplane', file, true);
			}
		});
	},*/
	/*
		用法示例：
		var file = [];
		file['mp3'] = '1.mp3';
		file['ogg'] = '1.ogg';
		// 播放
		audioplayer('audioplane', file, true);
		 // 停止
		audioplayer('audioplane');
	*/
	/** 音乐播放器 * @param obj 播放器id * @param file 音频文件 mp3: ogg: * @param loop 是否循环 */
	audioplayer: function (id, file, loop) {
		var audioplayer = document.getElementById(id);
		if (audioplayer != null) {
			document.body.removeChild(audioplayer);
		}
		if (typeof (file) != 'undefined') {
			if (navigator.userAgent.indexOf("MSIE") > 0) { // IE
				var player = document.createElement('bgsound');
				player.id = id;
				player.src = file['mp3'];
				player.setAttribute('autostart', 'true');
				if (loop) {
					player.setAttribute('loop', 'infinite');
				}
				document.body.appendChild(player);
			} else {
				var player = document.createElement('audio');
				player.id = id;
				player.setAttribute('autoplay', 'autoplay');
				if (loop) {
					player.setAttribute('loop', 'loop');
				}
				document.body.appendChild(player);
				var mp3 = document.createElement('source');
				mp3.src = file['mp3'];
				mp3.type = 'audio/mpeg';
				player.appendChild(mp3);
				var ogg = document.createElement('source');
				ogg.src = file['ogg'];
				ogg.type = 'audio/ogg';
				player.appendChild(ogg);
			}
		}
	},
	playSound: function (audioUrl) {
		var borswer = window.navigator.userAgent.toLowerCase();
		if (borswer.indexOf("ie") >= 0) { //IE内核浏览器
			var strEmbed = '<embed name="embedPlay" src="' + audioUrl +
				'" autostart="true" hidden="true" loop="false"></embed>';
			if ($("body").find("embed").length <= 0)
				$("body").append(strEmbed);
			var embed = document.embedPlay;
			//浏览器不支持 audion，则使用 embed 播放
			embed.volume = 100;
			//embed.play();这个不需要
		} else { //非IE内核浏览器
			var strAudio = "<audio id='audioPlay' src='" + audioUrl + "' hidden='true'>";
			if ($("body").find("audio").length <= 0)
				$("body").append(strAudio);
			var audio = document.getElementById("audioPlay");
			audio.play();
			audio.setAttribute('loop', 'infinite');
		}
	},

}
/*警告提示的展示*/
const warn = {
	silent: function (msg) {
		if (msg == undefined) {
			console.log("没有传入警告信息！");
			return;
		}
		var outhtml0 = '<div style="position: relative;width: 100%;height: 40px;background-color:orangered;">' +
			'	<p style="display: inline-block;margin:0;padding:0;text-align: center;color: #fff;line-height: 40px;width: calc(100% - 120px);float: left;font-size: 14px;font-weight: 500;">' +
			msg +
			'	</p>' +
			'	<p id="silentTip" style="display: inline-block;margin:0;padding:0;width: 80px;height: 40px;line-height: 40px;margin-right: 30px;float: right;color: yellow;text-align: center;transition: all 0.3s;font-size: 15px;font-weight: 600;cursor:pointer;" onmouseout="this.style.transform=\'scale(1,1)\';" onmouseover="this.style.transform=\'scale(1.5,1.5)\';">' +
			'      关闭' +
			'   </p>' +
			'</div>';
		$("body").prepend(outhtml0);
		$('#silentTip').click(function () {
			$(this).parent().remove();
		});
	},
	voiced: function (msg, url) {
		if (msg == undefined) {
			console.log("没有传入提示信息！");
			return;
		}
		var outhtml1 =
			'<div id="warnvoiced" style="position: absolute;z-index:1;border:1px solid red;width: 500px;min-height: 150px;border-radius: 5px;top: 50%;left: 50%;padding-bottom:60px;box-sizing: border-box;transform: translate(-250px,-150px);background: linear-gradient(-45deg, orangered , yellow);box-shadow: 0 0 50px 5px red inset;user-select: none;">' +
			'	<p style="text-align: center;line-height: 40px;margin:0;padding:0;margin-top: 30px;color: red;font-weight: 500;font-size: 20px;box-sizing: border-box;padding: 0 15px;font-weight: 600;">' +
			msg + '</p>' +
			'	<div style="position: absolute;width: 100%;height: 50px;left: 0;bottom: 10px;">' +
			'		<button id="cancleAudio" style="width: 100px;height: 40px;border: none;background: none;outline: none;float: right;font-size: 15px;color:#3d19a9;cursor: pointer;margin-right: 20px;font-weight: 600;">我知道啦>></button>' +
			'	</div>' +
			'</div>';
		$("body").append(outhtml1);
		audio.playSound(url);
		$("#cancleAudio").click(function () {
			$(this).parents("#warnvoiced").remove();
			$("#audioPlay").remove();
			$("#cancleAudio").off("click");
		})
	},
	netMonitor: function () {
		//warn.netMonitor();
		window.addEventListener("offline", function (e) {
			warn.silent("你的网络断开啦!");
		});
		window.addEventListener("online", function (e) {
			warn.silent("网络恢复了正常！");
		});
	},
	addScript: function (url) { //页面添加js
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', url);
		document.getElementsByTagName('head')[0].appendChild(script);
	},
}
/*防止误操作刷新页面或者关闭页面的函数*/
const UnloadConfirm = {
	set: function (confirm_msg) { //启用监听浏览器刷新、关闭的方法
		window.onbeforeunload = function (event) {
			event = event || window.event;
			event.returnValue = confirm_msg;
		}
	},
	clear: function () { //关闭监听浏览器刷新、关闭的方法
		window.onbeforeunload = function () { };
	},
};
/*URL的增删改查*/
const jsUrlHelper = {
	getUrlParam: function (url, ref) {
		var str = "";
		// 如果不包括此参数
		if (url.indexOf(ref) == -1)
			return "";
		str = url.substr(url.indexOf('?') + 1);
		arr = str.split('&');
		for (i in arr) {
			var paired = arr[i].split('=');
			if (paired[0] == ref) {
				return paired[1];
			}
		}
		return "";
	},
	putUrlParam: function (url, ref, value) {
		// 如果没有参数
		if (url.indexOf('?') == -1) return url + "?" + ref + "=" + value;
		// 如果不包括此参数
		if (url.indexOf(ref) == -1) return url + "&" + ref + "=" + value;
		var arr_url = url.split('?');
		var base = arr_url[0];
		var arr_param = arr_url[1].split('&');
		for (i = 0; i < arr_param.length; i++) {
			var paired = arr_param[i].split('=');
			if (paired[0] == ref) {
				paired[1] = value;
				arr_param[i] = paired.join('=');
				break;
			}
		}
		return base + "?" + arr_param.join('&');
	},
	delUrlParam: function (url, ref) {
		// 如果不包括此参数
		if (url.indexOf(ref) == -1)
			return url;
		var arr_url = url.split('?');
		var base = arr_url[0];
		var arr_param = arr_url[1].split('&');
		var index = -1;
		for (i = 0; i < arr_param.length; i++) {
			var paired = arr_param[i].split('=');
			if (paired[0] == ref) {
				index = i;
				break;
			}
		}
		if (index == -1) {
			return url;
		} else {
			arr_param.splice(index, 1);
			return base + "?" + arr_param.join('&');
		}
	}
};
/*本地永久存储*/
const local = {
	//本地永久存储--存储数据
	set: function (key, value) {
		try {
			localStorage.setItem(key, value);
		} catch (oException) {
			if (oException.name == 'QuotaExceededError') {
				console.log('超出该浏览器本地永久存储限额！');
			}
		}
	},
	//本地永久存储--读取数据
	get: function (key) {
		localStorage.getItem(key);
	},
	//本地永久存储--删除数据
	remove: function (key) {
		localStorage.removeItem(key);
	},
	//本地永久存储--读取某项数据的次数
	views: function () {

	},
	//本地永久存储--查看该页面共有多少条数据
	sum: function () {
		return localStorage.length;
	},
	//本地永久存储--清除该页面所有本地永久存储数据
	clear: function () {
		localStorage.clear();
	},
	//本地永久存储--展示该页面所有本地永久存储数据
	showAll: function () {
		if (localStorage.length > 0) {
			for (var i = localStorage.length - 1; i >= 0; i--) {
				console.log('第' + (i + 1) + '条数据的键值为：' + localStorage.key(i) + '，数据为：' + localStorage.getItem(localStorage.key(i)));
			}
		} else {
			console.log("localStorage没有存储数据！")
		}
	},
	//本地永久存储--对页面的访问次数
	counts: function () {
		if (localStorage.pagecount) {
			localStorage.pagecount = Number(localStorage.pagecount) + 1;
		} else {
			localStorage.pagecount = 1;
		}
		console.log("您对本页访问了" + localStorage.pagecount + "次！");
	}
}
/*本地临时存储*/
const session = {
	//本地临时存储--存储数据
	set: function (key, value) {
		try {
			sessionStorage.setItem(key, value);
		} catch (oException) {
			if (oException.name == 'QuotaExceededError') {
				console.log('超出该浏览器本地临时存储限额！');
			}
		}
	},
	//本地临时存储--读取数据
	get: function (key) {
		sessionStorage.getItem(key);
	},
	//本地临时存储--删除数据
	remove: function (key) {
		sessionStorage.removeItem(key);
	},
	//本地临时存储--读取某项数据的次数
	views: function () {

	},
	//本地临时存储--查看该页面共有多少条数据
	sum: function () {
		return sessionStorage.length;
	},
	//本地临时存储--清除该页面所有本地临时存储数据
	clear: function () {
		sessionStorage.clear();
	},
	//本地临时存储--展示该页面所有本地临时存储数据
	showAll: function () {
		if (sessionStorage.length > 0) {
			for (var i = sessionStorage.length - 1; i >= 0; i--) {
				console.log('第' + (i + 1) + '条数据的键值为：' + sessionStorage.key(i) + '，数据为：' + sessionStorage.getItem(sessionStorage.key(i)));
			}
		} else {
			console.log("sessionStorage没有存储数据！")
		}
	},
	//本地临时存储--对页面的访问次数
	counts: function () {
		if (sessionStorage.pagecount) {
			sessionStorage.pagecount = Number(sessionStorage.pagecount) + 1;
		} else {
			sessionStorage.pagecount = 1;
		}
		console.log("您对本页访问了" + sessionStorage.pagecount + "次！");
	}
}
/*cookies的存储*/
const cookies = {
	/*cookies的存储，cname,cvalue,exdays的类型要求均为字符串*/

	/*cookies的存储，时间单位可以为秒s，小时h，天d，如74天为74d，没有单位则为s*/
	set: function (cname, cvalue, exdays) {
		var d = new Date(),
			exdays = cookies.getsec(exdays),
			cname = cname.toString(),
			cvalue = cvalue.toString();
		d.setTime(d.getTime() + (exdays));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	},

	/*cookies的存储，以天为单位*/
	setCookie: function (cname, cvalue, exdays) {
		var d = new Date();
		var cname = cname.toString(),
			cvalue = cvalue.toString(),
			exdays = Number(exdays);
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	},

	/*cookies的读取，cname的类型是字符串*/
	get: function (cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	},

	//cookies--倒序展示该页面所有存储的所有cookie数据
	showAllR: function () {
		var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
		if (keys != null) {
			for (var i = keys.length - 1; i >= 0; i--) {
				console.log('第' + (i + 1) + '条数据的键值为：' + keys[i] + '，数据为：' + cookies.get(keys[i]));
			}
		} else {
			console.log("cookies没有存储数据！");
		}
	},

	//cookies--正序展示该页面所有存储的所有cookie数据
	showAll: function () {
		var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
		if (keys != null) {
			for (var i = 1; i <= keys.length; i++) {
				console.log('第' + i + '条数据的键值为：' + keys[i - 1] + '，数据为：' + cookies.get(keys[i - 1]));
			}
		} else {
			console.log("cookies没有存储数据！");
		}
	},

	/*删除cookies*/
	remove: function (name) {
		var exp = new Date(),
			name = name.toString();
		exp.setTime(exp.getTime() - 1);
		var cval = cookies.get(name);
		if (cval != null) {
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		}
	},

	//删除当前页的所有cookies
	clear: function () {
		var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
		if (keys != null) {
			for (var i = keys.length; i--;)
				document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
			console.log("cookies的存储数据已经删除完毕！");
		} else {
			console.log("cookies没有存储数据！");
		}
	},

	/*检测 cookies 是否创建，username的类型是字符串*/
	check: function (username) {
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
	getsec: function (str) {
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
const TheURL = {
	/*URL的拼装*/
	json2url: function (obj) {
		var rtn = "", sign = "&";
		if (typeof obj != "undefined" && obj != null) {
			for (var item in obj) {
				rtn += item + "=" + obj[item] + sign;
			}
			if (rtn.substring(rtn.length - 1) == sign) {
				rtn += Math.random();
			}
		}
		return rtn;
	},
	appendParams: function (url, params) {
		if (arguments.length == 1) {
			params = arguments[0];
			url = "";
		}
		if (typeof url != "undefined" && url != null && url != "" && url != "null") {
			var pms = TheURL.json2url(params);
			if (pms == "") {
				pms += Math.random();
			}
			return url += ((url.indexOf('?') != -1) ? '&' : '?') + location.search.substring(1) + "&" + pms;
		} else {
			return "";
		}
	},
	getParams: function (name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);
		if (r) {
			return decodeURI(r[2]);
		}
		return null;
	},
	getInterfaceURL: function (uri) {
		return window.location.protocol + '//' + window.location.host + '/' + uri;
	}
}
//数组去嵌套，拍平处理
function ArrayDenest(arr) {
	return arr.reduce(function (prev, cur) {
		return prev.concat(Array.isArray(cur) ? fn(cur) : cur);
	}, []);
}
/*删除左右两端的空格*/
function trim(str) {
	/*去除字符串左右两端的空格(trim(str))*/
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
//获取url中"?"符后的字串
function GetRequest2() {
	var url = location.search;
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
	return ("00" + s).substr((s + "").length);
}
//计算开始以后已过去的时间间隔
function judgeTimeMsg(time) {
	//judgeTimeMsg("2016/12/5");
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
	if (days > 0) {
		if (days == 1) {
			result = "昨天";
		} else {
			result = days + "天前";
		}
	} else {
		if (hours > 0) {
			result = hours + "小时前";
		} else {
			if (minutes > 0) {
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
/*比较版本号的新旧---按数值计算*/
function CompareVersion1(NewestVersion, OldVersion) {
	/*CompareVersion1("4.9.6","4.8.7");*/
	function addcompute(version) {
		var numarry = version.split("."),
			unit = 0;
		for (var i = 1; i <= numarry.length; i++) {
			unit = unit + Number(numarry[i - 1]) * Math.pow(10, numarry.length - i);
			if (i == numarry.length) {
				return unit;
			}
		}
	}
	var num1 = addcompute(NewestVersion),
		num2 = addcompute(OldVersion);
	if (num1 > num2) {
		return true;
	} else {
		return false;
	}
}
/*比较版本号的新旧---按点位数比较*/
function CompareVersion2(NewestVersion, OldVersion) {
	/*CompareVersion2("3.9.6","3.9.5653");*/
	function addcompute(ArryUnit1, ArryUnit2) {
		var num1 = Number(ArryUnit1);
		num2 = Number(ArryUnit2);
		if (num1 > num2) {
			return 1;
		} else if (num1 == num2) {
			return 2;
		} else if (num1 < num2) {
			return 3;
		}
	}
	var NewestArry = NewestVersion.split("."),
		OldArry = OldVersion.split("."),
		result = true;
	if (addcompute(NewestArry.length, OldArry.length) == 1) {
		result = true;
	} else if (addcompute(NewestArry.length, OldArry.length) == 2) {
		for (var i = 0; i <= NewestArry.length - 1; i++) {
			if (addcompute(NewestArry[i], OldArry[i]) == 1) {
				result = true;
				break;
			} else if (addcompute(NewestArry[i], OldArry[i]) == 3) {
				result = false;
				break;
			}
			if (i == NewestArry.length - 1) {
				if (addcompute(NewestArry[i], OldArry[i]) == 2) {
					result = false;
					break;
				}
			}
		}
	}
	return result;
}
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
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		/*要执行的代码*/
		/*window.location.href="";*/
	}
}
/*判断本地图片是否出现*/
function CheckImgExists(imgurl) {
	var ImgObj = new Image(); //判断图片是否存在  
	ImgObj.src = imgurl;
	if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
		console.info(ImgObj.fileSize + "," + ImgObj.width + "," + ImgObj.height + ".");
		return true;
	} else {
		return false;
	}
}
/*页面图片添加缓存，类似预加载*/
async function addImgCache(data, perfectMatch) {
	/*addImgCache('图片路径1')  或者 addImgCache(['图片路径1','图片路径2','图片路径3']) */
	function loadImg(imgSrc) {
		return new Promise((resolve, reject) => {
			let img = new Image()
			img.src = imgSrc
			img.onload = (e) => {
				resolve("image loading success!")
			}
			if (perfectMatch === true) {
				img.onerror = (e) => {
					reject("image loading failed!")
				}
			}
		});
	}
	if (typeof data === "string") {
		await loadImg(data).then(value => {
			console.log(value, "图片加载成功");
		}).catch(err => {
			if (perfectMatch === true) {
				console.log(err, "图片加载失败");
			}
		})
	} else if (data instanceof Array) {
		const promiseArr = []
		data.forEach(item => {
			promiseArr.push(loadImg(item))
		})
		await Promise.all(promiseArr).then(value => {
			console.log(value, "所有图片加载成功");
		}).catch(err => {
			if (perfectMatch === true) {
				console.log(err, "存在图片加载失败");
			}
		})
	}
}
/*比较版本号的大小*/
function CompareVersion(NewestVersion, OldVersion) {
	function addcompute(ArryUnit1, ArryUnit2) {
		var num1 = Number(ArryUnit1);
		num2 = Number(ArryUnit2);
		if (num1 > num2) {
			return 1;
		} else if (num1 == num2) {
			return 2;
		} else if (num1 < num2) {
			return 3;
		}
	}
	var NewestArry = NewestVersion.split("."),
		OldArry = OldVersion.split("."),
		result = true;
	if (addcompute(NewestArry.length, OldArry.length) == 1) {
		result = true;
	} else if (addcompute(NewestArry.length, OldArry.length) == 2) {
		for (var i = 0; i <= NewestArry.length - 1; i++) {
			if (addcompute(NewestArry[i], OldArry[i]) == 1) {
				result = true;
				break;
			} else if (addcompute(NewestArry[i], OldArry[i]) == 3) {
				result = false;
				break;
			}
			if (i == NewestArry.length - 1) {
				if (addcompute(NewestArry[i], OldArry[i]) == 2) {
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
	if (url.indexOf('?') != -1)
		str = url.substr(url.indexOf('?') + 1);
	else
		return url + "?" + ref + "=" + value;
	var returnurl = "";
	var setparam = "";
	var arr;
	var modify = "0";
	if (str.indexOf('&') != -1) {
		arr = str.split('&');
		for (i in arr) {
			if (arr[i].split('=')[0] == ref) {
				setparam = value;
				modify = "1";
			} else {
				setparam = arr[i].split('=')[1];
			}
			returnurl = returnurl + arr[i].split('=')[0] + "=" + setparam + "&";
		}
		returnurl = returnurl.substr(0, returnurl.length - 1);
		if (modify == "0")
			if (returnurl == str)
				returnurl = returnurl + "&" + ref + "=" + value;
	} else {
		if (str.indexOf('=') != -1) {
			arr = str.split('=');
			if (arr[0] == ref) {
				setparam = value;
				modify = "1";
			} else {
				setparam = arr[1];
			}
			returnurl = arr[0] + "=" + setparam;
			if (modify == "0")
				if (returnurl == str)
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
	if (typeof Array.isArray === "function") {
		return Array.isArray(value);
	} else {
		return Object.prototype.toString.call(value) === "[object Array]";
	}
}
//把文件转化为base64的字符串
function analysisImage(file) {
	return new Promise((resolve, reject) => {
		var reader = new FileReader();
		reader.onload = function (event) {
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
	while (n--) {
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
	//调用
	/*  
	var blob = dataURLtoBlob(base64Data);
	var file = blobToFile(blob, imgName);
	*/
}
//判断当前浏览类型
function BrowserType() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
	var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
	var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
	var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
	var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
	var showBGFun = function () {
		document.getElementById("VisualizContainer").style.backgroundImage = "url(img/expbj.jpg)";
	}
	if (isIE) {
		var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp["$1"]);
		if (fIEVersion <= 9) {
			var text1 = "您的IE" + fIEVersion + "版本有点低啊，想体验大屏，请升级最新版本，或者使用谷歌浏览器吧！"
			alert(text1);
			return;
		}
	}
	if (isFF) {
		var version = Number((navigator.userAgent.toLowerCase().match(/firefox\/[\d.]+/gi) + "").replace(/[^0-9.]/ig, ""));
		if (version <= 45) {
			showBGFun();
			var text1 = "您的火狐浏览器版本号" + version + ".*.*偏低，想体验大屏，请升级最新版本，或者使用谷歌浏览器吧！";
			//console.log(text1);
			return;
		}
	}

}
/*防抖动函数*/
function debounce(fn, delayTime, options) {
	if (options) {
		fn();
	}
	var timer;
	return function () {
		var context = this
		var args = arguments
		clearTimeout(timer)
		timer = setTimeout(function () {
			fn.apply(context, args)
		}, delayTime)
	}
}
/*生成num位数的随机的token，默认为10位*/
function getToken(num = 10) {
	var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	var str = '';
	for (var i = 0; i < num; i++) {
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
	for (var i = 0; i < len; i++) {
		charCode = str.charCodeAt(i);
		if (charCode >= 0 && charCode <= 128) realLength += 1;
		else realLength += 2;
	}
	return realLength;
};
/*时间格式化*/
function dateAddFormat() {
	return Date.prototype.format = function (format) {
		var o = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S": this.getMilliseconds()
		}
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	}
}
/*格式化时间，也获取当前格式化以后的时间*/
function getFormatDate(date, pattern) {
	if (date == undefined) {
		date = new Date();
	}
	if (pattern == undefined) {
		pattern = "yyyy-MM-dd hh:mm:ss";
	}
	return date.format(pattern);
}
function json2url(obj) {
	var rtn = "", sign = "&";
	if (typeof obj != "undefined" && obj != null) {
		for (var item in obj) {
			rtn += item + "=" + obj[item] + sign;
		}
		if (rtn.substring(rtn.length - 1) == sign) {
			rtn += Math.random();
		}
	}
	return rtn;
}
function appendParams(url, params) {
	if (arguments.length == 1) {
		params = arguments[0];
		url = "";
	}
	if (typeof url != "undefined" && url != null && url != "" && url != "null") {
		var pms = json2url(params);
		if (pms == "") {
			pms += Math.random();
		}
		return url += ((url.indexOf('?') != -1) ? '&' : '?') + location.search.substring(1) + "&" + pms;
	} else {
		return "";
	}
}
function getParams(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r) {
		return decodeURI(r[2]);
	}
	return null;
}
function getInterfaceURL(uri) {
	return window.location.protocol + '//' + window.location.hostname + '/' + uri;
}




/*
//1、vue-resource的请求打断写法
this.$http.get('/someUrl', {	// use before callback
	before(request) {				// abort previous request, if exists
	if (this.previousRequest) {
		this.previousRequest.abort();
	}
	// set previous request on Vue instance
	this.previousRequest = request;
	}
}).then(response => {			// success callback

}, response => {				// error callback

});

//2、页面使用如下
onerror="$(this).hide().parent('.NewVideoImg').addClass('errorUrlImg')"

onscroll

$.parseJSON()
$.inArray("John", Array)

var a={"m1":{"m5":5,"m6":{"m7":7,"m8":8}},"m2":"2"},b={"m3":"3","m4":"4"};
var c=$.extend(true,{}, a,b);
console.info(JSON.stringify(c));
*/