<template>
  <div class="footer">
    <div class="footer-container">
      <div class="copyright">
        <p>&COPY; 师大Buy 校园二手闲置信息平台</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped lang="less">
.footer {
  background-color: #eaeaea;

  .footer-container {
    width: 100%;
    margin: 0 auto;
    padding: 0 0.4rem;

    .copyright {
      padding:0.2rem;

      p {
        margin: 0.4rem 0;
        text-align: center;
      }
    }
  }
}
</style>
