let app = getApp()
Page({
  data: {
    inTheaters: {
      listTitle: '正在上映',
      type: 'in_theaters'
    },
    comingSoon: {
      listTitle: '即将上映',
      type: 'coming_soon'
    },
    top250: {
      listTitle: 'top250',
      type: 'top250'
    },
    showSearch: false,
    searchData: {}
  },
  onLoad() {
    this.loadSingleData('/v2/movie/in_theaters', this.data.inTheaters, data => this.setData({ inTheaters: data }))
    this.loadSingleData('/v2/movie/coming_soon', this.data.comingSoon, data => this.setData({ comingSoon: data }))
    this.loadSingleData('/v2/movie/top250', this.data.top250, data => this.setData({ top250: data }))
  },
  loadSingleData(url, src, cb) {
    let getData = app.funcHub.getDoubanData
    let time = Date.now()
    let oldData = wx.getStorageSync(url)
    if (oldData && time - oldData.time < getApp().dataHub.movieApiInterval) {
      cb(oldData.dist)
    } else {
      getData({ url }).then(data => {
        let dist = Object.assign(src, data)
        wx.setStorageSync(url, { time, dist })
        cb(dist)
      })
    }
  },
  inputFocus() {
    this.setData({ showSearch: true })
  },
  closeSearch() {
    this.setData({ showSearch: false })
  },
  inputConfirm(event) {
    if (this.data.pending) return
    let value = event.detail.value
    let getData = app.funcHub.getDoubanData
    this.data.pending = true
    wx.showNavigationBarLoading()
    getData({
      url: '/v2/movie/search?q=' + value,
      count: 18
    }).then(data => {
      this.setData({ searchData: data })
      this.data.pending = false
      wx.hideNavigationBarLoading()
    })
  },
  inputBlur(event) {
  }
})