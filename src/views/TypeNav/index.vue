<template>
  <div class="menu">
    <ul>
      <li
        v-for="(cat, index) in category"
        :key="index"
        @click="changeIdx(index, $event)"
        :class="{ curStyle: curIndex === index }"
      >
        <a :data-id="index" href="">
          <span class="svg-container">
            <svg-icon :icon-class="cat.icon" />
          </span>
          <span class="item-name">{{ cat.name }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
// import { mapState } from "vuex";
//引入lodash:是把lodash全部封装好的函数全都引入进来了
//按需引入：只是引入节流函数，其他的函数没有引入（模块），这样做的好处是，当你打包项目的时候体积会小一些
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //当前这个属性决定了到底那个h3身上有类名
      curIndex: 0,
      show: true,
      category: [
        {
          name: "全部商品",
          icon: "home",
        },
        {
          name: "图书办公",
          icon: "shu",
        },
        {
          name: "数码电器",
          icon: "shouji",
        },
        {
          name: "珠宝装饰",
          icon: "xianglian",
        },
        {
          name: "玩具乐器",
          icon: "wanjuxiong",
        },
        {
          name: "票务娱乐",
          icon: "dianyingpiao",
        },
        {
          name: "居家日用",
          icon: "riyongbaihuo",
        },
        {
          name: "个护美妆",
          icon: "huazhuangpin",
        },
        {
          name: "服饰鞋靴",
          icon: "clothes",
        },
        {
          name: "箱包",
          icon: "nvbao",
        },
        {
          name: "食品饮料",
          icon: "jinkoushipin",
        },
        {
          name: "运动户外",
          icon: "zihangche",
        },
      ],
    };
  },

  //发请求经常在mounted生命周期函数中进行
  //组件挂载完毕
  mounted() {},
  //计算属性
  computed: {
    //state:他是咱们大仓库中的state（包含home|search）
    // ...mapState({
    //   category: (state) => state.home.category,
    // }),
  },
  methods: {
    // 为了实现函数节流，用了ES5的写法
    changeIdx: throttle(function (index, e) {
      this.curIndex = index;
      // 把分类名字传给父组件，父组件中发请求
      const categoryName = this.category[index].name;
      this.$emit("getCategoryName", categoryName);
      // 如果 类名是全部商品，并且没有关键字，那么路径重定向为Home
      if (categoryName === "全部商品") {
        // console.log(111);
        this.$router.push("/home");
        // this.$route.params = ''
      } else {
        // 如果类名是其他，那么传对应参数给路由
        //准备路由跳转的参数对象
        let location = { name: "search" };
        let query = { categoryName: categoryName };
        //一定是a标签：一级目录
        query.category1Id = index;

        // 由于在搜索框中输入字符搜索时，该参数是在params上，所以要顺带带上params参数
        if (this.$route.params) {
          location.params = this.$route.params;
          //动态给location配置对象添加query属性
          location.query = query;
          //路由跳转
          this.$router.push(location);
          // console.log(location)
        }
      }
      e.preventDefault();
    }),
  },
};
</script>

<style scoped lang="less">
@import "../../style/mixin";

.menu {
  min-width: 2rem;
  .sc(0.35rem,black);
  ul {
    display: flex;
    flex-direction: column;
    // align-items: center;

    li {
      // display: flex;
      // flex-direction: row;
      // min-width: 5rem;
      .py(0.3rem,0.3rem);
      .px(1rem,1rem);
      // border: 1px solid black;

      .svg-container {
        // display: inline-block;
        .mx(0em,1em);

        // border: 1px solid black;
      }
      /* 平板以下的小屏*/
      @media screen and (max-width: 960px) {
        // width: 2rem;
        .py(0.6em,0.6em);
        .px(0.8em,0.8em);
        a {
          display: flex;
          flex-direction: column;
          align-items: center;
          // border: 1px solid black;
          .svg-container {
            // display: inline-block;
            .sc(0.7rem,black);
            .px(0em,0em);
            .py(0em,0.1rem);
            .mx(0em,0em);

            // border: 1px solid black;
          }
          .item-name {
            display: block;
            font-size: 0.1rem;
            // border: 1px solid black;
          }
        }
        // border: 1px solid black;
      }

      &:nth-child(1) {
        border-bottom: 1px solid rgb(229, 229, 229);
      }
    }
    .curStyle {
      background-color: rgb(191, 191, 191);
      font-weight: 900;
    }
  }
}
a:hover {
  text-decoration: none;
}
</style>
