<!--suppress ALL -->
<template>

  <header  :class="{zindex: addZindex}">
    <!--顶部颜色-->
    <div class="header-bg"></div>
    <!--左侧图标rs rs-menu-left-->
    <div class="h-menu" v-show="homeMenu"  @click="showMainMenu = !showMainMenu; addZindex = true; isShow = false;">
      <span class="h-menu iconfont icon-hamburger"></span>
    </div>
    <div class="menuBox-left-cover" :class="{active:showMainMenu}" @click="showMainMenu = !showMainMenu">遮罩层</div>
    <div class="page-menu rs rs-left" v-show="pageMenu" @click="callbackPrev"></div>
    <!--滚球/今日/早盘-->
    <tab class='nav'  custom-bar-width="30px;">
      <tab-item @click.native="headerClick({path: 'live', type: '1'},'0')" :selected="active.live" ><a :class="[curTab == '1' ? 'actives' : 'noActives']">滚球</a></tab-item>
      <tab-item @click.native="headerClick({path: 'today', type: '0'},'1')" :selected="active.today"><a :class="[curTab == '0' ? 'actives' : 'noActives']">今日</a></tab-item>
      <tab-item @click.native="headerClick({path: 'morning', type: '2'},'2')" :selected="active.morning" ><a :class="[curTab == '2' ? 'actives' : 'noActives']">早盘</a></tab-item>
    </tab>
    <!--右边个人信息-->
    <div class="wallet" @click="showRightMenu()">
      <span class="wal-icon iconfont icon-my"></span>
      <!--<div class="num" style="padding-top:6px" v-if="!user.username"><p>你好!游客</p></div>-->
      <!--<div class="right" v-show="user.username"><i style="font-size: 40px" :class="moneyBtn" @click="hideMoney()"></i><i class="iconfont icon-refresh refresh-style"  @click="getMoney()"></i></div>-->
    </div>
    <!--    个人中心：  -->
    <div class="menuBox-right-cover" :class="{active:isShow}" @click="isShow = !isShow">遮罩层</div>
    <!--右侧内容-->
    <!--:class="isShow ? ((user!=null&& isLoginOut=='true'?true:false)?'showMenu':'showMenu1') : ((user!=null&& isLoginOut=='true'?true:false)?'hideMenu':'hideMenu1')"-->
    <div class="menuBox-right" :class="isShow ? (user.username ? 'showMenu' :'showMenu1') :(user.username ? 'hideMenu': 'hideMenu1')">
      <ul>
        <li class="bar">
          <div class="left" v-show="user.username"><p>{{user.username}}</p> <span>{{isHideMoney=='N'?'***': user.money}}</span><font>RMB</font></div>
          <div class="left" style="padding-top:12px" v-if="!user.username"><p>你好!游客</p></div>
          <div class="right" v-show="user.username"><i style="font-size: 40px" :class="moneyBtn" @click="hideMoney()"></i><i class="iconfont icon-refresh refresh-style"  @click="getMoney()"></i></div>
        </li>
        <li @click="rightMenu('/mine/order')"><span class="iconfont icon-paid menu-icon"></span>{{ $t("msg.order_history") }} <p class="info-right"> 00</p></li>
        <li @click="rightMenu('/mine/noclearingOrder')"><span class="iconfont icon-notpaid menu-icon"></span>{{ $t("msg.noclearing_order") }} <p class="info-right">{{noclearingOrderNum}}</p></li>
        <li @click="rightMenu('/mine/accountHistory/accountHisDay')"><span class="iconfont icon-wallet menu-icon"></span>{{ $t("msg.account_history") }} <p class="info-right"> 00</p></li>
        <li @click="rightMenu('/notice')"><span class="iconfont icon-notice menu-icon"></span>{{ $t("msg.msg_notice") }} <p class="info-right">{{announcementNum}}</p></li>
        <li @click="rightMenu('/setting')"><span class="iconfont icon-set menu-icon"></span>{{ $t("msg.bet_setting") }}<p class="info-right"> </p></li>
        <li @click="logOut" v-if="user.username"><span class="iconfont rs rs-close02 menu-icon"></span>{{$t("msg.logOut")}}</li>
      </ul>
    </div>
    <!--左侧内容-->
    <div class="mainMenuBox" :class="{active : showMainMenu }">
      <div class="mainMenu">
        <div  class="title"><div class="icon-box"><i class="iconfont icon-close1" @click="isShowMainMenu"></i></div></div>
        <!-- 左侧点击 -->
        <div class='menuWrapper' ref='MenuWrapper'>
          <div class="content zhedie" >
            <div  v-for="item in leftData" :key="item.gameEnumSort">
              <!--<cell class="mainMenu-balls" :title=item.gameEnumTrans  is-link :border-intent="false"  :arrow-direction="item.showContent ? 'up' : 'down'"  @click.native="item.showContent = !item.showContent"></cell>-->
              <div class="mainMenu-balls">{{item.gameEnumTrans}}</div>
              <div class="slide" :class="item.showContent?'animate':''" >
                <ul style="padding-left: 14px">
                  <li v-for="(itemm,key) in item.categoryList" :key="itemm.categorySortNo" @click="leftMenuClick(item.gameEnumName, item.gameEnumSort, itemm, key)" >
                    <i class="balls-icon iconfont " :class='[itemm.class]'></i>
                    <span class="balls-name" v-html="itemm.cnName"></span>
                    <div class="balls-number" :style="{width:itemm.number.toString().length == '3' ? '25px':'19px',borderRadius:itemm.number.toString().length == '3' ?'10px':'50%'}">
                      <span class="number-content"> {{ itemm.number  }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </header>

</template>
<style lang='scss'>

</style>
<script>/* eslint-disable spaced-comment,quotes,standard/object-curly-even-spacing,no-new-wrappers,no-unused-expressions,camelcase,indent */
import { Tab, Scroller, Cell, TabItem, XDialog, Checker, CheckerItem, XSwitch, XHeader} from 'vux'
import {BScroll,Util,Http} from '../router/api'
import bus from "../js/publicBall/bus.js"
import {Message} from 'iview'
import {base,store,storages,router} from '../js/public/port'
import Timer from '@/components/Timer.vue'
let _this
export default {
  components: {
    XHeader,
    Tab,
    TabItem,
    Scroller,
    XSwitch,
    Checker,
    CheckerItem,
    XDialog,
    Cell,
    Timer
  },
  data () {
    return {
      moneyBtn: '',
      live: false,
      today: false,
      morning: false,
      homeMenu: true,
      pageMenu: false,
      isShow: false,//true:显示右侧列表，false:不显示右侧列表
      lang_zn: 1,
      lang_fn: 1,
      isHideMoney: '',
      showMainMenu: false,
      showSetting: false,
      leftMenuData: [],
      plate: 'H',
      plateMsg: {},
      noclearingOrderNum:0,//右侧个人信息菜单的未结算注单的数量
      announcementNum:0,
      addZindex: false,
    }
  },
  computed:{
    user(){
      return store.state.user ? store.state.user : {};
    },
    active(){
      return store.state.active.topType;
    },
    leftData(){
      this.initScorll();
      return store.state.leftData
    },
    curTab:{
      get(){
        return store.state.baseParam.dateType;
      },
      set(newVal){
      }
    },
  },
  methods: {
    logOut:function(){
      store.state.user = {};
      base.methods.logOut();
      this.isShow = false;
    },

    getAnnouncementNum:function () {
      let _this=this;
      this.$http.get("/announcement/getVueCount.html").then(
        function (res) {
          if(res.success){
            _this.announcementNum=res.data;
          }
        }
      ).catch(function(err){
        console.log(err);
      })
    },
    headerClick: function (obj,index) {
      store.state.startTime = '';//切换滚球今日早盘时清空早盘的时间限制
      let gameType = store.state.baseParam.gameType;
      store.state.baseParam.dateType = obj.type;
      store.state.objPath = obj.path;
      let baseParam = store.state.baseParam;
      base.methods.updBaseParam(baseParam.gameType,baseParam.isMix);
      router.push({path: '/'+store.state.objPath+'/'+baseParam.gameType});
     // store.commit('add_datas',[{}]);
    },
    routerMore () {
      this.homeMenu = !this.homeMenu;
      this.pageMenu = !this.pageMenu;
    },
    checkerClick (value) {
      this.plate = value;
    },

    //隐藏金额
    hideMoney(){
      let _this=this;
      if(_this.isHideMoney == 'N'){
        _this.getMoney();
        _this.moneyBtn='iconfont icon-show';
      }else{
        _this.moneyBtn='iconfont icon-conceal';
//        _this.user.money='***'
      }
      _this.isHideMoney = _this.isHideMoney == 'N' ? 'Y' : 'N';
      var obj= eval('(' + storages.getSession('isHideMoney') + ')');
      if(!Util.isNotEmpty(obj)){
        obj=new Object;
      }
      obj[_this.user.username]= _this.isHideMoney;
      storages.setSession("isHideMoney",JSON.stringify(obj));
    },
    //刷新金额
    getMoney: function () {
      if(!storages.isLogin()) {
        Message.warning('登录状态信息过期,请重新登录');
        return;
      }
      let _this = this;
      base.methods.getMoney();
    },
    routerBack(data){
      if(data ==="1"){
        this.live =true;
      }else if(data ==="0"){
        this.today =true;
      }else if(data ==="2"){
        this.morning =true;
      }
    },
    //返回上一级
    callbackPrev: function () {
      let date;
      if (this.live) {
        date = 'live';
      } else if (this.today) {
        date = 'today';
      } else if (this.morning) {
        date = 'morning';
      }
      this.$router.push({path: '/' + date})
    },

    //修改左侧导航栏
    sortLeftData(data){
      let leftData = new Array();
      leftData.push(data[1],data[0],data[2])
      this.$store.state.common.gameTypeData.leftData = leftData;
    },
    //个人中心：
    showRightMenu: function () {
      if(this.showMainMenu){
        return //如果左侧导航栏存在,不让点击右边
      }
      if(!this.isShow){
        if(storages.isLogin()) {
          this.getMoney();
//          this.getNoclearingOrderNum();
        }else{
//          _this.noclearingOrderNum='';
        }
//        this.getFirstParam();
//        this.getAnnouncementNum();
      }
      this.isShow = !this.isShow;
      this.addZindex = true;
    },
    //个人中心遮罩层点击事件
    isShowRightMenu: function() {
      this.isShow = false;
    },
    //打开左侧菜单：
    isShowMainMenu: function () {
      if (!this.showMainMenu) {
        this.initScorll();
      }
      this.showMainMenu = !this.showMainMenu;
      this.addZindex = true;
      this.isShow = false;
    },
    //关闭弹框：
    closeSetting: function () {
      this.showSetting = !this.showSetting;
      this.showRightMenu();
      this.oddsCss1=window.sessionStorage.getItem("oddsCss")==="oddsCss1";
      this.oddsCss2=window.sessionStorage.getItem("oddsCss")==="oddsCss2";
    },
    isShowSetting: function () {
        this.$router.push({path:'/setting'})
    },
    //左侧菜单点击事件
    leftMenuClick: function (name, type, obj, key) {
      store.state.ballName = obj.cnName;
      let dateType = type;
      let gameType = obj.category;
      let baseParam = store.state.baseParam;
      baseParam.dateType = dateType;
      baseParam.gameType = gameType;
      store.commit("setBaseParam",baseParam)
      base.methods.updBaseParam(gameType, baseParam.isMix);
      let path = 'live';
      if(type == '0'){
        path = 'today';
      }else if(type == '1'){
        path = 'live';
      }else if(type == '2'){
        path = 'morning';
      }
      store.state.objPath = path;
      obj.isLeftClick = true;
      obj.key = key;
      this.$router.push({path: '/reload', query: {url: '/' + name, type: type, params: obj}});
    },
    //初始化左侧滑动
    initScorll () {
      this.$nextTick(() => {
        if (!this.scroll) {
          /*如果每次创建实例,则事件每次会绑定MenuWrapper上*/
          if(Util.isEmptyObject(this.$refs.MenuWrapper)){
            return;
          }
          this.scroll = new BScroll(this.$refs.MenuWrapper, {
            click: true
          })
          this.scroll.on('touchEnd', (pos) => {
            if (!this.scroll.hasVerticalScroll) {
              this.initScorll();
            }
          })
        } else {
          setTimeout(()=>  this.scroll.refresh(),100);
          // this.scroll.refresh();
        }
//         if (this.scroll.scrollerHeight === this.scroll.wrapperHeight) {
//          this.$refs.MenuWrapper.style.height = this.scroll.wrapperHeight - (this.scroll.wrapperHeight - this.$refs.MenuWrapper.parentElement.clientHeight) * 2 + "px";
//        this.$refs.MenuWrapper.style.height = this.$refs.MenuWrapper.parentElement.clientHeight * 2 + "px";
//        this.scroll.hasVerticalScroll = true;
//        }
      })
    },

    getNoclearingOrderNum : function () {
      let _this=this;
      _this.$http({
        url: "/record/vue/getNoclearingOrderNum.html",
        method: 'post'
      }).then(
        function (res) {
          if(res==null){
            _this.noclearingOrderNum=0;
          }else{
            _this.noclearingOrderNum=res.data;
          }
        }
      ).catch(
        function (err) {
          console.log(err);
        }
      )
    },
    rightMenu: function (path) {
      store.state.timerFresh = false;
      if(path!='/notice' && path!='/setting' && !storages.isLogin()){
          Message.warning('登录状态信息过期,请重新登录');
      }else {
        this.$router.push({path: path + "/" });
      }
//      this.isShow = false
    },
    closeRightMeun () {
      this.isShow = false;
    },
  },
  created () {
    let _this = this;

    if(_this.user != null){
      var obj= eval('(' + window.sessionStorage.getItem('isHideMoney') + ')');
      if(Util.isNotEmpty(obj)){
        this.isHideMoney=obj[this.user.username];
      }else{
        this.isHideMoney="Y";
      }
      this.moneyBtn=this.isHideMoney == 'N' ? 'iconfont icon-conceal' : 'iconfont icon-show';
    }
  },
  mounted () {
    store.state.user = storages.getUserObjSession("user")
    base.methods.getSourceConfig();
    let baseParam = store.state.baseParam;
    base.methods.updBaseParam(baseParam.gameType,baseParam.isMix);
    base.methods.getGameTypeSum();
    base.methods.getMatches(true);



  },
  watch:{

  }
}
</script>
