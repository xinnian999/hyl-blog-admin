<template>
  <form-group v-if="element.children" v-bind="element">
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
        <div
          @click.stop="handleSelect(child)"
          :class="['canvas-item', child.path === current.path && 'active']"
        >
          <div class="actions" v-if="child.path === current.path">
            <el-button
              :icon="Delete"
              size="small"
              type="primary"
              @click.stop="handleDelete(child)"
            ></el-button>
          </div>

          <CanvasRender
            v-if="child.children"
            :element="child"
            @handleAdd="handleAdd"
            @handleSelect="handleSelect"
            @handleDelete="handleDelete"
            :index="index"
            :current="current"
          />
          <form-item
            v-else
            :label="child.label"
            labelWidth="120px"
            :component="child.component"
            :componentProps="checkProps(child.props)"
            :required="child.required"
          />
        </div>
      </template>
    </draggable>
  </form-group>

  <form-item
    v-else
    :label="element.label"
    labelWidth="120px"
    :component="element.component"
    :componentProps="checkProps(element.props)"
    :required="element.required"
    class="form-item-btn"
  />
</template>

<script setup lang="jsx">
import { defineProps, defineEmits, inject } from "vue";
import draggable from "vuedraggable";
import { omit, pick } from "lodash";
import { Delete } from "@element-plus/icons-vue";
import FormGroup from "../FormGroup.vue";
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
  min-height: 100px;
}
</style>
