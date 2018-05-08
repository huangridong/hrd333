//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    district: "",
    street: "",
    weather: {},
    week: {0:'星期天',1:'星期一',2:'星期二',3:'星期三',4:'星期四',5:'星期五',6:'星期六'},
    day:''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    //获取经纬度
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy     
        console.log(that.data.city);
        that.getcity(latitude, longitude); //获取位置
        that.getweather(latitude, longitude);
        that.week();
      }
    })
  },
  //获取城市
  getcity: function (latitude, longitude) {
    var th =this;
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/',
      data: {
        location: latitude + "," + longitude,
        output: 'json',
        ak: "q0ykVeGAlyRfvgw8KxZYnbLvvGTQvXjL"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
         var dis = res.data.result.addressComponent.district
         var str = res.data.result.addressComponent.street
        console.log(res.data)
        th.setData({
          district: dis,
          street: str,    
        })
      }
    })
  },
  //获取天气
  getweather: function (latitude, longitude){
    var th = this;
    wx.request({
      url: 'https://free-api.heweather.com/v5/weather?',
      data: {
        city: latitude+","+longitude,
        key: 'b072996fcc90489f90f8911c2fa402a2'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)                    
        th.setData({
          weather: res.data.HeWeather5["0"] 
        });
      }
    })
  },
  //星期换算
  week:function(){ 
    var th = this;
    var d = new Date();
    var day = d.getDay()+2;
    if (day>6) day = 0
    th.setData({
      day: th.data.week[day]
    }) 
  }
})