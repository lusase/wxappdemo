Page({
  data:{
    rating:{}
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    getApp().funcHub.getDoubanMovie(options.id).then(data=>{
      if(data.casts){
        data.castsNames = data.casts.map(e => e.name).join(' / ')        
      }
      if(data.directors){
        data.directorsNames = data.directors.map(e => e.name).join(' / ')
      }
      if(data.countries){
        data.countriesNames = data.countries.join(' ')
      }
      if(data.genres){
        data.genresNames = data.genres.join('、')
      }
      this.setData(data)
    })
  },
  showImg(event) {
    wx.previewImage({
      urls: [event.target.dataset.img]
    })
  }
})