Page({
  onTap: function (event) {
    // wx.navigateTo({
    //     url:"../posts/posts"
    // });

    wx.switchTab({
      url: "../posts/posts"
    });

  },
  onReachBottom: function (event) {
    console.log('asfasdfa')
  }
})