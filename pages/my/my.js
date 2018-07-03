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