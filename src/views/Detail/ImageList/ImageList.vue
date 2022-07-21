<template>
<!--banner轮播-->
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img,index) in productImg" :key="img">
        <img v-lazy="img" :class="{active:curIndex===index}" @click="imgActive(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    props:['productImg'],
    data(){
      return{
        curIndex:0
      }
    },
     methods:{
      imgActive(index){
        this.curIndex = index;
        //通知兄弟组件：当前的索引值为几
        this.$bus.$emit('getIndex',this.curIndex);
      }
    },
    mounted(){
      new Swiper ('#mySwiper', {
        // loop: true,
          // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        slidesPerView: 5,
        
      })
    },
    watch:{
        productImg:{
          // 监听数据只能保数据从服务器拿到了，但是不能保证v-for里已经渲染出来了，所以还要用到nextTick，
            handler(newValue,oldValue){
                this.$nextTick(()=>{
                    // 下次DOM更新，循环结束之后调用该函数
                   new Swiper ('#mySwiper', {
                      // loop: true,
                      // 如果需要前进后退按钮
                      navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                      },
                      slidesPerView: 5,
                      
                    })        
                })
            }
        }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 1.5rem;
    width: 8rem;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 100%;
      height: 100%;

      img {

        border: 1px solid #ccc;
        padding: 2px;
        width: 90%;
        height: 90%;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        // &:hover {
        //   border: 2px solid #f60;
        //   padding: 1px;
        // }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 1.5rem;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>