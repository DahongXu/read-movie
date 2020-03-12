var readData = require('../../data/readData.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageArray: [{ //轮播图数组
      "src": "/images/wx.png",
      "id": 3
    }, {
      "src": "/images/vr.png",
      "id": 4
    }, {
      "src": "/images/iqiyi.png",
      "id": 5
    }],
    readList: readData.postList
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.data.readList = readData.postList
    // this.setData({
    //   readList: readData.postList
    // });
  },
  //点击跳转至详情页
  toDetail: function(e) {
    var postId = e.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "reads-detail/reads-detail?id=" + postId
    })
  },
  //点击轮播图跳转至详情页
  onSwiperTap: function(e) {
    var postId = e.target.dataset.postid;
    wx.navigateTo({
      url: "reads-detail/reads-detail?id=" + postId
    })
  }
})