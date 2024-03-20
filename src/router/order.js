// 路由规则
const orderRoutes = [
  {
    path: "/order",
    name: "orderIndex",
    meta: {
      commonHeader: true,
    },
    component: () => import("@/views/order/orderLayout.vue"),
    children: [
      {
        path: "/order/etfOrder",
        component: () => import("@/views/order/etf/index.vue"),
      },
      {
        path: "/order/forexOrder",

        component: () => import("@/views/order/forex/index.vue"),
      },
      {
        path: "/order/coinOrder",
        component: () => import("@/views/order/coins/index.vue"),
      },
      {
        path: "/order/usStocksOrder",
        component: () => import("@/views/order/usStocks/index.vue"),
      },
      {
        path: "/order/exchangeOrder",
        component: () => import("@/views/order/exchangeHistory.vue"),
      },
      {
        path: "/order/financialOrder",
        component: () => import("@/views/order/financialHistory.vue"),
      },
      {
        path: "/order/changeRecord",
        component: () => import("@/views/order/changeRecord.vue"),
      },
      {
        path: "/order/walletHistory",
        component: () => import("@/views/order/walletHistory.vue"),
      }, //钱包历史记录
    ],
  },
];

export { orderRoutes };
