<template>
  <div id="formList">
    <el-form-item v-for="item in list" :key="item.key" class="list-item">
      <div class="list-item-content">
        <el-space>
          <form-item
            v-for="field in fields"
            v-model="item[field.name]"
            v-bind="field"
            :componentProps="field.props"
            :key="field.label"
            label=""
          />
        </el-space>
        <el-button
          v-if="allowReduce"
          @click="reduce(item)"
          :icon="Minus"
          circle
          type="primary"
          class="list-btn"
        ></el-button>
      </div>
    </el-form-item>
    <div>
      <el-button
        v-if="allowAdd && !isMax"
        @click="add"
        :icon="Plus"
        circle
        type="primary"
        class="list-btn addBtn"
      ></el-button>
    </div>
  </div>
</template>

<script setup lang="jsx">
import { computed, defineProps, defineEmits } from "vue";
import { Plus, Minus } from "@element-plus/icons-vue";
import { getRandomId } from "../utils";
import FormItem from "../FormItem.vue";

const props = defineProps({
  modelValue: Array,
  fields: Array,
  allowAdd: {
    default: true,
    type: Boolean,
  },
  allowReduce: {
    default: true,
    type: Boolean,
  },
  defaultLineCount: {
    default: 0,
    type: Number,
  },
  maxLines: {
    default: 999,
    type: Number,
  },
});

const emit = defineEmits(["update:modelValue"]);

const list = computed({
  get() {
    return props.modelValue || [];
  },
  set(val) {
    console.log(val);
    emit("update:modelValue", val);
  },
});

const isMax = computed(() => {
  return list.value.length >= props.maxLines;
});

const add = () => {
  if (isMax.value) {
    return;
  }
  emit("update:modelValue", [...list.value, { key: getRandomId(10) }]);
};

const reduce = (item) => {
  const newData = list.value.filter((v) => v.key !== item.key);
  emit("update:modelValue", newData);
};

// onMounted(() => {
//   const { defaultLineCount } = props;
//   setTimeout(() => {
//     if (defaultLineCount) {
//       const defaultLines = Array.from({ length: defaultLineCount }, () => ({
//         key: getRandomId(10),
//       }));

//       emit('update:modelValue', defaultLines);
//     }
//   }, 200);
// });
</script>

<style lang="less" scoped>
#formList {
  position: relative;
  .list-item {
    margin-bottom: 10px;
    .list-item-content {
      display: flex;
    }
  }
  .list-btn {
    margin-left: 10px;
  }

  .addBtn {
  }
}
</style>
