import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../pages/WelcomePage.vue";
import Board from "../pages/BoardPage.vue";
import { useUserStore } from "@/store/user";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "welcome",
            component: Welcome
        },
        {
            path: "/board",
            name: "board",
            component: Board
        }
    ]
});

const unguardedRoutes: string[] = ["/"];

router.beforeEach((to, _from, next) => {
    const userStore = useUserStore();

    if (unguardedRoutes.includes(to.path)) {
        return next();
    }

    if (!userStore.username) {
        return next({ name: "welcome" });
    }

    return next();
});

export default router;
