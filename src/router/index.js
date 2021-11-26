import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    children: [
      {
        path: "/overview",
        component: () =>
          import(/* webpackChunkName: "overview" */ "../views/Overview.vue"),
      },
      {
        path: "/expense",
        component: () =>
          import(/* webpackChunkName: "expense" */ "../views/Expense.vue"),
      },
      {
        path: "/bill",
        component: () =>
          import(/* webpackChunkName: "new-connection" */ "../views/Bill.vue"),
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = localStorage.token == null ? false : true;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
