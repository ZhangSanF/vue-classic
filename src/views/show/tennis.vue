<template>
  <div class="show-page tennis-show-page">
    <!--<my-header ref="myHeader" @pfn="timeFn"></my-header>-->
   <!-- <secondary-head :title="BallTitleData.leagueName"></secondary-head>-->
    <secondary-head :title="detail.leagueName"></secondary-head>
    <h1 style="display: none">网球<span> <!--/ {{ BallTitleData.leagueName }}--></span>
      <!--<Timer :dataType="dateType" @pfn="timeFn"></Timer>-->
    </h1>
    <div class="score-box">

      <div class="tennis-live tennis" ><!--   v-if="BallData.length > 0"    -->
        <div class="top">
          <span class="left" v-if="dateType=='1'">{{detail.title}}</span>
          <span class="left" v-if="dateType!='1'">{{getMonthAndDayAndHours(detail.title)}}</span>
          <span class="right" >
                  <span>盘</span>
                  <span>局</span>
                  <span>分</span>
                </span>
        </div>
        <div class="team">
          <div class="left">
            <p ><span class="circle" :class="detail.nowServer == '1' ?'active':''"></span><span class="names">{{ detail.hteam}}</span></p>
            <p ><span class="circle" :class="detail.nowServer == '0' ?'active':''"></span><span class="names">{{detail.gteam }}</span></p>
          </div>
          <div class="right" v-if="dateType=='1'">
            <!--盘-->
            <div><p class="bureau p-top">{{detail.scoreGameH }}</p><p class="bureau">{{detail.scoreGameC }}</p></div>
            <!--局-->
            <div><p class="bureau p-top">{{detail.scoreSetH }}</p><p class="bureau">{{detail.scoreSetC }}</p></div>
            <!--分-->
            <div><p class="point p-top">{{detail.hscore == '-1' ? 'A' : detail.hscore }}</p><p class="point">{{detail.gscore == '-1' ? 'A' : detail.gscore }}</p></div>
          </div>
        </div>
      </div>

    </div>

    <label>
   <!--   <input hidden="hidden" :key="WPtitleShow"/>-->
    </label>
    <div class='wrapper' ref='wrapper' :style="{bottom: isMix == '1' && mixCount > 0 ? '64px' : '0'}">
      <div class="content">

        <div class="score-cont zhedie">
          <!--<div  v-if="playType.WPBallData.length > 0">-->
            <!--<div v-for="(vs,index) in playType.WPBallData" :key="index" :class="show.showContent001?'animate':''">-->

              <!--<cell v-if="playType.BallPlayIsShow.isqcrq  && (dateType == '1'? playType.gamePlayObj['3220010'] : playType.gamePlayObj['3210020'])" :title="titleData(vs.hteam,true)" is-link :border-intent="false" :arrow-direction="show.showContent001 ? 'up' : 'down'"  @click.native="show.showContent001 = !show.showContent001"></cell>-->
              <!--<div v-for="v in vs" :key="v.id" class="slide slide-1" :class="show.showContent001?'animate':''">-->
                <!--<ul class="concede-points-box"  v-if="v.dIorRH && v.dIorRC && (dateType == '1'? playType.gamePlayObj['3220010'] : playType.gamePlayObj['3210020'])">-->
                  <!--<li class="concede-points"  @click="betHelpDialogHandler(v,playType.host,playType.rp,'zr',v.dIorRH)">-->
                    <!--<p >{{ v.hteam }}</p>-->
                    <!--<p class="right-border" :class="{ggSelect:  v['ggSelect' + v.id+'zr'] }">-->
                      <!--<span class="dataMargin" v-if="v.dStrong == 'H'">{{ v.dRatio }}</span>-->
                      <!--<span v-if="oddsSelect() === 'oddsCss1'" :class="v.dIorRH <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','dIorRH_change')})">{{formatOdds(v.dIorRH)}}</span>-->
                      <!--<span v-if="oddsSelect() === 'oddsCss2'" :class="v.dIorRH <0 ?'OddsN':'Odds'">-->
                        <!--<i :class="oddsChangeClass(index, '','dIorRH_change')"></i>-->
                          <!--{{formatOdds(v.dIorRH)}}-->
                      <!--</span>-->
                    <!--</p>-->
                  <!--</li>-->
                  <!--<li class="concede-points"  @click="betHelpDialogHandler(v,!playType.host,playType.rp,'kr',v.dIorRC)">-->
                    <!--<p >{{ v.gteam }}</p>-->
                    <!--<p class="right-border" :class="{ggSelect:  v['ggSelect' + v.id+'kr'] }">-->
                      <!--<span class="dataMargin" v-if="v.dStrong == 'C'">{{ v.dRatio }}</span>-->
                      <!--<span v-if="oddsSelect() === 'oddsCss1'" :class="v.dIorRC <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(index, '','dIorRC_change')})">{{formatOdds(v.dIorRC)}}</span>-->
                      <!--<span v-if="oddsSelect() === 'oddsCss2'" :class="v.dIorRC <0 ?'OddsN':'Odds'">-->
                        <!--<i :class="oddsChangeClass(index, '','dIorRC_change')"></i>-->
                          <!--{{formatOdds(v.dIorRC)}}-->
                      <!--</span>-->
                    <!--</p>-->
                  <!--</li>-->
                <!--</ul>-->
              <!--</div>-->

            <!--</div>-->
          <!--</div>-->
          <div v-for="(items, indexs) in BallData" :key="indexs">
            <!--独赢-->

            <cell v-if="items[0].dIorMH && items[0].dIorMC && playType.BallPlayIsShow.isdy && chargeMainAndImpr(playType.dy)" :title="'独赢'+titleData(items[0].hteam)" is-link :border-intent="false" :arrow-direction="show[items[0].id+'dy'] ? 'up' : 'down'"  @click.native="show[items[0].id+'dy'] = !show[items[0].id+'dy']"></cell>
            <template v-for="item in items">
              <div  class="slide slide-1" :class="show[items[0].id+'dy']?'animate':''">
                <ul  class="concede-points-box" v-if="item.dIorMH && item.dIorMC && playType.BallPlayIsShow.isdy && chargeMainAndImpr(playType.dy)">
                  <li class="concede-points"  @click="betHelpDialogHandler(item,playType.host,playType.dy,'dyz',item.dIorMH)">
                    <p class="names">{{ item.hteam }}</p>
                    <p class="right-border" :class="{ggSelect: isMix == 1 && checkedMatches[item.onlykey + item.matchesDetailId + playType.dy + '0']}">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(indexs, '','dIorMH_change')})">{{formatOdds(item.dIorMH)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(indexs, '','dIorMH_change')})">
                      <i :class="oddsChangeTag(indexs, '','dIorMH_change')"></i>
                            {{formatOdds(item.dIorMH)}}
                    </span>
                    </p>
                  </li>
                  <li class="concede-points"  @click="betHelpDialogHandler(item,!playType.host,playType.dy,'dyk',item.dIorMC)">
                    <p class="names">{{ item.gteam }}</p>
                    <p class="right-border" :class="{ggSelect: isMix == 1 && checkedMatches[item.onlykey + item.matchesDetailId + playType.dy + '1']}">
                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(indexs, '','dIorMC_change')})">{{formatOdds(item.dIorMC)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(indexs, '','dIorMC_change')})">
                      <i :class="oddsChangeTag(indexs, '','dIorMC_change')"></i>
                            {{formatOdds(item.dIorMC)}}
                    </span>
                    </p>
                  </li>
                  <!--                <li class="concede-points"  v-if="item.dIorMN" @click="betHelpDialogHandler(item,1,playType.dy,'dyh',item.dIorMN)">
                                    <p >和局</p>
                                    <p class="right-border" :class="{ggSelect: item['ggSelect' + item.id+'dyh'] }">
                                      <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(indexs, '','dIorMN_change')})">{{formatOdds(item.dIorMN)}}</span>
                                      <span v-if="oddsSelect() === 'oddsCss2'" class="Odds">
                                        <i :class="oddsChangeClass(indexs, '','dIorMN_change')"></i>
                                              {{formatOdds(item.dIorMN)}}
                                      </span>
                                    </p>
                                  </li>-->
                </ul>
              </div>
            </template>

            <!--让盘/让局-->

            <cell v-if="items[0].dIorRH && items[0].dIorRC && playType.BallPlayIsShow.isqcrq && chargeMainAndImpr(playType.rp)"
                  :title="titleData(items[0].hteam,true)" is-link :border-intent="false" :arrow-direction="show[items[0].id+'rp'] ? 'up' : 'down'"
                  @click.native="show[items[0].id+'rp'] = !show[items[0].id+'rp']"></cell>
            <template v-for="item in items">
            <div v-if="item.dIorRH && item.dIorRC && playType.BallPlayIsShow.isqcrq && chargeMainAndImpr(playType.rp)" class="slide slide-1" :class="show[items[0].id+'rp']?'animate':''">
              <ul class="concede-points-box">
                <li class="concede-points"  @click="betHelpDialogHandler(item,playType.host,playType.rp,'zr',item.dIorRH)">
                  <p class="names">{{ item.hteam }}</p>
                  <p class="right-border" :class="{ggSelect: isMix == 1 && checkedMatches[item.onlykey + item.matchesDetailId + playType.rp + (item.dStrong == 'H'?'0':'2')]}">
                    <span class="dataMargin" v-if="item.dStrong == 'H'">{{concedeTagH(item.dStrong,item.dIorRH)}} {{ item.dRatio }}</span>
                    <span v-if="oddsSelect() === 'oddsCss1'" :class="item.dIorRH <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(indexs, '','dIorRH_change')})">{{formatOdds(item.dIorRH)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" :class="item.dIorRH <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(indexs, '','dIorRH_change')})">
                      <i :class="oddsChangeTag(indexs, '','dIorRH_change')"></i>
                            {{formatOdds(item.dIorRH)}}
                    </span>
                  </p>
                </li>
                <li class="concede-points"  @click="betHelpDialogHandler(item,!playType.host,playType.rp,'kr',item.dIorRC)">
                  <p  class="names">{{ item.gteam }}</p>
                  <p class="right-border" :class="{ggSelect: isMix == 1 && checkedMatches[item.onlykey + item.matchesDetailId + playType.rp + (item.dStrong == 'H'?'1':'3')]}">
                    <span class="dataMargin" v-if="item.dStrong == 'C'">{{concedeTagC(item.dStrong,item.dIorRC)}} {{ item.dRatio }}</span>
                    <span v-if="oddsSelect() === 'oddsCss1'" :class="item.dIorRC <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(indexs, '','dIorRC_change')})">{{formatOdds(item.dIorRC)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" :class="item.dIorRC <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(indexs, '','dIorRC_change')})">
                      <i :class="oddsChangeTag(indexs, '','dIorRC_change')"></i>
                            {{formatOdds(item.dIorRC)}}
                    </span>
                  </p>
                </li>
              </ul>
           </div>
            </template>

            <!--总局数大小-->

            <cell v-if="items[0].dIorOUH && items[0].dIorOUC && playType.BallPlayIsShow.isqcdx && chargeMainAndImpr(playType.zjsdx)" :title="'总局数大小'+titleData(items[0].hteam)"  is-link  :border-intent="false" :arrow-direction="show[items[0].id+'dx'] ? 'up' : 'down'"  @click.native="show[items[0].id+'dx'] = !show[items[0].id+'dx']"></cell>
            <template v-for="item in items">
              <div class="slide slide-1" :class="show[items[0].id+'dx']?'animate':''">
              <ul class="size-top-box"  v-if="item.dIorOUH && item.dIorOUC && playType.BallPlayIsShow.isqcdx && chargeMainAndImpr(playType.zjsdx)">
                <li class="size-top">
                  <p class="content" :class="{ggSelect: isMix == 1 && checkedMatches[item.onlykey + item.matchesDetailId + playType.zjsdx + '0']}"
                     @click="betHelpDialogHandler(item,playType.host,playType.zjsdx,'dxz',item.dIorOUH)">
                    <span class="content-left"><span>大</span><span>{{item.dRatioO}}</span></span>
                    <span class="content-right">
                      <span v-if="oddsSelect() === 'oddsCss1'":class="item.dIorOUH <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(indexs, '','dIorOUH_change')})">{{formatOdds(item.dIorOUH)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" :class="item.dIorOUH <0 ?'OddsN':'Odds'"  :style="({color:oddsChangeClass(indexs, '','dIorOUH_change')})">
                        <i :class="oddsChangeTag(indexs, '','dIorOUH_change')"></i>
                              {{formatOdds(item.dIorOUH)}}
                      </span>
                    </span>
                  </p>
                  <p class="content" :class="{ggSelect: isMix == 1 && checkedMatches[item.onlykey + item.matchesDetailId + playType.zjsdx + '1']}"
                     @click="betHelpDialogHandler(item,!playType.host,playType.zjsdx,'dxk',item.dIorOUC)">
                    <span class="content-left"><span>小</span><span>{{item.dRatioU}}</span></span>
                    <span class="content-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" :class="item.dIorOUC <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(indexs, '','dIorOUC_change')})">{{formatOdds(item.dIorOUC)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" :class="item.dIorOUC <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(indexs, '','dIorOUC_change')})">
                        <i :class="oddsChangeTag(indexs, '','dIorOUC_change')"></i>
                              {{formatOdds(item.dIorOUC)}}
                      </span>
                    </span>
                  </p>
                </li>
              </ul>
            </div>
            </template>

            <!--独赢-->

            <cell v-if="items[0].dIorMH && items[0].dIorMC && playType.BallPlayIsShow.isdy && chargeMainAndImpr(playType.dy)" :title="'独赢'+titleData(items[0].hteam)" is-link :border-intent="false" :arrow-direction="show[items[0].id+'dy'] ? 'up' : 'down'"  @click.native="show[items[0].id+'dy'] = !show[items[0].id+'dy']"></cell>
            <template v-for="item in items">
            <div  class="slide slide-1" :class="show[items[0].id+'dy']?'animate':''">
              <ul  class="concede-points-box" v-if="item.dIorMH && item.dIorMC && playType.BallPlayIsShow.isdy && chargeMainAndImpr(playType.dy)">
                <li class="concede-points"  @click="betHelpDialogHandler(item,playType.host,playType.dy,'dyz',item.dIorMH)">
                  <p class="names">{{ item.hteam }}</p>
                  <p class="right-border" :class="{ggSelect: isMix == 1 && checkedMatches[item.onlykey + item.matchesDetailId + playType.dy + '0']}">
                    <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(indexs, '','dIorMH_change')})">{{formatOdds(item.dIorMH)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(indexs, '','dIorMH_change')})">
                      <i :class="oddsChangeTag(indexs, '','dIorMH_change')"></i>
                            {{formatOdds(item.dIorMH)}}
                    </span>
                  </p>
                </li>
                <li class="concede-points"  @click="betHelpDialogHandler(item,!playType.host,playType.dy,'dyk',item.dIorMC)">
                  <p class="names">{{ item.gteam }}</p>
                  <p class="right-border" :class="{ggSelect: isMix == 1 && checkedMatches[item.onlykey + item.matchesDetailId + playType.dy + '1']}">
                    <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(indexs, '','dIorMC_change')})">{{formatOdds(item.dIorMC)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" class="Odds" :style="({color:oddsChangeClass(indexs, '','dIorMC_change')})">
                      <i :class="oddsChangeTag(indexs, '','dIorMC_change')"></i>
                            {{formatOdds(item.dIorMC)}}
                    </span>
                  </p>
                </li>
<!--                <li class="concede-points"  v-if="item.dIorMN" @click="betHelpDialogHandler(item,1,playType.dy,'dyh',item.dIorMN)">
                  <p >和局</p>
                  <p class="right-border" :class="{ggSelect: item['ggSelect' + item.id+'dyh'] }">
                    <span v-if="oddsSelect() === 'oddsCss1'" class="Odds" :style="({color:oddsChangeClass(indexs, '','dIorMN_change')})">{{formatOdds(item.dIorMN)}}</span>
                    <span v-if="oddsSelect() === 'oddsCss2'" class="Odds">
                      <i :class="oddsChangeClass(indexs, '','dIorMN_change')"></i>
                            {{formatOdds(item.dIorMN)}}
                    </span>
                  </p>
                </li>-->
              </ul>
            </div>
              </template>

            <!--球员局数-->

            <cell v-if="items[0].isMaster == 'Y' && items[0].ior_OUHO && items[0].ior_OUHU && playType.BallPlayIsShow.isqddfz && chargeMainAndImpr(playType.zfdx)" :title="'球员局数:'+detail.hteam+'-大/小 '" is-link :border-intent="false" :arrow-direction="show[items[0].id+'zfdxz'] ? 'up' : 'down'"  @click.native="show[items[0].id+'zfdxz'] = !show[items[0].id+'zfdxz']"></cell>
            <template v-for="item in items">
            <div  class="slide slide-1" :class="show[items[0].id+'zfdxz']?'animate':''">
              <ul class="size-top-box" v-if="item.ior_OUHO && item.ior_OUHU && playType.BallPlayIsShow.isqddfz && chargeMainAndImpr(playType.zfdx)">
                <li class="size-top">
                  <p class="content" :class="{ggSelect: isMix == 1 && checkedMatches[item.onlykey + item.matchesDetailId + playType.zfdx + '0']}"
                     @click="betHelpDialogHandler(item,playType.host,playType.zfdx,'zfdxzd',item.ior_OUHO)">
                    <span class="content-left"><span>大</span><span>{{item.ratio_ouho}}</span></span>
                    <span class="content-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" :class="item.ior_OUHO <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(indexs, '','ior_OUHO_change')})">{{formatOdds(item.ior_OUHO)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" :class="item.ior_OUHO <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(indexs, '','ior_OUHO_change')})">
                        <i :class="oddsChangeTag(indexs, '','ior_OUHO_change')"></i>
                              {{formatOdds(item.ior_OUHO)}}
                      </span>
                    </span>
                  </p>
                  <p class="content" :class="{ggSelect: isMix == 1 && checkedMatches[item.onlykey + item.matchesDetailId + playType.zfdx + '1']}"
                     @click="betHelpDialogHandler(item,!playType.host,playType.zfdx,'zfdxzx',item.ior_OUHU)">
                    <span class="content-left"><span>小</span><span>{{item.ratio_ouhu}}</span></span>
                    <span class="content-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" :class="item.ior_OUHU <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(indexs, '','ior_OUHU_change')})">{{formatOdds(item.ior_OUHU)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" :class="item.ior_OUHU <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(indexs, '','ior_OUHU_change')})">
                        <i :class="oddsChangeTag(indexs, '','ior_OUHU_change')"></i>
                              {{formatOdds(item.ior_OUHU)}}
                      </span>
                    </span>
                  </p>
                </li>
              </ul>
            </div>
                </template>


            <!--球员局数-->
            <cell v-if="items[0].isMaster == 'Y' && items[0].ior_OUCO && items[0].ior_OUCU && playType.BallPlayIsShow.isqddfk && chargeMainAndImpr(playType.zfdx)" :title="'球员局数:'+detail.gteam+'-大/小 '" is-link :border-intent="false" :arrow-direction="show[items[0].id+'zfdxk'] ? 'up' : 'down'"  @click.native="show[items[0].id+'zfdxk'] = !show[items[0].id+'zfdxk']"></cell>
            <template v-for="item in items">
            <div  class="slide slide-1" :class="show[items[0].id+'zfdxk']?'animate':''">
              <ul class="size-top-box" v-if="item.ior_OUCO && item.ior_OUCU && playType.BallPlayIsShow.isqddfk && chargeMainAndImpr(playType.zfdx)">
                <li class="size-top">
                  <p class="content" :class="{ggSelect: isMix == 1 && checkedMatches[item.onlykey + item.matchesDetailId + playType.zfdx + '2']}"
                     @click="betHelpDialogHandler(item,playType.host,playType.zfdx,'zfdxkd',item.ior_OUCO)">
                    <span class="content-left"><span>大</span><span>{{item.ratio_ouco}}</span></span>
                    <span class="content-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" :class="item.ior_OUCO <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(indexs, '','ior_OUCO_change')})">{{formatOdds(item.ior_OUCO)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'" :class="item.ior_OUCO <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(indexs, '','ior_OUCO_change')})">
                        <i :class="oddsChangeTag(indexs, '','ior_OUCO_change')"></i>
                              {{formatOdds(item.ior_OUCO)}}
                      </span>
                    </span>
                  </p>
                  <p class="content" :class="{ggSelect: isMix == 1 && checkedMatches[item.onlykey + item.matchesDetailId + playType.zfdx + '3']}"
                     @click="betHelpDialogHandler(item,!playType.host,playType.zfdx,'zfdxkx',item.ior_OUCU)">
                    <span class="content-left"><span>小</span><span>{{item.ratio_oucu}}</span></span>
                    <span class="content-right">
                      <span v-if="oddsSelect() === 'oddsCss1'" :class="item.ior_OUCU <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(indexs, '','ior_OUCU_change')})">{{formatOdds(item.ior_OUCU)}}</span>
                      <span v-if="oddsSelect() === 'oddsCss2'":class="item.ior_OUCU <0 ?'OddsN':'Odds'" :style="({color:oddsChangeClass(indexs, '','ior_OUCU_change')})">
                        <i :class="oddsChangeTag(indexs, '','ior_OUCU_change')"></i>
                              {{formatOdds(item.ior_OUCU)}}
                      </span>
                    </span>

                  </p>
                </li>
              </ul>
            </div>
                </template>

          </div>
        </div>

        <div class="is_playMaintenance" v-if="BallData.length == 0 ||((!playType.BallPlayIsShow.isqddfk || !chargeMainAndImpr(playType.zfdx)) && (!playType.BallPlayIsShow.isqddfz || !chargeMainAndImpr(playType.zfdx) )
      && (!playType.BallPlayIsShow.isqcdx || !chargeMainAndImpr(playType.zjsdx)) && (!playType.BallPlayIsShow.isqcrq || !chargeMainAndImpr(playType.rp)) &&
      (!playType.BallPlayIsShow.isdy || !chargeMainAndImpr(playType.dy)))" >
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
import {store,showBet,oddsChange,router,base,process} from '../../js/public/port'
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
      show:{},
      showChooseMore: false,
      detail:{
        liveStep:'',
        hteam:'',
        gteam:'',
        scoreGameH:'',
        scoreGameC:'',
        scoreSetH:'',
        scoreSetC:'',
        hscore:'',
        gscore:'',
        nowServer:'1'
      },
    }
  },
  methods: {
    getMonthAndDayAndHours(time){
      return Util.getMonthAndDayAndHours(Util.formatDate.UnixToDate(time, -12, 'yMDhm'));
    },
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
    titleData (hteam, isrq = false) {
      let title
      if (hteam.indexOf("-") === -1) {
        title = ''
      } else {
        let reg = /\((.+)\)/g
        title = hteam.split("-")[1].match(reg) !== null ? '-' + RegExp.$1 : ''
      }
      if (isrq) {
        return title.indexOf('第') !== -1 ? '让局盘'.concat(title) : title.indexOf('让局') !== -1 ? '让局' : '让盘'
      }
      return title
    },
    showContent (e, isrq) {
      if (isrq) {
        this.WQShowTitleData(this.WPBallData, e)
      } else {
        Show.showContent(this, e)
      }
    },
    WQShowTitleData (data, e) {
      for (let i in data) {
        if (data[i]['showContent'] === e) {
          data[i]['maxHeight'].animate = !data[i]['maxHeight'].animate
          data.splice(i, 1, data[i])
          break
        }
      }
    },
    toBetList () {
      store.state.is_mix_showModal = true;
      store.state.is_showModal = false;
    },
    formatOdds (data) {
      return Util.formatOdds(data)
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
    this.$nextTick(() => {
      if (Util.isNotEmpty(this.$refs.wrapper)) {
        this.scroll = new BScroll(this.$refs.wrapper, {click: true})
      }
    })

  },
  computed:{
    BallData:{

      get(){
        //控制更多玩法里的玩法展示
//        this.BallPlayIsShow = store.state.BallPlayIsShow;
        let moreData = store.state.morePlayData.result;
        if(moreData){
          let array = {};
          for(let i=0;i<moreData.data.length;i++){
            array[moreData.data[i].id+'dy'] = true;
            array[moreData.data[i].id+'rp'] =  true;
            array[moreData.data[i].id+'dx'] =  true;
            array[moreData.data[i].id+'zfdxz'] = true;//主队球员局数大小
            array[moreData.data[i].id+'zfdxk'] = true;//客队球员局数大小
          }
          this.show = array;
        }
        let code = store.state.morePlayData.code;
        if(code==='D000'){
          store.state.maintanceCode = code;
          store.state.isMore = false;
          store.state.isHome = false;
          base.methods.getMatches(true);
          //return [];
        }

        let datas = {};
        let teams = new Array();
        if(store.state.morePlayData.result
          &&store.state.morePlayData.result.data
          &&store.state.morePlayData.result.data.length>0){
          let morePlayData = store.state.morePlayData.result.data;
          //如果是滚球盘,就添加滚球时的主客队的盘局分
          if(store.state.moreParams.dateType === '1'){
            this.detail.scoreGameC = morePlayData[0].scoreGameC;
            this.detail.scoreGameH = morePlayData[0].scoreGameH;
            this.detail.scoreSetH = morePlayData[0].scoreSetH;
            this.detail.scoreSetC = morePlayData[0].scoreSetC;
            this.detail.hscore = morePlayData[0].hscore === -1 ? 'A':morePlayData[0].hscore;
            this.detail.gscore = morePlayData[0].gscore === -1 ? 'A':morePlayData[0].gscore;
            this.detail.title = morePlayData[0].liveStep;
            this.detail.nowServer = morePlayData[0].nowServer;
          }else {
            this.detail.title = morePlayData[0].startTimeStr;
          }
          this.detail.hteam =  morePlayData[0].hteam;
          this.detail.gteam = morePlayData[0].gteam;
          this.detail.leagueName = morePlayData[0].leagueName;
          for(let i=0;i<morePlayData.length;i++){
            let data = new Array();
            if(teams.indexOf(morePlayData[i].hteam)===-1){
              data.push(morePlayData[i]);
              teams.push(morePlayData[i].hteam);
            }else{
              data = datas[morePlayData[i].hteam];
              data.push(morePlayData[i]);
            }
            datas[morePlayData[i].hteam] = data;
          }
        }
        store.commit('showLoading',false);
        return datas;

      },
      set(newVal){

      }

    },
    playType:{
      get: function () {
        return store.state;
      },
      set: function (newValue) {
      }
    },
    dateType:{
      get:function () {
        return store.state.baseParam.dateType;
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
    maintenancePlay:{//玩法维护
      get: function () {
        return store.state.chargeMixOrChampion.TYWQ;
      },
      set: function (newValue) {
      }
    },
    imprisonPlay:{ //玩法禁用
      get: function () {
        return store.state.chargeMixOrChampion.TYWQ["3"];
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
    /*Show.destroyed(this)*/
  }
}
</script>
