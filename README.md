# yjboStudyWechat
# 欢迎访问我的微信小程序：[该小程序github源码地址](https://github.com/hytcyjb/yjboStudyWechat)（喜欢就给个star呗）
### （本小程序是模仿新闻类的app做的一个小程序）
### 在此特别感谢：  `有梦想的程序丶猿`   提供的免费开放接口API 
### （其博客地址：[https://www.jianshu.com/p/e6f072839282](https://www.jianshu.com/p/e6f072839282)）  


## 本次发版主要实现功能如下：（2018年7月5日发布）
 （搭建小程序的开发环境等内容请参考：https://developers.weixin.qq.com/miniprogram/dev/index.html）
## [该小程序github源码地址](https://github.com/hytcyjb/yjboStudyWechat)（喜欢就给个star呗）
 ![这里写图片描述](https://github.com/hytcyjb/111/blob/master/shotscreen/icon.jpg?raw=true)
 ![这里写图片描述](https://github.com/hytcyjb/111/blob/master/shotscreen/icon.jpg?raw=true)
## 效果图如下
<p><img src="https://github.com/hytcyjb/111/blob/master/shotscreen/v0_0_328.gif?raw=true" width="300" height="570"></p>
 <p><img src="https://github.com/hytcyjb/111/blob/master/shotscreen/Screenshot_2018-07-05-23-14-11-529.png?raw=true" width="300" height="570">
<img src="https://github.com/hytcyjb/111/blob/master/shotscreen/Screenshot_2018-07-05-23-14-17-030.png?raw=true" width="300" height="570">
 <img src="https://github.com/hytcyjb/111/blob/master/shotscreen/Screenshot_2018-07-05-23-14-44-060.png?raw=true" width="300" height="570">
<img src="https://github.com/hytcyjb/111/blob/master/shotscreen/Screenshot_2018-07-05-23-15-01-278.png?raw=true" width="300" height="570"></p>


#### 1.实现底部的2个tab显示：（首页，我的页面）
```
在app.json内配置如下代码，即可实现底部的tab；
"tabBar": {
    "color": "#ccc",
    "selectedColor": "#00FF00",
    "borderStyle": "white",
    "backgroundColor": "#f9f9f9",
    "list": [
      {
        "text": "首页",
        "pagePath": "pages/main/main",
        "iconPath": "pic/icon_component.png",
        "selectedIconPath": "pic/icon_component_HL.png"
      },
      {
        "text": "我的",
        "pagePath": "pages/my/my",
        "iconPath": "pic/wechat.png",
        "selectedIconPath": "pic/wechatHL.png"
      }
    ]
  },
```
#### 2.实现顶部的4个页签的显示以及滑动；
```
<view class="swiper-tab">
<view class="tab-item {{currentTab==0 ? 'on' : ''}}" data-current="0" bindtap="swichNav">推荐</view>
  <view class="tab-item {{currentTab==1 ? 'on' : ''}}" data-current="1" bindtap="swichNav">纯文字</view>
  <view class="tab-item {{currentTab==2 ? 'on' : ''}}" data-current="2" bindtap="swichNav">图片</view>
  <view class="tab-item {{currentTab==3 ? 'on' : ''}}" data-current="3" bindtap="swichNav">视频</view>
</view>
<swiper current="{{currentTab}}" class="swiper" duration="300" style="height:{{winHeight}}px" bindchange="bindChange">
  <swiper-item>
    <scroll-view scroll-y="{{true}}" style="height:{{winHeight}}px" class="list" bindscrolltolower="bindDownLoad" bindscroll="scroll" bindscrolltoupper="refresh">
      <view class='listview' wx:for="{{resultdata}}" wx:for-item="item" wx:key="*this">
      <view bindtap="bindViewTap" data-item='{{item}}'>
         <template  is="{{item.type == '29' ? 'joy-text' : (item.type == '10' ? 'joy-pic' : (item.type == '41' ? 'joy-video' : 'joy-pic'))}}" data="{{...item}}"></template>
      </view>
      </view>
    </scroll-view>
  </swiper-item>
   ···省略swiper-item 3个内容···
</swiper>
```
#### 3.实现内容页列表的上拉刷新和下拉加载更多功能；
```
上面2中的下面代码，实现了上拉加载和下拉刷新功能
bindscrolltolower="bindDownLoad"  bindscrolltoupper="refresh"
```
#### 4.实现模板化展示数据；
```
上面2中的下面代码，实现模板功能
<import src="../../utils/template.wxml" />
<template  is="{{item.type == '29' ? 'joy-text' :
 (item.type == '10' ? 'joy-pic' :
  (item.type == '41' ? 'joy-video' : 'joy-pic'))}}" data="{{...item}}"></template>
```
#### 5.实现数据的本地收藏和取消收藏功能；
```
  wx.setStorage({
        key: "collects", //以用户id和用户创建该数据的时间作为唯一的key
        data: JSON.stringify(itemArr),
        success: function() {}
        })
 //收藏和取消收藏使用了一个key，收藏时将数组添加一个元素；取消收藏时将数组减去该元素；
```
#### 6.实现页面的跳转功能，转发功能；
```
//实现跳转页面功能
 bindViewTap: function(event) {
    var item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../detail/detail?jsonStr=' + JSON.stringify(event.currentTarget.dataset.item),
      success: function(res) {
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
```

```
 /**
   * js文件中添加下面代码，用户即可以点击右上角分享
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
```
#### 7.实现本地收藏数据的列表显示功能； 等
```
//js中获取所有收藏的数据，并通过页面展示出来，此处是获取本地收藏数据
  requesLocalData:function(){
    var list = [];
    try {
      var value = wx.getStorageSync('collects');
      if (value) {
        // Do something with return value
        var itemArr = JSON.parse(value);
        if (itemArr) {
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
    })
  }
```

## [该小程序github源码地址](https://github.com/hytcyjb/yjboStudyWechat)（喜欢就给个star呗）
 ![这里写图片描述](https://github.com/hytcyjb/111/blob/master/shotscreen/icon.jpg?raw=true)
 ![这里写图片描述](https://github.com/hytcyjb/111/blob/master/shotscreen/icon.jpg?raw=true)

## `规划：第二版v0.0.388主要实现功能如下（预计2018年7月13日发布）`
#### `1.新增我的页面：将之前我的页面名称改为收藏页面；新我的页面包含功能如下：`
##### `a.显示我的微信头像；`
##### `b.显示本地缓存内存大小；`
##### `c.显示我的收藏节点；`
##### `d.清除本地内存功能；`
#### `2.小程序的列表，详情中人物头像改为圆形；`
#### `3.在列表中加入收藏按钮，方便列表中进行操作； 等`
