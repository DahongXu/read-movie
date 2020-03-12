Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
        "pagePath": "/pages/reads/reads",
        "iconPath": "/images/tab/yuedu.png",
        "selectedIconPath": "/images/tab/yuedu_hl.png",
        "text": "阅读"
      },
      {
        "pagePath": "/pages/movies/movies",
        "iconPath": "/images/tab/dianying.png",
        "selectedIconPath": "/images/tab/dianying_hl.png",
        "text": "电影"
      }
    ]
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    }
  }
})