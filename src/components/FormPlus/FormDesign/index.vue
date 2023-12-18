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
import { ref, provide, reactive, computed } from "vue";
import Menus from "./Menus";
import Canvas from "./Canvas";
import Current from "./Current";
import Actions from "./Actions.vue";

const schema = reactive({
  labelWidth: "150px",
  labelAlign: "right",
  size: "default",
  items: [],
});

const currentId = ref("");

const current = computed({
  get() {
    const findItem = (items) => {
      return items.reduce((all, item) => {
        if (item.onlyId === currentId.value) {
          return item;
        }
        if (item.children) {
          return findItem(item.children);
        }

        return all;
      }, {});
    };
    const c = findItem(schema.items);
    console.log(c, currentId.value);
    return c;
  },
  set(element) {
    console.log(element);
    currentId.value = element.onlyId;

    const set = (items) => {
      return items.map((item) => {
        if (item.onlyId === element.onlyId) {
          return element;
        }
        if (item.children) {
          return { ...item, children: set(item.children) };
        }
        return item;
      });
    };

    schema.items = set(schema.items);
  },
});

provide("$current", current);
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
