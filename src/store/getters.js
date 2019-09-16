const getters = {
  // 登录
  token: state => state.user.token,
  userDetail: state => state.user.userDetail,
  isLogin: state => Boolean(state.user.token),
  // 网站
  isCryptData: state => state.site.isCryptData, //参数加密
  banner: state => state.site.banner,
  ico: state => state.site.ico,
  qrSrc: state => state.site.qrSrc,
  logoSrc: state => state.site.logoSrc,
  notice: state => state.site.notice,
  innerNotice: state => state.site.innerNotice,
  popularLotteries1: state => state.site.popularLotteries1,
  showBanner: state => state.site.showBanner,
  showSideFloat: state => state.site.showSideFloat,
  showInitNotice: state => state.site.showInitNotice,
  ranking: state => state.site.ranking,
  lotteryNoticeList: state => state.site.lotteryNoticeList,
  popularChess: state => state.site.popularChess,
  popularEgame: state => state.site.popularEgame,
  helpList: state => state.site.helpList,
  customerService: state => state.site.customerService,
  // 彩票
  currentLottery: state => state.lottery.currentLottery,
  lotteryAll: state => state.lottery.lotteryAll,
  bet: state => state.lottery.bet,
  issueInfo: state => state.lottery.issueInfo,
  allMethods: state => state.lottery.allMethods,
  defaultGroup: state => state.lottery.defaultGroup,
  defaultMethod: state => state.lottery.defaultMethod,
  currentMethod: state => state.lottery.currentMethod,
  currentMethodGroup: state => state.lottery.currentMethodGroup,
  chengeYlcPlays: state => state.lottery.chengeYlcPlays,
  orderList: state => state.lottery.orderList,
  currentOrderState: state => state.lottery.currentOrderState,
  totalCost: state => state.lottery.totalCost,
  currentIssue: state => state.lottery.currentIssue,
  userConfig: state => state.lottery.userConfig,
  currentLotterySign: state => state.lottery.currentLotterySign,
  lotteryLists: state => state.lottery.lotteryLists,
  countPrize: state => state.lottery.countPrize,
}

export default getters
