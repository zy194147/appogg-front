import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import IndexPage from '../pages/IndexPage'



Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('@/pages/Test.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/login/login.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/pages/login/signup.vue'),
    },
    {
      path: '/recover',
      name: 'Recover',
      component: () => import('@/pages/login/recover.vue'),
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: () => import('@/pages/privacy/Privacy.vue'),
    },


    //article
    {
      path: '/articleIndex',
      name: 'ArticleIndex',
      component: () => import('@/pages/article/ArticleIndex.vue'),
    },
    {
      path: '/articleDetails',
      name: 'ArticleDetails',
      component: () => import('@/pages/article/ArticleDetails.vue'),
    },
    {
      path: '/articlePush',
      name: 'ArticlePush',
      component: () => import('@/pages/article/ArticlePush.vue'),
    },

    //user
    {
      path: '/user',
      name: 'UserPage',
      component: () => import('@/pages/user/UserPage.vue'),
    },


    //soft
    {
      path: '/soft',
      name: 'softIndex',
      component: () => import('@/pages/soft/softIndex.vue'),
    },
    {
      path: '/softPush',
      name: 'softPush',
      component: () => import('@/pages/soft/softPush.vue'),
    },


    //need
    {
      path: '/need',
      name: 'needIndex',
      component: () => import('@/pages/need/needIndex.vue'),
    },
    {
      path: '/needPush',
      name: 'needPush',
      component: () => import('@/pages/need/needPush.vue'),
    },


    //about
    {
      path: '/about',
      name: 'aboutPage',
      component: () => import('@/pages/about/aboutPage.vue'),
    },
  ]
});


// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/articlePush') {
    let token = localStorage.getItem('token');
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
