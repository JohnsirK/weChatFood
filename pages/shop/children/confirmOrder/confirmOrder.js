const app = getApp()
// pages/confirmOrder/confirmOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户数据
    user: {},
    // 加入购物车成功数据
    shopSuccess: {},
    imgUrl:'https://elm.cangdu.org/img/',
    // 菜单总价
    allPrice: null,
    // 支付方式显示
    paySelect: false,
    // 支付方式数组
    payList: [
      '微信支付',
      '支付宝支付',
      '现金支付',
      '其他方式支付'
    ],
    payIndex: 0,
    // 默认的支付方式
    payName: '微信支付',
    // 订单备注遮罩
    remakeIsShow: false,
    // 订单备注数据
    remakeItems: [],
    inputText: '',
    remarkText: '',
    // 选中的
    remakeSelected: [],
    // 收货地址
    getAddressesList: [],
    // 收货地址遮罩
    addressShow: false,
    // 新增
    newAdrShow: false,
    zindex: '-1',
    // 收货人名字
    addressUser: '',
    // 备注电话
    addressPhonebk: '',
    // 收货人电话
    addressPhone: '',
    // 收货人详细地址
    addressInfo: '',
    // 收货人自输入标签
    addressTags: '',
    // 性别
    sexList: [
       {
         value: 1,
         name: '男'
       },
       {
         value: 2,
         name: '女'
       }
    ],
    tagList: [
      {
        value: 2,
        name: '家'
      },
      {
        value: 3,
        name: '学校'
      },
      {
        value: 4,
        name: '公司'
      }
    ],
    // 选择性别
    addressSex: null,
    // 选择标签
    addressEndTags: null,
    // 选择地址
    region: ["北京市", "北京市", "东城区"],
    regionStr: '', 
    // 当前选中收货地址
    pickAddressInfo: {},
    isOk: false,
  },
  // 关闭新增
  closeNewAdd() {
    this.setData({
      zindex: '-1',
      newAdrShow: false
    })
  },
  // 确定新增收货地址
  addBtn() {
    if(!this.data.user.user_id) {
      wx.showToast({
        title: '您尚未登录, 请登录',
        icon: 'none',
        duration: 2000,
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }, 2000)
      return false
    } else if (!this.data.addressUser) {
      wx.hideToast()
      wx.showToast({
        title: '请输入收货人姓名',
        icon: 'none',
        duration: 2000,
      })
    } else if(!this.data.addressSex) {
      wx.hideToast()
      wx.showToast({
        title: '请选择收货人性别',
        icon: 'none',
        duration: 2000,
      })
    } else if (!this.data.addressPhone) {
      wx.hideToast()
      wx.showToast({
        title: '请输入收货人电话',
        icon: 'none',
        duration: 2000,
      })
    } else if (!this.data.addressPhonebk) {
      wx.hideToast()
      wx.showToast({
        title: '请输入收货人固定电话',
        icon: 'none',
        duration: 2000,
      })
    } else if (!this.data.regionStr) {
      wx.hideToast()
      wx.showToast({
        title: '请选择收货人地址',
        icon: 'none',
        duration: 2000,
      })
    } else if(!this.data.addressInfo) {
      wx.hideToast()
      wx.showToast({
        title: '请输入收货人详细地址',
        icon: 'none',
        duration: 2000,
      })
    } else if(!this.data.addressTags) {
      wx.hideToast()
      wx.showToast({
        title: '请输入收货人标签',
        icon: 'none',
        duration: 2000,
      })
    } else if(!this.data.addressEndTags) {
      wx.hideToast()
      wx.showToast({
        title: '请选择收货人标签类型',
        icon: 'none',
        duration: 2000,
      })
    } else {
      wx.hideToast()
      wx.showLoading({
        title: '添加中, 请稍候',
      })
      app.fetchApi.postAddresses(
        // 用户id
        this.data.user.user_id,
        // 地址选择
        this.data.regionStr,
        // 详细地址
        this.data.addressInfo,
        // 经纬度 静态, 因为目前没有接口
        '113.76077, 34.73822',
        // 姓名
        this.data.addressUser,
        // 电话
        this.data.addressPhone,
        // 标签
        this.data.addressTags,
        // 性别
        this.data.addressSex,
        // 备注电话
        this.data.addressPhonebk,
        // 标签类型
        this.data.addressEndTags
      )
      .then(res => {
        wx.hideLoading()
        if(res.status) {
          wx.showToast({
            title: '恭喜您,添加地址成功',
            icon: 'success',
            duration: 2000
          })
          this.closeNewAdd()
          this.getAddressData()
        } else {
          wx.showToast({
            title: '对不起,添加失败,请稍候再试',
            icon: 'none',
            duration: 2000
          })
        }
        console.log(res)
      })
      .catch(err => {
        wx.hideLoading()
        wx.showToast({
          title: '对不起,添加失败,请稍候再试',
          icon: 'none',
          duration: 2000
        })
        console.log(err)
      })
    }
  },
  // 双向绑定用户名
  enterName(e) {
    this.setData({
      addressUser: e.detail.value
    })
  },
  enterPhone(e) {
    this.setData({
      addressPhone: e.detail.value
    })
  },
  enterPhoneTwo(e) {
    this.setData({
      addressPhonebk: e.detail.value
    })
  },
  enterAddressInfo(e) {
    this.setData({
      addressInfo: e.detail.value
    })
  },
  enterTags(e) {
    this.setData({
      addressTags: e.detail.value
    })
  },
  // 选择性别
  sexRadio(e) {
    this.setData({
      addressSex: e.detail.value
    })
    console.log(this.data.addressSex)
  },
  tagsRadio(e) {
    this.setData({
      addressEndTags: e.detail.value
    })
  },
  // 选择地址
  pickRegion(e) {
    this.setData({
      region: e.detail.value,
      regionStr: e.detail.value.join(',')
    })
  },
  // 新增地址
  newAddress() {
    this.setData({
      zindex: 4,
      newAdrShow: true
    })
  },
  // 新增关闭
  newAdrHide() {
    this.setData({
      newAdrShow: false
    })
  },
  // 收货地址获取
  getAddressData() {
    app.fetchApi.getAddresses(this.data.user.user_id)
    .then(res => {
      this.setData({
        getAddressesList: res
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 地址选择
  changeAddress() {
    this.setData({
      addressShow: true
    })
  },
  // 隐藏收货地址选择
  addressHide() {
    this.setData({
      addressShow: false
    })
  },
  // 支付方式
  changePay() {
    this.setData({
      paySelect: true
    })
  },
  // 点击遮罩关闭支付方式
  onClickHide() {
    this.setData({
      paySelect: false
    })
  },
  // 选择支付方式
  selectIndex(e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      payIndex: e.currentTarget.dataset.index,
      payName: e.currentTarget.dataset.item,
      paySelect: false
    })
  },
  // 订单备注选择
  showRemake() {
    this.setData({
      remakeIsShow: true
    })
  },
  // 订单备注多选
  remakeSelect(e) {
    console.log(e.detail.value)
    this.setData({
      remakeSelected: e.detail.value 
    })
  },
  // 遮罩关闭订单备注选择
  hideRemake() {
    this.setData({
      remakeIsShow: false
    })
  },
  selectOk() {
    if (!this.data.inputText) {
      const str = this.data.remakeSelected.join(',')
      this.setData({
        remarkText: str
      })
      console.log(str) 
    } else {
      this.setData({
        remarkText: this.data.inputText
      })
    }
    this.setData({
      remakeIsShow: false
    })
  },
  // 双向绑定快速备注input
  remakeInput(e) {
    console.log(e.detail.value)
    this.setData({
      inputText: e.detail.value
    })
  },
  // 获取备注
  remarksData() {
    app.fetchApi.getRemarks(this.data.shopSuccess.id)
    .then(res => {
      if (res) {
        let arr = []
        for (let v of res.remarks){
          arr = arr.concat(v)
        }
        this.setData({
          remakeItems: arr
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 修改收货地址
  changeAddressFunc(data) {
    console.log(data)
    this.setData({
      pickAddressInfo: data
    })
    console.log(this.data.pickAddressInfo)
  },
  // 确定替换当前默认收货地址
  confirmChange(e) {
    const that = this
    const data = e.currentTarget.dataset.item
    wx.showModal({
      content: '是否选择该地址为收货地址?',
      success(res) {
        if(res.confirm) {
          that.changeAddressFunc(data)
          that.addressHide()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  postOrdersData(
    user_id,
    cart_id,
    address_id,
    restaurant_id,
    geohash,
    description,
    entities
  ) {
    wx.showLoading({
      title: '正在下单中.请稍候'
    })
    app.fetchApi.postOrders(
      user_id,
      cart_id,
      address_id,
      restaurant_id,
      geohash,
      description,
      entities
    )
    .then(res => {
      if (res.status) {
        wx.hideLoading()
        wx.showToast({
          title: res.success,
          icon: 'none',
          duration: 2000,
        })
      }
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/orders/orders'
        })
      }, 1000)
      console.log(res)
    })
    .catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '下单失败,请稍候再试',
        icon: 'none',
        duration: 2000,
      })
      console.log(err)
    })
  },
  // 确认下单
  endOrder() {
    if (!this.data.user && !this.data.user.id) {
      wx.showToast({
        title: '您还未登录,请登录',
        icon: 'none',
        duration: 2000,
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }, 2000)
    }
    else if (!this.data.pickAddressInfo.id) {
      wx.hideToast()
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none',
        duration: 2000,
      })
    } else {
      this.postOrdersData(
        // 用户id
        this.data.user.id,
        // 购物车id
        this.data.shopSuccess.id,
        // 地址id
        this.data.pickAddressInfo.id,
        // 店铺id
        this.data.shopSuccess.cart.restaurant_id,
        // 经纬度
        this.data.pickAddressInfo.st_geohash,
        // 备注数据
        this.data.remarkText,
        // 购物车数据
        this.data.shopSuccess.cart.groups
      )
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.shopCartSuccess)
    this.setData({
      user: app.globalData.userInfo,
      shopSuccess: app.globalData.shopCartSuccess
    })
    let num = null 
    this.data.shopSuccess.cart.groups[0].forEach(item => {
      num += item.price * item.quantity
    })
    this.setData({
      allPrice: num
    })
    this.remarksData()
    this.getAddressData()
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