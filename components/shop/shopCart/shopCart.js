const app = getApp()
// components/shop/shopCart/shopCart.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 购物车数据
    dataJson: Array,
    // 购物车数量
    allNum: {
      type: Number,
      value: 0
    },
    // 购物车金额
    allMoney: Number,
    // 餐馆信息
    shopInfo: Object
  }, 
  // 数据监听
  observers: {
    'allNum'(newValue) {
      const animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease'
      })
      this.animation = animation
      animation.scale(1.08).step()
      this.setData({
        animationData: animation.export()
      })
      // 解决多次执行
      setTimeout(() => {
        animation.scale(1).step()
        this.setData({
          animationData: animation.export()
        })
      }, 500)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    // 购物车动画
    cartAnimation: {},
    // 开关变量
    isOpen: false,
    // 动画
    animationData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 购物车显示
    cartAnimationShow(){
      const animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'linear'
      })
      animation.opacity(1).bottom(50).step()
      this.setData({
        cartAnimation: animation.export(),
        isOpen: true
      })
    },
    // 购物车隐藏
    cartAnimationHide(){
      const animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'linear'
      })
      animation.opacity(0).bottom(0).step()
      this.setData({
        cartAnimation: animation.export(),
        isOpen: false
      })
    },
    // 购物车当前列表显示
    cartListShow(e) {
      console.log(this.data.isOpen)
      if (!this.data.isOpen) {
        this.cartAnimationShow()
      } else {
        this.cartAnimationHide()
      }
    },
    // 清空购物车
    allClear() {
      console.log('清空购物车')
      this.triggerEvent('allClearData', 'a')
    },
    // 去结算
    goTotal() {
      const user = app.globalData.userInfo
      if (!user) { 
        wx.showToast({
          title: '对不起,您还尚未登录',
          icon: 'none',
          diration: 2000
        })
        wx.navigateTo({
          url: '/pages/login/login'
        })
        return false
      } else {
        const geohash = this.data.shopInfo.latitude + ',' + this.data.shopInfo.longitude
        wx.showLoading({
          title: '下单中'
        })
        app.fetchApi.postCheckout(
          // 店铺id
          this.data.shopInfo.id,
          // 经纬度
          geohash,
          // 购物车数据
          [this.data.dataJson]
        )
        .then(res => {
          wx.hideLoading()
          console.log(res)
          wx.navigateTo({
            url: '/pages/shop/children/confirmOrder/confirmOrder'
          })
          app.globalData.shopCartSuccess = res
          // 暂用
          // wx.setStorageSync('shopSuccess', res)
        })
        .catch(err => {
          wx.hideLoading()
          console.log(err)
        })
      }
    }
  }
})
