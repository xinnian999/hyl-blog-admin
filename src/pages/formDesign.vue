<template>
  <form-design v-model="schema" @onSave="onSave" />
</template>

<script setup lang="jsx">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { request } from "@/utils";
import { ElMessage } from "element-plus";

const route = useRoute();

const schema = ref();

onMounted(async () => {
  if (route.query.formId) {
    const { data } = await request({
      url: "/current/query/form",
      params: {
        filters: {
          id: +route.query.formId,
        },
      },
    });
    schema.value = JSON.parse(data[0].formSchema);
  }
});

const onSave = async () => {
  if (!route.query.formId) {
    return ElMessage.error(`未指定表单id`);
  }

  await request({
    url: "/current/update/form",
    method: "put",
    data: {
      id: +route.query.formId,
      formSchema: JSON.stringify(schema.value),
    },
  });

  ElMessage.success(`保存成功`);
};
</script>
