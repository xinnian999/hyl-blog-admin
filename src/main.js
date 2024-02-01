import { createApp } from "vue";
import less from "less";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import components from "./components";
import store from "@/store";
import App from "./App.vue";
// import vueFormCraft from "vue-form-craft";
import vueFormCraft from "./dist/vue-form-craft.mjs";
import { request } from "@/utils";
// morkDown
import VMdEditor from "@kangc/v-md-editor";
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index";
import "@kangc/v-md-editor/lib/plugins/emoji/emoji.css";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import hljs from "highlight.js";
import SvgIcon from "@/components/SvgIcon.vue";

const files = require.context("./assets/icons", true, /\.svg$/);

const iconList = files.keys().map((key) => {
  return key.match(/\/([^\/]+)\.svg$/)[1];
});

// morkDown
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});
VMdEditor.use(createEmojiPlugin());

const vue = createApp(App);

vue.use(store);
vue.use(router);
vue.use(ElementPlus);
vue.use(less);
vue.use(components);
vue.use(VMdEditor);
vue.use(vueFormCraft, {
  request,
  getSchema: async (schemaId) => {
    const { data } = await request({
      url: "/current/query/form",
      params: {
        filters: {
          id: schemaId,
        },
      },
    });
    return JSON.parse(data[0].formSchema);
  },
  icon: { component: SvgIcon, propKey: "name", iconList },
});

vue.mount("#app");
