<template>
  <table-plus :columns="columns" table="tag" :formData="formData" />
</template>

<script setup>
const columns = [
  {
    title: "标签名称",
    dataIndex: "name",
  },
  {
    title: "关联数量",
    dataIndex: "count",
  },
];

const formData = [
  {
    label: "标签名",
    value: "name",
    component: "input",
    required: true,
  },
];
</script>

<style>
</style>