import { defineStore } from "pinia";
import { getStorage, setStorage, getBrowserLang } from "@/utils/index";
const curlang = getStorage("lang") || "en";

if (!getStorage("lang")) {
  setStorage("lang", curlang);
}
export const useLanguageStore = defineStore("language", {
  // state 持久化
  persist: true,
  state: () => {
    return {
      language: getStorage("lang") || "en",
      // language: getStorage("lang") || getBrowserLang(), // 项目初始化时，默认为浏览器的语言,
    };
  },
  actions: {
    updateLang(locale) {
      this.language = locale;
      setStorage("lang", locale);
    },
  },
});
