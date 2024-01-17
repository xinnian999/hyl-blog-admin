<template>
  <el-container id="layout" v-if="store.state.login.isLogin">
    <el-aside :width="isCollapse ? '64px' : '250px'" id="side">
      <el-menu
        :router="true"
        :default-active="route.path"
        class="menu"
        :collapse="isCollapse"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
      >
        <div :class="`${isCollapse ? 'logoBarBack' : 'logoBar'}`">
          <div class="logoBox">
            <el-tag class="logo" type="warning" v-if="!isCollapse"
              >心念Blog后台管理系统</el-tag
            >
            <el-icon class="back" @click="() => (isCollapse = !isCollapse)">
              <Back v-if="!isCollapse" />
              <Right v-if="isCollapse" />
            </el-icon>
          </div>
        </div>
        <template v-for="item in routesList">
          <el-sub-menu :key="item.path" :index="item.path" v-if="item.children">
            <template #title>
              <el-icon>
                <VNode :content="item.icon" />
              </el-icon>

              <span>{{ item.title }}</span>
            </template>
            <div v-for="v in item.children" :key="v.path">
              <el-menu-item :index="`${item.path}/${v.path}`">{{
                v.title
              }}</el-menu-item>
            </div>
          </el-sub-menu>

          <el-menu-item :key="item.path" :index="item.path" v-else>
            <el-icon>
              <VNode :content="item.icon" />
            </el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header id="header">
        <h2 id="title">{{ title }}</h2>
        <el-space class="headToolbar" :size="20">
          <el-tooltip
            v-for="{ name, icon, event } in toolbarBtn"
            class="box-item"
            effect="dark"
            :content="name"
            placement="bottom"
            :key="name"
          >
            <span class="headerBtn" @click="event">
              <i :class="`iconfont ${icon}`"></i>
            </span>
          </el-tooltip>
        </el-space>
      </el-header>
      <el-main id="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

  <!-- 如果未登陆就全屏渲染登陆页 -->
  <router-view v-else />
</template>

<script setup lang="jsx">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import cookie from "cookies-js";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { Back, Right } from "@element-plus/icons-vue";
import routes from "@/router/routes";
import { request } from "@/utils";

const routesList = routes.filter((item) => item.title);
const route = useRoute();
const router = useRouter();
const store = useStore();

const isCollapse = ref(true);
const title = ref("名称");

const exec = (url) => {
  ElMessage({
    message: "开始执行脚本",
    type: "info",
    duration: 0,
  });
  request(url).then((res) => {
    if (res.status === 200) {
      ElMessage.closeAll();
      ElMessage.success("脚本执行成功！");
    }
  });
};

const toolbarBtn = [
  {
    name: "前往博客首页",
    icon: "icon-home",
    event: () => window.open("https://www.hyl999.co"),
  },
  {
    name: "清理接口缓存",
    icon: "icon-yijianqingli",
    event: () => exec("/all/clearInterfaceCache"),
  },
  {
    name: "退出登陆",
    icon: "icon-tuichu",
    event: () => {
      cookie.expire("super_admin_blog_token");
      cookie.expire("admin_blog_token");
      router.push({ path: "/login", query: { auth: 0 } });
    },
  },
];

watch(
  () => route.path,
  (path) => {
    for (const item of routes) {
      if (item.path === path) {
        title.value = item.title;
      }
      if (item.children) {
        for (const v of item.children) {
          if (`${item.path}/${v.path}` === path) {
            title.value = v.title;
          }
        }
      }
    }
  }
);
</script>

<style lang="less">
@import "//at.alicdn.com/t/c/font_3569918_ek26kxlmkqw.css";

#layout {
  height: 100%;

  #side {
    position: relative;
    display: flex;
    flex-direction: column;
    transition: width 0.5s;
    // background-color: #545c64;
    .menu {
      height: 100%;
      padding-top: 10px;
      overflow: auto;
      .back {
        color: #fff;
        cursor: pointer;
        &:hover {
          color: rgb(248, 82, 82);
        }
      }
      .logoBar {
        display: flex;
        height: 56px;
        position: relative;

        .logoBox {
          margin: auto;
        }

        .logo {
          padding: 15px 10px;
          margin: auto;
          font-weight: bold;
          font-size: 14px;
        }
        .back {
          position: absolute;
          top: 50%;
          margin-top: -8px;
          right: 18px;
        }
      }

      .signOut {
        margin-bottom: 25px;
        position: absolute;
        bottom: 0;
        left: 25%;
      }

      .logoBarBack {
        &:hover {
          background-color: var(--el-menu-hover-bg-color);
          cursor: pointer;
        }
        .back {
          height: 56px;
          width: 100%;
        }
      }
    }
  }
  #header {
    position: relative;
    background: #fff;
    box-shadow: 0 0 10px rgb(0 0 0 / 40%);
    height: 50px;
    display: flex;
    justify-content: right;

    #title {
      position: absolute;
      left: 30px;
      line-height: 50px;
    }
    .headerBtn {
      display: inline-block;
      padding: 5px 10px;
      border-radius: 10px;
      cursor: pointer;
      &:hover {
        background-color: rgb(224, 219, 219);
        box-shadow: 0 0 10px rgb(0 0 0 / 80%);
      }
      .iconfont {
        font-size: 20px;
      }
    }
  }
  #main {
    padding: 15px;
    height: 100%;
  }
}
</style>
