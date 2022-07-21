<template>
  <div class="detail">
    <div class="previewWrap">
      <!--放大镜效果-->
      <Zoom :productImg="productDetail.gallery" />
      <!-- 小图列表 -->
      <ImageList :productImg="productDetail.gallery" />

      <div class="shopcart">
          <span @click="addShopcar">加入购物车</span>
      </div>
    </div>

    <!-- 右侧选择区域布局 -->
    <div class="InfoWrap">
      <h3 class="InfoName">
        {{ productDetail.title }}
      </h3>

      <div class="row priceArea">
        <strong>
          ¥&nbsp;{{ productDetail.price }}
        </strong>
        <div>
          <strong>{{ productDetail.hotScore }}</strong>
          人想要
        </div>
      </div>
      <div class="description">
        <MyEditor :description="productDetail.description"></MyEditor>
      </div>

      <div class="userinfo">
          <div class="userinfo1">{{ productDetail.username }} </div>
          <div class="userinfo1">{{ place(productDetail.username) }}</div>
          <div class="userinfo1">{{ time }}</div>
      </div>

      
    </div>
  </div>
</template>

<script>
// import { component } from "vue/types/umd";
import { mapState } from "vuex";
import ImageList from "./ImageList/ImageList";
import Zoom from "./Zoom/Zoom";

export default {
  name: "Detail",
  data() {
    return {
      // description:'<p style="text-indent: 0px; text-align: start;"><strong>::before&nbsp;和&nbsp;:after&nbsp;的双冒号和单冒号区别</strong></p><p style="text-indent: 0px; text-align: start;">（1）冒号(<code>:</code>)用于<code>CSS3</code>伪类，双冒号(<code>::</code>)用于<code>CSS3</code>伪元素。&nbsp;（2）<code>::before</code>就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于<code>dom</code>之中，只存在在页面之中。</p><p style="text-indent: 0px; text-align: start;"><strong>注意：</strong>&nbsp;<code>:before</code>和&nbsp;<code>:after</code>&nbsp;这两个伪元素，是在<code>CSS2.1</code>里新出现的。起初，伪元素的前缀使用的是单冒号语法，但随着<code>Web</code>的进化，在<code>CSS3</code>的规范里，伪元素的语法被修改成使用双冒号，成为<code>::before</code>、<code>::after</code>。</p><p style="text-indent: 0px; text-align: start;"><br></p><hr/><p>😇🙂</p><p style="text-align: center;">权利的游戏</p><ol><li style="text-indent: 0px; text-align: start;">冒号(<code>:</code>)用于<code>CSS3</code>伪类，双冒一段文字号(<code>::</code>)用于<code>CSS3</code>伪元素。&nbsp;（2）<code>::before</code>就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于<code>dom</code>之中，只存在在页面之中。</li></ol><p style="text-indent: 0px; text-align: start;"><strong>注意：</strong>&nbsp;<code>:before</code>和&nbsp;<code>:after</code>&nbsp;这两个伪元素，是在<code>CSS2.1</code>里新出现的。起初，伪元素的前缀使用的是单冒号语法，但随着<code>Web</code>的进化，在<code>CSS3</code>的规范里，伪元素的语法被修改成使用双冒号，成为<code>::before</code>、<code>::after</code>。</p>',
    };
  },
  components: {
    ImageList,
    Zoom,
  },
  mounted() {
    // 派发一个请求
    this.$store.dispatch("getProductDetail", this.$route.params.productId);
  },
  computed: {
    ...mapState({
      productDetail: (state) => state.detail.productDetail,
    }),
    userlist() {
      return this.$store.state.home.userlist;
    },
    time() {
      const date = new Date(+this.productDetail.createTime);
      const Y = date.getFullYear() + "-";
      const M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      const D = date.getDate() + " ";
      const h = date.getHours() + ":";
      const m = date.getMinutes() + ":";
      const s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
  },
  methods: {
    place(username) {
      // console.log(username)
      // 根据用户名查找place
      // userlist 是要想服务器发请求拿到的，一开始长度可能为空，所以filter之后的结果为空
      if (this.userlist.length > 0) {
        // console.log(this.userlist.filter((user) => user.username === username)[0].place)
        // 过滤操作需要一定时间，没拿到最后数据前没定义，所以要赋空对象
        const user =
          this.userlist.filter((user) => user.username === username)[0] || {};
        // console.log(user)
        return user.place;
      }
      // return '111'
    },
    async addShopcar() {
      const token = this.$store.state.user.token;
      // 如果登录了
      if (token) {
        // console.log('加入购物车')
        // 点击购物车按钮，把参数带给服务器 productId
        const productId = this.$route.params.productId;
        try {
          //成功
          await this.$store.dispatch("addProductinToCart", productId);

          //产品信息的数据【比较复杂:skuInfo】,通过会话存储（不持久化,会话结束数据在消失）
          //本地存储|会话存储，一般存储的是字符串
          // sessionStorage.setItem("SKUINFO",JSON.stringify(this.skuInfo));
          this.$message.show({ text: "成功加入购物车", type: "success" });
        } catch (error) {
          //失败
          this.$message.show({ text: error.message, type: "error" });
        }
      } else {
        // 如果没登录
        this.$message.show({
          text: "你还未登录，不能加入购物车！",
          type: "warn",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin";
.detail {
  .my(1rem,0);
  .px(4rem,4rem);
  // border: 1px solid red;
  display: flex;
  // justify-content: center;
  @media screen and (max-width: 900px) {
    flex-direction: column;
    .my(1rem,0);
    .px(1rem,1rem);
  }

  .previewWrap {
    // border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
    .shopcart{
      // .py(0rem,0.5rem);
      margin: 0 auto;
      .my(0.5rem,0.5rem);
      width:30%;
      height: rem;
      text-align: center;
      line-height: 1rem;
      background-color:rgb(199, 33, 33) ;
      color:white;
      cursor: pointer;
      
    // border: 1px solid red;
    }
  }
  .InfoWrap {
    // .mx(1rem,1rem);
    .px(0.5rem,0.5rem);
    .py(0rem,0.5rem);
    flex: 1;
    // border: 1px solid red;
    .row{
      .my(0.5rem,0rem);
      .py(0.5rem,0.5rem);
      .px(0.5rem,0.5rem);
      display: flex;
      justify-content: space-between;
      background-color: rgb(239, 221, 246);
      strong{
        font-weight: 900;
        .sc(0.4rem,rgb(199, 33, 33));
      }
    }
    .userinfo{
      border-top: 1px solid #ccc;
      .my(0.5rem,0rem);
      .py(0.2rem,0rem);
      display: flex;
      // justify-content: space-between;
      .sc(0.3rem,black);
      font-weight: 900;
      & > *{
        border-right: 1px solid #ccc;
        .px(0.5rem,0.5rem);
        .py(0.2rem,0.2rem);
        text-align: center;
        // border-radius: 1rem;
       }
        // p:nth-child() 选择p元素的父元素的第二个子元素的p
        .userinfo1:nth-child(3){
        border: none;
        // background-color: red;
        
      }
       

    }
    
  }
}

</style>