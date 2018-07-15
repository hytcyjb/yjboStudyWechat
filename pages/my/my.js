//my.js
// import '../../utils/util.js';
var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    collects: [],
    // item2:{}
    // cacheRes:{},
    cacheNumStr: "0 KB",
    height: 500
  },
  onLoad: function() {
    var that = this;
    var mheight = 500;
    wx.getSystemInfo({
      success: function (res) {
        mheight = res.windowHeight;
      }
    })
    wx.getStorageInfo({
      success: function(res) {
        console.log(res.keys) //当前storage中所有的key
        console.log(res.currentSize) //当前占用的空间大小, 单位kb
        console.log(res.limitSize) //限制的空间大小，单位kb
        var cacheData = res.currentSize;
        var cacheStr = "0 KB";
        if(cacheData >= 1024){
          cacheStr = (cacheData / 1024).toFixed(2)+" MB";
        }else{
          cacheStr = cacheData + " KB";
        }
        that.setData({
          // cacheRes:res
          cacheNumStr: cacheStr,
          height: mheight
        });
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
            if ((itemOne.user_id + itemOne.t) == (item.user_id + item.t)) {
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
                  collects: itemArr
                });
              }
            })

          } else if (collectFlag == "1") {
            that.setData({
              collects: itemArr
            });
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 2000,
              fail: function () {
                that.setData({
                  collects: itemArr
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
  cleancache:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定清除缓存数据',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'logs',
            success: function (res) {
              console.log(res.data)
            }
          }),
          wx.removeStorage({
            key: 'collects',
            success: function (res) {
              console.log(res.data)
              that.setData({
                // cacheRes: {},
                cacheNumStr: "0 KB"
              });
              wx.showToast({
                title: '缓存清除成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  mycollect:function(){
    console.log('收藏---')
    // wx.navigateTo({
    wx.switchTab({
      url: '../collects/collects',
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
  clickabout: function () {
    wx.navigateTo({
      url: '../about/about?title=' + "关于·感谢&content=" + "感谢：有梦想的程序丶猿"+ 
      "提供的免费开放接口API;\n具体地址为： https://www.jianshu.com/p/e6f072839282" +"\n\n"
      + "声明：\n"
      + "本次版本不支持视频播放（下次版本争取添加上），微信说明如下：\n"
      + "你的小程序“娱乐休闲看看”代码发布审核未通过，原因如下：\n"
      + "1: 服务类目“工具-图片/音频/视频_”与你提交代码审核时设置的功能页面内容不一致:\n"
      + "(1):小程序服务提供的内容涉及在线观看视频，属个人未开放类目，建议选择企业主体小程序。\n",
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
  /**
   * 点击版本更新信息
   */
  clickVersion: function () {
    wx.navigateTo({
      url: "../about/about?title=版本信息&content=" 
      + "当前版本：v0.0.388\n\n"
      + "历次版本信息：\n\n"
      + "· v0.0.388版本（2018年7月12日发布）\n\n"
      + "本次版本更新内容如下：\n"
      + "1.新增我的收藏页面；（上版本中我的页面改成收藏页面）\n"
      + "2.修改我的页面内容：新增：我的头像，显示内存，显示我的收藏；清除内存；\n"
      + "3.将小程序中人物头像改成圆形；\n"
      + "4.所有页面添加转发功能；\n"
      + "5.首页，详情页面，收藏页面，收藏详情页面； 点击收藏按钮时数据、页面联动处理；\n"
      + "6.优化详情页面的界面显示；\n\n"
      + "· v0.0.328版本（2018年7月5日发布）\n\n"
      + "本次版本更新内容如下：\n"
      + "1.搭建微信小程序的框架；\n"
      + "2.新建首页四页签；\n"
      + "3.新建收藏页面；\n",
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

