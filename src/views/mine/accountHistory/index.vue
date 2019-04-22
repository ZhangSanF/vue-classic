<template>
  <div class="check-page">
    <!--<my-header  ref="myHeader"></my-header>-->
    <secondary-head :title="title"></secondary-head>
    <div class='wrapper' ref='wrapper'>
      <div class="content">
        <div class="check-tit">
          <!--<h2>{{ $t("msg.account_history") }}</h2>-->

         <div class="right">
           <!--<span class="rs rs-left" @click="back" style="color: white">返回</span>-->
           <popup-radio @on-change="getAccountHistoryByWeek" :options="ballTabList" v-model="defaultValue"></popup-radio>
         </div>

        </div>
        <div class="deatail_list">
          <div class="list_row list_title size11">
            <div class="date_acc">日期</div><div class="deal_e">交易金额</div>
            <div class="deal_e"></div>
            <!--<div class="fine">状态</div>-->
          </div>

          <div class="list_row size11" v-for="item in accountHis">
            <div class="date_acc" @click="rightMenu('/mine/accountHistory/accountHisDay',item.transactionDate,item.amount)"><span class="size12 color999"><i class="time1">{{ item.transactionDate | capitalize }}</i> <i class="time2"></i></span></div>
            <div class="deal_e" @click="rightMenu('/mine/accountHistory/accountHisDay',item.transactionDate,item.amount)">
              <span  :class="{'add color199':item.amount>0,'del red':item.amount<0,'ping':item.amount==0}">{{item.amount}}</span>
            </div>
            <div class="deal_e"  @click="rightMenu('/mine/accountHistory/accountHisDay',item.transactionDate,item.amount)">
              <span v-show="isShow(item.amount)">查看</span>
            </div>
            <!-- <div class="lei"><span class="color666">{{item.tradeDesc}}</span></div>
             <div class="fine"><span :class="{'sucess color199':item.status==3,'lose red':item.status==4,'quxiao color666':item.status==1,'quxiao color666':item.status==2}"><template v-if="item.status==1">待处理</template><template v-if="item.status==2">处理中</template><template v-if="item.status==3">成功</template><template v-if="item.status==4">失败</template></span></div>-->
          </div>


          <div class="list_row list_title  size11">
            <div class="date_acc" style="font-size: 13px;">本页小计：{{accountHisPageSum}}</div>
            <div class="date_acc" style="font-size: 13px;">本月总计：{{accountHisMonthSum}}</div>
          </div>


        </div>

        <div class="back_home" v-if="toTopShow"><a @click="toTop">返回页首</a></div>
        <load-more :show-loading="false" tip="暂无数据" background-color="#fbf9fe" v-show="nomoreShow"></load-more>
        <my-footer></my-footer>
      </div>
    </div>
    <prompt :showPrompt="promptInfo" @on-result-change1="gavePrompt" @dialogHandler="showUp"></prompt>
  </div>
</template>

<script> /* eslint-disable quotes,spaced-comment,no-trailing-spaces */

import { Tab, TabItem, Selector,LoadMore,PopupRadio } from 'vux'
import {BScroll, MyFooter, MyHeader, MyDialog,Prompt,Util} from '../../../router/api'
import {Message} from 'iview'
import SecondaryHead from '@/components/SecondaryHead'
import {base,store,storages,tools} from '@/js/public/port'
var curUrl;
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
    PopupRadio
  },
  data () {
    return {
      title:'钱包记录',
      defaultValue: '',
      ballTabList: [{key: '', value: '所有时间',label:'所有时间'}],
      accountHistoryList: [],
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
      pageNum:1,
      nomoreShow:false,
      count:0,
      promptInfo:false,
      weak:true,
      toTopShow:false,
//      pageSum:0.00,
//      pageSumAll:0.00,
      curUrl:'',

      params:{//请求参数
        pageNum:'1',
        pageSize:'',
        startDate:tools.computedTime('4'),
        endDate:tools.formatDate(new Date()),
        order:'N'
      },

    }
  },
  methods: {
    toTop:function () {
      this.scroll.scrollTo(0,0);
    },
    isShow:function (money) {
      if(money>0){
        return true;
      }else{
        return false;
      }
    },
    back () {
      this.$router.back()
    },
    scrollInit: function () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper,this.options)
      this.scroll.on('pullingDown', () => {
      this.pageNum=1;
      this.getAccountHistory();
      this.nomoreShow=false;
      this.$nextTick(() => {
        this.pullingDownUp()
    })
    })
      // 上拉
      this.scroll.on('pullingUp', () => {
        let num=Math.ceil(this.count/20);
      if (this.pageNum<num) { //判断是否继续上拉刷新
        this.pullingUp()
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
    getAccountHistoryByWeek:function(){
      curUrl="/transaction/getVueAccountHistory.html";
      this.getAccountHistory();
    },
    getAccountHistory: function () {
      let _this = this
      _this.$vux.loading.show();
      if(Base.methods.isNoLogin()) {
        Message.warning('登录状态信息过期,请重新登录')
        _this.$vux.loading.hide();
        return
      }
      this.$http({
        url: curUrl,
        method: 'post',
        params:{pageNum:_this.pageNum,searchDate:_this.defaultValue}
      }).then(function (res) {
          if(res.data.result.length==0){
            _this.toTopShow=false;
            _this.nomoreShow=true;
          }else if (res.data.result.length<11){
            _this.toTopShow=false;
            _this.nomoreShow=false;
          }else{
            _this.toTopShow=true;
            _this.nomoreShow=false
          }
          _this.accountHistoryList = res.data.result;
          _this.pageSum = Util.isNotEmpty(res.data.pageSum)? Util.formatMoney(res.data.pageSum):'0.00';
          _this.pageSumAll = Util.isNotEmpty(res.data.pageSumAll) && res.data.pageSumAll!=='null' ? Util.formatMoney(res.data.pageSumAll):'0.00';
          _this.count = res.data.count;
          if(_this.weak){
            for(var i=0;i<res.data.futureDateLst.length;i++){
              var dateId = res.data.futureDateLst[i].startDate;
              _this.ballTabList= _this.ballTabList.concat([{key: dateId, value: dateId,label:dateId}]);
            }
            _this.defaultValue = res.data.futureDateLst[0].startDate;
          }

        }
      ).catch(
        function (err) {
          console.log(err)
        }
      ).finally(function (res) {
        _this.$vux.loading.hide();
        _this.weak=false;
      })
    },
    rightMenu: function (path,accountHisDatailDay,amount) {
      if(amount>0){
      if(Base.methods.isNoLogin()){
          Message.warning('登录状态信息过期,请重新登录');
        }else{
        Store.accountHisDatailDay = Util.formatDate.UnixToDate(accountHisDatailDay,-12, "yMD");
        this.$router.push({path: path + "/" + new Date().getTime()});
        }
      }
    },
    pullingDownUp () {
      this.scroll.finishPullDown()
      this.scroll.finishPullUp()
      this.scroll.refresh() //重新计算元素高度
    },
    pullingUp :function () {
      let _this = this
      _this.$vux.loading.show();
      _this.pageNum = _this.pageNum+1
      this.$http({
        url: "/transaction/getVueAccountHistory.html",
        method: 'post',
        params:{pageNum:_this.pageNum,searchDate:_this.defaultValue}
      }).then(function (res) {
          _this.accountHistoryList = _this.accountHistoryList.concat(res.data.result)
          _this.count=res.data.count
        }
      ).catch(
        function (err) {
          console.log(err)
        }
      ).finally(function (res) {
        _this.$vux.loading.hide();
      })
    },
    gavePrompt:function (val) {
      this.promptInfo=val;
    },
    showUp:function () {
      this.promptInfo=!this.promptInfo;
    }
  },
  mounted () {
    let _this = this;
    base.methods.getAccountHis(_this.params,true);
    this.$nextTick(() => {
      this.scrollInit()
  })
  },
  created () {
//    curUrl="/transaction/getInitVueAccountHistory.html";
//    this.getAccountHistory();
  },
  filters: {
    capitalize: function (timestamp) {
      return Util.formatDate.UnixToDate(timestamp,-12, "MDhm")
    },
    money:function(money){
      if(money>0){
        return money;
      }else{
        return 0.00;
      }
    }

  },
  beforeRouteUpdate () {
    this.accountHistoryList = []
    this.getAccountHistory()
    this.$refs.myHeader.closeRightMeun()
  },
  computed:{
    accountHis(){
      return store.state.accountHis;
    },
    accountHisPageSum(){
      return store.state.accountHisPageSum;
    },
    accountHisMonthSum(){
      return store.state.accountHisMonthSum;
    }
  }
}

</script>

<style lang="scss">
  @import '../../../themes/mine/mine.scss';
</style>
