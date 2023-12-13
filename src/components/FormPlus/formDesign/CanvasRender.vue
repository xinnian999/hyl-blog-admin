<template>
  <div
    :class="['canvas-item', element.id === current.id && 'active']"
    @click.stop="handleSelect(element)"
  >
    <div class="actions" v-if="element.id === current.id">
      <el-button
        :icon="Delete"
        size="small"
        type="primary"
        @click.stop="handleDelete(element)"
      ></el-button>
    </div>

    <canvas-group v-if="element.children" v-bind="element">
      <draggable
        :list="element.children"
        group="form"
        itemKey="name"
        chosenClass="active"
        ghost-class="ghost"
        class="childContainer"
        @add="handleAdd"
      >
        <template #item="{ element: child, index }">
          <CanvasRender
            :element="child"
            @handleAdd="handleAdd"
            @handleSelect="handleSelect"
            @handleDelete="handleDelete"
            :index="index"
          />
        </template>
      </draggable>
    </canvas-group>

    <form-item
      v-else
      :label="element.label"
      labelWidth="120px"
      :component="element.component"
      :componentProps="checkProps(element.props)"
      :required="element.required"
      class="form-item-btn"
    />
  </div>
</template>

<script setup lang="jsx">
import { defineProps, defineEmits, inject } from "vue";
import draggable from "vuedraggable";
import { omit, pick } from "lodash";
import { Delete } from "@element-plus/icons-vue";
import CanvasGroup from "./CanvasGroup.vue";
import FormItem from "../FormItem.vue";

defineProps({
  element: Object,
  index: null,
});

const emit = defineEmits(["handleAdd", "handleSelect", "handleDelete"]);

const current = inject("$current");

const handleAdd = () => {
  emit("handleAdd");
};

const handleSelect = (element) => {
  emit("handleSelect", element);
};

const handleDelete = (element) => {
  emit("handleDelete", element);
};

const checkProps = (props) => {
  return omit(props, ["multiple", "autoSelectedFirst"]);
};
</script>

<style lang="less">
.childContainer {
  min-height: 150px;
}
</style>
