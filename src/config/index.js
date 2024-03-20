// let pro_url = window.location.hostname;
// let env_url = 'thasjhdhjg.site'//交易站生产
//之前的交易站

// let env_url = "hajhiug.com";
// let ENV_DEV = "https://" + env_url + "/wap/"; // dev
// let ENV_PRO = "https://" + pro_url + "/wap/";
// let HOST_URL = "";
// let BASE_URL = "";
// let WS_URL = "";
//综合盘
let env_url = "www.n9cj.xyz";
let pro_url = "www.n9cj.xyz";
let ENV_DEV = "https://" + env_url + "/"; // dev
let ENV_PRO = "https://" + pro_url + "/";
let HOST_URL = "";
let BASE_URL = "";
let WS_URL = "";

HOST_URL = "https://" + env_url;
BASE_URL = ENV_DEV;
WS_URL = `wss://${env_url}/api/websocket`;

// if (process.env.NODE_ENV === "development") {
//   HOST_URL = "https://" + env_url;
//   BASE_URL = ENV_DEV;
//   WS_URL = `wss://${env_url}/api/api/websocket`;
// } else {
//   HOST_URL = "https://" + pro_url;
//   BASE_URL = ENV_PRO;
//   WS_URL = `wss://thasjhdhjg.site/data/websocket`; // 演示环境
// }

export default {
  HOST_URL,
  BASE_URL,
  WS_URL,
};
