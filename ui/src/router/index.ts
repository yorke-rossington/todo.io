import { createRouter, createWebHistory } from "vue-router";
import JoinPage from "@/pages/join/JoinPage.vue";
import Board from "@/pages/board/BoardPage.vue";
import { useUserStore } from "@/store/user";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/join"
        },
        {
            path: "/join",
            name: "join",
            component: JoinPage
        },
        {
            path: "/board",
            name: "board",
            component: Board
        }
    ]
});

const unguardedRoutes: string[] = ["/", "/join"];

router.beforeEach((to, _from, next) => {
    const userStore = useUserStore();

    if (unguardedRoutes.includes(to.path)) {
        return next();
    }

    if (!userStore.username) {
        return next({ name: "join" });
    }

    return next();
});

export default router;
