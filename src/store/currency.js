import { defineStore } from "pinia";

export const useCurrencyStore = defineStore("currency", {
  // state 持久化,存储在了storage里面
  persist: true,
  state: () => {
    return {
      etfCurrency: [], //币种
      usStocksCurrency: [],
      coinCurrency: [],
      forexCurrency: [],
    };
  },

  actions: {
    updateCurrency(val, type) {
      switch (type) {
        case "etf":
          this.etfCurrency = val;
          break;
        case "usStocks":
          this.usStocksCurrency = val;
          break;
        case "coin":
          this.coinCurrency = val;
          break;
        default:
          this.forexCurrency = val;
      }
    },
  },
});
