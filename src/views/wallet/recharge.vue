<!-- 充值 -->
<template>
  <div id="__APP">
    <main class="css-1wr4jig">
      <main class="css-xry4yv">
        <div class="css-1ay57iv">
          <!-- 头部 -->
          <div class="css-8hzjvg">
            <div class="css-1eklhqk">
              <div class="css-190uhut">
                <div class="css-11y6cix">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    class="css-146agw4"
                    @click="OnClickPre"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.934 12l3.89 3.89-1.769 1.767L8.398 12l1.768-1.768 3.89-3.889 1.767 1.768-3.889 3.89z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <div class="css-1djsyd6">
                    {{ $t("message.user.shuzihuobichongzhi") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 内容 -->
          <div class="css-1dihobw">
            <div class="css-1eklhqk">
              <div class="css-tu2ioc">
                <!-- form -->
                <div class="css-1ekpz1z mr-126">
                  <!-- 选择币种 -->
                  <div class="css-av4be8">
                    <div class="css-1x9w05y">
                      {{ $t("message.user.xuanzebizhong") }}
                    </div>

                    <div class="css-pnaw5u">
                      <!-- 右边 -->
                      <div class="css-16vu25q">
                        <div class="css-7ng27">
                          {{ $t("message.user.bizhong2") }}
                        </div>
                        <!-- 下拉框 -->
                        <div class="css-1dozx3h" @click="OnclickShow">
                          <div class="css-gg0wwx">
                            <img
                              :src="
                                handleSymbolImg(listOpData[biChooseIndex].icon)
                              "
                              width="24"
                              height="24"
                            />
                            <div class="css-15k81fw">
                              <div class="css-4cffwv">
                                <span class="css-1jq4ozh">{{
                                  listOpData[biChooseIndex].name
                                }}</span>
                              </div>
                            </div>
                          </div>
                          <el-icon><CaretBottom /></el-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 充值地址 -->
                  <div class="css-1oi6dii">
                    <div class="css-1x9w05y">
                      {{ $t("message.user.chongzhidizhi") }}
                    </div>
                    <div class="css-pnaw5u">
                      <!-- 转账网络 -->
                      <div class="css-6hm6tl">
                        <div class="css-16vu25q">
                          <div class="css-7ng27">
                            {{ $t("message.user.zhuanzhangwangluo") }}
                          </div>
                          <div class="css-1dozx3h">
                            <div class="css-1pysja1" @click="OnclickShow1">
                              <div class="css-151whd6">
                                <div class="css-1c82c04">
                                  {{ listOpData1[blockchainIndex].name }}
                                </div>
                              </div>
                            </div>
                            <el-icon><CaretBottom /></el-icon>
                          </div>
                        </div>

                        <!-- 提示信息 -->
                        <div>
                          <div class="css-15owl46">
                            <div
                              :class="
                                m_showCode ? 'css-cks8qc' : 'css-cks8qcnone'
                              "
                              @click="ShowCode"
                            >
                              <img
                                :src="this.imgURl"
                                style="height: 120px; width: 120px"
                              />
                              <div>
                                {{ $t("message.user.shiyongjiaoyiping") }}
                              </div>
                            </div>
                            <!-- 地址 -->
                            <div class="css-6hm6tl my24">
                              <div>
                                {{ $t("message.user.dizhi") }}
                              </div>
                              <div class="css-1cgf63r flex">
                                <input
                                  type="text"
                                  name="FirstName"
                                  v-model="address"
                                  ref="copytxt"
                                  readonly
                                  class="css-vurnku noborder"
                                  style="width: 320px"
                                />
                                <!-- 复制icon -->
                                <div class="css-c1olmu">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    class="css-kmjxx1"
                                    @click="copy"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M9 3h11v13h-3V6H9V3zM4 8v13h11V8.02L4 8z"
                                      fill="currentColor"
                                    ></path>
                                  </svg>
                                </div>
                                <!-- 二维码icon -->
                                <div class="css-c1olmu">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    class="css-1en91pv"
                                    @click="ShowCode"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm11 0h-2v4h4v-2h3v-2h-4v2h-1v-2zm5 3h-2v2h-2v2h4v-4zm-5 2h-2v2h2v-2zM13 4h7v7h-7V4zM8.5 6.5h-2v2h2v-2zm-2 9h2v2h-2v-2zm11-9h-2v2h2v-2z"
                                      fill="currentColor"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <!-- 预计到账 -->
                            <div class="my24">
                              <div class="css-4cffwv">
                                <div class="css-15slc0p">
                                  <div class="css-1hufmyh">
                                    {{ $t("message.user.yujidaozhang") }}
                                  </div>
                                  <div class="css-s3l2jm">
                                    <span class="css-197ji3y">1</span>
                                    {{ $t("message.user.ciwangluoqueren") }}
                                  </div>
                                </div>
                                <div class="css-15slc0p">
                                  <div class="css-1hufmyh">
                                    {{ $t("message.user.yujijiesuo") }}
                                  </div>
                                  <div class="css-s3l2jm">
                                    <span class="css-197ji3y">1</span>
                                    {{ $t("message.user.ciwangluoqueren2") }}
                                  </div>
                                </div>
                              </div>
                              <div class="css-1dnnrwx my-16 flex">
                                <div class="css-1hufmyh">
                                  {{
                                    $t("message.user.zuixiaobizhongshuliang")
                                  }}
                                </div>
                                <div class="css-s3l2jm fw-500">1 USDT</div>
                              </div>
                            </div>
                          </div>

                          <div class="css-1mky3oo my24">
                            <div>
                              {{ $t("message.user.ti4")
                              }}<span class="css-vr1wsl">{{ coin }}</span>
                            </div>
                            <div>
                              {{ $t("message.user.ti5")
                              }}<span class="css-1s8b8jd">{{
                                blockchain_name
                              }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 充币数量 -->
                  <div class="css-1oi6dii">
                    <div class="css-1x9w05y">
                      {{ $t("message.user.ti6") }}
                    </div>
                    <div>
                      <el-input
                        style="height: 48px"
                        :placeholder="$t('message.user.ti7')"
                        class="css-1c82c04"
                        type="number"
                        v-model="quantity"
                      ></el-input>
                    </div>
                  </div>
                  <!-- 上传凭证 -->
                  <div class="css-1oi6dii">
                    <div class="css-1x9w05y">
                      {{ $t("message.home.shangchuanfukuanpingzheng") }}
                    </div>
                    <div class="text-center">
                      <el-upload
                        class="avatar-uploader"
                        :action="`${nowUrl}/api/api/uploadFile`"
                        accept=".jpg,.jpeg,.png,.gif.JPG,.JPEG,.PNG,.GIF"
                        :show-file-list="false"
                        :on-success="handelDoucumentsFront"
                        :on-error="onErrorUpload"
                        :before-upload="beforeAvatarUpload"
                      >
                        <img v-if="oneImg" :src="oneImg" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"
                          ><Plus
                        /></el-icon>
                      </el-upload>
                      <p>{{ $t("message.home.fukuanpingzheng") }}</p>
                    </div>
                  </div>
                  <!-- 充币按钮 -->
                  <div class="css-1oi6dii">
                    <div class="css-1x9w05y"></div>
                    <div style="display: flex; width: 100%">
                      <el-button
                        type="primary"
                        style="width: 100%"
                        @click="handleRecharge"
                      >
                        {{ $t("message.user.ti8") }}</el-button
                      >
                    </div>
                  </div>
                </div>
                <!-- 充值未到账 -->
                <div class="css-107bu5v">
                  <div class="css-vurnku">
                    <div class="css-4krk71">{{ $t("message.user.ti9") }}？</div>
                    <div class="css-17bmjki recharge-question-box">
                      <div>{{ $t("message.user.ti10") }}。</div>
                      <div class="recharge-question-text">
                        <div>* {{ $t("message.user.ti11") }}</div>
                        <div>* {{ $t("message.user.ti12") }}Tag/Memo</div>
                        <div>* {{ $t("message.user.ti13") }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 近期充值记录 -->
                <div class="css-wmh5d4">
                  <div class="css-vurnku">
                    <div class="css-1k1bx0u" v-if="listData.length > 0">
                      {{ $t("message.user.ti15") }}
                    </div>
                    <!-- 列表 -->
                    <div
                      class="css-r27jgl"
                      v-for="item in listData"
                      :key="item.order_no"
                    >
                      <div class="css-1pysja1">
                        <!-- 数量 币种 状态 -->
                        <div class="css-60y5z1">
                          <div class="css-10nf7hq">
                            <div class="css-10nf7hq">
                              <img
                                class="css-1plro70"
                                :src="handleSymbolImg(item.coin)"
                              />
                              <div class="css-1iq5991">
                                {{ item.amount }} {{ item.coin }}
                              </div>
                            </div>
                            <div class="css-vurnku">
                              <div class="css-1f9551p">
                                <div
                                  class="css-jyc5uj"
                                  style="
                                    background-color: rgb(201, 148, 0);
                                    color: white;
                                  "
                                  v-if="item.status == 0"
                                >
                                  {{ $t("message.user.ti17") }}
                                </div>
                                <div class="css-jyc5uj" v-if="item.status == 1">
                                  {{ $t("message.user.ti18") }}
                                </div>
                                <div style="display: flex">
                                  <div
                                    class="css-jyc5uj"
                                    v-if="item.status == 2"
                                    style="background-color: red; color: white"
                                  >
                                    {{ $t("message.user.shibai") }}
                                  </div>
                                  <div
                                    v-if="item.status == 2"
                                    style="margin-left: 30px"
                                  >
                                    <span
                                      >{{ $t("message.user.yuanyin") }}:</span
                                    >
                                    <span>{{ item.failure_msg }}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- 时间 地址 -->
                        <div class="css-kzcb6r">
                          <div class="css-cp92rp">
                            <div class="css-ig082u">
                              {{ item.createTime }}
                            </div>
                          </div>
                          <div class="css-cp92rp">
                            <div class="css-190cj18">
                              {{ $t("message.user.ti19") }}
                            </div>
                            <div class="css-ig082u">
                              {{ item.coin_blockchain }}
                            </div>
                          </div>
                          <div class="css-cp92rp">
                            <div class="css-190cj18">
                              {{ $t("message.user.ti20") }}
                            </div>
                            <div class="css-ig082u">
                              {{ item.from }}
                            </div>
                          </div>
                          <div class="css-cp92rp">
                            <div class="css-190cj18">TxID</div>
                            <div class="css-ig082u">
                              <div class="css-1f9551p">
                                <div class="css-vurnku">
                                  {{ item.tx ? item.tx : "--" }}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="css-cp92rp">
                            <div class="css-190cj18">
                              {{ $t("message.user.ti21") }}
                            </div>
                            <div class="css-ig082u">
                              {{ $t("message.user.ti22") }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 查看全部跳转到钱包历史记录页面 -->
                    <div class="margin-top20 mouse-cursor">
                      <a
                        v-if="listData.length > 0"
                        class="css-1911t1t"
                        @click="goRouter('/order/walletHistory')"
                      >
                        {{ $t("message.user.ti23") }}</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </main>
    <list-coins
      :inTitle="listTitle"
      :inIsShowPop="showListcoin"
      :callbackState="ListChangeShow"
      :inLstOption="listOpData"
      :callbackChoose="cbCoinChoose"
    ></list-coins>
    <list-coins
      :inTitle="listTitle1"
      :inIsShowPop="showListcoin1"
      :callbackState="ListChangeShow1"
      :noteTitle="noteTitle"
      :inLstOption="listOpData1"
      :callbackChoose="cbCoinChoose1"
    ></list-coins>
  </div>
</template>
<script>
import Axios2 from "@/api/wallet.js";
import { handleSymbolImg } from "@/utils";
import ListCoins from "@/components/my/listCoins.vue";
import { Plus, CaretBottom, ArrowLeftBold } from "@element-plus/icons-vue";

export default {
  components: { Plus, CaretBottom, ListCoins },
  data() {
    return {
      showListcoin: false,
      listTitle: this.$t("message.user.ti24"),
      listOpData: [
        { icon: "usdt", name: "USDT" },
        { icon: "btc", name: "BTC" },
        { icon: "eth", name: "ETH" },
      ],
      biChooseIndex: 0,
      showListcoin1: false,
      listTitle1: this.$t("message.user.ti25"),
      noteTitle: this.$t("message.user.ti26"),
      listOpData1: [
        { icon: "usdt", name: "Trc20", code: "USDT" },
        { icon: "btc", name: "Trc201", code: "USDT" },
        { icon: "eth", name: "Trc202", code: "USDT" },
      ],
      blockchainIndex: 0,
      blockchain_name: "",
      coin: "USDT",
      address: "",
      codeImg: "",
      blockchain: {},
      imgURl: "",
      m_showCode: false,
      quantity: "", //充币数量
      session_token: "", //用于充币提交接口需传的参数
      listData: [], //列表数据
      rechargeImg: "", //上传接口的图片
      nowUrl: "",
      oneImg: "", //上传后展示的图片
    };
  },
  mounted() {
    this.nowUrl = "https://enjdhdg.site";
    let spToken = localStorage.getItem("spToken");
    if (spToken) {
      this.getAddress();
      this.getSessionToken();
      this.getRechargeRecord();
    }
  },
  methods: {
    handleSymbolImg,
    //上传付款凭证
    handelDoucumentsFront(res, file) {
      const { path, httpUrl } = res.data;
      this.oneImg = httpUrl;
      this.rechargeImg = path;
    },
    onErrorUpload() {
      this.$message.warning(this.$t("message.user.shangchuan3"));
    },
    beforeAvatarUpload(file) {
      let types = [
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "image/bmp",
        "image/png",
      ];
      const isImage = types.includes(file.type);
      const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isImage) {
        this.$message.error(this.$t("message.user.shangchuan1"));
      }
      if (!isLt5M) {
        this.$message.error(this.$t("message.user.shangchuan2"));
      }
      return isImage && isLt5M;
    },
    ShowCode() {
      this.m_showCode = !this.m_showCode;
    },
    cbCoinChoose(id) {
      this.biChooseIndex = id;
      this.showListcoin = false;
      this.coin = this.listOpData[id].name;
      this.getAddress();
    },

    OnclickShow() {
      this.showListcoin = true;
      // this.showListcoin = !this.showListcoin;
      //console.error(this.showListcoin);
    },
    ListChangeShow(state) {
      this.showListcoin = state;
    },

    cbCoinChoose1(id) {
      this.blockchainIndex = id;
      this.address = this.blockchain[id].address;
      this.blockchain_name = this.blockchain[id].blockchain_name;
      this.showListcoin1 = false;
      console.log(this.address, this.blockchain_name);
    },

    OnclickShow1() {
      this.showListcoin1 = !this.showListcoin;
    },
    ListChangeShow1(state) {
      this.showListcoin1 = state;
    },
    //获取sessionToken
    getSessionToken() {
      Axios2.url("/api/rechargeBlockchain/rechargeOpen").then((res) => {
        this.session_token = res.data.session_token;
      });
    },
    getAddress() {
      Axios2.url("api/channelBlockchain!getBlockchainName.action", {
        coin: this.coin,
      }).then((res) => {
        this.blockchain = res.data;
        this.listOpData1 = [];
        for (var i in res.data) {
          this.listOpData1.push({
            icon: res.data[i].coin,
            name: res.data[i].blockchain_name,
          });
        }
        this.blockchainIndex = 0;
        this.address = this.blockchain[0].address;
        this.imgURl = this.blockchain[0].img; //TODO 接口返回的地址有问题
        this.codeImg =
          this.blockchain[0].img + "&timestamp=" + new Date().getTime();
        this.blockchain_name = this.blockchain[0].blockchain_name;
        this.coin = this.blockchain[0].coin;
      });
    },
    copy() {
      var input = this.$refs["copytxt"];
      input.select();
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        message: this.$t("message.user.fuzhichenggong"),
        type: "success",
      });
    },
    //充币
    handleRecharge() {
      if (this.quantity && this.quantity > 0) {
        Axios2.url("api/rechargeBlockchain/recharge", {
          session_token: this.session_token,
          amount: this.quantity,
          from: this.address,
          blockchain_name: this.blockchain_name,
          coin: this.coin,
          channel_address: this.address,
          tx: "",
          img: this.rechargeImg,
        }).then((res) => {
          this.getSessionToken();
          if (res.code == "0") {
            this.$message.success(this.$t("message.user.ti27"));
            this.quantity = "";
            this.rechargeImg = "";
            this.oneImg = "";
            this.getRechargeRecord();
          }
        });
      } else {
        this.$message.error(this.$t("message.user.xian33"));
      }
    },
    OnClickPre() {
      this.$router.go(-1);
    },
    //充币记录
    getRechargeRecord() {
      Axios2.url("api/rechargeBlockchain/list", {
        page_no: 1,
      }).then((res) => {
        this.listData = res.data.slice(0, 5);
      });
    },
    goRouter(parmas) {
      this.$router.push(parmas);
    },
  },
};
</script>

<style>
@import "../../assets/wallet/recharge.css";
.noborder {
  border: 0px;
}
.my24 {
  margin: 24px 0;
}
.my-16 {
  margin: 24px 0;
}

.mr-126 {
  margin-right: 126px;
}
.flex {
  display: flex;
}

.fw-500 {
  font-weight: 500;
}

.css-cks8qc {
  box-sizing: border-box;
  margin: 24px 0px 0px;
  min-width: 0px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  padding-top: 24px;
  padding-bottom: 24px;
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
}

.avatar {
  width: 110px;
  height: 110px;
  display: block;
}

.css-cks8qcnone {
  box-sizing: border-box;
  margin: 24px 0px 0px;
  min-width: 0px;
  display: none;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  padding-top: 24px;
  padding-bottom: 24px;
}
</style>
