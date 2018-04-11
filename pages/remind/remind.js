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
  bindViewTap: function() {
    wx.switchTab({
      url: '../mytips/mytips'
    })
  },
  formSubmit: function(e) {
    console.log(e.detail.fromId)
    let val = { 'symbol': this.data.symbol}
    e.detail.value.priceType ? e.detail.value.priceType = 1 : e.detail.value.priceType = 0
    e.detail.value.rangeType ? e.detail.value.rangeType = 1 : e.detail.value.rangeType = 0
    let data = { ...e.detail.value, ...val, ...{"formId": 'aweesfdfc'} }
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res.data)
        data = { ...data, ...{ 'openid': res.data}}
        console.log(data)
        wx.request({
          url: 'https://api.flkem.com/create',
          data: data,
          method: "POST",
          success: function (res) {
            if (res.data.code == 0) {
              wx.switchTab({
                url: '../mytips/mytips'
              })
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
    })

    
  }
})
