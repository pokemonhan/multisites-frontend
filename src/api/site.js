export default {
  // 获取需要展示的前台模块 
  showHomepageModel(data) {
    return this.get('/homepage/show-homepage-model', data).then(response =>  response)
  },
  //获取用户信息 
  getBanner(data) {
    return this.get('/homepage/banner', data).then(response =>  response)
  },
  //热门彩种
  getPopularLotteries1(data) {
    return this.get('/homepage/popular-lotteries-one', data).then(response =>  response)
  },
  getPopularLotteries2(data) {
    return this.get('/homepage/popular-lotteries-two', data).then(response =>  response)
  },
  //二维码 
  getQrcode() {
    return this.get('/homepage/qrcode').then(response =>  response)
  },
  //二维码 
  getActivity() {
    return this.get('/homepage/activity').then(response =>  response)
  },
  //LOGO
  getLogo() {
    return this.get('/homepage/logo').then(response =>  response)
  },
  //公告API
  getNotice() {
    return this.get('/homepage/notice').then(response =>  response)
  }
}