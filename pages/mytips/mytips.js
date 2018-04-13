//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    aryGoods: [],
    openid: '',
  },
  onLoad: function (options) {
    // this.tempData() 
    wx.setNavigationBarTitle({
      title: '我的提醒'
    })
  },
  onShow: function () {
    this.tempData() 
  },
  //点击加号,跳转到搜索
  onAddBtnTap: function (e) {
    wx.switchTab({
      url: '../index/index'
    })
  },
  onEditTap: function (event){
    let item = event.currentTarget.dataset.item
    wx.navigateTo({
      url: '../remind/remind?symbol_list=' + JSON.stringify(item)
    })
  },
  onDelTap: function(event) {
    let id = event.currentTarget.dataset.id
    let self = this
    wx.showModal({
      title: '确认删除该提醒？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.getStorage({
            key: 'openid',
            success: function (res) {
              wx.request({
                url: 'https://api.flkem.com/delete',
                data: {
                  'openid': res.data,
                  'id': id
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                method: "POST",
                success: function (res) {
                  if (res.data.code == 0) {
                    wx.showToast({
                      title: '删除成功',
                      icon: 'success',
                      duration: 2000
                    })
                    self.tempData() 
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
      }
    });
  },

  tempData: function () {
    let self = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        wx.request({
          url: 'https://api.flkem.com/list',
          data: {
            openid: res.data
          },
          success: function (result) {
            self.setData({
              aryGoods: result.data.data
            });
          }
        })
      }
    })
    
  }

})
