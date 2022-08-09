import { createApp } from "vue";
import less from "less";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import components from "./components";
import store from "@/store";
import App from "./App.vue";

// morkDown
import VMdEditor from "@kangc/v-md-editor";
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index";
import "@kangc/v-md-editor/lib/plugins/emoji/emoji.css";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import hljs from "highlight.js";
// morkDown
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});
VMdEditor.use(createEmojiPlugin());

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(less);
app.use(components);
app.use(VMdEditor);

app.mount("#app");
