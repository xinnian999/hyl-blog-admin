<template>
  <div class="login">
    <el-card class="login-form">
      <template #header>
        <span class="title">心 念 Blog 后 台 管 理</span>
      </template>
      <div class="form">
        <schema-form :schema="schema" @onSubmit="onSubmit" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="jsx">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { request } from "@/utils";
import { useRouter, useRoute } from "vue-router";
import md5 from "js-md5";

const router = useRouter();
const route = useRoute();
const loading = ref(false);

const schema = ref();

const onSubmit = (values) => {
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

onMounted(async () => {
  const { data } = await request({
    url: "/current/query/form",
    params: {
      filters: {
        id: 3,
      },
    },
  });

  schema.value = JSON.parse(data[0].formSchema);
});
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
