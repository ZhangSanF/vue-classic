<template>
  <div class="language-page">
    <secondary-head :title="title"></secondary-head>
    <div class="content">
      <ul v-model="activeTab">
        <li class="type-item" v-for="(item,index) in typeList" :class="[activeTab == item.label ? 'activeTab' : '']" @click="handleClick(item.label)">
          {{item.language}}
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
        title:this.$t('msg.lang_version'),
        activeTab:'zhCHS',
        typeList:[
          {label:'zhCHS',language:this.$t('msg.sim_chinese')},
          {label:'zhCHT',language:this.$t('msg.com_chinese')},
        ]
      }
    },
    methods: {
      handleClick(label){
        this.activeTab = label;
        base.methods.settingLanguage(label);
      },
      initLangVersion(){
        let language = base.methods.getLanguage();
        this.activeTab = language;
      }
    },
    mounted () {
      this.initLangVersion();
    },

  }

</script>

<style scoped lang="scss">
  @import '../../themes/setting/setting';
</style>
