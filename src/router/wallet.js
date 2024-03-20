const walletRoutes = [
  {
    meta: {
      commonHeader: true,
    },
    path: "/wallet",
    name: "walletIndex",
    component: () => import("@/views/wallet/walletIndex.vue"),
    children: [
      {
        path: "/wallet/walletOverview",
        name: "walletOverview",
        component: () => import("@/views/wallet/menu/walletOverview.vue"),
      }, //钱包总览
      {
        path: "/wallet/financialAccounts",
        name: "financialAccounts",
        component: () => import("@/views/wallet/financialAccounts.vue"),
      }, //理财账户

      {
        path: "/wallet/etfAccounts",
        name: "etfAccounts",
        component: () => import("@/views/wallet/menu/etf.vue"),
      }, //etf
      {
        path: "/wallet/cryptosAccounts",
        name: "cryptosAccounts",
        component: () => import("@/views/wallet/menu/cryptos.vue"),
      }, //cryptos
      {
        path: "/wallet/forexAccounts",
        name: "forexAccounts",
        component: () => import("@/views/wallet/menu/forex.vue"),
      }, //forex
      {
        path: "/wallet/usStocksAccounts",
        name: "usStocksAccounts",
        component: () => import("@/views/wallet/menu/usStocks.vue"),
      }, //etf
    ],
  },
  {
    meta: {
      commonHeader: true,
    },
    path: "/recharge",
    name: "recharge",
    component: () => import("@/views/wallet/recharge.vue"),
  }, //充值
  {
    meta: {
      commonHeader: true,
    },
    path: "/withdraw",
    name: "withdraw",
    component: () => import("@/views/wallet/withdraw.vue"),
  }, //提现
  {
    meta: {
      commonHeader: true,
    },
    path: "/exchange",
    name: "exchange",
    component: () => import("@/views/wallet/exchange.vue"),
  }, //兑换
];

export { walletRoutes };
