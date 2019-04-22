<template>
  <div class="show-page" v-if=" BallData.length > 0">
    <!--<my-header ref="myHeader" @pfn="timeFn"></my-header>-->
    <secondary-head :title="BallData[0].leagueName"></secondary-head>
    <h1 style="display: none">棒球<span> <!--/ {{ BallTitleData.leagueName }}--></span>
      <!--<Timer :dataType="dateType" @pfn="timeFn"></Timer>-->
    </h1>
    <div class="score-box">
      <div class="cont baseball-live baseball active" >  <!--v-if="reqparam.dateType == '1' && BallData.length > 0"-->
        <div class="bg">
          <p class="top">
            <span class="left"></span>
            <span class="right">
                 <!-- <span>局</span>-->
                  <span>分</span>
                </span>
          </p>
          <div class="team">
            <!--<p>{{ BallData[0].hteam }}</p>-->
            <!--<span class="mid">{{ BallData[0].hscore }} - {{ BallData[0].gscore }}</span>-->
            <!--<p>{{ BallData[0].gteam }}</p>-->
            <div class="left">
              <div class="baseball-info">
                <span class="circle active"></span>
                <span class="names">{{BallData[0].hteam}}</span>
              </div>
              <div class="baseball-info">
                <span class="circle"></span>
                <span class="names">{{ BallData[0].gteam }}</span>
              </div>
            </div>
            <div class="right">
              <!--<div>
                <p class="bureau">1</p>
                <p class="bureau">1</p>
              </div>-->
              <div>
                <p class="point">{{BallData[0].hscore!=undefined ? BallData[0].hscore:'-'}}</p>
                <p class="point">{{BallData[0].gscore!=undefined ? BallData[0].gscore:'-'}}</p>
              </div>
            </div>
          </div>
          <!--<div class="botm">
            <p>
              <span>10-11</span>
              <span>10-11</span>
            </p>
            <p>
              <span>分:</span>
              <span class="different">56-66(122)</span>
            </p>
          </div>-->
        </div>
      </div>
      <!--<div class="cont matchesMore-box baseball active" v-else>-->
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
        <!--<h1 style="display: none">棒球<span> &lt;!&ndash;/ {{ BallTitleData.leagueName }}&ndash;&gt;</span>-->
          <!--&lt;!&ndash;<Timer :dataType="dateType" @pfn="timeFn"></Timer>&ndash;&gt;-->
        <!--</h1>-->
        <!--<div class="score-box">-->
          <!--<div class="cont baseball-live baseball active" v-if=" BallData.length > 0">  &lt;!&ndash;v-if="reqparam.dateType == '1' && BallData.length > 0"&ndash;&gt;-->
            <!--<div class="bg">-->
              <!--<p class="top">-->
                <!--<span class="left">第三盘</span>-->
                <!--<span class="right">-->
                  <!--<span>局</span>-->
                  <!--<span>分</span>-->
                <!--</span>-->
              <!--</p>-->
              <!--<div class="team">-->
                <!--&lt;!&ndash;<p>{{ BallData[0].hteam }}</p>&ndash;&gt;-->
                <!--&lt;!&ndash;<span class="mid">{{ BallData[0].hscore }} - {{ BallData[0].gscore }}</span>&ndash;&gt;-->
                <!--&lt;!&ndash;<p>{{ BallData[0].gteam }}</p>&ndash;&gt;-->
                <!--<div class="left">-->
                  <!--<p ><span class="circle active"></span><span class="names">{{BallData[0].hteam}}</span></p>-->
                  <!--<p ><span class="circle"></span><span class="names">{{ BallData[0].gteam }}</span></p>-->
                <!--</div>-->
                <!--<div class="right">-->
                  <!--<div>-->
                    <!--<p class="bureau">1</p>-->
                    <!--<p class="bureau">1</p>-->
                  <!--</div>-->
                  <!--<div>-->
                    <!--<p class="point">8</p>-->
                    <!--<p class="point">1</p>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="botm">-->
                <!--<p>-->
                  <!--<span>10-11</span>-->
                  <!--<span>10-11</span>-->
                <!--</p>-->
                <!--<p>-->
                  <!--<span>分:</span>-->
                  <!--<span class="different">56-66(122)</span>-->
                <!--</p>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--&lt;!&ndash;<div class="cont matchesMore-box baseball active" v-else>&ndash;&gt;-->
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
          <!--独赢-->
          <cell v-if="playType.BallPlayIsShow.isdy && chargeMainAndImpr(playType.dy)" title="独赢" is-link :border-intent="false"  :arrow-direction="show.showContent006 ? 'up' : 'down'" @click.native="show.showContent006 = !show.showContent006"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'dy'" class="slide slide-1" :class="show.showContent006?'animate':''">
            <ul class="concede-points-box" v-if="v.dIorMH && v.dIorMC && chargeMainAndImpr(playType.dy)">
              <li class="concede-points"  @click="betHelpDialogHandler(v,playType.host,playType.dy,'dyz',v.dIorMH)">
                <p >{{ v.hteam }}</p>
                <p class="right-border" :class="{ggSelect:isMix == 1 &&  checkedMatches[v.onlykey + v.matchesDetailId + playType.dy + '0'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','dIorMH_change')})">{{formatOdds(v.dIorMH)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, '','dIorMH_change')})">
                    <i :class="oddsChangeTag(index, '','dIorMH_change')"></i>
                            {{formatOdds(v.dIorMH)}}
                  </span>
                </p>
              </li>
              <li  class="concede-points"  @click="betHelpDialogHandler(v,!playType.host,playType.dy,'dyk',v.dIorMC)">
                <p >{{ v.gteam }}</p>
                <p class="right-border" :class="{ggSelect:isMix == 1 &&  checkedMatches[v.onlykey + v.matchesDetailId + playType.dy + '1'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','dIorMC_change')})">{{formatOdds(v.dIorMC)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, '','dIorMC_change')})">
                    <i :class="oddsChangeTag(index, '','dIorMC_change')"></i>
                            {{formatOdds(v.dIorMC)}}
                  </span>
                </p>
              </li>
              <!--              <li class="concede-points"  v-if="v.dIorMN" @click="betHelpDialogHandler(v,1,playType.dy,'dyh',v.dIorMN)">
                              <p >和局</p>
                              <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'dyh'] }">
                                <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','dIorMN_change')})">{{formatOdds(v.dIorMN)}}</span>
                                <span v-if="oddsSelect() === 'oddsCss2'" class="Odds">
                                  <i :class="oddsChangeClass(index, '','dIorMN_change')"></i>
                                          {{formatOdds(v.dIorMN)}}
                                </span>
                              </p>
                            </li>-->
            </ul>
          </div>

          <!--让球-->
          <cell v-if="playType.BallPlayIsShow.isqcrq &&  chargeMainAndImpr(playType.qcrq)" title="让球" is-link :border-intent="false"  :arrow-direction="show.showContent001 ? 'up' : 'down'" @click.native="show.showContent001 = !show.showContent001"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'rq'" class="slide slide-1" :class="show.showContent001?'animate':''">
            <ul class="concede-points-box" v-if="v.dIorRH && v.dIorRC && chargeMainAndImpr(playType.qcrq)">
              <li class="concede-points" @click="betHelpDialogHandler(v,playType.host,playType.qcrq,'zr',v.dIorRH)" >
                <p >{{ v.hteam }}</p>
                <p class="right-border" :class="{ggSelect: isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.qcrq + (v.dStrong === 'H' ? '0' : '2')]}">
                  <span class="dataMargin" v-if="v.dStrong == 'H'">{{concedeTagH(v.dStrong,v.dIorRH)}}{{v.dRatio}}</span>
                  <span v-if="oddsSelect() === 'oddsCss1'" :class="v.dIorRH <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','dIorRH_change')})">{{formatOdds(v.dIorRH)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" :class="v.dIorRH <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','dIorRH_change')})">
                    <i :class="oddsChangeTag(index, '','dIorRH_change')"></i>
                              {{formatOdds(v.dIorRH)}}
                  </span>
                </p>
              </li>
              <li class="concede-points"  @click="betHelpDialogHandler(v,!playType.host,playType.qcrq,'kr',v.dIorRC)">
                <p >{{ v.gteam }}</p>
                <p class="right-border" :class="{ggSelect: isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.qcrq + (v.dStrong === 'H' ? '1' : '3')] }">
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
          <div v-for="(v,index) in BallData" :key="v.id+'dx'" class="slide slide-1" :class="show.showContent003?'animate':''">
            <ul class="size-top-box" v-if="v.dIorOUH && v.dIorOUC && chargeMainAndImpr(playType.qcdx)">
              <li class="size-top">
                <p class="content" :class="{ggSelect:isMix == 1 &&  checkedMatches[v.onlykey + v.matchesDetailId + playType.qcdx + '0'] }" @click="betHelpDialogHandler(v,playType.host,playType.qcdx,'dxz',v.dIorOUH)">
                  <span class="content-left"><span>大</span><span>{{v.dRatioO}}</span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" :class="v.dIorOUH <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','dIorOUH_change')})">{{formatOdds(v.dIorOUH)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" :class="v.dIorOUH <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','dIorOUH_change')})">
                      <i :class="oddsChangeTag(index, '','dIorOUH_change')"></i>
                                {{formatOdds(v.dIorOUH)}}
                    </span>
                  </span>
                </p>
                <p class="content" :class="{ggSelect:isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.qcdx + '1']}" @click="betHelpDialogHandler(v,!playType.host,playType.qcdx,'dxk',v.dIorOUC)">
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
          <div v-for="(v,index) in BallData" :key="v.id+'ds'" class="slide slide-1" :class="show.showContent005?'animate':''">
            <ul class="size-top-box" v-if="v.dIorEOO && v.dIorEOE && chargeMainAndImpr(playType.ds)">
              <li class="size-top">
                <p class="content" :class="{ggSelect: isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.ds + '1'] }" @click="betHelpDialogHandler(v,!playType.host,playType.ds,'dsd',v.dIorEOO)">
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

          <!--让球-首5局-->
          <cell  v-if="playType.BallPlayIsShow.isbcrq &&  chargeMainAndImpr(playType.bcrq) " title="让球-首5局" is-link :border-intent="false"  :arrow-direction="show.showContent002 ? 'up' : 'down'" @click.native="show.showContent002 = !show.showContent002"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'rqsbc'" class="slide slide-1" :class="show.showContent002?'animate':''">
            <ul class="concede-points-box" v-if="v.ior_HRH && v.ior_HRC && chargeMainAndImpr(playType.bcrq)">
              <li class="concede-points"   @click="betHelpDialogHandler(v,playType.host,playType.bcrq,'sbzr',v.ior_HRH)">
                <p >{{ v.hteam }}</p>
                <p class="right-border" :class="{ggSelect: isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.bcrq + (v.hstrong === 'H' ? '0' : '2')] }">
                  <span class="dataMargin"  v-if="v.hstrong == 'H'">{{concedeTagH(v.hstrong,v.ior_HRH)}}{{v.hratio}}</span>
                  <span v-if="oddsSelect() === 'oddsCss1'" :class="v.ior_HRH <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','ior_HRH_change')})">{{formatOdds(v.ior_HRH)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'":class="v.ior_HRH <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','ior_HRH_change')})">
                    <i :class="oddsChangeTag(index, '','ior_HRH_change')"></i>
                            {{formatOdds(v.ior_HRH)}}
                  </span>
                </p>
              </li>
              <li class="concede-points"   @click="betHelpDialogHandler(v,!playType.host,playType.bcrq,'sbkr',v.ior_HRC)">
                <p>{{ v.gteam }}</p>
                <p class="right-border" :class="{ggSelect: isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.bcrq + (v.hstrong === 'H' ? '1' : '3')]}">
                  <span class="dataMargin"  v-if="v.hstrong == 'C'">{{concedeTagC(v.hstrong,v.ior_HRC)}}{{v.hratio}}</span>
                  <span v-if="oddsSelect() === 'oddsCss1'" :class="v.ior_HRC <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','ior_HRC_change')})">{{formatOdds(v.ior_HRC)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" :class="v.ior_HRC <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','ior_HRC_change')})">
                    <i :class="oddsChangeTag(index, '','ior_HRC_change')"></i>
                            {{formatOdds(v.ior_HRC)}}
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <!--大小-首5局-->
          <cell v-if="playType.BallPlayIsShow.isbcdx && chargeMainAndImpr(playType.bcdx)" title="大小-首5局"  is-link  :border-intent="false"  :arrow-direction="show.showContent004 ? 'up' : 'down'" @click.native="show.showContent004 = !show.showContent004"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'dxsbc'" class="slide slide-1" :class="show.showContent004?'animate':''">
            <ul class="size-top-box" v-if="v.ior_HOUH && v.ior_HOUC && chargeMainAndImpr(playType.bcdx)">
              <li class="size-top">
                <p class="content" :class="{ggSelect:isMix == 1 && checkedMatches[v.onlykey + v.matchesDetailId + playType.bcdx + '0']}" @click="betHelpDialogHandler(v,playType.host,playType.bcdx,'dxz',v.ior_HOUH)">
                  <span class="content-left"><span>大</span><span>{{v.hratio_o}}</span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" :class="v.ior_HOUH <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','ior_HOUH_change')})">{{formatOdds(v.ior_HOUH)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" :class="v.ior_HOUH <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','ior_HOUH_change')})">
                      <i :class="oddsChangeTag(index, '','ior_HOUH_change')"></i>
                                {{formatOdds(v.ior_HOUH)}}
                    </span>
                  </span>
                </p>
                <p class="content" :class="{ggSelect:isMix == 1 &&  checkedMatches[v.onlykey + v.matchesDetailId + playType.bcdx + '1']}" @click="betHelpDialogHandler(v,!playType.host,playType.bcdx,'dxk',v.ior_HOUC)">
                  <span class="content-left"><span>小</span><span>{{v.hratio_u}}</span></span>
                  <span class="content-right">
                    <span v-if="oddsSelect() === 'oddsCss1'" :class="v.ior_HOUC <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','ior_HOUC_change')})">{{formatOdds(v.ior_HOUC)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" :class="v.ior_HOUC <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','ior_HOUC_change')})">
                      <i :class="oddsChangeTag(index, '','ior_HOUC_change')"></i>
                                {{formatOdds(v.ior_HOUC)}}
                    </span>
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <!--独赢-首5局-->
          <cell  v-if="playType.BallPlayIsShow.isbcdy && chargeMainAndImpr(playType.zkh)" title="独赢-首5局" is-link :border-intent="false"  :arrow-direction="show.showContent007 ? 'up' : 'down'" @click.native="show.showContent007 = !show.showContent007"></cell>
          <div v-for="(v,index) in BallData" :key="v.id+'dysbc'" class="slide slide-1" :class="show.showContent007?'animate':''">
            <ul class="concede-points-box" v-if="v.ior_HMH && v.ior_HMC && chargeMainAndImpr(playType.zkh)">
              <li class="concede-points"   @click="betHelpDialogHandler(v,playType.host,playType.zkh,'sbdyz',v.ior_HMH)">
                <p>{{ v.hteam }}</p>
                <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'sbdyz'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','ior_HMH_change')})">{{formatOdds(v.ior_HMH)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, '','ior_HMH_change')})">
                    <i :class="oddsChangeTag(index, '','ior_HMH_change')"></i>
                            {{formatOdds(v.ior_HMH)}}
                  </span>
                </p>
              </li>
              <li class="concede-points"   @click="betHelpDialogHandler(v,!playType.host,playType.zkh,'sbdyk',v.ior_HMC)">
                <p>{{ v.gteam }}</p>
                <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'sbdyk'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','ior_HMC_change')})">{{formatOdds(v.ior_HMC)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(index, '','ior_HMC_change')})">
                    <i :class="oddsChangeTag(index, '','ior_HMC_change')"></i>
                            {{formatOdds(v.ior_HMC)}}
                  </span>
                </p>
              </li>
              <li class="concede-points"  v-if="v.ior_HMN" @click="betHelpDialogHandler(v,1,playType.zkh,'sbdyh',v.ior_HMN)">
                <p >和局</p>
                <p class="right-border" :class="{ggSelect: v['ggSelect' + v.id+'sbdyh'] }">
                  <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(index, '','ior_HMN_change')})">{{formatOdds(v.ior_HMN)}}</span>
                  <span v-if="oddsSelect() === 'oddsCss2'" class="Odds"  :style="({color:oddsChangeClass(index, '','ior_HMN_change')})">
                    <i :class="oddsChangeTag(index, '','ior_HMN_change')"></i>
                            {{formatOdds(v.ior_HMN)}}
                  </span>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <!--没有数据显示问题页面-->
        <div class="is_playMaintenance" v-if="BallData.length == 0 || ((!playType.BallPlayIsShow.isbcdx || !chargeMainAndImpr(playType.bcdx)) && (!playType.BallPlayIsShow.isbcrq || !chargeMainAndImpr(playType.bcrq))
        && (!playType.BallPlayIsShow.isbcdy || !chargeMainAndImpr(playType.zkh))  && (!playType.BallPlayIsShow.isds || !chargeMainAndImpr(playType.ds))
        && (!playType.BallPlayIsShow.isqcdx || !chargeMainAndImpr(playType.qcdx)) && (!playType.BallPlayIsShow.isqcrq || !chargeMainAndImpr(playType.qcrq))
        && (!playType.BallPlayIsShow.isdy || !chargeMainAndImpr(playType.dy)))" >
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
    gavePrompt: function (val) {
      this.promptInfo = val
    },
    showUp: function () {
      this.promptInfo = !this.promptInfo
    },
    onResultChange1 (val) {
     /* Show.onResultChange1(val, this)*/
    },
    betHelpDialogHandler (data, host, type, clickWho,curOdds) {
      showBet.betDialogHandler(data, host, type, clickWho,curOdds);
    },
    timeFn () {
      if (this.timeObj) {
       /* Show.BallTitleBind(this.timeObj, this)*/
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
  /*  Show.mounted(this)*/
  },
  created () {
   /* Show.created(this)*/
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
        console.log(store.state.BallPlayIsShow,"store.stateBallPlayIsShow")
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
    maintenancePlay:{ //玩法维护
      get: function () {
        return store.state.chargeMixOrChampion.TYBQ["2"];
      },
      set: function (newValue) {
      }
    },
    imprisonPlay:{ //玩法禁止
      get: function () {
        return store.state.chargeMixOrChampion.TYBQ["3"];
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
 /*   Show.destroyed(this)*/
  }
}
</script>
