<template>
  <draggable
    class="canvas"
    :list="list"
    :group="{ name: 'form', pull: true, put: true }"
    @change="log"
    itemKey="name"
    chooseClass="choose"
    ghost-class="ghost"
    @add="handleAdd"
    drag-class="drag"
    fallback-class="fallback"
  >
    <template #item="{ element, index }">
      <div
        :class="['canvas-item', element.path === current.path && 'active']"
        @click="handleSelect(element)"
      >
        <div class="actions" v-if="element.path === current.path">
          <el-button
            :icon="Delete"
            size="small"
            type="primary"
            @click.stop="handleDelete(element)"
          ></el-button>
        </div>

        <CanvasRender
          :element="element"
          @handleAdd="handleAdd"
          @handleSelect="handleSelect"
          @handleDelete="handleDelete"
          :index="index"
          :current="current"
        />
      </div>
    </template>
  </draggable>
</template>

<script setup lang="jsx">
import { defineProps, defineEmits, computed, inject } from "vue";
import draggable from "vuedraggable";
import { Delete } from "@element-plus/icons-vue";
import { getRandomId } from "@/utils";
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

// 拖拽排序事件
const log = (e) => {
  if (e.moved) {
  }
};

const setPath = (items, fatherPath) => {
  return items.map((item, index) => {
    if (item.children) {
      return {
        ...item,
        path: `${fatherPath}-${index}`,
        name: item.name || getRandomId(6),
        children: setPath(item.children, `${fatherPath}-${index}`),
      };
    }
    return {
      ...item,
      path: `${fatherPath}-${index}`,
      name: item.name || getRandomId(6),
    };
  });
};

const handleAdd = () => {
  list.value = setPath(list.value, 0);
};

const filterPath = (items, elementPath) => {
  const data = items.filter((item) => {
    return item.path !== elementPath;
  });

  return data.map((item) => {
    if (item.children) {
      return {
        ...item,
        children: filterPath(item.children, elementPath),
      };
    }
    return item;
  });
};

const handleDelete = (element) => {
  list.value = filterPath(list.value, element.path);
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
