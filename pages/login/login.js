let global = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: '',
    password: ''
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

  // 登录
  inputEmail: function(e) {
    this.setData({
      email: e.detail.value
    })
  },
  inputPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  toLogin: function(){
    wx.request({
      url: 'http://localhost:5000/api/users/login',
      method: 'POST',
      data: {
        email: this.data.email,
        password: this.data.password,
      },
      success: function(res) {
        if(res.data.success) {
          global.globalData.userToken = res.data.token
          global.globalData.userName = res.data.name
          wx.setStorageSync('USERTOKEN', res.data.token)
          wx.setStorageSync('USERNAME', res.data.name)
          wx.switchTab({
            url: '../home/home',
          })
        } else if(res.statusCode===400) {
          wx.showModal({
            content: '密码错误，请检查密码重试',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                return
              }
            }
          });
        }
      },
      fail: function(err) {
        console.log(err)
      }
    })
  }
})