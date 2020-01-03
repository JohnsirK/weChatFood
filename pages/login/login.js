// 引入getApp实例
const app = getApp()
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 点击第几个
    indexAni: 0,
    // 动画
    animationData: {},
    // 用户信息
    // 用户名
    name: '',
    // 密码
    pwd: '',
    // 验证码
    code: '',
    // 验证码
    captchaData: '',
  },
  // 事件处理
  // 触发焦点
  focusHandler(e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      indexAni: e.currentTarget.dataset.index
    })
  },
  // 焦点消失
  focusCencel() {
    this.setData({
      indexAni: 0
    })
  },
  // 双向绑定用户名
  saveName(e) {
    this.setData({
      name: e.detail.value 
    })
    console.log(this.data.name)
  },
  // 双向绑定密码
  savePwd(e) {
    this.setData({
      pwd: e.detail.value 
    })
    console.log(this.data.pwd)
  },
  // 双向绑定验证码
  saveCode(e) {
    this.setData({
      code: e.detail.value 
    })
    console.log(this.data.code)
  },
  // 登录
  goLogin() {
    this.getLoginData(
      // 用户名
      this.data.name,
      // 密码
      this.data.pwd,
      // 验证码
      this.data.code
    )
  },
  // 重新获取验证码
  changeCode() {
    this.postCaptchasData()
  },
  // 获取验证码
  postCaptchasData() {
    app.fetchApi.postCaptchas()
    .then(res => {
      console.log(res)
      if (res.status) {
        console.log(res.code === this.data.captchaData)
        this.setData({
          captchaData: res.code
        })
      } else {
        wx.showToast({
          title: '验证码获取失败,请重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      wx.showToast({
        title: '验证码获取失败,请重试',
        icon: 'none',
        duration: 2000
      })
      console.log(err)
    })
  },
  // 获取登录数据
  getLoginData(name, pwd, code) {
    if (!name) {
      wx.hideToast()
      wx.showToast({
        title: '用户名不能为空',
        duration: 2000,
        icon: 'none'
      })
      return
    } else if(!pwd){
      wx.hideToast()
      wx.showToast({
        title: '密码不能为空',
        duration: 2000,
        icon: 'none'
      })
    } else if(!code) {
      wx.hideToast()
      wx.showToast({
        title: '验证码不能为空',
        duration: 2000,
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '登录中'
      })
      app.fetchApi.postLogin(name, pwd, code)
      .then(res => {
        wx.hideLoading()
        console.log(res)
        if(res && !res.id) {
          wx.showToast({
            title: res.message,
            duration: 2000,
            icon: 'none'
          })
          this.postCaptchasData()
        } else {
          wx.hideToast()
          wx.showToast({
            title: res.username + ', 欢迎您!',
            duration: 2000,
            icon: 'none'
          })
          app.globalData.userInfo = res
          wx.setStorageSync('userInfo', res)
          wx.navigateBack()
        }
      })
      .catch(err => {
        this.postCaptchasData()
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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