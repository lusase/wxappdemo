App({
  dataHub: {
    doubanBaseUrl: 'https://api.douban.com',
    movieApiInterval: 3600000
  },
  funcHub: {
    getDoubanData({url, count = 3, start = 0}) {
      return new Promise((resolve, reject) => {
        wx.request({
          url: getApp().dataHub.doubanBaseUrl + url,
          method: 'GET',
          data: { count, start},
          header: {
            'Content-Type': 'text/plain'
          },
          success(res) {
            resolve(res.data)
          },
          fail(res) {
            reject(res)
          }
        })
      })
    },
    getDoubanMovie(id){
      if(!id) return
      return new Promise((resolve,reject) => {
        wx.request({
          url: getApp().dataHub.doubanBaseUrl + '/v2/movie/subject/' + id,
          method: 'GET',
          header: {
            'Content-Type': 'text/plain'
          },
          success(res){
            resolve(res.data)
          },
          fail(res){
            reject(res)
          }
        })
      })
    }
  }
})