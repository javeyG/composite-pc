<template>
  <el-tabs v-model="activeName" class="order-tab" @tab-click="handleClick">
    <el-tab-pane :label="`ETF ${t('message.user.xianhuolishi')}`" name="spot">
      <spotOrder v-if="activeName === 'spot'" type="indices"></spotOrder>
    </el-tab-pane>
    <el-tab-pane :label="`ETF ${t('message.user.heyuelishi')}`" name="contract">
      <contractHistoryOrder
        v-if="activeName === 'contract'"
        type="indices"
      ></contractHistoryOrder>
    </el-tab-pane>
    <el-tab-pane
      :label="`ETF ${t('message.user.jiaogelishi')}`"
      name="delivery"
    >
      <deliveryHistoryOrder
        v-if="activeName === 'delivery'"
        type="indices"
      ></deliveryHistoryOrder>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import contractHistoryOrder from "../contractHistoryOrder.vue";
import deliveryHistoryOrder from "../deliveryHistoryOrder.vue";
import spotOrder from "../spotOrder.vue";
import { useI18n } from "vue-i18n";
const activeName = ref("spot");
const { t } = useI18n();

const handleClick = (tab, event) => {
  console.log(tab, event);
};
</script>
<style>
.order-tab > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
