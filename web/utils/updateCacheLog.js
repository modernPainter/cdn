/*
这是一个在服务端执行的js文件
1.用于生成日志记录
2.使用方法：
 let updateCacheLog = require('../目录/updateCacheLog')
  updateCacheLog(`你的信息`)
*/
const fs = require('fs');
const path = require('path');

const logPath = path.resolve(process.cwd(), './logs', `updateCache.log`);
const logPathDir = path.resolve(process.cwd(), './logs');

const getTimeFun = function () {
  var now = new Date(),
    year = now.getFullYear(),
    month = now.getMonth() + 1,
    day = now.getDate(),
    hh = now.getHours(),
    mm = now.getMinutes(),
    ss = now.getSeconds();
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
}

module.exports = function (message) {
  try {
    fs.access(logPathDir, fs.constants.F_OK, function (err) {
      if (err) {
        fs.mkdirSync(logPathDir, function (err) {
          if (err) {
            console.log('创建日志目录失败！');
            return false;
          }
        });
      }
      fs.appendFileSync(logPath, message + '   time:' +getTimeFun() + '\r\n', function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}