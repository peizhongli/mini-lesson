let global = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lessonList: [],
    hotlist: [],
    pageParams: {
      currentPage: 1,
      pageSize: 10,
      hasNextPage: true
    },
    showLoading: false,
    searchData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getLessonList()
    this.getHotList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.data.pageParams.currentPage = 1
    this.getLessonList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.pageParams.hasNextPage) {
      this.data.pageParams.currentPage++
      this.getLessonList()
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  // 加载课程列表
  getLessonList: function(data) {
    this.setData({
      showLoading: true
    })
    let _this = this
    wx.request({
      url: 'http://localhost:5000/api/profiles/',
      data: {
        currentPage: this.data.pageParams.currentPage,
        pageSize: this.data.pageParams.pageSize,
        title: this.data.searchData
      },
      header: {
        'Authorization': global.globalData.userToken,
      },
      success(res) {
        if (res.statusCode === 401) {
          wx.redirectTo({
            url: '../login/login',
          })
        } else {
          if (res.data.data.length < _this.data.pageParams.pageSize) {
            console.log('没有下一页咯')
            _this.data.pageParams.hasNextPage = false
          }
          _this.setData({
            lessonList: [..._this.data.lessonList, ...res.data.data]
          })
        }
      },
      fail(err) {
        console.log(err)
      },
      complete() {
        _this.setData({
          showLoading: false
        })
      }
    })
  },

  // 加载热门列表
  getHotList: function (data) {
    let _this = this
    wx.request({
      url: 'http://localhost:5000/api/profiles/hot',
      header: {
        'Authorization': global.globalData.userToken,
      },
      success(res) {
        if (res.statusCode === 401) {
          wx.redirectTo({
            url: '../login/login',
          })
        } else {
          _this.setData({
            hotlist: res.data.data
          })
        }
      }
    })
  },

  // 搜索
  inputSearchData: function(e) {
    this.setData({
      searchData: e.detail.value
    })
  },
  searchLesson: function() {
    this.data.pageParams.hasNextPage = true
    this.data.pageParams.currentPage = 1
    this.setData({
      lessonList: []
    })
    this.getLessonList()
  }
})