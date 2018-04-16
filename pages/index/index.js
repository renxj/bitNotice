//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    listData: [],
    inputShowed: false,
    inputVal: "",
  },
  //获取openID
  getOpenId: function() {
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        // console.log(res.data)
      },
      fail: function(err){
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
  onShow: function (){
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    this.tempData('');
  },
  onLoad: function () {
    this.tempData('');
    this.getOpenId();
  },
  onShareAppMessage: function () {
    return {
      title: '看我看我就对了',
      desc: '最具人气的小程序',
      imageUrl: '../../images/timg.jpeg',
      path: 'pages/index/index'
    }
  },
  //列表数据
  tempData: function (keyword) {
    let self = this
    wx.request({
      url: 'https://api.flkem.com/pairs', 
      data: { keyword },
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
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    this.tempData('')
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
    this.tempData('')
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    this.tempData(e.detail.value);
  }
})
