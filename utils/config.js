/**
 * 小程序配置文件
 */
// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la
//var host = "http://coffeeapi-web.tunnel.qydev.com/CoffeeAPI-Web" //测试
var host = "http://api.wx.china.cn" //测试
//var host = "https://m.feawin.com/scene/query/list?"
var config = {
  getListJson: `${host}/activity/list/json?`,
  //getListJson: `${host}/activity/list/json?`

};
module.exports = config