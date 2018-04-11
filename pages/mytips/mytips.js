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
  onDelTap: function(event) {
    let id = event.currentTarget.dataset.id
    wx.showModal({
      title: '确认删除该提醒？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主确定')
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
      }
    });
  },

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
            console.log(result)
            self.setData({
              aryGoods: result.data.data
            });
          }
        })
      }
    })
    
  }

})
