<template>
  <div class="live-page">
    <!--<my-header ref="myHeader" @goData="liveData"  @headerClick="headerClick" @pfn="timeClickBall"></my-header>-->
    <my-header></my-header>
    <div class='wrapper' ref='wrapper'>
       <div class="content">
         <!--顶部球类滚动：-->
         <div class="ball-scroll-box">
             <div class="ball-scroll" v-if="gameData.length > 0">
                <scroller lock-y :scrollbar-x=false>
                  <div class="list">
                     <div :style="{color:$route.path == '/live/'+item.category ? '#EBA01E' : '#585757'}" v-for="(item,key) in gameData" :key='item.id' @click='clickBall(item.category,key,item.cnName,item.enName)' :class="[{'active':getActive[item.category]}, item.ballType, 'item rs-'+item.enName]">
                       <span :style="{width:item.size.toString().length == '3' ? '25px' : '19px',borderRadius:item.size.toString().length == '3' ?'10px':'50%'}">{{!chargeMixOrChampion[item.category]||chargeMixOrChampion[item.category][2][item.gamePlayId] == false ? 0:item.size}}</span>
                       <i :style="{color:$route.path == '/live/'+item.category ? '#EBA01E' : '#585757'}" :class='["iconfont icon-"+item.enName]'></i>
                       <p >{{item.category == 'TYLM' ? '篮球':item.cnName}}</p>
                     </div>
                 </div>
                </scroller>
              </div>
           <div class="ball-title rs-football">
                <h2>
                  <i class="iconfont icon-style" :class="'icon-'+ballName.enName"></i>
                  <span  class="football-title" v-html="ballName.cnName" ></span>  <!--v-html="ballName"-->
                  <Timer></Timer>
                </h2>
              </div>
         </div>

         <router-view ></router-view>

          <my-footer></my-footer>
       </div>
    </div>

    <!--dylan-->
    <!-- 单式注单弹框 -->
    <div class="mask-dialog" v-if="is_showModal"></div>
    <transition name="bet">
      <betDialog class="singleBet" v-if="is_showModal" ></betDialog>
    </transition>

  </div>
</template>
<script src="../../js/live/live.js"></script>

<!--<style scoped lang="scss">-->
  <!--.mask-dialog{position: fixed;top:0;left: 0;right: 0;bottom: 0;background: rgba(0,0,0,0.5)}-->
  <!--.singleBet{position: absolute;z-index: 10001;bottom: 0}-->
  <!--.bet-enter-active, .bet-leave-active{-->
    <!--transition: opacity .1s;-->
  <!--}-->
  <!--.bet-enter, .bet-leave-to /* .fade-leave-active below version 2.1.8 */ {-->
    <!--opacity: 0;-->
  <!--}-->
<!--</style>-->

