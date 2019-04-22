/* eslint-disable camelcase,quotes,spaced-comment */
import { Tab, TabItem, Scroller, Cell, CellBox, Selector, PopupRadio } from 'vux'
import {MyFooter, MyHeader} from '../../router/api'
import betDialog from '@/views/betList/bet'
import betMixDialog from '@/views/betList/synthesize'
import {base,store,process} from "../public/port";
import BScroll from 'better-scroll'
import Timer from '@/components/Timer.vue'
export default{
  components: {
    'my-footer': MyFooter,betDialog,betMixDialog,
    'my-header': MyHeader,
    Tab,
    TabItem,
    Scroller,
    Cell,
    CellBox,
    Selector,
    PopupRadio,
    Timer,
  },
  data () {
    return {
      showChooseMore: false,
      ballTabList: [{key: 'time', value: '时间排序'}, {key: 'league', value: '联赛排序'}],
      defaultValue: 'time',
      ballType: 'TYZQ',
      ballActive: null,
      ballList: [],
      page: '1',
      pageNo: '1',
      clirdShow: true, //子组件联赛折叠用
      timeCalculation: true, //时间组件重新计数
      userMix: [],
      mixNum: '',
      ballTabList2: [{key: '', value: '全部时间'}, {key: 'future', value: '未来'}],
      defaultValue2: '',
      initData:true, //初始化状态 （如果是则不请求matchesSum）
      timer1: null,
      bottom:0,//今日早盘综合过关高度问题
    }
  },
  methods: {
    onResultChange1: function (val) {
      this.betHelpDialogShow = val
    },

    clickBall (gameType, key, cnName,enName) {
      store.state.ballName.cnName = cnName;
      store.state.ballName.enName = enName;
      base.methods.changeBall(gameType);
    },

    singleOrClearance (index) {
      process.setOddsChangeTag(store.state.baseParam.isMix);
      base.methods.updBaseParam(store.state.baseParam.gameType, index);
      base.methods.getMatches(true);
    },
    toBetList () {
      store.state.is_mix_showModal = true;
      store.state.is_showModal = false;
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
      alert(val)
      store.state.sort = '1';
      base.methods.getMatches(true);
    },
  },
  computed: {
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
    isMix(){
      if(store.state.baseParam.isMix == '1' && process.getNewOddsParams().length > 0){
        this.bottom = 64;
      }else {
        this.bottom = 0;
      }
      return store.state.baseParam.isMix;
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
        if(store.state.baseParam.isMix == '1' && process.getNewOddsParams().length > 0){
          this.bottom = 64;
        }else {
          this.bottom = 0;
        }
        return process.getNewOddsParams().length;
      }
    },
    clearanceIsShow() {
      let charge = process.resetOddsConditons(store.state.baseParam,'1')
       return charge;
    },
    championIsShow(){
      let charge = process.resetOddsConditons(store.state.baseParam,'2')
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
    base.methods.teamNameRolling();
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      })
    })
  },
  destroyed(){
    window.clearInterval(this.timer1);
  },
  watch:{
    gameData() {
      return store.state.topData;
    },
  }
}
