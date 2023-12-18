<template>
  <div
    :class="['canvas-item', element.onlyId === current.onlyId && 'active']"
    @click.stop="handleSelect(element)"
  >
    <div class="actions" v-if="element.onlyId === current.onlyId">
      <el-button
        :icon="Delete"
        size="small"
        type="primary"
        @click.stop="handleDelete(element)"
      ></el-button>
    </div>

    <canvas-group v-if="element.children" v-bind="element" :hidden="false" />

    <form-item
      v-else
      v-bind="element"
      :props="checkProps(element.props)"
      class="form-item-btn"
    />
  </div>
</template>

<script setup lang="jsx">
import { defineProps, inject } from "vue";
import { omit } from "lodash";
import { Delete } from "@element-plus/icons-vue";
import CanvasGroup from "./CanvasGroup.vue";
import { FormItem } from "../../components";

defineProps({
  element: Object,
  index: null,
});

const current = inject("$current");

const handleSelect = inject("handleSelect");

const handleDelete = inject("handleDelete");

const checkProps = (props) => {
  return omit(props, ["multiple", "autoSelectedFirst"]);
};
</script>

<style lang="less">
.childContainer {
  min-height: 150px;
}
</style>
