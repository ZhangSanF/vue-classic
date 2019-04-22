<template>
  <div class="handicap-page">
    <secondary-head :title="title"></secondary-head>
    <div class="content">
      <ul v-model="activeTab">
        <li class="type-item" v-for="(item,index) in typeList" :class="[activeTab == item.label ? 'activeTab' : '']" @click="handleClick(item.label)">
          <span>{{item.names}}</span>
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
        title:this.$t('msg.odds_type'),
        activeTab:'H',
        typeList:[
          {label:'H',names:this.$t('msg.hk_handicap'),numbers:'0.97'},
          {label:'M',names:this.$t('msg.ma_handicap'),numbers:'1.97'},
          {label:'I',names:this.$t('msg.in_handicap'),numbers:'-0.97'},
          {label:'E',names:this.$t('msg.eu_handicap'),numbers:'0.87'}
        ]
      }
    },
    methods: {
      handleClick(label){
        this.activeTab = label;
        base.methods.setPlate(label);
      },
      initPlate(){
       let plate =  base.methods.getPlate();
        this.activeTab = plate;
      }

    },
    mounted () {
      this.initPlate();
    },
    computed:{

    }

  }

</script>

<style scoped lang="scss">
  @import '../../themes/setting/setting';
</style>
