<template>
  <TablePlus table="updateLog" :columns="columns" :formData="formData" />
</template>

<script setup>


const columns = [
  {
    title: "更新内容",
    dataIndex: "content",
  },
  {
    title: "时间",
    dataIndex: "creatTime",
  },
];



const formData = [
  {
    label: "更新内容",
    value: "content",
    component: "textarea",
  },
];
</script>

