<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去
          <router-link to="/login" target="_blank">登陆</router-link>
        </span>
      </h3>

      <!-- 用户名 -->
      <div class="content">
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
              :disabled = 'true'
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
            <el-input
              type="text"
              placeholder="例如：杏园9幢（不用具体到门牌号）"
              v-model="registerForm.place"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('registerForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tips">
        注：手机号、学号和寝室信息为选填，但是如果后期要进入后台管理系统发布商品，这些信息需要完善。
      </div>
    </div>
    <div class="copyright">
      <div class="address">&COPY; 师大Buy 校园闲置交易平台</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Complete",
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("必须填入手机号"));
      } else {
        setTimeout(() => {
          if (!new RegExp(/^1\d{10}$/).test(value)) {
            callback(new Error("不符合手机格式"));
          }
          callback();
        }, 1000);
      }
    };
    const validateStudentnumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("必须填学号"));
      } else {
          callback()
      }
    };
    const validatePlace = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("必须填寝室"));
      } else {
          callback()
      }
    };
    return {
      registerForm: {
        username: "",
        phone: "",
        studentnumber: "",
        place: "",
      },
      rules: {
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        studentnumber: [{ required: true, validator: validateStudentnumber, trigger: "blur" }],
        place: [{ required: true, validator: validatePlace, trigger: "blur" }],
      },
    };
  },
  mounted(){
    this.getData()
  },
  methods: {
    //  用户注册
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          // 发请求
          this.userComplete().then((res)=>{
            this.$message.show({ text: res, type: "success" })
            //看路由当中是否包含query参数，有：调到query参数指定路由，没有：调到home
            const toPath = "/home"
            this.$router.push(toPath)
          }).catch((err)=>{
            this.$message.show({ text: String(err), type: "error" })
          })
        } else {
          // console.log('error submit!!');
          this.$message.show({ text: "请填完整信息！", type: "error" });
          return false;
        }
      });
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields()
      this.registerForm.place=''
      this.registerForm.plastudentnumberce=''
      this.registerForm.phone=''
    },
    getData(){
      const userinfo = this.$store.state.user.userInfo
      // console.log(userinfo)
      // userinfo.place.length > 0 && userinfo.phone.length > 0 && userinfo.studentnumber.length > 0
      if(Object.keys(userinfo).length>0){
        this.registerForm.username = userinfo.username
      }
    },
    async userComplete() {
      const { username, phone, studentnumber, place } =
        this.registerForm;
      return await this.$store.dispatch("userCompleteByInfo", {
        username,
        phone,
        studentnumber,
        place,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    padding-bottom: 10px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    .content {
      margin: 60px auto;
      margin-bottom: 18px;

      width: 50%;
    }
    .tips {
      font-size: 16px;
      margin-left: 20px;
      margin-top: 50px;
    }
  }
  .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;
      margin-top: 30px;
      
    }
}
</style>