/* eslint-disable quotes,spaced-comment,no-unused-vars,no-redeclare,no-useless-call,key-spacing,one-var,no-labels,no-multi-spaces,operator-linebreak */
import {BScroll} from '../../router/api'
import Util from '../util/util'
import betClassify from '@/components/playType.json'
import {Message} from 'iview'

export default {
  data: {
    showContent001: true,
    showContent002: true,
    showContent003: true,
    showContent004: true,
    showContent005: true,
    showContent006: true,
    showContent007: true,
    showContent008: true,
    showContent009: true,
    showContent010: true,
    showContent011: true,
    BallTitleData: [],
    BallData: [],
    WPBallData: [], //网球排球让球数据
    WPtitleShow: true,
    BallPlayIsShow: {
      isqcrq: [], //全场让球
      isbcrq: [], //半场让球
      isqcdx: [], //全场大小
      isbcdx: [], //半场大小
      isds: [], //单双
      isdy: [], //独赢
      isbcdy: [], //半场独赢
      isbcbd: [], //半场波胆
      isbd: [], //波胆
      iszjq: [], //总进球
      isbqc: [], //半全场
      isjs: [], //局数
      isqddf: [], //球队得分
      isqddfk: [] //球队得分客队
    },
    reqparam: {},
    TYZQ: 'football',
    TYLM: 'basketball',
    TYBQ: 'baseball',
    TYWQ: 'tennis',
    TYPQ: 'volleyball',
    TYQT: 'other',
    betHelpDialogShow: false,
    promptInfo: false,
    nowOddsAndLimit: [],
    host: true, //主队true,客队:false
    betType: betClassify,
    showDetail: true,
    dateType: '',
    qcrq: '', //全场让球
    bcrq: '', //半场让球  首五局让球
    qcdx: '', //全场大小
    bcdx: '', //半场大小 首五局大小
    ds: '', //单双
    dy: '', //独赢
    bcdy: '', //半场独赢
    rf: '', //让分
    zfdx: '', //总分大小 //球员局数 大/小
    dfdx: '', //得分大小
    rp: '', //让盘
    zjsdx: '', //总局数大小
    zkh: '', //主客和
    isWho: '',
    gameType: '',
    playType: '',
    plate: '',
    pageNo: '',
    matId: '', //足球波胆下注使用,
    isMix: '0',
    gamePlayObj: {},
    mixNum: 0,
    showChooseMore: false,
    oldMsg: [],
    newMsg: []
  },
  BallPlayIsShow() {
    return {
      isqcrq: [], //全场让球
      isbcrq: [], //半场让球
      isqcdx: [], //全场大小
      isbcdx: [], //半场大小
      isds: [], //单双
      isdy: [], //独赢
      isbcdy: [], //半场独赢
      isbcbd: [], //半场波胆
      isbd: [], //波胆
      iszjq: [], //总进球
      isbqc: [], //半全场
      isjs: [], //局数
      isqddfz: [], //球队得分主队
      isqddfk: [] //球队得分客队
    }
  },
  /**
   * @return {boolean}
   */
  BallTitleBind(obj, that) {
    if (!Util.isNotEmpty(obj.obj1)) return false
    that.timeObj = obj
    obj.obj1.startTimeStr = Util.formatDate.UnixToDate(obj.obj1.startTime, -12, 'MDhm')
    this.getBallMoreDate(obj, that)
    that.BallTitleData = obj.obj1

  },

  WPaddShow(obj, i) {
    obj.showContent = ['showrq' + i, 'showdx' + i, 'showdy' + i, 'showdfz' + i, 'showdfk' + i]
    obj.maxHeight = [{
      slide: true,
      animate: true
    }, {
      slide: true,
      animate: true
    }, {
      slide: true,
      animate: true
    }, {
      slide: true,
      animate: true
    }, {
      slide: true,
      animate: true
    }]
  },
  showContent(that, e) {
    let arr = that.BallData.concat()
    out:
      for (let i in arr) {
        let item = arr[i]
        for (let k in item['showContent']) {
          if (item['showContent'][k] === e) {
            item['maxHeight'][k]['animate'] = !item['maxHeight'][k]['animate']
            continue out
          }
        }
      }
    that.BallData = arr
  },
  addggSelectClass(that, i) {
    if (Number.parseInt(that.isMix) !== 0) {
      let gType = that.gameType
      let bj = 'ggSelect' + i.id
      i[bj + 'zr'] = i[bj + 'kr'] = i[bj + 'dyz'] = i[bj + 'dyk'] = i[bj + 'dyh'] = false
      if (gType === 'TYWQ' || gType === 'TYPQ' || gType === 'TYLM') {
        i[bj + 'zjsdxd'] = i[bj + 'zjsdxx'] = i[bj + 'zfdxzd'] = i[bj + 'zfdxzx'] = i[bj + 'zfdxkd'] = i[bj + 'zfdxkx'] = false
      } else if (gType === 'TYZQ' || gType === 'TYBQ' || gType === 'TYQT') {
        i[bj + 'dxqd'] = i[bj + 'dxqx'] = i[bj + 'dsd'] = i[bj + 'dss'] = false
      } else if (gType === 'TYBQ' || gType === 'TYZQ') {
        i[bj + 'sbzr'] = i[bj + 'sbkr'] = i[bj + 'sbdyz'] = i[bj + 'sbdyk'] = i[bj + 'sbdyh'] = i[bj + 'sbdxqd'] = i[bj + 'sbdxqx'] = false
      } else if (gType === 'TYZQ') {
        if (Util.isNotEmpty(i.footballHalfCorrect)) { //半场波胆
          i[bj + 'bcbd01'] = i[bj + 'bcbd02'] = i[bj + 'bcbd03'] = i[bj + 'bcbd12'] = i[bj + 'bcbd13'] = i[bj + 'bcbd23'] =
            i[bj + 'bcbd10'] = i[bj + 'bcbd20'] = i[bj + 'bcbd30'] = i[bj + 'bcbd21'] = i[bj + 'bcbd31'] = i[bj + 'bcbd32'] =
              i[bj + 'bcbd00'] = i[bj + 'bcbd11'] = i[bj + 'bcbd22'] = i[bj + 'bcbd33'] = i[bj + 'bcbdother']
        }
        if (Util.isNotEmpty(i.footballCorrect)) { //波胆
          i[bj + 'bd01'] = i[bj + 'bd02'] = i[bj + 'bd03'] = i[bj + 'bd04'] = i[bj + 'bd12'] = i[bj + 'bd13'] = i[bj + 'bd14'] = i[bj + 'bd23'] = i[bj + 'bd24'] = i[bj + 'bd34'] =
            i[bj + 'bd10'] = i[bj + 'bd12'] = i[bj + 'bd13'] = i[bj + 'bd14'] = i[bj + 'bd21'] = i[bj + 'bd31'] = i[bj + 'bd41'] = i[bj + 'bd32'] = i[bj + 'bd42'] = i[bj + 'bd43'] =
              i[bj + 'bd00'] = i[bj + 'bd11'] = i[bj + 'bd22'] = i[bj + 'bd33'] = i[bj + 'bd44'] = i[bj + 'bdother']
        }
        if (Util.isNotEmpty(i.footballGoals)) { //总进球
          i[bj + 'zjq01'] = i[bj + 'zjq23'] = i[bj + 'zjq46'] = i[bj + 'zjq7up'] = false
        }
        if (Util.isNotEmpty(i.footballHta)) { //半全场
          i[bj + 'bcqzz'] = i[bj + 'bcqzh'] = i[bj + 'bcqzk'] =
            i[bj + 'bcqhz'] = i[bj + 'bcqhh'] = i[bj + 'bcqhk'] =
              i[bj + 'bcqkz'] = i[bj + 'bcqkh'] = i[bj + 'bcqkk'] = false
        }
      }
      this.addSelectClass(that, i)
    }
  },
  addSelectClass(that, i) {
    if (Util.isNotEmpty(that.mixData.mixClass)) {
      let mixClass = that.mixData.mixClass[that.dateType][that.gameType].concat()
      for (let j in mixClass) {
        for (let k in mixClass[j]) {
          if (k === i.onlykey) {
            //noinspection LoopStatementThatDoesntLoopJS
            for (let o in mixClass[j][k]) {
              let variable = 'ggSelect' + o
              i[variable] = true
              break
            }
          }
        }
      }
    }
  },
  onResultChange1: function (val, that) {
    that.betHelpDialogShow = val
  },
  selectClass (data, arrObj, clickWho, that) {
    let ggselect = 'ggSelect' + data.id + clickWho
    let index = 0
    for (let i in arrObj) {
      let item = arrObj[i]
      for (let k in item) {
        if (k.indexOf('ggSelect') !== -1) {
          if (k !== ggselect) {
            item[k] = false
          }
          index = i
        }
      }
    }
    data[ggselect] = !data[ggselect]
    let arr = that.BallData.map((x, i) => {
      if (i === index) Object.assign(x, data)
      return x
    })
    that.BallData = [...arr]
    this.addMixData(that, data, data[ggselect], ggselect)
  },
  addMixData(that, data, b, ggselect) {
    if ((that.mixData.mixClass !== undefined) &&
      (that.mixData.mixDataStore !== undefined)) {
      let mixClass = that.mixData.mixClass[that.dateType][that.gameType]
      let mixData = that.mixData.mixDataStore[that.dateType][that.gameType]
      for (let i in mixData) {
        let item = mixData[i]
        for (let l in item) {
          if (item[l] === data.onlykey) {
            mixData.splice(i, 1)
          }
        }
      }
      for (let j in mixClass) {
        for (let k in mixClass[j]) {
          if (k === data.onlykey) {
            mixClass.splice(j, 1)
          }
        }
      }
      if (b) {
        let key = ggselect.split('ggSelect')[1]
        let obj = {}
        obj[key] = true
        let obj2 = {}
        let onlykey = data.onlykey
        obj2[onlykey] = obj
        mixClass.push(obj2)
        mixData.push(data)
      }
      that.mixNum = mixData.length;
    }
  },
  toBetList(that) {
    let data = that.mixData.mixDataStore[that.dateType][that.gameType]
    let params = {
      key1: that.dateType,
      key2: that.gameType,
      data: data,
      url: that.$route.path,
      timeObj: that.timeObj,
      preventGoBack: true
    }
    that.$router.push({path: '/betList', query: {params: params}})
  },

  mounted (that) {
    try {
      that.$refs.myHeader.routerMore();
      that.$refs.myHeader.routerBack(that._data.dateType);
    } catch (e) {
      //console.log(e, 'headerCallback', that.$refs.myHeader, 'this', that)
      // that.$router.push({path:'reload',
      //   query:{url:that.$route.path,
      //     type:that.dateType,
      //     params:{obj1: that.$route.query.params.obj1, obj2: that.$route.query.params.obj2}}})
    }
    that.$nextTick(() => {
      if (Util.isNotEmpty(that.$refs.wrapper)) {
        that.scroll = new BScroll(that.$refs.wrapper, {click: true})
      }
    })
  },
  created (that) {
    let obj = that.$route.query.params;
    if (!Util.isEmptyObject(obj) && Util.isNotEmpty(obj.obj1)) {
      //this.BallTitleBind(obj, that)
      that.timeObj = obj
    }else{
      let data =that.$store.state.odds.moreParams ;
      this.getBallMoreDate(data,that)
    }
    if (that.dateType !== "1" && that.dateType !== '') {
      that.showChooseMore = that.mixData.mixDataStore[that.dateType][that.gameType].length !== 0
    }
    if (!Util.isEmptyObject(that.$route.query.params) && Util.isNotEmpty(that.$route.query.params.obj2)) {
      that._data.dateType = that.$route.query.params.obj2.dateType
    }
  },
  destroyed (that) {
    that.BallData = []
    that.WPBallData = []
    that.newMsg = []
    that.oldMsg = []
  }
}
