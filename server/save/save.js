const fs = require('fs');
const path = require('path');
const url = require('url');
const async = require('async');
//根据url创建文件夹
let saveLogs = {
  save: (logUrl, data) => {
    let logUrlObj = url.parse(logUrl);
    let logPath = path.normalize(logUrlObj.host + logUrlObj.path);
    let fileName;
    try {
      fileName = logPath.replace(new RegExp(path.sep, 'g'), '-');
    } catch (error) {
      fileName = logPath.replace(new RegExp(path.sep + '\\', 'g'), '-');
    }

    let logsPath = path.normalize('./server/logs');
    let fullPathParse = path.parse(logPath);
    let file = fullPathParse.base;
    let dir = fullPathParse.dir;
    // base:"20170115153540.log"
    // dir:"127.0.0.1\toupiao\31cms"
    // ext:".log"
    // name:"20170115153540"
    // root:""
    async.waterfall([
      function (done) {
        fs.exists(logsPath, r => {
          done(null, r);
        })
      },
      function (r, done) {
        if (r) {
          done(null, path.resolve(logsPath));
        }
        else {
          fs.mkdir(logsPath, err => {
            done(err, path.resolve(logsPath))
          })
        }
      },
      function (now, done) {
        fs.appendFile(path.join(now,fileName), data, err => {
          done(err);
        })
      }
    ], (err, res) => {
      console.log(err);
    })
  }
}
module.exports = saveLogs;