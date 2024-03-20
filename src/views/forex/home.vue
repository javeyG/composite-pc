<template>
  <div>
    <section class="section1 text-center text-white">
      <pc-header
        :needTransparent="needTransparent"
        :class="needTransparent ? 'transparent-header' : 'fix-header'"
      ></pc-header>
      <h1 class="text-white mt-12">{{ t("h-s1-t1", { TITLE: $title }) }}</h1>
      <div class="mt-8 mb-12">{{ t("h-s1-d1") }}</div>
      <el-button class="blue-middle-btn" @click="handleTrade">{{
        t("learn-more")
      }}</el-button>
    </section>

    <!-- 公告 -->
    <div class="notice-box mt-8" scope>
      <notice-bar></notice-bar>
    </div>
    <!-- 在1000多种交易产品上发掘交易机会 -->
    <pc-section class="pt-12 pb-20" innerclass="flex">
      <div class="section2-left mr-20">
        <el-tabs
          v-model="marketListType"
          class="demo-tabs"
          style="width: 600px"
          @tab-click="handleClick"
        >
          <el-tab-pane
            :label="_item.name"
            :name="_item.type"
            v-for="_item in marketList"
            :key="_item.type"
          >
            <el-table
              style="width: 600px"
              :data="activeList"
              class="self-table"
              :empty-text="t('message.home.noData')"
            >
              <el-table-column
                v-for="(item, index) in tableList"
                :key="index"
                :prop="item.prop"
                :width="item.width"
                :label="t(`h-s2-h${index + 1}`)"
              >
                <template #default="scope" v-if="item.prop == 'symbol'">
                  <div class="flex items-center">
                    <!-- :src="`${ConfigURL.HOST_URL}/symbol/${scope.row.symbol}.png`" -->

                    <el-image
                      :src="handleSymbolImg(scope.row.symbol)"
                      class="el-img-style"
                    >
                      <div slot="error" class="image-slot">
                        <img
                          :src="`${ConfigURL.HOST_URL}/symbol/noCoins.png`"
                          class="el-img-style"
                        />
                      </div>
                    </el-image>
                    <!-- <img :src="scope.row.img" style="width: 40px;height:40px;margin-right: 30px;" alt="" /> -->
                    <span>{{ getName(scope.row.symbol) }}</span>
                  </div>
                </template>
                <template #default="scope" v-if="item.prop == 'amount'">
                  <div class="flex items-center">
                    <span>{{ fixData(scope.row.amount) }}</span>
                  </div>
                </template>
                <template #default="scope" v-if="item.prop == 'change_ratio'">
                  <div class="flex items-center">
                    <span :class="scope.row.change_ratio > 0 ? 'green' : 'red'"
                      >{{ scope.row.change_ratio }}%</span
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column>
                <template #default="scope">
                  <el-button
                    class="blue-small-btn"
                    @click="goDetail(scope.row.symbol, scope.row)"
                    >{{ t("trade") }}</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <p class="text-gray-400">{{ t("h-s2-1-d1") }}</p>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="section2-content">
        <h6 class="font-normal">{{ t("h-s2-2-t1", { TITLE: $title }) }}</h6>
        <h1>{{ t("h-s2-2-t2") }}</h1>
        <h5 class="w-300 my-4">
          {{ t("h-s2-2-d1") }}
        </h5>
        <el-button
          class="gray-middle-btn font-normal"
          @click="gotoPage('/trading/spreads-swaps-commissions')"
        >
          {{ t("h-s2-2-b1") }}
        </el-button>
      </div>
    </pc-section>
    <!-- 卓越交易者 -->
    <pc-section>
      <div class="section3">
        <h2 class="text-white">{{ t("h-s3-t1") }}</h2>
        <h5 class="w-500 mb-12 text-white">{{ t("h-s3-d1") }}</h5>
        <el-button class="white-small-btn" @click="gotoPage('/tradingview')">{{
          t("learn-more")
        }}</el-button>
      </div>
    </pc-section>
    <!-- 对您现在的经纪商不满意 -->
    <pc-section class="section4 bg-white text-center pt-12">
      <div>{{ t("h-s2-2-t1", { TITLE: $title }) }}</div>
      <h2>{{ t("h-s4-t1") }}</h2>
      <h2>{{ t("h-s4-t2") }}</h2>
      <div class="grid grid-cols-2 gap-4 my-12">
        <card-advantage
          @click="gotoPage(item.url)"
          v-for="(item, i) in advantageList4"
          :key="i"
          :title="t(`h-s4-${i + 1}-t1`)"
          :desc="t(`h-s4-${i + 1}-d1`)"
          :imgPath="`/src/assets/forexImages/home/iphone${i + 1}.png`"
        ></card-advantage>
      </div>
    </pc-section>
    <!-- 一个账户，多个交易平台 -->
    <pc-section class="bd-gray py-12">
      <div class="text-sm text-center">{{ t("h-s5-t1") }}</div>
      <h2 class="text-center">{{ t("h-s5-t2") }}</h2>
      <div class="grid grid-cols-4 gap-x-4 mt-12">
        <card-platform
          v-for="(item, i) in platformList4"
          @click="gotoPage(item.url)"
          :key="i"
          :title="t(`h-s5-${i + 1}-t1`)"
          :desc="t(`h-s5-${i + 1}-d1`)"
          :imgPath="`/src/assets/forexImages/home/trade${i + 1}.png`"
        ></card-platform>
      </div>
    </pc-section>
    <!-- 立即注册并开始交易 -->
    <section class="section6 py-12">
      <h2 class="text-center text-white">{{ t("h-s5-t2") }}</h2>
      <div class="flex justify-center py-8">
        <el-input v-model="input" :placeholder="t('email')" />
        <div
          class="join bg-blue-500 flex justify-center items-center text-white"
        >
          {{ t("now-join") }}
        </div>
      </div>
      <h6
        class="text-center text-white cursor-pointer"
        @click="
          gotoPage(
            'https://files.pepperstone.com/legal/SCB/SCB_Privacy_Policy_ROW.pdf'
          )
        "
      >
        {{ t("h-s5-d1") }}
      </h6>
    </section>
    <!-- 让您的交易如虎添翼 -->
    <pc-section class="bd-gray py-12">
      <h2 class="text-center mb-10">{{ t("h-s6-t1") }}</h2>
      <div class="grid grid-cols-3 gap-x-8">
        <card-trade
          v-for="(item, i) in articleList3"
          @click="gotoPage(item.url)"
          :key="i"
          :title="t(`h-s6-${i + 1}-t1`)"
          :desc="t(`h-s6-${i + 1}-d1`)"
          :imgPath="`/src/assets/forexImages/home/article${i + 1}.png`"
          :tag="t(`h-s6-${i + 1}-b1`)"
        ></card-trade>
      </div>
      <h5
        class="mt-12 text-center cursor-pointer font-normal"
        @click="gotoPage('/market-analysis')"
      >
        {{ t("h-s6-d1") }}
      </h5>
    </pc-section>
    <!-- 年度最佳经济商 -->
    <pc-section class="pt-20">
      <div class="section8-bg p-20 flex justify-between">
        <div>
          <h2 class="text-white">{{ t("h-s7-t1") }}</h2>
          <h2 class="text-white">{{ t("h-s7-t2") }}</h2>
          <h5 class="text-white mb-4">
            {{ t("h-s7-d1") }}
          </h5>
          <el-button
            class="blue-middle-btn"
            round
            @click="gotoPage('/tradingview')"
            >{{ t("learn-more") }}</el-button
          >
        </div>
        <div class="flex flex-col justify-center items-center">
          <img
            style="width: 42.5px; height: 22.5px"
            src="../../assets/forexImages/home/biaozhi.png"
            alt=""
          />
          <img
            style="width: 120px; height: 120px; margin-top: 31.5px"
            src="../../assets/forexImages/home/icon-bg-blue.png"
            alt=""
          />
          <div class="font-size24 text-white" style="margin-top: 15px">
            {{ $title }}
          </div>
          <div class="font-size40" style="color: #f9f891">
            {{ t("message.home.niandujingxiaoshang") }}
          </div>
          <span class="font-size40" style="color: #f9f891">2022</span>
        </div>
      </div>
    </pc-section>
    <!-- 在全球范围内，我们被授予 -->
    <pc-section class="py-20">
      <div class="text-sm text-center">{{ t("h-s8-t1") }}</div>
      <h2 class="text-center">{{ t("h-s8-t2") }}</h2>
      <div class="flex justify-center">
        <img
          class="inline-block"
          v-for="(item, index) in list6"
          :key="index"
          :src="getImageUrl(`${awardPrefix}${index + 1}.png`)"
          width="174"
          height="110"
        />
      </div>
    </pc-section>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import API from "@/api/api";
import cardAdvantage from "@comForex/home/cardAdvantage.vue";
import cardPlatform from "@comForex/home/cardPlatform.vue";
import cardTrade from "@comForex/home/cardTrade.vue";
import PcHeader from "@comForex/header.vue";
import noticeBar from "@comForex/noticeBar.vue";
import { fixData } from "@/utils/utils";
import ConfigURL from "@/config/index";
import { getImageUrl, handleSymbolImg } from "@/utils/index";
import { onMounted } from "vue";
const needTransparent = ref(true);

const router = useRouter();
const { t } = useI18n();

onMounted(() => {
  getSymbol();
  window.addEventListener("scroll", handlePageScroll);
});

const handlePageScroll = () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  needTransparent.value = scrollTop < 800;
};

const list6 = Array(6);
const marketList = [
  {
    id: 0,
    name: t("h-s2-t1"),
    type: "hot",
  },
  {
    id: 1,
    name: t("message.user.waihui"),
    type: "forex",
  },
  {
    id: 2,
    name: t("message.user.shuzihuobi"),
    type: "cryptos",
  },
  {
    id: 3,
    name: t("h-s2-t4"),
    type: "indices",
  },
  {
    id: 4,
    name: t("h-s2-t5"),
    type: "commodities",
  },
];
const tableList = [
  {
    prop: "symbol",
    width: 180,
  },
  {
    prop: "close",
  },
  {
    prop: "amount",
  },
  {
    prop: "change_ratio",
  },
];
const articleList3 = [
  {
    url: "/market-analysis/forex-market-unlimited-opportunities",
  },
  {
    url: "/market-analysis/what-will-take-gold",
  },
  {
    url: "/market-analysis/-us-aug-cpi-review-risk-sentiment-changed",
  },
];
const advantageList4 = [
  {
    url: "/trading/spreads-swaps-commissions",
  },
  {
    url: "/trading",
  },
  {
    url: "/why-demo/about/",
  },
  {
    url: "/trading-platforms",
  },
];
const platformList4 = [
  {
    url: "/trading-platforms/platforms/ctrader",
  },
  {
    url: "/trading-platforms/platforms/metatrader5",
  },
  {
    url: "/trading-platforms/platforms/metatrader4",
  },
  {
    url: "/trading-platforms/platforms/ctrader",
  },
];

const awardPrefix = "/src/assets/forexImages/home/award";

const allSymbol = ref("");
const marketListType = ref("forex");
const activeList = ref([]);
const topListData = ref([]);
const jsonArray = ref([]);

const handleTrade = () => {
  router.push("/trading/spreads-swaps-commissions");
};
const getSymbol = () => {
  API.url("api/item!list.action", {}).then((res) => {
    allSymbol.value = res.data
      .map((val) => {
        return val.symbol;
      })
      .join(",");
    getList();
  });
};
const getList = () => {
  API.url("api/hobi!getRealtime.action", { symbol: allSymbol.value }).then(
    (res) => {
      jsonArray.value = res.data;
      fliterTypeData();
    }
  );
};
const fliterTypeData = () => {
  console.log(marketListType.value);
  if (marketListType.value == "hot") {
    //获取顶部热门
    jsonArray.value.map((val) => {
      if (topListData.value.length < 4) {
        //val.isTop=="1"
        if (val.isTop == 1) {
          topListData.value.push(val);
        }
      }
    });
    if (topListData.value.length == 0) {
      jsonArray.value.map((val) => {
        if (topListData.value.length < 4) {
          //val.isTop=="1"
          topListData.value.push(val);
        }
      });
    }
    activeList.value = topListData.value;
  } else {
    activeList.value = jsonArray.value.filter((val) => {
      return val.type == marketListType.value;
    });
  }
  if (activeList.value.length > 4) {
    activeList.value = activeList.value.slice(0, 4);
  }
};
const handleClick = (tab, event) => {
  marketListType.value = tab.props.name;
  fliterTypeData();
};
const getName = (symbol) => {
  // console.log("item = " + JSON.stringify(item));
  if (marketListType.value == "cryptos") {
    return symbol.toUpperCase();
  } else {
    return symbol;
  }
};
const goDetail = (symbol, item) => {
  let RouterName = "sustainable"; //永续
  if (item.type == "US-stocks") {
    router.push({
      path: `usStocks/constract/${symbol}`,
      query: { timestamp: Date.now(), RouterName: RouterName },
    });
  } else if (item.type == "cryptos") {
    router.push({
      path: `coin/constract/${symbol}`,
      query: { timestamp: Date.now(), RouterName: RouterName },
    });
  } else if (item.type == "indices") {
    router.push({
      path: `etf/constract/${symbol}`,
      query: { timestamp: Date.now(), RouterName: RouterName },
    });
  } else if (item.type == "forex") {
    router.push({
      path: `forex/constract/${symbol}`,
      query: { timestamp: Date.now(), RouterName: RouterName },
    });
  }
};

const gotoPage = (path) => {
  if (!path.startsWith("/")) {
    window.open(path);
    return;
  }
  router.push(path);
};
</script>

<style lang="scss" scoped>
.w-300 {
  width: 500px;
}

.bd-gray {
  background: #f1f4f6;
}

.w-500 {
  width: 500px;
}

//覆盖global.scss，home-tab单独样式
.demo-tabs :deep {
  .el-tabs__content {
    box-shadow: none;
    border-radius: 0;
  }

  .el-tabs__header {
    background: #fff;
    border-radius: 10px 10px 0px 0px;
    margin: 0;
  }
}

// home-table样式
.self-table {
  box-shadow: none;
  border-radius: 0;
}

.section1 {
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    url(@/assets/forexImages/home/banner1.png);
  background-size: auto 100%;
  height: 910px;
}

.transparent-header {
  background: transparent !important;
}

.fix-header {
  position: fixed !important;
}

.section2 {
  &-left {
    filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.1));
    width: 900px;

    p {
      background: #f6f7f8;
      border-radius: 0px 0px 10px 10px;
      padding: 18px 32px;
    }
  }

  &-content {
    max-width: 650px;
  }
}

.section3 {
  background: url(@/assets/forexImages/home/banner2.png) no-repeat center;
  background-size: auto 100%;
  height: 468px;
  width: 1200px;
  padding: 120px 0 0 74px;
}

.section6 {
  background: url(@/assets/forexImages/home/banner3.png) no-repeat center;
  background-size: auto 100%;
  margin: 0 auto;

  .join {
    width: 224px;
    height: 50px;
  }

  .el-input {
    width: 500px;
    height: 50px;
  }
}

.el-input :deep {
  .el-input__wrapper {
    border-radius: 0;
  }
}

.section8 {
  &-bg {
    background: url(@/assets/forexImages/home/banner4.png) no-repeat center;
    background-size: auto 100%;
    height: 468px;
    width: 1200px;
    margin: 0 auto;
    border-radius: 20px;
  }
}

:deep(.el-table .cell) {
  color: #000;
}

:deep(.el-tabs__item:hover) {
  color: rgb(30, 35, 41) !important;
}

.green {
  color: #03a66d;
}

.red {
  color: #cf304a;
}
</style>
