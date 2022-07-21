<template>
  <div class="login">
    <div class="container">
      <div class="wrapper">
        <div class="title">
          <img src="../../assets/logo2.png" alt="" /><span>账户注册</span>
        </div>
         <div class="signup-link">
            已有账号？
            <router-link to="/register">现在去登录</router-link>
          </div>
        <div class="form">
         
          <el-form
            status-icon
            ref="registerForm"
            label-width="100px"
            class="demo-ruleForm"
            :model="registerForm"
            :rules="rules"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                type="text"
                v-model="registerForm.username"
                autocomplete="off"
                placeholder="给自己取一个独一无二的用户名"
              ></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="registerForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="password1">
              <el-input
                type="password"
                v-model="registerForm.password1"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
              <el-input
                type="text"
                v-model="registerForm.phone"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="学号" prop="studentnumber">
              <el-input
                type="text"
                v-model="registerForm.studentnumber"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="寝室" prop="place">
              <el-select placeholder="请选择" v-model="registerForm.place">
                <el-option
                  :label="c1"
                  :value="c1"
                  v-for="(c1, idx) in places"
                  :key="idx"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button class="btn-primary" @click="submitForm('registerForm')"
                >提交</el-button
              >
              <el-button @click="resetForm('registerForm')">重置</el-button>
            </el-form-item>
          </el-form>
          
          <div class="tips">
            注：手机号、学号和寝室信息为选填，但是如果后期要进入后台管理系统发布商品，这些信息需要完善。
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Register",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }

      setTimeout(() => {
        if (!/[\u4E00-\u9FA5]+/g.test(value)) {
          callback(new Error("用户名必须包含中文"));
        } else {
          if (value.length < 3) {
            callback(new Error("用户名长度至少3位"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6) {
          callback(new Error("密码至少 6位"));
        }
        if (this.registerForm.password1 !== "") {
          this.$refs.registerForm.validateField("password1");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {
        setTimeout(() => {
          if (!new RegExp(/^1\d{10}$/).test(value)) {
            callback(new Error("不符合手机格式"));
          }
          callback();
        }, 1000);
      }
    };
    return {
      places: [
        "桃源公寓",
        "杏园公寓",
        "初阳公寓",
        "桂苑公寓",
        "启明公寓",
        "留学生公寓",
      ],
      registerForm: {
        username: "",
        password: "",
        password1: "",
        phone: "",
        studentnumber: "",
        place: "",
      },
      rules: {
        username: [
          { required: true, validator: validateUsername, trigger: "blur" },
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        password1: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        phone: [{ validator: validatePhone, trigger: "blur" }],
      },
    };
  },
  methods: {
    //  用户注册
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          // 发请求
          this.userRegister()
            .then((res) => {
              this.$message.show({ text: res, type: "success" });
              //看路由当中是否包含query参数，有：调到query参数指定路由，没有：调到home
              const toPath = "/login";
              this.$router.push(toPath);
            })
            .catch((err) => {
              this.$message.show({ text: String(err), type: "error" });
            });
        } else {
          // console.log('error submit!!');
          this.$message.show({ text: "请填完整信息！", type: "error" });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async userRegister() {
      const { username, phone, studentnumber, place, password, password1 } =
        this.registerForm;

      return await this.$store.dispatch("userRegsiterByInfo", {
        username,
        phone,
        studentnumber,
        place,
        password,
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
* {
  // margin: 0;
  // padding: 0;
  box-sizing: border-box;
}
.container {
  max-width: 660px;
  padding: 0 20px;
  margin: 170px auto;
  .wrapper {
    width: 100%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.1);
    .form {
      .btn-primary {
        background: #9828d0;
        color: white;
        &:hover {
          background: #781da6;
        }
      }
    }
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
.wrapper .form {
  padding: 30px 25px 25px 25px;
}


.wrapper .signup-link {
  text-align: center;
  // margin-top: 20px;
  font-size: 14px;
}
.wrapper .signup-link a {
  color: #9828d0;
  text-decoration: none;
}
.form .signup-link a:hover {
  text-decoration: underline;
}
</style>