<template>
  <div class="CanvasGroup">
    <el-card v-if="component === 'card'" :header="label">
      <slot />
    </el-card>

    <div v-if="component === 'divider'" style="margin-bottom: 60px">
      <el-divider style="margin-bottom: 40px">{{ label }}</el-divider>
      <slot />
    </div>

    <div v-if="['formList'].includes(component)" class="default">
      <div class="title">{{ label }}</div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="jsx">
import { defineProps } from "vue";

defineProps({
  label: String,
  name: String,
  component: String,
  required: Boolean,
  modelValue: null,
  initialValue: null,
});
</script>

<style lang="less" scoped>
.CanvasGroup {
  margin-bottom: 10px;
  .default {
    border: 2px dashed var(--el-color-primary);
    margin: 10px;
    position: relative;
    .title {
      position: absolute;
      left: 0;
      top: -20px;
      padding: 1px 5px;
      background-color: var(--el-color-primary);
      font-size: 12px;
      color: #fff;
    }
  }
}
</style>
