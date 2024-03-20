<template>
  <div class="step-box">
    <el-steps align-center :active="stepIndex" finish-status="success">
      <el-step :title="$t('zhanghaozhuce')">></el-step>
      <el-step :title="$t('message.user.shimingrenzheng')"></el-step>
      <el-step :title="$t('anquanbangding')"></el-step>
      <el-step :title="$t('message.home.home6')"></el-step>
    </el-steps>
  </div>
</template>
<script setup>
const props = defineProps({
  stepIndex: {
    type: Number,
    default: 1,
  },
});
</script>

<style scoped lang="css">
.step-box {
  width: 400px;
  margin: 0 auto;
  margin-bottom: 30px;
}

::v-deep .el-step__head.is-success {
  color: #2ebd85 !important;
  border-color: #2ebd85 !important;
}

::v-deep .el-step__head.is-success .el-step__icon.is-text {
  background: #2ebd85;
  color: #fff !important;
}

::v-deep .el-step__title.is-success {
  color: #2ebd85 !important;
}

::v-deep .el-step__icon {
  width: 35px;
  height: 35px;
  background: #e5e9f0;
  color: #fff;
  border-color: #e5e9f0;
}

::v-deep .el-step.is-center .el-step__line {
  top: 48% !important;
}

::v-deep .el-step__title.is-process {
  color: #c0c4cc;
  font-weight: initial;
}

::v-deep .el-step__title {
  font-size: 14px;
  line-height: 24px;
}
</style>
