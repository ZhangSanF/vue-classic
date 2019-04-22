<template>
  <div class="show-page" v-if=" BallData.length > 0">
    <!--<my-header ref="myHeader" @pfn="timeFn"></my-header>-->
    <secondary-head :title="BallData[0].leagueName"></secondary-head>
    <h1 style="display: none">足球<span><!-- / {{ BallTitleData.leagueName }}--></span>
      <!--<Timer :dataType="dateType" @pfn="timeFn"></Timer>-->
    </h1>
    <div class="score-box">
      <div class="cont football-live football active" >
        <p class="top">
          <span class="left" v-if="dateType=='1'">滚球</span>
          <span class="left" v-if="dateType!='1'" style="width: 38%;">{{getMonthAndDay(BallData[0].startTime)}}</span>
          <span class="center"></span>
          <span class="different-style">{{BallData[0].liveTime}}</span>
          <span class="different-style" v-if="dateType!='1'">{{getHours(BallData[0].startTime)}}</span>
        </p>
        <div class="card-box">
          <p>
            <span v-if="dateType=='1' && BallData.length > 0 && BallData[0].hillegal !== '0'" class="red-card">{{BallData[0].hillegal}}</span>
         <!--   <span class="yellow-card">2</span>-->
          </p>
          <p>
            <span v-if="dateType=='1' && BallData.length > 0 && BallData[0].gillegal !== '0'"  class="red-card">{{BallData[0].gillegal}}</span>
          <!--  <span class="yellow-card">2</span>-->
          </p>
        </div>
        <div class="team">
          <span class="left-name">{{ BallData[0].hteam }}</span>
          <span class="center-score">
                <span class="score-left">{{ BallData[0].hscore }}</span>
                <span class="xian">|</span>
                <span class="score-right">{{ BallData[0].gscore }}</span>
          </span>
          <span class="right-name">{{ BallData[0].gteam }}</span>
        </div>
      </div>

    </div>
    <div class='wrapper' ref='wrapper' :style="{bottom: isMix == '1' && mixCount > 0 ? '64px' : '0'}">
      <div class="content">
        <!--<h1 style="display: none">足球<span>&lt;!&ndash; / {{ BallTitleData.leagueName }}&ndash;&gt;</span>-->
          <!--&lt;!&ndash;<Timer :dataType="dateType" @pfn="timeFn"></Timer>&ndash;&gt;-->
        <!--</h1>-->
        <!--<div class="score-box">-->
          <!--<div class="cont football-live football active" v-if=" BallData.length > 0">  &lt;!&ndash;dylan v-if="reqparam.dateType == '1' && BallData.length > 0"&ndash;&gt;-->
            <!--<p class="top">-->
              <!--<span class="left">滚球</span>-->
              <!--<span class="center">半场(0:0)</span>-->
              <!--<span class="different-style">{{BallData[0].liveTime}}</span>-->
            <!--</p>-->
            <!--&lt;!&ndash;<div class="score" >&ndash;&gt;-->
              <!--&lt;!&ndash;<p class="left" v-show="BallData[0].hillegal !=='0'"><span class="red">{{BallData[0].hillegal}}</span></p>&ndash;&gt;-->
              <!--&lt;!&ndash;<p class="right" v-show="BallData[0].gillegal !=='0'" ><span class="red">{{BallData[0].gillegal}}</span></p>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--<div class="team">-->
              <!--<span>{{ BallData[0].hteam }}</span>-->
              <!--<span >-->
                <!--<span class="score-left">{{ BallData[0].hscore }}</span>-->
                <!--<span class="xian">|</span>-->
                <!--<span class="score-right">{{ BallData[0].gscore }}</span>-->
              <!--</span>-->
              <!--<span>{{ BallData[0].gteam }}</span>-->
            <!--</div>-->
          <!--</div>-->

        <!--</div>-->
        <div class="score-cont zhedie">
          <!--独赢-->
          <cell v-if="playType.BallPlayIsShow.isdy && chargeMainAndImpr(playType.dy)" title="独赢" is-link :border-intent="false" :arrow-direction="show.showContent006 ? 'up' : 'down'"
                @click.native="show.showContent006 = !show.showContent006"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'dy'" class="slide slide-1" :class="show.showContent006?'animate':''">
            <ul class="concede-points-box" v-if="v.a_capot_h && v.a_capot_g && v.a_capot_d && chargeMainAndImpr(playType.dy)">
              <li class="concede-points"  @click="betHelpDialogHandler(v,playType.host,playType.dy,'dyz',v.a_capot_h)">
                <p >{{ v.hteam }}</p>
                <p class="right-border" :class="{ggSelect:isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.dy + '0']}">
                  <span v-if="oddsSelect() === 'oddsCss1'"  class="Odds" :style="({color:oddsChangeClass(index, '','a_capot_h_change')})">{{formatOdds(v.a_capot_h)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds"  :style="({color:oddsChangeClass(index, '','a_capot_h_change')})">
                    <i :class="oddsChangeTag(index, '','a_capot_h_change')"></i>
                            {{formatOdds(v.a_capot_h)}}
                  </span>
                </p>
              </li>
              <li class="concede-points"  @click="betHelpDialogHandler(v,!playType.host,playType.dy,'dyk',v.a_capot_g)">
                <p >{{ v.gteam }}</p>
                <p class="right-border" :class="{ggSelect:isMix == 1 &&  checkedMatches[v.onlykey + v.matchesDetailId + playType.dy + '1'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','a_capot_g_change')})">{{formatOdds(v.a_capot_g)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, '','a_capot_g_change')})">
                    <i :class="oddsChangeTag(index, '','a_capot_g_change')"></i>
                            {{formatOdds(v.a_capot_g)}}
                  </span>
                </p>
              </li>
              <li class="concede-points"  @click="betHelpDialogHandler(v,1,playType.dy,'dyh',v.a_capot_d)">
                <p >和局</p>
                <p class="right-border" :class="{ggSelect:isMix == 1 &&  checkedMatches[v.onlykey + v.matchesDetailId + playType.dy + '2'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','a_capot_d_change')})">{{formatOdds(v.a_capot_d)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, '','a_capot_d_change')})">
                  <i :class="oddsChangeTag(index, '','a_capot_d_change')"></i>
                            {{formatOdds(v.a_capot_d)}}
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <!--让球-->
          <cell v-if="playType.BallPlayIsShow.isqcrq && chargeMainAndImpr(playType.qcrq)" title="让球" is-link :border-intent="false"
                :arrow-direction="show.showContent001 ? 'up' : 'down'"
                @click.native="show.showContent001 = !show.showContent001"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'rq'" class="slide slide-1" :class="show.showContent001?'animate':''">
            <ul class="concede-points-box" v-if="v.a_concede_h && v.a_concede_g && chargeMainAndImpr(playType.qcrq)" >
              <li class="concede-points" @click="betHelpDialogHandler(v,playType.host,playType.qcrq,'zr',v.a_concede_h)" >
                <p>{{ v.hteam }}</p>
                <p class="right-border"  :class="{ggSelect: isMix == 1 &&  checkedMatches[v.onlykey + v.matchesDetailId + playType.qcrq + (v.concede ? '0' : '2')]}">
                  <span class="dataMargin" v-if="v.concede">{{concedeTag(v.concede,v.a_concede_h)}}{{ v.a_concede_num }}</span>
                  <span v-if="oddsSelect() === 'oddsCss1'" :class="v.a_concede_h <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','a_concede_h_change')})">{{formatOdds(v.a_concede_h)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" :class="v.a_concede_h <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','a_concede_h_change')})">
                    <i :class="oddsChangeTag(index, '','a_concede_h_change')"></i>{{formatOdds(v.a_concede_h)}}
                  </span>
                </p>
              </li>
              <li @click="betHelpDialogHandler(v,!playType.host,playType.qcrq,'kr',v.a_concede_g)" class="concede-points">
                <p >{{ v.gteam }}</p>
                <p class="right-border"  :class="{ggSelect:isMix == 1 &&  checkedMatches[v.onlykey + v.matchesDetailId + playType.qcrq + (v.concede ? '1' : '3')]}">
                  <span class="dataMargin" v-if="!v.concede">{{concedeTag(!v.concede,v.a_concede_g)}}{{ v.a_concede_num }}</span>
                  <span v-if="oddsSelect() === 'oddsCss1'" :class="v.a_concede_g <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','a_concede_g_change')})">{{formatOdds(v.a_concede_g)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" :class="v.a_concede_g <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','a_concede_g_change')})">
                    <i :class="oddsChangeTag(index, '','a_concede_g_change')"></i>{{formatOdds(v.a_concede_g)}}
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <!--大小-->
          <cell v-if="playType.BallPlayIsShow.isqcdx && chargeMainAndImpr(playType.qcdx)" title="大小" is-link :border-intent="false"
                :arrow-direction="show.showContent003 ? 'up' : 'down'"
                @click.native="show.showContent003 = !show.showContent003"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'dx'" class="slide slide-1" :class="show.showContent003?'animate':''">
            <ul class="size-top-box" v-if="v.a_d_num && v.a_x_num && chargeMainAndImpr(playType.qcdx)" >
              <li class="size-top">
                <p class="content" :class="{ggSelect:isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.qcdx + '0']}" @click="betHelpDialogHandler(v,playType.host,playType.qcdx,'dxz',v.a_d_num)">
                  <span class="content-left"><span>大</span><span>{{v.a_dq_num}}</span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" :class="v.a_d_num <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','a_d_num_change')})">{{formatOdds(v.a_d_num)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" :class="v.a_d_num <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','a_d_num_change')})">
                      <i :class="oddsChangeTag(index, '','a_d_num_change')"></i>
                      {{formatOdds(v.a_d_num)}}
                    </span>
                  </span>
                </p>
                <p class="content" :class="{ggSelect:isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.qcdx + '1']}" @click="betHelpDialogHandler(v,!playType.host,playType.qcdx,'dxk',v.a_x_num)">
                  <span class="content-left"><span>小</span><span>{{v.a_xq_num}}</span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" :class="v.a_x_num <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','a_x_num_change')})">{{formatOdds(v.a_x_num)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" :class="v.a_x_num <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','a_x_num_change')})">
                      <i :class="oddsChangeTag(index, '','a_x_num_change')"></i>
                      {{formatOdds(v.a_x_num)}}
                    </span>
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <!--单双-->
          <cell v-if="playType.BallPlayIsShow.isds && chargeMainAndImpr(playType.ds)" title="单双" is-link :border-intent="false"
                :arrow-direction="show.showContent005 ? 'up' : 'down'"
                @click.native="show.showContent005 = !show.showContent005"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'ds'" class="slide slide-1" :class="show.showContent005?'animate':''">
            <ul class="size-top-box" v-if="v.a_d_odds && v.a_s_odds && chargeMainAndImpr(playType.ds)">
              <li class="size-top">
                <p class="content" :class="{ggSelect:isMix == 1 &&  checkedMatches[v.onlykey + v.matchesDetailId + playType.ds + '1']}" @click="betHelpDialogHandler(v,!playType.host,playType.ds,'dsd',v.a_d_odds)">
                  <span class="content-left"><span>单</span><span></span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','a_d_odds_change')})">{{formatOdds(v.a_d_odds)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, '','a_d_odds_change')})">
                      <i :class="oddsChangeTag(index, '','a_d_odds_change')"></i>
                              {{formatOdds(v.a_d_odds)}}
                    </span>
                  </span>
                </p>
                <p class="content" :class="{ggSelect:isMix == 1 &&  checkedMatches[v.onlykey + v.matchesDetailId + playType.ds + '0']}" @click="betHelpDialogHandler(v,playType.host,playType.ds,'dss',v.a_s_odds)">
                  <span class="content-left"><span>双</span><span></span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','a_s_odds_change')})">{{formatOdds(v.a_s_odds)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, '','a_s_odds_change')})">
                      <i :class="oddsChangeTag(index, '','a_s_odds_change')"></i>
                              {{formatOdds(v.a_s_odds)}}
                    </span>
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <!--独赢-上半场-->
          <cell v-if="playType.BallPlayIsShow.isbcdy && chargeMainAndImpr(playType.bcdy)" title="独赢-上半场" is-link :border-intent="false" :arrow-direction="show.showContent007 ? 'up' : 'down'"
                @click.native="show.showContent007 = !show.showContent007"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'dysbc'" class="slide slide-1" :class="show.showContent007?'animate':''">
            <ul class="concede-points-box" v-if="v.u_capot_h && v.u_capot_g && v.u_capot_d && chargeMainAndImpr(playType.bcdy)">
              <li class="concede-points"  @click="betHelpDialogHandler(v,playType.host,playType.bcdy,'sbdyz',v.u_capot_h)">
                <p >{{ v.hteam }}</p>
                <p class="right-border" :class="{ggSelect:isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.bcdy + '0']}">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','u_capot_h_change')})">{{formatOdds(v.u_capot_h)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, '','u_capot_h_change')})">
                    <i :class="oddsChangeTag(index, '','u_capot_h_change')"></i>
                            {{formatOdds(v.u_capot_h)}}
                  </span>
                </p>
              </li>
              <li class="concede-points"  @click="betHelpDialogHandler(v,!playType.host,playType.bcdy,'sbdyk',v.u_capot_g)">
                <p>{{ v.gteam }}</p>
                <p class="right-border" :class="{ggSelect: isMix == 1 &&  checkedMatches[v.onlykey + v.matchesDetailId + playType.bcdy + '1']}">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','u_capot_g_change')})">{{formatOdds(v.u_capot_g)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, '','u_capot_g_change')})">
                    <i :class="oddsChangeTag(index, '','u_capot_g_change')"></i>
                            {{formatOdds(v.u_capot_g)}}
                  </span>
                </p>
              </li>
              <li class="concede-points"   @click="betHelpDialogHandler(v,1,playType.bcdy,'sbdyh',v.u_capot_d)">
                <p >和局</p>
                <p class="right-border" :class="{ggSelect:isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.bcdy + '2'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','u_capot_d_change')})">{{formatOdds(v.u_capot_d)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, '','u_capot_d_change')})">
                    <i :class="oddsChangeTag(index, '','u_capot_d_change')"></i>
                            {{formatOdds(v.u_capot_d)}}
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <!--让球-上半场-->
          <cell v-if="playType.BallPlayIsShow.isbcrq && chargeMainAndImpr(playType.bcrq)" title="让球-上半场" is-link :border-intent="false"
                :arrow-direction="show.showContent002 ? 'up' : 'down'"
                @click.native="show.showContent002 = !show.showContent002"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'rqsbc'" class="slide slide-1" :class="show.showContent002?'animate':''">
            <ul v-if="v.u_concede_h && v.u_concede_g && chargeMainAndImpr(playType.bcrq)" class="concede-points-box">
              <li  class="concede-points" @click="betHelpDialogHandler(v,playType.host,playType.bcrq,'sbzr',v.u_concede_h)">
                <p>{{ v.hteam }}</p>
                <p class="right-border" :class="{ggSelect:isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.bcrq + (v.concede ? '0' : '2')]}">
                  <span class="dataMargin" v-if="v.half_concede">{{concedeTag(v.half_concede,v.u_concede_h)}}{{ v.u_concede_num }}</span>
                  <span v-if="oddsSelect() === 'oddsCss1'" :class="v.u_concede_h <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','u_concede_h_change')})">{{formatOdds(v.u_concede_h)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" :class="v.u_concede_h <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','u_concede_h_change')})">
                    <i :class="oddsChangeTag(index, '','u_concede_h_change')"></i>
                            {{formatOdds(v.u_concede_h)}}
                  </span>
                </p>
              </li>
              <li class="concede-points"  @click="betHelpDialogHandler(v,!playType.host,playType.bcrq,'sbkr',v.u_concede_g)">
                <p >{{ v.gteam }}</p>
                <p class="right-border" :class="{ggSelect:isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.bcrq + (v.concede ? '1' : '3')] }">
                  <span class="dataMargin" v-if="!v.half_concede">{{concedeTag(!v.half_concede,v.u_concede_g)}}{{ v.u_concede_num }}</span>
                  <span v-if="oddsSelect() === 'oddsCss1'" :class="v.u_concede_g <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','u_concede_g_change')})">{{formatOdds(v.u_concede_g)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" :class="v.u_concede_g <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','u_concede_g_change')})">
                    <i :class="oddsChangeTag(index, '','u_concede_g_change')"></i>
                            {{formatOdds(v.u_concede_g)}}
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <!--大小-上半场-->
          <cell v-if="playType.BallPlayIsShow.isbcdx && chargeMainAndImpr(playType.bcdx)" title="大小-上半场" is-link :border-intent="false"
                :arrow-direction="show.showContent004 ? 'up' : 'down'"
                @click.native="show.showContent004 = !show.showContent004"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'dxsbc'" class="slide slide-1" :class="show.showContent004?'animate':''">
            <ul class="size-top-box" v-if="v.u_d_num && v.u_x_num && chargeMainAndImpr(playType.bcdx)" >
              <li class="size-top">
                <p class="content" :class="{ggSelect:isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.bcdx + '0']}" @click="betHelpDialogHandler(v,playType.host,playType.bcdx,'dxz',v.u_d_num)">
                  <span class="content-left"><span>大</span><span>{{v.u_dq_num}}</span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" :class="v.u_d_num <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','u_d_num_change')})">{{formatOdds(v.u_d_num)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" :class="v.u_d_num <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','u_d_num_change')})">
                      <i :class="oddsChangeTag(index, '','u_d_num_change')"></i>
                              {{formatOdds(v.u_d_num)}}
                    </span>
                  </span>
                </p>
                <p class="content" :class="{ggSelect:isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.bcdx + '1']}" @click="betHelpDialogHandler(v,!playType.host,playType.bcdx,'dxk',v.u_x_num)">
                  <span class="content-left"><span>小</span><span>{{v.u_xq_num}}</span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" :class="v.u_x_num <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','u_x_num_change')})">{{formatOdds(v.u_x_num)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" :class="v.u_x_num <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','u_x_num_change')})">
                      <i :class="oddsChangeTag(index, '','u_x_num_change')"></i>
                              {{formatOdds(v.u_x_num)}}
                    </span>
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <!--波胆-->
          <cell v-if="playType.BallPlayIsShow.isbd && chargeMainAndImpr(betType.football.bd)" title="波胆" is-link :border-intent="false"
                :arrow-direction="show.showContent009 ? 'up' : 'down'"
                @click.native="show.showContent009 = !show.showContent009"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'bd'" class="slide slide-1" :class="show.showContent009?'animate':''">
            <ul class="correct-box" v-if="v.footballCorrect && chargeMainAndImpr(betType.football.bd)" >
              <!--<li style="text-align: center"><p>{{v.hteam}}</p>-->
              <!--<p>和</p>-->
              <!--<p>{{v.gteam}}</p>-->
              <!--</li>-->
              <li class="correct">
                <p @click="betHelpDialogHandler(v,playType.host,betType.football.bd10,'bd10',v.footballCorrect.oneozero_h)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd10'] }">
                    <span class="item-left">1:0</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','oneozero_h_change')})">{{formatOdds(v.footballCorrect.oneozero_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','oneozero_h_change')})">
                        <i :class="oddsChangeTag(index, 'footballCorrect','oneozero_h_change')"></i>
                          {{formatOdds(v.footballCorrect.oneozero_h)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p  @click="betHelpDialogHandler(v,1,betType.football.bd00,'bd00',v.footballCorrect.zeroozero)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd00'] }">
                    <span class="item-left">0:0</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','zeroozero_change')})">{{formatOdds(v.footballCorrect.zeroozero)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','zeroozero_change')})">
                        <i :class="oddsChangeTag(index, 'footballCorrect','zeroozero_change')"></i>
                                {{formatOdds(v.footballCorrect.zeroozero)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p @click="betHelpDialogHandler(v,!playType.host,betType.football.bd10,'bd01',v.footballCorrect.oneozero_g)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd01'] }">
                    <span class="item-left">0:1</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','oneozero_g_change')})">{{formatOdds(v.footballCorrect.oneozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','oneozero_g_change')})">
                      <i :class="oddsChangeTag(index, 'footballCorrect','oneozero_g_change')"></i>
                                {{formatOdds(v.footballCorrect.oneozero_g)}}
                      </span>
                    </span>
                  </span>
                </p>
              </li>
              <li class="correct">
                <p @click="betHelpDialogHandler(v,playType.host,betType.football.bd20,'bd20',v.footballCorrect.twoozero_h)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd20'] }">
                    <span class="item-left">2:0</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','twoozero_h_change')})">{{formatOdds(v.footballCorrect.twoozero_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','twoozero_h_change')})">
                        <i :class="oddsChangeTag(index, 'footballCorrect','twoozero_h_change')"></i>
                                {{formatOdds(v.footballCorrect.twoozero_h)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p @click="betHelpDialogHandler(v,1,betType.football.bd11,'bd11',v.footballCorrect.oneoone)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd11'] }">
                    <span class="item-left">1:1</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','oneoone_change')})">{{formatOdds(v.footballCorrect.oneoone)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','oneoone_change')})">
                      <i :class="oddsChangeTag(index, 'footballCorrect','oneoone_change')"></i>
                                {{formatOdds(v.footballCorrect.oneoone)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p @click="betHelpDialogHandler(v,!playType.host,betType.football.bd20,'bd02',v.footballCorrect.twoozero_g)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd02'] }">
                    <span class="item-left">0:2</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','twoozero_g_change')})">{{formatOdds(v.footballCorrect.twoozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','twoozero_g_change')})">
                      <i :class="oddsChangeTag(index, 'footballCorrect','twoozero_g_change')"></i>
                                {{formatOdds(v.footballCorrect.twoozero_g)}}
                      </span>
                    </span>
                  </span>
                </p>
              </li>
              <li class="correct">
                <p @click="betHelpDialogHandler(v,playType.host,betType.football.bd21,'bd21',v.footballCorrect.twooone_h)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd21'] }">
                    <span class="item-left"> 2:1</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','twooone_h_change')})">{{formatOdds(v.footballCorrect.twooone_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','twooone_h_change')})">
                        <i :class="oddsChangeTag(index, 'footballCorrect','twooone_h_change')"></i>
                                {{formatOdds(v.footballCorrect.twooone_h)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p @click="betHelpDialogHandler(v,1,betType.football.bd22,'bd22',v.footballCorrect.twootwo)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd22'] }">
                    <span class="item-left">2:2</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','twootwo_change')})">{{formatOdds(v.footballCorrect.twootwo)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','twootwo_change')})">
                      <i :class="oddsChangeTag(index, 'footballCorrect','twootwo_change')"></i>
                                {{formatOdds(v.footballCorrect.twootwo)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p @click="betHelpDialogHandler(v,!playType.host,betType.football.bd21,'bd12',v.footballCorrect.twooone_g)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd12'] }">
                    <span class="item-left">1:2</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','twooone_g_change')})">{{formatOdds(v.footballCorrect.twooone_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','twooone_g_change')})">
                      <i :class="oddsChangeTag(index, 'footballCorrect','twooone_g_change')"></i>
                                {{formatOdds(v.footballCorrect.twooone_g)}}
                      </span>
                    </span>
                  </span>
                </p>
              </li>
              <li class="correct">
                <p @click="betHelpDialogHandler(v,playType.host,betType.football.bd30,'bd30',v.footballCorrect.threeozero_h)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd30'] }">
                    <span class="item-left">3:0</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','threeozero_h_change')})">{{formatOdds(v.footballCorrect.threeozero_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','threeozero_h_change')})">
                        <i :class="oddsChangeTag(index, 'footballCorrect','threeozero_h_change')"></i>
                                {{formatOdds(v.footballCorrect.threeozero_h)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p @click="betHelpDialogHandler(v,1,betType.football.bd33,'bd33',v.footballCorrect.threeothree)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd33'] }">
                    <span class="item-left">3:3</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','threeothree_change')})">{{formatOdds(v.footballCorrect.threeothree)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','threeothree_change')})">
                      <i :class="oddsChangeTag(index, 'footballCorrect','threeothree_change')"></i>
                                {{formatOdds(v.footballCorrect.threeothree)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p @click="betHelpDialogHandler(v,!playType.host,betType.football.bd30,'bd03',v.footballCorrect.threeozero_g)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd03'] }">
                    <span class="item-left">0:3</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','threeozero_g_change')})">{{formatOdds(v.footballCorrect.threeozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','threeozero_g_change')})">
                      <i :class="oddsChangeTag(index, 'footballCorrect','threeozero_g_change')"></i>
                                {{formatOdds(v.footballCorrect.threeozero_g)}}
                      </span>
                    </span>
                  </span>
                </p>
              </li>
              <li class="correct">
                <p @click="betHelpDialogHandler(v,playType.host,betType.football.bd31,'bd31',v.footballCorrect.threeoone_h)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd31'] }">
                    <span class="item-left">3:1</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','threeoone_h_change')})">{{formatOdds(v.footballCorrect.threeoone_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','threeoone_h_change')})">
                        <i :class="oddsChangeTag(index, 'footballCorrect','threeoone_h_change')"></i>
                                {{formatOdds(v.footballCorrect.threeoone_h)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p @click="betHelpDialogHandler(v,1,betType.football.bd44,'bd44',v.footballCorrect.fourofour)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd44'] }">
                    <span class="item-left">4:4</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fourofour_change')})">{{formatOdds(v.footballCorrect.fourofour)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fourofour_change')})">
                      <i :class="oddsChangeTag(index, 'footballCorrect','fourofour_change')"></i>
                                {{formatOdds(v.footballCorrect.fourofour)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p @click="betHelpDialogHandler(v,!playType.host,betType.football.bd31,'bd13',v.footballCorrect.threeoone_g)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd13'] }">
                    <span class="item-left">1:3</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','threeoone_g_change')})">{{formatOdds(v.footballCorrect.threeoone_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','threeoone_g_change')})">
                      <i :class="oddsChangeTag(index, 'footballCorrect','threeoone_g_change')"></i>
                                {{formatOdds(v.footballCorrect.threeoone_g)}}
                      </span>
                    </span>
                  </span>
                </p>
              </li>
              <li class="correct">
                <p  @click="betHelpDialogHandler(v,playType.host,betType.football.bd32,'bd32',v.footballCorrect.threeotwo_h)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd32'] }">
                    <span class="item-left">3:2</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','threeotwo_h_change')})">{{formatOdds(v.footballCorrect.threeotwo_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','threeotwo_h_change')})">
                        <i :class="oddsChangeTag(index, 'footballCorrect','threeotwo_h_change')"></i>
                                {{formatOdds(v.footballCorrect.threeotwo_h)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p></p>
                <p  @click="betHelpDialogHandler(v,!playType.host,betType.football.bd32,'bd23',v.footballCorrect.threeotwo_g)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd23'] }">
                    <span class="item-left">2:3</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','threeotwo_g_change')})">{{formatOdds(v.footballCorrect.threeotwo_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','threeotwo_g_change')})">
                      <i :class="oddsChangeTag(index, 'footballCorrect','threeotwo_g_change')"></i>
                                {{formatOdds(v.footballCorrect.threeotwo_g)}}
                      </span>
                    </span>
                  </span>
                </p>
              </li>
              <li class="correct">
                <p @click="betHelpDialogHandler(v,playType.host,betType.football.bd40,'bd40',v.footballCorrect.fourozero_h)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd40'] }">
                    <span class="item-left">4:0</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fourozero_h_change')})">{{formatOdds(v.footballCorrect.fourozero_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fourozero_h_change')})">
                        <i :class="oddsChangeTag(index, 'footballCorrect','fourozero_h_change')"></i>
                                {{formatOdds(v.footballCorrect.fourozero_h)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p></p>
                <p @click="betHelpDialogHandler(v,!playType.host,betType.football.bd40,'bd04',v.footballCorrect.fourozero_g)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd04'] }">
                    <span class="item-left">0:4</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fourozero_g_change')})">{{formatOdds(v.footballCorrect.fourozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fourozero_g_change')})">
                        <i :class="oddsChangeTag(index, 'footballCorrect','fourozero_g_change')"></i>
                                {{formatOdds(v.footballCorrect.fourozero_g)}}
                      </span>
                    </span>
                  </span>
                </p>
              </li>
              <li class="correct">
                <p  @click="betHelpDialogHandler(v,playType.host,betType.football.bd41,'bd41',v.footballCorrect.fouroone_h)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd41'] }">
                    <span class="item-left">4:1</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fouroone_h_change')})">{{formatOdds(v.footballCorrect.fouroone_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fouroone_h_change')})">
                        <i :class="oddsChangeTag(index, 'footballCorrect','fouroone_h_change')"></i>
                                {{formatOdds(v.footballCorrect.fouroone_h)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p></p>
                <p @click="betHelpDialogHandler(v,!playType.host,betType.football.bd41,'bd14',v.footballCorrect.fouroone_g)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd14'] }" >
                    <span class="item-left">1:4</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fouroone_g_change')})">{{formatOdds(v.footballCorrect.fouroone_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fouroone_g_change')})">
                        <i :class="oddsChangeTag(index, 'footballCorrect','fouroone_g_change')"></i>
                                {{formatOdds(v.footballCorrect.fouroone_g)}}
                      </span>
                    </span>
                  </span>
                </p>
              </li>
              <li class="correct">
                <p  @click="betHelpDialogHandler(v,playType.host,betType.football.bd42,'bd42',v.footballCorrect.fourotwo_h)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd42'] }">
                    <span class="item-left">4:2</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fourotwo_h_change')})">{{formatOdds(v.footballCorrect.fourotwo_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fourotwo_h_change')})">
                        <i :class="oddsChangeTag(index, 'footballCorrect','fourotwo_h_change')"></i>
                                {{formatOdds(v.footballCorrect.fourotwo_h)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p></p>
                <p  @click="betHelpDialogHandler(v,!playType.host,betType.football.bd42,'bd24',v.footballCorrect.fourotwo_g)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd24'] }">
                    <span class="item-left">2:4</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fourotwo_g_change')})">{{formatOdds(v.footballCorrect.fourotwo_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fourotwo_g_change')})">
                        <i :class="oddsChangeTag(index, 'footballCorrect','fourotwo_g_change')"></i>
                                {{formatOdds(v.footballCorrect.fourotwo_g)}}
                      </span>
                    </span>
                  </span>
                </p>
              </li>
              <li class="correct">
                <p  @click="betHelpDialogHandler(v,playType.host,betType.football.bd43,'bd43',v.footballCorrect.fourothree_h)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd43'] }">
                    <span class="item-left">4:3</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fourothree_h_change')})">{{formatOdds(v.footballCorrect.fourothree_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fourothree_h_change')})">
                        <i :class="oddsChangeTag(index, 'footballCorrect','fourothree_h_change')"></i>
                                {{formatOdds(v.footballCorrect.fourothree_h)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p></p>
                <p  @click="betHelpDialogHandler(v,!playType.host,betType.football.bd43,'bd34',v.footballCorrect.fourothree_g)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bd34'] }">
                    <span class="item-left">3:4</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fourothree_g_change')})">{{formatOdds(v.footballCorrect.fourothree_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','fourothree_g_change')})">
                        <i :class="oddsChangeTag(index, 'footballCorrect','fourothree_g_change')"></i>
                                {{formatOdds(v.footballCorrect.fourothree_g)}}
                      </span>
                    </span>
                  </span>
                </p>
              </li>
              <li class="correct" style="height: 60px;border-bottom: 1px solid #EBEBEB">
                <p  @click="betHelpDialogHandler(v,1,betType.football.bdqt,'bdother',v.footballCorrect.hOther)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bdother'] }">
                    <span class="item-left">其他</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','hOther_change')})">{{formatOdds(v.footballCorrect.hOther)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballCorrect','hOther_change')})">
                        <i :class="oddsChangeTag(index, 'footballCorrect','hOther_change')"></i>
                                {{formatOdds(v.footballCorrect.hOther)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p></p>
                <p></p>
              </li>
            </ul>
          </div>

          <!--上半-波胆-->
          <cell v-if="playType.BallPlayIsShow.isbcbd && chargeMainAndImpr(betType.football.bcbd)" title="上半-波胆" is-link :border-intent="false"
                :arrow-direction="show.showContent008 ? 'up' : 'down'"
                @click.native="show.showContent008 = !show.showContent008"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'sbbd'" class="slide slide-1" :class="show.showContent008?'animate':''">
            <ul class="correct-box" v-if="v.footballHalfCorrect && chargeMainAndImpr(betType.football.bcbd)">

              <li class="correct">
                <p  @click="betHelpDialogHandler(v,playType.host,betType.football.bcbd10,'bcbd10',v.footballHalfCorrect.oneozero_h)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bcbd10'] }">
                    <span class="item-left">1:0</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','oneozero_h_change')})">{{formatOdds(v.footballHalfCorrect.oneozero_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','oneozero_h_change')})">
                        <i :class="oddsChangeTag(index, 'footballHalfCorrect','oneozero_h_change')"></i>
                                {{formatOdds(v.footballHalfCorrect.oneozero_h)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p @click="betHelpDialogHandler(v,1,betType.football.bcbd00,'bcbd00',v.footballHalfCorrect.zeroozero)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bcbd00'] }">
                    <span class="item-left">0:0</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','zeroozero_change')})">{{formatOdds(v.footballHalfCorrect.zeroozero)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','zeroozero_change')})">
                        <i :class="oddsChangeTag(index, 'footballHalfCorrect','zeroozero_change')"></i>
                                {{formatOdds(v.footballHalfCorrect.zeroozero)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p  @click="betHelpDialogHandler(v,!playType.host,betType.football.bcbd10,'bcbd01',v.footballHalfCorrect.oneozero_g)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bcbd01'] }">
                    <span class="item-left">0:1</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','oneozero_g_change')})">{{formatOdds(v.footballHalfCorrect.oneozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','oneozero_g_change')})">
                        <i :class="oddsChangeTag(index, 'footballHalfCorrect','oneozero_g_change')"></i>
                                {{formatOdds(v.footballHalfCorrect.oneozero_g)}}
                      </span>
                    </span>
                  </span>
                </p>
              </li>
              <li class="correct">
                <p  @click="betHelpDialogHandler(v,playType.host,betType.football.bcbd20,'bcbd20',v.footballHalfCorrect.twoozero_h)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bcbd20'] }">
                    <span class="item-left">2:0</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','twoozero_h_change')})">{{formatOdds(v.footballHalfCorrect.twoozero_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','twoozero_h_change')})">
                        <i :class="oddsChangeTag(index, 'footballHalfCorrect','twoozero_h_change')"></i>
                                {{formatOdds(v.footballHalfCorrect.twoozero_h)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p @click="betHelpDialogHandler(v,1,betType.football.bcbd11,'bcbd11',v.footballHalfCorrect.oneoone)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bcbd11'] }">
                    <span class="item-left">1:1</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','oneoone_change')})">{{formatOdds(v.footballHalfCorrect.oneoone)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','oneoone_change')})">
                        <i :class="oddsChangeTag(index, 'footballHalfCorrect','oneoone_change')"></i>
                                {{formatOdds(v.footballHalfCorrect.oneoone)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p  @click="betHelpDialogHandler(v,!playType.host,betType.football.bcbd20,'bcbd02',v.footballHalfCorrect.twoozero_g)">
                  <span class="correct-item"  :class="{ggSelect: v['ggSelect' + v.id+'bcbd02'] }">
                    <span class="item-left">0:2</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','twoozero_g_change')})">{{formatOdds(v.footballHalfCorrect.twoozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','twoozero_g_change')})">
                        <i :class="oddsChangeTag(index, 'footballHalfCorrect','twoozero_g_change')"></i>
                                {{formatOdds(v.footballHalfCorrect.twoozero_g)}}
                      </span>
                    </span>
                  </span>
                </p>
              </li>
              <li class="correct">
                <p  @click="betHelpDialogHandler(v,playType.host,betType.football.bcbd21,'bcbd21',v.footballHalfCorrect.twooone_h)">
                  <span class="correct-item"  :class="{ggSelect: v['ggSelect' + v.id+'bcbd21'] }">
                    <span class="item-left">2:1</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','twooone_h_change')})">{{formatOdds(v.footballHalfCorrect.twooone_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','twooone_h_change')})">
                        <i :class="oddsChangeTag(index, 'footballHalfCorrect','twooone_h_change')"></i>
                                {{formatOdds(v.footballHalfCorrect.twooone_h)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p  @click="betHelpDialogHandler(v,1,betType.football.bcbd22,'bcbd22',v.footballHalfCorrect.twootwo)">
                  <span class="correct-item"  :class="{ggSelect: v['ggSelect' + v.id+'bcbd22'] }">
                    <span class="item-left">2:2</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','twootwo_change')})">{{formatOdds(v.footballHalfCorrect.twootwo)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','twootwo_change')})">
                        <i :class="oddsChangeTag(index, 'footballHalfCorrect','twootwo_change')"></i>
                                {{formatOdds(v.footballHalfCorrect.twootwo)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p @click="betHelpDialogHandler(v,!playType.host,betType.football.bcbd21,'bcbd12',v.footballHalfCorrect.twooone_g)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bcbd12'] }">
                    <span class="item-left">1:2</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','twooone_g_change')})">{{formatOdds(v.footballHalfCorrect.twooone_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','twooone_g_change')})">
                        <i :class="oddsChangeTag(index, 'footballHalfCorrect','twooone_g_change')"></i>
                                {{formatOdds(v.footballHalfCorrect.twooone_g)}}
                      </span>
                    </span>
                  </span>
                </p>
              </li>
              <li class="correct">
                <p @click="betHelpDialogHandler(v,playType.host,betType.football.bcbd30,'bcbd30',v.footballHalfCorrect.threeozero_h)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bcbd30'] }" >
                    <span class="item-left">3:0</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','threeozero_h_change')})">{{formatOdds(v.footballHalfCorrect.threeozero_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','threeozero_h_change')})">
                        <i :class="oddsChangeTag(index, 'footballHalfCorrect','threeozero_h_change')"></i>
                                {{formatOdds(v.footballHalfCorrect.threeozero_h)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p  @click="betHelpDialogHandler(v,1,betType.football.bcbd33,'bcbd33',v.footballHalfCorrect.threeothree)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bcbd33'] }">
                    <span class="item-left">3:3</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','threeothree_change')})">{{formatOdds(v.footballHalfCorrect.threeothree)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','threeothree_change')})">
                        <i :class="oddsChangeTag(index, 'footballHalfCorrect','threeothree_change')"></i>
                                {{formatOdds(v.footballHalfCorrect.threeothree)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p  @click="betHelpDialogHandler(v,!playType.host,betType.football.bcbd30,'bcbd03',v.footballHalfCorrect.threeozero_g)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bcbd03'] }" >
                    <span class="item-left">0:3</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','threeozero_g_change')})">{{formatOdds(v.footballHalfCorrect.threeozero_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','threeozero_g_change')})">
                        <i :class="oddsChangeTag(index, 'footballHalfCorrect','threeozero_g_change')"></i>
                                {{formatOdds(v.footballHalfCorrect.threeozero_g)}}
                      </span>
                    </span>
                  </span>
                </p>
              </li>
              <li class="correct">
                <p @click="betHelpDialogHandler(v,playType.host,betType.football.bcbd31,'bcbd31',v.footballHalfCorrect.threeoone_h)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bcbd31'] }">
                    <span class="item-left">3:1</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','threeoone_h_change')})">{{formatOdds(v.footballHalfCorrect.threeoone_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','threeoone_h_change')})">
                        <i :class="oddsChangeTag(index, 'footballHalfCorrect','threeoone_h_change')"></i>
                                {{formatOdds(v.footballHalfCorrect.threeoone_h)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p></p>
                <p  @click="betHelpDialogHandler(v,!playType.host,betType.football.bcbd31,'bcbd13',v.footballHalfCorrect.threeoone_g)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bcbd13'] }">
                    <span class="item-left">1:3</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','threeoone_g_change')})">{{formatOdds(v.footballHalfCorrect.threeoone_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','threeoone_g_change')})">
                        <i :class="oddsChangeTag(index, 'footballHalfCorrect','threeoone_g_change')"></i>
                                {{formatOdds(v.footballHalfCorrect.threeoone_g)}}
                      </span>
                    </span>
                  </span>
                </p>
              </li>
              <li class="correct">
                <p @click="betHelpDialogHandler(v,playType.host,betType.football.bcbd32,'bcbd32',v.footballHalfCorrect.threeotwo_h)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bcbd32'] }" >
                    <span class="item-left">3:2</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','threeotwo_h_change')})">{{formatOdds(v.footballHalfCorrect.threeotwo_h)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','threeotwo_h_change')})">
                        <i :class="oddsChangeTag(index, 'footballHalfCorrect','threeotwo_h_change')"></i>
                                {{formatOdds(v.footballHalfCorrect.threeotwo_h)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p></p>
                <p  @click="betHelpDialogHandler(v,!playType.host,betType.football.bcbd32,'bcbd23',v.footballHalfCorrect.threeotwo_g)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bcbd23'] }">
                    <span class="item-left">2:3</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','threeotwo_g_change')})">{{formatOdds(v.footballHalfCorrect.threeotwo_g)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','threeotwo_g_change')})">
                        <i :class="oddsChangeTag(index, 'footballHalfCorrect','threeotwo_g_change')"></i>
                                {{formatOdds(v.footballHalfCorrect.threeotwo_g)}}
                      </span>
                    </span>
                  </span>
                </p>
              </li>
              <li class="correct" style="height: 60px;border-bottom: 1px solid #EBEBEB">
                <p  @click="betHelpDialogHandler(v,1,betType.football.bcbdqt,'bcbdother',v.footballHalfCorrect.hOther)">
                  <span class="correct-item" :class="{ggSelect: v['ggSelect' + v.id+'bcbdother'] }">
                    <span class="item-left">其他</span>
                    <span class="item-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','hOther_change')})">{{formatOdds(v.footballHalfCorrect.hOther)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','hOther_change')})">
                        <i :class="oddsChangeTag(index, 'footballHalfCorrect','hOther_change')"></i>
                                {{formatOdds(v.footballHalfCorrect.hOther)}}
                      </span>
                    </span>
                  </span>
                </p>
                <p></p>
                <p></p>
              </li >
            </ul>
          </div>

          <!--总进球-->
          <cell v-if="playType.BallPlayIsShow.iszjq && chargeMainAndImpr(betType.football.zjqs)" title="总进球" is-link :border-intent="false"
                :arrow-direction="show.showContent010 ? 'up' : 'down'"
                @click.native="show.showContent010 = !show.showContent010"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'zjq'" class="slide slide-1" :class="show.showContent010?'animate':''">
            <ul class="concede-points-box" v-if="v.footballGoals  && chargeMainAndImpr(betType.football.zjqs)">
              <li class="concede-points" @click="betHelpDialogHandler(v,1,betType.football.zjqs01,'zjq01',v.footballGoals.zerotoone)">
                <p >0-1</p>
                <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'zjq01'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballGoals','zerotoone_change')})">{{formatOdds(v.footballGoals.zerotoone)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballGoals','zerotoone_change')})">
                    <i :class="oddsChangeTag(index, 'footballGoals','zerotoone_change')"></i>
                            {{formatOdds(v.footballGoals.zerotoone)}}
                  </span>
                </p>
              </li>
              <li class="concede-points" @click="betHelpDialogHandler(v,1,betType.football.zjqs23,'zjq23',v.footballGoals.twotothree)">
                <p  >2-3</p>
                <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'zjq23'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballGoals','twotothree_change')})">{{formatOdds(v.footballGoals.twotothree)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballGoals','twotothree_change')})">
                  <i :class="oddsChangeTag(index, 'footballGoals','twotothree_change')"></i>
                            {{formatOdds(v.footballGoals.twotothree)}}
                  </span>
                </p>
              </li>
              <li class="concede-points" @click="betHelpDialogHandler(v,1,betType.football.zjqs46,'zjq46',v.footballGoals.fourtosix)">
                <p  >4-6</p>
                <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'zjq46'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballGoals','fourtosix_change')})">{{formatOdds(v.footballGoals.fourtosix)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballGoals','fourtosix_change')})">
                    <i :class="oddsChangeTag(index, 'footballGoals','fourtosix_change')"></i>
                            {{formatOdds(v.footballGoals.fourtosix)}}
                  </span>
                </p>
              </li>
              <li class="concede-points" @click="betHelpDialogHandler(v,1,betType.football.zjqs7,'zjq7up',v.footballGoals.sevenup)">
                <p  >7或以上</p>
                <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'zjq7up'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballGoals','sevenup_change')})">{{formatOdds(v.footballGoals.sevenup)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballGoals','sevenup_change')})">
                    <i :class="oddsChangeTag(index, 'footballGoals','sevenup_change')"></i>
                            {{formatOdds(v.footballGoals.sevenup)}}
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <!--半场/全场-->
          <cell v-if="playType.BallPlayIsShow.isbqc && chargeMainAndImpr(betType.football.bqc)" title="半场/全场" is-link :border-intent="false"
                :arrow-direction="show.showContent011 ? 'up' : 'down'"
                @click.native="show.showContent011 = !show.showContent011"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'bqc'" class="slide slide-1" :class="show.showContent011?'animate':''">
            <ul class="concede-points-box" v-if="v.footballHta && chargeMainAndImpr(betType.football.bqc)">
              <li class="concede-points" @click="betHelpDialogHandler(v,1,betType.football.bqczz,'bcqzz',v.footballHta.hh)">
                <p  >主/主</p>
                <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'bcqzz'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHta','hh_change')})">{{formatOdds(v.footballHta.hh)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHta','hh_change')})">
                    <i :class="oddsChangeTag(index, 'footballHta','hh_change')"></i>
                            {{formatOdds(v.footballHta.hh)}}
                  </span>
                </p>
              </li>
              <li class="concede-points" @click="betHelpDialogHandler(v,1,betType.football.bqczh,'bcqzh',v.footballHta.hd)">
                <p  >主/和</p>
                <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'bcqzh'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHta','hd_change')})">{{formatOdds(v.footballHta.hd)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHta','hd_change')})">
                    <i :class="oddsChangeTag(index, 'footballHta','hd_change')"></i>
                            {{formatOdds(v.footballHta.hd)}}
                  </span>
                </p>
              </li>
              <li class="concede-points" @click="betHelpDialogHandler(v,1,betType.football.bqczk,'bcqzk',v.footballHta.hg)">
                <p  >主/客</p>
                <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'bcqzk'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHta','hg_change')})">{{formatOdds(v.footballHta.hg)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHta','hg_change')})">
                    <i :class="oddsChangeTag(index, 'footballHta','hg_change')"></i>
                            {{formatOdds(v.footballHta.hg)}}
                  </span>
                </p>
              </li>
              <li class="concede-points" @click="betHelpDialogHandler(v,1,betType.football.bqchz,'bcqhz',v.footballHta.dh)">
                <p  >和/主</p>
                <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'bcqhz'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHta','dh_change')})">{{formatOdds(v.footballHta.dh)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHta','dh_change')})">
                    <i :class="oddsChangeTag(index, 'footballHta','dh_change')"></i>
                            {{formatOdds(v.footballHta.dh)}}
                  </span>
                </p>
              </li>
              <li class="concede-points" @click="betHelpDialogHandler(v,1,betType.football.bqchh,'bcqhh',v.footballHta.dd)">
                <p  >和/和</p>
                <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'bcqhh'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHta','dd_change')})">{{formatOdds(v.footballHta.dd)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHta','dd_change')})">
                    <i :class="oddsChangeTag(index, 'footballHta','dd_change')"></i>
                            {{formatOdds(v.footballHta.dd)}}
                  </span>
                </p>
              </li>
              <li class="concede-points"  @click="betHelpDialogHandler(v,1,betType.football.bqchk,'bcqhk',v.footballHta.dg)">
                <p >和/客</p>
                <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'bcqhk'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','dg_change')})">{{formatOdds(v.footballHta.dg)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHalfCorrect','dg_change')})">
                    <i :class="oddsChangeTag(index, 'footballHta','dg_change')"></i>
                            {{formatOdds(v.footballHta.dg)}}
                  </span>
                </p>
              </li>
              <li class="concede-points" @click="betHelpDialogHandler(v,1,betType.football.bqckz,'bcqkz',v.footballHta.gh)">
                <p  >客/主</p>
                <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'bcqkz'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHta','gh_change')})">{{formatOdds(v.footballHta.gh)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHta','gh_change')})">
                  <i :class="oddsChangeTag(index, 'footballHta','gh_change')"></i>
                            {{formatOdds(v.footballHta.gh)}}
                  </span>
                </p>
              </li>
              <li  class="concede-points" @click="betHelpDialogHandler(v,1,betType.football.bqckh,'bcqkh',v.footballHta.gd)">
                <p  >客/和</p>
                <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'bcqkh'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHta','gd_change')})">{{formatOdds(v.footballHta.gd)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHta','gd_change')})">
                    <i :class="oddsChangeTag(index, 'footballHta','gd_change')"></i>
                            {{formatOdds(v.footballHta.gd)}}
                  </span>
                </p>
              </li>
              <li class="concede-points" @click="betHelpDialogHandler(v,1,betType.football.bqckk,'bcqkk',v.footballHta.gg)">
                <p  >客/客</p>
                <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'bcqkk'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHta','gg_change')})">{{formatOdds(v.footballHta.gg)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, 'footballHta','gg_change')})">
                    <i :class="oddsChangeTag(index, 'footballHta','gg_change')"></i>
                            {{formatOdds(v.footballHta.gg)}}
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div class="is_playMaintenance" v-if="BallData.length == 0 ||((!playType.BallPlayIsShow.isbqc || !chargeMainAndImpr(betType.football.bqc)) && (!playType.BallPlayIsShow.iszjq || !chargeMainAndImpr(betType.football.zjqs))
      && (!playType.BallPlayIsShow.isbd || !chargeMainAndImpr(betType.football.bd)) && (!playType.BallPlayIsShow.isbcbd || !chargeMainAndImpr(betType.football.bcbd)) && (!playType.BallPlayIsShow.isbcdy || !chargeMainAndImpr(playType.bcdy))
      && (!playType.BallPlayIsShow.isdy || !chargeMainAndImpr(playType.dy)) && (!playType.BallPlayIsShow.isds || !chargeMainAndImpr(playType.ds)) && (!playType.BallPlayIsShow.isbcdx || !chargeMainAndImpr(playType.bcdx))
      && (!playType.BallPlayIsShow.isqcdx || !chargeMainAndImpr(playType.qcdx)) && (!playType.BallPlayIsShow.isbcrq || !chargeMainAndImpr(playType.bcrq)) && (!playType.BallPlayIsShow.isqcrq || !chargeMainAndImpr(playType.qcrq)))" >
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
export default {
  components: {
    Prompt,
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
    gavePrompt: function (val) {
      this.promptInfo = val
    },
    showUp: function () {
      this.promptInfo = !this.promptInfo
    },
    onResultChange1 (val) {
     // Show.onResultChange1(val, this)
    },
    betHelpDialogHandler (data, host, type, clickWho,curOdds) {
      showBet.betDialogHandler(data, host, type, clickWho,curOdds);
    },
    formatOdds (data) {
      return Util.formatOdds(data)
    },
    timeFn () {
      if (this.timeObj) {
     //   Show.BallTitleBind(this.timeObj, this)
      }
    },
    toBetList () {
      store.state.is_mix_showModal = true;
      store.state.is_showModal = false;
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
    getMonthAndDay(time)
    {
      return Util.getMonthAndDay(Util.formatDate.UnixToDate(time, -12, 'YMDhm'));
    },
    getHours(time){
      return Util.getNewHours(Util.formatDate.UnixToDate(time, -12, 'YMDhm'));
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
  //  Show.mounted(this)
  },
  created () {
  //  Show.created(this)
    this.$nextTick(() => {
      if (Util.isNotEmpty(this.$refs.wrapper)) {
        this.scroll = new BScroll(this.$refs.wrapper, {click: true})
      }
    })
  },
  computed:{
    BallData() {
      let code = store.state.morePlayData.code;
      store.commit('showLoading',false);
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
    /** 综合过关样式 */
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
    /** 综合过关样式 */
    checkedMatches: {
      get: function () {
        return store.state.checkedMatches;
      }
    },
    maintenancePlay:{//玩法维护
      get: function () {
        return store.state.chargeMixOrChampion.TYZQ["2"];
      },
      set: function (newValue) {
      }
    },
    imprisonPlay:{ //玩法禁用
      get: function () {
        return store.state.chargeMixOrChampion.TYZQ["3"];
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
  //  Show.destroyed(this)
  }
}
</script>


