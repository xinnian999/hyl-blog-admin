<template>
    <GridTable :params="params" :moreAction="moreAction" :columns="columns" title="说说管理" ref="tableRef" />
    <!-- <FormModal title="发说说" width="40%" :formData="formData" :ok="() => handleOk('mood', formRef, tableRef)"
      ref="formRef" /> -->
</template>
  
<script setup>
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { handleAddOrUpdate, handleOk, handleDelete } from "@/utils";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
    relativeTime: {
        future: "in %s",
        past: "%s前",
        s: 'a few seconds',
        m: "1分钟",
        mm: "%d分钟",
        h: "1小时",
        hh: "%d小时",
        d: "1天",
        dd: "%d天",
        M: "1个月",
        MM: "%d个月",
        y: "1年",
        yy: "%d年"
    }
})

const tableRef = ref();
const formRef = ref();

const params = {
    path: "/comment/query",
    data: {},
};

const columns = [
    {
        title: "头像",
        dataIndex: "avatar",
        fixed: "left",
        width: 100,
        render: (record) => (
            <el-image src={record.avatar} style="width: 50px; height: 50px" />
        ),
    },
    {
        title: "昵称",
        dataIndex: "author",
        filter: true
    },
    {
        title: "评论内容",
        dataIndex: "content",
    },
    {
        title: "类型",
        dataIndex: "type",
        render: (record) => {
            if (record.article_id === '99999') return <el-tag>留言板{record.reply_id && '[回复]'}</el-tag>
            return <el-tag type="success">文章评论{record.reply_id && '[回复]'}</el-tag>
        }
    },
    {
        title: "评论时间",
        dataIndex: "datetime",
        render: (record) => {
            return dayjs(record.datetime).fromNow()
        }
    },
];


const moreAction = [
    // {
    //     title: "编辑",
    //     status: "success",
    //     handle: (record) => handleAddOrUpdate(record, formRef),
    // },
    {
        status: "danger",
        title: "删除",
        handle: (record) => handleDelete("/mood/delete", record.id, tableRef, params),
    },
];

const formData = [
    {
        label: "说说",
        value: "content",
        component: "textarea",
    },
    {
        label: "配图",
        value: "picture",
        component: "uploadPicture",
        uploadName: "image",
    },
    {
        label: "分类",
        value: "category",
        component: "select",
        selectData: [
            { name: "位置", value: "weizhi" },
            { name: "图片", value: "tupian" },
            { name: "视频", value: "shipin" },
        ],
        config: {
            mode: "static",
            label: "name",
            value: "value",
        },
    },
];
</script>
  