// 这种方式完全没有必要
var temp = {
  onclick: function (event) {
    console.log("点击了" + event.currentTarget.dataset.item)
  },
  bindCollect: function (event) {
    console.log("点击了1111" + event.currentTarget.dataset.item)
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
}

//导出，供外部使用
export default temp