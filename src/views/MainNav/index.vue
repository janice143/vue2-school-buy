<template>
  <div class="chip-bar">
    <ul>
      <li
        :class="{ active: order.split(':')[0] === '1' }"
        @click="changeOrder('1')"
      >
        新品
        <span v-show="order.split(':')[0] === '1'"
          >&nbsp;{{ order.split(":")[1] === "desc" ? "↓" : "↑" }}</span
        >
        <!-- ⬆ ⬇ -->
      </li>
      <li
        :class="{ active: order.split(':')[0] === '2' }"
        @click="changeOrder('2')"
      >
        热门
        <span v-show="order.split(':')[0] === '2'"
          >&nbsp;{{ order.split(":")[1] === "desc" ? "↓" : "↑" }}</span
        >
      </li>

      <li
        :class="{ active: order.split(':')[0] === '3' }"
        @click="changeOrder('3')"
      >
        价格
        <span v-show="order.split(':')[0] === '3'"
          >&nbsp;{{ order.split(":")[1] === "desc" ? "↓" : "↑" }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MainNav",

  data() {
    return {
      order: "1:desc",
    };
  },

  mounted() {},

  methods: {
    //   改变菜单栏的排序方式
    changeOrder(order) {
      // order 1表示新品 2表示热门 3表示价格
      const newOrder = `${order}:${
        this.order.split(":")[1] === "desc" ? "asc" : "desc"
      }`;
      this.order = newOrder;
      // 把最新的order传给父组件
      this.$emit("getNewOrder", newOrder);
      // console.log(newOrder)
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.chip-bar {
  // border: 1px solid black;
  .px(1.4rem,0);
  .my(0,0.4rem);
  @media screen and (max-width: 400px) {
    .px(0.4rem,0);
    // .px(0rem,0);
  }
  /* 平板以下的小屏*/
  .sc(0.35rem,black);
  @media screen and (max-width: 960px) {
    .sc(0.1rem,black);
  }
  ul {
    display: flex;
    flex-direction: row;
    // justify-content: center;
    & > * + * {
      margin-left: 0.6rem;
    }
    li {
      .px(0.4rem,0.4rem);
      .py(0.2rem,0.2rem);
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      background-color: rgb(231, 231, 231);
    }
    &:hover{
      cursor: pointer;
    }
    .active {
      background-color: black;
      color: white;
      font-weight: 900px;
    }
  }
}
</style>