Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 5,
    resultdata:[]
  },
  // onPullDownRefresh: function () {
  //   wx.showToast({
  //     title: 'loading...',
  //     icon: 'loading'
  //   })
  //   console.log('onPullDownRefresh', new Date())
  // },
  //事件处理函数
  bindrefresh: function () {
    var that = this;
    this.refreshData(that);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showToast({
    //   title: 'loading...',
    //   icon: 'loading'
    // })
    // type = 1 : 全部
    // type = 2 : 文字
    // type = 3 : 图片
    // type = 4 : 视频
    // page = 1:页码
    var that = this;
    this.refreshData(that);
  },
  refreshData : function(that){
    wx.request({
      url: 'https://www.apiopen.top/satinApi?type=1&page=1',
      data: {
        // x: '',
        //   y: ''
      },
      method: "GET",
      header: {
        "Content-Type": "json" // 默认值

      },
      success: function (res) {
        // wx.hideToast()
        console.log(res.data.code);
        console.log(res.data);
        if (res.data.code == 200) {
          that.setData({
            resultdata: res.data.data
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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