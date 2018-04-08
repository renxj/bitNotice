//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    aryGoods: [],
    openid: '',
  },
  onLoad: function (options) {
    this.tempData() 
    wx.setNavigationBarTitle({
      title: '我的提醒'
    })
  },
  //点击加号,跳转到搜索
  onAddBtnTap: function (e) {
    wx.switchTab({
      url: '../index/index'
    })
  },
  onEditTap: function(){
    wx.navigateTo({
      url: '../remind/remind'
    })
  },
  onDelTap: function() {
    wx.showModal({
      title: '确认删除该提醒？',
      content: '',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主确定')
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  //测试临时数据
  tempData: function () {
    let self = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res.data)
        wx.request({
          url: 'https://api.flkem.com/list',
          data: {
            openid: res.data
          },
          success: function (result) {
            self.setData({
              aryGoods: (result.data.data || []).map(item => {
                return item.replace(/_/, '/').toUpperCase()
              })
            });
          }
        })
      }
    })
    
    var list = {
      "code": 0,
      "message": "成功",
      "data": [
        "qbt_usdt",
        "gnx_usdt",
        "qlc_usdt",
        "eth_btc"
      ]
    };

    

  }

})
