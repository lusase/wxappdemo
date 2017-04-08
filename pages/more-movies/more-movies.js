// pages/more-movies/more-movies.js
let app = getApp()
Page({
  data: {
    pageData: {},
    pageSize: 18,
    pageNum: 1,
    pageTotal: 1,
    type: 'in_theaters',
    pending: false
  },
  onLoad: function (options) {
    if (options.type) this.setData({ type: options.type })
    let title = options.title || '正在上映'
    wx.setNavigationBarTitle({ title })
    this.getMovieList()
  },
  onReachBottom(){
    this.getMovieList()
  },
  onPullDownRefresh(){
    this.getRefreshList()
  },
  getMovieList() {
    if(this.data.pending || this.data.pageNum > this.data.pageTotal) return
    this.data.pending = true
    wx.showNavigationBarLoading()
    let getData = app.funcHub.getDoubanData
    getData({
      url: '/v2/movie/' + this.data.type,
      count: this.data.pageSize,
      start: (this.data.pageNum-1) * this.data.pageSize
    }).then(data => {
      if (!this.data.pageData.subjects) {
        this.setData({ pageData: data })
        this.data.pageTotal = Math.ceil(data.total / this.data.pageSize)
      } else {
        let pageData = this.data.pageData
        Array.prototype.push.apply(pageData.subjects, data.subjects)
        this.setData({pageData})
      }
      this.data.pageNum++
      this.data.pending = false
      wx.hideNavigationBarLoading()
    })
  },
  getRefreshList(){
    if(this.data.pending) return
    wx.showNavigationBarLoading()
    this.data.pending = true
    let getData = app.funcHub.getDoubanData
    let refresh = false
    getData({
      url: '/v2/movie/' + this.data.type,
      count: this.data.pageSize
    }).then(data=>{
      let subjects = this.data.pageData.subjects
      let newSubjects = data.subjects
      newSubjects.reverse().forEach(item => {
        if(!subjects.some(e=> e.id === item.id)){
          subjects.unshift(item)
          refresh = true
        }
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      this.data.pending = false
      if(refresh){
        this.setData({pageData:this.data.pageData})
      }else{
        wx.showToast({
          title:'暂无新内容',
          image:'/images/icon/xx.png'
        })
      }
    })
  }
})