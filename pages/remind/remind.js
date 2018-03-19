//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    aryGoods: []
  },
  onLoad: function (options) {  
    wx.setNavigationBarTitle({
      title: '提醒设置'
    })
  },
  //点击加号,跳转到搜索
  onAddBtnTap: function (e) {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindViewTap: function() {
    wx.switchTab({
      url: '../mytips/mytips'
    })
  }
})
