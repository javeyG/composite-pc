<template>
  <div>
    <div class="page-header-background">
      <div class="page-header-content page-header-box">
        <!-- 通用左边菜单 -->
        <div class="left-page-header">
          <div @click="goRouter('/')" class="logo">
            <img
              src="/src/assets/forexImages/logo.png"
              width="24"
              height="24"
            />
            <span class="logoName2"> {{ $title }} </span>
          </div>
          <menu-item
            v-for="(_, i) in leftMenuList"
            :key="i"
            :title="_.title"
            :menuList="_.menuList"
            :url="_.url"
            :tips="_.tips"
          >
          </menu-item>
        </div>
        <!-- 登录前的右边菜单，在登录页面用到-->
        <div class="right-page-header-pre-login" v-if="!existToken">
          <div @click="goRouter('/login')">{{ $t("message.home.denglu") }}</div>
          <div @click="goRouter('/register')">
            {{ $t("message.home.zhuce") }}
          </div>
          <div @click="goApp()">{{ $t("message.home.xiazai") }}</div>
          <div @click="handleChangeLang('lang')">
            {{ $t("message.home.language") }}
          </div>
          <!-- <div @click="handleChangeLang('exchange')">{{ rate }}</div> -->
        </div>
        <!-- 登录后的右边菜单 -->
        <div class="right-page-header" v-else>
          <!-- 充值 -->
          <div style="margin: auto; top: 0; left: 0; bottom: 0; right: 0">
            <div
              @click="goRechargePage"
              style="
                background-color: #1d91ff;
                width: 98px;
                height: 30px;
                border-radius: 5px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 6px;
              "
            >
              <img src="@/assets/images/icon/material-symbols.png" />
              {{ $t("message.user.chongzhi") }}
            </div>
          </div>
          <!-- 钱包订单用户中心 -->
          <menu-item
            v-for="(_, i) in rightMenuList"
            :key="i"
            :title="_.title"
            :menuList="_.menuList"
            :isRight="true"
          >
          </menu-item>
          <!-- 选择的语言 -->
          <div @click="handleChangeLang('lang')" style="margin-left: 16px">
            {{ $t("message.home.language") }}
          </div>
          <!-- <div @click="handleChangeLang('exchange')">{{ rate }}</div> -->
        </div>
      </div>
    </div>
    <!-- 语言和汇率弹窗 -->
    <lang-select ref="langSelect" />
  </div>
</template>
<script>
import { mapState } from "pinia";
import Axios from "@/api/login.js";
import { useUserStore } from "@/store/user";
import LangSelect from "./langSelect.vue";
import MenuItem from "./headerMenuItem.vue";
import { getImages } from "@/utils/index";
const contractList = (urlPath) => {
  return [
    {
      iconPath: getImages("headIcon/left-menu/constract-icon.png"),
      urlPath,
      urlQuery: { timestamp: Date.now(), RouterName: "sustainable" },
      title: "yongxuheyue",
      desc: "yongxuheyue_1",
    },
    {
      iconPath: getImages("headIcon/left-menu/delivery-icon.png"),
      urlPath,
      urlQuery: { timestamp: Date.now(), RouterName: "delivery" },
      title: "jiaogeheyue",
      desc: "jiaogeheyue_1",
    },
  ];
};

const spotList = (urlPath, tle) => {
  return [
    {
      iconPath: getImages("headIcon/left-menu/spot-icon.png"),
      urlPath,
      title: tle || "xianhuojiaoyishouye",
      desc: "xianhuojiaoyi_1",
    },
  ];
};

const leftMenuList = [
  {
    title: "shichang", //市场
    url: "/market",
  },
  {
    title: "meigu", // 美股 = 美股交易 永续合约 交割合约
    menuList: [
      ...contractList("/usStocks/constract/AAPL"),
      ...spotList("/usStocks/spot/AAPL", "meigujiaoyi"),
    ],
  },
  {
    title: "etf", // ETF= etf交易 永续合约 交割合约
    menuList: [
      ...contractList("/etf/constract/GlobalETF500"),
      ...spotList("/etf/spot/GlobalETF500", "etfjiaoyi"),
    ],
  },
  {
    title: "shuzihuobi", // 数字货币= 现货交易 永续合约 交割合约
    menuList: [
      ...contractList("/coin/constract/btcusdt"),
      ...spotList("/coin/spot/btcusdt"),
    ],
  },
  {
    title: "waihui", // 外汇=永续合约 交割合约
    menuList: contractList("/forex/constract/BTCUSD"),
  },
  {
    title: "Agu", // A股=永续合约 交割合约
    menuList: [],
    tips: true,
  },
  {
    title: "ganggu", // 港股=永续合约 交割合约
    menuList: [],
    tips: true,
  },
  // {
  //   title: "taigu", // 台股=永续合约 交割合约
  //   menuList: [],
  //   tips: true,
  // },
  {
    title: "jinrongyewu", // 金融业务=基金理财+矿池锁仓+C2C
    menuList: [
      {
        iconPath: getImages("headIcon/left-menu/pig.png"),
        urlPath: "/fundMa",
        title: "licaijijin",
        desc: "jijinlicai_1",
      },
      {
        iconPath: getImages("headIcon/left-menu/min.png"),
        urlPath: "/fundMakc",
        title: "kuangchisuocang",
        desc: "kuangchisuocang_1",
      },
      // {
      //   iconPath: getImages("headIcon/left-menu/spot-icon.png"),
      //   urlPath: "/fundMakc",
      //   title: "c2c",
      //   desc: "kuangchisuocang_1",
      // },
    ],
  },
];

const rightMenuList = [
  {
    title: "qianbao",
    menuList: [
      {
        urlPath: "/wallet/walletOverview",
        title: "qianbaozonglan",
        iconPath: getImages("headIcon/wallet-menu/wallet-overview.png"),
      },
      // etf
      {
        urlPath: "/wallet/etfAccounts",
        title: "etfZhanghu",
        iconPath: getImages("headIcon/wallet-menu/etf.png"),
      },
      // 外汇
      {
        urlPath: "/wallet/forexAccounts",
        title: "waihuiZhanghu",
        iconPath: getImages("headIcon/wallet-menu/forex.png"),
      },
      // 数字货币
      {
        urlPath: "/wallet/cryptosAccounts",
        title: "shuzihuobiZhanghu",
        iconPath: getImages("headIcon/wallet-menu/cryptos.png"),
      },
      // 美股
      {
        urlPath: "/wallet/usStocksAccounts",
        title: "meiguZhanghu",
        iconPath: getImages("headIcon/wallet-menu/us.png"),
      },
      {
        urlPath: "/wallet/financialAccounts",
        title: "licaizhanghu",
        iconPath: getImages("headIcon/wallet-menu/financial-account.png"),
      },
    ],
  },
  {
    title: "dingdan",
    menuList: [
      {
        urlPath: "/order/etfOrder",
        title: "etflishi",
        iconPath: getImages("headIcon/wallet-menu/etf.png"),
      },
      {
        urlPath: "/order/forexOrder",
        title: "waihuilishi",
        iconPath: getImages("headIcon/wallet-menu/forex.png"),
      },
      {
        urlPath: "/order/coinOrder",
        title: "shuzihuobilishi",
        iconPath: getImages("headIcon/wallet-menu/cryptos.png"),
      },
      {
        urlPath: "/order/usStocksOrder",
        title: "meigulishi",
        iconPath: getImages("headIcon/wallet-menu/us.png"),
      },
      {
        urlPath: "/order/financialOrder",
        title: "licailishi",
        iconPath: getImages("headIcon/wallet-menu/financial-account.png"),
      },
      {
        urlPath: "/order/changeRecord",
        title: "zhangbianjilu",
        iconPath: getImages("headIcon/wallet-menu/record.png"),
      },
      {
        urlPath: "/order/walletHistory",
        title: "qianbaolishi",
        iconPath: getImages("headIcon/wallet-menu/wallet-history.png"),
      },
      {
        urlPath: "/order/exchangeOrder",
        title: "duihuanlishi",
        iconPath: getImages("headIcon/wallet-menu/exchange.png"),
      },
    ],
  },
  {
    title: "zhanghu",
    menuList: [
      {
        urlPath: "/my/security",
        title: "zhanghuanquan",
        iconPath: getImages("headIcon/personal-menu/account-security.png"),
      },
      {
        urlPath: "/my/universal",
        title: "tongyong",
        iconPath: getImages("headIcon/personal-menu/universal.png"),
      },
      {
        urlPath: "/my/helpCenter",
        title: "bangzhuzhongxin",
        iconPath: getImages("headIcon/personal-menu/help-center.png"),
      },
      {
        urlPath: "/my/announcement",
        title: "gonggaozhongxin",
        iconPath: getImages("headIcon/personal-menu/notice.png"),
      },
      {
        urlPath: "/loginOut",
        title: "tuichu",
        iconPath: getImages("headIcon/personal-menu/quit.png"),
      },
    ],
  },
];

export default {
  data() {
    return {
      host_url: "", //域名,
      isShow: false,
      isshowList: false,
      changeRouteTitleColor: false,

      leftMenuList,
      rightMenuList,
    };
  },
  computed: {
    ...mapState(useUserStore, ["existToken"]),
    rate() {
      return "";
      // TODO
      // return this.$store.state.rate;
    },
  },
  components: {
    LangSelect,
    MenuItem,
  },
  created() {
    this.host_url = window.location.hostname;
  },
  methods: {
    goRouter(parmas) {
      this.$router.push(parmas);
    },
    handleChangeLang(type) {
      this.$refs.langSelect.isShowClick(type);
    },
    mouseOver(item) {
      item.isSubshow = true;
    },
    mouseLeave(item) {
      item.isSubshow = false;
    },
    goRechargePage() {
      this.$router.push("/recharge");
    },
    goApp() {
      if (localStorage.getItem("lang") == "en") {
        window.location.href = "https://" + this.host_url + "/app.html";
      } else if (localStorage.getItem("lang") == "cht") {
        window.location.href = "https://" + this.host_url + "/app-ft.html";
      } else if (localStorage.getItem("lang") == "zh-CN") {
        window.location.href = "https://" + this.host_url + "/app-cn.html";
      }
    },
    handleClick(id) {
      switch (id) {
        case 0: //一键购买
          break;
        case 1: //自由交易
          break;
        case 2:
          break;
        case 3:
          break;
      }
    },
  },
};
</script>
<style scoped>
.page-header-background {
  background-color: #131313;
  padding: 0 20px;
}

.page-header-content {
  display: flex;
  justify-content: space-between;
  height: 55px;
  line-height: 55px;
  color: white;
}

.left-page-header > div:nth-child(1) > img {
  display: inline-block;
}

.left-page-header,
.right-page-header,
.right-page-header-pre-login {
  display: flex;
}

.right-page-header > div {
  cursor: pointer;
  color: #fff;
}

.right-page-header-pre-login > div {
  padding: 0 16px;
  cursor: pointer;
  color: #fff;
}

.left-page-header > div {
  padding: 0 0px;
  cursor: pointer;
  color: #fff;
}

.left-page-header > div:hover,
.right-page-header > div:hover {
  color: #00d6ca;
}

/* 子菜单 */
.child-menu-box {
  position: absolute;
  background-color: #040320;
  top: 55px;
  width: 250px;
  color: white;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  z-index: 666;
}

.child-menu-box > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
}

.child-menu-box > div > img {
  display: inline-block;
  width: 40px;
  height: 40px;
}

.child-menu-box > div:hover {
  background-color: rgb(32, 32, 40);
}

.child-menu-title {
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
}

.logoName {
  margin-left: 14px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 28px;
  color: #00d6ca;
}

.logoName2 {
  margin-left: 14px;
  margin-right: 40px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
}

.el-dropdown-link {
  cursor: pointer;
  font-size: 16px;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.xianhuo-img {
  width: 20px !important;
  height: 20px !important;
  margin: 0 8px !important;
}
</style>
