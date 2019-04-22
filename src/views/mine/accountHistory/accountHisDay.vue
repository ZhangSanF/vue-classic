<template>
  <div class="check-page">
    <!--<my-header  ref="myHeader"></my-header>-->
    <secondary-head :title="title"></secondary-head>
    <div class="tab_box" v-model="activeTab">
            <span :class="[activeTab == item.label ? activeClass : '', normalStyle]" v-for="item in tabList" @click="activeState(item.label)" >
                {{ item.label }}
            </span>
    </div>
    <div class='wrapper ' ref='wrapper' style="top: 112px;">
      <div class="content">

        <div class="deatail_list">
          <!--<div class="list_row size11">-->
          <!--<div class="date_acc" style="fonlengtht-size: 13px;">本页小计：{{pageSum}}</div>-->
          <!--<div class="date_acc" style="font-size: 13px;">本日小计：{{pageSumAll}}</div>-->
          <!--</div>-->

          <div class="list_row list_title size11">
            <div class="date">日期</div><div class="deal_acc">交易金额</div><div class="lei_acc">类型</div><div class="fine">状态</div>
          </div>

          <div class="list_row size11" v-for="item in accountHistoryList"  v-if="accountHistoryList.length !==0">
            <div class="date"><span class="date-style "><i class="time1">{{ item.transactionDate }}</i> <i class="time2"></i></span></div>
            <div class="deal_acc"><span  :class="{'add ying':item.amount>0,'del fu':item.amount<0,'pings':item.amount==0}">{{item.amount}}</span></div>
            <div class="lei_acc"><span class="type-style">{{item.tradeDesc}}</span></div>
            <div class="fine"><span :class="{'sucess ying':item.status==3,'lose fu':item.status==4,'quxiao ':item.status==1,'quxiao ':item.status==2}"><template v-if="item.status==1">待处理</template><template v-if="item.status==2">处理中</template><template v-if="item.status==3">成功</template><template v-if="item.status==4">失败</template></span></div>
          </div>

          <div class="no-matches-div"  v-if="accountHistoryList.length ===0" >
            <p class="no-matches-p">
              暂无数据
            </p>
          </div>

          <!--<div class="list_row  size11">-->
          <!--<div class="date_acc" style="font-size: 13px;">本页小计：{{pageSum}}</div>-->
          <!--<div class="date_acc" style="font-size: 13px;">本日小计：{{pageSumAll}}</div>-->
          <!--</div>-->


        </div>
        <!--<div class="back_home" v-if="toTopShow"><a @click="toTop">返回页首</a></div>-->
        <load-more :show-loading="false" tip="暂无数据" background-color="#fbf9fe" v-show="nomoreShow"></load-more>
        <!--<my-footer></my-footer>-->
      </div>
    </div>
    <prompt :showPrompt="promptInfo" @on-result-change1="gavePrompt" @dialogHandler="showUp"></prompt>
  </div>
</template>

<script> /* eslint-disable quotes,spaced-comment,no-trailing-spaces */

import { Tab, TabItem, Selector,LoadMore,PopupRadio } from 'vux'
import {BScroll, MyFooter, MyHeader,Prompt} from '../../../router/api'
import {Message} from 'iview'
import SecondaryHead from '@/components/SecondaryHead'
import {base,store,storages,tools,util} from '@/js/public/port'
var midPageSum;
export default{
  components: {
    'my-footer': MyFooter,
    'my-header': MyHeader,
    SecondaryHead,
    Tab,
    TabItem,
    Selector,
    LoadMore,
    'prompt': Prompt,
    PopupRadio,
  },
  data () {
    return {
      title:'钱包记录',
      activeTab: this.$t('msg.minhours'),
      tabList: [
        {label: this.$t('msg.minhours'), name:'24hours'},
        {label: this.$t('msg.maxhours'), name:'48hours'},
        {label: this.$t('msg.thisWeek'), name:'thisWeek'},
        {label: this.$t('msg.thisMonth'), name:'thisMonth'}
      ],
      activeClass: 'active',
      normalStyle: 'tab_text',
      options: {
        pullDownRefresh: {
          threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
          stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
        },
        pullUpLoad: {
          threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
        },
//          pullDownRefresh: false, //关闭下拉
//          pullUpLoad: false, // 关闭上拉
        click: true,
        probeType: 3,
        startY: 0,
        scrollbar: false
      },

      params:{//请求参数
        pageNum:'1',
        pageSize:'20',
        startDate:tools.computedTime('1'),
        endDate:tools.formatDate(new Date()),
        order:'N'
      },

      pageNum:1,
      nomoreShow:false,
      sumPage:0,
      promptInfo:false,
      weak:true,
      toTopShow:false,
//      accountHisDatailDay:Store.accountHisDatailDay,
      pageSum:0.00,
      pageSumAll:0.00,
      midPageSum:0.00
    }
  },
  methods: {
    activeState:function (tab) {
      this.activeTab = tab;
      this.params.pageNum = '1';
      this.nomoreShow = false;
      this.scroll.scrollTo(0,0);
      let computedTime = "1";
      switch (this.activeTab){
        case this.$t('msg.minhours'):
          computedTime = "1";
          break;
        case this.$t('msg.maxhours'):
          computedTime = "2";
          break;
        case this.$t('msg.thisWeek'):
          computedTime = "3";
          break;
        case this.$t('msg.thisMonth'):
          computedTime = "4";
          break;
      }
      this.params.startDate = tools.computedTime(computedTime);
      base.methods.getAccountHis(this.params,true)
      this.pullingDownUp();
    },
    back () {
      this.$router.back()
    },
    scrollInit: function () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper,this.options)
        this.scroll.on('pullingDown', () => {
          this.params.pageSize = '20';
          base.methods.getAccountHis(this.params,false);
          this.$nextTick(() => {
            this.pullingDownUp()
          })
        })
        // 上拉
        this.scroll.on('pullingUp', () => {
          let allNum = store.state.wallet_record_num;
          if (this.params.pageSize<allNum) { //判断是否继续上拉刷新
            this.params.pageSize = (parseInt(this.params.pageSize)+20).toString();
            base.methods.getAccountHis(this.params,false);
            this.$nextTick(() => {
              this.pullingDownUp()
            })
          }else {
            this.nomoreShow = true
            this.$nextTick(() => {
              this.pullingDownUp()
            })
          }
        })
      })
    },
    pullingDownUp () {
      this.scroll.finishPullDown()
      this.scroll.finishPullUp()
      this.scroll.refresh() //重新计算元素高度
    },
    gavePrompt:function (val) {
      this.promptInfo=val;
    },
    showUp:function () {
      this.promptInfo=!this.promptInfo;
    }
  },
  mounted () {
    base.methods.getAccountHis(this.params,true);
    this.$nextTick(() => {
      this.scrollInit()
    })
  },
  filters: {
    capitalize: function (timestamp) {
      return util.formatDate.UnixToDate(timestamp,-12, "MDhm")
    },
  },
  beforeRouteUpdate () {
    this.accountHistoryList = []
    this.getAccountHistory()
    this.$refs.myHeader.closeRightMeun()
  },
  computed:{
    accountHistoryList(){
      return store.state.accountHis;
    },
//    //上拉成功
//    pullUpSuccess(){
//      return this.$store.state.pullUpSuccess;
//    },
//    //开始上拉
//    pullUpStart(){
//      return this.$store.state.pullUpStart;
//    },
//    //下拉成功
//    pullDownSuccess(){
//      return this.$store.state.pullDownSuccess;
//    },
//    //开始下拉
//    pullDownStart(){
//      return this.$store.state.pullDownStart;
//    },

  }
}

</script>

<style lang="scss">
  @import '../../../themes/mine/mine.scss';
</style>
