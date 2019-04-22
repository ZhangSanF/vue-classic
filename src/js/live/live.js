/* eslint-disable no-unused-vars,no-multi-spaces,spaced-comment,quotes,camelcase */
import {Tab, TabItem, Scroller, Cell, CellBox} from 'vux'
import {MyFooter, MyHeader,FootBall} from '../../router/api'
import betDialog from '@/views/betList/bet'
import {store, base, router} from '../public/port'
import BScroll from 'better-scroll'
import Timer from '@/components/Timer.vue'
export default {
  components: {
    'my-footer': MyFooter,betDialog,
    'my-header': MyHeader,
    'foot-ball': FootBall,
    Tab,
    TabItem,
    Scroller,
    Cell,
    CellBox,
    Timer,
  },
  data () {
    return {
      ballList: [],
      pageNo: '1',
      clirdShow: true, //子组件联赛折叠用
      timeCalculation: true ,//时间组件重新计数
      timer1: null,
      isMask:false
    }
  },
  methods: {
    clickBall (gameType, key, cnName,enName) {
      store.state.ballName.cnName = cnName;
      store.state.ballName.enName = enName;
      base.methods.changeBall(gameType);
    },
    onResultChange1: function (val) {
      //this.$vux.loading.show();
      this.betHelpDialogShow = val
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
    is_showModal:{
      get: function () {
        return store.state.is_showModal;
      },
      set: function (newValue) {
        store.state.is_showModal = newValue;
      }
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
    store.state.active.gameType['TYZQ'] = true;
    base.methods.teamNameRolling(this);
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
