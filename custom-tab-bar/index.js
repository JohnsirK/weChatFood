// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 当前点击的
    selected: null,
    // 字体颜色
    color: '#7d7e80',
    // 选中颜色
    selectedColor: '#3cc51f',
    // 数据数组
    list: [
      {
        // 跳转路径
        pagePath: '/pages/index/index',
        iconPath: 'icon-zhuye1',
        // icon图标
        // iconPath: '/images/xx.png'
        // 选中后的图标
        // selectedIconPath: '/images/xx.png'
        // 文字
        text: '主页'
      },
      {
        pagePath: '/pages/search/search',
        iconPath: 'icon-sousuofangdajing',
        text: '搜索'
      },
      {
        pagePath: '/pages/orders/orders',
        iconPath: 'icon-icon--copy',
        text: '订单'
      },
      {
        pagePath: '/pages/me/me',
        iconPath: 'icon-wode',
        text: '我的'
      }
    ]
  },
  pageLifetimes: {
  	show() {
  		if (typeof this.getTabBar === 'function' &&
  			this.getTabBar()) {
  			this.getTabBar().setData({
  				selected: null
  			})
  		}
  	}
  },
  /**
   * 组件的方法列表
   */
  methods: {
     switchTab(e) {
       const data = e.currentTarget.dataset
       const url = data.path
       wx.switchTab({url})
       this.setData({
         selected: data.index
       })
     }
  }
})
