<!-- 布局入口 -->
<template>
  <div class="app-box">
    <div class="box-view">
      <!-- left -->
      <div class="left-view">
        <div
          v-for="(it, i) in list"
          :key="i"
          class="menu-list"
          :class="selectPath == it.url ? 'menu-active-color' : ''"
          @click="goRouter(it.url)"
        >
          <img :src="$getImages(`headIcon/wallet-menu/${it.imgKey}.png`)" />
          <span>{{ $t(`message.user.${it.label}`) }}</span>
        </div>
      </div>
      <!-- right -->
      <div class="right-view">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const selectPath = ref("");

const list = [
  {
    imgKey: "etf",
    label: "etflishi",
    url: "/order/etfOrder",
  },
  {
    imgKey: "forex",
    label: "waihuilishi",
    url: "/order/forexOrder",
  },

  {
    imgKey: "cryptos",
    label: "shuzihuobilishi",
    url: "/order/coinOrder",
  },
  {
    imgKey: "us",
    label: "meigulishi",
    url: "/order/usStocksOrder",
  },

  {
    imgKey: "financial-account",
    label: "licailishi",
    url: "/order/financialOrder",
  },
  {
    imgKey: "record",
    label: "zhangbianjilu",
    url: "/order/changeRecord",
  },
  {
    imgKey: "wallet-history",
    label: "qianbaolishi",
    url: "/order/walletHistory",
  },
  {
    imgKey: "exchange",
    label: "duihuanlishi",
    url: "/order/exchangeOrder",
  },
];

watch(
  () => route.path,
  (newPath, oldPath) => {
    selectPath.value = newPath;
  },
  { immediate: true }
);

const goRouter = (parmas) => {
  router.push(parmas);
};
</script>
<style lang="scss">
@import url("@/assets/css/order/index.scss");
</style>
