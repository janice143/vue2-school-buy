<template>
  <div id="app">
    <Header v-show="$route.meta.isShow"></Header>
    <div class="main">
      <!-- 路由组件出口 -->
      <transition name="router-fade" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition name="router-fade" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </div>

    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
//引入Header与Footer非路由组件
import Header from "./components/Header/index";
import Footer from "./components/Footer";
import Home from "./views/Home/index.vue";

import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
    Home,
  },
  // computed:{
  //   ...mapState({
  //     categoryList: (state) => state.home.categoryList,
  //   }),
  // },
  mounted() {},
  methods: {},
};
</script>

<style lang="less">
@import "./style/common";
@import "./style/mixin";
#app {
  width: 100%;
  min-height: 100vh;

  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .main{
    flex:1;
  }
  // justify-content: space-between;

  .router-fade-enter-active,
  .router-fade-leave-active {
    transition: opacity 0.3s;
  }
  .router-fade-enter,
  .router-fade-leave-active {
    opacity: 0;
  }
}
</style>
