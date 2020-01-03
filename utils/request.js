// 封装小程序 request请求和各种Api 
// 采用common 导出方式
// 采用es6 class 封装
// 将api的请求方式直接绑定到某个构造函数原型里
// 由于该js的方法需要在全局使用.所以需要在app.js里面实例化
// 由于使用的是es6 class 的方式.所以实例化需要用到new 操作符
module.exports = class FetchApi {
  // 构造函数方法和属性。可以在此处定义全局api接口路径。
  // prototype中用this访问
  constructor () {
    // 请求路径
    this.api = 'https://elm.cangdu.org'
  }
  // 获取城市列表
  // @ param 参数
  // type 必选  String      说明： guess: 定位城市，hot: 热门城市，group: 所有城市
  getCityList (param) {
    return new Promise((resolve, reject) => {
      wx.request({
        // 请求url
        url: `${this.api}/v1/cities?type=${param}`,
        // 请求方式
        method: 'GET',
        // 返回的数据格式。默认json
        dataType: 'json',
        // 请求头
        header: {
          'content-type': 'application/json'
        },
        // 成功请求到数据之后
        success (res) {
          // resolve 是promise里面执行成功的返回函数
          resolve(res.data)
        },
        fail (err) {
          // reject 是promise里面执行失败的返回函数
          reject(res)
        }
      })
    })
  }
  // 搜索地址
  // 请求方式 GET
  // 参数列表：
  // city_id    必选 int      城市id
  // keyword    必选 string   搜索关键字
  // type       可选 string   搜素类型,默认为search
  getSearchList (city_id, keyword) {
    wx.showLoading({
      title: '加载中'
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/v1/pois`,
        // 请求方式
        method: 'GET',
        // 传参
        data: {
          city_id,
          keyword
        },
        // 返回值类型
        dataType: 'json',
        // 请求头
        header: {
          'content-type': 'application/json'
        },
        // 请求成功
        success (res) {
          resolve(res.data)
          wx.hideLoading()
        },
        // 失败
        fail (err) {
          reject(err)
          wx.hideLoading()
        }
      })
    })
  }
  // 食品分类
  getIndexEntry() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/v2/index_entry`,
        method: 'GET',
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 获取商铺列表
  // 请求方式: GET
  // 请求参数: 
  // latitude       必选    纬度
  // longitude      必选    经度
  // offset         可选    跳过多少条数据, 默认0
  // limit          可选    请求数据的数量, 默认20
  // order_by       可选    排序方式id: 1: 起送价,2: 配送速度, 3: 评分, 4: 智能排序(优化), 5: 距离最近, 6: 销量最高
  getShopping(latitude, longitude, offset, limit, order_by) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/shopping/restaurants`,
        method: 'GET',
        data: {
          latitude,
          longitude,
          offset,
          limit,
          order_by
        },
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  getShoppingTwo(latitude, longitude, offset, limit, restaurant_category_id, order_by, restaurant_category_ids) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/shopping/restaurants`,
        method: 'GET',
        data: {
          latitude,
          longitude,
          offset,
          limit,
          restaurant_category_id,
          order_by,
          'restaurant_category_ids[]': restaurant_category_ids
        },
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 获取所有商铺分类列表
  // 参数
  // latitude 纬度
  // longitude  经度
  getCategory(latitude, longitude) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/shopping/v2/restaurant/category`,
        data: {
          latitude,
          longitude
        },
        dataType: 'json',
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 餐馆详情
  // shopid String  店铺id
  getShopRestaurant(shopid) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/shopping/restaurant/${shopid}`,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        dataType: 'json',
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 食品列表
  // 参数
  // restaurant_id int 餐馆id
  getMenuList(restaurant_id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/shopping/v2/menu`,
        method: 'GET',
        dataType: 'json',
        data: {
          restaurant_id
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 获取评价分数
  // 参数 restaurant_id 必选 int 餐馆id
  getRatingScores(restaurant_id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/ugc/v2/restaurants/${restaurant_id}/ratings/scores`,
        method: 'GET',
        dataType: 'json',
        header: {
          'content-type': 'application/json',
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 获取评价分类
  // 参数 restaurant_id 必选 int 餐馆id
  getRatingTags(restaurant_id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/ugc/v2/restaurants/${restaurant_id}/ratings/tags`,
        method: 'GET',
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err) 
        }
      })
    })
  }
  // 获取评价信息
  // 参数
  // restaurant_id 必选 int 餐馆id
  // tag_name 非必选 string  评价类型,默认全部
  // offset 非必选 跳过数据条数
  // limit 非必选  单词获取数据条数
  getRatings(restaurant_id, tag_name, offset, limit) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/ugc/v2/restaurants/${restaurant_id}/ratings`,
        method: 'GET',
        data: {
          tag_name,
          offset,
          limit
        },
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 加入购物车
  // post
  // 参数如下:
  // restaurant_id 必选 int 餐馆id
  // geohash 必选 string 经纬度
  // entities 必选 array  购物车数据
  postCheckout(restaurant_id, geohash, entities) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/v1/carts/checkout`,
        method: 'post',
        data: {
          restaurant_id,
          geohash,
          entities
        },
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 获取验证码
  postCaptchas() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/v1/captchas`,
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
          wx.setStorageSync('cap', res.header["Set-Cookie"])
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 登录
  // @params 
  // username 必选 string 用户名
  // password 必选 string 密码
  // captchas_code 必选 string 验证码
  postLogin(username, password, captcha_code) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/v2/login`,
        method: 'POST',
        data: {
          username,
          password,
          captcha_code
        },
        dataType: 'json',
        header: {
          'content-type': 'application/json',
          'cookie':wx.getStorageSync("cap")//读取cookie
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 账号退出
  getSignout() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/v2/signout`,
        method: 'GET',
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 获取备注信息
  // 参数
  // cart_id  必选  int 购物车id
  getRemarks(cart_id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/v1/carts/${cart_id}/remarks`,
        method: 'GET',
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 获取用户收货地址
  // 参数
  // user_id 必选 int 用户id
  getAddresses(user_id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/v1/users/${user_id}/addresses`,
        method: 'GET',
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 新增收货地址
  // 参数
  // user_id 必选 int 用户id
  // address 必选 string  地址
  // address_detail 必选 string 地址详情
  // geohash 必选 string  经纬度
  // name    必选 string 收货人姓名
  // phone   必选 string 电话号码
  // tag     必选 string 标签
  // sex     必选 int    性别:1男 2女
  // phone_bk 必选 string 备注电话
  // tag_type 必选 int 标签类型:2家 3学校 4公司
  postAddresses(
    user_id,
    address,
    address_detail,
    geohash,
    name,
    phone,
    tag,
    sex,
    phone_bk,
    tag_type
  ) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/v1/users/${user_id}/addresses`,
        method: 'POST',
        data: {
          address,
          address_detail,
          geohash,
          name,
          phone,
          tag,
          sex,
          phone_bk,
          tag_type
        },
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 下单
  // 参数
  // user_id 必选 int 用户id
  // cart_id 必选 int 购物车id
  // address_id 必选 int 收货地址id
  // restaurant_id  必选  int 餐馆id
  // geohash  非选  string  经纬度
  // description  非选  string 备注
  // entities 必选  array 购物车数据
  postOrders(
    user_id,
    cart_id,
    address_id,
    restaurant_id,
    geohash,
    description,
    entities
  ) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/v1/users/${user_id}/carts/${cart_id}/orders`,
        method: 'POST',
        data: {
          address_id,
          restaurant_id,
          geohash,
          description,
          entities
        },
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 订单列表获取
  // get
  // 参数
  // user_id 必选 int 用户id
  // limit 非选 int 获取数据数量
  // offset 非选 int 跳过数据条数
  getOrders(
    user_id,
    limit,
    offset
  ) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/bos/v2/users/${user_id}/orders`,
        method: 'GET',
        data: {
          limit,
          offset
        },
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 搜索餐馆
  // get
  // 参数
  // geohash  必选 string 经纬度
  // keyword  必选 string 关键词
  getRestaurants(geohash, keyword) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/v4/restaurants`,
        method: 'GET',
        data: {
          geohash,
          keyword
        },
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 服务中心
  getExplain() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/v3/profile/explain`,
        method: 'GET',
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 修改用户密码
  // 参数
  // username 必选  string  用户名
  // oldpassWord  必选  string 旧密码
  // newpassword  必选  string  新密码
  // confirmpassword  必选 string 确认密码
  // captcha_code 必选  验证码
  postChangePassword (
    username,
    oldpassWord,
    newpassword,
    confirmpassword,
    captcha_code
  ) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/v2/changepassword`,
        method: 'POST',
        data: {
          username,
          oldpassWord,
          newpassword,
          confirmpassword,
          captcha_code
        },
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
}