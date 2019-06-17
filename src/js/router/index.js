import Vue from 'vue';
import Router from 'vue-router';

import HomeView from '../components/Home.vue';
import LoginView from '../components/auth/Login.vue';
import RegisterView from '../components/auth/Register.vue';
import ProfileSettings from '../components/profile/settings';

import axios from 'axios';
import { auth } from '../services/firebase';

Vue.prototype.$http = axios;

Vue.use(Router);

const router = new Router({
  routes: [
      {
          path: '/home',
          name: 'home',
          component: HomeView,
          meta: {
            requiresAuth: true
          }
      },
      {
          path: '/profile',
          name: 'profile',
          component: ProfileSettings,
          meta: {
              requiresAuth: true
          }
      },
      {
          path: '/login',
          name: 'login',
          component: LoginView,
      },
      {
          path: '/register',
          name: 'register',
          component: RegisterView
      },
    // {
    //   path: '/detail/:id',
    //   name: 'detail',
    //   component: DetailView
    // },
    // {
    //   path: '/post',
    //   name: 'post',
    //   component: PostView
    // },
    // {
    //   path: '/camera',
    //   name: 'camera',
    //   component: CameraView
    // },
  ]
});

router.beforeEach((to, from, next) => {
    const currentUser = auth.currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (to.matched.length === 0 || (requiresAuth && ! currentUser)) next('login');
    else if (! requiresAuth && currentUser) next('home');
    else next();
});


export default router;

