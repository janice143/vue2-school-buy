<template>
  <div class="spec-preview">
    <img :src="gallery" />
    
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="gallery" ref="big"/>
    </div>
    <!-- 绿色的放大镜层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['productImg'],
    data(){
      return{
        curIndex:0
      }
    },
    computed:{
      gallery(){
        // console.log(this.productImg[this.curIndex])
        // 父组件从服务器拿到数据要时间，再把数据传给传子组件需要时间，所以加载的时候this.productImg可能是undefined
        return this.productImg !== undefined ? this.productImg[this.curIndex] : '';
        // return "http://localhost:3000/uploadImgs/1654428113153/1654428113153_0.jpg"
      }
    },
    methods:{
      handler(e){
        const mask = this.$refs.mask;
        const big = this.$refs.big;
        const {offsetX:x,offsetY:y} = e;
        const {offsetWidth:width,offsetHeight:height} = mask;
        let left = x - width/2;
        let top = y- height/2;
        //约束范围
        if(left <=0) left = 0;
        if(left >=width) left = width;
        if(top<=0)top = 0;
        if(top>=height) top = height;
        
        mask.style.left = left+'px';
        mask.style.top = top +'px';
        
        big.style.left = - 2 * left+'px';
        big.style.top = -2 * top +'px'; 
      }
    },
    mounted(){
      // 全局事件总线，获取兄弟组件传过来的getIndex
      this.$bus.$on('getIndex',(index)=>{
        this.curIndex = index;
      })
    }

  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 8rem;
    height: 8rem;
    border: 1px solid #ccc;
   

    img {
      width: 100%;
      max-height: 8rem;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
       @media screen and (max-width:900px) {
        position: absolute;
        // top: -1px;
        top: 100%;
        left:0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>