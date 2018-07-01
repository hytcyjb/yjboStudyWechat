//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '知识积累，知识共享，知识沉淀，知识爆发',
    userInfo: {},
    location_res: {},
    locationMap: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    //添加转发按钮
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.getLocation({//获取当前经纬度
      type: 'wgs84',
      success: function (res) {
        that.setData({
          // location_res:res
          location_res: {
            latitude: res.latitude,
            longitude: res.longitude,
            speed: res.speed,
            altitude: res.altitude,
            name: "请选择",
            address: "请选择"
          }
        })
        // var latitude = res.latitude
        // var longitude = res.longitude
        // var speed = res.speed
        // var accuracy = res.accuracy
      }
    });
    wx.chooseLocation({//获取当前经纬度,位置
      success: function (res) {
        that.setData({
          // location_res:res
          location_res: {
            latitude: res.latitude,
            longitude: res.longitude,
            name: res.name,
            address: res.address
          }
        })
        // var latitude = res.latitude
        // var longitude = res.longitude
        // var speed = res.speed
        // var accuracy = res.accuracy
      }
    });
  },
  //地图事件处理函数
  bindViewMap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    // wx.getLocation({//在地图上选点
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success: function (res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    wx.openLocation({
      latitude: this.data.location_res.latitude,
      longitude: this.data.location_res.longitude,
      scale: 28,
    })
    //   }
    // })
  },
})
