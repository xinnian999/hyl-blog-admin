<template>
  <TablePlus table="category" :columns="columns" :formData="formData" :disabled="['edit', 'delete']" />
</template>

<script setup>

const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "文章数",
    dataIndex: "count",
  },
];

const formData = [
  {
    label: "分类名称",
    value: "name",
    component: "input",
  },
];

// const handleUpdateCount = () => {
//   request("/category/updateCount").then((res) => {
//     if (res.status === 0) {
//       ElMessage.success("更新成功");
//       tableRef.value.handleRefresh();
//     }
//   });
// };



</script>

<style></style>