Page({
    data: {
      inputShowed: false,
      inputVal: "",
      listData: []
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
    },
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
    },
    inputTyping: function (e) {
      this.setData({
        inputVal: e.detail.value
      });
      let  self = this
      wx.request({
        url: 'https://api.flkem.com/pairs',
        data: {
          "keyword": e.detail.value
        },
        success: function (res) {
          self.setData({
            listData: (res.data.data || []).map(item => {
              return item.replace(/_/, '/').toUpperCase()
            })
          });
        }
      })
    }
});