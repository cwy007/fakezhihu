import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./assets/styles/main.scss";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import CommentList from "@/components/CommentList";

Vue.component("CommentList", CommentList);

Vue.config.productionTip = false; // 关闭生产环境提示

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
