<!-- 没有用到-->
<template>
  <div>
    <pc-section class="index-section1 py-12">
      <h2 class="mb-4">{{ t("m5-wh-i-s0-t1") }}</h2>
      <h5>{{ t("m5-wh-i-s0-d1") }}</h5>
    </pc-section>
    <menu-layout :collapseList="menu5List">
      <template v-slot:content> </template>
    </menu-layout>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { getImageUrl } from "@/utils";
import { menu5List } from "@/utils/path";

const route = useRoute();
const { t } = useI18n();

const list11 = Array(11);

const gotoPage = () => {};
</script>
<style lang="scss" scoped></style>
