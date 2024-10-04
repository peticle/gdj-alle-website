import { createMemoryHistory, createRouter } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createMemoryHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
  },
});

export default router;
