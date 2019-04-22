<template>
      <footer style="margin-top: 8px">
            <div class="foot_nav">
                  <a @click="toResult('/result')" class="foot_list">{{$t('msg.result')}}</a>
                  <a @click="toResult('/rule')" class="foot_list">{{$t('msg.rule')}}</a>
                  <a @click="toResult('/privacy')" class="foot_list">{{$t('msg.privacy_stat')}}</a>
                  <a @click="toResult('/responsibility')" class="foot_list">{{$t('msg.gaming_resp')}}</a>
                  <a href="#" class="foot_list">{{$t('msg.zmWeb')}}</a>
            </div>
            <span class="foot_copy1">{{$t('msg.footMsg')}}</span>
            <div class="foot_common">
                  <span class="foot_img1 foot_img"></span><span class="foot_img2 foot_img"></span><span
                  class="foot_img foot_img3"></span>
            </div>
            <span class="foot_copy2">{{$t('msg.gjSport')}} © {{$t('msg.bqOwer')}}</span>
            <router-link to="/download">下载</router-link>
      </footer>
</template>
<script>
      import {store, base} from '@/js/public/port'

      export default {
            components: {},
            data() {
                  return {}
            },
            methods: {
//    toPyOrRy (path) {
//      this.$router.push({path, query: this.$route})
//    },
                  toResult(path) {
                        store.state.timerFresh = false;//当跳转赛果、规则、隐私生命、博彩责任时停止赔率刷新
                        this.$router.push({path, query: this.$route})
                  },
//    toRule(path){
//      this.$router.push({path})
//    }
            },
            mounted() {
                  base.methods.getRuleJson();
            }
      }
</script>
