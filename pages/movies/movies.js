var app = getApp();
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotMovieList: {}, //正在热映的电影
    comingSoonList: {}, //即将上映的电影
    topList250: {}, //豆瓣Top250的电影
    searchResult: {}, //搜索结果
    containerShow: true, //是否展示电影列表
    searchPanelShow: false, //是否展示搜索的电影
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl, "hotMovieList", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoonList", "即将上映");
    this.getMovieListData(top250Url, "topList250", "豆瓣Top250");
  },
  //获取电影列表
  getMovieListData: function(url, keys, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        that.translateData(res.data, keys, categoryTitle)
      },
      fail: function(error) {}
    })
  },
  //数据转换
  translateData: function(movieObj, keys, categoryTitle) {
    var movies = [];
    for (var i in movieObj.subjects) {
      var subject = movieObj.subjects[i];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      };
      var obj = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(obj);
    }
    var dataObj = {};
    dataObj[keys] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(dataObj);
  },
  //输入框聚焦时触发
  onBindFocus: function(event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  //点击完成时触发
  onBindConfirm: function(e) {
    var text = e.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult", "");
  },
  //取消搜索
  onCancelSearch: function(e) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {}
    })
  },
  //查看更多电影
  toMoreTap: function(e) {
    var category = e.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
  },
})