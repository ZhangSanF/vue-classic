<template>
  <div class="setting-page">
      <secondary-head :title="title"></secondary-head>
      <div class="content">
        <ul>
          <li @click="handleClick('/setting/handicap')" class="setting-item">
            <div class="font-style">{{$t('msg.odds_type')}}</div>
            <div class="right">
              <span class="font-style">{{plate}}</span>
              <div class="icon-box">
                <i class="iconfont icon-left left-style"></i>
              </div>
            </div>
          </li>
          <li @click="handleClick('/setting/language')" class="setting-item">
            <div class="font-style">{{$t('msg.lang_version')}}</div>
            <div class="right">
              <span class="font-style">{{language}}</span>
              <div class="icon-box">
                <i class="iconfont icon-left left-style"></i>
              </div>
            </div>
          </li>
          <li @click="handleClick('/setting/odds_view')" class="setting-item">
            <div class="font-style">{{$t('msg.show_odds_notice')}}</div>
            <div class="right">
              <span class="font-style">{{oddColor}}</span>
              <div class="icon-box">
                <i class="iconfont icon-left left-style"></i>
              </div>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>


import SecondaryHead from '@/components/SecondaryHead'
import {base} from "../../js/public/port"

export default{
  components: {
    SecondaryHead
  },
  data () {
    return {
      title:this.$t('msg.bet_setting'),
      plate:'',
      language:'',
      oddColor:'',

    }
  },
  methods: {
    handleClick(path){
      this.$router.push({path:path})
    },
    initSet(){
      let plate =  base.methods.getPlate();
      switch (plate){
        case "H":
          this.plate = this.$t('msg.hk_handicap');
          break;
        case "E":
          this.plate = this.$t('msg.eu_handicap');
          break;
        case "M":
          this.plate = this.$t('msg.ma_handicap');
          break;
        case "I":
          this.plate = this.$t('msg.in_handicap');
          break;
      }
      let language = base.methods.getLanguage();
      switch (language){
        case "zhCHS":
          this.language = this.$t('msg.sim_chinese');
          break;
        case "zhCHT":
          this.language = this.$t('msg.com_chinese');
          break;
      }

      let oddsColor = base.methods.getOddsColor();
      switch (oddsColor) {
        case "oddsCss1":
          this.oddColor = this.$t('msg.odds_color');
          break
        case "oddsCss2":
          this.oddColor = this.$t('msg.arrow_display');
          break
      }

    }
  },
  mounted () {
   this.initSet();
  },

}

</script>

<style scoped lang="scss">
  @import '../../themes/setting/setting';
</style>
