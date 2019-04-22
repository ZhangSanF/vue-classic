<template>
  <div id="app" v-if="loginStatus">
    <router-view></router-view>
    <Loading v-show="showLoading"></Loading>
  </div>
</template>

<script>
  import Loading from '@/components/Loading'
  import {store,base} from '@/js/public/port'
  export default {
    name: 'App',
    components:{Loading},
    data(){
      return {
      }
    },
    computed : {
      initData(){
      //  return Store.state.common.init;
      },
      showLoading(){
        return store.state.showLoading;
      },
      loginStatus(){
        return store.state.loginStatus;
      }
    },
    watch: {
      initData:function(a){
        if(a.playType && a.gameType && a.matches && a.default){
          //Base.methods.apiLogin();
        }

      }
    },
    mounted(){
      base.methods.apiLogin();
    }
  }
</script>

<style lang="scss">
  @import './themes/base.scss';
  @import './themes/common.scss';
  @import './themes/font.css';
</style>
