import {
  HomeFilled,
  Document,
  User,
  ChatRound,
  MapLocation,
  Link,
} from "@element-plus/icons-vue";

export default [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    title: "首页",
    path: "/home",
    icon: HomeFilled,
    component: () => import("@/pages/Home.vue"),
  },
  {
    title: "文章管理",
    path: "/article",
    icon: Document,
    redirect: "/article/articleList",
    component: () => import("../pages/index.vue"),
    children: [
      {
        title: "文章列表",
        path: "articleList",
        component: () => import("@/pages/article/ArticleList.vue"),
      },
      {
        title: "分类管理",
        path: "articleCategory",
        component: () => import("../pages/article/Category.vue"),
      },
      {
        title: "文章回收站",
        path: "recycleBin",
        component: () => import("../pages/article/RecycleBin.vue"),
      },
    ],
  },

  {
    title: "日志管理",
    path: "/journal",
    icon: MapLocation,
    redirect: "/journal/mood",
    component: () => import("../pages/index.vue"),
    children: [
      {
        title: "说说管理",
        path: "mood",
        component: () => import("@/pages/Journal/mood.vue"),
      },
      {
        title: "笔记管理",
        path: "note",
        component: () => import("@/pages/Journal/Note.vue"),
      },
    ],
  },
  {
    title: "友链管理",
    path: "/link",
    icon: Link,
    component: () => import("../pages/Link.vue"),
  },
  {
    title: "资源管理",
    path: "/resource",
    icon: MapLocation,
    redirect: "/resource/works",
    component: () => import("../pages/index.vue"),
    children: [
      {
        title: "个人作品",
        path: "works",
        component: () => import("@/pages/Resource/Works.vue"),
      },
      {
        title: "个人收藏",
        path: "collection",
        component: () => import("@/pages/Resource/collection.vue"),
      },
    ],
  },

  {
    title: "其他管理",
    path: "/other",
    icon: Document,
    redirect: "/article/articleList",
    component: () => import("../pages/index.vue"),
    children: [
      {
        title: "更新日志管理",
        path: "updateLog",
        component: () => import("@/pages/Journal/UpdateLog.vue"),
      },
      {
        title: "bgm管理",
        path: "music",
        icon: User,
        component: () => import("@/pages/Music.vue"),
      },
      {
        title: "台词管理",
        path: "lines",
        icon: ChatRound,
        component: () => import("@/pages/Lines.vue"),
      },
      {
        title: "用户管理",
        path: "user",
        icon: User,
        component: () => import("@/pages/User.vue"),
      },
    ],
  },
];
