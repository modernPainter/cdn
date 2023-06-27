/*引入js*/
//json转为excel的插件
<script type="text/javascript" src="ExcelWithJson/JsonExportExcel.min.js" ></script>
//json转为excel，excel转为json的执行函数
<script type="text/javascript" src="ExcelWithJson/ExcelWithJson.js" ></script>
/*html*/
<input type="file" ref="getFiles"/>
<i-button type="text" @click="excelToJSON('getFiles')">excel转为Json</i-button>
<i-button type="text" @click="JsonToExcel">excel导出</i-button>

/*js*/
data{
	getJson:'',
},
methods: {
	excelToJSON(ref){
		var that=this,
		obj=this.$refs[ref];
		//console.log(obj);
		web.excelToJSON({
			file: obj, //文件的this指针
			//url:String,   //本页面调取ExcelToJson.js文件的路径  (视路径情况，有些可不写)
			//name: String,  // 新建的webWork的名称，防止多webwork冲突 (可不写)
		}).then(function(res) {
			console.log(res);
			that.getJson=res;
		})
	},
	JsonToExcel(){
		var that=this;
		web.JsonToExcel(that.getJson, '喵喵喵'); //第一个数据,第二个文件名(可不写)
	},
}
