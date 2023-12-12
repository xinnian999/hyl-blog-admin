<template>
  <div>
    <h4 class="type-title">基础字段</h4>
    <draggable
      class="list"
      :list="basic"
      :group="{ name: 'form', pull: 'clone', put: false }"
      :sort="false"
      ghost-class="ghost"
      drag-class="drag"
      fallback-class="fallback"
    >
      <template #item="{ element }">
        <li class="form-item-btn">
          <svg-icon :name="element.component" /> {{ element.label }}
        </li>
      </template>
    </draggable>

    <h4 class="type-title">布局字段</h4>
    <draggable
      class="list"
      :list="layout"
      :group="{ name: 'form', pull: 'clone', put: false }"
      :sort="false"
      ghost-class="ghost"
      drag-class="drag"
      fallback-class="fallback"
    >
      <template #item="{ element }">
        <li class="form-item-btn">
          <svg-icon :name="element.component" /> {{ element.label }}
        </li>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="jsx">
import { ref } from "vue";
import draggable from "vuedraggable";
import components from "./components";

const basic = components.filter((item) => item.type === "basic");
const layout = components.filter((item) => item.type === "layout");
</script>

<style scoped lang="less">
.ghost,
.fallback,
.drag {
  list-style: none;
}

.type-title {
  margin-bottom: 10px;
  margin-top: 20px;
}
.list {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-left: 0;
  flex-wrap: wrap;
  font-size: 14px;
  .form-item-btn {
    list-style: none;
    padding: 5px 0px;
    margin-bottom: 10px;
    cursor: move;
    border: 1px dashed transparent;
    &:hover {
      border: 1px dashed var(--el-color-primary);
      color: var(--el-color-primary);
    }
    background-color: aliceblue;
    width: 45%;
    text-align: center;
  }
}
</style>
