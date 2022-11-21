import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  routes: [
    // 登录模块
    {
      path: "/",
      component: () => import("@/pages/login.vue"),
    },
    // 后台模块
    {
      path: "/backstage",
      component: () => import("@/pages/backstage.vue"),
      redirect: "/backstage/order",
      children: [
        {
          path: "order",
          redirect: "/backstage/order/approving",
          component: () => import("@/pages/backstage/order.vue"),
          children: [
            {
              path: "approving",
              component: () => import("@/pages/backstage/order/approving.vue"),
            },
            {
              path: "using",
              component: () => import("@/pages/backstage/order/using.vue"),
            },
            {
              path: "completed",
              component: () => import("@/pages/backstage/order/completed.vue"),
            },
            {
              path: "cancel",
              component: () => import("@/pages/backstage/order/cancel.vue"),
            },
          ],
        },
        {
          path: "membermanage",
          component: () => import("@/pages/backstage/memberManage.vue"),
          redirect: "/backstage/membermanage/organization?id=1",
          children: [
            {
              path: "organization",
              component: () =>
                import("@/pages/backstage/memberManage/organization.vue"),
              props({query}){
                return {departmentTypeId:query.id}
              }
            }
          ],
        },
        {
          path: "meetingRoomManage",
          component: () => import("@/pages/backstage/meetingRoomManage.vue"),
          children: [
            {
              path: "mainpage/:id",
              component: () =>
                import("@/pages/backstage/meetingRoomManage/mainPage.vue"),
            },
          ],
        },
      ],
    },
  ],
  history: createWebHistory(),
});

export default router;
