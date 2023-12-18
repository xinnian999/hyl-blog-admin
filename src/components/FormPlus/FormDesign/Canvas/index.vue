<template>
  <el-form
    class="canvas"
    :style="`max-width: ${schema.formWidth}`"
    :label-position="schema.labelAlign"
    :size="schema.size"
  >
    <draggable
      style="height: 100%"
      :list="list"
      :group="{ name: 'form', pull: true, put: true }"
      itemKey="name"
      chooseClass="choose"
      ghost-class="ghost"
      @add="handleAdd"
      drag-class="drag"
      fallback-class="fallback"
    >
      <template #item="{ element, index }">
        <CanvasRender :element="element" :index="index" />
      </template>
    </draggable>
  </el-form>
</template>

<script setup lang="jsx">
import { computed, provide, inject } from "vue";
import draggable from "vuedraggable";
import { changeItems } from "../../utils";
import CanvasRender from "./CanvasRender.vue";

const schema = inject("$schema");

const current = inject("$current");

const list = computed({
  get() {
    return schema.items;
  },
  set(value) {
    Object.assign(schema, { items: value });
  },
});

const handleAdd = () => {
  list.value = changeItems(list.value);
};

const filterId = (items, elementId) => {
  const data = items.filter((item) => {
    return item.onlyId !== elementId;
  });

  return data.map((item) => {
    if (item.children) {
      return {
        ...item,
        children: filterId(item.children, elementId),
      };
    }
    return item;
  });
};

const handleDelete = (element) => {
  list.value = filterId(list.value, element.onlyId);
};

const handleSelect = (element) => {
  current.value = element;
};

provide("handleAdd", handleAdd);
provide("handleSelect", handleSelect);
provide("handleDelete", handleDelete);
</script>

<style lang="less">
.canvas {
  flex: 1;
  padding: 20px;
  border: 1px dashed #999;
  .canvas-item {
    border: 2px solid transparent;
    margin-bottom: 5px;
    padding: 10px;
    position: relative;
    #form-item {
      margin-bottom: 0;
    }
    .actions {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 20;
    }

    &:hover {
      border: 2px solid var(--el-color-primary-light-5);
    }
  }

  .ghost {
    border-top: 2px solid var(--el-color-primary);
    list-style: none;
  }
  .active {
    border: 2px solid var(--el-color-primary) !important;
    &:hover {
      border: 2px solid var(--el-color-primary) !important;
    }
  }
}
</style>
