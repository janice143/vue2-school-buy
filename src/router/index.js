// 配置路由
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

// 多次跳转相同路由会出现问题，下面可以解决
const originalRouter = Router.prototype.push;
Router.prototype.push = function(location){
    return originalRouter.call(this,location).catch(err=>err)
}
// 使用路由插件
Vue.use(Router)


// 配置路由
// keepAlive为true即为需要缓存的组件，同时设置isBack属性，用来标示页面是否是从详情页面返回的。
const router = new Router({
    mode:'history',
    routes:[
        // 重定向
        {
            path: '/',
            redirect:'/home',
        },
        // 主页
        {
            path: '/home',
            component: () => import('../views/Home'),
            meta:{
                isShow:true,
                keepAlive: true,
                isBack: false
            }
        },
        {
            path:'/search/:keyword?', // 占位，路由传参
            component:() => import('../views/Home'),
            meta:{
                isShow:true,
                keepAlive: true,

            },
            name:'search'
        },
        {
            path:'/detail/:productId',
            component:() => import('../views/Detail'),
            meta:{
                isShow:true,
                keepAlive: false,
   
            },
            name:'detail'

        },
        {
            path:'/register',
            component:() => import('../views/Register'),
            meta:{
                isShow:false,
                keepAlive: true,
            }
        },
        {
            path:'/login',
            component:() => import('../views/Login'),
            meta:{
                isShow:false,
                keepAlive: false,
            }
        },
        {
            path: '/cart',
            component: () => import('../views/Cart'),
            meta:{
                isShow:true,
                keepAlive: false,
            }
        },
        {
            path: '/completeinfo',
            component: () => import('../views/CompleteInfo'),
            meta:{
                isShow:false,
                keepAlive: true,
            }
        }
       
    ]
})

// 注册一个全局前置守卫
router.beforeEach((to, from,next) => {
    // console.log(store);
    const token = store.state.user.token
    const name = store.state.user.userInfo.name
   
    // 如果登录了，用户想再去登录，不能去。只能放行到首页
    if(token){
       
        //已经登录而且还想去登录------不行
        if(to.path === "/login" || to.path === "/register"){
           next('/')
           
        }else{
        // 登录后，如果有用户名（说明获取了用户信息），那就放行，如果没有用户名，那就派发ation获取用户信息
        
          if(name){
            
            next()
          }else{
            
            //登陆了且没有用户信息
            //在路由跳转之前获取用户信息且放行
            (async()=>{
                try {
                    await store.dispatch('getUser')
                    next()
                } catch (error) {
                  //token失效,重新登录
                    await store.dispatch('userLogoutClear')
                    next('/home')
                }
            })()
          }
        }
    }else{
       
        // 用户未登录，不能去/cart,/trade,/center
        const toPath = to.path
        // console.log(toPath)
        if(toPath === '/cart' || toPath === '/completeinfo'){
            
            //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect=' + toPath)
        }else{
            //去的不是上面这些路由（home|search|shopCart）---放行
            next()
        }
       
    }
})
export default router;

