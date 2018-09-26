//创建mysql连接池
const mysql = require('mysql');
var pool = mysql.createPool({
  host     : process.env.MYSQL_HOST,
  port     : process.env.MYSQL_PORT,
  user     : process.env.ACCESSKEY,
  password : process.env.SECRETKEY,
  database : 'app_' + process.env.APPNAME
});
//把创建好的连接池导出
module.exports = pool;




