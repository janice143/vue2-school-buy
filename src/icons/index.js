import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// 全局注册
Vue.component('svg-icon', SvgIcon)

// 自动导入，遍历文件夹的指定文件，无需多次调用import
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

