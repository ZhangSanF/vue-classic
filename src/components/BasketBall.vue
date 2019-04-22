<template>
  <div class="zhedie footballShow" v-if="matchesMsg != '' && !is_playMaintenance">
    <input hidden="hidden" :value="clirdShow"/>
    <div class="border" v-for="(matches, teamName) in matchesMsg" :key="teamName" :ref="matches.showContent">
      <cell :title=teamName  is-link :border-intent="false"
            :arrow-direction="matches.maxHeight.animate ? 'up' : 'down'"
            @click.native="showContent(matches.showContent)"
            value-align="right"
      ><span style="color: #FFFFFF;font-size: 15px;">{{matches.sum}}</span></cell>
      <div :class="matches.maxHeight"  v-for="(matchesInfo,key) in matches" :key="key+'bkb'+matchesInfo.id">
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
                <div class="dc_nei"><span v-if="dateType == 1" class="banchang">{{
                  matchesInfo.liveTime == 'Q1'?'第一节':
                    matchesInfo.liveTime == 'Q2'?'第二节':
                      matchesInfo.liveTime == 'Q3'?'第三节':
                        matchesInfo.liveTime == 'Q4'?'第四节':
                          matchesInfo.liveTime == 'HT'?'半场':
                            matchesInfo.liveTime == 'H1'?'上半场':
                              matchesInfo.liveTime == 'H2' ? '下半场' : '加时'
                  }} {{ matchesInfo.liveTime == 'HT'?'':matchesInfo.lastTime}}
                  </span>
                  <span v-else class="banchang">{{forMatDate(matchesInfo.startTime)}} </span>
                  <span class="add_f">+{{matchesInfo.morePlayNum ? matchesInfo.morePlayNum : '0'}} <i class="arrows"></i></span></div>
                <div class="teama"><p name="team" class="bk_team">{{matchesInfo.hteam}}</p><span class="win">{{matchesInfo.hscore}}</span></div>
                <div class="teama"><p name="team" class="bk_team">{{matchesInfo.gteam}}</p><span class="win">{{matchesInfo.gscore}}</span></div>
              </div>
            </div>
            <div class="ball_dan_cnt">
              <div class="rqa">
                <!--v-if="playType.rf in gamePlayObj"-->
                <p  class="team_rq" :class="{ggSelect: isMix == 1 && checkedMatches[matchesInfo.onlykey + matchesInfo.matchesDetailId + playType.rf + (matchesInfo.concede ? '0' : '2')] }" to='/'
                   @click="betDialogHandler(matchesInfo,playType.host,playType.rf,'zr',matchesInfo.concede_h)">
                  <span class="rq_b">
                    <i class="d-rq-l" v-if="matchesInfo.concede">{{(playType.rf in gamePlayObj)? matchesInfo.concede_num:''}}</i><i></i>
                  </span>
                  <span v-if="oddsSelect() === 'oddsCss1' && matchesInfo.concede_h" :class="matchesInfo.concede_h <0 ?'rq_zN':'rq_z'" :style="({color:oddsChangeClass(teamName, key,'concede_h_change')})">
                        {{(playType.rf in gamePlayObj)? formatOdds(matchesInfo.concede_h):'-'}}
                      </span>
                  <span v-if="oddsSelect() === 'oddsCss2' && matchesInfo.concede_h" :class="matchesInfo.concede_h <0 ?'rq_zN':'rq_z'"  :style="({color:oddsChangeClass(teamName, key,'concede_h_change')})">
                    <i :class="oddsChangeTag(teamName, key,'a_concede_h_change')"></i>
                        {{(playType.rf in gamePlayObj)? formatOdds(matchesInfo.concede_h):'-'}}
                      </span>
                  <span class="rq_z" v-if="!matchesInfo.concede_h">-</span>
                </p>
               <!-- <p v-if="!(playType.rf in gamePlayObj)"   class="team_rq">
                  <span class="rq_b"><i></i><i></i></span>
                  <span class="rq_z"></span>
                </p>-->
                <!--v-if="playType.zfdx in gamePlayObj"-->
                <p  class="team_dx" :class="{ggSelect: isMix == 1 && checkedMatches[matchesInfo.onlykey + matchesInfo.matchesDetailId + playType.zfdx + '0'] }" to='/'
                   @click="betDialogHandler(matchesInfo,playType.host,playType.zfdx,'dxz',matchesInfo.d_num)">
                  <span class="dx_b"><i class="dx_a" v-show="matchesInfo.dq_num !== undefined">{{(playType.zfdx in gamePlayObj)? '大':''}}</i><i class="dx_c">{{(playType.zfdx in gamePlayObj)? matchesInfo.dq_num:''}}</i></span>
                  <span v-if="oddsSelect() === 'oddsCss1' && matchesInfo.d_num" :class="matchesInfo.d_num <0 ?'dx_zN':'dx_z'"
                        :style="({color:oddsChangeClass(teamName, key,'d_num_change')})">
                        {{(playType.zfdx in gamePlayObj)? formatOdds(matchesInfo.d_num):'-'}}
                      </span>
                  <span v-if="oddsSelect() === 'oddsCss2' && matchesInfo.d_num" :class="matchesInfo.d_num <0 ?'dx_zN':'dx_z'" :style="({color:oddsChangeClass(teamName, key,'d_num_change')})">
                  <i :class="oddsChangeTag(teamName, key,'d_num_change')"></i>
                       {{(playType.zfdx in gamePlayObj)? formatOdds(matchesInfo.d_num):'-'}}
                      </span>
                  <span class="dx_z" v-if="!matchesInfo.d_num">-</span>
                </p>
              <!--<p v-if="!(playType.zfdx in gamePlayObj)" class="team_dx">
                  <span class="dx_b"><i class="dx_a"></i><i class="dx_c"></i></span>
                  <span class="dx_z"></span>
                </p>-->
              </div>
              <div class="rqb">
                <p  class="team_rq" :class="{ggSelect: isMix == 1 && checkedMatches[matchesInfo.onlykey + matchesInfo.matchesDetailId + playType.rf + (matchesInfo.concede ? '1' : '3')] }" to='/'
                   @click="betDialogHandler(matchesInfo,!playType.host,playType.rf,'kr',matchesInfo.concede_g)">
                  <span class="rq_b">
                    <i class="d-rq-l" v-if="!matchesInfo.concede">{{(playType.rf in gamePlayObj)? matchesInfo.concede_num:''}}</i><i></i>
                  </span>
                  <span v-if="oddsSelect() === 'oddsCss1' && matchesInfo.concede_g" :class="matchesInfo.concede_g <0 ?'rq_zN':'rq_z'"
                        :style="({color:oddsChangeClass(teamName, key,'concede_g_change')})">
                        {{(playType.rf in gamePlayObj)? formatOdds(matchesInfo.concede_g):'-'}}
                      </span>
                  <span v-if="oddsSelect() === 'oddsCss2' && matchesInfo.concede_g" :class="matchesInfo.concede_g <0 ?'rq_zN':'rq_z'" :style="({color:oddsChangeClass(teamName, key,'concede_g_change')})">
                  <i :class="oddsChangeTag(teamName, key,'a_concede_g_change')"></i>
                        {{(playType.rf in gamePlayObj)? formatOdds(matchesInfo.concede_g):'-'}}
                      </span>
                  <span  class="rq_z" v-if="!matchesInfo.concede_g">-</span>
                </p>
                <!--<p v-if="!(playType.rf in gamePlayObj)"   class="team_rq">
                  <span class="rq_b"><i></i><i></i></span>
                  <span class="rq_z"></span>
                </p>-->
                <p  class="team_dx" :class="{ggSelect: isMix == 1 && checkedMatches[matchesInfo.onlykey + matchesInfo.matchesDetailId + playType.zfdx + '1'] }" to='/'
                   @click="betDialogHandler(matchesInfo,!playType.host,playType.zfdx,'dxk',matchesInfo.x_num)">
                  <span class="dx_b"><i class="dx_a" v-show="matchesInfo.xq_num !== undefined">{{(playType.zfdx in gamePlayObj)? '小':''}}</i><i class="dx_c">{{(playType.zfdx in gamePlayObj)? matchesInfo.xq_num:''}}</i></span>
                  <span v-if="oddsSelect() === 'oddsCss1' && matchesInfo.x_num" :class="matchesInfo.x_num <0 ?'dx_zN':'dx_z'"
                        :style="({color:oddsChangeClass(teamName, key,'x_num_change')})">
                        {{(playType.zfdx in gamePlayObj)? formatOdds(matchesInfo.x_num):'-'}}
                      </span>
                  <span v-if="oddsSelect() === 'oddsCss2' && matchesInfo.x_num" :class="matchesInfo.x_num <0 ?'dx_zN':'dx_z'" :style="({color:oddsChangeClass(teamName, key,'x_num_change')})">
                    <i :class="oddsChangeTag(teamName, key,'x_num_change')"></i>
                        {{(playType.zfdx in gamePlayObj)? formatOdds(matchesInfo.x_num):'-'}}
                  </span>
                  <span class="dx_z" v-if="!matchesInfo.x_num">-</span>
                </p>
               <!-- <p v-if="!(playType.zfdx in gamePlayObj)" class="team_dx">
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
import {Cell} from 'vux'
import Util from '../js/util/util'
import playMaintenance from '../views/update/index'
import {store,process,oddsChange,showBet} from '../js/public/port'

export default{
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
  mounted() {

  },
  watch: {
    matchesMsg (now, old) {
      oddsChange.methods.watchMsg(now, old, this)
    }
  }
}
</script>
