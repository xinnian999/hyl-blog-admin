<template>
  <div id="formDesign">
    <div class="formItemList">
      <Menus />
    </div>

    <div class="formRender">
      <Actions v-model:schema="schema" />
      <Canvas v-model="schema.items" v-model:current="current" />
    </div>

    <div class="formItemOptions">
      <Current :current="current" />
    </div>
  </div>
</template>

<script setup lang="jsx">
import { defineProps, ref, provide, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import Menus from "./Menus.vue";
import Canvas from "./Canvas.vue";
import Current from "./Current.vue";
import Actions from "./Actions.vue";

const props = defineProps({});

const store = useStore();

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
      if (item.id === value.id) {
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

onMounted(() => {
  store.commit("closeSidebar");
});
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
    padding: 20px;
    background-color: #fff;
  }

  .editor {
    height: 70vh;
  }
}
</style>
