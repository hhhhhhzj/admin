const routes = [
    {
        path: '/index',
        component: () => import('@/views/home/Home.vue')
    },
    {
        path: '/center',
        component: () => import('@/views/center/Center.vue')
    },
    {
        path: '/user-manage/adduser',
        component: () => import('@/views/user-manage/UserAdd.vue'),
        requireAdmin: true
    },
    {
        path: '/user-manage/userlist',
        component: () => import('@/views/user-manage/UserList.vue'),
        requireAdmin: true
    },
    {
        path: '/product-manage/productlist',
        component: () => import('@/views/product-manage/ProductList.vue')
    },
    {
        path: '/product-manage/addproduct',
        component: () => import('@/views/product-manage/ProductAdd.vue')
    },
    {
        path: '/news-manage/newslist',
        component: () => import('@/views/news-manage/NewsList.vue')
    },
    {
        path: '/news-manage/addnews',
        component: () => import('@/views/news-manage/NewsAdd.vue')
    },
    {
        path: '/',
        redirect: '/index'   // 默认跳转到首页
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Notfound',
        component: () => import('@/views/notfound/NotFound.vue')
    },
    {
        path: '/product-manage/editproduct/:id',
        component: () => import('@/views/product-manage/ProductEdit.vue')
    },
    {
        path: '/news-manage/editnews/:id',
        component: () => import('@/views/news-manage/NewsEdit.vue')
    }
]

export default routes