// 对axios进行二次封装
import axios from "axios"
import nprogress from "nprogress";
//如果出现进度条没有显示：一定是你忘记了引入样式了
import "nprogress/nprogress.css";
//在当前模块中引入store
import store from '@/store';


const requests = axios.create({
    // 基础路径
    baseURL: "/api",
    // 请求不能超过5秒
    timeout: 5000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    // 需要携带token带给服务器
    if(store.state.user.token){
        config.headers.Authorization = store.state.user.token;
    }
    nprogress.start();
    return config;
})

// 响应拦截器
requests.interceptors.response.use(
    (res) => {
        //进度条结束
        nprogress.done();
        //相应成功做的事情
        return res.data;
    },
    (err) => {
        alert("服务器响应数据失败");
    }
)

export default requests


