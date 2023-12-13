<template>
  <draggable
    class="canvas"
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
      <CanvasRender
        :element="element"
        @handleAdd="handleAdd"
        @handleSelect="handleSelect"
        @handleDelete="handleDelete"
        :index="index"
      />
    </template>
  </draggable>
</template>

<script setup lang="jsx">
import { defineProps, defineEmits, computed, inject } from "vue";
import draggable from "vuedraggable";
import { getRandomId } from "../utils";
import CanvasRender from "./CanvasRender.vue";

const props = defineProps({
  modelValue: Array,
});

const emit = defineEmits(["update:modelValue", "update:current"]);

const list = computed({
  get() {
    return props.modelValue;
  },
  set(e) {
    emit("update:modelValue", e);
  },
});

const current = inject("$current");

const handleAdd = () => {
  const setNameId = (items) => {
    return items.map((item) => {
      const data = {
        ...item,
        id: item.id || `form-${getRandomId(4)}`,
        name: item.name || getRandomId(6),
      };
      if (item.children) {
        data.children = setNameId(item.children);
      }
      delete data.type;
      return data;
    });
  };
  list.value = setNameId(list.value, 0);
};

const filterId = (items, elementId) => {
  const data = items.filter((item) => {
    return item.id !== elementId;
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
  list.value = filterId(list.value, element.id);
};

const handleSelect = (element) => {
  emit("update:current", element);
};
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
      border: 2px solid var(--el-color-primary) !important;
    }
  }

  .ghost {
    border-top: 2px solid var(--el-color-primary);
    list-style: none;
  }
  .active {
    border: 2px solid var(--el-color-primary) !important;
  }
}
</style>
