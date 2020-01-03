// components/rate/rate.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rating: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 评分整数
    oneNum: 0,
    twoNum: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
     // 组件声明周期声明对象,
     // 将组件的声明周期收归到该字段进行声明,原有声明方式依旧有效,如同时存在两种声明,则lifetimes优先级高
     attached() {
       console.log('1')
       const rate = this.properties.rating
       const intRate = parseInt(rate)
       const arr = rate.toString().split('.')
       console.log(arr)
     }
  }
})
