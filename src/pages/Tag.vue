<template>
  <table-plus :columns="columns" table="tag" :formData="formData" :defaultSort="{ prop: 'id', order: 'descending' }" />
</template>

<script setup>
const columns = [
  {
    title: "标签名称",
    dataIndex: "name",
    sortable: 'custom',
    filter: true
  },
  {
    title: "关联数量",
    dataIndex: "count",
  },
  {
    title: "ID",
    dataIndex: "id",
    sortable: 'custom',
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

<style></style>