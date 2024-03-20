import { createI18n } from "vue-i18n";
import { getStorage, getBrowserLang } from "@/utils/index";
import forexEn from "./en/forex";
import loginEn from "./en/login";
import homeEn from "./en/home";
import userEn from "./en/user";
import hangqingEn from "./en/hangqing";
import jiaoyiEn from "./en/jiaoyi";

import forexZn from "./zh/forex";
import loginZn from "./zh/login";
import homeZn from "./zh/home";
import userZn from "./zh/user";
import hangqingZn from "./zh/hangqing";
import jiaoyiZn from "./zh/jiaoyi";
const lang = getStorage("lang");

const messages = {
  en: {
    ...forexEn,
    ...loginEn,
    message: {
      home: homeEn,
      user: userEn,
      hangqing: hangqingEn,
      jiaoyi: jiaoyiEn,
    },
  },
  "zh-CN": {
    //如果做key的文件分割，改动量太大，forex和login目前不做
    // forex: forexZn,
    // login: loginZn,
    ...loginZn,
    ...forexZn,
    message: {
      home: homeZn,
      user: userZn,
      hangqing: hangqingZn,
      jiaoyi: jiaoyiZn,
    },
  },
};

const i18n = createI18n({
  legacy: false,
  locale: lang,
  fallbackLocale: "en", // 设置备用语言
  messages,
  specialCharacters: {
    "@": "@",
  },
});

export default i18n;
