<template>
  <GridTable
    :params="params"
    :columns="columns"
    :moreAction="moreAction"
    title="用户管理"
    ref="tableRef"
  />
  <FormModal
    title="修改密码"
    :formData="formData"
    :ok="handleEditPassword"
    ref="formRef"
  />
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import md5 from "js-md5";
import { handleDelete, request } from "@/utils";

const tableRef = ref();
const formRef = ref();

const params = {
  methods: "get",
  path: "/user/query",
  data: {},
};

const columns = [
  {
    title: "头像",
    dataIndex: "headPicture",
    fixed: "left",
    width: 100,
    render: (record) => (
      <el-image src={record.headPicture} style="width: 50px; height: 50px" />
    ),
  },
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "角色",
    dataIndex: "power",
    render: (record) => {
      if (record.power === 2) return "超级管理员";
      return "普通用户";
    },
  },
];

const handleUpdatePassword = (record) => {
  Object.assign(formRef.value.form, {
    id: record.id,
    password: record.password,
  });
  formRef.value.handleVisible(true);
};

const handleEditPassword = () => {
  const { password, oldPassword, id, newPassword } = formRef.value.form;

  if (password === md5(oldPassword)) {
    request
      .put("/user/updatePassword", { newPassword: md5(newPassword), id })
      .then((res) => {
        if (res.status === 0) {
          formRef.value.handleVisible(false);
          ElMessage.success("修改成功");
        }
      });
  } else {
    ElMessage.error("两次密码输入不一致");
  }
};

const moreAction = [
  {
    title: "修改密码",
    status: "warning",
    handle: (record) => handleUpdatePassword(record),
  },
  {
    status: "danger",
    title: "删除",
    handle: (record) => {
      if (record.power !== 2) {
        return handleDelete("/user/delete", record.id, tableRef);
      }
      return ElMessage.warning("无权限");
    },
  },
];

const formData = [
  {
    label: "旧密码",
    value: "oldPassword",
    component: "password",
    required: true,
  },
  {
    label: "新密码",
    value: "newPassword",
    component: "password",
    required: true,
  },
];
</script>

