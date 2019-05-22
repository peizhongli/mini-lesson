let global = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    email: '',
    password: '',
    checkPassword: ''
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
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputEmail: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  inputPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  inputCheckPassword: function (e) {
    this.setData({
      checkPassword: e.detail.value
    })
  },
  toRegi: function () {
    if(this.data.password === this.data.checkPassword) {
      wx.request({
        url: 'http://localhost:5000/api/users/register',
        method: 'POST',
        data: {
          name: this.data.name,
          email: this.data.email,
          password: this.data.password,
          identity: '学生'
        },
        success: function (res) {
          console.log(res)
          if(res.statusCode===200){
            wx.redirectTo({
              url: '/pages/login/login',
            })
          } else {
            wx.showModal({
              content: res.data,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  return
                }
              }
            });
          }
        },
        fail: function (err) {
          console.log(err)
        }
      })
    } else {
      wx.showModal({
        content: '两次输入密码不一致，请确认后重试',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            return
          }
        }
      });
    }
  }
})