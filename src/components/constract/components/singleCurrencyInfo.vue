<!-- 单个币种基本信息-->
<template>
  <div
    class="trade-header-box"
    :class="[isFullscreen ? 'trade-header-box-full' : '']"
  >
    <div class="ticker-xl-box">
      <!-- 币种名称 -->
      <div class="watch-drop-box" @click="handleClickSymbol">
        <span class="ticker-title">{{ pageData.name }}</span
        ><i class="icon iconfont icon-Mul_Dropdown arrow-icon"></i>
      </div>
      <!-- 币种的其他信息 -->
      <div class="ticker-top-box">
        <div class="ticker-item">
          <span
            class="label last"
            :style="{
              color: pageData.change_ratio >= 0 ? '#0db27c' : '#db4355',
            }"
            >{{ pageData.close }}</span
          ><span
            class="value"
            :style="{
              color: pageData.change_ratio >= 0 ? '#0db27c' : '#db4355',
            }"
            >{{ addAndSubtr(pageData.change_ratio) }}</span
          >
        </div>

        <div class="ticker-item">
          <span class="label">{{ $t("message.home.biaojijiage") }}</span
          ><span class="value">{{ pageData.close }}</span>
        </div>
        <div class="ticker-item">
          <span class="label">{{ $t("message.home.zhishujiage") }}</span
          ><span class="value">{{ pageData.close }}</span>
        </div>
        <div class="ticker-item">
          <span class="label">{{ $t("message.hangqing.24hzhangfu") }}</span>
          <span
            class="value"
            :class="[
              'text-end',
              pageData.change_ratio >= 0 ? 'color-up' : 'color-down',
            ]"
            >{{ pageData.close }}&nbsp; {{ pageData.change_ratio }}%</span
          >
        </div>

        <div class="ticker-item">
          <span class="label">24h {{ $t("message.home.zuidi") }}</span
          ><span class="value">{{ pageData.low }}</span>
        </div>
        <div class="ticker-item">
          <span class="label">24h {{ $t("message.home.zuigao") }}</span
          ><span class="value">{{ pageData.high }}</span>
        </div>
        <div class="ticker-item">
          <span class="label"
            >24h{{ t("message.home.liang") }}({{
              t(`${unitMap.amount[pageType]}`)
            }})</span
          >
          <span class="value"
            >{{ Number(pageData.amount || 0).toFixed(4) }}
          </span>
        </div>
        <div class="ticker-item">
          <span class="label"
            >24h{{ t("message.home.e") }}({{
              t(`${unitMap.volumn[pageType]}`)
            }})</span
          ><span class="value">
            {{ Number(pageData.volume || 0).toFixed(4) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { addAndSubtr } from "@/utils/index";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const emit = defineEmits(["showSerachCollect"]);
const props = defineProps({
  pageData: {
    type: Object,
    default: {},
  },
  isFullscreen: {
    type: Boolean,
    default: false,
  },
  pageType: {
    type: String,
    default: "etf",
  },
});

const handleClickSymbol = () => {
  emit("showSerachCollect");
};
const unitMap = {
  amount: {
    etf: "message.home.wangu",
    usStocks: "message.home.wangu",
    coin: "USD", //当前币种
    forex: "USDT", //当前币种
  },
  volumn: {
    etf: "message.home.wan",
    usStocks: "message.home.wan",
    forex: "USD",
    coin: "USDT",
  },
};
</script>
<style scoped>
.trade-header-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.trade-header-box-full {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #171a1e;
  z-index: 3000000;
  padding: 10px 0;
}

.trade-header-box .ticker-xl-box,
.trade-header-box .ticker-xl-box .ticker-top-box {
  width: 100%;
}

.watch-drop-box {
  margin: 0 28px;
  position: relative;
}

.watch-drop-box p {
  position: absolute;
  display: block;
  width: 100%;
  top: 30px;
}

.trade-header-box .ticker-item .label {
  padding-bottom: 5px;
}

.trade-header-box .ticker-item .last {
  font-size: 16px;
  font-weight: 600;
}
</style>
