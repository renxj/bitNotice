//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function (options) { 
    let param = options.symbol.replace('/', '_').toLowerCase()
    console.log(param) 
    let title = options.symbol + '详情'
    wx.setNavigationBarTitle({
      title: title
    })
  }
})
