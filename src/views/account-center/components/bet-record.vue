<template>
  <div class="bet-record sub-account">
    <el-tabs v-model="activeName">
      <el-tab-pane label="游戏记录" name="game">
        <div class="container">
          <div class="filter-container">
            游戏时间：
            <!-- 今天 昨天 -->
            <el-date-picker
              style="width: 370px; margin-bottom:10px;"
              size="mini"
              v-model="gameTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
            <el-input @change="gameListInputChange" style="width:235px;margin:0 15px"  size="mini" placeholder="请输入内容" v-model="valueSelect" class="input-with-select">
              <el-select @change="gameListSelectChange" style="width:80px;" v-model="typeSelect" slot="prepend" placeholder="请选择">
                <el-option label="订单号" value="serial_number"></el-option>
                <el-option label="奖期号" value="issue"></el-option>
              </el-select>
            </el-input>
            状态：
            <el-select size="mini"  style="width:100px;" v-model="gameListQuery.status" placeholder="请选择">
              <el-option 
                label="所有" value=""></el-option>
              <el-option 
                v-for="(item, index) in statusOption" 
                :key="index"
                :label="item.label" 
                :value="item.value"></el-option>
            </el-select>
            <br>
             游戏名称：
            <el-cascader
              size="mini" 
              :props="{ expandTrigger: 'hover' }"
              v-model="gameListQuery.lotterySign"
              :options="lotteryAllOptions"></el-cascader>
            <div class="bmn-search-button" style="margin-left:20px;">
              <input @click="searchGame" type="submit" value="搜 索" class="btn" />
            </div>
          </div>
          <div class="custom-table m-t-25">
            <el-table 
            :summary-method="getGameSummaries"
            show-summary
            :data="gameList" v-loading="listLoading" style="width: 100%">
              <el-table-column align="center" label="用户名">
                <template slot-scope="scope">
                  <span>{{ scope.row.username }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="游戏" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ lotteryAll[scope.row.lottery_sign].lottery.cn_name }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip label="订单号">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    @click="handleDetail(scope.row)"
                  >
                 {{ scope.row.serial_number }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" label="奖期">
                <template slot-scope="scope">
                  <span>{{ scope.row.issue }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="玩法">
                <template slot-scope="scope">
                  <span>{{ scope.row.method_name }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="200px"  show-overflow-tooltip label="投注内容">
                <template slot-scope="scope">
                  <template v-if="scope.row.series_id === 'pk10'">
                    {{scope.row.bet_number.replace(/[0-9]/g, handlePK10Replacer)}}
                  </template>
                  <template
                    v-else-if="scope.row.method_group === 'DXDS'"
                  >{{scope.row.bet_number.replace(/&/g,',').replace(/(0)/g,'小').replace(/(1)/g,'大').replace(/(2)/g,'双').replace(/(3)/g,'单')}}</template>
                  <template
                    v-else-if="scope.row.method_group === 'LH'"
                  >{{scope.row.bet_number.replace(/&/g,',').replace(/(0)/g,'龙').replace(/(1)/g,'虎').replace(/(2)/g,'和')}}</template>
                  <template
                    v-else-if="scope.row.method_sign === 'QTS3' || scope.row.method_sign === 'ZTS3' || scope.row.method_sign === 'HTS3'"
                  >{{scope.row.bet_number.replace(/&/g,',').replace(/(0)/g,'豹子').replace(/(1)/g,'顺子').replace(/(2)/g,'对子')}}</template>
                  <template
                    v-else-if="scope.row.method_sign === 'LTDDS'">
                    {{
                      scope.row.bet_number.replace(/ /g,',').replace(/(0)/g,'零单五双').replace(/(1)/g,'一单四双').replace(/(2)/g,'二单三双').replace(/(3)/g,'三单二双').replace(/(4)/g,'四单一双').replace(/(5)/g,'五单零双')
                    }}
                  </template>
                  <template v-else>
                    <span>{{scope.row.bet_number.replace(/&/g,',')}}</span>
                  </template>
                </template>
              </el-table-column>
              <el-table-column align="center" label="投注额">
                <template slot-scope="scope">
                  <span>{{ scope.row.total_cost }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="奖金">
                <template slot-scope="scope">
                  <span>{{ scope.row.bonus }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="奖金组-返点">
                <template slot-scope="scope">
                  <span>{{ scope.row.bet_prize_group }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 0">待开奖</span>
                  <span v-if="scope.row.status == 1">已撤销</span>
                  <span style="color:red" v-if="scope.row.status == 2">未中奖</span>
                  <span v-if="scope.row.status == 3">中奖</span>
                  <span style="color:green" v-if="scope.row.status == 4">已派奖</span>
                  <span v-if="scope.row.status == 5">管理员撤销</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination-container">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="gameListQuery.page"
              :page-sizes="[10,20,30, 50]"
              :page-size="gameListQuery.page_size"
              layout="total, sizes, prev, pager, next"
              :total="gameListTotal"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="追号记录" name="traces">
        <div class="container">
          <div class="filter-container">
            游戏时间：
            <el-date-picker
              style="width: 370px; margin-bottom:10px;"
              size="mini"
              v-model="tracesTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
            <el-input @change="tracesListInputChange" style="width:235px;margin:0 15px"  size="mini" placeholder="请输入内容" v-model="tracesValueSelect" class="input-with-select">
              <el-select @change="tracesListSelectChange" style="width:80px;" v-model="tracesTypeSelect" slot="prepend" placeholder="请选择">
                <el-option label="订单号" value="project_serial_number"></el-option>
                <el-option label="奖期号" value="issue"></el-option>
              </el-select>
            </el-input>
            状态：
            <el-select size="mini"  style="width:100px;" v-model="tracesListQuery.status" placeholder="请选择">
              <el-option 
                label="所有" value=""></el-option>
              <el-option 
                v-for="(item, index) in statusOption" 
                :key="index"
                :label="item.label" 
                :value="item.value"></el-option>
            </el-select>
            <br>
             游戏名称：
            <el-cascader
              size="mini" 
              :props="{ expandTrigger: 'hover' }"
              v-model="tracesListQuery.lotterySign"
              :options="lotteryAllOptions"></el-cascader>
            <div class="bmn-search-button" style="margin-left:20px;">
              <input @click="searchTraces" type="submit" value="搜 索" class="btn" />
            </div>
          </div>
          <div class="custom-table m-t-25">
            <el-table :data="tracesList"
             v-loading="tracesListLoading"
              :summary-method="getTracesSummaries"
            show-summary
              style="width: 100%">
              <el-table-column align="center" show-overflow-tooltip label="彩种">
                <template slot-scope="scope">
                  <span>{{ lotteryAll[scope.row.lottery_sign].lottery.cn_name }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip label="玩法">
                <template slot-scope="scope">
                  <span>{{ scope.row.method_name }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip label="开始奖期">
                <template slot-scope="scope">
                  <span>{{ scope.row.start_issue }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip label="追号奖期">
                <template slot-scope="scope">
                  <span>{{ scope.row.issue_process }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip label="投注金额">
                <template slot-scope="scope">
                  <span>{{ scope.row.total_price }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip label="中奖金额">
                <template slot-scope="scope">
                  <span>{{ scope.row.finished_bonus }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip label="追中即停">
                <template slot-scope="scope">
                  <span v-if="scope.row.win_stop == 0">不停</span>
                  <span v-if="scope.row.win_stop == 1">停</span>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 0">正在追号</span>
                  <span v-if="scope.row.status == 1">追号完成</span>
                  <span v-if="scope.row.status == 2">中奖停止</span>
                  <span v-if="scope.row.status == 4">系统撤销</span>
                  <span v-if="scope.row.status == 5">玩家撤销</span>
                </template>
              </el-table-column>
              <el-table-column align="center" show-overflow-tooltip label="操作">
                <template slot-scope="scope">
                 <el-button
                    type="text"
                    size="mini"
                    @click="handleDetail(scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination-container">
            <el-pagination
              background
              @size-change="handleTraceSizeChange"
              @current-change="handleTraceCurrentChange"
              :current-page="tracesListQuery.page"
              :page-sizes="[10,20,30, 50]"
              :page-size="tracesListQuery.page_size"
              layout="total, sizes, prev, pager, next"
              :total="tracesListTotal"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <record-details
      :detailData="detailData"
      @close="handleDetailClose"
      v-if="dialogVisible"
      :dialogVisible="dialogVisible"
    ></record-details>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import recordDetails from '../../../components/public/record_details'

export default {
  inject: ['active'],
  components: {
    recordDetails
  },
  data() {
    const date = new Date()
    const statusOption = [
      {
        value: 0,
        label: '待开奖'
      },
      {
        value: 1,
        label: '已撤销'
      },
      {
        value: 2,
        label: '未中奖'
      },
      {
        value: 3,
        label: '已中奖 '
      },
      {
        value: 4,
        label: '已派奖'
      },
    ]
    return {
      statusOption,
      typeSelect: 'serial_number',
      valueSelect: '',
      tracesTypeSelect: 'project_serial_number',
      tracesValueSelect: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      detailData: null,
      dialogVisible: false,
      activeName: 'game',
      gameList: [],
      listLoading: true,
      tracesListLoading: true,
      gameListTotal: null,
      gameListQuery: {
        page_size: 10,
        page: 1,
        lotterySign: '',
        time_condtions: [],
        lottery_sign: '',
        serial_number: '',
        issue: '',
        status: ''
      },
      tracesListTotal: null,
      tracesList: [],
      tracesListQuery: {
        page_size: 10,
        page: 1,
        time_condtions: [],
        lotterySign: '',
        lottery_sign: '',
        project_serial_number: '',
        issue: '',
        status: ''
      },
      gameTime: [
        new Date(date.setHours(0, 0, 0)),
        new Date(date.setHours(23, 59, 59))
      ],
      tracesTime: [
        new Date(date.setHours(0, 0, 0)),
        new Date(date.setHours(23, 59, 59))
      ]
    }
  },
  computed: {
    ...mapGetters([
      'lotteryAll',
      'lotteryLists'
    ]),
    lotteryAllOptions(){
      if(!Object.keys(this.lotteryLists).length) return
      let list = []
      list.push({
        value: '',
        label: '所有游戏',
      })
      for(let i in this.lotteryLists) {
        const val = this.lotteryLists[i]
        const children = val.list.map(val => {
          return {
            value: val.id,
            label: val.name,
          }
        })
        list.push({
          value: val.sign,
          label: val.name,
          children: children
        })
      }
      return list
    }
  },
  watch: {
    gameTime: {
      handler(newName) {
        const time_condtions = []
        time_condtions.push([
          'created_at',
          '>=',
          this.Utils.formatTime(newName[0],'YYYY-MM-DD HH:MM:SS')
        ]) 
        time_condtions.push([
          'created_at',
          '<=',
          this.Utils.formatTime(newName[1],'YYYY-MM-DD HH:MM:SS')
        ]) 
        this.gameListQuery.time_condtions = JSON.stringify(time_condtions)
      },
      immediate: true
    },
    tracesTime: {
      handler(newName) {
        const time_condtions = []
        time_condtions.push([
          'created_at',
          '>=',
          this.Utils.formatTime(newName[0],'YYYY-MM-DD HH:MM:SS')
        ]) 
        time_condtions.push([
          'created_at',
          '<=',
          this.Utils.formatTime(newName[1],'YYYY-MM-DD HH:MM:SS')
        ]) 
        this.tracesListQuery.time_condtions = JSON.stringify(time_condtions)
      },
      immediate: true
    },
  },
  created () {
    this.activeName = this.active ? this.active : 'game'
    this.getGameList()
    this.getTraceList()
  },
  methods: {
    //pk10开奖正则
    handlePK10Replacer(match){
      return parseInt(match) + 1
    },
    gameListInputChange(v){
      this.gameListQuery[this.typeSelect] = v
    },
    gameListSelectChange(v){
      if (v === 'serial_number'){
        this.gameListQuery.serial_number = this.valueSelect
        this.gameListQuery.issue = ''
      } else if (v === 'issue'){
        this.gameListQuery.issue = this.valueSelect
        this.gameListQuery.serial_number = ''
      }
    },
    tracesListInputChange(v){
      this.tracesListQuery[this.tracesTypeSelect] = v
    },
    tracesListSelectChange(v){
      if (v === 'serial_number'){
        this.tracesListQuery.project_serial_number = this.tracesValueSelect
        this.tracesListQuery.issue = ''
      } else if (v === 'issue'){
        this.tracesListQuery.issue = this.tracesValueSelect
        this.tracesListQuery.project_serial_number = ''
      }
    },
    getGameList() {
      Object.assign(this.gameListQuery, {
        lottery_sign: this.gameListQuery.lotterySign && this.gameListQuery.lotterySign.length == 2 ? this.gameListQuery.lotterySign[1] : ''
      })
      for (var propName in this.gameListQuery) { 
        if (this.gameListQuery[propName] === '') {
          delete this.gameListQuery[propName]
        }
      }
      this.listLoading = true
      this.Api.getBetGameRecord(this.gameListQuery).then(res => {
        const { success, data } = res
        this.listLoading = false
        if (success) {
          this.gameList = data.data
          this.gameListTotal = data.total
        }
      })
    },
    getTraceList() {
      Object.assign(this.tracesListQuery, {
        lottery_sign: this.tracesListQuery.lotterySign && this.tracesListQuery.lotterySign.length == 2 ? this.tracesListQuery.lotterySign[1] : ''
      })
      for (var propName in this.tracesListQuery) { 
        if (this.tracesListQuery[propName] === '') {
          delete this.tracesListQuery[propName]
        }
      }
      this.tracesListLoading = true
      this.Api.getBetTraceRecord(this.tracesListQuery).then(res => {
        const { success, data } = res
        this.tracesListLoading = false
        if (success) {
          this.tracesList = data.data
          this.tracesListTotal = data.total
        }
      })
    },
    searchGame() {
      this.gameListQuery.page = 1
      this.getGameList()
    },
    searchTraces() {
      this.tracesListQuery.page = 1
      this.getTraceList()
    },
    handleSizeChange(val) {
      this.gameListQuery.page_size = val
      this.getGameList()
    },
    handleCurrentChange(val) {
      this.gameListQuery.page = val
      this.getGameList()
    },
    handleTraceSizeChange(val) {
      this.tracesListQuery.page_size = val
      this.getTraceList()
    },
    handleTraceCurrentChange(val) {
      this.tracesListQuery.page = val
      this.getTraceList()
    },
    //投注记录详情
    handleDetail(row) {
      this.detailData = row
      this.dialogVisible = true
    },
    handleDetailClose() {
      this.dialogVisible = false
    },
    //游戏记录合计
    getGameSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '本页小结'
          return
        }
        if (index === 6) {
          const values = data.map(item => Number(item['total_cost']))
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] = sums[index].toFixed(3)
        }
        if (index === 7) {
          const values = data.map(item => Number(item['bonus']))
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] = sums[index].toFixed(3)
        }
      })

      return sums
    },
    //追号记录合计
    getTracesSummaries(param){
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '本页小结'
          return
        }
        if (index === 4) {
          const values = data.map(item => Number(item['total_price']))
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] = sums[index].toFixed(4)
        }
        if (index === 5) {
          const values = data.map(item => Number(item['finished_bonus']))
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] = sums[index].toFixed(4)
        }
      })

      return sums
    }
  }
}
</script>
<style lang="scss" scoped>
.bet-record {
  .container {
    padding: 0 35px 35px;
  }
  /deep/{
    .el-input--mini .el-input__inner{
      height: 28px;
    }
  }
}
</style>
