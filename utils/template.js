// 这种方式完全没有必要
var temp = {
  onclick: function (event) {
    console.log("点击了" + event.currentTarget.dataset.item)
  }
}
//导出，供外部使用
export default temp