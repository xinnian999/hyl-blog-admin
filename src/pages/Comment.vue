<template>
    <GridTable :params="params" :moreAction="moreAction" :columns="columns" title="说说管理" ref="tableRef" />
    <FormModal :title="`回复 ${currentInfo.author}`" width="40%" :formData="formData" :ok="handleOk" ref="formRef" />
</template>

<script setup>
import { ref } from "vue";
import { handleDelete, handleAddOrUpdate, request } from "@/utils";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
    relativeTime: {
        future: "in %s",
        past: "%s前",
        s: "a few seconds",
        m: "1分钟",
        mm: "%d分钟",
        h: "1小时",
        hh: "%d小时",
        d: "1天",
        dd: "%d天",
        M: "1个月",
        MM: "%d个月",
        y: "1年",
        yy: "%d年",
    },
});

const tableRef = ref();
const formRef = ref();
const currentInfo = ref({});

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
        filter: true,
    },
    {
        title: "评论内容",
        dataIndex: "content",
    },
    {
        title: "类型",
        dataIndex: "type",
        render: (record) => {
            if (record.article_id === "99999")
                return <el-tag>留言板{record.reply_id && "[回复]"}</el-tag>;
            return (
                <el-tag type="success">文章评论{record.reply_id && "[回复]"}</el-tag>
            );
        },
    },
    {
        title: "评论时间",
        dataIndex: "datetime",
        render: (record) => {
            return dayjs(record.datetime).fromNow();
        },
    },
];

const moreAction = [
    {
        title: "回复",
        status: "success",
        handle: (record) => {
            currentInfo.value = record;
            handleAddOrUpdate(null, formRef);
        },
    },
    {
        status: "danger",
        title: "删除",
        handle: (record) =>
            handleDelete("/comment/delete", record.id, tableRef, record),
    },
];

const formData = [
    {
        label: `回复内容`,
        value: "content",
        component: "textarea",
        required: true,
    },
];

const handleOk = () => {
    formRef.value.formRef.validate((valid) => {
        if (valid) {
            const { content } = formRef.value.form;
            const { id, author, email, article_id } = currentInfo.value;
            const data = {
                content,
                author: 'hyl',
                author_id: 30,
                reply_Email: email,
                reply_id: id,
                reply_name: author,
                email: '3307578337@qq.com',
                avatar: "/api/headPicture/1650613539084.jpeg",
                article_id
            };
            request.post("/comment/add", data).then(res => {
                if (res.status === 0) {
                    ElMessage.success(`回复成功`);
                    formRef.value.handleVisible(false);
                    tableRef.value.handleRefresh();
                } else {
                    ElMessage.error(`回复失败`);
                }
            })
        } else {
            console.log("error submit!");
            return false;
        }
    });
};
</script>
