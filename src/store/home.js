import { reqgetCategory, reqgetProductList, reqgetUsersdetail} from "@/api";
//home模块的仓库
const state = {
  //home仓库中存储菜单的数据
  category: [],
  // 全部商品
  productlist:[],
  searchInfo: {},
  userlist:[]
};
//mutions是唯一修改state的地方
const mutations = {
  GETCATEGORY(state, category) {
    state.category = category;
  },
  GETPRODUCTLIST(state, productlist) {
    state.productlist = productlist;
  },
  GETUSERSDETAIL(state,users){
    state.userlist = users
  }

};
//action|用户处理派发action地方的，可以书写异步语句、自己逻辑地方
const actions = {
  async getCategory({ commit }) {
    //reqgetCategoryList返回的是一个Promise对象
    //需要用await接受成功返回的结果，await必须要结合async一起使用（CP）
    const result = await reqgetCategory();
    // console.log(result)
    if (result.code == 200) {
      commit("GETCATEGORY", result.data);
    }
  },
  async getProductList({ commit },conditions={}) {
    //reqgetCategoryList返回的是一个Promise对象
    //需要用await接受成功返回的结果，await必须要结合async一起使用（CP）
    const result = await reqgetProductList(conditions);
    // console.log(result)
    if (result.code === 200) {
      commit("GETPRODUCTLIST", result.data);
    }
  },
  async getUsersdetail({commit}){
    //需要用await接受成功返回的结果，await必须要结合async一起使用（CP）
    const result = await reqgetUsersdetail();
    // console.log(result)
    if (result.code === 200) {
      commit("GETUSERSDETAIL", result.data);
    }
  },
  
 
};
//计算属性
const getters = {
//   userList(state){
//     return state.goodDetail.categoryView || {};
// },
}


export default {
  state,
  mutations,
  actions,
  getters,
};
