/* eslint-disable camelcase,quotes,spaced-comment */
import { Tab, TabItem, Scroller, Cell, CellBox, Group, Selector, PopupRadio } from 'vux'
import {MyFooter, MyHeader} from '../../router/api'
import {base,process,store} from "../public/port"
import BScroll from 'better-scroll'
import betDialog from '../../views/betList/bet'
import betMixDialog from '../../views/betList/synthesize'
import Util from '../util/util'
import Timer from '@/components/Timer.vue'
export default{
  components: {
    'my-footer': MyFooter,betDialog,betMixDialog,
    'my-header': MyHeader,
    Tab,
    TabItem,
    Cell,
    CellBox,
    Selector,
    Scroller,
    Group,
    PopupRadio,
    Timer,
  },
  data () {
    return {
      showChooseMore: false,
      ballType: 'TYZQ',
      ballActive: null,
      betHelpDialogShow: false,
      defaultValue: 'time',
      defaultValue2: '',
      ballTabList: [{key: 'time', value: '时间排序'}, {key: 'league', value: '联赛排序'}],
      //ballTabList2: [{key: '', value: '全部时间'}, {key: 'future', value: '未来'}],
      ballList: [],
      clirdShow: true, //子组件联赛折叠用
      timeCalculation: true, //时间组件重新计数
      userMix: [],
      timer1: null,
      initData:true, //初始化状态 （如果是则不请求matchesSum）
      bottom:0,//今日早盘综合过关高度问题
    }
  },
  methods: {
    onResultChange1: function (val) {
      this.betHelpDialogShow = val
    },
    clickBall (gameType, key, cnName,enName) {
      this.defaultValue2 = '';
      store.state.ballName.cnName = cnName;
      store.state.ballName.enName = enName;
      base.methods.changeBall(gameType);
    },
    sortMatchs (val) {
      if('time'===val){
        store.state.sort = '1';
      }else{
        store.state.sort = '0';
      }
      base.methods.getMatches(true);
    },
    sortTimeMatchs (val) {
      store.state.startTime = val;
      base.methods.getMatches(true);
    },
    //综合过关
    singleOrClearance (index) {
      process.setOddsChangeTag(store.state.baseParam.isMix);
      base.methods.updBaseParam(store.state.baseParam.gameType, index);
      base.methods.getMatches(true);
    },
    toBetList () {
      store.state.is_mix_showModal = true;
      store.state.is_showModal = false;
    },
  },
  computed: {
    ballTabList2(){
      let ballTabList2= [{key: '', value: '全部时间'}, {key: 'future', value: '未来'}];
      let timeArr = store.state.baseParam.isMix + '' === '1' ? Util.getWeekTime() : Util.getWeekTime(1, 9).splice(1, 7)
      timeArr.splice(0, 0, ballTabList2[0])
      timeArr.splice(timeArr.length, 0, ballTabList2[ballTabList2.length - 1])
      return timeArr;
    },
    //获取选中高亮
    getActive() {
      return store.state.active.gameType;
    },
    //获取所有球类数据
    gameData() {
      return store.state.topData;
    },
  gameType(){
      return store.state.baseParam.gameType;
    },
   dateType(){
      return store.state.baseParam.dateType;
    },
    isMix:{
      get(){
        if(store.state.baseParam.isMix == '1' && process.getNewOddsParams().length > 0){
          this.bottom = 64;
        }else {
          this.bottom = 0;
        }
        return store.state.baseParam.isMix;
      },
      set(){

      }

    },
    is_mix_showModal:{
      get: function () {
        if(store.state.baseParam.isMix == '1' && process.getNewOddsParams().length > 0){
          this.bottom = 64;
        }else {
          this.bottom = 0;
        }
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
        return process.getNewOddsParams().length;
      }
    },
    clearanceIsShow() {
      let charge = process.resetOddsConditons(store.state.baseParam,'1');
      return charge;
    },
    championIsShow(){
      let charge = process.resetOddsConditons(store.state.baseParam,'2');
      return charge;
    },
    ballName:{
      get: function () {
        return store.state.ballName;
      },
    },
    chargeMixOrChampion:{//玩法的openitem,禁止下载、维护和禁用
      get:function () {
        return store.state.chargeMixOrChampion;
      },
    },
  },
  mounted () {
    base.methods.teamNameRolling(this);
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      })
    })
  },
  destroyed(){
    window.clearInterval(this.timer1);
  }
}
