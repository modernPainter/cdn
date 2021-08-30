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
