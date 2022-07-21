<template>
  <div class="main">
    <div class="goods-list">
      <ul>
        <li v-for="i in (1, 8)" :key="i">
          <div class="p-img">
            <PuSkeleton width="227px" height="213px" />
          </div>
          <PuSkeleton />
          <PuSkeleton height="20px" />
          <PuSkeleton />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "skeleton-page",
};
</script>

<style lang="less" scoped>
.main {
  margin: 0 auto;
  .goods-list {
    margin: 20px 0;
    ul {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;

      li {
        height: 100%;
        width: 19%;
        margin-top: 20px;
        margin-right: 20px;
        border: 1px solid #ededed;
        padding: 15px;
        line-height: 23px;

        &:nth-child(4n + 4) {
          // background: red; //&表示父元素
          margin-right: 0;
        }

        .p-img {
          margin: auto;
        //   border:1px solid red;
        }
      }
    }
  }
}
</style>