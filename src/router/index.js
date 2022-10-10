import Vue from "vue";
import VueRouter from "vue-router";
import routeView from "@/components/routeView"
// import HelloWorld from './../components/HelloWorld.vue'

Vue.use(VueRouter);

const routes=[
    {
        path:'/',
        name:'首页',
        component:()=>import('./../views/antTable.vue')
    },
    {
        path:'/fristMenus',
        name:'首页父',
        component:routeView,
        children:[
            {
                path:'111',
                name:'子项1',
                component:()=>import('./../views/antTable.vue')
            },
            {
                path:'222',
                name:'子项2',
                component:()=>import('./../views/antTable.vue')
            }
        ],
        
    },
];
const router=new VueRouter({
    routes:routes
})
export default router;
