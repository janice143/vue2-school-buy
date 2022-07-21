<template>
  <div class="login">
    <div class="container">
      <div class="wrapper">
        <div class="title">
          <img src="../../assets/logo2.png" alt="" /><span>账户登录</span>
        </div>
        <form action="#">
          <div class="row">
            <span class="svg-container">
              <svg-icon icon-class="yonghu"></svg-icon>
            </span>
            <input
              type="text"
              placeholder="用户名"
              v-model="username"
              required
            />
          </div>
          <div class="row">
            <span class="svg-container">
              <svg-icon icon-class="mima"></svg-icon>
            </span>
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
              required
            />
          </div>
          <div class="row row3">
            <span class="svg-container">
              <svg-icon icon-class="yanzhengma"></svg-icon>
            </span>
            <input
              type="text"
              placeholder="验证码"
              maxlength="4"
              v-model="codeNumber"
            />
            <div class="yanzhengma">
              <img v-show="captchaCodeImg" :src="captchaCodeImg" />
              <div class="change_img" @click="getCaptchaCode">换一张</div>
            </div>
          </div>
          <!-- <div class="pass"><a href="#">Forgot password?</a></div> -->
          <div class="row button">
            <input type="submit" value="登录" @click.prevent="userLogin" />
          </div>
          <!-- <div class="btn" >登&nbsp;&nbsp;录</div> -->
          <div class="signup-link">
            还不是用户？
            <router-link to="/register">现在去注册</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reqpostCaptchas } from "@/api";
export default {
  name: "Login",
  data() {
    return {
      username: "", // 本来想写userId的，这样可以同时用 用户名，手机号或者学号登录，现在只验证用户名登录
      password: "",
      codeNumber: "", // 验证码
      computedTime: 0, // 倒数记时
      captchaCodeImg: null, //验证码图片地址
    };
  },
  created() {
    this.getCaptchaCode();
  },
  methods: {
    async userLogin() {
      try {
        const { username, password, codeNumber } = this;
        if (!username) {
          this.$message.show({ text: "请输入用户名", type: "error" });
          return;
        } else if (!password) {
          this.$message.show({ text: "请输入密码", type: "error" });
          return;
        } else if (!codeNumber) {
          this.$message.show({ text: "请输入验证码", type: "error" });
          return;
        }
        if (
          await this.$store.dispatch("userLoginByInfo", {
            username,
            password,
            codeNumber,
          })
        ) {
          //登录的路由组件：看路由当中是否包含query参数，有：调到query参数指定路由，没有：调到home
          const toPath = this.$route.query.redirect || "/home";
          this.$router.push(toPath);
        }
      } catch (error) {
        // alert(error.message);
        this.$message.show({ text: error.message, type: "error" });
      }
    },
    //获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
    async getCaptchaCode() {
      const res = await reqpostCaptchas();
      this.captchaCodeImg = res.data.code;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style//mixin.less";
* {
  // margin: 0;
  // padding: 0;
  box-sizing: border-box;
}
::selection {
  background: rgba(254, 91, 3, 0.3);
}
.container {
  max-width: 440px;
  padding: 0 20px;
  margin: 170px auto;
  .wrapper {
    width: 100%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.1);
  }
}

.wrapper .title {
  height: 90px;
  // background: rgb(254,254,254);
  border-radius: 5px 5px 0 0;
  // color: #;
  font-size: 30px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper .title img {
  height: 80px;
}
.wrapper form {
  padding: 30px 25px 25px 25px;
}
.wrapper form .row {
  height: 45px;
  margin-bottom: 15px;
  position: relative;
  // border:1px solid red;
}
.wrapper form .row input {
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 60px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  font-size: 16px;
  transition: all 0.3s ease;
}
form .row input:focus {
  border-color: purple;
  box-shadow: inset 0px 0px 2px 2px rgba(127, 10, 127,0.5);
}
form .row input::placeholder {
  color: #999;
}
.wrapper form .row span {
  position: absolute;
  width: 47px;
  height: 100%;
  color: #fff;
  font-size: 18px;
  // background: #16a085;
  // border: 1px solid #16a085;
  border-radius: 5px 0 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper form .row3 input {
  height: 100%;
  width: 55%;
}

.wrapper form .row3 .yanzhengma {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    border: 1px solid black;
  }
}


.wrapper form .button input {
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  padding-left: 0px;
  background: #9828d0;
  border: 1px solid #9828d0;
  cursor: pointer;
}
form .button input:hover {
  background: #781da6;
}
.wrapper form .signup-link {
  text-align: center;
  margin-top: 20px;
  font-size: 17px;
}
.wrapper form .signup-link a {
  color: #9828d0;
  text-decoration: none;
}
form .signup-link a:hover {
  text-decoration: underline;
}
</style>