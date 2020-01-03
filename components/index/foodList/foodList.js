// components/index/foodList/foodList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataJson: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 图片路径
    imgUrl: 'http://cangdu.org:8001/img/',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转到商铺页面
    toShop(e) {
      wx.navigateTo({
        url: `/pages/shop/shop?id=${e.currentTarget.dataset.item.id}`
      })
    }
  }
})
