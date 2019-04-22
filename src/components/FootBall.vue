<template>
  <div class="zhedie footballShow" v-if="matchesMsg != '' && !is_playMaintenance">
    <input hidden="hidden" :value="clirdShow"/>
    <div class="border" v-for="(matches, teamName) in matchesMsg" :key="teamName" :ref="matches.showContent">
      <cell :title="teamName" is-link :border-intent="false"
            :arrowDirection="matches.maxHeight.animate ? 'up' : 'down'"
            @click.native="showContent(matches.showContent)"
            value-align="right"
      ><span style="color: #FFFFFF;font-size: 15px;">{{matches.sum}}</span></cell>
      <div :class="matches.maxHeight"  v-for="(matchesInfo,key) in matches" :key="key+'fb'+matchesInfo.id">
        <div class="play-title" v-if="key == 0 || matchesInfo.leagueId != matches[key-1].leagueId">
          <div class="play-content">
            <span>让球</span>
            <span>大小</span>
          </div>
        </div>
        <div class="ball_cont">
          <div class="ball_dan_c">
            <div class="ball_dan_t">
              <div @click="goToMorePlay(matchesInfo)">
             <!-- <router-link class='link'
                           :to="{path:'/moreTYZQ',query:{url:'/moreTYZQ',type:dateType, params:{obj1: matchesInfo, obj2: reqParams}}}">-->
                <div class="dc_nei">
                  <span v-if="dateType === '1'" class="banchang">{{matchesInfo.liveTime}}</span>
                    <span v-else class="banchang">{{forMatDate(matchesInfo.startTime)}}</span>
                  <span class="add_f">+{{matchesInfo.more? matchesInfo.more + matchesInfo.morePlayNum : matchesInfo.morePlayNum}}<i class="arrows"></i></span></div>
                <div class="teama">
                  <p name="team">
                    <span class="football-name">{{matchesInfo.hteam}}</span>
                    <span class="red_box" v-if="matchesInfo.hillegal !== '0' && dateType === '1'">{{matchesInfo.hillegal}}</span> <!---->
                  </p>
                  <span class="win" v-if="dateType === '1'">{{matchesInfo.hscore}}</span>
                </div>
                <div class="teama">
                  <p name="team">
                    <span class="football-name">{{matchesInfo.gteam}}</span>
                    <span class="red_box" v-if="matchesInfo.gillegal !== '0' && dateType === '1'">{{matchesInfo.gillegal}}</span>  <!---->
                  </p>
                  <span  class="win" v-if="dateType === '1'">{{matchesInfo.gscore}}</span>
                </div>
             <!-- </router-link>-->
              </div>
            </div>
            <div class="ball_dan_cnt">
              <div class="rqa">
                <p  class="team_rq" :class="{ggSelect: isMix == 1 && checkedMatches[matchesInfo.onlykey + matchesInfo.matchesDetailId + playType.qcrq + (matchesInfo.concede ? '0' : '2')] }" to='/'
                   @click="betDialogHandler(matchesInfo,playType.host,playType.qcrq,'zr',matchesInfo.a_concede_h)">
                  <span  class="rq_b">
                    <i class="d-rq-l" v-show="matchesInfo.concede">{{(playType.qcrq in gamePlayObj)? matchesInfo.a_concede_num:''}}</i><i></i>
                  </span>
                    <span v-if="oddsSelect() === 'oddsCss1' && matchesInfo.a_concede_h" :class="matchesInfo.a_concede_h <0 ?'rq_zN':'rq_z'" :style="({color:oddsChangeClass(teamName, key,'a_concede_h_change')})">
                        {{(playType.qcrq in gamePlayObj)? formatOdds(matchesInfo.a_concede_h):'-'}}
                      </span>
                  <span v-if="oddsSelect() === 'oddsCss2' && matchesInfo.a_concede_h" :class="matchesInfo.a_concede_h <0 ?'rq_zN':'rq_z'" :style="({color:oddsChangeClass(teamName, key,'a_concede_h_change')})">
                  <i :class="oddsChangeTag(teamName, key,'a_concede_h_change')"></i>
                        {{(playType.qcrq in gamePlayObj)? formatOdds(matchesInfo.a_concede_h):'-'}}
                      </span>
                  <span class="rq_z" v-if="!matchesInfo.a_concede_h" >-</span>
                </p>
               <!-- <p v-if="!(playType.qcrq in gamePlayObj)"   class="team_rq">
                  <span class="rq_b"><i></i><i></i></span>
                  <span class="rq_z"></span>
                </p>-->
                <p  class="team_dx" :class="{ggSelect: isMix == 1 && checkedMatches[matchesInfo.onlykey + matchesInfo.matchesDetailId + playType.qcdx + '0'] }" to='/'
                   @click="betDialogHandler(matchesInfo,playType.host,playType.qcdx,'dxz',matchesInfo.a_d_num)">
                  <span class="dx_b"><i class="dx_a" v-show="matchesInfo.a_dq_num !== undefined">{{(playType.qcdx in gamePlayObj)? '大':''}}</i><i class="dx_c">{{(playType.qcdx in gamePlayObj)?matchesInfo.a_dq_num:''}}</i></span>
                    <span v-if="oddsSelect() === 'oddsCss1' && matchesInfo.a_d_num" :class="matchesInfo.a_d_num <0 ?'dx_zN':'dx_z'" :style="({color:oddsChangeClass(teamName, key,'a_d_num_change')})">
                      {{(playType.qcdx in gamePlayObj)? formatOdds(matchesInfo.a_d_num):'-'}}
                    </span>
                  <span v-if="oddsSelect() === 'oddsCss2' && matchesInfo.a_d_num" :class="matchesInfo.a_d_num <0 ?'dx_zN':'dx_z'" :style="({color:oddsChangeClass(teamName, key,'a_d_num_change')})">
                  <i :class="oddsChangeTag(teamName, key,'a_d_num_change')"></i>
                      {{(playType.qcdx in gamePlayObj)? formatOdds(matchesInfo.a_d_num):'-'}}
                    </span>
                    <span class="dx_z" v-if="!matchesInfo.a_d_num" >-</span>
                </p>
              <!--  <p v-if="!(playType.qcdx in gamePlayObj)" class="team_dx">
                  <span class="dx_b"><i class="dx_a">-</i><i class="dx_c">-</i></span>
                  <span class="dx_z">-</span>
                </p>-->
              </div>
              <!--动态玩法控制-->
              <div class="rqb">
                <p  class="team_rq" :class="{ggSelect: isMix == 1 && checkedMatches[matchesInfo.onlykey + matchesInfo.matchesDetailId + playType.qcrq + (matchesInfo.concede ? '1' : '3')] }" to='/'
                   @click="betDialogHandler(matchesInfo,!playType.host,playType.qcrq,'kr',matchesInfo.a_concede_g)">
                  <span class="rq_b">
                    <i class="d-rq-l" v-show="!matchesInfo.concede">{{(playType.qcrq in gamePlayObj)? matchesInfo.a_concede_num:''}}</i><i></i>
                  </span>
                    <span  v-if="oddsSelect() === 'oddsCss1' && matchesInfo.a_concede_g" :class="matchesInfo.a_concede_g <0 ?'rq_zN':'rq_z'" :style="({color:oddsChangeClass(teamName, key,'a_concede_g_change')})">
                      {{(playType.qcrq in gamePlayObj)? formatOdds(matchesInfo.a_concede_g):'-'}}
                    </span>
                  <span v-if="oddsSelect() === 'oddsCss2' && matchesInfo.a_concede_g" :class="matchesInfo.a_concede_g <0 ?'rq_zN':'rq_z'" :style="({color:oddsChangeClass(teamName, key,'a_concede_g_change')})">
                      <i :class="oddsChangeTag(teamName, key,'a_concede_g_change')"></i>
                      {{(playType.qcrq in gamePlayObj)? formatOdds(matchesInfo.a_concede_g):'-'}}
                    </span>
                  <span class="rq_z" v-if="!matchesInfo.a_concede_g">-</span>
                </p>
               <!-- <p v-if="!(playType.qcrq in gamePlayObj)"   class="team_rq">
                  <span class="rq_b"><i></i><i></i></span>
                  <span class="rq_z"></span>
                </p>-->
                <p class="team_dx" :class="{ggSelect: isMix == 1 && checkedMatches[matchesInfo.onlykey + matchesInfo.matchesDetailId + playType.qcdx + '1'] }" to='/'
                   @click="betDialogHandler(matchesInfo,!playType.host,playType.qcdx,'dxk',matchesInfo.a_x_num)">
                  <span class="dx_b "><i class="dx_a" v-show="matchesInfo.a_xq_num !== undefined">{{(playType.qcdx in gamePlayObj)? '小':''}}</i><i class="dx_c">{{(playType.qcdx in gamePlayObj)?matchesInfo.a_dq_num:''}}</i></span>
                    <span v-if="oddsSelect() === 'oddsCss1'&& matchesInfo.a_x_num" :class="matchesInfo.a_x_num <0 ?'dx_zN':'dx_z'" :style="({color:oddsChangeClass(teamName, key,'a_x_num_change')})">
                          {{(playType.qcdx in gamePlayObj)? formatOdds(matchesInfo.a_x_num):'-'}}
                    </span>
                  <span v-if="oddsSelect() === 'oddsCss2'&& matchesInfo.a_x_num" :class="matchesInfo.a_x_num <0 ?'dx_zN':'dx_z'" :style="({color:oddsChangeClass(teamName, key,'a_x_num_change')})">
                    <i :class="oddsChangeTag(teamName, key,'a_x_num_change')"></i>
                         {{(playType.qcdx in gamePlayObj)? formatOdds(matchesInfo.a_x_num):'-'}}
                  </span>
                  <span class="dx_z" v-if="!matchesInfo.a_x_num">-</span>
                </p>
               <!-- <p v-if="!(playType.qcdx in gamePlayObj)" class="team_dx">
                  <span class="dx_b"><i class="dx_a"></i><i class="dx_c"></i></span>
                  <span class="dx_z"></span>
                </p>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="is_playMaintenance" style="height: 280px;">
    <play-maintenance></play-maintenance>
  </div>
  <div class="is_playMaintenance" v-else>
    <play-maintenance></play-maintenance>
  </div>
</template>
<script>
/* eslint-disable arrow-spacing,no-return-assign */

import {Cell,Scroller} from 'vux'
import playMaintenance from '../views/update/index'
import Util from '../js/util/util'
import {store,process,oddsChange,showBet} from '../js/public/port'
export default {
  data () {
    return {
      oldMsg: {},
      newMsg: {},
      clirdShow:true,
    }
  },
  components: {
    Cell: Cell,
    'play-maintenance': playMaintenance
  },

  methods: {
    betDialogHandler (data, host, type, clickWho,curOdds) {
      showBet.betDialogHandler(data, host, type, clickWho,curOdds);
    },
    goToMorePlay(data){
     process.goToMorePlay(data);
    },
    showContent: function (e) {
      process.childShowTitle(!this.clirdShow, e,this);
    },
    forMatDate (time) {
      return Util.formatDate.UnixToDate(time, -12, 'MDhm')
    },
    formatOdds (data) {
      return Util.formatOdds(data);
    },
    oddsSelect () {
      return oddsChange.methods.oddsSelect()
    },
    //返回颜色
    oddsChangeClass(teamName, key, propertyKey) {
      let oddsC = oddsChange.methods.oddsChangeClass(teamName, key, propertyKey, this);
      let oddClassObj = store.state.oddClassObj;
      return oddClassObj['oddsCss1'][oddsC];
    },
    //返回箭头
    oddsChangeTag(teamName, key, propertyKey) {
      let oddsC = oddsChange.methods.oddsChangeClass(teamName, key, propertyKey, this);
      let oddClassObj = store.state.oddClassObj;
      return oddClassObj['oddsCss2'][oddsC];
    },
  },
  computed:{
    matchesMsg () {
      store.commit('showLoading',false);
      if(store.state.datas){
        return store.state.datas;
      }
      return [];
    },
    gamePlayObj(){
      return store.state.gamePlayObj;
    },
    playType:{
      get: function () {
        return store.state;
      },
      set: function (newValue) {
      }
    },
    /** 玩法类型 0单式 1综合过关 2冠军 */
    isMix: {
      get: function () {
        return store.state.baseParam.isMix;
      }
    },
    dateType:{
      get:function () {
        return store.state.baseParam.dateType;
      }
    },
    /** 综合过关样式 */
    checkedMatches: {
      get: function () {
        return store.state.checkedMatches;
      }
    },
    is_playMaintenance(){
      return store.state.is_playMaintenance;
    },
  },
  watch: {
    matchesMsg (now, old) {
      oddsChange.methods.watchMsg(now, old, this);
    }
  },
  mounted() {
  }
}
</script>
