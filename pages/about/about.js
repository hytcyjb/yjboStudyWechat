//my.js
//获取应用实例
var app = getApp()
Page({
  data: {
    content:"",
    height:500
  },
  onLoad: function (options) {
    var that = this;
    var title = options.title;
    var content = options.content;

    wx.setNavigationBarTitle({
      title: title
    })
    var mheight = 500;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        mheight = res.windowHeight;
      }
    })

    that.setData({
      content: content,
      height: mheight
    });
  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.showToast({
      title: '你好',
      icon: '',
      image: '',
      duration: 0,
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})

