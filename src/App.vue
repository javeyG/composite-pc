<template>
  <div>
    <common-header v-if="route.meta.commonHeader"></common-header>
    <router-view />
    <!-- 客服 -->
    <div v-if="!show_kefu" class="service-box">
      <img
        src="@/assets/images/home/service1.png"
        alt=""
        width="60"
        height="60"
        @click="kefuBtn"
      />
    </div>
    <div v-if="!serviceUrl">
      <div v-if="show_kefu" class="kefu" style="z-index: 999999">
        <VueDragResize
          :isActive="true"
          :w="432"
          :h="620"
          v-on:resizing="resize"
          class="kefu-tuozhuai"
          @click="activateEv"
          :isResizable="false"
          v-on:dragging="resize"
        >
          <div class="kefu-title">
            <span>{{ $t("message.home.home43") }}</span>
            <img
              src="@/assets/images/home/Group609.png"
              @click="() => changeChatShow(false)"
            />
          </div>
          <div class="kegu-nrkegu-nr">
            <Chat ref="chatRef" />
          </div>
        </VueDragResize>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/store/user";
import { useRoute } from "vue-router";
import VueDragResize from "vue-drag-resize/src"; //https://blog.csdn.net/weixin_50644805/article/details/125980693
import { useLanguageStore } from "@/store/lang";
import CommonHeader from "@/components/layout/commonHeader.vue";
import Chat from "@/components/chat/index.vue";
import Axios from "@/api/login";

const langStore = useLanguageStore();
const userStore = useUserStore();
const route = useRoute();
const show_kefu = ref(false);

const chatUrl = ref("");
const serviceUrl = ref("");
const location = ref({});
const chatRef = ref();

onMounted(() => {
  const chatLng = ["en", "cn", "zh-CN"];
  const host_url = window.location.hostname;
  if (userStore.existToken) {
    chatUrl.value =
      "https://" +
      host_url +
      "/chat/#/?token=" +
      userStore.userInfo.token +
      "&lang=" +
      langStore.language;
  } else {
    chatUrl.value =
      "https://" + host_url + "/chat/#/?lang=" + langStore.language;
  }

  // Axios.getServiceUrl({
  //   code: "customer_service_url",
  // }).then((res) => {
  //   //第三方客服
  //   if (res.code == 0 && res.data.customer_service_url != "") {
  //     serviceUrl.value = res.data.customer_service_url;
  //   } else {
  //     //自有客服
  //     if (userStore.existToken) {
  //       chatUrl.value =
  //         "https://" +
  //         host_url +
  //         "/chat/#/?token=" +
  //         userStore.userInfo.token +
  //         "&lang=" +
  //         langStore.language;
  //     } else {
  //       chatUrl.value =
  //         "https://" + host_url + "/chat/#/?lang=" + langStore.language;
  //     }
  //   }
  // });
});

// 全局的错误
onErrorCaptured((err) => {
  console.log("APP Caught error", err);
  return false;
});
const activateEv = (index) => {
  // 文本框无法输入的问题
  if (chatRef.value && chatRef.value.$refs["input"]) {
    chatRef.value.$refs["input"].focus();
  }
};

const changeChatShow = (val) => {
  show_kefu.value = val;
};

const kefuBtn = () => {
  if (!serviceUrl.value) {
    changeChatShow(true);
  } else {
    window.open(serviceUrl.value);
  }
};

//拖拽事件
const handleResize = (newRect) => {
  location.value.width = newRect.width;
  location.value.height = newRect.height;
  location.value.top = newRect.top;
  location.value.left = newRect.left;
};
</script>

<!-- <style lang="scss" scoped></style> -->

<style>
#app {
  min-height: 100vh;
  overflow-x: hidden;
}
body {
  margin: 0;
}
/* 客服 */
.service-box {
  position: fixed;
  right: 15px;
  bottom: 1px;
  cursor: pointer;
  z-index: 9999;
}
.vdr.active:before {
  display: none;
}

.item-dropdown-wrapper.el-dropdown-menu,
.quotes-dropdown.el-dropdown-menu {
  background: #24282d !important;
  border: 1px solid #24282d !important;
}

.popper__arrow {
  border-bottom-color: #24282d !important;
}

.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #24282d !important;
}

.item-dropdown-wrapper .el-dropdown-menu__item:focus,
.item-dropdown-wrapper .el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: transparent !important;
  color: #1d91ff !important;
}

.quotes-dropdown.el-dropdown-menu {
  padding: 0 !important;
}

.quotes-dropdown .el-dropdown-menu__item {
  min-width: 60px !important;
  padding: 6px 13px !important;
}

.quotes-dropdown .el-dropdown-menu__item:hover {
  background: #2c3138 !important;
}
</style>
<style scoped>
.kefu {
  position: fixed;
  right: 500px;
  top: 200px;
  cursor: pointer;
  z-index: 3;
}
.embed-responsive-item {
  width: 100%;
  height: 100%;
  border: none;
}
.kefu-title {
  width: 100%;
  height: 61px;
  position: relative;
  text-align: center;
  background: linear-gradient(
    90.3deg,
    rgba(45, 45, 53, 0.71) 0.21%,
    #23232e 99.83%
  );
  border-radius: 10px 10px 0px 0px;
}
.kegu-nrkegu-nr {
  width: 100%;
  height: 559px;
}
.kefu-title span {
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 61px;
  color: #ffffff;
}
.kefu-title img {
  position: absolute;
  width: 30px;
  height: 30px;
  right: 21px;
  top: 16px;
}

::v-deep .kefu-title .date {
  color: #fff !important;
}
.kefu-tuozhuai {
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  outline: none;
  background: #ffffff;
  border-radius: 10px;
}
</style>
