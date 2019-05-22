// pages/userInfo/userInfo.js
let global = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    newName: '',
    newEmail: '',
    newAvatar: '',
    userInput: '',
    showInputPop: false,
    inputType: '',
    showCanvas: false
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
    this.getUserInfo()
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

  getUserInfo: function () {
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
  showPop: function (e) {
    this.setData({
      showInputPop: true,
    })
    if (e.currentTarget.dataset.value){
      this.setData({
        userInput: e.currentTarget.dataset.value
      })
    }
    if (e.currentTarget.dataset.type=='name'){
      this.setData({
        inputType: 'name'
      }) 
    } else if(e.currentTarget.dataset.type=='email') {
      this.setData({
        inputType: 'email'
      })
    }
  },
  closePop: function () {
    this.setData({
      showInputPop: false
    })
  },
  confirmInput: function() {
    if(this.data.inputType=='name') {
      this.setData({
        ['userInfo.name']: this.data.newName
      })
    } else {
      this.setData({
        ['userInfo.email']: this.data.newEmail
      })
    }
    this.closePop()
  },
  inputUser: function (e) {
    if(this.data.inputType=='name'){
      this.setData({
        newName: e.detail.value
      })
    } else {
      this.setData({
        newEmail: e.detail.value
      })
    }
  },
  saveUserInfo: function (e) {
    let _this = this
    wx.request({
      url: `http://localhost:5000/api/users/update/${this.data.userInfo.id}`,
      method: 'PUT',
      data: {
        name: this.data.userInfo.name,
        email: this.data.userInfo.email,
        avatar: this.data.userInfo.avatar
      },
      header: {
        'Authorization': global.globalData.userToken,
      },
      success(res) {
        wx.showToast({
          title: `更新成功`,
          duration: 3000
        })
      }
    })
  },
  chooseAvatar: function(){
    let _this = this
    this.setData({
      showCanvas: true
    })
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        let imgWidth,imgHeight,cutX,cutY,cutWidth,cutHeight;
        wx.getImageInfo({
          src: tempFilePaths[0],
          success(res) {
            imgWidth = res.width
            imgHeight = res.height
            if (imgWidth > imgHeight) {
              cutWidth = imgHeight
              cutHeight = imgHeight
              cutX = (imgWidth - imgHeight) / 2
              cutY = 0
            } else {
              cutWidth = imgWidth
              cutHeight = imgWidth
              cutX = 0
              cutY = (imgHeight - imgWidth) / 2
            }
            const ctx = wx.createCanvasContext('myCanvas')
            ctx.drawImage(tempFilePaths[0], cutX, cutY, cutWidth, cutHeight, 0, 0, 200, 200)
            ctx.draw(false, () => {
              wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 200,
                height: 200,
                destWidth: 200,
                destHeight: 200,
                canvasId: 'myCanvas',
                success(res) {
                  _this.setData({
                    newAvatar: res.tempFilePath,
                  })
                }
              })
            })
          }
        })
      }
    })
  },
  showHugeAvatar: function() {
    wx.previewImage({
      current: this.data.userInfo.avatar, // 当前显示图片的http链接
      urls: [this.data.userInfo.avatar] // 需要预览的图片http链接列表
    })
  },
  updateAvatar: function() {
    let _this = this
    wx.uploadFile({
      url: `http://localhost:5000/api/users/uploadAvatar/${this.data.userInfo.id}`,
      method: 'POST',
      name: 'avatar',
      filePath: this.data.newAvatar,
      header: {
        'Authorization': global.globalData.userToken,
      },
      success(res) {
        _this.closeCanvas()
        _this.getUserInfo()
      }
    })
  },
  closeCanvas: function() {
    this.setData({
      showCanvas: false
    })
  }
})