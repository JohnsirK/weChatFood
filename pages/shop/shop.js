// 获取小程序页面实例
const app = getApp()
const util = require('./../../utils/util.js')
// pages/shop/shop.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 遮罩
    maskIsShow: true,
    // 店铺id
    shopId: null,
    // 图片地址
    imgUrl:'https://elm.cangdu.org/img/',
    // 店铺信息
    shopDetail: {},
    // 店铺菜单信息
    shopMenu: [],
    // 评价分数
    ratingScoresData:{},
    // 评价分类
    ratingTagsData:[],
    // 评价信息列表
    getRatingsListData:[],
    // 左侧滚动位置
    // 左侧index
    leftIndex: 0,
    // 左侧高度
    leftHeight: 0,
    // 左侧顶部距离
    leftTop: 0,
    // 点击左侧滚动右侧
    rightCurrent: '',
    // 右侧内容栏
    rightFood: [],
    // 规格显示隐藏
    isSpec: 0,
    // 动画
    animationData: {},
    // 选择的规格
    selectid: '',
    // 右侧所有栏目高度
    rightHeightArr: 0,
    // 是否第一次加载
    oneShow: true,
    zindex: 0,
    // 添加显示
    priceIsShow: false,
    // 菜品id
    itemId: [],
    // 购物车数据
    buyShopData: [],
    // 购物车数量
    shopNum: 0,
    // 购物车总金额
    shopMoney: 0,
    //
    cidx: 0
  },
  titleClick(e) {
    this.setData({
      cidx: e.currentTarget.dataset.idx
    })
  },
  // 事件处理函数
  // 增加数量
  isAdd(e){
    // this.setData({
    //   priceIsShow: true
    // })
    if (this.data.buyShopData.length < 1) {
      this.data.buyShopData.push({
        // 添加到购物车需要的数据
        'attrs': e.currentTarget.dataset.item.attrs,
        'extra': {},
        // 食品id
        'id': e.currentTarget.dataset.item.item_id,
        // 菜品名称
        'name': e.currentTarget.dataset.item.name,
        // 打包费
        'packing_fee': e.currentTarget.dataset.item.specfoods[0].packing_fee,
        // 价格
        'price': e.currentTarget.dataset.item.specfoods[0].price,
        // 数量
        'quantity': 1,
        // 规格id
        'sku_id': e.currentTarget.dataset.item.specfoods[0].sku_id,
        // 规格
        'specs': e.currentTarget.dataset.item.specfoods[0].specs,
        // 存量
        'stock': e.currentTarget.dataset.item.specfoods[0].stock,
      })
      
    } else {
      // 定义一个开关变量值为true.
      // 防止重复添加问题
      let isAdd = true
      this.data.buyShopData.forEach(li => {
        if(e.currentTarget.dataset.item.item_id === li.item_id || e.currentTarget.dataset.item.item_id === li.id) {
          // 如果符合,说明当前点击的菜品购物车里有.那么就数量+1
          li.quantity += 1
          isAdd = false
        }
      })
      if (isAdd) {
        this.data.buyShopData.push({
          // item: e.currentTarget.dataset.item,
          // num: 1
          // 添加到购物车需要的数据
          'attrs': e.currentTarget.dataset.item.attrs,
          'extra': {},
          // 食品id
          'id': e.currentTarget.dataset.item.item_id,
          // 菜品名称
          'name': e.currentTarget.dataset.item.name,
          // 打包费
          'packing_fee': e.currentTarget.dataset.item.specfoods[0].packing_fee,
          // 价格
          'price': e.currentTarget.dataset.item.specfoods[0].price,
          // 数量
          'quantity': 1,
          // 规格id
          'sku_id': e.currentTarget.dataset.item.specfoods[0].sku_id,
          // 规格
          'specs': e.currentTarget.dataset.item.specfoods[0].specs,
          // 存量
          'stock': e.currentTarget.dataset.item.specfoods[0].stock,
        })
      }
    }
    let num = 0
    let money = 0
    // 当前所点击的商品添加到购物车
    this.data.buyShopData.forEach(item => {
      num += item.quantity
      money += item.price * item.quantity
    })
    this.setData({
      buyShopData: this.data.buyShopData,
      shopNum: num,
      shopMoney: money
    })
    // 左侧对应.
    // 思路
    // 循环菜单栏目数据列表
    // 每循环一个栏目的菜品创建一个该栏目下总选择菜品的数量变量myNum
    // 然后循环菜单栏目列表里的各个数据
    // 每循环一个该栏目下菜品数据之时创建一个开关变量isAdd.用来记录保存状态.
    // 判断购物车里面是否有当前的菜品
    // 如果有菜品的话那么给当前菜品添加一个字段叫myNum用来区分当前点了几份
    // 同时将该菜品下的quantity数量累加给一个该栏目下的总菜品变量.
    // 同时将状态调整为false.
    // 循环每个菜品的时候判断当前isAdd状态是否为true.如果为true就说明当前菜品购物车里面没有.则需要给当前菜品新增属性myNum同时赋值为0.
    // 同时将该栏目菜单变量赋值给栏目myNum属性.用来表示该栏目下一共点了多少餐品
    this.data.shopMenu.map(item => {
      // 创建本栏目总菜品数量变量
      let myNum = 0
      // 循环该栏目下所有菜品
      item.foods.map(i => {
        // 创建该菜品状态变量
        let isAdd = true
        // 循环当前购物车菜品
        this.data.buyShopData.map(buy => {
          // 判断当前循环到的购物车id是否与当前菜品id相同.
          if (i.item_id == buy.id) {
            // 相同的话就将购物车里面的数量quantity赋值给当前菜品的属性myNum
            i.myNum = buy.quantity
            // 同时将该菜品的数量和本栏目下总菜品数量累加.
            myNum += buy.quantity
            // 相同id状态等于false
            isAdd = false
          }
        })
        // 如果该菜品状态为true说明是购物车里面没有该菜品.
        if (isAdd) {
          i.myNum = 0
        }
      })
      // 将本栏目下的所有已选择的菜品数量赋值给本栏目的myNum属性
      item.myNum = myNum
    })
    this.setData({
      shopMenu: this.data.shopMenu
    })
    // 将当前的购物车数据添加到Storage里去
    const d = wx.getStorageSync('shopData')
    wx.setStorageSync('shopData',{
      ...d,
      [this.data.shopId]: this.data.buyShopData
    })
    this.cenCencel()
  },
  // 减少数量
  isJian(i) {
    // 思路
    // 循环当前购物车数据
    // 如果当前点击的菜品购物车里面有
    // 就判断当前该菜品的数量是否为1.如果为1的话就删除当前菜品.如果不为1的话就数量-1
    const nd = i.currentTarget.dataset.item
    console.log(nd)
    console.log(this.data.buyShopData)
    // 思路.判断购物车里面
    this.data.buyShopData.map((item, index) => {
      if (item.id === nd.item_id || item.id === nd.id) {
        item.quantity === 1 ? this.data.buyShopData.splice(index, 1) : (item.quantity = item.quantity - 1)
      }
    })
    let num = 0
    let money = 0
    // 当前所点击的商品添加到购物车
    this.data.buyShopData.forEach(item => {
      num += item.quantity
      money += item.price * item.quantity
    })
    this.setData({
      buyShopData: this.data.buyShopData,
      shopNum: num,
      shopMoney: money
    })
    this.data.shopMenu.map(item => {
      // 创建本栏目总菜品数量变量
      let myNum = 0
      // 循环该栏目下所有菜品
      item.foods.map(i => {
        // 创建该菜品状态变量
        let isAdd = true
        // 循环当前购物车菜品
        this.data.buyShopData.map(buy => {
          // 判断当前循环到的购物车id是否与当前菜品id相同.
          if (i.item_id == buy.id) {
            // 相同的话就将购物车里面的数量quantity赋值给当前菜品的属性myNum
            i.myNum = buy.quantity
            // 同时将该菜品的数量和本栏目下总菜品数量累加.
            myNum += buy.quantity
            // 相同id状态等于false
            isAdd = false
          }
        })
        // 如果该菜品状态为true说明是购物车里面没有该菜品.
        if (isAdd) {
          i.myNum = 0
        }
      })
      // 将本栏目下的所有已选择的菜品数量赋值给本栏目的myNum属性
      item.myNum = myNum
    })
    this.setData({
      shopMenu: this.data.shopMenu
    })
    wx.setStorageSync('shopData', {
      [this.data.shopId]: this.data.buyShopData
    })
  },
  // 获取店铺常规信息数据
  getShopRestaurantData(id) {
    app.fetchApi.getShopRestaurant(id)
    .then(res => {
      if (res) {
        this.setData({
          shopDetail: res
        })
        // 获取评价分数
        this.getRatingScoresData(this.data.shopDetail.id)
        // 获取评价分类
        this.getRatingTagsData(this.data.shopDetail.id)
        // 获取评价信息列表数据
        this.getRatingsData(this.data.shopDetail.id)
        // console.log(this.data.shopDetail)
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 获取店铺食品列表
  getMenuListData(id) {
    wx.showLoading({
      title: '数据加载中'
    })
    app.fetchApi.getMenuList(id)
    .then(res => {
      if (res) {
        res = res.slice(0, 20)
        res.forEach(item => {
          item.id = 'c' + item.id
          if(item.foods && item.foods.length > 5) {
            item.foods = item.foods.slice(0, 5)
          }
        })
        // 判断res是否获取到值.
        if (res) {
          this.setData({
            shopMenu: res,
            maskIsShow: false
          })
          if(this.data.shopMenu.length > 1) {
            this.data.shopMenu.map(item => {
              // 创建本栏目总菜品数量变量
              let myNum = 0
              // 循环该栏目下所有菜品
              item.foods.map(i => {
                // 创建该菜品状态变量
                let isAdd = true
                // 循环当前购物车菜品
                this.data.buyShopData.map(buy => {
                  // 判断当前循环到的购物车id是否与当前菜品id相同.
                  if (i.item_id == buy.id) {
                    // 相同的话就将购物车里面的数量quantity赋值给当前菜品的属性myNum
                    i.myNum = buy.quantity
                    // 同时将该菜品的数量和本栏目下总菜品数量累加.
                    myNum += buy.quantity
                    // 相同id状态等于false
                    isAdd = false
                  }
                })
                // 如果该菜品状态为true说明是购物车里面没有该菜品.
                if (isAdd) {
                  i.myNum = 0
                }
              })
              // 将本栏目下的所有已选择的菜品数量赋值给本栏目的myNum属性
              item.myNum = myNum
            })
            this.setData({
              shopMenu: this.data.shopMenu
            })
          }
          // console.log(this.data.shopMenu)
          // 由于获取数据是异步的.所以需要延迟函数.
          setTimeout(() => {
            this.getHeight()
          }, 500)
        }
      }
      setTimeout(() => {
        wx.hideLoading()
      }, 300) 
    })
    .catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 获取评价分数
  getRatingScoresData(id) {
    app.fetchApi.getRatingScores(id)
    .then(res => {
      if (res) {
        this.setData({
          ratingScoresData: res
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 获取评价分类
  getRatingTagsData(id) {
    app.fetchApi.getRatingTags(id)
    .then(res => {
      if(res) {
        this.setData({
          ratingTagsData: res
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 评价信息列表数据
  getRatingsData(id, tag_name, offset, limit) {
    app.fetchApi.getRatings(id, tag_name, offset, limit)
    .then(res => {
      if(res) {
        this.setData({
          getRatingsListData: res
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 选择规格
  changeSpan(e) {
    this.setData({
      selectSpec: e.currentTarget.dataset.index
    })
  },
  // 弹窗关闭
  hideDialog() {
    this.setData({
      selectid: ''
    })
  },
  // 确定选择
  btnOk(){
    this.hideDialog()
  },
  // 取消选择
  cenCencel() {
    this.hideDialog()
  },
  // 打开弹窗
  openSpec(e) {
    this.setData({
      isSpec: 0,
      selectid: e.currentTarget.dataset.item._id
    })
  },
  // 点击左侧
  leftTap(e) {
    this.setData({
      rightCurrent: e.currentTarget.dataset.id,
      leftIndex: e.currentTarget.dataset.index
    })
  },
  // 获取高度
  getHeight() {
    if (this.data.shopMenu.length > 0) {
      const query = wx.createSelectorQuery()
      // 获取左侧某个块的高度
      query.select('.leftLi').boundingClientRect((rect) => {
        this.setData({
          leftHeight: rect.height
        })
      }).exec();
      // 获取右侧所有块高度
      let rightHeightArr = []
      let n = 0
      query.selectAll('.rightList').boundingClientRect((rect) => {
        // 循环将每个高度添加到数组里面.
        rect.forEach(item => {
          n += item.height
          rightHeightArr.push(n)
        })
      }).exec()
      setTimeout(() => {
        this.setData({
          rightHeightArr: rightHeightArr
        })
      }, 100)
    }
  },
  // 右侧滚动触发
  bindscroll(e) {
    // 思路
    // 借助scroll-view 的bindscroll属性
    // 滚动的信息保存在参数e里.
    // 先把所有的view高度保存在一个数组里.
    // 然后循环数组.
    // 循环数组的同时判断当前滚动的值是否大于数组中 i - 1 同时小于i的值. 同时满足就将i赋值给另一个变量,这个变量就是左侧的index下标.
    // 由于滚动会不断的触发事件会造成性能问题.
    // 所以需要定义一个开关变量.
    // 开关变量默认为true.
    // 滚动距离大于0且小于第一个数组变量时.
    // 将开关变量,以及 zindex, 左侧index, 左侧距离顶部leftTop变量都等于0.
    // 此时设置完之后必须return或者break,不然会重复执行20次
    // 如果滚动大于第一个先判断当前i是否等于设置的zindex变量.
    // 不等于说明修改左侧index的值了.将当前的i赋值给左侧index.
    let scrollTop = e.detail.scrollTop
    let scrollArr = this.data.rightHeightArr
    let oneShow = this.data.oneShow
    let zindex = this.data.zindex
    for(let i = 0; i < scrollArr.length; i++) {
      if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
        if (oneShow) {
          this.setData({
            // 开关变量
            oneShow: false,
            zindex: 0,
            // 左侧高度
            leftIndex: 0,
            leftTop: 0
          })
          break
        }
      } else if (scrollTop >= (scrollArr[i - 1]) && scrollTop < scrollArr[i]) {
        if (i != zindex) {
          this.setData({
            oneShow: true,
            zindex: i,
            leftIndex: i,
            leftTop: i * this.data.leftHeight
          })
        }
      }
    }
  },
  // 跳转到详细页
  toDetail(e){
    console.log(e)
    const data = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: `./children/shopDetail/shopDetail?item=${data}`
    })
  },
  // 判断storage里面是否有数据
  isStorageData() {
    if(wx.getStorageSync('shopData')) {
      const shopData = wx.getStorageSync('shopData')
      Object.keys(shopData).forEach(key => {
        if(key === this.data.shopId) {
          this.setData({
            buyShopData: shopData[key]
          })
          let num = 0
          let money = 0
          this.data.buyShopData.forEach(item => {
            num += item.quantity
            money += item.price * item.quantity
          })
          this.setData({
            shopNum: num,
            shopMoney: money
          })
        }
      })
    }
  },
  // 清空购物车.
  saveSons(e) {
    const data = wx.getStorageSync('shopData')
    const nData = {}
    console.log(data)
    Object.keys(data).map((item, index) => {
      if(item === this.data.shopId) {
        delete data[item]
      }
      // console.log(data)
    })
    wx.setStorageSync('shopData', data)
    // console.log(wx.getStorageSync('shopData')[this.data.shopId])
    this.setData({
      buyShopData: []
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopId: options.id,
      rightCurrent: 'c2306'
    })
    this.getShopRestaurantData(this.data.shopId)
    // 获取食品列表
    this.getMenuListData(this.data.shopId)
    // 获取storage数据
    this.isStorageData()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   * // DOM 渲染完成.一般在此页面获取dom的高度之类.
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