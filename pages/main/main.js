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
    // type = 1 : 全部 --- 改为动图
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
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    var nowPage = that.data.currentTab;
    var type = nowPage + 1;
    var dataOld = [];
    if (type == 1) {
       dataOld = that.data.resultdata;
    } else if (type == 2) {
      dataOld = that.data.resultdata1;
    } else if (type == 3) {
      dataOld = that.data.resultdata2;
    } else if (type == 4) {
      dataOld = that.data.resultdata3;
    }
    if (dataOld && dataOld.length > 0){//列表没有数据时不刷新页面
      var value = wx.getStorageSync('collects');
      var itemArr = [];
      for (var i = 0; i < dataOld.length; i++) {
        var item = dataOld[i];
        var isCollectFlag = "";
        if (value) {
          itemArr = JSON.parse(value);
          for (var k = 0; k < itemArr.length; k++) {
            var itemOne = itemArr[k];
            if ((itemOne.sid) == (item.sid)) {
              isCollectFlag = "1"
            }
          }
        } else { //不处理
        }
        if (isCollectFlag == "1") {
          item.isCollect = true;
        } else {
          item.isCollect = false;
        }
      }
      if (type == 1) {
        that.setData({
          resultdata: dataOld,
        });
      } else if (type == 2) {
        that.setData({
          resultdata1: dataOld,
        });
      } else if (type == 3) {
        that.setData({
          resultdata2: dataOld,
        });
      } else if (type == 4) {
        that.setData({
          resultdata3: dataOld,
        });
      }
    }
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
    console.log("类型",type);
    var typeStr = "text";
    if (type == 1) {
      typeStr = "gif";
    } else if (type == 2) {
      typeStr = "text";
    }  else if (type == 3) {
      typeStr = "image";
    }  else if (type == 4) {
      typeStr = "video";//gif
    }
    wx.request({
      url: 'https://api.apiopen.top/getJoke?type=' + typeStr + '&page='+pageN+'&count=20',
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
          var dataNew = res.data.result;
          //为了方便以后快速更换免费接口 2020年05月28日
          if (dataNew) {
            for (let k = 0; k < dataNew.length; k++) {
              const element = dataNew[k];
              element.profile_image = element.header;
              element.type = element.type == "text" ? '29' : element.type == "image" ? '10' :
                              element.type == "gif" ? '10' : element.type == "video" ? '41' : 10;
              element.image0 = element.type == '41' ? element.thumbnail : element.images;//视频缩略图 //图片
              element.videouri = element.video;
            }
          }
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
            var value = wx.getStorageSync('collects');
            var itemArr = [];
            for (var i = 0; i < dataOld.length; i++) {
              var item = dataOld[i];
              var isCollectFlag = "";
              if (value) {
                itemArr = JSON.parse(value);
                for (var k = 0; k < itemArr.length; k++) {
                  var itemOne = itemArr[k];
                  if ((itemOne.sid) == (item.sid)) {
                    isCollectFlag = "1"
                  }
                }
              } else { //不处理
              }
              if (isCollectFlag == "1") {
                item.isCollect = true;
              } else {
                item.isCollect = false;
              }
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

            var value = wx.getStorageSync('collects');
            var itemArr = [];
            for (var i = 0; i < dataOld.length; i++) {
              var item = dataOld[i];
              var isCollectFlag = "";
              if (value) {
                itemArr = JSON.parse(value);
                for (var k = 0; k < itemArr.length; k++) {
                  var itemOne = itemArr[k];
                  if ((itemOne.sid) == (item.sid)) {
                    isCollectFlag = "1"
                  }
                }
              } else { //不处理
              }
              if (isCollectFlag == "1") {
                item.isCollect = true;
              } else {
                item.isCollect = false;
              }
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
            var value = wx.getStorageSync('collects');
            var itemArr = [];
            for (var i = 0; i < dataOld.length; i++) {
              var item = dataOld[i];
              var isCollectFlag = "";
              if (value) {
                itemArr = JSON.parse(value);
                for (var k = 0; k < itemArr.length; k++) {
                  var itemOne = itemArr[k];
                  if ((itemOne.sid) == (item.sid)) {
                    isCollectFlag = "1"
                  }
                }
              } else { //不处理
              }
              if (isCollectFlag == "1") {
                item.isCollect = true;
              } else {
                item.isCollect = false;
              }
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
            var value = wx.getStorageSync('collects');
            var itemArr = [];
            for (var i = 0; i < dataOld.length; i++) {
              var item = dataOld[i];
              var isCollectFlag = "";
              if (value) {
                itemArr = JSON.parse(value);
                for (var k = 0; k < itemArr.length; k++) {
                  var itemOne = itemArr[k];
                  if ((itemOne.sid) == (item.sid)) {
                    isCollectFlag = "1"
                  }
                }
              } else { //不处理
              }
              if (isCollectFlag == "1") {
                item.isCollect = true;
              } else {
                item.isCollect = false;
              }
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
  /**
   * 将返回值和本地收藏进行组合
   */
  compareDataStore: function(that, type, dataNew) {

  },
  bindViewTap: function(event) {
    // console.log("nihao////" + event.currentTarget.dataset.item)
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../detail/detail?jsonStr=' + JSON.stringify(event.currentTarget.dataset.item),
      success: function(res) {
        // success
        console.log("nihao////跳转成功")
      },
      fail: function() {
        // fail
        console.log("nihao////跳转失败")
      },
      complete: function() {
        // complete
        console.log("nihao////跳转行为结束，未知成功失败")
      }

    })
  },
  //收藏功能
  bindvideo_collect: function(event) {
    var that = this;
    var itemRequestArr = [];
    var pageNo = this.data.currentTab;
    if (pageNo === 0) {
      itemRequestArr = this.data.resultdata;
    } else if (pageNo === 1) {
      itemRequestArr = this.data.resultdata1;
    } else if (pageNo === 2) {
      itemRequestArr = this.data.resultdata2;
    } else if (pageNo === 3) {
      itemRequestArr = this.data.resultdata3;
    }

    var itemArr = [];
    var item = event.currentTarget.dataset.item;
    var collectFlag = ""; //"":默认状态；"1":收藏成功状态；"0":取消收藏成功状态；
    try {
      var value = wx.getStorageSync('collects');
      if (value) {
        // Do something with return value
        itemArr = JSON.parse(value);
        if (itemArr && itemArr.length > 0) {
          for (var i = 0; i < itemArr.length; i++) {
            var itemOne = itemArr[i];
            if ((itemOne.sid) == (item.sid)) {
              // 取消收藏。
              itemArr.splice(i, 1);
              collectFlag = "0";
              break;
            }
            if (i == itemArr.length - 1) {
              item.isCollect = true;
              itemArr.unshift(item); //向数组插入一个元素成为第一个元素
              collectFlag = "1";
              break;
            }
          }
        } else {
          item.isCollect = false;
          itemArr = [item];
          collectFlag = "1";
        }
      } else {
        item.isCollect = false;
        itemArr = [item];
        collectFlag = "1";
      }
    } catch (e) {
      // Do something when catch error
      wx.showToast({
        title: '获取缓存数据出错',
        icon: 'fail'
      })
    }
    if (collectFlag != "") {
      wx.setStorage({
        key: "collects", //以用户id和用户创建该数据的时间作为唯一的key
        data: JSON.stringify(itemArr),
        success: function() {
          if (collectFlag == "0") {
            // that.setData({
            //   item: item
            // });
            for (var k = 0; k < itemRequestArr.length; k++) {
              var itemOne = itemRequestArr[k];
              if ((itemOne.sid) == (item.sid)) {
                itemOne.isCollect = false;
                that.changePageData(that, pageNo, itemRequestArr);
                break;
              }
            }
            wx.showToast({
              title: '取消收藏成功',
              icon: 'success'
            })

          } else if (collectFlag == "1") {
            // that.setData({
            //   item: item
            // });
            for (var k = 0; k < itemRequestArr.length; k++) {
              var itemOne = itemRequestArr[k];
              if ((itemOne.sid) == (item.sid)) {
                itemOne.isCollect = true;
                that.changePageData(that, pageNo, itemRequestArr);
                break;
              }
            }
            wx.showToast({
              title: '收藏成功',
              icon: 'success'
            })
          }
        },
        fail: function() {
          wx.showToast({
            title: '收藏失败',
            icon: 'none'
          })
        }
      })
      return;
    }
  },
  /***
   * 更新数据值
   * that 上下文
   * pageNo 当前所在页面
   * itemRequestArr 封装网络数据修改值
   */
  changePageData: function(that, pageNo, itemRequestArr) {
    if (pageNo === 0) {
      that.setData({
        resultdata: itemRequestArr
      });
    } else if (pageNo === 1) {
      that.setData({
        resultdata1: itemRequestArr
      });
    } else if (pageNo === 2) {
      that.setData({
        resultdata2: itemRequestArr
      });
    } else if (pageNo === 3) {
      that.setData({
        resultdata3: itemRequestArr
      });
    }
  },
  //视频播放功能
  bindvideo_play: function(event) {
    this.bindViewTap(event);
  },
  //详情功能
  bindvideo_detail: function(event) {
    this.bindViewTap(event);
  },
  //点击图片大图功能
  bindpic_play: function(e) {
    var item = e.currentTarget.dataset.item;
    console.log(item.image0);
    var picsrc = item.image0;
    var imgArr = [];
    imgArr.push(picsrc);
    wx.previewImage({
      current: imgArr[0], //当前图片地址
      urls: imgArr, //所有要预览的图片的地址集合 数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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