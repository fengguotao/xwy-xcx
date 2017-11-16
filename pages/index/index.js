//index.js
//获取应用实例
var config = require("../../utils/config.js")
Page({
  data: {
    imgUrls: [
      // 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,//显示面板指示点
    autoplay: true,//自动轮播
    interval: 5000,
    duration: 1000,
    list : [
    // 'aaaa','bbbbb','ccccc'
    ],
    page : 0
  },
  onLoad: function () {
    this.setData({
          info : [],
          imgUrls: [],
          list: []
    })
    this.getListJson(0);
    // console.log(config.getListJson)
    
  },
  getListJson : function(page){
    console.log(page);
    var that = this
    wx.request({
      url: config.getListJson,
      data: {
        columnId : '100000002',
        language : 'zh',
        size : 20,
        page : page
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if(page){
          let list = res.data.list;
          let oldlist = that.data.list
          for (let i = 0; i < list.length; i++) {
            oldlist.push(list[i]);
          }
          that.setData({
            list: oldlist
          })

        }else{


          let info = res.data.info;
          let list = res.data.list;
          // console.log(res.data)
          // this.data.imgUrls = info.picLinks
          that.setData({
            info : info,
            imgUrls: [info.picLinks],
            list: list
          })
        }
      }
    })
  },
  changeIndicatorDots: function(e) {
    // console.log(e.currentTarget.id);
    let articleId = e.currentTarget.id;
    wx.navigateTo({
      url: '../webview/webview?articleId=' + articleId
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
      title: '新闻眼',
      path: '/pages/index/index',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page : this.data.page + 1
    });
    this.getListJson(this.data.page);

  }
})
