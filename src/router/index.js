import { createRouter, createWebHashHistory } from "vue-router";
import { forexRoutes } from "./forex";
import { loginRoutes } from "./login";
import { etfRoutes } from "./etf";
import { coinRoutes } from "./coin";
import { myRoutes } from "./my";
import { walletRoutes } from "./wallet";
import { orderRoutes } from "./order";
import { wealthRoutes } from "./wealth";
import { usStocksRoutes } from "./usStocks";
import { marketRoutes } from "./market";
import { forexTradeRoutes } from "./forexTrade";
import { useUserStore } from "@/store/user";
import { useLanguageStore } from "@/store/lang";
const routes = [
  ...forexRoutes,
  ...loginRoutes,
  ...etfRoutes,
  ...myRoutes,
  ...orderRoutes,
  ...walletRoutes,
  ...wealthRoutes,
  ...coinRoutes,
  ...usStocksRoutes,
  ...marketRoutes,
  ...forexTradeRoutes,
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  useUserStore();
  useLanguageStore();
  window.scrollTo(0, 0);
  next();
});
export default router;
