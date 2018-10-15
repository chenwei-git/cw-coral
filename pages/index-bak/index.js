// index.js
// 全局的 getApp() 函数可以用来获取到小程序 App 实例
const app = getApp()
// Page(Object)函数用来注册一个页面。
// 接受一个 Object 类型参数，其指定页面的初始数据、生命周期回调、事件处理函数等
Page({
  // 页面的初始数据
  // 页面第一次渲染使用的初始数据
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 生命周期回调—监听页面加载
  // 页面加载时触发, 一个页面只会调用一次
  onLoad: function(query) { // 打开当前页面路径的参数
    console.log("index.onLoad: query =", query);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 生命周期回调—监听页面显示
  // 页面显示/切入前台时触发
  onShow: function() {
    // route 到当前页面的路径
    console.log("index.onShow: route =", this.route);
  },
  // 生命周期回调—监听页面初次渲染完成
  // 一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
  // 对界面内容进行设置的 API 如wx.setNavigationBarTitle，请在onReady之后进行。
  onReady: function() {

  },
  // 生命周期回调—监听页面隐藏
  // 页面隐藏/切入后台时触发。 
  // 如 navigateTo 或底部 tab 切换到其他页面，小程序切入后台等。
  onHide: function() {

  },
  // 生命周期回调—监听页面卸载
  // 页面卸载时触发。如redirectTo或navigateBack到其他页面时。
  onUnload: function() {

  },
  // 页面事件处理函数-监听用户下拉刷新事件
  onPullDownRefresh: function() {
    // 可以通过wx.startPullDownRefresh触发下拉刷新，
    // 调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。
    // 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
  },
  // 页面事件处理函数-监听用户上拉触底事件
  onReachBottom: function() {
    // 可以在app.json的window选项中或页面配置中设置触发距离onReachBottomDistance。
    // 在触发距离内滑动期间，本事件只会被触发一次。

  },
  // 页面事件处理函数-用户点击右上角转发
  // 监听用户点击页面内转发按钮（<button> 组件 open-type="share"）
  // 或右上角菜单“转发”按钮的行为，并自定义转发内容。
  // 注意：只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮
  onShareAppMessage: function(res) {
    // 转发事件来源 button：页面内转发按钮；menu：右上角转发菜单
    console.log("index.onShareAppMessage: res.from =", res.from);
    // 如果 from 值是 button，则 target 是触发这次转发事件的 button，否则为 undefined
    console.log("index.onShareAppMessage: res.target =", res.target);
    // 页面中包含<web-view>组件时，返回当前<web-view>的url
    console.log("index.onShareAppMessage: res.webViewUrl =", res.webViewUrl);
    return {
      "title": "coral", // 转发标题
      "path": "/pages/index/index", // 转发路径
      // 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。
      // 支持PNG及JPG。显示图片长宽比是 5:4。
      "imageUrl": "images/index/share.png"
    };
  },
  // 页面事件处理函数-监听用户滑动页面事件
  onPageScroll: function(res) {
    // 页面在垂直方向已滚动的距离（单位px）
    console.log("index.onPageScroll: res.scrollTop =", res.scrollTop);
  },
  // 当前是 tab 页时，点击 tab 时触发
  onTabItemTap: function(res) {
    // 被点击tabItem的序号，从0开始
    console.log("index.onTabItemTap: res.index =", res.index);
    // 被点击tabItem的页面路径
    console.log("index.onTabItemTap: res.pagePath =", res.pagePath);
    // 被点击tabItem的按钮文字
    console.log("index.onTabItemTap: res.text =", res.text);
  },
  // 组件事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '/pages/logs/logs'
    });
  },
  navToDemo: function() {
    wx.navigateTo({
      url: '/pages/demo/demo'
    });
  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    // Page.prototype.setData(Object data, Function callback)
    // setData 函数用于 改变this.data的值(同步), 同时将数据从逻辑层发送到视图层(异步)
    // data 这次要改变的数据
    // callback 界面更新渲染完毕后的回调函数
    // 注意：
    // 直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
    // 仅支持设置可 JSON 化的数据。
    // 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
    // 请不要把 data 中任何一项的 value 设为 undefined ，
    // 否则这一项将不被设置并可能遗留一些潜在问题。
    this.setData({
      // 其中 key 可以以数据路径的形式给出，支持改变数组中的某一项或对象的某个属性，
      // 如'array[2].message'，'a.b.c.d'，并且不需要在 this.data 中预先定义。
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  }
  // 开发者可以添加任意的函数或数据到 Object 参数中，在页面的函数中用 this 可以访问
})