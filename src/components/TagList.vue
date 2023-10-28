<template>
  <ul>
    <li class="tag" v-for="name in list" :key="name">
      <IconTag :icon="icon">{{ name }}</IconTag>
    </li>
  </ul>
</template>
  
<script setup>
import { defineProps } from "vue";

defineProps({
  list: {},
  icon: {},
});
</script>
  
<style lang="less" scoped>
.tag {
  margin-bottom: 5px;
  list-style: none;
}
</style>>