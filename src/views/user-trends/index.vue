<template>
  <div class="user-trends">
    <div class="trend-header">
      <el-form :inline="true" class="form-inline">
        <el-form-item>
          <span>选择彩种：</span>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择" style="margin-left:15px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="trend-main">
      <div class="select-section">
        <div class="select-section-inner clearfix">
          <ul class="select-list">
            <li class="current">
              <a href="javascript:void(0);">五星</a>
            </li>
            <li class>
              <a href="javascript:void(0);">四星</a>
            </li>
            <li class>
              <a href="javascript:void(0);">前三</a>
            </li>
            <li class>
              <a href="javascript:void(0);">中三</a>
            </li>
            <li class>
              <a href="javascript:void(0);">后三</a>
            </li>
            <li class>
              <a href="javascript:void(0);">前二</a>
            </li>
            <li class>
              <a href="javascript:void(0);">后二</a>
            </li>
          </ul>
        </div>
        <div class="select-section-content clearfix">
          <div class="select-section-content-inner">
            <div class="function">
              <el-checkbox-group @change="handleChangeSelect" v-model="select">
                <el-checkbox v-for="select in selectOption" :label="select" :key="select"  border>
                  {{slectOptionDict[select]}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="time">
              <el-radio-group v-model="radio1">
                <el-radio-button label="近30期"></el-radio-button>
                <el-radio-button label="近50期"></el-radio-button>
                <el-radio-button label="近100期"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </div>
        <chart ref="Chart"></chart>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Chart from './chart'
const slectOptionDict = {
    guides: '辅助线',
    lost: '遗漏',
    lostPost: '遗漏条',
    trend: '连线',
    temperature: '号温'
  }
export default {
  name: 'user-trends',
  components: { Chart },
  data() {
    return {
      value: '',
      slectOptionDict,
      selectOption: ['guides', 'lost', 'lostPost', 'trend', 'temperature'],
      select:['guides', 'lost', 'trend'],
      options: [],
      radio1: '近30期'
    }
  },
  computed: {
    ...mapGetters(['currentLottery', 'lotteryLists'])
  },
  methods: {
    handleChangeSelect(selectOption){
      this.$refs.Chart.handleSelectOption(selectOption)
    },
  }
}
</script>

<style lang="scss" scoped>
.user-trends {
  width: 1240px;
  margin: 0 auto;
  .trend-header {
    margin-top: 15px;
    /deep/ {
      .el-form-item{
        margin-bottom: 15px;
      }
    }
  }
}
.trend-main {
  /deep/ {
    .el-checkbox {
      margin-right: 5px;
    }
    .el-checkbox.is-bordered.is-checked {
      border-color: #d7d3cd;
    }

    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #ff7200;
    }
    .el-checkbox__inner:hover {
      border-color: #ff7200;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #ff7200;
      border-color: #ff7200;
    }
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      background-color: #ff7200;
      border-color: #ff7200;
    }
    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      box-shadow: -1px 0 0 0 #ff7200;
    }
  }

  .select-section {
    position: relative;
    z-index: 2;
  }

  .select-section-inner {
    width: 1240px;
    height: 40px;
    margin: 0 auto;
    border-bottom: 1px solid #e3d3bc;
    border-radius: 5px 5px 0 0;
    background-image: linear-gradient(0deg, #fff0db 0%, #fff5e7 100%),
      linear-gradient(#fffbf4, #fffbf4);
    box-shadow: inset 0px 1px 0px 0px white;
  }

  .select-section-content {
    position: relative;
    z-index: 1;
  }

  .search a.btn {
    /* Rectangle 94: */
    background: #54c28e;
    background-image: linear-gradient(-180deg, #54c28e 0%, #2eac70 100%);
    border: 1px solid #3baa75;
    box-shadow: 0px 1px 2px 0px #17533e;
    border-radius: 2px;
    padding: 0 30px;
  }

  .search a.btn:hover {
    color: #fff;
  }

  .select-section-content-inner {
    width: 1240px;
    margin: 0 auto;
    display: block;
    height: 56px;
    line-height: 42px;
    padding-top: 15px;
    background: #fff;
  }

  .select-section-content .input {
    width: 120px;
    padding: 6px 10px;
  }

  .select-section-content .function {
    float: left;
    color: #333;
    margin-left: 10px;
  }

  .select-section-content .function .label {
    /* Rectangle 51 Copy 6: */
    background: #ffffff;
    border: 1px solid rgba(117, 126, 168, 0.38);
    border-radius: 3px;
    padding: 10px 15px;
    margin-right: 10px;
  }
  .select-section-content .function .label input {
    position: relative;
    top: 2px;
  }
  .select-section-content .time {
    float: left;
    margin-left: 25px;
  }

  .select-section-content .select {
    float: left;
    padding-right: 10px;
  }

  .select-section-content .select .ui-label {
    width: 72px;
  }

  .select-section-content .select .ui-select {
    width: 72px;
  }

  .select-section-content .search {
    float: left;
  }

  .select-section-content .choose-model {
    margin: 5px 20px 0 20px;
  }

  .select-function {
    float: right;
    margin-top: 11px;
    margin-right: 15px;
  }

  .select-function a {
    color: #736045;
    display: inline-block;
    vertical-align: middle;
  }

  .select-function i {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: 5px;
    vertical-align: middle;
    // background-image: url("un-arrow.png");
    background-repeat: no-repeat;
    overflow: hidden;
    margin: 0 7px;
    vertical-align: middle;
  }

  .select-function .arrow-down {
    background-position: 0 0;
  }

  .select-function .arrow-up {
    background-position: 0 -16px;
  }

  .select-list {
    float: left;
  }

  .select-list li {
    cursor: pointer;
    float: left;
    width: 78px;
    height: 40px;
    box-sizing: border-box;
    border-top: 2px solid transparent;
    border-right: 1px solid transparent;
    border-left: 1px solid transparent;
  }

  .select-list li.current,
  .select-list li.current:hover {
    color: #ff7200;
    background-color: #ffffff;
    border-top: 2px solid #ff9707;
    border-bottom: 1px solid #ffffff;
    border-right: 1px solid #e3d3bc;
    border-left: 1px solid #e3d3bc;
  }

  .select-list li a {
    color: #736045;
    display: block;
    font-size: 14px;
    text-align: center;
    border-right: 1px solid #e3d3bc;
    width: 78px;
    height: 20px;
    box-sizing: border-box;
    margin-top: 8px;
  }
  .select-list li:last-child a {
    border-right: none;
  }
  .select-list li:hover {
    background-color: #ffffff;
    border-top: 2px solid #ff9707;
    border-bottom: 1px solid #ffffff;
    border-right: 1px solid #e3d3bc;
    border-left: 1px solid #e3d3bc;
  }

  .select-list li:hover a {
    color: #ff7200;
    text-decoration: none;
  }

  .select-list li.current a,
  .select-list li.current:hover a:hover {
    color: #ff7200;
  }
}
</style>

