const app = getApp()
// pages/me/children/explain/explain.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 服务中心数据
    explainData: [],
    // 标题
    dataTitle: [],
    // 内容
    dataInfo: [],
    // 弹窗
    isShow: false
  },
  // 弹窗打开
  onShowDialog(e) {
    console.log(e.currentTarget.dataset.index)
    const text = this.data.dataInfo[e.currentTarget.dataset.index]
    this.setData({
      isShow: true,
      textDetail: text
    })
  },
  onCloseDialog() {
    this.setData({
      isShow: false
    })
  },
  noop() {},
  // 加载服务中心数据
  getExplainData() {
    app.fetchApi.getExplain()
    .then(res => {
      Object.keys(res).forEach(item => {
        let rep = false
        this.data.dataTitle.forEach(i => {
          if (i == res[item]) {
            rep = true
          }
        })
        if(item.indexOf('Caption') !== -1 && !rep) {
          this.data.dataTitle.push(res[item])
        } else if(!rep) {
          this.data.dataInfo.push(res[item])
        }
      })
      this.setData({
        dataTitle: this.data.dataTitle,
        dataInfo: this.data.dataInfo
      })
    })
    .catch(err => {
      console.log(err)
    })
    console.log(this.data.dataTitle)
    console.log(this.data.dataInfo)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExplainData()
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