//collects.js
var util = require('../../utils/util.js')
Page({
  data: {
    collects: [],
    mhiden:true
    // item2:{}
  },
  onLoad: function() {
    wx.getStorageInfo({
      success: function(res) {
        console.log(res.keys) //当前storage中所有的key
        console.log(res.currentSize) //当前占用的空间大小, 单位kb
        console.log(res.limitSize) //限制的空间大小，单位kb
      }
    })
  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  console.log("我显示了")
  this.requesLocalData();
  },
  bindViewTap: function (event) {
    // console.log("nihao////" + event.currentTarget.dataset.item)
    var item = event.currentTarget.dataset.item;
    // if (item.type == "10") {
    //   templates.previewImg(event);
    //   return;
    // } else if (item.type == "29") {
    //   // templates.bindCollect(event);
    // }
    wx.navigateTo({
      url: '../detail/detail?jsonStr=' + JSON.stringify(event.currentTarget.dataset.item),
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }

    })
  },
  requesLocalData:function(){
    var list = [];
    // var itemOne = {};
    try {
      var value = wx.getStorageSync('collects');
      if (value) {
        // Do something with return value
        var itemArr = JSON.parse(value);
        if (itemArr) {
          // itemOne = item;
          list = itemArr;
        }
      }
    } catch (e) {
      // Do something when catch error
      wx.showToast({
        title: '获取缓存数据出错',
        icon: 'fail'
      })
    }
    this.setData({
      collects: list,
      mhiden: (list.length > 0 ? true :false)
      // item2:item
    })
  },
  //收藏功能
  bindvideo_collect: function (event) {
    var that = this;
    var itemArr = [];
    var item = event.currentTarget.dataset.item;
    var collectFlag = ""; //"":默认状态；"1":收藏成功状态；"0":取消收藏成功状态；
    try {
      var value = wx.getStorageSync('collects');
      if (value) {
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
        success: function () {
          if (collectFlag == "0") {
            wx.showToast({
              title: '取消收藏成功',
              icon: 'success',
              duration: 2000,
              success:function(){
                that.setData({
                  collects: itemArr,
                  mhiden: (itemArr.length > 0 ? true : false)
                });
              }
            })

          } else if (collectFlag == "1") {
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 2000,
              success: function () {
                that.setData({
                  collects: itemArr,
                  mhiden: (itemArr.length > 0 ? true : false)
                });
              }
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '收藏失败',
            icon: 'none'
          })
        }
      })
      return;
    }
  },
  //视频播放功能
  bindvideo_play: function (event) {
    this.bindViewTap(event);
  },
  //详情功能
  bindvideo_detail: function (event) {
    this.bindViewTap(event);
  },
  //点击图片大图功能
  bindpic_play: function (e) {
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

