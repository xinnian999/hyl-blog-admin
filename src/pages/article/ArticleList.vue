<template>
  <TablePlus table="article" :columns="columns" :formData="formData" ref="tableRef" />
</template>

<script setup>
import { ref } from "vue";
import { ElImage, ElSwitch } from "element-plus";
import {
  formatTime,
  request,
} from "@/utils";

const tableRef = ref();


const changePublish = (val, record) => {
  request
    .put("/article/update", { publish: val, id: record.id })
    .then((res) => {
      if (res.status === 0) {
        tableRef.value.handleRefresh();
      }
    });
};

const changePublishBanner = (val, record) => {
  request
    .put("/article/update", { publishBanner: val, id: record.id })
    .then((res) => {
      if (res.status === 0) {
        tableRef.value.handleRefresh();
      }
    });
};

const changeTopping = (val, record) => {
  request
    .put("/article/update", { topping: val, id: record.id })
    .then((res) => {
      if (res.status === 0) {
        tableRef.value.handleRefresh();
      }
    });
};

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
    filterKey: 'name'
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
    render: (record) => formatTime(record.createTime),
    sortable: true,
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    render: (record) => formatTime(record.updateTime),
    width: 200,
  },
  {
    title: "是否上架",
    dataIndex: "publish",
    fixed: "right",
    render: (record) => (
      <ElSwitch
        model-value={record.publish}
        active-value={1}
        inactive-value={0}
        onChange={(val) => changePublish(val, record)}
      />
    ),
  },
  {
    title: "上架到轮播图",
    dataIndex: "publishBanner",
    fixed: "right",
    width: 120,
    render: (record) => (
      <ElSwitch
        model-value={record.publishBanner}
        active-value={1}
        inactive-value={0}
        onChange={(val) => changePublishBanner(val, record)}
      />
    ),
  },
  {
    title: "是否置顶",
    dataIndex: "topping",
    fixed: "right",
    render: (record) => (
      <ElSwitch
        model-value={record.topping}
        active-value={1}
        inactive-value={0}
        onChange={(val) => changeTopping(val, record)}
      />
    ),
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
