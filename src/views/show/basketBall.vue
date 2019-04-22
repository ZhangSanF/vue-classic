<template>
  <div class="show-page" v-if="BallData.length > 0">
    <!--<my-header ref="myHeader" @pfn="timeFn"></my-header>-->
 <!--   <secondary-head :title="BallTitleData.leagueName"></secondary-head>-->
    <secondary-head :title="BallData[0].leagueName"></secondary-head>

    <h1 style="display: none">篮球<span> <!--/ {{ BallTitleData.leagueName }}--></span>
      <!--<Timer :dataType="dateType" @pfn="timeFn"></Timer>-->
    </h1>
    <div class="score-box">
      <div class="cont basketball-live basketball active" >  <!--v-if="reqparam.dateType == '1' &&  BallData.length > 0"-->
        <div class="bg">
          <div class="top">
            <div class="left">
              <div class="ball-info">
                <span class="score" v-if="BallData[0].hscore">{{  BallData[0].hscore }}</span>
                <div class="basketball-name">{{  BallData[0].hteam }}</div>
              </div>
              <div class="ball-info">
                <span class="score" v-if="BallData[0].gscore">{{  BallData[0].gscore }}</span>
                <div class="basketball-name">{{  BallData[0].gteam }}</div>
              </div>
            </div>
            <div class="right">
              <div class="right-box">
                <font v-if="dateType=='1'">{{BallData[0].liveStep }}</font>
                <span v-if="dateType=='1'">{{ BallData[0].liveTime == 'HT'?'':BallData[0].lastTime}}</span>
                <font v-if="dateType!='1'">{{ getMonthDay(BallData[0].startTime)}}</font>
                <font v-if="dateType!='1'">{{ getMondy(BallData[0].startTime)}}</font>
                <span v-if="dateType!='1'">{{ getHours(BallData[0].startTime)}}</span>
              </div>

            </div>
          </div>

        </div>
      </div>
      <!--<div class="cont matchesMore-box basketball active" v-else>-->
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
        <!--<h1 style="display: none">篮球<span> &lt;!&ndash;/ {{ BallTitleData.leagueName }}&ndash;&gt;</span>-->
          <!--&lt;!&ndash;<Timer :dataType="dateType" @pfn="timeFn"></Timer>&ndash;&gt;-->
        <!--</h1>-->
        <!--<div class="score-box">-->
          <!--<div class="cont basketball-live basketball active" v-if="BallData.length > 0">  &lt;!&ndash;v-if="reqparam.dateType == '1' &&  BallData.length > 0"&ndash;&gt;-->
            <!--<div class="bg">-->
              <!--<div class="top">-->
                <!--<div class="left">-->
                  <!--<p><span>{{  BallData[0].hscore }}</span><font>{{  BallData[0].hteam }}</font></p>-->
                  <!--<p><span>{{  BallData[0].gscore }}</span><font>{{  BallData[0].gteam }}</font></p>-->
                <!--</div>-->
                <!--<div class="right">-->
                  <!--<div class="right-box">-->
                      <!--<font>{{BallData[0].liveStep }}</font>-->
                      <!--<span>{{ BallData[0].liveTime == 'HT'?'':BallData[0].lastTime}}</span>-->
                  <!--</div>-->

                <!--</div>-->
              <!--</div>-->
              <!--<p class="botm">-->
                <!--<span>Q1(20-18)</span>-->
                <!--<span>Q2(20-18)</span>-->
                <!--<span>Q3(20-18)</span>-->
                <!--<span>Q4(20-18)</span>-->
              <!--</p>-->
            <!--</div>-->
          <!--</div>-->
          <!--&lt;!&ndash;<div class="cont matchesMore-box basketball active" v-else>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="bg">&ndash;&gt;-->
              <!--&lt;!&ndash;<p class="top"><span class="left live-ball" v-if="BallTitleData.isLive==='1'">滚球</span>{{ BallTitleData.startTimeStr }}</p>&ndash;&gt;-->
              <!--&lt;!&ndash;<div class="team">&ndash;&gt;-->
                <!--&lt;!&ndash;<p>{{ BallTitleData.hteam }}</p>&ndash;&gt;-->
                <!--&lt;!&ndash;<span>VS</span>&ndash;&gt;-->
                <!--&lt;!&ndash;<p>{{ BallTitleData.gteam }}</p>&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->

        <!--</div>-->

        <div class="score-cont zhedie">

          <!--让球-->
          <cell v-if="playType.BallPlayIsShow.isqcrq && chargeMainAndImpr(playType.rf)" title="让球" is-link :border-intent="false"  :arrow-direction="show.showContent001 ? 'up' : 'down'" @click.native="show.showContent001 = !show.showContent001"></cell>
          <div v-for="(v,index)  in BallData" :key="v.id+'rq'" class="slide slide-1" :class="show.showContent001?'animate':''">
            <ul class="concede-points-box" v-if="v.concede_h && v.concede_g && chargeMainAndImpr(playType.rf)">
              <li class="concede-points"  @click="betHelpDialogHandler(v,playType.host,playType.rf,'zr',v.concede_h)">
                <p >{{ v.hteam }}</p>
                <p class="right-border" :class="{ggSelect:isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.rf + (v.concede ? '0' : '2')] }">
                  <span class="dataMargin" v-if="v.concede">{{concedeTag(v.concede,v.concede_h)}}{{v.concede_num}}</span>
                  <span v-if="oddsSelect() === 'oddsCss1'" :class="v.concede_h <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','concede_h_change')})">{{formatOdds(v.concede_h)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" :class="v.concede_h <0 ?'OddsN':'Odds'">
                    <i :class="oddsChangeTag(index, '','concede_h_change')"></i>
                              {{formatOdds(v.concede_h)}}
                  </span>
                </p>
              </li>
              <li class="concede-points"  @click="betHelpDialogHandler(v,!playType.host,playType.rf,'kr',v.concede_g)">
                <p >{{ v.gteam }}</p>
                <p class="right-border" :class="{ggSelect:isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.rf + (v.concede ? '1' : '3')]}">
                  <span class="dataMargin" v-if="!v.concede">{{concedeTag(!v.concede,v.concede_g)}}{{v.concede_num}}</span>
                  <span v-if="oddsSelect() === 'oddsCss1'" :class="v.concede_g <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','concede_g_change')})">{{formatOdds(v.concede_g)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" :class="v.concede_g <0 ?'OddsN':'Odds'">
                    <i :class="oddsChangeTag(index, '','concede_g_change')"></i>
                              {{formatOdds(v.concede_g)}}
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <!--大小-->
          <cell v-if="playType.BallPlayIsShow.isqcdx && chargeMainAndImpr(playType.zfdx)" title="大小"  is-link  :border-intent="false"  :arrow-direction="show.showContent003 ? 'up' : 'down'" @click.native="show.showContent003 = !show.showContent003"></cell>
          <div v-for="(v,index)  in BallData" :key="v.id+'dx'" class="slide slide-1" :class="show.showContent003?'animate':''">
            <ul class="size-top-box" v-if="v.d_num && v.x_num && chargeMainAndImpr(playType.zfdx)">
              <li class="size-top">
                <p class="content" :class="{ggSelect: isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.zfdx + '0']}" @click="betHelpDialogHandler(v,playType.host,playType.zfdx,'dxz',v.d_num)">
                  <span class="content-left"><span>大</span><span>{{v.dq_num}}</span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" :class="v.d_num <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','d_num_change')})">{{formatOdds(v.d_num)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" :class="v.d_num <0 ?'OddsN':'Odds'">
                      <i :class="oddsChangeTag(index, '','d_num_change')"></i>
                                {{formatOdds(v.d_num)}}
                    </span>
                  </span>
                </p>
                <p class="content" :class="{ggSelect: isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.zfdx + '1']}" @click="betHelpDialogHandler(v,!playType.host,playType.zfdx,'dxk',v.x_num)">
                  <span class="content-left"><span>小</span><span>{{v.xq_num}}</span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" :class="v.x_num <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','x_num_change')})">{{formatOdds(v.x_num)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" :class="v.x_num <0 ?'OddsN':'Odds'">
                      <i :class="oddsChangeTag(index, '','x_num_change')"></i>
                                {{formatOdds(v.x_num)}}
                    </span>
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <!--独赢-->
          <cell v-if="playType.BallPlayIsShow.isdy && chargeMainAndImpr(playType.dy)" title="独赢" is-link :border-intent="false"  :arrow-direction="show.showContent006 ? 'up' : 'down'" @click.native="show.showContent006 = !show.showContent006"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'dy'" class="slide slide-1" :class="show.showContent006?'animate':''">
            <ul class="concede-points-box" v-if="v.capot_h && v.capot_g && chargeMainAndImpr(playType.dy)">
              <li class="concede-points"  @click="betHelpDialogHandler(v,playType.host,playType.dy,'dyz',v.capot_h)">
                <p >{{ v.hteam }}</p>
                <p class="right-border" :class="{ggSelect:isMix == 1 &&  checkedMatches[v.onlykey + v.matchesDetailId + playType.dy + '0']}">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','capot_h_change')})">{{formatOdds(v.capot_h)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds">
                    <i :class="oddsChangeTag(index, '','capot_h_change')"></i>
                            {{formatOdds(v.capot_h)}}
                  </span>
                </p>
              </li>
              <li class="concede-points"  @click="betHelpDialogHandler(v,!playType.host,playType.dy,'dyk',v.capot_g)">
                <p >{{ v.gteam }}</p>
                <p class="right-border" :class="{ggSelect:isMix == 1 &&  checkedMatches[v.onlykey + v.matchesDetailId + playType.dy + '1'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','capot_g_change')})">{{formatOdds(v.capot_g)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds">
                    <i :class="oddsChangeTag(index, '','capot_g_change')"></i>
                            {{formatOdds(v.capot_g)}}
                  </span>
                </p>
              </li>
              <li class="concede-points"  v-if="v.capot_d" @click="betHelpDialogHandler(v,1,playType.dy,'dyh',v.capot_d)">
                <p >和局</p>
                <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'dyh'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','capot_d_change')})">{{formatOdds(v.capot_d)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds">
                  <i :class="oddsChangeTag(index, '','capot_d_change')"></i>
                            {{formatOdds(v.capot_d)}}
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <!--球队得分-->
          <cell v-if="playType.BallPlayIsShow.isqddfz && chargeMainAndImpr(playType.dfdx)" :title="'球队得分:'+hteam+'-大/小'" is-link :border-intent="false"  :arrow-direction="show.showContent007 ? 'up' : 'down'" @click.native="show.showContent007 = !show.showContent007"></cell>
          <div v-for="(v,index)  in BallData" :key="v.id+'qddfz'" class="slide slide-1" :class="show.showContent007?'animate':''">
            <ul class="size-top-box" v-if="v.ior_OUHO && v.ior_OUHU && chargeMainAndImpr(playType.dfdx)">
              <li class="size-top">
                <p class="content" :class="{ggSelect:isMix == 1 && checkedMatches[v.onlykey +v.matchesDetailId + playType.dfdx + '0']}" @click="betHelpDialogHandler(v,playType.host,playType.dfdx,'zfdxzd',v.ior_OUHO)">
                  <span class="content-left"><span>大</span><span>{{v.ratio_ouho}}</span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" :class="v.ior_OUHO <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','ior_OUHO_change')})">{{formatOdds(v.ior_OUHO)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" :class="v.ior_OUHO <0 ?'OddsN':'Odds'">
                      <i :class="oddsChangeTag(index, '','ior_OUHO_change')"></i>
                                {{formatOdds(v.ior_OUHO)}}
                    </span>
                  </span>
                </p>
                <p class="content" :class="{ggSelect:isMix == 1 &&  checkedMatches[v.onlykey +v.matchesDetailId + playType.dfdx + '1']}" @click="betHelpDialogHandler(v,!playType.host,playType.dfdx,'zfdxzx',v.ior_OUHU)">
                  <span class="content-left"><span>小</span><span>{{v.ratio_ouhu}}</span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" :class="v.ior_OUHU <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','ior_OUHU_change')})">{{formatOdds(v.ior_OUHU)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" :class="v.ior_OUHU <0 ?'OddsN':'Odds'">
                      <i :class="oddsChangeTag(index, '','ior_OUHU_change')"></i>
                                {{formatOdds(v.ior_OUHU)}}
                    </span>
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <!--球队得分-->
          <cell v-if="playType.BallPlayIsShow.isqddfz && chargeMainAndImpr(playType.dfdx)" :title="'球队得分:'+gteam+'-大/小'" is-link :border-intent="false"  :arrow-direction="show.showContent008 ? 'up' : 'down'" @click.native="show.showContent008 = !show.showContent008"></cell>
          <div v-for="(v,index)  in BallData" :key="v.id+'qddfk'" class="slide slide-1" :class="show.showContent008?'animate':''">
            <ul class="size-top-box" v-if="v.ior_OUCO && v.ior_OUCU &&  chargeMainAndImpr(playType.dfdx)">
              <li class="size-top">
                <p class="content" :class="{ggSelect:isMix == 1 && checkedMatches[v.onlykey +v.matchesDetailId +playType.dfdx + '2'] }" @click="betHelpDialogHandler(v,playType.host,playType.dfdx,'zfdxkd',v.ior_OUCO)">
                  <span class="content-left"><span>大</span><span>{{v.ratio_ouco}}</span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" :class="v.ior_OUCO <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','ior_OUCO_change')})">{{formatOdds(v.ior_OUCO)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" :class="v.ior_OUCO <0 ?'OddsN':'Odds'">
                      <i :class="oddsChangeTag(index, '','ior_OUCO_change')"></i>
                                {{formatOdds(v.ior_OUCO)}}
                    </span>
                  </span>
                </p>
                <p class="content" :class="{ggSelect:isMix == 1 &&  checkedMatches[v.onlykey +v.matchesDetailId + playType.dfdx + '3']}" @click="betHelpDialogHandler(v,!playType.host,playType.dfdx,'zfdxkx',v.ior_OUCU)">
                  <span class="content-left"><span>小</span><span>{{v.ratio_oucu}}</span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" :class="v.ior_OUCU <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','ior_OUCU_change')})">{{formatOdds(v.ior_OUCU)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" :class="v.ior_OUCU <0 ?'OddsN':'Odds'">
                      <i :class="oddsChangeTag(index, '','ior_OUCU_change')"></i>
                                {{formatOdds(v.ior_OUCU)}}
                    </span>
                  </span>
                </p>
              </li>
            </ul>
          </div>
         </div>

        <div class="is_playMaintenance" v-if="BallData.length == 0 || ((!playType.BallPlayIsShow.isqddfk || !chargeMainAndImpr(playType.dfdx)) && (!playType.BallPlayIsShow.isqcrq || !chargeMainAndImpr(playType.rf))
        && (!playType.BallPlayIsShow.isqcdx || !chargeMainAndImpr(playType.zfdx)) && (!playType.BallPlayIsShow.isdy || !chargeMainAndImpr(playType.dy))
         && (!playType.BallPlayIsShow.isqddfz || !chargeMainAndImpr(playType.dfdx)))">
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
import {store,showBet,oddsChange,base,process} from '../../js/public/port'
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
    playMaintenance,
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
    gavePrompt: function (val) {
      this.promptInfo = val
    },
    showUp: function () {
      this.promptInfo = !this.promptInfo
    },
    onResultChange1 (val) {
    /*  Show.onResultChange1(val, this)*/
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
    getMondy(time)
    {
      return Util.getMondy(Util.formatDate.UnixToDate(time, -12, 'yMDhm'));
    },
    getMonthDay(time)
    {
      return Util.getMonthDay(Util.formatDate.UnixToDate(time, -12, 'YMDhm'));
    },
    getHours(time){
      return Util.getNewHours(Util.formatDate.UnixToDate(time, -12, 'YMDhm'));
    },
    chargeMainAndImpr(playId){//判断是否玩法禁用或玩法维护
      if(this.maintenancePlay[playId] !=undefined && !this.maintenancePlay[playId]){
        return false; //玩法维护
      }
      if(this.imprisonPlay[playId] == undefined){
        return false; //禁用
      }
      return true; //可以展示
    },
    concedeTag(val,data){
      if(data==null){
        return '';
      }
      if(val){
        return "-";
      }else{
        return "+";
      }
    }
  },
  mounted () {
    store.state.refreshStatus = true;
    /*Show.mounted(this)*/
  },
  created () {
    /*Show.created(this)*/
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
      }
    },
    dateType:{
      get:function () {
        return store.state.baseParam.dateType;
      }
    },
    maintenancePlay:{//玩法维护
      get: function () {
        return store.state.chargeMixOrChampion.TYLM["2"];
      },
      set: function (newValue) {
      }
    },
    imprisonPlay:{ //玩法禁止
      get: function () {
        return store.state.chargeMixOrChampion.TYLM["3"];
      },
      set: function (newValue) {
      }
    },
  },
  watch: {
    BallData (now, old) {
      oddsChange.methods.watchBallData(now, old, this)
    }
  },
  destroyed () {
    /*Show.destroyed(this)*/
  }
}
</script>
