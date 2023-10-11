<template>
  <TablePlus table="article" :columns="columns" :formData="formData" />
</template>

<script setup>
import { ElImage } from "element-plus";
import { formatTime } from "@/utils";

const columns = [
  {
    title: "文章海报",
    dataIndex: "picture",
    width: 200,
    render: (record) => {
      const src = `https://cdn.hyl999.co/public/image/${record.picture}`;
      return (
        <ElImage
          preview-src-list={[src]}
          preview-teleported
          src={src}
          style={{ height: "100px" }}
        />
      );
    },
  },
  {
    title: "标题",
    dataIndex: "title",
    search: true,
    width: 300,
  },
  {
    title: "分类",
    dataIndex: "category",
    search: true,
    width: 150,
    filterKey: "name",
  },
  {
    title: "阅读次数",
    dataIndex: "visits",
    width: 150,
    sortable: true,
  },
  {
    title: "发布时间",
    width: 200,
    dataIndex: "createTime",
    timeParse: true,
    sortable: true,
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    timeParse: true,
    width: 200,
  },
  {
    title: "是否上架",
    dataIndex: "publish",
    fixed: "right",
    switchable: true,
  },
  {
    title: "上架到轮播图",
    dataIndex: "publishBanner",
    fixed: "right",
    width: 120,
    switchable: true,
  },
  {
    title: "是否置顶",
    dataIndex: "topping",
    fixed: "right",
    switchable: true,
  },
];

const formData = [
  {
    label: "文章标题",
    value: "title",
    component: "input",
    required: true,
  },
  {
    label: "文章简介",
    value: "introduce",
    component: "textarea",
    required: true,
  },
  {
    label: "文章分类",
    value: "category",
    component: "select",
    required: true,
    multiple: true,
    defaultValue: ["react"],
    config: {
      mode: "remote",
      url: "/category/query",
      method: "get",
      label: "name",
      value: "name",
    },
  },
  {
    label: "文章类型",
    value: "type",
    component: "radio",
    required: true,
    multiple: true,
    defaultValue: 1,
    selectData: [
      { name: "原创", value: 1 },
      { name: "转载", value: 2 },
    ],
    config: {
      mode: "static",
      label: "name",
      value: "value",
    },
  },
  {
    label: "文章海报",
    value: "picture",
    component: "uploadPicture",
    uploadName: "image",
  },
  {
    label: "文章内容",
    value: "content",
    component: "markdown",
    required: true,
  },
];
</script>
