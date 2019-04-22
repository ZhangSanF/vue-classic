<template>
  <div class="odds_view-page">
    <secondary-head :title="title"></secondary-head>
    <div class="content">
      <ul v-model="activeTab">
        <li class="type-item-color" :class="[activeTab == 'oddsCss1' ? 'activeTab' : '']" @click="handleClick('oddsCss1')">
          <div class="odds-color">{{$t('msg.odds_color')}}</div>
          <div class="odds-number">
              <span class="add">1.97</span>
              <span class="minus">1.97 </span>
          </div>
        </li>
        <li class="type-item-view" :class="[activeTab == 'oddsCss2' ? 'activeTab' : '']" @click="handleClick('oddsCss2')">
          <div class="odds-color">{{$t('msg.arrow_display')}}</div>
          <div class="odds-number">
            <div><span class="add" >1.97</span><i  class="iconfont icon-up up-style"></i></div>
            <div><span class="minus">1.97 </span><i class="iconfont icon-up up-style"></i></div>
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
        title:this.$t('msg.show_odds_notice'),
        activeTab:'oddsCss1',
      }
    },
    methods: {
      handleClick(type){
        this.activeTab = type
        base.methods.setOddsColor(type);
      },
      initOddColor(){
        let oddsColor = base.methods.getOddsColor();
        this.activeTab = oddsColor;
      }

    },
    mounted () {
      this.initOddColor();
    },

  }

</script>

<style scoped lang="scss">
  @import '../../themes/setting/setting';
</style>
