// pages/collections/collections.js
let global = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lessonList: [],
    pageParams: {
      currentPage: 1,
      pageSize: 10,
      hasNextPage: true
    },
    showLoading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.getCollections()
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
    this.data.pageParams.currentPage = 1
    this.getCollections()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.pageParams.hasNextPage) {
      this.data.pageParams.currentPage++
      this.getCollections()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 获取收藏列表
  getCollections: function(){
    let _this = this
    wx.request({
      url: 'http://localhost:5000/api/profiles/',
      data: {
        currentPage: this.data.pageParams.currentPage,
        pageSize: this.data.pageParams.pageSize,
        collections: global.globalData.userName
      },
      header: {
        'Authorization': global.globalData.userToken
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
  }
})