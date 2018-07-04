import templates from '../../utils/template'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 5,
    winWidth: 0,
    winHeight: 0,
    resultdata: [],
    resultdata1: [],
    resultdata2: [],
    resultdata3: [],
    pageNum: 1,
    pageNum1: 1,
    pageNum2: 1,
    pageNum3: 1,
    currentTab: 0
  },
  // onPullDownRefresh: function () {
  //   wx.showToast({
  //     title: 'loading...',
  //     icon: 'loading'
  //   })
  //   console.log('onPullDownRefresh', new Date())
  // },
  //事件处理函数
  bindrefresh: function() {
    var that = this;
    this.refreshData(that, that.data.currentTab + 1, 1);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.showToast({
    //   title: 'loading...',
    //   icon: 'loading'
    // })
    //https://www.jianshu.com/p/e6f072839282
    // type = 1 : 全部
    // type = 2 : 文字
    // type = 3 : 图片
    // type = 4 : 视频
    // page = 1:页码
    var that = this;
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function(res) {
        console.log("屏幕的高和宽：" + res.windowHeight + "===" + res.windowWidth, )
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });

    this.refreshData(that, 1, 1);
  },
  /**
   * 请求网络数据
   */
  refreshData: function(that, type, pageNu) {
    let pageN = 1;
    if (pageNu) {
      pageN = pageNu;
    }
    wx.showLoading({
      title: '加载中',
    })
    console.log("当前请求的url：" + 'https://www.apiopen.top/satinApi?type=' + type + '&page=' + pageN)
    wx.request({
      url: 'https://www.apiopen.top/satinApi?type=' + type + '&page=1',
      data: {
        // x: '',
        //   y: ''
      },
      method: "GET",
      header: {
        "Content-Type": "json" // 默认值

      },
      success: function(res) {
        // wx.hideToast()
        console.log(res.data.code);
        console.log(res.data);
        if (res.data.code == 200) {
          var height = 100;
          var dataNew = res.data.data;
          if (type == 1) {
            var dataOld = that.data.resultdata;
            if (dataOld && dataOld.length > 0) {
              if (pageN == 1) { //刷新时数据加原始数据上面
                dataNew.push.apply(dataNew, dataOld);
                dataOld = dataNew;
              } else { //加载更多时数据加新数据上面
                dataOld.push.apply(dataOld, dataNew);
              }
            } else {
              dataOld = dataNew;
            }
            that.setData({
              resultdata: dataOld,
              // winHeight: res.data.data.length * height
            });
          } else if (type == 2) {
            var dataOld = that.data.resultdata1;
            if (dataOld && dataOld.length > 0) {
              if (pageN == 1) { //刷新时数据加原始数据上面
                dataNew.push.apply(dataNew, dataOld);
                dataOld = dataNew;
              } else { //加载更多时数据加新数据上面
                dataOld.push.apply(dataOld, dataNew);
              }
            } else {
              dataOld = dataNew;
            }
            that.setData({
              resultdata1: dataOld,
              // winHeight: res.data.data.length * height
            });
          } else if (type == 3) {
            var dataOld = that.data.resultdata2;
            if (dataOld && dataOld.length > 0) {
              if (pageN == 1) { //刷新时数据加原始数据上面
                dataNew.push.apply(dataNew, dataOld);
                dataOld = dataNew;
              } else { //加载更多时数据加新数据上面
                dataOld.push.apply(dataOld, dataNew);
              }
            } else {
              dataOld = dataNew;
            }
            that.setData({
              resultdata2: dataOld,
              // winHeight: res.data.data.length * height
            });
          } else if (type == 4) {
            var dataOld = that.data.resultdata3;
            if (dataOld && dataOld.length > 0) {
              if (pageN == 1) { //刷新时数据加原始数据上面
                dataNew.push.apply(dataNew, dataOld);
                dataOld = dataNew;
              } else { //加载更多时数据加新数据上面
                dataOld.push.apply(dataOld, dataNew);
              }
            } else {
              dataOld = dataNew;
            }
            that.setData({
              resultdata3: dataOld,
              // winHeight: res.data.data.length * height
            });
          }

        }
      },
      fail: function() {

      },
      complete: function() {
        wx.hideLoading()
      }

    });
  },
  bindViewTap: function(event) {
    // console.log("nihao////" + event.currentTarget.dataset.item)
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../detail/detail?jsonStr=' + JSON.stringify(event.currentTarget.dataset.item),
      success: function(res) {
        // success
        console.log("nihao////1")
      },
      fail: function() {
        // fail
        console.log("nihao////2")
      },
      complete: function() {
        // complete
        console.log("nihao////3")
      }

    })
  },
  swichNav: function(e) {
    console.log("走这里swichNav")
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      // wx.showToast({
      //   title: "我在=="+e.target.dataset.current,
      //   icon: 'success',
      //   duration: 2000
      // })
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  bindChange: function(e) {
    console.log("走这里bindChange")
    var that = this;
    // wx.showToast({
    //   title: "当前页==" + e.detail.current,
    //   icon: 'success',
    //   duration: 2000
    // })
    var pageNo = e.detail.current;
    if (this.data.currentTab === pageNo) {
      return false;
    } else {
      that.setData({
        currentTab: pageNo,
      });
      //防止切换页面时重复请求数据，继续使用之前数据
      if (pageNo == 0) {
        if (that.data.resultdata.length > 0) {
          return;
        }
      } else if (pageNo == 1) {
        if (that.data.resultdata1.length > 0) {
          return;
        }
      } else if (pageNo == 2) {
        if (that.data.resultdata2.length > 0) {
          return;
        }
      } else if (pageNo == 3) {
        if (that.data.resultdata3.length > 0) {
          return;
        }
      }
      this.refreshData(that, pageNo + 1, 1);
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  bindDownLoad: function() {
    //  该方法绑定了页面滑动到底部的事件  
    var that = this;
    var nowPage = that.data.currentTab;
    var type = nowPage + 1;
    var pageN = 1;
    if (type == 1) {
      pageN = that.data.pageNum;
    } else if (type == 2) {
      pageN = that.data.pageNum1;
    } else if (type == 3) {
      pageN = that.data.pageNum2;
    } else if (type == 4) {
      pageN = that.data.pageNum3;
    }

    that.refreshData(that, nowPage + 1, pageN + 1);
  },
  refresh: function(event) {
    //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新  
    var that = this;
    var nowPage = that.data.currentTab;
    that.refreshData(that, nowPage + 1, 1);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    wx.showToast({
      title: '你好',
      icon: '',
      image: '',
      duration: 0,
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})