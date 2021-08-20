var Fun = {
	JsonToParams: function(obj, num0) { //JSON文件转object
		if(typeof obj == "object" && obj.files != undefined && obj.files.length > 0) {
			var reader = new FileReader(),
				num = num0 || 4;
			switch(num) {
				case 1:
					reader.readAsArrayBuffer(obj.files[0]); //按字节读取文件内容，返回ArrayBuffer对象
					break;
				case 2:
					reader.readAsBinaryString(obj.files[0]); //按字节读取文件内容，返回文件的二进制串
					break;
				case 3:
					reader.readAsDataURL(obj.files[0]); //读取文件内容，返回data:url的base64加密字符串
					break;
				case 4:
					reader.readAsText(obj.files[0], "utf-8"); //按字符读取文件内容，返回文本字符串
					break;
				default:
					reader.readAsText(obj.files[0], "utf-8");
			}
			return new Promise(function(resolve, reject) {
				return reader.onload = function(e) {
					resolve(e.target.result);
				}
			});
		}
	},
	// 下载文件方法
	fileDownload: function(content, filename) { //string,string
		if('download' in document.createElement('a')) {
			var eleLink = document.createElement('a');
			eleLink.download = filename;
			eleLink.style.display = 'none';
			var blob = new Blob([content]); // 字符内容转变成blob地址；数据类型可以为多个ArrayBuffer，ArrayBufferView， Blob，或者 DOMString对象
			eleLink.href = URL.createObjectURL(blob);
			document.body.appendChild(eleLink); // 触发点击
			eleLink.click();
			document.body.removeChild(eleLink); // 然后移除		
			console.log(filename + "文件，下载成功！");
		} else {
			console.warn('浏览器不支持a标签下载文件！');
		}
	},
	/*使用方法，format(json)这样为格式化代码。format(json,true)为开启压缩模式。txt为String类型*/
	//支持JSON，js中的Array的数据格式化
	JSONformat: function(txt, compress) { /*是否为压缩模式*/ /* 格式化JSON源码(对象转换为JSON文本) */
		var indentChar = '    ';
		if(/^\s*$/.test(txt)) {
			alert('数据为空,无法格式化! ');
			return;
		}
		try {
			var data = eval('(' + txt + ')');
		} catch(e) {
			alert('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err');
			return;
		};
		var draw = [],
			last = false,
			This = this,
			line = compress ? '' : '\n',
			nodeCount = 0,
			maxDepth = 0;
		var notify = function(name, value, isLast, indent /*缩进*/ , formObj) {
			nodeCount++; /*节点计数*/
			for(var i = 0, tab = ''; i < indent; i++) tab += indentChar; /* 缩进HTML */
			tab = compress ? '' : tab; /*压缩模式忽略缩进*/
			maxDepth = ++indent; /*缩进递增并记录*/
			if(value && value.constructor == Array) { /*处理数组*/
				draw.push(tab + (formObj ? ('"' + name + '":') : '') + '[' + line); /*缩进'[' 然后换行*/
				for(var i = 0; i < value.length; i++)
					notify(i, value[i], i == value.length - 1, indent, false);
				draw.push(tab + ']' + (isLast ? line : (',' + line))); /*缩进']'换行,若非尾元素则添加逗号*/
			} else if(value && typeof value == 'object') { /*处理对象*/
				draw.push(tab + (formObj ? ('"' + name + '":') : '') + '{' + line); /*缩进'{' 然后换行*/
				var len = 0,
					i = 0;
				for(var key in value) len++;
				for(var key in value) notify(key, value[key], ++i == len, indent, true);
				draw.push(tab + '}' + (isLast ? line : (',' + line))); /*缩进'}'换行,若非尾元素则添加逗号*/
			} else {
				if(typeof value == 'string') value = '"' + value + '"';
				draw.push(tab + (formObj ? ('"' + name + '":') : '') + value + (isLast ? '' : ',') + line);
			};
		};
		var isLast = true,
			indent = 0;
		notify('', data, isLast, indent, false);
		return draw.join(''); //返回一个字符串
	},

	ParamsToJSON: function(val, name) { //数据转JSON文件或Array数据的js文件
		if(val == undefined || val == '' || val == null) {
			console.warn("传入的JSON内容为空！");
			return;
		} else if(name == undefined || name == '' || name == null) {
			//console.warn("没有传入json名称！")
		}
		var str = Fun.JSONformat(val),
			name0 = name || ('JSON' + (new Date().getTime()));
		Fun.fileDownload(str, name0 + '.json');
	},
	analysisImage: function(file) { //把导入文件转化为base64的字符串
		return new Promise((resolve, reject) => {
			var reader = new FileReader();
			reader.onload = function(event) {
				var getstr = event.target.result.replace(/^data:.*?base64,/g, '');
				resolve(getstr)
			}
			reader.readAsDataURL(file);
		})
	},
	//将base64转换为blob
	dataURLtoBlob: function(dataurl) {
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
	},
	//将blob转换为file
	blobToFile: function(theBlob, fileName) {
		theBlob.lastModifiedDate = new Date();
		theBlob.name = fileName;
		return theBlob;
	},
	//调用
	/*  
	var blob = dataURLtoBlob(base64Data);
	var file = blobToFile(blob, imgName);
	*/
}

/*以下用于测试*/
/*var text0;
function getParams(id) {
	var obj = document.getElementById(id);
	Fun.JsonToParams(obj, 4).then(function(res) {
		var res0 = JSON.parse(res);
		console.log(res0);
		text0=res;
	}).catch(function(res) {
		console.log(res);
	});
}
function ParamsToJSON(val,name) {
	Fun.ParamsToJSON(text0, 'test');
}
<input type="file" id="getFiles"/>
<button type="text" onclick="getParams('getFiles')">JSON文件转为数据</button>
<button type="text" onclick="ParamsToJSON()">数据转为JSON文件</button>
 */