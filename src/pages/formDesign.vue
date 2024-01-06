<template>
  <form-design />
</template>

<script setup lang="jsx">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { request } from "@/utils";

const route = useRoute();

const schema = ref({});

onMounted(async () => {
  const { data } = await request({
    url: "/current/query/form",
    params: {
      filters: {
        id: +route.query.formId,
      },
    },
  });
  schema.value = data[0].formSchema;

  console.log(schema.value);
});
</script>
