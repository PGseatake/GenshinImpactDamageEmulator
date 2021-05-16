import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default ({ app }) => {
    app.router = new VueRouter({
        mode: "history",
        routes: [{
                path: "/",
                name: "home",
                component: () =>
                    import ("~/components/PageIndex.vue"),
            },
            {
                path: "/weapon",
                name: "weapon",
                component: () =>
                    import ("~/components/PageWeapon.vue"),
            },
            {
                path: "/artifact",
                name: "artifact",
                component: () =>
                    import ("~/components/PageArtifact.vue"),
            },
            {
                path: "/releasenote",
                name: "releasenote",
                component: () =>
                    import ("~/components/PageReleaseNote.vue"),
            },
        ],
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition;
            } else {
                return { x: 0, y: 0 };
            }
        },
    })
};