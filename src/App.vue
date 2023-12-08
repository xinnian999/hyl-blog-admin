<template>
  <Layout />
</template>

<script setup lang="jsx">
import { watch, onMounted } from "vue";
import { useStore } from "vuex";
import Layout from "./Layout/index.vue";
import { useRoute } from "vue-router";
import { request } from "@/utils";
import cookie from "cookies-js";

const route = useRoute();
const store = useStore();

watch(
  () => route.path,
  (path) => {
    if (path === "/login") {
      store.commit("setIsLogin", false);
    } else {
      store.commit("setIsLogin", true);
    }
  }
);

onMounted(() => {
  if (!cookie.get("csrf_token")) {
    request("/all/getCsrfToken");
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  background-color: rgba(242, 243, 245);
}

html,
body {
  height: 100%;
}

* {
  margin: 0;
  padding: 0;
}
</style>
