<template>
  <div class="home">
    <Header></Header>
    <router-view :key="$route.fullPath"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Header from '../components/header_new'
import Footer from '../components/footer_new'

export default {
  name: 'Home',
  components: {
    Header,
    Footer
  },
  created() {
    this.initData()
  },
  methods: {
    ...mapActions(['getBanner', 'getBasicContent','getPopularGame', 'getRanking', 'getActivity', 'getNotice']),
    initData() {
      this.$store.commit('SET_SHOW_FLOAT', true)
      this.Api.showHomepageModel().then(({success, data}) => {
        if (success && data) {
          data['banner'] ? this.getBanner() : this.$store.commit('SET_SHOW_BANNER', false)
          data['customer.service'] ? '' : null
          data['winning.ranking'] ? this.getRanking() : null
          data['notice'] ? this.getNotice({type:1}) : null
          data['activity'] ? this.getActivity() : null
          this.getBasicContent()
          this.getPopularGame()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.custom-table {
  border-top: 1px solid #cfcfcf;
  border-left: 1px solid #cfcfcf;
  border-right: 1px solid #cfcfcf;
  .el-table{
    font-size: 12px;
  }

  .el-table::before {
    background-color: #cfcfcf;
  }
  .el-table thead tr,
  .el-table thead th {
    background: #fffbf5 !important;
  }
  .el-table thead th + th {
    .cell {
      border-left: 1px solid #b7a383;
    }
  }
  .el-table thead th{
    color: #000;
    font-weight: 400;
    font-size: 14px;
  }
}
.m-t-25{
  margin-top: 25px;
}
</style>
