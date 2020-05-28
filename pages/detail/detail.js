Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {}
  },
  onLoad: function(options) {
    // 生命周期函数--监听页面加载
    let object = JSON.parse(options.jsonStr);
    var mIsCollect = this.getIsCollect(object);
    object.isCollect = mIsCollect;
    this.setData({
      item: object
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  bindcollect: function (event) {
    console.log("点击收藏")
    var that = this;
    this.setIsCollect(that,event.currentTarget.dataset.item);
  },
  getIsCollect: function(item) {
    var itemArr = [];
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
              collectFlag = "1";
              break;
            }
            if (i == itemArr.length - 1) {
              collectFlag = "0";
              break;
            }
          }
        } else {
          collectFlag = "0";
        }
      }
    } catch (e) {}
    if (collectFlag == "1") {
      return true;
    } else {
      return false;
    }
  },
  setIsCollect: function (that,item) {
    item.isCollect = true;
    var itemArr = [];
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
              itemArr.unshift(item); //向数组插入一个元素成为第一个元素
              collectFlag = "1";
              break;
            }
          }
        } else {
          itemArr = [item];
          collectFlag = "1";
        }
      } else {
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
            item.isCollect = false;
            that.setData({
              item: item
            });
            wx.showToast({
              title: '取消收藏成功',
              icon: 'success'
            })
          } else if (collectFlag == "1") {
            item.isCollect = true;
            that.setData({
              item: item
            });
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
  previewImg: function (e) {
    var item = e.currentTarget.dataset.item;
    console.log(item.image0);
    var picsrc = item.image0;
    var imgArr = [];
    imgArr.push(picsrc);
    wx.previewImage({
      current: imgArr[0],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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