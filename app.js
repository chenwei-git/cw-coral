// app.js
// App() 函数用来注册一个小程序
// 接受一个 Object 参数，其指定小程序的生命周期回调等
App({
  // 生命周期回调—监听小程序初始化
  onLaunch: function(options) {
    // 打开小程序的路径
    console.info("app.onlaunch: options.path =", options.path);
    // 打开小程序的query
    console.info("app.onlaunch: options.query =", options.query);
    // 打开小程序的场景值
    console.info("app.onlaunch: options.scene =", options.scene);
    console.info("app.onlaunch: options.shareTicket =", options.shareTicket);
    // 当场景为由从另一个小程序或公众号或App打开时，返回此字段
    console.info("app.onlaunch: options.referrerInfo =", options.referrerInfo);

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 生命周期回调—监听小程序显示
  onShow: function(options) { // options 与 onLaunch的options 一致
    console.info("app.onShow: options =", options);
  },
  // 生命周期回调—监听小程序隐藏
  onHide: function() {
    console.info("app.onHide");
  },
  // 错误监听函数
  onError: function(msg) {
    // 错误信息，包含堆栈
    console.error(msg);
  },
  // 页面不存在监听函数
  onPageNotFound: function(res) {
    // 不存在页面的路径
    console.info("app.onShow: res.path =", res.path);
    // 打开不存在页面的 query
    console.info("app.onShow: res.query =", res.query);
    // 是否本次启动的首个页面
    console.info("app.onShow: res.isEntryPage =", res.isEntryPage);
    // 如果是 tabbar 页面，请使用 wx.switchTab
    wx.redirectTo({
      url: 'pages/index/index'
    });
  },
  // 开发者可以添加任意的函数或数据到 Object 参数中，用 this 可以访问
  globalData: {
    userInfo: null
  }
})