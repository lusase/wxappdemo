Page({
    onLoad() {
        let self = this
        wx.login({
          success(res){
            wx.getUserInfo({
              success(res){
                let userInfo = res.userInfo
                self.setData({
                    avatar:userInfo.avatarUrl,
                    nickname:userInfo.nickName
                })
              }
            })
          }
        })
    },
    gotoList () {
        wx.switchTab({
          url: '../posts/post'
        })
    }
})
