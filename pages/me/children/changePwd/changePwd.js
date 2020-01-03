const app = getApp()
// pages/me/children/changePwd/changePwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 老密码
    oldPwdData: '',
    // 新密码
    newPwdData: '',
    // 确认密码
    againPwdData: '',
    // 验证码
    captYzm: '',
    captText: ''
  },
  // 输入的原密码
  oldpwd (e) {
    console.log(e.detail.value)
    this.setData({
      oldPwdData: e.detail.value
    })
  },
  // 输入的新密码
  newpwd (e) {
    console.log(e.detail.value)
    this.setData({
      newPwdData: e.detail.value
    })
  },
  // 确认密码
  againpwd (e) {
    console.log(e.detail.value)
    this.setData({
      againPwdData: e.detail.value
    })
  },
  captcha (e) {
    this.setData({
      captText: e.detail.value
    })
  },
  // 验证码接口
  postCaptchasData () {
    app.fetchApi.postCaptchas()
    .then(res => {
      this.setData({
        captYzm: res.code
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 修改密码接口
  postChangePasswordData (
    // 用户名
    username,
    // 旧密码
    oldpassWord,
    // 新密码
    newpassword,
    // 确认密码
    confirmpassword,
    // 验证码
    captcha_code
  ) {
    wx.showLoading({
      title: '修改中'
    })
    app.fetchApi.postChangePassword(
      // 用户名
      username,
      // 旧密码
      oldpassWord,
      // 新密码
      newpassword,
      // 确认密码
      confirmpassword,
      // 验证码
      captcha_code
    )
    .then(res => {
      console.log(res)
      wx.hideLoading()
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 修改密码
  handlerChange () {
    console.log(app.globalData.userInfo.username)
    if (!this.data.oldPwdData) {
      wx.showToast({
        title: '原密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else if (!this.data.newPwdData) {
      wx.hideToast()
      wx.showToast({
        title: '新密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.newPwdData !== this.data.againPwdData) {
      wx.hideToast()
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 2000
      })
    } else if (!this.data.captText) {
      wx.hideToast()
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.hideToast()
      this.postChangePasswordData(
        app.globalData.userInfo.username,
        this.data.oldpassWord,
        this.data.newPwdData,
        this.data.againPwdData,
        this.data.captText
      )
    }
    // ...
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!app.globalData.userInfo || !app.globalData.userInfo.id) {
      wx.showToast({
        title: '尚未登录',
        icon: 'none',
        duration: 2000
      }),
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
    this.postCaptchasData()
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

  }
})