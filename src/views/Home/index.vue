<template>
  <div class="home">
    <!-- 两栏布局 -->
    <TypeNav @getCategoryName="getCategoryName"></TypeNav>
    <div class="main">
      <MainNav @getNewOrder="getNewOrder"></MainNav>
      <!-- <SkeletonPage></SkeletonPage>   -->
      <SkeletonPage v-if="skeletonLoading"></SkeletonPage>  
      <Main
         v-else
        :wantId="wantId"
        :productlist="productlist"
        :userlist="userlist"
        :pageNo="conditions.pageNo"
        :pageSize="conditions.pageSize"
        :totalCount="totalCount"
      ></Main>
      

      <Pagination
        :pageNo="conditions.pageNo"
        :pageSize="conditions.pageSize"
        :total="totalCount"
        continues="5"
        @getPageNo="getPageNo"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import TypeNav from "@/views/TypeNav";
import Main from "@/views/Main";
import MainNav from "@/views/MainNav";
import Pagination from "@/views/Pagination";
import SkeletonPage from "@/components/SkeletonPage";



import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    TypeNav,
    Main,
    Pagination,
    MainNav,
    SkeletonPage,
  },

  data() {
    return {
      getMain: {
        getUsrl: false,
        getTotalCount: false, // TotalCount数据拿到 ，说明state.home.productlist接收到了数据，所以有wantid，和productlist数据，所以只判断一个就行
      },
      // 带给服务器传入的参数
      conditions: {
        //产品相应的级次
        category1Id: "",
        //产品的名字
        categoryName: "",
        //搜索的关键字 keyword
        keyword: "",
        //排序:初始状态应该是综合且降序
        order: "1:desc",
        //第几页
        pageNo: 1,
        //每一页展示条数
        pageSize: 8,
      },
    };
  },

  mounted() {
    //派发一个action||获取商品分类的数据
    this.$store.dispatch("getCategory");
    // 想服务器发送请求，获取全部商品列表
    this.getProductList();
    // 获取商品展示的用户信息
    this.$store.dispatch("getUsersdetail");
    // 获取用户登录信息
    this.getUser();
  },
  computed: {
    //state:他是咱们大仓库中的state（包含home|search）
    ...mapState({
      productlist: (state) => state.home.productlist.productlist,
      wantId: (state) => state.home.productlist.wantId,
      userlist: (state) => state.home.userlist,
      totalCount: (state) => state.home.productlist.totalCount,
    }),
    // 骨架屏加载状态
    // skeletonLoading: true,
    skeletonLoading() {
      // console.log(this.getMain)
      return !(
        this.getMain.getUsrl &&
        this.getMain.getTotalCount
      );
    },
  },
  methods: {
    async getUser() {
      try {
        await this.$store.dispatch("getUser");
      } catch (err) {
        // console.log(err)
      }
    },
    getProductList() {
      this.$store.dispatch("getProductList", this.conditions);
    },
    // 拿到子组件中的分类名字
    getCategoryName(categoryName) {
      //   console.log("拿到子组件数据", categoryName);
      //   将pageNo置为1
      this.conditions.pageNo = 1;
      this.conditions.categoryName = categoryName;
      // // 向服务器发送请求
      this.getProductList();
    },
    // 自定义事件
    getPageNo(page) {
      this.conditions.pageNo = page;
      // 向服务器发送请求
      this.getProductList();
    },
    // 获取最新的排序方式
    getNewOrder(newOrder) {
      this.conditions.order = newOrder;
      // 拿到最新的排序方式后，向服务器发送请求
      this.getProductList();
    },
  },
  watch: {
    // 监听Main的数据
    userlist(value) {
      if (value.length > 0) {
        this.$nextTick(() => {
          this.getMain.getUsrl = true;
        });
      }
    },
    totalCount(value) {
      if (value > 0) {
        this.$nextTick(() => {
          this.getMain.getTotalCount = true;
        });
      }
    },
    //监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route(newValue, oldValue) {
      //每一次请求完毕，应该把相应的1级分类的id置空的
      //再次发请求之前整理带给服务器参数
      this.conditions.categoryName =
        this.$route.query.categoryName === undefined
          ? "全部商品"
          : this.$route.query.categoryName;
      this.conditions.category1Id =
        this.$route.query.category1Id === undefined
          ? 0
          : this.$route.query.category1Id;
      this.conditions.keyword = this.$route.params.keyword;
      // Object.assign(this.conditions, this.$route.query, this.$route.params);
      // console.log(this.conditions)
      // //再次发起ajax请求
      this.getProductList();
      // //分类名字与关键字不用清理：因为每一次路由发生变化的时候，都会给他赋予新的数据
      // // 否则下一次发起搜索请求的时候，这些值还存在，会请求到
      this.conditions.category1Id = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../style/mixin.less';
.home{
  
  background-color: rgb(249,249,249);
  display: flex;
  .px(0.8rem,0.8rem);
  .py(0.6rem,1rem);
  .main{
    flex:1;
    .mx(0.2rem,0);
    @media screen and (max-width: 400px) {
      .mx(0.3rem,0);
    }
  }
}
</style>