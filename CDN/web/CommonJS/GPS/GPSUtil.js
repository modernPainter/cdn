class GPSUtil {
    static pi = 3.1415926535897932384626;
    static x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    static a = 6378245.0;
    static ee = 0.00669342162296594323;
    static transformLat(x, y) {
        let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y
            + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * GPSUtil.GPSUtil.pi) + 20.0 * Math.sin(2.0 * x * GPSUtil.GPSUtil.pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * GPSUtil.pi) + 40.0 * Math.sin(y / 3.0 * GPSUtil.pi)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * GPSUtil.pi) + 320 * Math.sin(y * GPSUtil.pi / 30.0)) * 2.0 / 3.0;
        return ret;
    }
    static transformLon(x, y) {
        let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1
            * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * GPSUtil.pi) + 20.0 * Math.sin(2.0 * x * GPSUtil.pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * GPSUtil.pi) + 40.0 * Math.sin(x / 3.0 * GPSUtil.pi)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * GPSUtil.pi) + 300.0 * Math.sin(x / 30.0
            * GPSUtil.pi)) * 2.0 / 3.0;
        return ret;
    }
    static outOfChina(lat, lon) {
        if (lon < 72.004 || lon > 137.8347)
            return true;
        if (lat < 0.8293 || lat > 55.8271)
            return true;
        return false;
    }
    static transform(lat, lon) {
        if (GPSUtil.outOfChina(lat, lon)) {
            return [lat, lon];
        }
        let dLat = GPSUtil.transformLat(lon - 105.0, lat - 35.0);
        let dLon = GPSUtil.transformLon(lon - 105.0, lat - 35.0);
        let radLat = lat / 180.0 * GPSUtil.pi;
        let magic = Math.sin(radLat);
        magic = 1 - GPSUtil.ee * magic * magic;
        let sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((GPSUtil.a * (1 - GPSUtil.ee)) / (magic * sqrtMagic) * GPSUtil.pi);
        dLon = (dLon * 180.0) / (GPSUtil.a / sqrtMagic * Math.cos(radLat) * GPSUtil.pi);
        let mgLat = lat + dLat;
        let mgLon = lon + dLon;
        return [mgLat, mgLon];
    }  
    /* 84 to 火星坐标系 (GCJ-02)*/
    static gps84_To_Gcj02(lat, lon) {
        if (GPSUtil.outOfChina(lat, lon)) {
            return [lat, lon];
        }
        let dLat = GPSUtil.transformLat(lon - 105.0, lat - 35.0);
        let dLon = GPSUtil.transformLon(lon - 105.0, lat - 35.0);
        let radLat = lat / 180.0 * GPSUtil.pi;
        let magic = Math.sin(radLat);
        magic = 1 - GPSUtil.ee * magic * magic;
        let sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((GPSUtil.a * (1 - GPSUtil.ee)) / (magic * sqrtMagic) * GPSUtil.pi);
        dLon = (dLon * 180.0) / (GPSUtil.a / sqrtMagic * Math.cos(radLat) * GPSUtil.pi);
        let mgLat = lat + dLat;
        let mgLon = lon + dLon;
        return [mgLat, mgLon];
    }
    /* 火星坐标系 (GCJ-02) to 84 */
    static gcj02_To_Gps84(lat, lon) {
        let gps = GPSUtil.transform(lat, lon);
        let lontitude = lon * 2 - gps[1];
        let latitude = lat * 2 - gps[0];
        return [latitude, lontitude];
    }
    /*火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 */
    /* 将 GCJ-02 坐标转换成 BD-09 坐标 */
    static gcj02_To_Bd09(lat, lon) {
        let x = lon, y = lat;
        let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * GPSUtil.x_pi);
        let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * GPSUtil.x_pi);
        let tempLon = z * Math.cos(theta) + 0.0065;
        let tempLat = z * Math.sin(theta) + 0.006;
        let gps = [tempLat, tempLon];
        return gps;
    }
    /* 将 BD-09 坐标转换成GCJ-02 坐标 */
    static bd09_To_Gcj02(lat, lon) {
        let x = lon - 0.0065, y = lat - 0.006;
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * GPSUtil.x_pi);
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * GPSUtil.x_pi);
        let tempLon = z * Math.cos(theta);
        let tempLat = z * Math.sin(theta);
        let gps = [tempLat, tempLon];
        return gps;
    }
    /*将gps84转为bd09 */
    static gps84_To_bd09(lat, lon) {
        let gcj02 = GPSUtil.gps84_To_Gcj02(lat, lon);
        let bd09 = GPSUtil.gcj02_To_Bd09(gcj02[0], gcj02[1]);
        return bd09;
    }
    /*将bd09转为gps84 */
    static bd09_To_gps84(lat, lon) {
        let gcj02 = GPSUtil.bd09_To_Gcj02(lat, lon);
        let gps84 = GPSUtil.gcj02_To_Gps84(gcj02[0], gcj02[1]);
        gps84[0] = Number(gps84[0]).toFixed(6);
        gps84[1] = Number(gps84[1]).toFixed(6);
        return gps84;
    }
    /*将腾讯/高德地图经纬度转换为百度地图经纬度*/
    static qqMapTransBMap(lng, lat) {
        let x = lng;
        let y = lat;
        let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * GPSUtil.x_pi);
        let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * GPSUtil.x_pi);
        let lngs = z * Math.cos(theta) + 0.0065;
        let lats = z * Math.sin(theta) + 0.006;
        return {
            lng: lngs,
            lat: lats
        }
    }
    /* 将百度地图经纬度转换为腾讯/高德地图经纬度*/
    static bMapTransQQMap(lng, lat) {
        let x = lng - 0.0065;
        let y = lat - 0.006;
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * GPSUtil.x_pi);
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * GPSUtil.x_pi);
        let lngs = z * Math.cos(theta);
        let lats = z * Math.sin(theta);
        return {
            lng: lngs,
            lat: lats
        }
    }
    /*66.56055556或者'66.56055556'转化为"66°33'38""*/
    static getXYHMS(f, t) {  //t为 lng 或者 lat
        var h, m, s, hms = "";
        h = parseInt(Number(f));
        m = parseInt((parseFloat(f) - parseInt(h)) * 60);
        s = (parseFloat(((parseFloat(f) - parseInt(h)) * 60 - parseInt(m)) * 60)).toFixed(2);
        if (m.toString().length == 1 && m != 0) { m = "0" + m.toString(); }
        if (s.toString().length == 1) { s = "0" + s.toString(); }
        if (s == "0.00") { s = 0; }
        if (t != null) {
            if (t == "lng") {
                if (h < 0) { hms = "西经W"; } else { hms = "东经E"; }
            }
            if (t == "lat") {
                if (h < 0) { hms = "南纬S"; } else { hms = "北纬N"; }
            }
        }
        hms += h + '°' + m + '′' + s + '″';
        hms = hms.replace(/\-/g, "");
        return hms;
    }
    /*"66°33'38""转化为'66.56055556'*/
    /*数据格式："66 33 38"转化为'66.56055556'*/
    static getHMSXY(t) {
        var a, v, i, x;
        a = t.split(" ");
        v = 0;
        for (i = 0; i < a.length; i++) {
            if (i == 0) { v = parseInt(a[i]); x = v; }
            if (x >= 0) {
                if (i == 1) { v = v + (parseFloat(a[i]) / 60); }
                if (i == 2) { v = v + (parseFloat(a[i]) / 3600); }
            } else {
                if (i == 1) { v = v - (parseFloat(a[i]) / 60); }
                if (i == 2) { v = v - (parseFloat(a[i]) / 3600); }
            }
        }
        v = v.toFixed(8);
        return v;
    }
    static getDistance(lat1, lng1, lat2, lng2) {   //获取两个经纬度的距离---格式是数字
        var radLat1, radLat2, a, b, s;
        radLat1 = lat1 * Math.PI / 180.0;
        radLat2 = lat2 * Math.PI / 180.0;
        a = radLat1 - radLat2;
        b = (lng1 * Math.PI / 180.0) - (lng2 * Math.PI / 180.0);
        s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378137;
        s = Math.round(s * 10000) / 10000;
        return s;
    }
    getPosition() { // 浏览器获取当前经纬度坐标
    //  getPosition().then(result => {
    //    返回结果示例：{latitude: 30.318030999999998, longitude: 120.05561639999999}
    //     // 一般小数点后只取六位，所以用以下代码搞定
    //     let queryData = {
    //       longtitude: String(result.longitude).match(/\d+\.\d{0,6}/)[0],
    //       latitude: String(result.latitude).match(/\d+\.\d{0,6}/)[0],
    //       channelType: '00'
    //     }
    //     console.log(queryData)
    //   })        
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    let latitude = position.coords.latitude
                    let longitude = position.coords.longitude
                    let data = {
                        latitude: latitude,
                        longitude: longitude
                    }
                    resolve(data)
                }, function () {
                    reject(arguments)
                })
            } else {
                reject('你的浏览器不支持当前地理位置信息获取')
            }
        })
    }

}