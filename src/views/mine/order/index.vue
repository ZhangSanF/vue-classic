<template>
  <div class="order-page">
    <!--<my-header  ref="myHeader"></my-header>-->
    <secondary-head :title="title"></secondary-head>
    <div class='wrapper' ref='wrapper' style="background: #f0f0f0">
      <div class="content">
        <div class="order-tit">
          <tab class='tab' :line-width="2" >  <!--custom-bar-width="70px"-->
            <tab-item @on-item-click="tolsOrWj('/mine/noclearingOrder')">{{ $t("msg.noclearing_order") }}</tab-item>
            <tab-item @on-item-click="tolsOrWj('/mine/Order')" selected>{{ $t("msg.order_history") }}</tab-item>
          </tab>
          <div class="right">
            <popup-radio @on-change="change" :options="ballTabList" v-model="defaultValue"></popup-radio>
            <popup-radio @on-change="change" :options="futureDateList" v-model="dafaultDate"></popup-radio>
          </div>
        </div>

      <template v-for="item in resolvedData">
        <div class="scan" v-if="item.isMix==0">
          <ul class="ball_xz">
            <li class="ball_xz_list">
              <div class="title">
                <span class="t_tile size11"><em class="time">{{item.startTime | time}} </em>{{item.leagueName}}</span>
                <span class="sz_vs">{{item.hTeam}}<template v-if="playName(item.gamePlayId,item.betContent)==0"><em class="number-color"><i>{{item.oddsProject}}</i></em></template> VS {{item.gTeam}}<template v-if="playName(item.gamePlayId,item.betContent)==1"><em class="number-color"><i>{{item.oddsProject}}</i></em></template></span>
              </div>
              <div class="cnt">
                <span class="sz_fen color999">{{item.gameName}}-{{item.playName}}
                  <template v-if="item.matStatus == 1 && item.gameId == 'TYZQ'">
                    <span>({{item.liveHScore}}:{{item.liveGScore}})</span>
                  </template>
                  <i class="" v-show="item.awardResult !=null && item.awardResult!=''">({{item.awardResult}}) </i>
                  <span :class="item.status == 1 ? 'right normal':'right red'" v-if="item.isBalance==0">{{item.status | status}}</span>
                  <span class="right settled" v-if="item.isBalance==1">已结算</span>
                </span>
                <span class="sz_win">{{item | betWho}} @ <em>{{item.betContent | odds}}</em></span>
                <span class="sz_tw color999">
                  <span class="touzhu_e">投注额：<em>{{item.betAmount}}</em></span>
                  <span class="win_e">
                    <template v-if="item.isBalance==1">
                      <span v-if="item.winStatus==1">输:<em class="lose">-{{item.profit}}</em></span>
                      <span v-if="item.winStatus==2">输一半:<em class="lose">-{{item.profit}}</em></span>
                      <span v-if="item.winStatus==3">平:<em class="ping">0.00</em></span>
                      <span v-if="item.winStatus==4">赢一半:<em class="yin">+{{-item.profit}}</em></span>
                      <span v-if="item.winStatus==5"><em class="yin">{{setProfite(item.profit)}}</em></span>
                      <span v-if="item.winStatus==6">比赛取消</span>
                    </template>
                    <span v-if="item.isBalance==0">可赢金额：<em>{{formatMoneyTwo(item.currentOdds,item.betAmount)}}</em></span>
                  </span>
                </span>
                <span class="sz_num color999"><span class="left num">{{item.billNo}}</span><i class="pic" v-if="item.terminal==2"></i><span class="tim right">{{item.createDate | time}}(<i>{{item.plate | plate}}</i>)</span></span>
              </div>
            </li>
          </ul>
        </div>

        <div class="scan scan1" v-if="item.isMix==1">
          <ul class="ball_xz">
            <li class="ball_xz_list">
              <div class="title">
                <span class="t_tile size11">综合过关 <em>{{item.childNum}}串1</em></span>

              </div>
              <div class="odd-cnt">
                <div class="cnt1" v-for="(bet,key) in parse(item.betContent)">
                  <span class="sz_fen  color999">{{item.gameName}}-{{bet.mixType}} </span>
                  <span class="t_tile"><em class="time">{{bet.startTime | betchildTime}} </em>{{bet.leagueName}}</span>
                  <span class="sz_vs">{{bet.team1}}<em  v-if="mixBet(bet.mixType,bet.isHteam)==0">{{bet.point}}</em> VS {{bet.team2}}<em  v-if="mixBet(bet.mixType,bet.isHteam)==1">{{bet.point}}</em><i class="result">({{item.awardResult | detail(key)}})</i></span>
                  <span class="sz_win ">{{bet.betWho}} @ <em>{{bet.odds}}</em></span>
                </div>
                <p class="sz_plv">
                  <span class="odds"></span>
                  <span>
                    <span class="" :class="item.status == 1 ? ' color199 ':' red'" v-if="item.isBalance==0">{{item.status | status}}</span>
                    <span class="" v-if="item.isBalance==1">已结算</span>
                  </span>
                </p>
                <span class="sz_tw size11 color999">
                  <span class="touzhu_e">投注额：<em>{{item.betAmount}}</em></span>
                   <span class="win_e">
                      <template v-if="item.isBalance==1">
                        <span v-if="item.winStatus==1">输:<em class="lose red">-{{item.profit}}</em></span>
                        <span v-if="item.winStatus==2">输一半:<em class="lose red">-{{item.profit}}</em></span>
                        <span v-if="item.winStatus==3">平:<em class="ping">0.00</em></span>
                        <span v-if="item.winStatus==4">赢一半:<em class="yin color199">+{{-item.profit}}</em></span>
                        <span v-if="item.winStatus==5"><template v-if="item.profit>0">输:-<em class="lose red">-{{item.profit}}</em></template><template v-else>赢:<em class="yin color199">+{{-item.profit}}</em></template></span>
                        <span v-if="item.winStatus==6">比赛取消</span>
                      </template>
                      <span  v-if="item.isBalance==0">可赢金额：<em>{{item.currentOdds |betAward(item.betAmount)}}</em></span>
                  </span>
                </span>
                <!--<p class="sz_tw">投注额: <span class="sz_tw-number">{{item.betAmount}}</span></p>-->
                <span class="sz_num"><span class="left num">{{item.billNo}}</span><i class="pic" v-if="item.terminal==2"></i><span class="tim right">{{item.createDate | time}}(<i>{{item.plate | plate}}</i>)</span></span>
              </div>
            </li>
          </ul>
        </div>
      </template>

        <!--<div class="back_home" v-if="toTopShow"><a @click="toTop">返回页首</a></div>-->
        <load-more :show-loading="false" tip="暂无数据" background-color="#fbf9fe" v-show="nomoreShow"></load-more>

        <!--<my-footer></my-footer>-->
      </div>
    </div>
  </div>
</template>

<script>

import { Tab, TabItem, Selector,LoadMore ,PopupRadio} from 'vux'
import {BScroll, MyFooter, MyHeader,Util} from '../../../router/api'
import {Message} from 'iview'
import SecondaryHead from '@/components/SecondaryHead'
import {base,store,storages,tools} from '@/js/public/port'
export default{
  components: {
    'my-footer': MyFooter,
    'my-header': MyHeader,
    SecondaryHead,
    Tab,
    TabItem,
    Selector,
    LoadMore,
    PopupRadio
  },
  data: function () {
    return {
      title:'投注情况',
      betHelpDialogShow: false,
      defaultValue: '',
      dafaultDate:'',
//      ballTabList: [{key: '', value: '所有球类'}],
//      futureDateList:[{key: '', value: '所有日期'}],
      betRecordList: [],
      betContentList: {},
      page:[],
      nomoreShow:false,
      options: {
        pullDownRefresh: {
          threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
          stop: 0 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
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
      awardResult:[],
      isConcat:true,
      toTopShow:true,
      params:{ //请求投注历史的参数
        pageNum: '1',
        pageSize:'20',
        order:'',
        gameType: '',
        isBalance: '1',
        startDate: '',
        endDate: tools.formatDate(new Date())
      },
    }
  },
  methods: {
    /**
     * 可赢金额截取2位有效数字
     */
    formatMoneyTwo:function (currentOdds,data) {
      if(data==null || currentOdds==null ||currentOdds<0)
      {
        return data;
      }
      let odds = parseFloat(data*currentOdds);
      let format = Math.round(odds * 1000) / 1000;
      let s = format.toString();
      let rs = s.indexOf('.');
      if (rs < 0) {
        rs = s.length;
        s += '.';
      }
      while (s.length <= rs + 2) {
        s += '0';
      }
      //将S截取两位
      return s.substr(0, s.indexOf(".") + 3);
    },
    parse:function (str) {
      return JSON.parse(str)
    },
    change:function () {
      if(this.dafaultDate){
        let map = tools.getDate(this.dafaultDate);
        this.params.startDate = map.starTtime;
        this.params.endDate = map.endTime;
      }else {
        this.params.startDate = '';
        this.params.endDate = '';
      }
      let map = tools.getDate(this.dafaultDate);
      console.log(map)

      this.params.gameType = this.defaultValue;
      base.methods.getBetRecord(this.params,true);
    },
    setProfite(val){
      if(Number(val) >0){
        return "输:-"+val ;
      }else{
        return "赢:+"+(-val) ;
      }
    },
    toTop:function () {
      this.scroll.scrollTo(0,0);
    },
    scrollInit: function () {
      let _this = this;
      _this.$nextTick(() => {
        _this.scroll = new BScroll(_this.$refs.wrapper, _this.options)
        // 下拉
        _this.scroll.on('pullingDown', () => {
//          _this.getBetRecord() //获取数据方法
          _this.params.pageSize = '20';
          base.methods.getBetRecord(_this.params,true);
          _this.nomoreShow=false
//          _this.$nextTick(() => {
            _this.pullingDownUp()
//          })
        })
        // 上拉
        _this.scroll.on('pullingUp', () => {
//          let num=Math.ceil(_this.page.totalCount/_this.page.pageSize)
          let allDataLen = store.state.unres_data_len;
          if (_this.params.pageSize<allDataLen) { //判断是否继续上拉刷新
//            _this.pullingUp()
//            _this.$nextTick(() => {
            _this.params.pageSize = (parseInt(_this.params.pageSize) +20).toString();
            base.methods.getBetRecord(_this.params,false);
              _this.pullingDownUp()
//            })
          }else {
            _this.nomoreShow = true
//            _this.$nextTick(() => {
              _this.pullingDownUp()
//            })
          }
        })
      })
    },
    pullingDownUp () {
      this.scroll.finishPullDown()
      this.scroll.finishPullUp()
      this.scroll.refresh() //重新计算元素高度
    },
    onResultChange1: function (val) {
      this.betHelpDialogShow = val
    },
    betHelpDialogHandler: function () {
      this.betHelpDialogShow = !this.betHelpDialogShow
    },
    pullingUp:function () {
      let _this = this
      _this.page.pageNumber = _this.page.pageNumber+1
      _this.$vux.loading.show();
      this.$http({
        url: '/record/getBetRecord.html',
        method: 'post',
        params:{pageNum:_this.page.pageNumber,gameId:_this.defaultValue ,isBalance:1,searchBegin:_this.dafaultDate}
      }).then(function (res) {
          _this.betRecordList = _this.betRecordList.concat(res.data.result.result)
          _this.page = res.data.result.paging;
        for(var i=0;i<res.data.result.result.length;i++){
          if(res.data.result.result[i].isMix==1){
            let betcontent1=eval("("+res.data.result.result[i].betContent+")")
            _this.betContentList[res.data.result.result[i].billNo]=betcontent1;
            if(res.data.result.result[i].isBalance==1){
              _this.awardResult[res.data.result.result[i].billNo]=res.data.result.result[i].awardResult;
            }
          }
        }
        }
      ).catch(
        function (err) {
          console.log(err)
        }
      ).finally(function (res) {
        _this.$vux.loading.hide();
      })
    },
    playName: function (playname, betContent) {
      var playNames = ['3020022', '3020012', '3010022', '3420010', '3410050', '3420060', '3510020', '3410020', '3520020', '3610020', '3620020', '3010012', '3520050','3110010','3120010','3210020','3220010','3310020','3320010','3710020','3720020','3810020','3820020'];
      var obj = JSON.parse(betContent)
      if (playNames.indexOf(playname) >= 0) {
        if (obj.isHteam === 'Y') {
          return 0
        } else {
          return 1
        }
      } else {
        return 2
      }
    },
    mixBet: function (mixType,isHteam) {
      var str='让球'
      if ( new RegExp(str).test(mixType)) {
        if (isHteam === 'Y') {
          return 0
        } else {
          return 1
        }
      } else {
        return 2
      }
    },

    tolsOrWj: function (path) {
      this.$router.replace({path: path + '/' })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scrollInit()
    })
  },
  created () {
//    this.getBetRecord()
    base.methods.getBetRecord(this.params,true);
  },
  computed:{
    resolvedData(){     //已结算数据
      console.log(store.state.resolved_data,"store.state.resolved_data")
      return store.state.resolved_data;
    },
    ballTabList(){
      console.log(store.state.ballTabList,"store.state.ballTabList")
      return store.state.ballTabList;
    },
    futureDateList(){
      console.log(store.state.futureDateList,"store.state.futureDateList")
      return store.state.futureDateList;
    }
  },
  filters: {
    detail:function (str,key) {
      if(Util.isNotEmpty(str)){
        var result=str.toString().split("R");
        if(result!=null){
          return result[key];
        }
      }
    },
    odds:function (betCont) {
      var bet=eval("("+betCont+")");
      return bet.odds;
    },
    time: function (timestamp) {
      return Util.formatDate.UnixToDate(timestamp,-12, 'MDhm')
    },
    betchildTime:function (time) {
      var date=Util.formatDate.parse(time,'yMdhsm');
      return Util.formatDate.UnixToDate(date,'', 'MDhm')
    },
    betWho: function (i) {
      let obj = JSON.parse(i.betContent)
      var r1=/^3030/
      var r2=/^3040/
      if(r1.test(Number(i.gamePlayId))||r2.test(Number(i.gamePlayId))){
        return obj.bdPoint
      }else{
        return obj.betWho
      }
    },
    status: function (status) {
      let obj = ''
      if (status === -1 || status === 3 || status === 0) {
        obj = '系统取消'
      } /*else if (status === 0) {
        obj = '个人取消'
      } */else if (status === 1) {
        obj = '正常'
      } else if (status === 2) {
        obj = '待确认'
      }/* else if (status === 3) {
        obj = '待确认取消'
      }*/ else if (status === 4) {
        obj = '等待处理'
      }
      return obj
    },
    plate: function (plate) {
      let obj = ''
      if (plate === 'H') {
        obj = '香港盘'
      } else if (plate === 'M') {
        obj = '马来盘'
      } else if (plate === 'I') {
        obj = '印尼盘'
      } else if (plate === 'E') {
        obj = '欧洲盘'
      }
      return obj
    },
    betAward: function (currentOdds, amount) {
      if(currentOdds<0){
        return amount;
      }else {
        var money= Math.round(amount * currentOdds*10000)/10000;
//          var money= amount * currentOdds;
//          console.log(money)
        if (money < money.toFixed(2)) {
          return (Math.floor(parseFloat(money) * 100) / 100).toFixed(2)
        } else if (money > (money).toFixed(2)) {
          return money.toFixed(2);
        }else {
          return money;
        }

      }
    }
  },
  beforeRouteUpdate () {
    this.betRecordList = []
    this.getBetRecord()
    this.$refs.myHeader.closeRightMeun()
  }
}
Date.prototype.Format =function (fmt){
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o){
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}
</script>

<style lang="scss" scoped>
  @import '../../../themes/mine/mine.scss';
</style>
