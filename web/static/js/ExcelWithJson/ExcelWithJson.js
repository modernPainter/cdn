var webfile = {
	infro: '', //excel转JSON的文件基本信息
	startWebWork: function() { //新建一个webWork
		var worker0 = new Worker(webfile.infro.url, {
			name: webfile.infro.name
		});
		setTimeout(function() {
			worker0.postMessage(webfile.infro.fileobj); //传递数据
		}, 200);
		return new Promise(function(resolve, reject) {
			return worker0.onmessage = function(event) {
				worker0.terminate();
				worker0 = undefined;
				resolve(event.data);
			}
		});
	},
	excelToJSON: function(args) { //excel转JSON
		//检测文件的大小与类型
		if(args.file.files.length==0) {
			alert('>_<：没有导入的文件!')
			return;
		}
		var IMPORTFILE_MAXSIZE = 40 * 1024; //这里可以自定义控制导入文件大小
		var suffix = args.file.files[0].name.split(".")[1],
			fileSize = args.file.files[0].size / 1024;
		if(suffix != 'xls' && suffix != 'xlsx') {
			alert('>_<：导入的文件格式错啦!')
			return;
		}
		if(fileSize > IMPORTFILE_MAXSIZE) {
			alert('>_<：导入文件不要大于40M，会解析很久的！')
			return;
		}
		var TimeStamp = (new Date().getTime());
		var getdata = {
			fileobj: args.file.files[0], //当前文件对象
			url: args.url || (fileGetCurrentUrl+'ExcelToJson.js'),
			name: args.name || ('newWebwork' + TimeStamp),
		};
		webfile.infro = getdata;
		return webfile.startWebWork();
	},
	JsonToExcel: function(data, name) { //利用JsonExportExcel.min.js实现JSON转Excel,实现导出
		var data0 = [],
			data1 = (typeof data != 'object' ? JSON.parse(data) : data);
		for(var key in data1[0]) { //取第一条数据获取表头的信息
			data0.push(key.toString());
		}
		var params = {
			fileName: name || ('excel' + (new Date().getTime())),
			datas: [{
				sheetHeader: data0, //sheetData 数据源(必须)
				sheetData: data1,
				sheetName: 'sheet1',
			}],
		};
		new ExportJsonExcel(params).saveExcel();
	},
	getCurrentUrl: function() {     //获取当前文件的路径
		var jsUrl = document.scripts;
		jsUrl = jsUrl[jsUrl.length - 1].src.substring(0, jsUrl[jsUrl.length - 1].src.lastIndexOf("/") + 1);
		return jsUrl;
	},
}
fileGetCurrentUrl=webfile.getCurrentUrl();