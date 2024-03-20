import axios from "axios";
import URL from "@/config/index";
import router from "@/router";
import allTits from "@/i18n/back";
import pinia from "@/store/index";
import { useUserStore } from "@/store/user";

import { ElMessage } from "element-plus";
import { getStorage, removeStorage, setStorage, getBrowserLang } from "@/utils";

const getStore = () => {
  const userStore = useUserStore(); //不放在函数里会导致持久化有问题

  return {
    userStore,
  };
};

var lang = JSON.parse(localStorage.getItem("lang"));
axios.defaults.timeout = 15000;
axios.defaults.baseURL = URL.BASE_URL;
axios.interceptors.request.use(
  (config) => {
    const token = getStorage("spToken");
    if (token) {
      config.headers["Token"] = token;
    }

    if (!config.url.includes("language")) {
      const newUrl = `${config.url}?language=${lang}`;
      config.url = newUrl;
    }

    return config;
  },
  (error) => {
    console.log("request error--", error);
    return Promise.reject(error);
  }
);

const handleClearLoginInfo = () => {
  getStore().userStore.resetUserInfo();
  localStorage.clear();
  removeStorage("username");
  removeStorage("spToken");
  removeStorage("vuex");
  router.push("/login");
};

//http response 拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.code != 0) {
      let lanTits = "";
      //判断语言
      if (lang == "en") {
        lanTits = "tits_en";
      } else if (lang == "zh-CN") {
        lanTits = "tits_zh-CN";
      } else if (lang == "cht") {
        lanTits = "tits_CN";
      } else if (lang == "fr") {
        lanTits = "tits_fr";
      }

      //403表示接口失效
      if (response.data.code == "403" || response.data.code == "401") {
        handleClearLoginInfo();
      }
      if (allTits[lanTits] && allTits[lanTits][response.data.msg]) {
        ElMessage.error(allTits[lanTits][response.data.msg]);
      } else {
        ElMessage.error(response.data.msg);
      }
      return Promise.reject(response);
    }
    return response;
  },
  (error) => {
    // 401表示接口失效
    if (error.response.status === 401) {
      handleClearLoginInfo();
    }
    console.log("reject", error);
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

export function postFormData(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url,
      data,
      transformRequest: [
        function (data) {
          let ret = "";
          for (let it in data) {
            ret +=
              encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
          }
          ret = ret.substring(0, ret.lastIndexOf("&"));
          return ret;
        },
      ],
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
export default { fetch, post, postFormData };
