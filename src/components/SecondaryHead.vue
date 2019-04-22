<template>
  <div class="secondary-head">
    <h2>
       <Timer v-if="isMore" ></Timer>
      <div class="icon-box" @click="backRouter">
        <i  class="iconfont icon-return icon-style"></i>
      </div>
      <div class="title">{{title}}</div>
    </h2>
  </div>
</template>

<script>
  import {store} from "../js/public/port";
  import Timer from '@/components/Timer.vue'
  export default{
    props:['title'],
    components: {
      Timer
    },
    data: function () {
      return {

      }
    },
    methods: {
        backRouter(){
          store.state.isMore = false;
          store.state.timerFresh = true;
          let router = this.$router;
          router.beforeEach((to,from,next) =>{
            if(to.fullPath.indexOf('more') != -1 ){
              store.state.isMore = true;
            }
            next()
          })
          this.$router.go(-1);
        }
    },
    computed:{
      isMore(){
        return store.state.isMore;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../themes/SecondaryHead/SecondaryHead';
</style>
