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
    imgKey: "wallet-overview",
    label: "qianbaozonglan",
    url: "/wallet/walletOverview",
  },
  {
    imgKey: "etf",
    label: "etfZhanghu",
    url: "/wallet/etfAccounts",
  },
  {
    imgKey: "forex",
    label: "waihuiZhanghu",
    url: "/wallet/forexAccounts",
  },
  {
    imgKey: "cryptos",
    label: "shuzihuobiZhanghu",
    url: "/wallet/cryptosAccounts",
  },
  {
    imgKey: "us",
    label: "meiguZhanghu",
    url: "/wallet/usStocksAccounts",
  },

  {
    imgKey: "financial-account",
    label: "licaizhanghu",
    url: "/wallet/financialAccounts",
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
