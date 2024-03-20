const forexTradeRoutes = [
  // {
  //   path: "/forex/spot/:id",
  //   label: "spot",
  //   meta: {
  //     commonHeader: true,
  //   },
  //   component: () => import("@/views/forexTrade/spot/index.vue"),
  // },
  {
    path: "/forex/constract/:id",
    label: "constarct",
    meta: {
      commonHeader: true,
    },
    component: () => import("@/views/forexTrade/constract/index.vue"),
  },
];

export { forexTradeRoutes };
