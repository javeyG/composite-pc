<template>
  <div id="dropdown">
    <el-dropdown>
      <div class="cursor-pointer right-wrapper">
        <span>{{ title }}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu slot="dropdown" class="item-dropdown-wrapper">
        <el-dropdown-item
            v-for="(item, index) in list"
            :key="index"
        >{{ item }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "ItemDropdown",
  props: ['title', 'list']
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.right-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.right-wrapper span {
  margin-right: 6px;
  color: #1D91FF;
}

::v-deep .el-dropdown-menu__item {
  font-size: 12px;
  color: #B7BDC6;
}
</style>

<style>

</style>