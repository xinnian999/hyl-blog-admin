<template>
  <el-dialog
    :center="true"
    :model-value="visible"
    @close="close"
    :title="title"
    :width="width"
    top="5vh"
    custom-class="dialogForm"
    :append-to-body="true"
    destroy-on-close
  >
    <schema-form
      v-model="formValues"
      :schemaId="schemaId"
      ref="formRef"
      :schema="schema"
    />

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleOk">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="jsx">
import {
  reactive,
  ref,
  defineProps,
  defineExpose,
  computed,
  defineEmits,
} from "vue";

const formRef = ref();

const props = defineProps({
  formData: {},
  ok: {},
  width: {},
  title: {},
  currentRecord: {},
  visible: {},
  close: {},
  initialValues: {},
  schemaId: String,
  modelValue: Object,
  schema: Object,
});

const form = reactive({});

const emit = defineEmits(["update:modelValue"]);

const formValues = computed({
  get() {
    return props.modelValue;
  },
  set(values) {
    emit("update:modelValue", values);
  },
});

const reset = () => {
  props.formData.forEach(({ defaultValue, value }) => {
    if (defaultValue) {
      form[value] = defaultValue;
    } else {
      form[value] = "";
    }
  });
};

// const handleUploadImage = (event, insertImage, files) => {
//   const formData = new FormData();
//   formData.append("image", files[0], files[0].name);
//   request
//     .post("/upload/image", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data;boundary=" + new Date().getTime(),
//       },
//     })
//     .then((res) => {
//       insertImage({
//         url: `/cdn/image/${res.filename}`,
//         desc: "图片已失效",
//         // width: 'auto',
//         // height: 'auto',
//       });
//     });
// };

// const onSave = () => {
//   new Promise((resolve) => {
//     if (form.content.length < props.currentRecord.content.length) {
//       ElMessageBox.confirm("此次保存内容少于之前内容，继续保存吗？", "删除", {
//         confirmButtonText: "确定",
//         cancelButtonText: "取消",
//         type: "warning",
//       }).then(() => resolve());
//     } else {
//       resolve();
//     }
//   }).then(() => {
//     props.ok(false);
//   });
// };

// const onFullscreen = (isFullscreen) => {
//   const el = document.querySelector(".v-md-editor__toolbar");
//   let titleEl = document.querySelector(".md-title");

//   if (!titleEl) {
//     const newNode = document.createElement("div");
//     newNode.className = "md-title";
//     const reforeNode = document.querySelector(".v-md-editor__toolbar-right");

//     el.insertBefore(newNode, reforeNode);

//     titleEl = document.querySelector(".md-title");
//   }

//   if (isFullscreen) {
//     titleEl.innerHTML = `编辑文章：${props.currentRecord.title}`;
//   } else {
//     titleEl.innerHTML = "";
//   }
// };

const handleOk = async () => {
  const values = await formRef.value.submit();
  props.ok(values);
};

defineExpose({ reset, form, formRef });
</script>

<style lang="less">
.avatar-uploader .avatar {
  width: 278px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 278px;
  height: 178px;
  text-align: center;
}

.md-title {
  font-size: 20px;
  font-weight: bold;
  flex: 1;
  text-indent: 2em;
}
</style>
