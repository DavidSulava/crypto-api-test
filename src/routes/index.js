import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from 'vue-router';

const SettingPade = () => import('@/pages/SettingsPage/index.vue');
const BookOrderPage = () => import('@/pages/BookOrderPage/index.vue');
const NotFoundPage = () => import('@/pages/NotFoundPage/index.vue');

const routes = [
    {
        path: '/',
        name: 'BookCurrency',
        component: BookOrderPage,
        meta: {
            title: 'Book-Order',
            isAuthRequired: false,
            isNavbar: true,
        }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: SettingPade,
        meta: {
            title: 'Settings',
            isAuthRequired: false,
            isNavbar: true,
        },
    },
    {
        path: '/:catchAll(.*)',
        component: NotFoundPage
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