<template>
  <div class="login">
    <el-card class="login-form">
      <template #header>
        <div class="title">心 念 Blog 后 台 管 理</div>
      </template>
      <div class="form">
        <remote-schema-form
          v-model="formValues"
          schemaId="3"
          :schemaContext="{ visitor }"
          @onFinish="onFinish"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="jsx">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { request } from "@/utils";
import { useRouter, useRoute } from "vue-router";
import md5 from "js-md5";

const router = useRouter();
const route = useRoute();
const loading = ref(false);

const formValues = ref({});

const onFinish = (values) => {
  loading.value = true;
  request
    .post("/user/loginAdmin", { ...values, password: md5(values.password) })
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

    .title {
      font-size: 20px;
      font-weight: bold;
      font-family: "Microsoft YaHei";
      color: brown;
      text-align: center;
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
