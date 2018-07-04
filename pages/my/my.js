//my.js
var util = require('../../utils/util.js')
Page({
  data: {
    collects: [],
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
      // item2:item
    })
  }
})

