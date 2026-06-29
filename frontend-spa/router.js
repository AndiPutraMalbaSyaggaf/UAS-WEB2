// router.js
const routes = [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
    { path: "/kategori", component: Kategori, meta: { requiresAuth: true } },
    { path: "/barang", component: Barang, meta: { requiresAuth: true } },
    { path: "/supplier", component: Supplier, meta: { requiresAuth: true } },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

// Proteksi
router.beforeEach((to, from, next) => {
    console.log('Navigasi ke:', to.path);
    console.log('Token:', localStorage.getItem('token'));
    
    if (to.meta.requiresAuth) {
        if (!localStorage.getItem('token')) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

console.log('Router created!');