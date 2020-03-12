var postsData = require('../../../data/readData.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false, //音乐是否播放
    currentPostId: 0, //当前文章id
    collected: false, //当前文章是否收藏
    readData: "" //文章详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    var readData = postsData.postList[postId];
    this.setData({
      readData: readData
    });
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      if (postCollected) {
        this.setData({
          collected: postCollected
        });
      }
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    }
  },
  /**
   * 点击收藏文章
   */
  onColletionTap: function() {
    this.getPostsCollectedAsy();
  },
  /**
   * 异步获取文章收藏状态
   */
  getPostsCollectedAsy: function() {
    var that = this;
    wx.getStorage({
      key: "posts_collected",
      success: function(res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);
      }
    })
  },
  /**
   * 显示操作成功提示
   */
  showToast: function(postsCollected, postCollected) {
    //更新缓存
    wx.setStorageSync("posts_collected", postsCollected);
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },
  /**
   * 文章分享
   */
  onShareTap: function() {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        // res.cancel 用户是不是点击了取消按钮
        // res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: "用户 " + itemList[res.tapIndex],
          content: "用户是否取消？" + res.cancel + "现在无法实现分享功能，什么时候能支持呢"
        })
      }
    })
  }
})