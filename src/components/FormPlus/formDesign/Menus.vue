<template>
  <div>
    <h4>基础字段</h4>
    <draggable
      class="list"
      :list="components"
      :group="{ name: 'form', pull: 'clone', put: false }"
      :sort="false"
      ghost-class="ghost"
      drag-class="drag"
      fallback-class="fallback"
    >
      <template #item="{ element }">
        <li class="form-item-btn">
          {{ element.label }}
        </li>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="jsx">
import { ref } from "vue";
import draggable from "vuedraggable";
import components from "./components";
</script>

<style scoped lang="less">
.ghost,
.fallback,
.drag {
  list-style: none;
}
.list {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-left: 0;
  flex-wrap: wrap;
  .form-item-btn {
    list-style: none;
    padding: 5px 8px;
    margin-bottom: 10px;

    background-color: aliceblue;
    width: 45%;
    text-align: center;
  }
}
</style>
