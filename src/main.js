import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { io } from "socket.io-client";
import App from "./App.vue";

import Ping from "./components/Tests/Ping.vue";
import SSL from "./components/Tests/SSL.vue";
import Dig from "./components/Tests/Dig.vue";
import Nmap from "./components/Tests/Nmap.vue";
import Traceroute from "./components/Tests/Traceroute.vue";

const routes = [
  { path: "/ping", component: Ping },
  { path: "/", component: SSL },
  { path: "/dig", component: Dig },
  { path: "/nmap", component: Nmap },
  { path: "/traceroute", component: Traceroute },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkExactActiveClass: "green-pill",
  linkActiveClass: "",
  routes,
});

const app = createApp(App);
app.config.globalProperties.$socket = io();
app.use(router);
app.mount("#app");
