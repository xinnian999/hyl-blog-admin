<template>
  <div id="formDesign">
    <div class="formItemList">
      <Menus />
    </div>

    <div class="formRender">
      <Actions />
      <Canvas />
    </div>

    <div class="formItemOptions">
      <Current />
    </div>
  </div>
</template>

<script setup lang="jsx">
import { ref, provide, reactive } from "vue";
import Menus from "./Menus";
import Canvas from "./Canvas";
import Current from "./Current";
import Actions from "./Actions.vue";

const current = ref({});

const schema = reactive({
  labelWidth: "150px",
  labelAlign: "right",
  items: [],
});

const setCurrent = (value) => {
  current.value = value;

  const set = (items) => {
    return items.map((item) => {
      if (item.onlyId === value.onlyId) {
        return value;
      }
      if (item.children) {
        return { ...item, children: set(item.children) };
      }
      return item;
    });
  };

  schema.items = set(schema.items);
};

provide("$current", current);
provide("$setCurrent", setCurrent);
provide("$schema", schema);
</script>

<style lang="less">
#formDesign {
  display: flex;
  height: 100%;

  .formItemList {
    width: 300px;
    padding: 10px;
    background-color: #fff;
  }
  .formRender {
    flex: 1;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    background-color: #fff;
    overflow: auto;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
  }
  .formItemOptions {
    width: 400px;
    overflow: auto;
    padding: 20px;
    background-color: #fff;
  }

  .editor {
    height: 70vh;
  }
}
</style>
