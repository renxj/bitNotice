//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    symbol: '',
  },
  onLoad: function (options) {
    this.line('stage', {
      xAxis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      yAxis: [11, 33, 22, 32, 14, 15, 20, 60, 23, 44, 77, 122, 133, 89, 156, 122, 128, 143, 111, 101, 132, 99, 98, 44, 12, 14, 111, 13, 12, 55]
    })
    let title = options.symbol + '详情'
    this.setData({
      symbol: options.symbol
    })
    wx.setNavigationBarTitle({
      title: title
    })
  },
  line: function(canvasId, options) {
    let windowWidth = 0
    wx.getSystemInfo({
      success(result) {
        windowWidth = result.windowWidth
      }
    })
    let a = windowWidth / (options.xAxis.length - 1)
    let data = []
    options.xAxis.map((item, i) => {
      data.push([i * a, 200 - options.yAxis[i]])
    })

    const ctx = wx.createCanvasContext(canvasId)
    ctx.beginPath()
    data.map((item, i) => {
      if (i == 0) {
        ctx.moveTo(item[0], item[1])
      }
      ctx.lineTo(item[0], item[1])
    })
    ctx.setLineWidth(1)
    ctx.setLineCap('square')
    ctx.setStrokeStyle('red')
    ctx.stroke()
    ctx.draw()
  },
  //事件处理函数
  bindViewTap: function () {
    let url = '../remind/remind?symbol=' + this.data.symbol
    wx.navigateTo({
      url
    })
  }
})
