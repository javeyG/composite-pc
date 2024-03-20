<!-- 语言 -->
<template>
  <div v-if="isShow">
    <div class="css-xplkkx">
      <div class="css-14doc9z">
        <div class="css-xhj0x8">
          <svg
            @click="OnShowAndClose"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            class="css-1iztezc"
          >
            <path
              d="M6.697 4.575L4.575 6.697 9.88 12l-5.304 5.303 2.122 2.122L12 14.12l5.303 5.304 2.122-2.122L14.12 12l5.304-5.303-2.122-2.122L12 9.88 6.697 4.575z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div class="css-1r3gvce">
          <div class="css-t94xhh">
            {{ t("message.user.yuyanhediqu") }}
          </div>
        </div>
        <div class="css-1tzfn88">
          <div class="css-cbzd9">
            <div class="css-1p8zxym">
              {{ t("message.user.qingxuanzeyuyanhediqu") }}
            </div>
            <div class="css-q2wk8b">
              <button
                data-active="true"
                id="fiatlngdialog_ba-languageRegion-zh-CN"
                :class="[
                  active == index ? 'rest_css-1szzq31' : '',
                  'css-1szzq3l',
                ]"
                v-for="(lang, index) in langArr"
                :key="index"
                @click="changeBtn(index, lang.key)"
                style="width: 125px"
              >
                <div class="css-1hv3jiv">
                  {{ langStore.language }}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="css-j1zueq"
                >
                  <use xlink:href="#checkmark-f"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import { useLanguageStore } from "@/store/lang";
import { setStorage } from "@/utils/index";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const langStore = useLanguageStore();
const active = ref(langArr.indexOf(langStore.language.value));
const isShow = ref(false);

const langArr = [
  {
    label: "简体中文",
    key: "zh-CN",
  },
  {
    label: "English",
    key: "en",
  },
];
const OnShowAndClose = () => {
  isShow.value = !isShow.value;
};

const changeBtn = (index, lang) => {
  active.value = index;
  langStore.updateLang(lang);
  this.OnShowAndClose();

  location.reload();
};
</script>
<style scoped>
@import url("@/assets/css/login/langPup.css");
</style>
