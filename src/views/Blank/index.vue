<template>
  <div>
    <span class="svg-container">
      <svg-icon icon-class="blank"></svg-icon>
    </span>
    <p>暂时木有内容呀～～</p>
  </div>
</template>

<script>
export default {
  name: "SchoolstoreIndex",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
@import '../../style/mixin.less';
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    .py(3rem,3rem);

  .svg-container {

    // border: 1px solid red;
    font-size: 3rem;
  }
  p{
// border: 1px solid red;
    font-size: 0.2rem;
  }
}
</style>