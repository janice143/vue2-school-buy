<template>
  <div class="main">
    <ul>
      <li class="card" v-for="product in productlist" :key="product._id">
        <div class="card-img">
          <router-link :to="`/detail/${product._id}`">
            <img :src="product.imgUrl" />
          </router-link>
        </div>
        <div class="card-bottom">
          <div class="row card-title">
            <strong> ¥&nbsp;{{ product.price }} </strong>
            <div>
              <strong>{{ product.hotScore }}</strong>
              人想要
            </div>
          </div>
          <div class="card-text">
            <router-link :to="`/detail/${product._id}`">
              {{ product.title }}
            </router-link>
          </div>
          <div class="row card-text2">
            <div class="user-msg">
              {{ product.username }} | 发布于{{ place(product.username) }}
            </div>
            <!-- <span class="svg-container">
              <svg-icon icon-class="shoucang" />
            </span> -->
            <span
              class="iconfont"
              :class="{
                'icon-shoucang1': wantId.includes(product._id),
                'icon-shoucang': !wantId.includes(product._id),
              }"
              @click="
                addShoucang(
                  {
                    id: product._id,
                    title: product.title,
                    username: userName,
                  },
                  $event
                )
              "
            ></span>
          </div>
        </div>
      </li>
    </ul>
    <Blank v-show="productlist.length === 0"></Blank>
  </div>
</template>

<script>
import { throttle } from "lodash";
import Blank from "@/views/Blank";
export default {
  name: "Main",
  props: ["productlist", "userlist", "wantId"],
  data() {
    return {
      // place:''
      iconswitch: false,
    };
  },
  components: {
    Blank,
  },
  computed: {},

  mounted() {},
  // watch:{
  //   productlist(newVal, oldVal){
  //     this.productlist1 = newVal
  //   }
  // },
  methods: {
    // 展示商品的发布信息
    place(username) {
      // console.log(username)
      // 根据用户名查找place
      // userlist 是要想服务器发请求拿到的，一开始长度可能为空，所以filter之后的结果为空
      if (this.userlist.length > 0) {
        const user =
          this.userlist.filter((user) => user.username === username)[0] || {};
        // console.log(user)
        return user.place;
      }
    },
    // 收藏商品（想要）
    addShoucang: throttle(async function (info, e) {
      // icon-shoucang1 已收藏，icon-shoucang 未收藏
      const addclassname =
        e.target.classList[1] !== "icon-shoucang1"
          ? "icon-shoucang1"
          : "icon-shoucang";

      // 未收藏的时候，发送收藏请求
      if (e.target.classList[1] === "icon-shoucang") {
        // console.log('想要+1')
        try {
          await this.$store.dispatch("wantProduct", info);
          // 让父组件更新
          this.$parent.getProductList();

          //  改变样式
          e.target.classList.remove(e.target.classList[1]);
          e.target.classList.add(addclassname);
        } catch (err) {
          this.$message.show({ text: String(err), type: "error" });
        }
      } else {
        // console.log('想要-1')
        try {
          await this.$store.dispatch("wantNoProduct", info);
          // 让父组件更新
          this.$parent.getProductList();

          //  改变样式
          e.target.classList.remove(e.target.classList[1]);
          e.target.classList.add(addclassname);
        } catch (err) {
          this.$message.show({ text: String(err), type: "error" });
        }
      }
    }, 3000),
  },
  computed: {
    userName() {
      return this.$store.state.user.userInfo.username;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin";
.main {
  // border: 1px solid red;
  // .mx(0.2rem,0);
  ul {
    .mx(1.2rem,1.2rem);
    display: grid;
    gap: 0.125rem;
    grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
    li {
      // 等分剩余空间
      // flex-grow: 1;
      max-height: 7rem;
      max-width: 5rem;
      .px(0.6rem, 0.6rem);
      .py(0.4rem, 0.4rem);
      border: 1px solid rgba(221, 220, 221, 0.5);

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .card-img {
        // border:1px solid red;
        img {
          width: 5rem;
          max-height: 5rem;
        }
      }
      .row {
        display: flex;
        justify-content: space-between;
      }
      .card-title {
        .my(0.1rem,0.1rem);
        strong {
          font-weight: 900;
          // color:red;
          .sc(0.4rem,rgb(199, 33, 33));
        }
      }
      .card-text {
        .my(0.1rem,0.1rem);

        height: 0.8rem;
        line-height: 0.8rem;
      }

      // 平板3列，手机2列
      // @media screen and (min-width: 820px) and (max-width: 1200px) {
      //   // .mx(0.2rem, 0.2rem);
      //   // .my(0.2rem, 0.2rem);
      //   // .px(0.3rem, 0.3rem);
      //   // .py(0.4rem, 0.4rem);
      //   border: 1px solid rgb(239, 221, 246);
      //   display: flex;
      //   flex-direction: column;
      //   justify-content: space-between;

      //   .card-img {
      //     // border:1px solid red;
      //     img {
      //       width: 4rem;
      //     }
      //   }
      //   .row {
      //     display: flex;
      //     justify-content: space-between;
      //   }
      //   .card-title {
      //     .my(0.1rem,0.1rem);
      //     strong {
      //       font-weight: 900;
      //       // color:red;
      //       .sc(0.3rem,rgb(199, 33, 33));
      //     }
      //   }
      //   .card-text {
      //     // .my(0.1rem,0.1rem);

      //     height: 0.4rem;
      //     line-height: 0.4rem;
      //   }
      // }
      // @media screen and (min-width: 400px) and (max-width: 600px) {
      //   .mx(0.2rem, 0.2rem);
      //   .my(0.2rem, 0.2rem);
      //   .px(0.3rem, 0.3rem);
      //   .py(0.4rem, 0.4rem);

      //   .card-img {
      //     // border:1px solid red;
      //     img {
      //       width: 5rem;
      //     }
      //   }
      //   .card-title > * {
      //     font-size: 0.1rem;
      //     transform: scale(0.8);
      //   }
      //   .card-text > * {
      //     font-size: 0.1rem;
      //     transform: scale(0.8);
      //   }
      //   .card-text2 {
      //     .user-msg {
      //       font-size: 0.1rem;
      //       transform: scale(0.8);
      //     }
      //   }
      // }
    }
    // 手机适配
    @media (max-width: 450px) {
      .mx(0rem,0rem);
      gap: 0.2rem;
      grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
      li {
        .card-img {
          width: 3.5rem;
          img {
            width: 100%;
            max-height: 4rem;
          }
        }
        .card-text2 {
          .user-msg {
            display: none;
          }
          justify-content: right;
        }
      }
    }
    @media (min-width: 451px) and (max-width: 600px) {
       .mx(0rem,0rem);
      gap: 0.2rem;
      grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
      li {
        .card-img {
          // border:1px solid red;
          width: 4.2rem;
          img {
            width: 100%;
            max-height: 4rem;
          }
        }
        .card-text2 {
          .user-msg {
            display: none;
          }
          justify-content: right;
        }
      }
    }
  }
}

</style>