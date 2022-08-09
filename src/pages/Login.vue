<template>
  <div class="login">
    <el-card class="login-form">
      <template #header>
        <span class="title">心 念 Blog 后 台 管 理</span>
      </template>
      <div class="form">
        <el-form :model="form" ref="formRef">
          <el-form-item
            label="用户名"
            prop="username"
            label-width="80px"
            :rules="{ required: true, message: '请输入用户名！' }"
          >
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            label-width="80px"
            :rules="{ required: true, message: '请输入密码！' }"
          >
            <el-input
              v-model="form.password"
              type="password"
              autocomplete="off"
            />
          </el-form-item>

          <div class="loginBtn">
            <el-button type="primary" @click="submitForm" :loading="loading"
              >登 录</el-button
            >
            <el-button @click="visitor" color="#626aef">游 客</el-button>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { request } from "@/utils";
import { useRouter, useRoute } from "vue-router";
import md5 from "js-md5";

const router = useRouter();
const route = useRoute();
const formRef = ref();
const loading = ref(false);

const form = reactive({
  username: "",
  password: "",
});

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      request
        .post("/user/loginAdmin", { ...form, password: md5(form.password) })
        .then((res) => {
          if (res.status === 0) {
            ElMessage.success("登陆成功");
            if (route.query.auth === "0") {
              // 可能需要回到跳转登陆页前的页面
              router.go(-1);
            } else {
              router.push("/home");
            }
          } else {
            loading.value = false;
            ElMessage.error("登陆失败");
          }
        });
    }
  });
};

const visitor = () => {
  request
    .post("/user/loginAdmin", {
      username: "游客",
      password: "e10adc3949ba59abbe56e057f20f883e",
    })
    .then((res) => {
      if (res.status === 0) {
        router.push("/home");
      } else {
        ElMessage.error("登陆失败");
      }
    });
};
</script>

<style lang="less">
.login {
  background-image: url("@/assets/login-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 15%;
  height: 100%;
  display: flex;
  .login-form {
    width: 500px;
    height: 300px;
    margin: auto;
    text-align: center;
    .title {
      font-size: 20px;
      padding: 10px;
      font-weight: bold;
      font-family: "Microsoft YaHei";
      color: brown;
    }
    .form {
      padding: 20px;
    }
    .loginBtn {
      width: 100%;
    }
  }
}
</style>

