<template>
      <div class="home-page">
            <my-header></my-header>
            <div class='wrapper' ref='wrapper'>
                  <div class="content">
                        <!--顶部球类滚动：-->
                        <div class="ball-scroll-box">
                              <div class="ball-scroll">
                                    <scroller lock-y :scrollbar-x=false>
                                          <div class="list">
                                                <div class="item" v-for="item in ballList" :key='item.id'>
                                                      <router-link to='/live'>
                                                            <span>{{item.num}}</span>
                                                            <i :class='[item.ballType]' class="rs"></i>
                                                            <p>{{item.name}}</p>
                                                      </router-link>
                                                </div>
                                          </div>
                                    </scroller>
                              </div>
                        </div>
                        <!--精选赛事：-->
                        <div class="hot">
                              <h1>精选赛事</h1>
                              <div class="tit">
                                    <p><i></i>西班牙甲组联赛</p>
                                    <span class='time'>03-24 03:45</span>
                              </div>
                              <div class="cont">
                                    <div class="vs">
                                          <router-link to='/show'>
                                                <img src="../../static/images/logo_bs.png"/> 巴塞罗那 <font>VS</font><img
                                                src="../../static/images/logo_hm.png"/> 皇家马德里
                                                <span class='right'>+21 <i class='arrows'></i></span>
                                          </router-link>
                                    </div>
                                    <div class="cow cow-1">
                                          <div class="col-3" @click="betHelpDialogHandler">巴塞罗那 <font>2.65</font></div>
                                          <div class="col-3" @click="betHelpDialogHandler">和局 <font>3.75</font></div>
                                          <div class="col-3" @click="betHelpDialogHandler">皇家马德里 <font>2.47</font></div>
                                    </div>
                                    <div class="cow cow-2">
                                          <div class="col-2" @click="betHelpDialogHandler">巴塞罗那 <font>0.92</font></div>
                                          <div class="col-2" @click="betHelpDialogHandler">皇家马德里 <font>0.86</font><span
                                                class="bifen">0/5</span></div>
                                    </div>
                                    <div class="cow cow-3">
                                          <div class="col-2" @click="betHelpDialogHandler">大/2.5/3 <font>0.65</font>
                                          </div>
                                          <div class="col-2" @click="betHelpDialogHandler">小/2.5/3 <font>0.75</font>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <div class="ball_box ball-gunqiu">
                              <div class="ball_qiu">
                                    <h1>滚球
                                          <router-link class='link' to='/live'>11 项赛事 <i class='arrows'></i>
                                          </router-link>
                                    </h1>
                                    <div class="ball_nei">
                                          <span class="ball_title"><i></i>足球</span>
                                          <span class="ball_rq">让球 </span>
                                          <span class="ball_dx">大小</span>
                                    </div>
                                    <div class="ball_cont">
                                          <div class="ball_dan_c">
                                                <div class="ball_dan_t">
                                                      <router-link class='link' to='/show'>
                                                            <div class="dc_nei"><span class="banchang">下半场</span><span
                                                                  class="bifen">40:32</span> <span class="add_f">+10 <i
                                                                  class="arrows"></i></span></div>
                                                            <div class="teama">鸟栖沙岩<span class="win">1</span></div>
                                                            <div class="teamb">神户胜利船<span class="win">0</span></div>
                                                      </router-link>
                                                </div>
                                                <div class="ball_dan_cnt">
                                                      <div class="rqa">
                                                            <p class="team_rq" to='/' @click="betHelpDialogHandler">
                                                                  <span class="rq_b"><i>0</i>/<i>0.5</i></span>
                                                                  <span class="rq_z">0.82</span>
                                                            </p>
                                                            <p class="team_dx" to='/' @click="betHelpDialogHandler">
                                                                  <span class="dx_b"><i class="dx_c">大</i><i>0</i>/<i>3.0</i></span>
                                                                  <span class="dx_z">0.82</span>
                                                            </p>
                                                      </div>
                                                      <div class="rqb">
                                                            <p class="team_rq" to='/' @click="betHelpDialogHandler">
                                                                  <span class="rq_b"><i></i>/<i></i></span>
                                                                  <span class="rq_z">0.82</span>
                                                            </p>
                                                            <p class="team_dx" @click="betHelpDialogHandler">
                                                                  <span class="dx_b"><i class="dx_a">大</i><i
                                                                        class="dx_c">2.5</i>/<i>3</i></span>
                                                                  <span class="dx_z">0.82</span>
                                                            </p>
                                                      </div>
                                                </div>
                                          </div>
                                          <div class="ball_dan_c">
                                                <div class="ball_dan_t">
                                                      <router-link class='link' to='/show'>
                                                            <div class="dc_nei"><span class="banchang">下半场</span><span
                                                                  class="bifen">40:32</span> <span class="add_f">+10 <i
                                                                  class="arrows"></i></span></div>
                                                            <div class="teama">鸟栖沙岩<span class="win">1</span></div>
                                                            <div class="teamb">神户胜利船<span class="win">0</span></div>
                                                      </router-link>
                                                </div>
                                                <div class="ball_dan_cnt">
                                                      <div class="rqa">
                                                            <p class="team_rq" to='/' @click="betHelpDialogHandler">
                                                                  <span class="rq_b"><i></i>/<i></i></span>
                                                                  <span class="rq_z">0.82</span>
                                                            </p>
                                                            <p class="team_dx" to='/' @click="betHelpDialogHandler">
                                                                  <span class="dx_b"><i class="dx_a">大</i><i
                                                                        class="dx_c">2.5</i>/<i>3</i></span>
                                                                  <span class="dx_z">0.82</span>
                                                            </p>
                                                      </div>
                                                      <div class="rqb">
                                                            <p class="team_rq" to='/' @click="betHelpDialogHandler">
                                                                  <span class="rq_b"><i></i>/<i></i></span>
                                                                  <span class="rq_z">0.82</span>
                                                            </p>
                                                            <p class="team_dx" to='/' @click="betHelpDialogHandler">
                                                                  <span class="dx_b"><i class="dx_a">大</i><i
                                                                        class="dx_c">2.5</i>/<i>3</i></span>
                                                                  <span class="dx_z">0.82</span>
                                                            </p>
                                                      </div>
                                                </div>
                                          </div>
                                          <div class="ball_dan_c">
                                                <div class="ball_dan_t">
                                                      <router-link class='link' to='/show'>
                                                            <div class="dc_nei"><span class="banchang">下半场</span><span
                                                                  class="bifen">40:32</span> <span class="add_f">+10 <i
                                                                  class="arrows"></i></span></div>
                                                            <div class="teama">鸟栖沙岩<span class="win">1</span></div>
                                                            <div class="teamb">神户胜利船<span class="win">0</span></div>
                                                      </router-link>
                                                </div>
                                                <div class="ball_dan_cnt">
                                                      <div class="rqa">
                                                            <p class="team_rq" to='/' @click="betHelpDialogHandler">
                                                                  <span class="rq_b"><i></i>/<i></i></span>
                                                                  <span class="rq_z">0.82</span>
                                                            </p>
                                                            <p class="team_dx" to='/' @click="betHelpDialogHandler">
                                                                  <span class="dx_b"><i class="dx_a">大</i><i
                                                                        class="dx_c">2.5</i>/<i>3</i></span>
                                                                  <span class="dx_z">0.82</span>
                                                            </p>
                                                      </div>
                                                      <div class="rqb">
                                                            <p class="team_rq" to='/' @click="betHelpDialogHandler">
                                                                  <span class="rq_b"><i></i>/<i></i></span>
                                                                  <span class="rq_z">0.82</span>
                                                            </p>
                                                            <p class="team_dx" to='/' @click="betHelpDialogHandler">
                                                                  <span class="dx_b"><i class="dx_a">大</i><i
                                                                        class="dx_c">2.5</i>/<i>3</i></span>
                                                                  <span class="dx_z">0.82</span>
                                                            </p>
                                                      </div>
                                                </div>
                                          </div>

                                    </div>
                              </div>
                        </div>
                        <div class="ball_box ball_today">
                              <div class="ball_qiu">
                                    <h1>今日
                                          <router-link class='link' to='/today'>211 项赛事 <i class='arrows'></i>
                                          </router-link>
                                    </h1>
                                    <div class="ball_nei">
                                          <span class="ball_title"><i></i>足球</span>
                                          <span class="ball_rq">让球 </span>
                                          <span class="ball_dx">大小</span>
                                    </div>
                                    <div class="ball_cont">
                                          <div class="ball_dan_c">
                                                <div class="ball_dan_t">
                                                      <router-link class='link' to='/show'>
                                                            <div class="dc_nei"><span class="banchang">下半场</span><span
                                                                  class="bifen">40:32</span> <span class="add_f">+10 <i
                                                                  class="arrows"></i></span></div>
                                                            <div class="teama">鸟栖沙岩<span class="win">1</span></div>
                                                            <div class="teamb">神户胜利船<span class="win">0</span></div>
                                                      </router-link>
                                                </div>
                                                <div class="ball_dan_cnt">
                                                      <div class="rqa">
                                                            <p class="team_rq" to='/' @click="betHelpDialogHandler">
                                                                  <span class="rq_b"><i>0</i>/<i>0.5</i></span>
                                                                  <span class="rq_z">0.82</span>
                                                            </p>
                                                            <p class="team_dx" to='/' @click="betHelpDialogHandler">
                                                                  <span class="dx_b"><i class="dx_c">大</i><i>0</i>/<i>3.0</i></span>
                                                                  <span class="dx_z">0.82</span>
                                                            </p>
                                                      </div>
                                                      <div class="rqb">
                                                            <p class="team_rq" to='/' @click="betHelpDialogHandler">
                                                                  <span class="rq_b"><i></i>/<i></i></span>
                                                                  <span class="rq_z">0.82</span>
                                                            </p>
                                                            <p class="team_dx" to='/' @click="betHelpDialogHandler">
                                                                  <span class="dx_b"><i class="dx_a">大</i><i
                                                                        class="dx_c">2.5</i>/<i>3</i></span>
                                                                  <span class="dx_z">0.82</span>
                                                            </p>
                                                      </div>
                                                </div>
                                          </div>
                                          <div class="ball_dan_c">
                                                <div class="ball_dan_t">
                                                      <router-link class='link' to='/show'>
                                                            <div class="dc_nei"><span class="banchang">下半场</span><span
                                                                  class="bifen">40:32</span> <span class="add_f">+10 <i
                                                                  class="arrows"></i></span></div>
                                                            <div class="teama">鸟栖沙岩<span class="win">1</span></div>
                                                            <div class="teamb">神户胜利船<span class="win">0</span></div>
                                                      </router-link>
                                                </div>
                                                <div class="ball_dan_cnt">
                                                      <div class="rqa">
                                                            <p class="team_rq" to='/' @click="betHelpDialogHandler">
                                                                  <span class="rq_b"><i></i>/<i></i></span>
                                                                  <span class="rq_z">0.82</span>
                                                            </p>
                                                            <p class="team_dx" to='/' @click="betHelpDialogHandler">
                                                                  <span class="dx_b"><i class="dx_a">大</i><i
                                                                        class="dx_c">2.5</i>/<i>3</i></span>
                                                                  <span class="dx_z">0.82</span>
                                                            </p>
                                                      </div>
                                                      <div class="rqb">
                                                            <p class="team_rq" to='/' @click="betHelpDialogHandler">
                                                                  <span class="rq_b"><i></i>/<i></i></span>
                                                                  <span class="rq_z">0.82</span>
                                                            </p>
                                                            <p class="team_dx" to='/' @click="betHelpDialogHandler">
                                                                  <span class="dx_b"><i class="dx_a">大</i><i
                                                                        class="dx_c">2.5</i>/<i>3</i></span>
                                                                  <span class="dx_z">0.82</span>
                                                            </p>
                                                      </div>
                                                </div>
                                          </div>
                                          <div class="ball_dan_c">
                                                <div class="ball_dan_t">
                                                      <router-link class='link' to='/show'>
                                                            <div class="dc_nei"><span class="banchang">下半场</span><span
                                                                  class="bifen">40:32</span> <span class="add_f">+10 <i
                                                                  class="arrows"></i></span></div>
                                                            <div class="teama">鸟栖沙岩<span class="win">1</span></div>
                                                            <div class="teamb">神户胜利船<span class="win">0</span></div>
                                                      </router-link>
                                                </div>
                                                <div class="ball_dan_cnt">
                                                      <div class="rqa">
                                                            <p class="team_rq" to='/' @click="betHelpDialogHandler">
                                                                  <span class="rq_b"><i></i>/<i></i></span>
                                                                  <span class="rq_z">0.82</span>
                                                            </p>
                                                            <p class="team_dx" to='/' @click="betHelpDialogHandler">
                                                                  <span class="dx_b"><i class="dx_a">大</i><i
                                                                        class="dx_c">2.5</i>/<i>3</i></span>
                                                                  <span class="dx_z">0.82</span>
                                                            </p>
                                                      </div>
                                                      <div class="rqb">
                                                            <p class="team_rq" @click="betHelpDialogHandler">
                                                                  <span class="rq_b"><i></i>/<i></i></span>
                                                                  <span class="rq_z">0.82</span>
                                                            </p>
                                                            <p class="team_dx" to='/' @click="betHelpDialogHandler">
                                                                  <span class="dx_b"><i class="dx_a">大</i><i
                                                                        class="dx_c">2.5</i>/<i>3</i></span>
                                                                  <span class="dx_z">0.82</span>
                                                            </p>
                                                      </div>

                                                </div>
                                          </div>

                                    </div>
                              </div>
                        </div>
                        <my-footer></my-footer>
                  </div>
            </div>
            <my-dialog :isShow="betHelpDialogShow" @on-result-change="onResultChange1"
                       @dialogHandler="betHelpDialogHandler"></my-dialog>


      </div>
</template>

<script>

      import {
            Tab,
            TabItem,
            Scroller,
            Cell,
            CellBox,
            CellFormPreview,
            Group,
            InlineLoading,
            Checker,
            CheckerItem,
            XSwitch
      } from 'vux'
      import BScroll from 'better-scroll'
      import MyFooter from '../components/Footer.vue'
      import MyHeader from '../components/Header.vue'

      export default {
            components: {
                  'my-footer': MyFooter,
                  'my-header': MyHeader,
                  Tab,
                  TabItem,
                  Cell,
                  CellBox,
                  CellFormPreview,
                  Scroller,
                  InlineLoading,
                  Checker,
                  CheckerItem,
                  XSwitch
            },
            data() {
                  return {
                        showMainMenu: false,
                        showContent004: true,
                        showContent005: true,
                        showContent006: true,
                        betHelpDialogShow: false,
                        ballList: [
                              {name: '足球', num: '10', ballType: 'rs-football'},
                              {name: '蓝球', num: '15', ballType: 'rs-basketball'},
                              {name: '网球', num: '20', ballType: 'rs-tennis'},
                              {name: '排球', num: '20', ballType: 'rs-volleyball'},
                              {name: '羽毛球', num: '20', ballType: 'rs-badminton'},
                              {name: '乒乓球', num: '20', ballType: 'rs-tabletennis'},
                              {name: '棒球', num: '20', ballType: 'rs-baseball'},
                              {name: '斯诺克', num: '20', ballType: 'rs-snooker'},
                              {name: '其他', num: '20', ballType: 'rs-other'}
                        ]
                  }
            },
            methods: {
                  onResultChange1: function (val) {
                        this.betHelpDialogShow = val
                  },
                  betHelpDialogHandler: function () {
                        this.betHelpDialogShow = !this.betHelpDialogShow
                  },
                  scrollInit: function () {
                        this.$nextTick(() => {
                              this.scroll = new BScroll(this.$refs.wrapper, {
                                    click: true
                              })
                        })
                  }
            },
            mounted() {
                  this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.wrapper, {
                              click: true
                        })
                  })
            }
      }

</script>

<style lang="scss">
      @import '../themes/home/home.scss';
</style>
