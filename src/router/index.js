import Vue from 'vue';
import Router from 'vue-router';
import Pos from '@/views/pages/Pos';
import Category from '@/views/pages/category';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Pos',
            component: Pos
        },
        {
            path: '/categories/list',
            name: 'category',
            component: Category
        }
    ]
});