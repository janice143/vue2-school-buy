import Vue from 'vue'
import App from './App.vue'
//引入仓库进行注册
import store from "@/store";
// 引入路由
import router from '@/router'

// 引入swiper css样式
import 'swiper/css/swiper.css'

// 引入rem适配方案
import '@/config/rem'

// 引入icon
import '@/icons/index'

// 引入消息弹框组件
import Message from '@/components/Message/message.js';
Vue.use(Message); // 会去执行Message.js中的install方法


// 注册编辑器为全局组件
import Editor from '@/components/Editor'
Vue.component(Editor.name,Editor)

// 按需引入
import { Form, FormItem,Input,Button,Select,Option  } from 'element-ui'
Vue.use(Form).use(FormItem).use(Input).use(Button).use(Select).use(Option)

// 引入图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.gif';
Vue.use(VueLazyload,{
  preLoad: 1.3,
  loading: loading,
  attempt: 1
})

// // 全局 骨架屏
import Skeleton from 'vue-loading-skeleton';
Vue.use(Skeleton)

// import { reqgetCategoryList } from "@/api";
// const res = reqgetCategoryList();
// res.then((res=>{
//   console.log(res)
// }))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this;
  },
  //在入口文件这里注册store,在每一个组件的身上都拥有一个$store这个属性
  store,
  router,
  
}).$mount('#app')
