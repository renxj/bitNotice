//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    aryGoods: [],
    symbol: '',
  },
  onLoad: function (options) {  
    console.log(options)
    this.setData({
      symbol: options.symbol
    })
    wx.setNavigationBarTitle({
      title: '提醒设置'
    })
  },
  // //点击加号,跳转到搜索
  // onAddBtnTap: function (e) {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  bindViewTap: function() {
    wx.switchTab({
      url: '../mytips/mytips'
    })
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  }
})
