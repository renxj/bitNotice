//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    aryGoods: [],
    symbol: '',
    symbol_list: {}
  },
  onLoad: function (options) {  

    this.setData({
      'symbol': options.symbol,
      'symbol_list': options.symbol_list && JSON.parse(options.symbol_list)
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
    let self = this
    let val = { 'symbol': this.data.symbol || this.data.symbol_list.symbol}
    e.detail.value.priceType ? e.detail.value.priceType = 1 : e.detail.value.priceType = 0
    e.detail.value.rangeType ? e.detail.value.rangeType = 1 : e.detail.value.rangeType = 0
    let data = { ...e.detail.value, ...val, ...{"formId": 'aweesfdfc'} }
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        
        if (self.data.symbol_list){
          data = { ...data, ...{ 'openid': res.data }, ...{ id: self.data.symbol_list.id }, ...{ status: 0} }
          wx.request({
            url: 'https://api.flkem.com/update',
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
        }else{
          data = { ...data, ...{ 'openid': res.data } }
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
       
      }
    })
  }
})
