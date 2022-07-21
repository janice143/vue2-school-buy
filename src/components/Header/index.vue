<template>
  <header class="header">
    <div class="row">
      <a href="/home" class="logo">
        <img src="./images/logo.png" alt="" />
      </a>
      <form action="###" class="searchForm">
        <input
          type="text"
          id="autocomplete"
          placeholder="输入关键字"
          class="input-large"
          v-model="keyword"
        />
        <span class="svg-container btn-primary" @click="goSearch">
          <svg-icon icon-class="search" />
        </span>
      </form>
      <div class="nav-items-menu">
        <span class="svg-container" @click="show = !show">
          <svg-icon icon-class="menu" />
        </span>
        <div :class="{hideMenu: show, btns:true}">
          <!-- 没有用户名：未登录 -->
          <div v-if="!userName" class="fa-btn" @click="show = !show">
            <router-link to="/login" target="_blank" class="btn"
              ><img src="./images/login.png" alt="" />登陆</router-link
            >
            <router-link class="btn" to="/register"
              ><img src="./images/register.png" alt="" />注册</router-link
            >
          </div>
          <!-- 登录了 -->
          <div v-else class="fa-btn fa-btn2" @click="show = !show">
            <!-- <span >欢迎你，{{ userName }}</span> -->
            <router-link to="/cart" class="btn"
              ><img src="./images/cart.png" alt="" />购物车</router-link
            >
            <!-- <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link> -->
            <a href="" @click="goCMS($event)" class="btn" 
              ><img src="./images/cms.png" title="后台管理系统" />后台</a
            >
            <a href="" @click="logout($event)" class="btn"
              ><img src="./images/logout.png" alt="" />退出</a
            >
          </div>
        </div>

      </div>
      <div class="nav-items">
        <div class="btns">
          <!-- 没有用户名：未登录 -->
          <div v-if="!userName" class="fa-btn">
            <router-link to="/login" target="_blank" class="btn"
              ><img src="./images/login.png" alt="" />登陆</router-link
            >
            <router-link class="btn" to="/register"
              ><img src="./images/register.png" alt="" />注册</router-link
            >
          </div>
          <!-- 登录了 -->
          <div v-else class="fa-btn fa-btn2">
            <!-- <span >欢迎你，{{ userName }}</span> -->
            <router-link to="/cart" class="btn"
              ><img src="./images/cart.png" alt="" />购物车</router-link
            >
            <!-- <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link> -->
            <a href="" @click="goCMS($event)" class="btn"
              ><img src="./images/cms.png" title="后台管理系统" />后台</a
            >
            <a href="" @click="logout($event)" class="btn"
              ><img src="./images/logout.png" alt="" />退出</a
            >
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
      show: true, //扩展菜单显示
    };
  },
  methods: {
    //  点击搜索，进行路由跳转
    goSearch() {
      if (this.$route.query) {
        // 这里很奇怪，this.$route.query为空对象的时候，这个if也能进去
        // console.log('有query',this.$route.query)
        let loction = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
        loction.query = this.$route.query;
        this.$router.push(loction);
      }
    },
    // 退出登录：通知服务器清除一些数据，比如token。
    async logout(e) {
      // console.log('exit')
      e.preventDefault();
      try {
        await this.$store.dispatch("userLogoutClear");
        this.$router.push("/home");
        
      } catch (error) {
        // console.log(error)
      }
      
    },
    goCMS(e) {
      const cmsURL = "http://101.34.27.188:9528/login";
      // 判断用户信息是否填完整
      // 获取用户信息
      let userinfo = this.$store.state.user.userInfo;
      // 说明不是空对象
      if (Object.keys(userinfo).length > 0) {
        if (
          userinfo.place.length > 0 &&
          userinfo.phone.length > 0 &&
          userinfo.studentnumber.length > 0
        ) {
          window.location = cmsURL;
        } else {
          this.$router.push("/completeinfo");
        }
      } else {
        this.$message.show({ text: "请先登录！", type: "warn" });
      }
      e.preventDefault();
    },
  },
  mounted() {
    // 通过全局事件总线清除关键字
    // this.$bus.$on("clear",()=>{
    //   this.keyword = ''
    // })
  },
  computed: {
    userName() {
      return this.$store.state.user.userInfo.username;
    },
  },
};
</script>

<style scoped lang="less">
@import "../../style/mixin.less";

.header {
  .px(0.8rem,0.8rem);
  .py(0.3rem,0.3rem);
  .sc(0.4rem,black);
  // background-color: red;
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 1.2rem;
    
    img {
      height: 1.2rem;
    }
    .searchForm {
      // .mx(0em,1em);
      display: flex;
      align-items: center;
// border: 1px solid red;

      .input-large {
        .px(0.2rem,0);

        max-width: 12rem;
        height:0.9rem;
        border: 1px solid rgb(187, 186, 187);

      }
      .btn-primary {
        font-size: 0.6rem;
        border: 1px solid rgb(0, 0, 0);
        background-color: rgb(0, 0, 0);
        cursor: pointer;
      }
    }
    .nav-items-menu {
      display: none;
    }
    .nav-items {
      // flex: 1;
      display: flex;
      justify-content: right;
      align-items: center;

      .btns {
        .fa-btn {
          display: flex;
          justify-content: right;
          align-items: center;
          // border: 1px solid red;
          & > * + * {
            margin-left: 0.5em;
          }

          .btn {
            width: 2.6rem;
            .py(0.4em,0.4em);
            display: flex;
            justify-content: center;
            align-items: center;
            // border: 1px solid red;

            img {
              height: 0.7rem;
              margin-right: 0.2rem;

              border: 1px solid black;
              border-radius: 0.7rem;
            }
            &:hover {
              text-decoration: none;
              color: purple;
              img{
                background-color: rgba(156, 8, 156,0.3);
              }
            }
          }
        }
      }
    }
    @media screen and (max-width: 960px) {
      .nav-items {
        display: none;
      }
      .nav-items-menu {
        // display: block;
        // flex: 1;
        display: flex;
        justify-content: right;
        align-items: center;
        // border: 1px solid red;
        position: relative;
        .svg-container{
          font-size: 0.5rem;
        }
        
        .hideMenu{
          transform:translateY(-250px);
        }
        .btns {
          transition: 0.3s ease;

        .fa-btn {
          position: absolute;
          top: 100%;
          right: 0;
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: left;
          // border: 1px solid #ccc;
          background-color: white;
          

          .btn {
            .py(0.4rem,  0.4rem);
            width: 6rem;
            border: 1px solid #ccc;
            box-sizing: border-box;
            // .py(0.4em,0.4em);
            display: flex;
            // flex-direction: column;
            justify-content: center;
            align-items: center;
            // border: 1px solid red;

            img {
              height: 0.7rem;
              margin-right: 0.2rem;
              .py(0.1em,0.1em);
              .px(0.1em,0.1em);
              border: 1px solid black;
              border-radius: 0.7rem;
            }
            &:hover {
              text-decoration: none;
              color: purple;
              img{
                background-color: rgba(156, 8, 156,0.3);
              }
            }
          }
        }
      }

      }
    }
  }
}
</style>
