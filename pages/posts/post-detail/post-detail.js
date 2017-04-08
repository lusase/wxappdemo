let list = require('../../../data/post-data').postList.list;
Page({
    data: {
        playing:false
    },
    onLoad(option) {
        let self = this
        this.setData({ id: option.id })
        let data = list[option.id]
        this.setData(data)
        let collections = wx.getStorageSync('collections')
        if (collections[this.data.id]) {
            this.setData({ collected: true })
        } else {
            this.setData({ collected: false })
        }
         wx.getBackgroundAudioPlayerState({
          success: function(res){
            self.setData({playing:res.status===1 && res.dataUrl===self.data.music.url})
          }
        })
        wx.onBackgroundAudioPlay(function() {
            self.setData({playing:true})
        })
        wx.onBackgroundAudioPause(function() {
            self.setData({playing:false})
        })
        wx.onBackgroundAudioStop(function() {
            self.setData({playing:false})
        })
    },
    collection() {
        let collections = wx.getStorageSync('collections')
        if (!collections) {
            collections = {}
        }
        if (collections[this.data.id]) {
            delete collections[this.data.id]
            this.setData({ collected: false })

        } else {
            collections[this.data.id] = 1
            this.setData({ collected: true })

        }
        wx.showToast({
            title: this.data.collected ? '收藏成功 !' : '取消收藏',
            mask: true
        })
        wx.setStorageSync('collections', collections)

    },
    share() {
        wx.showActionSheet({
            itemList: ['分享到朋友圈', '分享到QQ空间', '分享到微博'],
            itemColor: '#405f80'
        })
    },
    playMusic() {
        let self = this
        let music = this.data.music
        let playing 
        if (this.data.playing) {
            wx.pauseBackgroundAudio()
            playing = false
            
        } else {
            wx.playBackgroundAudio({
                dataUrl: music.url,
                title: music.title,
                coverImgUrl: music.coverImg
            })
            playing = true
        }
        this.setData({playing})
    }
})