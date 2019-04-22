<template>
  <div class="show-page" v-if="BallData.length > 0">
    <!--<my-header ref="myHeader" @pfn="timeFn"></my-header>-->
   <!-- <secondary-head :title="BallTitleData.leagueName"></secondary-head>-->
    <secondary-head :title="BallData[0].leagueName"></secondary-head>
    <h1 style="display: none">其他<span> <!--/ {{ BallTitleData.leagueName }}--></span>
      <!--<Timer :dataType="dateType" @pfn="timeFn"></Timer>-->
    </h1>
    <div class="score-box">
      <div class="cont box-10 other active" >  <!--v-if="reqparam.dateType == '1' && BallData.length > 0"-->
        <div class="bg">
          <!--<p class="top"></p>-->
          <!--<div class="team">-->
          <!--<p>{{ BallData[0].hteam }}</p>-->
          <!--<span>{{ BallData[0].hscore }} - {{ BallData[0].gscore }}</span>-->
          <!--<p>{{ BallData[0].gteam }}</p>-->
          <!--</div>-->
          <p class="top">
            <span v-if="dateType == '1'">滚球</span>
            <span v-if="dateType != '1'">{{getMonthAndDay(BallData[0].startTime)}}</span>
            <span class="different-style" v-if="dateType == '1'"></span>
            <span class="different-style" v-if="dateType != '1'">{{getHours(BallData[0].startTime)}}</span>
          </p>
          <div class="team">
            <span>{{ BallData[0].hteam }}</span>
            <span class="xian">|</span>
            <span>{{ BallData[0].gteam }}</span>
          </div>
        </div>
      </div>
      <!--<div class="cont matchesMore-box other active" v-else>-->
      <!--<div class="bg">-->
      <!--<p class="top"><span class="left live-ball" v-if="BallTitleData.isLive==='1'">滚球</span>{{ BallTitleData.startTimeStr }}</p>-->
      <!--<div class="team">-->
      <!--<p>{{ BallTitleData.hteam }}</p>-->
      <!--<span>VS</span>-->
      <!--<p>{{ BallTitleData.gteam }}</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>

    <div class='wrapper' ref='wrapper' :style="{bottom: isMix == '1' && mixCount > 0 ? '64px' : '0'}">
      <div class="content">
        <div class="score-cont zhedie">

          <!--独赢-->
          <cell v-if="playType.BallPlayIsShow.isdy && chargeMainAndImpr(playType.dy)" title="独赢" is-link :border-intent="false"  :arrow-direction="show.showContent006 ? 'up' : 'down'" @click.native="show.showContent006 = !show.showContent006"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'dy'" class="slide slide-1" :class="show.showContent006?'animate':''">
            <ul class="concede-points-box" v-if="v.dIorMH && v.dIorMC && chargeMainAndImpr(playType.dy)">
              <li class="concede-points"  @click="betHelpDialogHandler(v,playType.host,playType.dy,'dyz',v.dIorMH)">
                <p >{{ v.hteam }}</p>
                <p class="right-border" :class="{ggSelect:isMix == 1 &&  checkedMatches[v.onlykey + v.matchesDetailId + playType.dy + '0']}">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','dIorMH_change')})">{{formatOdds(v.dIorMH)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, '','dIorMH_change')})">
                    <i :class="oddsChangeTag(index, '','dIorMH_change')"></i>
                              {{formatOdds(v.dIorMH)}}
                  </span>
                </p>
              </li>
              <li class="concede-points"  @click="betHelpDialogHandler(v,!playType.host,playType.dy,'dyk',v.dIorMC)">
                <p >{{ v.gteam }}</p>
                <p class="right-border" :class="{ggSelect:isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.dy + '1']}">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','dIorMC_change')})">{{formatOdds(v.dIorMC)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, '','dIorMC_change')})">
                    <i :class="oddsChangeTag(index, '','dIorMC_change')"></i>
                              {{formatOdds(v.dIorMC)}}
                  </span>
                </p>
              </li>
              <li class="concede-points"  v-if="v.dIorMN" @click="betHelpDialogHandler(v,1,playType.dy,'dyh',v.dIorMN)">
                <p >和局</p>
                <p class="right-border" :class="{ggSelect:isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.dy + '2']}">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','dIorMN_change')})">{{formatOdds(v.dIorMN)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, '','dIorMN_change')})">
                    <i :class="oddsChangeTag(index, '','dIorMN_change')"></i>
                            {{formatOdds(v.dIorMN)}}
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <!--让球-->
          <cell v-if="playType.BallPlayIsShow.isqcrq && chargeMainAndImpr(playType.qcrq) " title="让球" is-link :border-intent="false"  :arrow-direction="show.showContent001 ? 'up' : 'down'" @click.native="show.showContent001 = !show.showContent001"></cell>
          <div v-for="(v,index)  in BallData" :key="v.id+'rq'" class="slide slide-1" :class="show.showContent001?'animate':''">
            <ul class="concede-points-box"  v-if="v.dIorRH && v.dIorRC && chargeMainAndImpr(playType.qcrq)">
              <li class="concede-points"  @click="betHelpDialogHandler(v,playType.host,playType.qcrq,'zr',v.dIorRH)">
                <p >{{ v.hteam }}</p>
                <p class="right-border" :class="{ggSelect: isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.qcrq + (v.dStrong=='H' ? '0' : '2')] }">
                  <span class="dataMargin" v-if="v.dStrong == 'H'">{{concedeTagH(v.dStrong,v.dIorRH)}} {{v.dRatio}}</span>
                  <span v-if="oddsSelect() === 'oddsCss1'" :class="v.dIorRH <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','dIorRH_change')})">{{formatOdds(v.dIorRH)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" :class="v.dIorRH <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','dIorRH_change')})">
                    <i :class="oddsChangeTag(index, '','dIorRH_change')"></i>
                            {{formatOdds(v.dIorRH)}}
                  </span>
                </p>
              </li>
              <li class="concede-points"  @click="betHelpDialogHandler(v,!playType.host,playType.qcrq,'kr',v.dIorRC)">
                <p >{{ v.gteam }}</p>
                <p class="right-border" :class="{ggSelect: isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.qcrq + (v.dStrong=='H' ? '1' : '3')] }">
                  <span class="dataMargin" v-if="v.dStrong == 'C'">{{concedeTagC(v.dStrong,v.dIorRC)}}{{v.dRatio}}</span>
                  <span v-if="oddsSelect() === 'oddsCss1'" :class="v.dIorRC <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','dIorRC_change')})">{{formatOdds(v.dIorRC)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" :class="v.dIorRC <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','dIorRC_change')})">
                    <i :class="oddsChangeTag(index, '','dIorRC_change')"></i>
                              {{formatOdds(v.dIorRC)}}
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <!--大小-->
          <cell v-if="playType.BallPlayIsShow.isqcdx && chargeMainAndImpr(playType.qcdx)" title="大小"  is-link  :border-intent="false"  :arrow-direction="show.showContent003 ? 'up' : 'down'" @click.native="show.showContent003 = !show.showContent003"></cell>
          <div v-for="(v,index)  in BallData" :key="v.id+'dx'" class="slide slide-1" :class="show.showContent003?'animate':''">
            <ul class="size-top-box" v-if="v.dIorOUH && v.dIorOUC && chargeMainAndImpr(playType.qcdx)">
              <li class="size-top">
                <p class="content" :class="{ggSelect:isMix == 1 &&   checkedMatches[v.onlykey + v.matchesDetailId + playType.qcdx + '0']}" @click="betHelpDialogHandler(v,playType.host,playType.qcdx,'dxz',v.dIorOUH)">
                  <span class="content-left"><span>大</span><span>{{v.dRatioO}}</span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" :class="v.dIorOUH <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','dIorOUH_change')})">{{formatOdds(v.dIorOUH)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" :class="v.dIorOUH <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','dIorOUH_change')})">
                      <i :class="oddsChangeTag(index, '','dIorOUH_change')"></i>
                                {{formatOdds(v.dIorOUH)}}
                    </span>
                  </span>
                </p>
                <p class="content" :class="{ggSelect:isMix == 1 &&   checkedMatches[v.onlykey + v.matchesDetailId + playType.qcdx + '1']}" @click="betHelpDialogHandler(v,!playType.host,playType.qcdx,'dxk',v.dIorOUC)">
                  <span class="content-left"><span>小</span><span>{{v.dRatioU}}</span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" :class="v.dIorOUC <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','dIorOUC_change')})">{{formatOdds(v.dIorOUC)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" :class="v.dIorOUC <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','dIorOUC_change')})">
                      <i :class="oddsChangeTag(index, '','dIorOUC_change')"></i>
                            {{formatOdds(v.dIorOUC)}}
                    </span>
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <!--单双-->
          <cell v-if="playType.BallPlayIsShow.isds && chargeMainAndImpr(playType.ds)" title="单双"  is-link  :border-intent="false"  :arrow-direction="show.showContent005 ? 'up' : 'down'" @click.native="show.showContent005 = !show.showContent005"></cell>
          <div v-for="(v,index)  in BallData" :key="v.id+'ds'" class="slide slide-1" :class="show.showContent005?'animate':''">
            <ul class="size-top-box" v-if="v.dIorEOO && v.dIorEOE && chargeMainAndImpr(playType.ds)">
              <li class="size-top">
                <p class="content" :class="{ggSelect:isMix == 1 &&  checkedMatches[v.onlykey + v.matchesDetailId + playType.ds + '1']}" @click="betHelpDialogHandler(v,!playType.host,playType.ds,'dsd',v.dIorEOO)">
                  <span class="content-left"><span>单</span><span></span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','dIorEOO_change')})">{{formatOdds(v.dIorEOO)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, '','dIorEOO_change')})">
                      <i :class="oddsChangeTag(index, '','dIorEOO_change')"></i>
                                {{formatOdds(v.dIorEOO)}}
                    </span>
                  </span>
                </p>
                <p class="content" :class="{ggSelect: isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.ds + '0']}" @click="betHelpDialogHandler(v,playType.host,playType.ds,'dss',v.dIorEOE)">
                  <span class="content-left"><span>双</span><span></span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','dIorEOE_change')})">{{formatOdds(v.dIorEOE)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, '','dIorEOE_change')})">
                      <i :class="oddsChangeTag(index, '','dIorEOE_change')"></i>
                                {{formatOdds(v.dIorEOE)}}
                    </span>
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div class="is_playMaintenance" v-if="BallData.length == 0 ||((!playType.BallPlayIsShow.isds || !chargeMainAndImpr(playType.dy)) && (!playType.BallPlayIsShow.isdy || !chargeMainAndImpr(playType.dy))
      && (!playType.BallPlayIsShow.isqcdx || !chargeMainAndImpr(playType.qcdx)) && (!playType.BallPlayIsShow.isqcrq || !chargeMainAndImpr(playType.qcrq)))" >
          <play-maintenance></play-maintenance>
        </div>

      </div>
    </div>

    <!-- 综合过关投注单 -->
    <div class="mask-dialog" v-if="is_mix_showModal && isMix =='1'"></div>
    <transition name="fade">
      <betMixDialog class="mixBet" v-if="is_mix_showModal && isMix =='1'" ></betMixDialog>
    </transition>

    <!-- 单式注单弹框 -->
    <div class="mask-dialog" v-if="is_showModal"></div>
    <transition name="bet">
      <betDialog class="singleBet" v-if="is_showModal" ></betDialog>
    </transition>

    <!--  综合过关 底部弹框：-->
    <div v-show="isMix == '1' && mixCount > 0" class="chooseMore" :class="{active: showChooseMore}" @click="toBetList">
      <a >综合过关-投注单 <sup>{{mixCount}}</sup></a>
    </div>


  </div>
</template>
<script>
/* eslint-disable quotes,spaced-comment,no-unused-vars,no-redeclare,no-useless-call */
import {Tab, TabItem, Scroller, Cell, CellBox, Group, Selector} from 'vux'
import { MyFooter, MyHeader, Timer, Prompt} from '../../router/api'
import Util from '../../js/util/util.js'
import SecondaryHead from '@/components/SecondaryHead'
import {store,oddsChange,showBet,base,process} from '../../js/public/port'
import BScroll from 'better-scroll'
import betClassify from '../../components/playType'
import Show from '../../js/show/show'
import betDialog from '@/views/betList/bet'
import betMixDialog from '@/views/betList/synthesize'
import playMaintenance from '../update/index'
export default{
  components: {
    'my-footer': MyFooter,betDialog,betMixDialog,
    'my-header': MyHeader,
    SecondaryHead,
    Tab,
    TabItem,
    Cell,
    CellBox,
    Selector,
    Scroller,
    Group,
    Timer,
    Prompt,
    playMaintenance
  },
  data () {
    return {
      hteam:'',
      gteam:'',
      oldMsg: {},
      newMsg: {},
      betType:betClassify,
      show:Show.data,
      showChooseMore: false,
    }
  },
  methods: {
    getMonthAndDay(time){
      return Util.getMonthAndDay(Util.formatDate.UnixToDate(time, -12, 'YMDhm'));
    },
    getHours(time){
      return Util.getNewHours(Util.formatDate.UnixToDate(time, -12, 'YMDhm'));
    },
    gavePrompt: function (val) {
      this.promptInfo = val
    },
    showUp: function () {
      this.promptInfo = !this.promptInfo
    },
    onResultChange1 (val) {
      /*Show.onResultChange1(val, this)*/
    },
    betHelpDialogHandler (data, host, type, clickWho,curOdds) {
      showBet.betDialogHandler(data, host, type, clickWho,curOdds);
    },
    timeFn () {
      if (this.timeObj) {
        /*Show.BallTitleBind(this.timeObj, this)*/
      }
    },
    toBetList(){
      store.state.is_mix_showModal = true;
      store.state.is_showModal = false;
    },
    formatOdds (data) {
      return Util.formatOdds(data);
    },
    oddsSelect () {
      return oddsChange.methods.oddsSelect()
    },
    //返回颜色
    oddsChangeClass (index, className, propertyKey) {
      let oddsC = oddsChange.methods.detailOddsChangeClass(index, className, propertyKey, this);
      let oddClassObj = store.state.oddClassObj;
      return oddClassObj['oddsCss1'][oddsC];

    },
    //返回箭头
    oddsChangeTag(index, className, propertyKey)  {
      let oddsC =  oddsChange.methods.detailOddsChangeClass(index, className, propertyKey, this);
      let oddClassObj = store.state.oddClassObj;
      return oddClassObj['oddsCss2'][oddsC];
    },
    chargeMainAndImpr(playId){
      if(this.maintenancePlay[playId] !=undefined && !this.maintenancePlay[playId]){
        return false; //玩法维护
      }
      if(this.imprisonPlay[playId] == undefined){
        return false; //禁用
      }
      return true; //可以展示
    },
    concedeTagH(val,data){
      if(data==null){
        return '';
      }
      if(val ==='H'){
        return "-";
      }else{
        return "+";
      }
    },
    concedeTagC(val,data){
      if(data==null){
        return '';
      }
      if(val ==='C'){
        return "-";
      }else{
        return "+";
      }
    }
  },
  mounted () {
    store.state.refreshStatus = true;
  },
  created () {
    this.$nextTick(() => {
      if (Util.isNotEmpty(this.$refs.wrapper)) {
        this.scroll = new BScroll(this.$refs.wrapper, {click: true})
      }
    })
  },
  computed:{
    BallData() {
      store.commit('showLoading',false);
      let code = store.state.morePlayData.code;
      if(code==='D000'){
        store.state.maintanceCode = code;
        store.state.isMore = false;
        store.state.isHome = false;
        base.methods.getMatches(true);
        //return [];
      }
      if (store.state.morePlayData
        && store.state.morePlayData.result
        && store.state.morePlayData.result.data != undefined
        && store.state.morePlayData.result.data.length > 0) {
        this.hteam = store.state.morePlayData.result.data[0].hteam;
        this.gteam = store.state.morePlayData.result.data[0].gteam;
        return store.state.morePlayData.result.data;
      }
      return [];
    },
    playType:{
      get: function () {
        return store.state;
      },
      set: function (newValue) {
      }
    },
    isMix:{
      get(){
        return store.state.baseParam.isMix;
      },
      set(){
      }
    },
    is_mix_showModal:{
      get: function () {
        return store.state.is_mix_showModal;
      },
      set: function (newValue) {
        store.state.is_mix_showModal = newValue;
      }
    },
    is_showModal:{
      get: function () {
        return store.state.is_showModal;
      },
      set: function (newValue) {
        store.state.is_showModal = newValue;
      }
    },
    /** 综合过关数目统计 */
    mixCount:{
      get: function () {
       let newOddsParams= process.getNewOddsParams();
        return newOddsParams.length;
      }
    },
    checkedMatches: {
      get: function () {
        return store.state.checkedMatches;
      },
      set: function (newValue) {
      }
    },
    maintenancePlay:{//玩法维护
      get: function () {
        return store.state.chargeMixOrChampion.TYQT["2"];
      },
      set: function (newValue) {
      }
    },
    imprisonPlay:{ //玩法禁用
      get: function () {
        return store.state.chargeMixOrChampion.TYQT["3"];
      },
      set: function (newValue) {
      }
    },
    dateType:{
      get:function () {
        return store.state.baseParam.dateType;
      }
    },
  },
  watch: {
    BallData (now, old) {
      oddsChange.methods.watchBallData(now, old, this)
    }
  },
  destroyed () {
   /* Show.destroyed(this)*/
  }
}
</script>
