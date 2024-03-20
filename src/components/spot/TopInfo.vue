<template>
  <div class="ticker-top-box">
    <div class="ticker-item ml-41" :key="i">
      <span
        :class="[
          'label',
          'fs-16',
          pageData?.change_ratio > 0 ? 'color-up' : 'color-down',
        ]"
        >{{ pageData?.close }}</span
      >
      <span class="value">${{ pageData?.close }}</span>
    </div>
    <div class="ticker-item ml-41">
      <span class="label">{{ t("message.home.24xiaoshizhangdie") }}</span
      ><span
        :class="[
          'value',
          pageData?.change_ratio > 0 ? 'color-up' : 'color-down',
        ]"
        >{{ pageData?.change_ratio > 0 ? "+" : ""
        }}{{ pageData?.change_ratio }}%</span
      >
    </div>
    <div class="ticker-item ml-41">
      <span class="label">24h{{ t("message.home.zuigao") }}</span>
      <span class="value">{{ pageData?.high }}</span>
    </div>
    <div class="ticker-item ml-41">
      <span class="label">24h{{ t("message.home.zuidi") }}</span>
      <span class="value">{{ pageData?.low }}</span>
    </div>
    <div class="ticker-item ml-41">
      <span class="label"
        >24h{{ t("message.home.liang") }}({{
          t(`${unitMap.amount[pageType]}`)
        }})</span
      >
      <span class="value">{{ pageData?.amount }} </span>
    </div>
    <div class="ticker-item ml-41">
      <span class="label"
        >24h{{ t("message.home.e") }}({{
          t(`${unitMap.volumn[pageType]}`)
        }})</span
      ><span class="value">{{ pageData?.volume }}</span>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({
  pageData: {
    type: Object,
    default: {},
  },
  pageType: {
    type: String,
    default: "etf",
  },
});
const unitMap = {
  amount: {
    etf: "message.home.wangu",
    usStocks: "message.home.wangu",
    coin: "USDT", //改成当前币种
    forex: "USD",
  },
  volumn: {
    etf: "message.home.wan",
    usStocks: "message.home.wan",
    forex: "USD",
    coin: "USDT",
  },
};
</script>
<style>
/* TODO  */

.trade-header-box .ticker-xl-box .ticker-top-box .ml-41 {
  margin-left: 41px;
}
</style>
