// pages/mine/mine.js
let global = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    this.getUserInfo()
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  // 获取个人信息
  getUserInfo: function() {
    let _this = this
    wx.request({
      url: 'http://localhost:5000/api/users/current',
      header: {
        'Authorization': global.globalData.userToken
      },
      success(res) {
        console.log(res)
        _this.setData({
          userInfo: res.data
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  },

  // 注销
  logout: function() {
    wx.showModal({
      title: '退出登录',
      content: '确认退出登录?',
      confirmText: "确认退出",
      cancelText: "取消",
      success(res) {
        if (res.confirm) {
          wx.clearStorageSync()
          wx.redirectTo({
            url: '../login/login',
          })
        } else {
          return
        }
      }
    });
    
  }
})