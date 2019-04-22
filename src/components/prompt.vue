<template>
  <div>
    <div v-transfer-dom>
      <x-dialog v-model="promptIsShow" class="window_aside" hide-on-blur>
        <!-- 登陆提示框：  -->
        <div class="warning-tit diaTitle">
          提示
          <span class="close" style="float: right; margin-right: 15px;" @click="closeMyDialog">
            ×
          </span>
        </div>
        <div class="diaContent warning-content">
          <h1>请登录</h1>
          <a  @click="sure" class="btn_sure">确定</a>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
  import {TransferDomDirective as TransferDom, XDialog} from 'vux'
  import bus from "../js/publicBall/bus.js"
  export default {
    directives: {
      TransferDom
    },
    props:['showPrompt'],
    components:{
      XDialog
    },
    data(){
      return{
        promptMessage: '',
        promptIsShow: this.showPrompt,
      }
    },
    methods: {
      closeMyDialog: function () {
        this.promptIsShow = !this.promptIsShow
      },
      sure:function () {
        this.$router.push({path:"/login"});
      }
    },
    watch: {
      showPrompt(val){
        this.promptIsShow = val;
      },
      promptIsShow(val) {
        this.$emit('on-result-change1', val)
      },
    },
    mounted(){
      var self = this
      bus.$on("show", function (show) {
        self.promptIsShow = !show;
      })
    }
  }
</script>

<style lang="scss">
  @import '../themes/myDialog.scss';
</style>

