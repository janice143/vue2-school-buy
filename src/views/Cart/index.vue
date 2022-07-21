<template>
  <div class="cart" v-if="cartList.length > 0">
    <h4>购物车商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">商品</div>
        <div class="cart-th2">单价（元）</div>
        <div class="cart-th2">操作</div>
      </div>

      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartList" :key="cart._id">
          <li class="cart-list-con1">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.title }}</div>
          </li>
          <li class="cart-list-con2">
            <span class="price">￥{{ cart.price }}.00</span>
          </li>

          <li class="cart-list-con2">
            <a
              href="javascript:void(0)"
              class="sindelet"
              @click="deleteCart(cart._id)"
              >删除</a
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="cart-tool">
      <div class="money-box">
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">￥{{ totalPrice }}</i>
        </div>
        <div class="sumbtn" @click="trade">
          <span class="iconfont icon-suoding"></span>结算
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Blank></Blank>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
import Blank from "@/views/Blank";
export default {
  name: "ShopCart",
  components: {
    Blank,
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      // 派发action:通知vuex发get请求，
      this.$store.dispatch("getCartList");
    },
    deleteCart: throttle(async function (id) {
      await this.$store.dispatch("deleteCartById", id);
      this.getData();
    }, 500),
    trade() {
      this.$message.show({
        text: "校园闲置暂时仅支持线下交易！",
        type: "warn",
      });
    },
  },
  computed: {
    ...mapState({
      cartList: (state) => state.cart.cartList,
    }),

    totalPrice() {
      let sum = 0;

      if (this.cartList !== null) {
        this.cartList.forEach((item) => {
          sum += item.price;
        });
      }

      return parseFloat(sum).toFixed(2);
    },
    // isAllChecked(){
    //   //遍历数组里面原理，只要全部元素isChecked属性都为1===>真 true
    // //只要有一个不是1======>假false
    //   return this.cartInfoList.every((item) => item.isChecked === 1);
    // }
  },
};
</script>


<style lang="less" scoped>
@import "../../style/mixin.less";
.cart {
  .px(6em,6em);
  .sc(0.2rem,black);
  // @media screen and (max-width:500px) {
  //   .px(1rem,1rem);
  // }
  // border: 1px solid red;

  h4 {
    .my(0.2rem,0.2rem);
  }

  .cart-main {
    display: flex;
    flex-direction: column;
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      .px(0.2rem,0.2rem);
      .py(0.2rem,0.2rem);
      
      display: flex;
      justify-content: space-between;
      & > div {
        text-align: center;

        // border: 1px solid red;
      }
      .cart-th1 {
        flex: 1;
      }
      .cart-th2 {
        width: 15%;
        
      }
    }

    .cart-body {
      border: 1px solid #ddd;
      display: flex;
      flex-direction: column;

      .cart-list {
        .px(0.2rem,0.2rem);
        .py(0.2rem,0.2rem);
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;

        & > li {
          text-align: center;
        }

        .cart-list-con1 {
           flex: 1;
          display: flex;
          img {
            width: 2rem;
          }

          .item-msg {
            text-align: left;
            .px(0.4rem,0.4rem);
            .py(0.2rem,0.2rem);
            flex: 1;
            align-self: center;
          }
        }

        .cart-list-con2 {
          align-self: center;
          width: 15%;
          // border: 1px solid red;
        }
      }
    }
  }

  .cart-tool {
    border: 1px solid #ddd;
    .money-box {
      .px(0.2rem,0.2rem);
      .py(0.2rem,0.2rem);
      display: flex;
      justify-content: right;
      align-items: center;

      .sumprice {
        //  border: 1px solid red;
        .mx(0.2rem,0.2rem);
        .summoney {
          color: #c81623;
          font-size: 0.4rem;
          font-weight: 900;
        }
      }

      .sumbtn {
        font-size: 0.4rem;
        font-weight: 900;
        // border: 1px solid red;
        .px(0.6rem,0.6rem);
        .py(0.4rem,0.4rem);
        color: #fff;
        // font-family: "Microsoft YaHei";
        background: #333333;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>