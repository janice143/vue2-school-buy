<template>
  <div class="pagination">
    <!-- 分页器 -->
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <!-- 1  不显示 -->
    <button
      v-if="getContinuesArray[0] > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo === 1 }"
    >
      1
    </button>
    <!-- 1 2 不显示 -->
    <button v-if="getContinuesArray[0] > 2">...</button>

    <button
      v-for="continueNumber in getContinuesArray"
      :key="continueNumber.continueNumberId"
      @click="$emit('getPageNo', continueNumber)"
      :class="{ active: pageNo === continueNumber }"
    >
      {{ continueNumber }}
    </button>

    <!-- 15 14  不显示 -->
    <button v-if="getContinuesArray.slice(-1) < pageNumber - 1">...</button>
    <!-- 15  不显示 -->
    <button
      v-if="getContinuesArray.slice(-1) < pageNumber"
      @click="$emit('getPageNo', pageNumber)"
      :class="{ active: pageNo === pageNumber }"
    >
      {{ pageNumber }}
    </button>
    <button
      :disabled="pageNo === pageNumber"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  data() {
    return {};
  },

  mounted() {},

  methods: {},
  computed: {
    pageNumber() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 获取连续页面的数组，当前页总在中间，比如说当前页是第8页，那么连续页的数字串是6 7 8 9 10，起始页是6，尾页是10
    getContinuesArray() {
      // 如果当前总页数小于等于continues
      // console.log(this.pageNumber,this.continues)
      if (this.pageNumber <= this.continues) {
        return new Array(this.pageNumber).fill(0).map((c, index) => index + 1);
      } else if (this.pageNo < Math.floor(this.continues / 2) + 1) {
        return new Array(this.continues).fill(0).map((c, index) => index + 1);
      } else if (
        this.pageNo >
        this.pageNumber - Math.floor(this.continues / 2)
      ) {
        const end = this.pageNumber;
        const res = new Array(this.continues)
          .fill(end)
          .map((c, index) => c - (this.continues - 1 - index));
        return res;
      } else {
        // 当前页数大于Math.floor(this.continues/2)+1
        // 当前总页数大于continues
        const start = this.pageNo - Math.floor(this.continues / 2);
        const res = new Array(this.continues)
          .fill(start)
          .map((c, index) => c + index);
        return res;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  margin-top: 0.5rem;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
    @media screen and (max-width: 600px) {
      font-size: 6px;
      min-width: 1rem;
      height: 0.8rem;
      line-height: 0.8rem;
    }
  }
}
.active {
  background: skyblue;
}
</style>
