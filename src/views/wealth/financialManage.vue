<!-- (基金)理财页面 -->
<template>
  <div>
    <div class="financial-background">
      <div style="width: 1200px; margin: 0 auto">
        <div style="width: 1200px; height: auto; padding-top: 30px">
          <div class="wealth-title">
            {{ $t("message.home.licai_1", { TITLE: $title }) }}
          </div>
          <div class="wealth-content">{{ $t("message.home.licai_2") }}</div>
        </div>
        <!-- </div> -->
        <div class="wealth-list" style="width: 800px; height: 140px">
          <div>
            <p>{{ $t("message.user.dingdanzonge") }}</p>
            <p>{{ amount_sum }} USDT</p>
            <p>≈ $ {{ amount_sum }}</p>
          </div>
          <div>
            <p>{{ $t("message.user.rishouyi") }}</p>
            <p>{{ today_profit }} USDT</p>
            <p>≈ $ {{ today_profit }}</p>
          </div>
          <div>
            <p>{{ $t("message.user.leijishouyi") }}</p>
            <p>{{ aready_profit }} USDT</p>
            <p>≈ $ {{ aready_profit }}</p>
          </div>
          <div>
            <p>{{ $t("message.user.tuoguanzhongdingdan") }}</p>
            <p>{{ order_sum }}</p>
          </div>
        </div>
        <div style="width: 1200px; height: 100px">
          <div
            style="
              width: 800px;
              height: 100px;
              margin: auto;
              display: flex;
              position: relative;
            "
          >
            <div
              class="theme-color wealth-zhanghu text-decoration-underline"
              @click="goAccounts"
            >
              {{ $t("message.user.zhanghu") }}
            </div>
            <div
              class="theme-color wealth-licai text-decoration-underline"
              @click="goHistory"
            >
              {{ $t("message.user.lishi") }}
            </div>
          </div>
        </div>
        <div style="width: 1200px; height: 160px; position: relative">
          <a
            class="theme-color wealth-btn-licai"
            @click="
              {
              }
            "
            >{{ $t("message.user.jijinlicai_1") }}</a
          >
          <a
            class="theme-color wealth-btn-kuangchi-grey mouse-cursor"
            @click="goRouter('/fundMakc')"
            >{{ $t("message.user.kuangchisuokuang_1") }}</a
          >
        </div>
        <div style="width: 1200px; height: 2px; position: relative">
          <div class="wealth-btn-rect-licai"></div>
        </div>
      </div>
    </div>
    <!-- 搜索 -->
    <div
      class="content-view-box item-box-wealth"
      style="background-color: white"
    >
      <div
        style="position: absolute; margin-left: 0px; height: 44px; width: 500px"
      >
        <input
          type="checkbox"
          id="checkbox1"
          v-model="checked1"
          class="css-input"
          scoped
        />
        <label style="background-color: white; margin-left: 5px">{{
          $t("message.home.OnlyDisplayAndPurchase")
        }}</label>

        <input
          type="checkbox"
          id="checkbox2"
          v-model="checked2"
          class="css-input"
          style="margin-left: 30px"
          scoped
        />
        <label style="background-color: white; margin-left: 5px">{{
          $t("message.home.MatchMyAssets")
        }}</label>
      </div>

      <div
        class="css-search-1"
        style="position: absolute; margin-left: 800px; margin-top: -22px"
      >
        <div class="css-search-2">
          <div class="css-search-3">
            <div class="bn-input-prefix css-search-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                class="css-search-5"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11 6a5 5 0 110 10 5 5 0 010-10zm0-3a8 8 0 017.021 11.838l3.07 3.07-1.59 1.591-1.591 1.591-3.07-3.07A8 8 0 1111 3z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <input
              id="financial_main_search"
              :placeholder="$t('message.hangqing.sousuo')"
              class="css-search-6"
              value=""
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 理财列表 -->
    <div class="content-view-box padding-top-bottom30">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="date"
          :label="$t('message.user.xiangmumingcheng')"
          :empty-text="$t('message.home.noData')"
        >
          <template #default="scope">
            <div class="flex-row-center">
              <!-- <img :src="scope.row.img" alt="picture" width="30px" height="30px"> -->
              <img
                src="../../assets/myImages/icon/money.png"
                alt="picture"
                width="58px"
                height="40px"
              />
              <div class="font-size16 margin-left10">
                <div v-if="language == 'zh-CN'">
                  {{ scope.row.name }}
                </div>
                <div v-if="language == 'CN'">
                  {{ scope.row.name_cn }}
                </div>
                <div v-if="language == 'en'">
                  {{ scope.row.name_en }}
                </div>
                <div v-if="language == 'Korean'">
                  {{ scope.row.name_kn }}
                </div>
                <div v-if="language == 'Japanese'">
                  {{ scope.row.name_jn }}
                </div>
                <div v-if="language == 'other'">
                  {{ scope.row.name_en }}
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="daily_rate"
          :label="$t('message.user.rishouyilv')"
        >
          <template #default="scope">
            <div class="green font-bold font-size16">
              {{ scope.row.daily_rate }} %
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cycle" :label="$t('message.user.zhouqi')">
          <template #default="scope">
            <div class="font-size16 font-bold">
              {{
                scope.row.cycle != 0
                  ? scope.row.cycle
                  : $t("message.user.wuxianqi")
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="investment_min"
          :label="$t('message.user.danbixiane')"
        >
          <template #default="scope">
            <div class="font-size16 font-bold">
              {{ scope.row.investment_min }} - {{ scope.row.investment_max }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('message.home.caozuo')">
          <template #default="scope">
            <button
              class="wealth-buy-button"
              type="primary"
              @click="buyBtn(scope.row.id)"
            >
              {{ $t("message.user.mairu") }}
            </button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 相关问题 -->
    <div class="content-view-box">
      <div class="font-size26 recharge-question-text">
        {{ $t("message.user.xiangguanwenti") }}
      </div>
      <el-collapse>
        <el-collapse-item :title="$t('message.user.chang2')" name="1">
          <div>
            {{ $t("message.user.chang11") }}
          </div>
        </el-collapse-item>
        <el-collapse-item :title="$t('message.user.shouyijisuan')" name="2">
          <div>
            {{ $t("message.user.chang12") }}
          </div>
        </el-collapse-item>
        <el-collapse-item :title="$t('message.user.guanyuweiyuejin')" name="3">
          <div>
            {{ $t("message.user.chang13") }}
          </div>
        </el-collapse-item>
        <el-collapse-item :title="$t('message.user.ruheshouyi')" name="4">
          <div>
            {{ $t("message.user.chang13-1") }}
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- 购买弹窗 -->
    <fund-buy
      v-if="buyCurrency"
      :iproduceId="showProductId"
      :buyCurrency="buyCurrency"
      :type="typeName"
      ref="panelShow"
    ></fund-buy>
    <!-- footer -->
    <!-- <footer-view></footer-view> -->
  </div>
</template>

<script>
import Axios from "@/utils/http";
import FundBuy from "./FundBuy.vue";
export default {
  components: { FundBuy },
  data() {
    return {
      language: "zh-CN",
      tableData: [],
      amount_sum: "",
      today_profit: "",
      aready_profit: "",
      order_sum: "",
      showProductId: "",
      typeName: "financial",
      outputCurrency: "",
      buyCurrency: "",
      checked1: false,
      checked2: false,
      tableOrderData: [],
      mineOrderData: [],
      tableDataAll: [],
      money: 0,
      checkdIndex: 0,
      checked3: false,
    };
  },
  mounted() {
    const lang = JSON.parse(localStorage.getItem("lang"));
    if (lang == "en") {
      this.language = "en";
    } else if (lang == "cht") {
      this.language = "CN";
    } else if (lang == "zh-CN") {
      this.language = "zh-CN";
    } else {
      this.language = "other";
    }
    this.getlist();
    this.getIncome();

    //没有登录不请求
    let spToken = localStorage.getItem("spToken", "");
    if (spToken && spToken != "") {
      this.getOrderList();
      this.getUsdt();
    }

    let self = this;
    let financial_main_search = document.getElementById(
      "financial_main_search"
    );
    financial_main_search.oninput = function () {
      console.log(financial_main_search.value);
      self.search(financial_main_search.value);
    };
  },
  methods: {
    goAccounts() {
      this.$router.push({
        path: "/wallet/financialAccounts",
        query: {
          type: 0,
        },
      });
    },
    goHistory() {
      this.$router.push({
        path: "/order/financialOrder",
        query: {
          type: "financial",
        },
      });
    },
    getlist() {
      Axios.fetch("api/finance!list.action").then((res) => {
        console.log("list = " + JSON.stringify(res));
        this.tableDataAll = res.data;
        this.tableData = [].concat(this.tableDataAll);
      });
    },
    //理财收益统计
    getIncome() {
      Axios.fetch("api/financeOrder!listSum.action").then((res) => {
        this.amount_sum = res.data.amount_sum;
        this.today_profit = res.data.today_profit;
        this.aready_profit = res.data.aready_profit;
        this.order_sum = res.data.order_sum;
        this.outputCurrency = res.data.outputCurrency;
        this.buyCurrency = res.data.buyCurrency || "usdt";
      });
    },
    //理财账户列表数据
    getOrderList() {
      Axios.fetch("api/financeOrder!list.action", {
        state: 1,
        page_no: 1,
      }).then((res) => {
        this.tableOrderData = res.data;
        // console.log("getOrderList" + JSON.stringify(res.data));
      });
    },
    //矿池锁仓列表
    getMineOrderList() {
      Axios.fetch("api/minerOrder!list.action", {
        state: 1,
        page_no: 1,
      }).then((res) => {
        this.mineOrderData = res.data;
        console.log(JSON.stringify(res.data));
      });
    },
    //获取可用余额USDT
    getUsdt() {
      Axios.fetch("api/wallet!getAll.action")
        .then((res) => {
          // console.log("money = " + JSON.stringify(res.data));
          this.money = res.data.usdt;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //买入
    buyBtn(id) {
      if (this.$store.state.token == "") {
        this.$router.push("/login");
      } else {
        this.$refs.panelShow.show();
        this.showProductId = id;
      }
    },
    goRouter(parmas) {
      if (parmas != "/loginOut") {
        this.$router.push(parmas);
      } else {
        Axios.loginOut().then((res) => {
          if (res.code == "0") {
            localStorage.removeItem("spToken");
            localStorage.removeItem("vuex");
            localStorage.removeItem("username");
            this.$router.push("/login");
            window.location.reload();
          }
        });
      }
    },
    Checkd() {
      console.log("Checkd");

      if (!this.checked1 && !this.checked2) {
        console.log("!this.checked1&!this.checked2");
        //所有的
        this.tableData = [].concat(this.tableDataAll);
      } else if (this.checked1 && this.checked2) {
        console.log("this.checked1&this.checked2");

        let newTable = [];
        let table1 = [].concat(this.tableDataAll);
        for (let i = 0; i < table1.length; i++) {
          let t = table1[i];
          for (let j = 0; j < this.tableOrderData.length; j++) {
            let t2 = this.tableOrderData[j];
            // console.log("t="+t.name_en);
            // console.log("t2="+t2.financeName_en);
            // if(t.name_en == t2.financeName_en){
            //     newTable.push(JSON.parse(JSON.stringify(t)));
            // }
          }

          if (t.investment_min <= this.money) {
            newTable.push(JSON.parse(JSON.stringify(t)));
          }
        }

        let newTable2 = [];
        for (let i = 0; i < newTable.length; i++) {
          let t = newTable[i];
          if (t.investment_min <= this.money) {
            newTable2.push(JSON.parse(JSON.stringify(t)));
          }
        }

        this.tableData = newTable2;
      } else if (this.checked1) {
        //可以购买
        console.log("this.checked1&");
        //this.money
        let newTable = [];
        let table1 = [].concat(this.tableDataAll);
        for (let i = 0; i < table1.length; i++) {
          let t = table1[i];
          // console.log("t="+JSON.stringify(t));
          if (t.investment_min <= this.money) {
            newTable.push(JSON.parse(JSON.stringify(t)));
          }
        }
        this.tableData = newTable;
      } else if (this.checked2) {
        //已经
        console.log("this.checked2&");
        let newTable = [];
        let table1 = [].concat(this.tableDataAll);
        for (let i = 0; i < table1.length; i++) {
          let t = table1[i];
          // for(let j = 0 ; j < this.tableOrderData.length ; j++){
          //     let t2 = this.tableOrderData[j];
          //     if(t.name_en == t2.financeName_en){
          //         newTable.push(JSON.parse(JSON.stringify(t)));
          //     }
          // }
          if (t.investment_min <= this.money) {
            newTable.push(JSON.parse(JSON.stringify(t)));
          }
        }

        this.tableData = newTable;
      }
    },
    search(value) {
      let newTable = [];

      let table1 = [].concat(this.tableDataAll);
      for (let i = 0; i < table1.length; i++) {
        let t = table1[i];
        console.log(JSON.stringify(t));
        if (t.name_en && t.name_en.indexOf(value) >= 0) {
          newTable.push(JSON.parse(JSON.stringify(t)));
        } else if (t.name_cn && t.name_cn.indexOf(value) >= 0) {
          newTable.push(JSON.parse(JSON.stringify(t)));
        } else if (t.name && t.name.indexOf(value) >= 0) {
          newTable.push(JSON.parse(JSON.stringify(t)));
        }
      }

      this.tableData = newTable;
    },
  },
  computed: {
    //该计算属性返回要监视的对象属性值
    getChecked1() {
      console.log("getChecked1=" + this.checked1);

      return this.checked1;
    },
    getChecked2() {
      console.log("getChecked2=" + this.checked2);

      return this.checked2;
    },
    getChecked3() {
      console.log("getChecked3=" + this.checked3);

      return this.checked3;
    },
  },
  watch: {
    //开始监听返回该对象属性值计算属性
    getChecked1: function (newVal, oldVal) {
      console.log(newVal, oldVal);
      this.checkdIndex++;

      console.log("this.checkdIndex = " + this.checkdIndex);

      // if(this.checkdIndex==2){
      this.Checkd();
      this.checkdIndex = 0;
      // }
    },
    getChecked2: function (newVal, oldVal) {
      console.log(newVal, oldVal);
      this.checkdIndex++;

      console.log("this.checkdIndex = " + this.checkdIndex);

      // if(this.checkdIndex==2){
      this.Checkd();
      this.checkdIndex = 0;
      // }
    },
    getChecked3: function (newVal, oldVal) {
      console.log(newVal, oldVal);

      console.log("search = " + this.checkdIndex);
    },
  },
};
</script>

<style scoped>
@import url(./wealth.css);

.el-table >>> .el-table thead {
  font-size: 15px !important;
}
</style>
