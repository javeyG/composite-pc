export const getImageUrl = (path) => {
  const modules = import.meta.glob("/src/assets/forexImages/**/*.png", {
    eager: true,
  });
  return modules[path].default;
};

export const getImages = (path) => {
  return new URL(`/src/assets/images/${path}`, import.meta.url).href;
};

export const handleSymbolImg = (name) => {
  if (!name) {
    return;
  }

  // usdthb

  let url;
  const newName = name.toLowerCase();
  if (
    newName === "usdt" ||
    newName === "usd" ||
    newName === "usdcusdt" ||
    newName === "usdthb" ||
    newName === "usdtwd"
  ) {
    url = "/symbol/" + newName + ".png"; //不用过滤
  } else {
    const regex = /(\/){0,1}usd(t){0,1}(\/){0,1}/i;
    const filterUSDName = newName.replace(regex, "");
    url = "/symbol/" + filterUSDName + ".png";
  }
  return new URL(url, import.meta.url).href;
};

// 设置localStorage
export const setStorage = function (key, obj) {
  let json = JSON.stringify(obj);
  window.localStorage.setItem(key, json);
};

// 获取localStorage
export const getStorage = function (key) {
  const str = window.localStorage.getItem(key);
  if (!str) {
    return null;
  }
  return JSON.parse(str);
};

// 移除
export const removeStorage = function (key) {
  window.localStorage.removeItem(key);
};
// 获取浏览器默认语言
export const getBrowserLang = function () {
  let browserLang = navigator.language
    ? navigator.language
    : navigator.browserLanguage;

  let defaultBrowserLang = "en";
  if (
    browserLang.toLowerCase() === "cn" ||
    browserLang.toLowerCase() === "zh" ||
    browserLang.toLowerCase() === "zh-cn"
  ) {
    defaultBrowserLang = "zh";
  }
  return defaultBrowserLang;
};

export const dataTime = (data, isTrue) => {
  var date = new Date(data);
  let Y = date.getFullYear() + "-";
  let M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  let D = date.getDate() + " ";
  let h = date.getHours() + ":";
  let m = date.getMinutes() + ":";
  let s = date.getSeconds();
  let str = Y + M + D;
  if (isTrue) {
    str = Y + M + D + h + m + s;
  } else {
    str = Y + M + D;
  }
  return str;
};

export const debounce = (fn, delay = 500) => {
  // timer 是在闭包中的
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
};

export function filterArrayEmpty(val) {
  let isEmpty = val.every((val) => {
    return val != "";
  });
  return isEmpty;
}

export function strFirstBit(val) {
  let arr = val.map((val, index, arr) => {
    return val.currency;
  });
  return arr;
}

export function addAndSubtr(val) {
  if (val >= 0) {
    return "+" + val + "%";
  } else if (val < 0) {
    return val + "%";
  } else {
    return "--";
  }
}

export function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  var middle = parseInt(arr.length / 2);
  var left = arr.slice(0, middle);
  var right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  var result = [];
  var i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i].create_time_ts > right[j].create_time_ts) {
      result.push(right[j++]);
    } else {
      result.push(left[i++]);
    }
  }
  while (i < left.length) {
    result.push(left[i++]);
  }
  while (j < right.length) {
    result.push(right[j++]);
  }

  return result;
}
