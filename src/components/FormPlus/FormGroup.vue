<template>
  <div id="formGroup">
    <el-card
      v-if="component === 'card'"
      v-bind="componentProps"
      :header="label"
    >
      <slot />
    </el-card>

    <div v-if="component === 'divider'" style="margin-bottom: 60px">
      <el-divider style="margin-bottom: 40px">{{ label }}</el-divider>
      <slot />
    </div>

    <el-form-item
      id="form-item"
      :label-width="labelWidth"
      :label="label"
      v-if="component === 'inline'"
      class="inline"
    >
      <slot />
    </el-form-item>
  </div>
</template>

<script setup lang="jsx">
import { defineProps, inject } from "vue";

defineProps({
  component: String,
  label: String,
  componentProps: Object,
});

const labelWidth = inject("labelWidth");
</script>

<style lang="less" scoped>
#formGroup {
  margin-bottom: 10px;
}
.inline {
  display: flex;
  width: 100%;
}
</style>
