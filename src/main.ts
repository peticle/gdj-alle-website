import { createApp, type App as VueApp } from "vue";
import { router } from "@/router";
import App from "./App.vue";
import "@/styles/main.scss";

const app: VueApp<Element> = createApp(App);
app.use(router);
app.mount("body");
