<template>
  <div class="order-page">
    <my-header  ref="myHeader"></my-header>
    <div class='wrapper' ref='wrapper'>
      <div class="content">
        <div class="order-tit">
          <div class="right"><span class="rs rs-left" @click="back" style="color: white">返回</span></div>
        </div>

        <template v-for="item in betRecordList">
          <div class="scan" v-if="item.isMix==0">
            <ul class="ball_xz">
              <li class="ball_xz_list">
                <div class="title">
                  <span class="t_tile size11"><em class="time">{{item.startTime | time}}</em>{{item.leagueName}}</span>
                  <span class="sz_vs size11">{{item.hTeam}}<template v-if="playName(item.gamePlayId,item.betContent)==0"><em class="color199"><i>{{item.oddsProject}}</i></em></template> VS {{item.gTeam}}<template v-if="playName(item.gamePlayId,item.betContent)==1"><em class="color199"><i>{{item.oddsProject}}</i></em></template></span>
                </div>
                <div class="cnt">
                  <span class="sz_fen size11 color999">{{item.gameName}}-{{item.playName}}  <template v-if="showScore(item.gamePlayId)"><span class="red">({{item.liveHScore}}:{{item.liveGScore}})</span></template><i v-show="item.awardResult !=null && item.awardResult!=''">({{item.awardResult}}) </i><span :class="item.status == 1 ? 'right color199':'right red'" v-if="item.isBalance==0">{{item.status | status}}</span><span class="right color666" v-if="item.isBalance==1">已结算</span></span>
                  <span class="sz_win size12 color199">{{item | betWho}} @ <em>{{item.betContent | odds}}</em></span>
                  <span class="sz_tw size11 color999"><span class="touzhu_e">投注额：<em>{{item.betAmount}}</em></span>
                  <span class="win_e">
                    <template v-if="item.isBalance==1">
                      <span v-if="item.winStatus==1">输:<em class="lose red">-{{item.profit}}</em></span>
                      <span v-if="item.winStatus==2">输一半:<em class="lose red">-{{item.profit}}</em></span>
                      <span v-if="item.winStatus==3">平:<em class="ping">0.00</em></span>
                      <span v-if="item.winStatus==4">赢一半:<em class="yin color199">+{{-item.profit}}</em></span>
                      <span v-if="item.winStatus==5"><em class="yin color199">{{setProfite(item.profit)}}</em></span>
                      <span v-if="item.winStatus==6">比赛取消</em></span>
                    </template>
                    <span v-if="item.isBalance==0">可赢金额：<em>{{item.currentOdds |betAward(item.betAmount)}}</em></span>
                  </span>
                </span>
                  <span class="sz_num size11 color999"><span class="left num">{{item.billNo}}</span><i class="pic" v-if="item.terminal==2"></i><span class="tim right">{{item.createDate | time}}(<i>{{item.plate | plate}}</i>)</span></span>
                </div>
              </li>
            </ul>
          </div>

          <div class="scan scan1" v-if="item.isMix==1">
            <ul class="ball_xz">
              <li class="ball_xz_list">
                <div class="title">
                  <span class="t_tile size11">综合过关 <em style="color: #444;">{{item.childNum}}串1</em></span>

                </div>
                <div class="cnt">
                  <div class="cnt1" v-for="(bet,key) in betContentList[item.billNo]">
                    <span class="sz_fen size11 color999">{{item.gameName}}-{{bet.mixType}} </span>
                    <span class="t_tile size11 color666"><em class="time">{{bet.startTime | betchildTime}}</em>{{bet.leagueName}}</span>
                    <span class="sz_vs size11 color666">{{bet.team1}}<em class="color199" v-if="mixBet(bet.mixType,bet.isHteam)==0">{{bet.point}}</em> VS {{bet.team2}}<em class="color199" v-if="mixBet(bet.mixType,bet.isHteam)==1">{{bet.point}}</em><i v-if="showMixScore(awardResult[item.billNo])" class="result">({{awardResult[item.billNo] |detail(key)}})</i></span>
                    <span class="sz_win size12 color199">{{bet.betWho}} @ <em>{{bet.odds}}</em></span>
                  </div>
                  <span class="sz_plv size11 color999"><span class="float-right" :class="item.status == 1 ? 'right color199 ':'right red'" v-if="item.isBalance==0">{{item.status | status}}</span><span class="right color666 float-right" v-if="item.isBalance==1">已结算</span></span>
                  <span class="sz_tw size11 color999">
                  <span class="touzhu_e">投注额：<em>{{item.betAmount}}</em></span>
                   <span class="win_e">
                      <template v-if="item.isBalance==1">
                        <span v-if="item.winStatus==1">输:<em class="lose red">-{{item.profit}}</em></span>
                        <span v-if="item.winStatus==2">输一半:<em class="lose red">-{{item.profit}}</em></span>
                        <span v-if="item.winStatus==3">平:<em class="ping">0.00</em></span>
                        <span v-if="item.winStatus==4">赢一半:<em class="yin color199">+{{-item.profit}}</em></span>
                        <span v-if="item.winStatus==5"><em class="yin color199">{{setProfite(item.profit)}}</em></span>
                        <span v-if="item.winStatus==6">比赛取消</span>
                      </template>
                      <span  v-if="item.isBalance==0">可赢金额：<em>{{item.currentOdds |betAward(item.betAmount)}}</em></span>
                  </span>
                </span>
                  <span class="sz_num size11 color999"><span class="left num">{{item.billNo}}</span><i class="pic" v-if="item.terminal==2"></i><span class="tim right">{{item.createDate | time}}(<i>{{item.plate | plate}}</i>)</span></span>
                </div>
              </li>
            </ul>
          </div>
        </template>

        <div class="back_home" v-if="toTopShow"><a @click="toTop">返回页首</a></div>
        <load-more :show-loading="false" tip="暂无数据" background-color="#fbf9fe" v-show="nomoreShow"></load-more>

        <my-footer></my-footer>
      </div>
    </div>
    <prompt :showPrompt="promptInfo" @on-result-change1="gavePrompt" @dialogHandler="showUp"></prompt>
  </div>
</template>

<script>

  import { Tab, TabItem, Selector,LoadMore ,PopupRadio} from 'vux'
  import {BScroll, MyFooter, MyHeader,Prompt,Util} from '../../../router/api'
  import {Message} from 'iview'

  export default{
    components: {
      'my-footer': MyFooter,
      'my-header': MyHeader,
      Tab,
      TabItem,
      Selector,
      LoadMore,
      'prompt': Prompt,
      PopupRadio
    },
    data: function () {
      return {
        betHelpDialogShow: false,
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
        promptInfo: false,
        awardResult:[],
        isConcat:true,
        toTopShow:true
      }
    },
    methods: {
      showScore:function (type) {
        return Ball.showScore(type)
      },
      showMixScore:function(val){
        if(val==null || val==""){
          return false
        }
        return true;
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
      back () {
        this.$router.back()
      },
      scrollInit: function () {
        let _this = this;
        _this.$nextTick(() => {
          _this.scroll = new BScroll(_this.$refs.wrapper, _this.options)
        // 下拉
        _this.scroll.on('pullingDown', () => {
          _this.getBetRecord() //获取数据方法
        _this.nomoreShow=false
        _this.$nextTick(() => {
          _this.pullingDownUp()
      })
      })
        // 上拉
        _this.scroll.on('pullingUp', () => {
          let num=Math.ceil(_this.page.totalCount/_this.page.pageSize)
          if (_this.page.pageNumber<num) { //判断是否继续上拉刷新
          _this.pullingUp()
          _this.$nextTick(() => {
            _this.pullingDownUp()
        })
        }else {
          _this.nomoreShow = true
          _this.$nextTick(() => {
            _this.pullingDownUp()
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
      onResultChange1: function (val) {
        this.betHelpDialogShow = val
      },
      betHelpDialogHandler: function () {
        this.betHelpDialogShow = !this.betHelpDialogShow
      },
      getBetRecord: function () {
        var curBillNo = Store.curBillNo;
        let _this = this;
        if(Base.methods.isNoLogin()) {
          Message.warning('登录状态信息过期,请重新登录')
          _this.$vux.loading.hide();
          return
        }
        _this.$vux.loading.show();
        this.$http({
          url: '/record/getBetRecordByDay.html',
          method: 'post',
          params:{pageNum:1,billNo:curBillNo}
        }).then(function (res) {
            if(res.data.result.result.length==0){
              _this.toTopShow=false;
              _this.nomoreShow=true;
            }else if (res.data.result.result.length<3){
              _this.toTopShow=false;
              _this.nomoreShow=false;
            }else{
              _this.toTopShow=true;
              _this.nomoreShow=false;
            }
            _this.betRecordList = res.data.result.result;
            _this.page = res.data.result.paging;
            for(var i=0;i<_this.betRecordList.length;i++){
              if(_this.betRecordList[i].isMix==1){
                let betcontent1=eval("("+_this.betRecordList[i].betContent+")")
                _this.betContentList[_this.betRecordList[i].billNo]=betcontent1;
                if(_this.betRecordList[i].isBalance==1){
                  _this.awardResult[_this.betRecordList[i].billNo]=_this.betRecordList[i].awardResult;
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
          _this.isConcat=false;
        })
      },
      pullingUp:function () {
        let _this = this
        _this.page.pageNumber = _this.page.pageNumber+1
        _this.$vux.loading.show();
        this.$http({
          url: '/record/getBetRecordByDay.html',
          method: 'post',
          params:{pageNum:_this.page.pageNumber,gameId:_this.defaultValue ,isBalance:1,searchBegin:_this.dafaultDate}
        }).then(function (res) {
            _this.betRecordList = _this.betRecordList.concat(res.data.result.result)
            _this.page = res.data.result.paging
            for(var i=0;i<res.data.result.result.length;i++){
              if(res.data.result.result[i].isMix==1){
                let betcontent1=eval("("+res.data.result.result[i].betContent+")")
                _this.betContentList[res.data.result.result[i].billNo]=betcontent1;
                if(res.data.result.result[i].isBalance==1){
                  _this.awardResult[res.data.result.result[i].billNo]=res.data.result.result.awardResult;
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
      gavePrompt:function (val) {
        this.promptInfo=val;
      },
      showUp:function () {
        this.promptInfo=!this.promptInfo;
      },
      tolsOrWj: function (path) {
        this.$router.push({path: path + '/' + new Date().getTime()})
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.scrollInit()
    })
    },
    created () {
      this.getBetRecord()
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
        return Util.formatDate.UnixToDate(timestamp,-12, 'yMDhms')
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
        if (status === -1 || status === 0 ||status === 3) {
          obj = '系统取消'
        }/* else if (status === 0) {
          obj = '个人取消'
        }*/ else if (status === 1) {
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
