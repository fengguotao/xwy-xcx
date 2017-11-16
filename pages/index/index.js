//index.js
//获取应用实例
var config = require("../../utils/config.js")
Page({
  data: {
    imgUrls: [
      // 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,//显示面板指示点
    autoplay: true,//自动轮播
    interval: 5000,
    duration: 1000,
    list : [
    'aaaa','bbbbb','ccccc'
    ]
  },
  onLoad: function () {
    var that = this
    console.log(config.getListJson)
    wx.request({
      url: config.getListJson,
      data: {
        columnId : '100000002',
        language : 'zh',
        size : 50,
        page : 0
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        let info = res.data.info;
        let list = res.data.list;
        console.log(res.data)
        //this.data.imgUrls = info.picLinks
        that.setData({
          info : info,
          imgUrls: [info.picLinks],
          list: list
        })
      }
    })
  },
  changeIndicatorDots: function() {
    wx.navigateTo({
      url: '../webview/webview'
    })
    // this.setData({
    //   indicatorDots: !this.data.indicatorDots
    // })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})
