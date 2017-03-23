import VueRouter from 'vue-router'

const home = { template: '<div>this is home page</div>' };
const news = { template: '<div>this is news page！<router-link :to="{ name: \'profile\', params: { userId: 123 }}">profile</router-link> <router-view></router-view></div>' };
const about = { template: '<div>this is about page</div>' };

const UserProfile = { template: '<div>this is UserProfile</div>' };
const UserPosts = { template: '<div>this is UserPosts</div>' };

import StyleManager from './components/styleManage/StyleManager.vue';
import CaseManager from './components/caseManage/CaseManager.vue';
import OrderManager from './components/orderManage/OrderManager.vue';
import OrderDetail from './components/orderManage/OrderDetail.vue';
import LogManager from './components/logManage/LogManager.vue';

const routes = [
  { path: '/styleManage', component: StyleManager, name: '风格管理' },
  { path: '/caseManage', component: CaseManager, name: '案例管理' },
  /*{
    path: '/caseManage', component: StyleManager, name: '案例管理', children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'profile',
        name: 'profile',
        component: UserProfile
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'posts',
        name: 'posts',
        component: UserPosts
      }
    ]
  },*/
  { path: '/order', component: OrderManager, name: '工单管理' },
  { path: '/orderDetail', component: OrderDetail, name: '工单详情' },
  { path: '/log', component: LogManager, name: '日志管理' },
  { path: '/role', component: UserProfile, name: '角色管理' },
  { path: '/employee', component: about, name: '员工管理' }
];

const router = new VueRouter({ routes });

export default router;
