
var postData = require('../../data/post-data')

Page({
  data:{
    
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.setData(postData.postList)

  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  gotoDetail (event) {
    let id = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+id
    })
  }
})