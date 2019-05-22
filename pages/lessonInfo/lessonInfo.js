let global = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lessonId: '',
    lessonInfo: {},
    commentInput: '',
    showCommentPop: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      lessonId: options.lessonId
    })
    console.log(global.globalData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getLessonInfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  // 获取课程详情
  getLessonInfo: function() {
    let _this = this
    wx.request({
      url: `http://localhost:5000/api/profiles/${this.data.lessonId}`,
      header: {
        'Authorization': global.globalData.userToken,
        'username': global.globalData.userName
      },
      success(res) {
        console.log(res.data)
        _this.setData({
          lessonInfo: res.data
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  },

  // 点赞
  likeLesson: function(e) {
    let _this = this
    wx.request({
      url: `http://localhost:5000/api/profiles/like/${this.data.lessonId}`,
      method: 'POST',
      data: {
        status: e.target.dataset.status,
      },
      header: {
        'Authorization': global.globalData.userToken,
        'username': global.globalData.userName
      },
      success(res){
        if(res.statusCode===200) {
          let liked = Boolean(`${e.target.dataset.status === 0 ? '' : true}`)
          _this.setData({
            ['lessonInfo.liked']: liked
          })
        }
      }
    })
  },

  // 收藏
  collectLesson: function(e) {
    let _this = this
    wx.request({
      url: `http://localhost:5000/api/profiles/collect/${this.data.lessonId}`,
      method: 'POST',
      data: {
        status: e.target.dataset.status,
      },
      header: {
        'Authorization': global.globalData.userToken,
        'username': global.globalData.userName
      },
      success(res) {
        if (res.statusCode === 200) {
          wx.showToast({
            title: `${e.target.dataset.status === 0 ? '取消收藏' : '已收藏'}`,
            duration: 3000
          })
          let collected = Boolean(`${e.target.dataset.status === 0 ? '' : true}`)
          _this.setData({
            ['lessonInfo.collected']: collected
          })
        }
      }
    })
  },

  // 订阅
  subscribeLesson: function (e) {
    let _this = this
    wx.request({
      url: `http://localhost:5000/api/profiles/subscribe/${this.data.lessonId}`,
      method: 'POST',
      data: {
        status: e.target.dataset.status,
      },
      header: {
        'Authorization': global.globalData.userToken,
        'username': global.globalData.userName
      },
      success(res) {
        if (res.statusCode === 200) {
          wx.showToast({
            title: `${e.target.dataset.status === 0 ? '取消订阅' : '已订阅'}`,
            duration: 3000
          })
          let subscribed = Boolean(`${e.target.dataset.status === 0 ? '' : true}`)
          _this.setData({
            ['lessonInfo.subscribed']: subscribed
          })
        }
      }
    })
  },

  // 评论
  showPop: function(){
    this.setData({
      showCommentPop: true
    })
  },
  closePop: function() {
    this.setData({
      showCommentPop: false
    })
  },
  inputComment: function(e) {
    this.setData({
      commentInput: e.detail.value
    })
  },
  postComment: function(e){
    console.log(`评论：${this.data.commentInput}成功`)
    let _this = this
    wx.request({
      url: `http://localhost:5000/api/profiles/comment/${this.data.lessonId}`,
      method: 'POST',
      data: {
        content: this.data.commentInput,
      },
      header: {
        'Authorization': global.globalData.userToken,
        'username': global.globalData.userName
      },
      success(res) {
        if (res.statusCode === 200) {
          wx.showToast({
            title: `评论成功`,
            duration: 3000
          })
          _this.setData({
            showCommentPop: false
          })
          _this.getLessonInfo()
        }
      }
    })
  }
})