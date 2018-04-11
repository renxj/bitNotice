//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    listData: []
  },
  //获取openID
  getOpenId: function() {
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res.data)
      },
      fail: function(err){
        console.log(err)
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: 'https://api.flkem.com/getOpenid',
                data: {
                  code: res.code
                },
                success: function (result) {
                  console.log(result.data.data.openid)
                  wx.setStorage({
                    key: "openid",
                    data: result.data.data.openid
                  })
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        });
      }
    })
    
  },
  onLoad: function () {
    this.tempData();
    this.getOpenId();
  },
  onShareAppMessage: function () {
    return {
      title: '看我看我就对了',
      desc: '最具人气的小程序',
      imageUrl: 'https://static.suiyueyule.com/headerimg.png',
      path: 'pages/index/index'
    }
  },
  //列表数据
  tempData: function () {
    let self = this
    wx.request({
      url: 'https://api.flkem.com/pairs', 
      data: {},
      success: function (res) {
        self.setData({
          listData: (res.data.data || []).map(item => {
            return item.replace(/_/, '/').toUpperCase()
          })
        });
      }
    })

  },
  // 显示搜索
  onStockSearchEvent: function (e) {
    wx.navigateTo({
      url: '../search/search'
    })
  },

})
