<template>
  <div class="help-center">
    <el-row :gutter="20">
      <el-col :span="7">
        <div class="help-box">
          <div class="help-tit">
            {{betList.menu}}
          </div>
          <div class="help-list">
            <ul>
              <li v-for="(item, index) in betList.children" :key="index">
                <router-link tag="a" :to="`/help-info/${item.id}`">{{item.menu}}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="help-box">
           <div class="help-tit">
            {{questList.menu}}
          </div>
          <div class="help-list">
            <ul>
              <li v-for="(item, index) in questList.children" :key="index">
                 <router-link tag="a" :to="`/help-info/${item.id}`">{{item.menu}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="help-box" style="padding-bottom:20px">
          <div class="help-tit">电脑投注流程中奖5步走</div>
          <div class="help-info" >
            <div class="help-line"></div>
            <div class="help-cent">
              <div class="helpetin-left">
                <div class="help-icon">1</div>
                <span>注册</span>
              </div>
              <div class="helpetin-right">
                <router-link tag="a" class="orange" :to="`/register`">免费注册</router-link>彩票账号
              </div>
            </div>
            <div class="help-cent">
              <div class="helpetin-left">
                <div class="help-icon">2</div>
                <span>充值</span>
              </div>
              <div class="helpetin-right">
                <router-link tag="a" :to="`/login`" class="orange">登录</router-link>后选择支付
                <router-link tag="a" :to="`/account-center/fund-manage/recharge`" class="orange">充值彩金</router-link>
              </div>
            </div>
            <div class="help-cent">
              <div class="helpetin-left">
                <div class="help-icon">3</div>
                <span>购彩</span>
              </div>
              <div class="helpetin-right">
                进入彩票购彩大厅，
                <router-link tag="a" :to="`/home`" class="orange">马上投注</router-link>
              </div>
            </div>
            <div class="help-cent">
              <div class="helpetin-left">
                <div class="help-icon">4</div>
                <span>中奖</span>
              </div>
              <div class="helpetin-right">
                中奖后，奖金将派发到
                <router-link tag="a" :to="`/account-center`" class="orange">彩金账户</router-link>
              </div>
            </div>
            <div class="help-cent">
              <div class="helpetin-left">
                <div class="help-icon">5</div>
                <span>提款</span>
              </div>
              <div class="helpetin-right">
                <router-link tag="a" :to="`/account-center/fund-manage/withdrawal`" class="orange">申请提款</router-link>
                ，资金转至银行卡
              </div>
            </div>
          </div>
        </div>
        <div class="help-box">
          <div class="help-tit">
            {{tiroList.menu}}
          </div>
          <div class="help-list">
            <ul>
              <li v-for="(item, index) in tiroList.children" :key="index">
                <span class="orange f16">Q</span>
                <router-link to="/help-info">{{item.menu}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      betList: {
        menu: '',
        children: []
      },
      questList: {
        menu: '',
        children: []
      },
      tiroList:{
        menu: '',
        children: []
      },
    }
  },
  created() {
    this.initData()
  },
  methods: {
    preInto(route) {
      if (!this.isLogin) {
        this.$router.push('/login')
      } else {
        this.$router.push(route)
      }
    },
    initData() {
      // 获取帮助中心
      this.Api.getUserHelp().then(({ success, data }) => {
        if (success && data.length) {
          this.$store.commit('SET_HELP_LIST', data)
          this.betList = data[0]
          this.questList = data[1]
          this.tiroList = data[2]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
a{
  cursor: pointer;
}
.orange {
  color: #d81e06;
}
.help-center {
  width: 1200px;
  margin: 0 auto;
}
.help-box {
  background: #fff;
  border: 1px solid #ececec;
  overflow: hidden;
  margin: 10px 0;
  .help-tit {
    height: 47px;
    line-height: 47px;
    color: #333;
    background: #fff3e0;
    border-bottom: 1px solid #ececec;
    padding: 0 15px;
    font-size: 16px;
    overflow: hidden;
    .fr {
      font-size: 12px;
    }
  }
  .help-list ul li {
    line-height: 40px;
    border-bottom: 1px solid #ececec;
    padding-left: 20px;
    .f16 {
      font-size: 16px;
      margin-right: 10px;
    }
  }
  .help-info {
    padding: 20px;
    position: relative;
    .help-line {
      background: #ddd;
      width: 5px;
      height: 90%;
      position: absolute;
      left: 38px;
      top: 18px;
      bottom: 10px;
    }
    .help-cent {
      position: relative;
    }
    .help-icon {
      background: #fc9721;
      color: #fff;
      width: 22px;
      height: 22px;
      border: 2px solid #fff;
      border-radius: 50%;
      text-align: center;
      display: block;
      position: absolute;
      top: 10px;
      left: 7px;
    }
    .helpetin-left span {
      font-size: 14px;
      position: absolute;
      left: 40px;
      top: 12px;
      color: #333;
    }
    .helpetin-right {
      margin: 4px 0 0 72px;
      padding: 12px 0 0 5px;
    }
  }
}
</style>
