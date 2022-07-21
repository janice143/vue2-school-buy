<template>
  <div>
    <Transition name="down">
      <div class="my-message" :style="style[type]" v-show="isShow">
        <!-- 上面绑定的是样式 -->
        <!-- 不同提示图标会变 -->
        <i class="iconfont" :class="[style[type].icon]"></i>
        <span class="text">{{ text }}</span>
      </div>
    </Transition>
  </div>
  <!-- <div :class="['message', 'message-' + type]" v-if="isActive">
    <div class="my-message">
        <i class="iconfont" :class="[style[type].icon]"></i>
        <span class="text">{{ text }}</span>
    </div>
</div> -->
</template>
<script>
export default {
  name: "MyMessage",
  props: {
    text: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      // warn 警告  error 错误  success 成功
      default: "warn",
    },
  },

  data() {
    const style = {
      warn: {
        icon: "icon-warning",
        color: "#E6A23C",
        backgroundColor: "rgb(253, 246, 236)",
        borderColor: "rgb(250, 236, 216)",
      },
      error: {
        icon: "icon-shanchu",
        color: "#F56C6C",
        backgroundColor: "rgb(254, 240, 240)",
        borderColor: "rgb(253, 226, 226)",
      },
      success: {
        icon: "icon-queren2",
        color: "#67C23A",
        backgroundColor: "rgb(240, 249, 235)",
        borderColor: "rgb(225, 243, 216)",
      },
    };
    return {
      style: style,
      isShow: false,
      duration:1500,
    };
  },
  mounted() {
    this.isShow = true;
    let timer = setTimeout(() => {
      if (this.isShow) {
        this.close(timer);
      }
    }, this.duration);
  },

  methods: {
    close(timer) {
      this.isShow = false;
      clearTimeout(timer);
      timer = null;
    },
  },
};
</script>

<style scoped lang="less">
.down {
  &-enter {
    & {
      transform: translate3d(0, -75px, 0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
.my-message {
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 25px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  i {
    margin-right: 10px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
</style>
