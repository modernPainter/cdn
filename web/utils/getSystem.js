
var	broswer = {
	//检测浏览器版本
	getVersion: function() {
		var agent = navigator.userAgent.toLowerCase();
		var arr = [];
		var Browser = "";
		var Bversion = "";
		var verinNum = "";
		if(agent.indexOf("msie") > 0) {
			var regStr_ie = /msie [\d.]+;/gi;
			Browser = "IE";
			Bversion = "" + agent.match(regStr_ie)
		}
		//firefox
		else if(agent.indexOf("firefox") > 0) {
			var regStr_ff = /firefox\/[\d.]+/gi;
			Browser = "firefox";
			Bversion = "" + agent.match(regStr_ff);
		}
		//Chrome
		else if(agent.indexOf("chrome") > 0&&agent.indexOf("edge") < 0&&agent.indexOf("opr") < 0) {
			var regStr_chrome = /chrome\/[\d.]+/gi;
			Browser = "chrome";
			Bversion = "" + agent.match(regStr_chrome);
		}
		//Safari
		else if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
			var regStr_saf = /version\/[\d.]+/gi;
			Browser = "safari";
			Bversion = "" + agent.match(regStr_saf);
		}
		//Opera
		else if(agent.indexOf("opr") >= 0) {
			var regStr_opera = /version\/[\d.]+/gi;
			Browser = "opera";
			Bversion = "" + agent.match(regStr_opera);
		}
		else if(agent.indexOf("edge") >= 0) {
			var regStr_opera = /version\/[\d.]+/gi;
			Browser = "opera";
			Bversion = "" + agent.match(regStr_opera);
		} else {
			var browser = navigator.appName;
			if(browser == "Netscape") {
				var version = agent.split(";");
				var trim_Version = version[7].replace(/[ ]/g, "");
				var rvStr = trim_Version.match(/[\d\.]/g).toString();
				var rv = rvStr.replace(/[,]/g, "");
				Bversion = rv;
				Browser = "IE"
			}
		}
		verinNum = (Bversion + "").replace(/[^0-9.]/ig, "");
		arr.push(Browser);
		arr.push(verinNum);
		return arr;
	},
	//检测当前操作系统
	CurrentSystem: function() {
		var UserAgent = navigator.userAgent,
			res = " ";
		if((navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel")) {
			res = "MacOS";
		} else if(navigator.platform == "X11") {
			res = "Unix";
		} else if(String(navigator.platform).indexOf("Linux") > -1) {
			res = "Linux";
		} else if((navigator.platform == "Win32") || (navigator.platform == "Windows")) {
			if(UserAgent.indexOf("Windows NT 5.0") > -1 || UserAgent.indexOf("Windows 2000") > -1) {
				res = "Windows2000";
			} else if(UserAgent.indexOf("Windows NT 5.1") > -1 || UserAgent.indexOf("Windows XP") > -1) {
				res = "WindowsXP";
			} else if(UserAgent.indexOf("Windows NT 5.2") > -1 || UserAgent.indexOf("Windows 2003") > -1) {
				res = "Windows2003";
			} else if(UserAgent.indexOf("Windows NT 6.0") > -1 || UserAgent.indexOf("Windows Vista") > -1) {
				res = "Windows Vista";
			} else if(UserAgent.indexOf("Windows NT 6.1") > -1 || UserAgent.indexOf("Windows 7") > -1) {
				res = "Windows7";
			} else if(UserAgent.indexOf("Windows NT 10.0") > -1 || UserAgent.indexOf("Windows 10") > -1) {
				res = "Windows10";
			} else {
				res = "Windows系统";
			}
			if(UserAgent.indexOf("Win64") > -1 && UserAgent.indexOf("x64") > -1) {
				res = res + ",64位操作系统";
			} else if(UserAgent.indexOf("Win32") > -1 && UserAgent.indexOf("x86") > -1) {
				res = res + ",32位操作系统";
			}
		}
		return res;
	},
	netMonitor:function(){
		window.addEventListener("offline", function(e) {
			console.log("网络断开!");
		});
		window.addEventListener("online", function(e){
			console.log("网络已连接！");
		});			
	},
	netIslink:function(){
		if(window.navigator.onLine){
			console.log("网络已连接!");
		}else{
			console.log("网络断开!");
		};		
	},				
	
}
/* 
 IP获取方法
 <script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
<script type="text/javascript">  
    console.log(returnCitySN["cip"]+','+returnCitySN["cname"])  
</script>
 */