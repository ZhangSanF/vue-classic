<template>
  <div class="today-page">
    <my-header></my-header>
    <div class='wrapper' ref='wrapper' :style="{bottom:bottom+'px'}">
      <div class="content">
        <!--顶部球类滚动：-->
        <div class="ball-scroll-box">
          <div class="ball-scroll" v-if="gameData.length > 0">
            <scroller lock-y :scrollbar-x=false>
              <div class="list">
                <div :style="{color:$route.path == '/today/'+item.category ? '#EBA01E' : '#585757'}" v-for="(item,key) in gameData" :key='item.id' @click='clickBall(item.category,key,item.cnName,item.enName)' :class="[{'active':getActive[item.category]}, item.ballType, 'item rs-'+item.enName ]">
                  <span :style="{width:item.size.toString().length == '3' ? '25px' : '19px',borderRadius:item.size.toString().length == '3' ?'10px':'50%'}">{{!chargeMixOrChampion[item.category]||chargeMixOrChampion[item.category][2][item.gamePlayId] == false ? 0:item.size}}</span>
                  <i :style="{color:$route.path == '/today/'+item.category ? '#EBA01E' : '#585757'}" :class='["iconfont icon-"+item.enName]'></i>
                  <p >{{item.category == 'TYLM' ? '篮球':item.cnName}}</p>
                </div>
              </div>
            </scroller>
          </div>
          <div class="ball-title rs-football">
            <h2>
              <i class="iconfont icon-style" :class="'icon-'+ballName.enName"></i>
              <span class="football-title" v-html="ballName.cnName"></span>
              <Timer></Timer>
              <div class="right">
                  <div class="all-time" v-show="isMix === 1">
                      <popup-radio   @on-change="sortTimeMatchs" :options="ballTabList2" v-model="defaultValue2"></popup-radio>
                  </div>
                  <div class="time-sort">
                      <popup-radio   @on-change="sortMatchs" :options="ballTabList" v-model="defaultValue"></popup-radio>
                  </div>
              </div>
            </h2>
            <!--<tab :animate="clearanceIsShow" class='ball-tab' :line-width="2" >    &lt;!&ndash;custom-bar-width="70px"&ndash;&gt;-->
              <!--<tab-item  @on-item-click="singleOrClearance('0')" :selected="isMix == '0' ">-->
                <!--{{-->
                  <!--ballType === "TYWQ" ? "独赢&让盘":-->
                  <!--ballType === "TYPQ" ? "独赢&让局": "让球&大小"-->
                <!--}}-->
              <!--</tab-item>-->
              <!--<tab-item v-if="clearanceIsShow"  @on-item-click="singleOrClearance('1')" :selected="isMix === '1'">综合过关</tab-item>  &lt;!&ndash;v-show="clearanceIsShow"&ndash;&gt;-->
              <!--<tab-item v-if="championIsShow" @on-item-click="singleOrClearance('2')" :selected="isMix === '2'">冠军</tab-item>-->
            <!--</tab>-->

              <div class="tab-box">
                <div @click="singleOrClearance('0')" :style="{color:isMix == '0' ? '#BF7800' : ''}">
                  让球&大小
                  <transition name="xianT">
                    <span v-show="isMix == '0'" class="xian"></span>
                  </transition>
                </div>
                <div v-if="clearanceIsShow" @click="singleOrClearance('1')" :style="{color:isMix == '1' ? '#BF7800' : ''}">
                  综合过关
                  <transition name="xianT">
                    <span v-show="isMix == '1'" class="xian"></span>
                  </transition>
                </div>
                <div v-if="championIsShow" @click="singleOrClearance('2')" :style="{color:isMix == '2' ? '#BF7800' : ''}">
                  冠军
                  <transition name="xianT">
                    <span v-show="isMix == '2'" class="xian"></span>
                  </transition>
                </div>
              </div>


          </div>
        </div>

        <router-view></router-view>

        <my-footer></my-footer>
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
    <div v-if="isMix == '1' && mixCount > 0" class="chooseMore" :class="{active: showChooseMore}" @click="toBetList">
      <a> 综合过关-投注单 <sup>{{mixCount}}</sup></a>
    </div>
  </div>
</template>

<script src="../../js/today/today.js"></script>

