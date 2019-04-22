<template>
      <div class="download_page">
            <div class="game_logo"></div>
            <div class="game_name">
                  <i class="iphone_icon" v-if="vIphone"></i>
                  <i class="android_icon" v-else></i>
                  <span>新皇冠体育</span>
            </div>
            <p class="game_desc">市面上最实用、最专业的原生体育APP</p>
            <a class="download_btn" @click="showTeaching"></a>
            <!--下载教程-->
            <transition name="teaching">
                  <download-teaching v-if="showDownloadTeaching" class="teaching_ani" @closeTeaching="closeTeaching"/>
            </transition>

      </div>
</template>

<script>
      import downloadTeaching from './download_teaching'
      export default {
            components: {
                  downloadTeaching
            },
            data(){
                  return {
                        vIphone: false,
                        showDownloadTeaching: false
                  }
            },
            methods: {
                  showTeaching() {
                        this.showDownloadTeaching = true;
                  },
                  closeTeaching() {
                        this.showDownloadTeaching = false;
                  }
            }
      }
</script>

<style scoped lang="scss">
      @import "../../themes/download/download_page.scss";
      .mask-dialog{position: fixed;top:0;left: 0;right: 0;bottom: 0;background: rgba(0,0,0,0.5)}
      .singleBet{position: absolute;z-index: 10001;bottom: 0}
      .bet-enter-active, .bet-leave-active{
          transition: opacity .1s;
          }
      .bet-enter, .bet-leave-to /* .fade-leave-active below version 2.1.8 */ {
          opacity: 0;
          }
</style>