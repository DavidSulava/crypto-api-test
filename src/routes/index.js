import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from "vue-router";

const CurrencyPair = () => import("@/pages/CurrencyPair/index.vue");
const BookOrder = () => import("@/pages/BookOrder/index.vue");
const NotFoundComponent = () => import("@/pages/NotFound/index.vue");

const routes = [
    {
        path: '/',
        name: 'CurrencyPair',
        component: CurrencyPair,
        meta: {
            title: 'Settings',
            isAuthRequired: false,
            isNavbar: true,
        },
    },
    {
        path: '/book-correctly',
        name: 'BookCorrectly',
        component: BookOrder,
        meta: {
            title: 'Book-Order',
            isAuthRequired: false,
            isNavbar: true,
        }
    },
    {
        path: '/:catchAll(.*)',
        component: NotFoundComponent
    }
]
const router = createRouter({
    history: createWebHistory('#'),
    hash: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash,
                behavior: 'smooth',
            };
        }
        return savedPosition || {x: 0, y: 0, behavior: 'smooth'}; // При переходе на Vue 3 поменять на - { left: 0, top: 0, behavior: "smooth" }
    },
});

export default router;