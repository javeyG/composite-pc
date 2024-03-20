<template>
  <div>
    <date-search />
    <el-table
      class="history-apply-position"
      :data="showData"
      :cell-style="cellStyle"
      :empty-text="$t('message.home.noData')"
    >
      <el-table-column
        v-for="(item, index) in tables"
        :key="index"
        :prop="item.prop"
        :label="$t(item.label)"
        :formatter="item.formatter"
      />
      <el-table-column align="right">
        <!-- class="m-2" -->
        <template #header>
          <el-select
            v-model="selectVal"
            popper-class="position-select"
            placeholder="Select"
            size="small"
            @change="selectChange"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="$t(item.label)"
              :value="item.value"
            />
          </el-select>
        </template>
        <template #default="scope">
          <div>{{ stateFormatter(scope.row.state) }}</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginatio">
      <el-icon
        ><ArrowLeft
          class="page-btn"
          :disabled="noPre || pageNum == 1"
          @click="changePageNum('pre')"
      /></el-icon>
      <div class="pageNum">
        {{ pageNum }}
      </div>

      <el-icon
        ><ArrowRight
          class="page-btn"
          :disabled="noNext"
          @click="changePageNum('next')"
      /></el-icon>
    </div>
  </div>
</template>

<script>
import Axios from "@/api/perpetualContract.js";
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import dateSearch from "./dateSearch.vue";
export default {
  name: "historyApplyPosition",
  props: {
    symbol: {
      type: String,
    },
    paramsType: {
      type: String,
      default: "indices",
    },
  },
  data() {
    return {
      pageNum: 1,
      noNext: false, //noNext
      noPre: false,
      timer: null,
      startTime: "",
      endTime: "",
      tables: [
        {
          prop: "create_time",
          label: "message.home.shijian",
        },
        {
          prop: "name",
          label: "message.jiaoyi.heyue",
        },
        // 历史只有平多和平空
        {
          prop: "direction",
          label: "message.home.fangxiang",
          formatter: this.directionFormatter,
        },
        {
          prop: "trade_avg_price",
          label: "message.home.chengjiaojunjia",
        },
        {
          prop: "volume_open",
          label: "message.home.weituoshuliang",
        },
        {
          prop: "volume",
          label: "message.user.chengjiaoshuliang",
          formatter: this.volumnFormatter,
        },
      ],

      tableData: [],
      showData: [],
      // 下拉框
      options: [
        {
          value: "all",
          label: "message.home.quanbu",
        },
        {
          value: "submitted",
          label: "message.home.yitijiao",
        },
        {
          value: "created",
          label: "message.home.weituowancheng",
        },
        {
          value: "canceled",
          label: "message.home.yichexiao",
        },
      ],
      selectVal: "all",
    };
  },
  components: {
    dateSearch,
    ArrowLeft,
    ArrowRight,
  },
  mounted() {
    this.getList();
    this.timer = setInterval(() => {
      this.getList();
    }, 2000);
  },

  unmounted() {
    clearInterval(this.timer);
  },
  methods: {
    //分页
    changePageNum(type) {
      if (type == "next") {
        if (!this.noNext) {
          this.pageNum = this.pageNum + 1;
        }
      } else {
        if (!this.noPre && this.pageNum > 1) {
          this.pageNum = this.pageNum - 1;
        }
      }
      this.getList();
    },
    //设置单个单元格样式   行下标：rowIndex    列下标：columnIndex
    cellStyle({ row, column, rowIndex, columnIndex }) {
      // 未实现盈亏
      if (columnIndex == 2) {
        if (row.direction == "sell") {
          return { color: "#E05561" };
        } else {
          return { color: "#62C885" };
        }
      }
    },
    //获取列表数据
    getList(startTime = "", endTime = "", isReset) {
      // 轮训的时候，把时间筛选的参数带上
      if (startTime || endTime || isReset) {
        this.startTime = startTime;
        this.endTime = endTime;
      }
      const data = {
        page_no: this.pageNum,
        type: "hisorders",
        symbol: this.symbol,
        endTime: this.endTime,
        startTime: this.startTime,
        symbolType: this.paramsType,
      };
      //历史委托和历史成交是一样的
      Axios.contractOrderList(data).then((res) => {
        this.tableData = res.data;
        const noNext = res.data.length == 0 || res.data.length < 10; //刚好等于10下一页就没数据
        this.noNext = noNext;
        this.filterData(); //轮训后，需要保留之前的筛选状态
      });
    },
    stateFormatter(state) {
      const stateMap = {
        submitted: "message.home.yitijiao",
        canceled: "message.home.yichexiao",
        created: "message.home.weituowancheng",
      };
      return this.$t(`${stateMap[state]}`);
    },

    directionFormatter(row) {
      const { direction } = row;
      return direction == "buy"
        ? this.$t("message.home.pingduo")
        : this.$t("message.home.pingkong");
    },
    // directionFormatter(row) {
    //   const map = {
    //     "close buy": "pingduo",
    //     "open buy": "kaiduo",
    //     "close sell": "pingkong",
    //     "open sell": "kaikong",
    //   };
    //   const { direction, offset } = row;
    //   const value = `${offset} ${direction}`;
    //   const text = map[value];
    //   return this.$t(`message.home.${text}`);
    // },
    volumnFormatter(row) {
      //委托数量(剩余)(张),委托数量(张)
      const { volume, volume_open } = row;
      return volume_open - volume;
    },
    filterData() {
      if (this.selectVal == "all" || !this.selectVal) {
        this.showData = this.tableData;
        return;
      }
      this.showData = this.tableData.filter((it) => it.state == this.selectVal);
    },
    //数据筛选
    selectChange() {
      // this.pageNum = ""; //需要访问所有的数据，然后自己过滤.因为有分页所以需要后端配合
      // this.getList();
      this.filterData();
    },
  },
};
</script>
