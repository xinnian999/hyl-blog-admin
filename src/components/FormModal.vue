<template>
  <el-dialog :center="true" v-model="visible" @close="handleVisible(false)" :title="title" :width="width" top="5vh"
    custom-class="dialogForm" :append-to-body="true" @open="dialogOpen">
    <el-form :model="form" ref="formRef">
      <el-form-item v-for="{
        label,
        value,
        component,
        selectData,
        uploadName,
        config,
        required,
        multiple,
        placeholder,
        blur,
      } in formData" :key="value" :prop="value" :label="label" label-width="80px" :rules="
  required
    ? { required: true, message: `请输入${label}`, trigger: 'blur' }
    : null
">
        <el-input v-model="form[value]" autocomplete="off" v-if="component === 'input'" />

        <el-input v-model="form[value]" autocomplete="off" v-if="component === 'password'" show-password
          type="password" />

        <el-input v-model="form[value]" autocomplete="off" :placeholder="placeholder"
          :autosize="{ minRows: 4, maxRows: 999 }" type="textarea" v-if="component === 'textarea'" @blur="blur" />

        <el-radio-group v-model="form[value]" v-if="component === 'radio'">
          <el-radio :label="item[config.value]" :key="item[config.value]" size="large"
            v-for="item in config.mode === 'static' ? selectData : data[value]">{{ item[config.label] }}</el-radio>
        </el-radio-group>

        <el-select v-model="form[value]" placeholder="请选择分类" v-if="component === 'select'" :multiple="multiple">
          <el-option :key="item[config.value]" :label="item[config.label]" :value="item[config.value]"
            v-for="item in config.mode === 'static' ? selectData : data[value]" />
        </el-select>

        <el-upload v-model="form[value]" class="avatar-uploader" :action="`/api/upload/${uploadName}`"
          :name="uploadName" :show-file-list="false" :on-success="
            (res) => {
              form.picture = res.filename;
            }
          " v-if="component === 'uploadPicture'">
          <img v-if="form[value]" :src="`${globalConfig.remoteStaticUrl}/image/${form[value]}`" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>

        <el-upload v-model="form[value]" action="api/upload/music" name="music" :show-file-list="false" :on-success="
          (res) =>
          (form[
            value
          ] = `${globalConfig.remoteStaticUrl}/music/${res.filename}`)
        " v-if="component === 'uploadMusic'">
          <audio v-if="form[value]" :src="form[value]" controls />

          <el-button v-else>
            <el-icon>
              <Plus />
            </el-icon>点击上传
          </el-button>
        </el-upload>

        <v-md-editor v-model="form[value]"
          left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table  hr | link image code | save "
          height="400px" v-if="component === 'markdown'" :disabled-menus="[]" @upload-image="handleUploadImage"
          @save="onSave" @fullscreen-change="onFullscreen" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="ok">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, defineProps, defineExpose, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { request, globalConfig } from "@/utils";

const formRef = ref();

const props = defineProps({
  formData: {},
  ok: {},
  width: {},
  title: {},
  currentRecord: {},
});

const form = reactive({ id: undefined });
const data = reactive({});

const visible = ref(false);

onMounted(() => {
  // 初始化v-model，不写会导致数据回显失败
  props.formData.forEach((item) => {
    form[item.value] = "";
    if (item.config?.mode === "remote") {
      const { method, url } = item.config;
      request[method](url).then((res) => {
        if (res.status === 0) {
          data[item.value] = res.data;
        }
      });
    }
  });
});

const handleVisible = (value) => {
  visible.value = value;
};

const dialogOpen = () => {
  // 初始化v-model，不写会导致数据回显失败
  // props.formData.forEach((item) => {
  //   if (/select|radio/.test(item.component)) {
  //     if (item.config.mode === "static") {
  //       form[item.value] = item.config.defaultValue
  //     }

  //     if (item.config.mode === "remote") {
  //       const { method, url } = item.config;
  //       request[method](url).then((res) => {
  //         if (res.status === 0) {
  //           data[item.value] = res.data;
  //         }
  //       });
  //     }
  //   }
  // });
}

const handleUploadImage = (event, insertImage, files) => {
  const formData = new FormData();
  formData.append("image", files[0], files[0].name);
  request
    .post("/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data;boundary=" + new Date().getTime(),
      },
    })
    .then((res) => {
      insertImage({
        url: `/cdn/image/${res.filename}`,
        desc: "图片已失效",
        // width: 'auto',
        // height: 'auto',
      });
    });
};

const onSave = () => {
  new Promise((resolve) => {
    if (form.content.length < props.currentRecord.content.length) {
      ElMessageBox.confirm("此次保存内容少于之前内容，继续保存吗？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => resolve());
    } else {
      resolve();
    }
  }).then(() => {
    props.ok(false);
  });
};

const onFullscreen = (isFullscreen) => {
  const el = document.querySelector(".v-md-editor__toolbar");
  let titleEl = document.querySelector(".md-title");

  if (!titleEl) {
    const newNode = document.createElement("div");
    newNode.className = "md-title";
    const reforeNode = document.querySelector(".v-md-editor__toolbar-right");

    el.insertBefore(newNode, reforeNode);

    titleEl = document.querySelector(".md-title");
  }

  if (isFullscreen) {
    titleEl.innerHTML = `编辑文章：${props.currentRecord.title}`;
  } else {
    titleEl.innerHTML = "";
  }
};

defineExpose({ handleVisible, form, formRef, formData: props.formData });
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
