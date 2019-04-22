import {store, base, process,tools} from "./port";
import Util from "../util/util";
import Router from "../../router";

export default{
    data: {
        WPBallData: [], //网球排球让球数据
        mixClass: {
          '0': {
            'TYZQ': [],
            'TYLM': [],
            'TYBQ': [],
            'TYWQ': [],
            'TYPQ': [],
            'TYQT': []
          },
          '2': {
            'TYZQ': [],
            'TYLM': [],
            'TYBQ': [],
            'TYWQ': [],
            'TYPQ': [],
            'TYQT': []
          }
        },
      leagueNames: new Map()
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
    ballKinds_process: function (data) {
        // let ballData = data.result;
        let ballKinds = data;
        let curLanguage = base.methods.getLanguage();
        for (let i in ballKinds) {
            ballKinds[i].msgNum = ballKinds[i].size;
            // ballKinds[i].name = ballKinds[i].cnName;
            if (curLanguage == 'en')
              ballKinds[i].name = ballKinds[i].enName;
            else if (curLanguage == 'zhCHT')
              ballKinds[i].name = ballKinds[i].twName;
            else
              ballKinds[i].name = ballKinds[i].cnName;
            switch (ballKinds[i].category) {
                case 'TYZQ':
                    ballKinds[i].ballClass = 'iconfont icon-zuqiu ';
                    break;
                case 'TYLM':
                    ballKinds[i].ballClass = 'iconfont icon-lanqiu ';
                    break;
                case 'TYWQ':
                    ballKinds[i].ballClass = 'iconfont icon-wangqiu ';
                    break;
                case 'TYBQ':
                    ballKinds[i].ballClass = 'iconfont icon-bangqiu ';
                    break;
                case 'TYPQ':
                    ballKinds[i].ballClass = 'iconfont icon-paiqiu ';
                    break;
                case 'TYQT':
                    ballKinds[i].ballClass = 'iconfont icon-qita ';
                    break;
                case 'TYYM':
                    ballKinds[i].ballClass = 'iconfont icon-yumao ';
                    break;
                case 'TYPP':
                    ballKinds[i].ballClass = 'iconfont icon-pingpangqiu ';
                    break;
                case 'TYSK':
                    ballKinds[i].ballClass = 'iconfont icon-siluoke ';
                    break;
            }
        }
        store.commit("ballKinds", ballKinds);
    },

    getGamePlayObj: function (data) {
        if (!Util.isEmptyObject(data.result) &&  Util.isNotEmpty(data.result)) {
            let gamePlayObj = Util.arrObjToMap(data.result, 'gamePlayId')
            store.commit("get_gamePlayObj", gamePlayObj);
        }
    },
    getGamePlayObj2:function(data,baseParam){
      if (!Util.isEmptyObject(data.result.openItem) &&  Util.isNotEmpty(data.result.openItem)) {
        store.commit("get_gamePlayObj", data.result.openItem[baseParam.gameType]["1"]);
        this.setPlayTable(data,baseParam);
      }
    },
  //处理综合过关及冠军赛的展示判断
  setPlayTable:function(data,baseParam){
    let chargeMixOrChampion = store.state.chargeMixOrChampion;
    let isMix = false;
    let isChampion = false;
    if(chargeMixOrChampion) {
      switch (baseParam.gameType) {
        case "TYZQ":
          let jsonMixOrChampion = chargeMixOrChampion["TYZQ"]["3"];
          if (baseParam.dateType != '1') {
            if (jsonMixOrChampion['3070000']!==null && jsonMixOrChampion['3070000']!==undefined) {
              isMix = true;
            }
            if (jsonMixOrChampion['3090000']) {
              isChampion = true;
            }
          }
          break;
        case "TYLM":
          let jsonMixOrChampion2 = chargeMixOrChampion["TYLM"]["3"];
          if (baseParam.dateType != '1') {
            if (jsonMixOrChampion2['3170000']!==null && jsonMixOrChampion2['3170000']!==undefined) {
              isMix = true;
            }
            if (jsonMixOrChampion2['3190000']) {
              isChampion = true;
            }
          }
          break;
        case "TYWQ":
          let jsonMixOrChampion3 = chargeMixOrChampion["TYWQ"]["3"];
          if (baseParam.dateType != '1') {
            if (jsonMixOrChampion3['3240000']!==null && jsonMixOrChampion3['3240000']!==undefined) {
              isMix = true;
            }
            if (jsonMixOrChampion3['3290000']) {
              isChampion = true;
            }
          }
          break;
        case "TYPQ":
          let jsonMixOrChampion4 = chargeMixOrChampion["TYPQ"]["3"];
          if (baseParam.dateType != '1') {
            if (jsonMixOrChampion4['3340000']!==null && jsonMixOrChampion4['3340000']!==undefined) {
              isMix = true;
            }
            if (jsonMixOrChampion4['3350000']) {
              isChampion = true;
            }
          }
          break;
        case "TYBQ":
          let jsonMixOrChampion5 = chargeMixOrChampion["TYBQ"]["3"];
          if (baseParam.dateType != '1') {
            if (jsonMixOrChampion5['3430000']!==null && jsonMixOrChampion5['3430000']!==undefined) {
              isMix = true;
            }
            if (jsonMixOrChampion5['3490000']) {
              isChampion = true;
            }
          }
          break;
        case "TYQT":
          let jsonMixOrChampion6 = chargeMixOrChampion["TYQT"]["1"];
          if (baseParam.dateType != '1') {
            if (jsonMixOrChampion6['3530000']!==null && jsonMixOrChampion6['3530000']!==undefined) {
              isMix = true;
            }
            if (jsonMixOrChampion6['3590000']) {
              isChampion = true;
            }
          }
          break;
        case "TYYM":
          let jsonMixOrChampion7 = chargeMixOrChampion["TYYM"]["3"];
          if (baseParam.dateType != '1') {
            if (jsonMixOrChampion7['3630000']!==null && jsonMixOrChampion7['3630000']!==undefined) {
              isMix = true;
            }
            /* if(data.result.bets['3190000']){

             }*/
          }
          break;
        case "TYSK":
          let jsonMixOrChampion8 = chargeMixOrChampion["TYSK"]["3"];
          if (baseParam.dateType != '1') {
            /*  if(data.result.bets['3170000']){

              }*/
            if (jsonMixOrChampion8['3730000']!==null) {
              isChampion = true;
            }
          }
          break;
        case "TYPP":
          let jsonMixOrChampion9 = chargeMixOrChampion["TYPP"]["3"];
          if (baseParam.dateType != '1') {
            if (jsonMixOrChampion9['3830000']!==null && jsonMixOrChampion9['3830000']!==undefined) {
              isMix = true;
            }
            /* if(data.result.bets['3190000']){

             }*/
          }
          break;
      }
    }
    let  playTabList =[];
    let single ={label:'让球&大小', name:'size', isMix:'0'};
    //排球叫让局，网球叫让盘
    if(baseParam.gameType === 'TYPQ'){
      single ={label:'让局&大小', name:'size', isMix:'0'};
    }else if(baseParam.gameType === 'TYWQ'){
      single ={label:'让盘&大小', name:'size', isMix:'0'};
    }
    playTabList.push(single);
    if(isMix){
      let mix = {label:'综合过关', name:'reach', isMix:'1'};
      playTabList.push(mix);
    }
    if(isChampion){
      let champion = {label:'冠军', name:'champion', isMix:'2'};
      playTabList.push(champion);
    }
    store.state.playTabList = playTabList;
  },

  //处理综合过关及冠军赛的查询
  resetOddsConditons:function(baseParam,isMix){
    switch (baseParam.gameType){
      case "TYZQ":
        if(baseParam.dateType!='1'){
          if(isMix =='1' ){
            return this.getMixAndChapion(baseParam.gameType,'3070000');
          }else if(isMix =='2'){
            return this.getMixAndChapion(baseParam.gameType,'3090000');
          }else{
            return false;
          }
        }
        break;
      case "TYLM":
        if(baseParam.dateType!='1'){
          if(isMix ==='1'){
            return this.getMixAndChapion(baseParam.gameType,'3170000');
          }else if(isMix ==='2'){
            return this.getMixAndChapion(baseParam.gameType,'3190000');
          }else{
            return false;
          }
        }
        break;
      case "TYWQ":
        if(baseParam.dateType!='1'){
          if(isMix ==='1'){
            return this.getMixAndChapion(baseParam.gameType,'3240000');
          }else if(isMix ==='2'){
            return this.getMixAndChapion(baseParam.gameType,'3290000');
          }else{
            return false;
          }
        }
        break;
      case "TYPQ":
        if(baseParam.dateType!='1' ){
          if(isMix ==='1'){
            return this.getMixAndChapion(baseParam.gameType,'3340000');
          }else if(isMix ==='2'){
            return this.getMixAndChapion(baseParam.gameType,'3350000');
          }else{
            return false;
          }
        }
        break;
      case "TYBQ":
        if(baseParam.dateType!='1'){
          if(isMix ==='1'){
            return this.getMixAndChapion(baseParam.gameType,'3430000');
          }else if(isMix ==='2'){
            return this.getMixAndChapion(baseParam.gameType,'3490000');
          }else{
            return false;
          }
        }
        break;
      case "TYQT":
        if(baseParam.dateType!='1'){
          if(isMix ==='1'){
            return this.getMixAndChapion(baseParam.gameType,'3530000');
          }else if(isMix ==='2'){
            return this.getMixAndChapion(baseParam.gameType,'3590000');
          }else{
            return false;
          }
        }
        break;
      case "TYYM":
        if(baseParam.dateType!='1'){
          if(isMix ==='1'){
            return this.getMixAndChapion(baseParam.gameType,'3630000');
          }else{
            return false;
          }
        }
        break;
      case "TYSK":
        if(baseParam.dateType!='1' ){
          if(isMix ==='1'){
            return this.getMixAndChapion(baseParam.gameType,'3730000');
          }else{
            return false;
          }
        }
        break;
      case "TYPP":
        if(baseParam.dateType!='1' ){
          if(isMix ==='1'){
            return this.getMixAndChapion(baseParam.gameType,'3830000');
          }else{
            return false;
          }
        }
        break;
    }
  },
  getMixAndChapion(gameType,playId){
    let dateType =  store.state.baseParam.dateType;
    let allPlayCharge = store.state.allPlayCharge;
    let jsonMixOrChampion = allPlayCharge[dateType][gameType]["3"];
    let MixOrChampion = JSON.stringify(jsonMixOrChampion).indexOf(playId);
    if(MixOrChampion==-1){
      return false;
    }
    return true;
  },
    goToPlayMaintenance(){
      Router.push({path : '/update/siteUpdate'})
    },
  goAreaLimit(){
    Router.push({path : '/update/areaLimit'})
  },

    playTypeIsShow(data){
        let dateType = store.state.baseParam.gameType;
        this[dateType + 'PlayIsShow'](data.result.data)//字符串拼接掉球类方法
    },
    TYZQPlayIsShow(obj) { //足球判断玩法是否展示
        let ob = this.BallPlayIsShow()
        for (let i in obj) {
            let item = obj[i]
            ob.isqcrq[i] = Util.isNotEmpty(item.a_concede_h, item.a_concede_g)
            ob.isbcrq[i] = Util.isNotEmpty(item.u_concede_h, item.u_concede_g)
            ob.isqcdx[i] = Util.isNotEmpty(item.a_d_num, item.a_x_num)
            ob.isbcdx[i] = Util.isNotEmpty(item.u_d_num, item.u_x_num)
            ob.isds[i] = Util.isNotEmpty(item.a_d_odds, item.a_s_odds)
            ob.isdy[i] = Util.isNotEmpty(item.a_capot_h, item.a_capot_g)
            ob.isbcdy[i] = Util.isNotEmpty(item.u_capot_h, item.u_capot_g)
            ob.isbcbd[i] = Util.isNotEmpty(item.footballHalfCorrect)
            ob.isbd[i] = Util.isNotEmpty(item.footballCorrect)
            ob.iszjq[i] = Util.isNotEmpty(item.footballGoals)
            ob.isbqc[i] = Util.isNotEmpty(item.footballHta)
            //  this.addggSelectClass(that, item)
        }
        this.arrayAllisTrue(ob)
    },
    TYLMPlayIsShow(obj, that) { //篮球判断玩法是否展示
        let ob = this.BallPlayIsShow()
        for (let i in obj) {
            let item = obj[i]
            ob.isdy[i] = Util.isNotEmpty(item.capot_h, item.capot_g)
            ob.isqcrq[i] = Util.isNotEmpty(item.concede_h, item.concede_g)
            ob.isqcdx[i] = Util.isNotEmpty(item.d_num, item.x_num)
            ob.isqddfz[i] = Util.isNotEmpty(item.ior_OUHO, item.ior_OUHU)
            ob.isqddfk[i] = Util.isNotEmpty(item.ior_OUCO, item.ior_OUCU)
            //this.addggSelectClass(this, item)
        }
        this.arrayAllisTrue(ob)
    },
    TYBQPlayIsShow(obj) { //棒球判断玩法是否展示
        let ob = this.BallPlayIsShow()
        for (let i in obj) {
            let item = obj[i]
            ob.isqcrq[i] = Util.isNotEmpty(item.dIorRH, item.dIorRC)
            ob.isqcdx[i] = Util.isNotEmpty(item.dIorOUH, item.dIorOUC)
            ob.isds[i] = Util.isNotEmpty(item.dIorEOO, item.dIorEOE)
            ob.isdy[i] = Util.isNotEmpty(item.dIorMH, item.dIorMC)
            ob.isbcdx[i] = Util.isNotEmpty(item.ior_HOUH, item.ior_HOUC)
            ob.isbcrq[i] = Util.isNotEmpty(item.ior_HRH, item.ior_HRC)
            ob.isbcdy[i] = Util.isNotEmpty(item.ior_HMH, item.ior_HMC)
            //this.addggSelectClass(this, item)
        }
        this.arrayAllisTrue(ob)
    },
    TYWQPlayIsShow(obj) { //网球判断玩法是否展示
        let ismix = Number.parseInt(this.isMix) !== 0
        let ob = this.BallPlayIsShow()
        try {
            for (let i in obj) {
                let item = obj[i]
                ob.isqcrq[i] = Util.isNotEmpty(item.dIorRH, item.dIorRC)
                ob.isdy[i] = Util.isNotEmpty(item.dIorMH, item.dIorMC)
                ob.isqcdx[i] = Util.isNotEmpty(item.dIorOUH, item.dIorOUC)
                ob.isqddfz[i] = Util.isNotEmpty(item.ior_OUHO, item.ior_OUHU)
                ob.isqddfk[i] = Util.isNotEmpty(item.ior_OUCO, item.ior_OUCU)
                this.WPaddShow(obj[i], i)
                //this.addggSelectClass(that, item)
            }

        } catch (e) {
            console.log(e, 'BallData', obj)
        }
        try {
            let arr = [], arr1 = [], data = obj.concat()
            for (let k = 0; k < data.length - 1; k++) {
                if (data[k].hteam === data[k + 1].hteam) {
                    if (ismix) {
                        data[k]['ggSelect' + data[k].id + 'zr'] = data[k]['ggSelect' + data[k + 1].id + 'zr'] =
                            data[k]['ggSelect' + data[k].id + 'kr'] = data[k]['ggSelect' + data[k + 1].id + 'kr'] = false
                        //   this.addSelectClass(this, data[k])
                    }
                    arr1.push(data[k], data[k + 1])
                    arr1['hteam'] = data[k].hteam
                    arr1['showContent'] = 'showContent2' + k
                    arr1['maxHeight'] = {
                        slide: true,
                        animate: true
                    }
                    arr.push(arr1);
                    arr1 = [];
                }
            }
            this.WPBallData=[...arr];
            store.commit("add_WPBallData",[...arr]);
        } catch (e) {
            console.log(e, 'WPBallData', this.WPBallData);
        }
        this.arrayAllisTrue(ob);
    },
    TYPQPlayIsShow(obj) { //排球判断玩法是否展示
        let ob = this.BallPlayIsShow()
        for (let i in obj) {
            let item = obj[i]
            ob.isqcrq[i] = Util.isNotEmpty(item.dIorRH, item.dIorRC)
            ob.isqcdx[i] = Util.isNotEmpty(item.dIorOUH, item.dIorOUC)
            ob.isdy[i] = Util.isNotEmpty(item.dIorMH, item.dIorMC)
            ob.isqddfz[i] = Util.isNotEmpty(item.ior_OUHO, item.ior_OUHU)
            ob.isqddfk[i] = Util.isNotEmpty(item.ior_OUCO, item.ior_OUCU)
            this.WPaddShow(obj[i], i);
            // this.addggSelectClass(this, item)
        }
        this.arrayAllisTrue(ob)
    },
    TYQTPlayIsShow(obj) { //其他判断玩法是否展示
        let ob = this.BallPlayIsShow()
        for (let i in obj) {
            let item = obj[i]
            ob.isqcrq[i] = Util.isNotEmpty(item.dIorRH, item.dIorRC)
            ob.isqcdx[i] = Util.isNotEmpty(item.dIorOUH, item.dIorOUC)
            ob.isds[i] = Util.isNotEmpty(item.dIorEOO, item.dIorEOE)
            ob.isdy[i] = Util.isNotEmpty(item.dIorMH, item.dIorMC)
            //  this.addggSelectClass(this, item)
        }
        this.arrayAllisTrue(ob)
    },
    arrayAllisTrue: function (obj) {
        for (let vle in obj) {
            let v = obj[vle]
            for (let i = 0; i < v.length - 1; i++) {
                v[i + 1] = v[i] || v[i + 1]
            }
            obj[vle] = v[v.length - 1]
        }
        store.commit("add_PalyTypeIsShwo",obj)
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
    setPlayMaintenance(data){
        let playMaintenance={
            title:'玩法维护',
            question_reason:'0',
            content:'',
            content_time_before:'预计将会在',
            endTime:Util.formatDate.UnixToDate(data.result,0,'yMDhms'),
            content_time_after:'完成，感谢您的耐心等待',
        }
        store.commit("add_playMaintenance",playMaintenance);
    },

    //跳转到暂无数据
    setNoData(){
        let playMaintenance={
            title:'暂无数据',
            question_reason:'3',
            content:'',
            content_time_before:'',
            content_time:'',
            content_time_after:'',
        }
        store.commit("add_playMaintenance",playMaintenance);
    },

    //处理投注历史
    betRecordProcess(data){
        let resolved_order = [];         //初始化已结算数据
        let rs = data.result.data;
        let len = rs.result.length;
        let all_data_len = rs.paging.totalCount;
        let ballTabList = [{key: '', value: '所有球类'}];
        let futureDateList=[{key: '', value: '所有日期'}];
        if(data.code === '200' && len > 0){
          //循环获取筛选的球类
          if(data.result.gameId.length>0){
            for(var i=0;i<data.result.gameId.length;i++){
              var gameId=data.result.gameId[i].gameId;
              switch (gameId){
                case 'TYZQ':
                  ballTabList = ballTabList.concat([{key: 'TYZQ', value: '足球'}]);
                  break;
                case 'TYLM':
                  ballTabList = ballTabList.concat([{key: 'TYLM', value: '篮球&美式足球'}]);
                  break;
                case 'TYWQ':
                  ballTabList = ballTabList.concat([{key: 'TYWQ', value: '网球'}]);
                  break;
                case 'TYPQ':
                  ballTabList = ballTabList.concat([{key: 'TYPQ', value: '排球'}]);
                  break;
                case 'TYBQ':
                  ballTabList = ballTabList.concat([{key: 'TYBQ', value: '棒球'}]);
                  break;
                case 'TYQT':
                  ballTabList = ballTabList.concat([{key: 'TYQT', value: '其他'}]);
                  break;
                case 'TYYM':
                  ballTabList = ballTabList=myArray.concat([{key: 'TYYM', value: '羽毛球'}]);
                  break;
                case 'TYSK':
                  ballTabList = ballTabList.concat([{key: 'TYSK', value: '斯诺克&台球'}]);
                  break;
                case 'TYPP':
                  ballTabList = ballTabList.concat([{key: 'TYPP', value: '乒乓球'}]);
                  break;
              }
            }
          }
            //循环获取筛选的日期
          if(data.result.dateId.length>0){
            for(var i=0;i<data.result.dateId.length;i++){
              var dateId = data.result.dateId[i].startDate;
              if(dateId==new Date().Format("yyyy-MM-dd")){
                futureDateList= futureDateList.concat([{key: dateId, value: '今日'}]);
              }else{
                futureDateList= futureDateList.concat([{key: dateId, value: dateId}]);
              }

            }

          }

          if(rs.paging.pageNumber===1){
            resolved_order = rs.result;
          }else{
            resolved_order = store.state.resolved_data;
            resolved_order = resolved_order.concat( rs.result);
          }
        }else {
            //跳转到暂无数
            this.setNoData();
        }

        store.commit('add_betRecord_data', {
                resolved_data: resolved_order,
                unres_data_len: all_data_len,
                ballTabList:ballTabList,
                futureDateList:futureDateList,
        });
    },
    getData() {
      if(!store.state.timerFresh){
        //不是赛事赔率页面不用定时刷新赔率
        return;
      }
      let systemMainCode = store.state.systemMainCode;
      if(systemMainCode=='D000'){
        //系统维护时，发起系统维护的请求
        base.methods.systemMainThread();
      }
      let isMore = store.state.isMore;
      let refreshStatus = store.state.refreshStatus;
      if (!isMore && refreshStatus ) {
        base.methods.getMatches(false);
      }else if(isMore && refreshStatus){
        let params = store.state.moreParams;
        base.methods.getMorePlay(params, false);
      }

    },
  underlineWidths:function () {
    let playTabList = store.state.playTabList;
    if(playTabList.length===1){
      return "100%"
    }else if(playTabList.length===2){
      return "50%"
    }else if(playTabList.length===3){
      return "33.33%"
    }
  },
  chargeMixOrChampion:function (data) {
    // let datar = data.result.openItem;
    store.commit("setChargeMixOrChampion",data);
  },

  //赛事排序
  sortData(data, league) {
    let copy = {}
    let keys = Object.keys(data)
    league.map(x => {
      keys.map(y => {
        if (x.name === y) copy[y] = data[y]
      })
    })
    return copy
  },

  //构造赛事
  filterData: function (data, league) { //过滤添加排序
    let mixClass
    let baseParam = store.state.baseParam;
    if (baseParam.dateType !== '1') {
      mixClass = this.data.mixClass[baseParam.dateType][baseParam.gameType]
    }

   // data = this.sortData(data, league)

    let number = 0

    let animate = baseParam.dateType + '' === '1'
    let copyObj = {}
    for (let i in data) {
      for (let k in data[i]) {
        if (!Number.isNaN(Number.parseInt(k))) {
          let item = data[i][k]
          if (baseParam.isMix + '' === '1') {
            item[item.id + 'zr'] = false
            item[item.id + 'kr'] = false
            if (baseParam.gameType === 'TYWQ' || baseParam.gameType === 'TYPQ') {
              item[item.id + 'dyz'] = false
              item[item.id + 'dyk'] = false
            } else {
              item[item.id + 'dxqd'] = false
              item[item.id + 'dxqx'] = false
            }
            for (let j in mixClass) {
              let arr1 = mixClass[j]
              for (let h in arr1) {
                if (h === item.onlykey) {
                  for (let o in arr1[h]) {
                    item[o] = true
                  }
                }
              }
            }
          }
        }
      }
      let maxHeight = store.state.leagueNames.get(i)
      copyObj[i] = []
      if (maxHeight !== undefined && maxHeight !== null && maxHeight.animate === true) {
        copyObj[i] = [...data[i]]
      }
      copyObj[i].showContent = data[i].showContent = "showContent" + number++
      copyObj[i].maxHeight = data[i].maxHeight = maxHeight === undefined ? {slide: true, animate: animate} : maxHeight
      copyObj[i].sum = data[i].sum = data[i].length
    }


    this.data.copyMsg = data
    this.data.matchesMsg = baseParam.dateType + '' === '1' ? data : copyObj;
    store.commit('add_datas',this.data.matchesMsg);
    store.commit('setCopyMsg',this.data.copyMsg);
  },

  //构造联赛赛事
  filterLeagueData: function (data) { //过滤添加排序
    let copyObj = {}
    let number = 0
    for (let i in data) {
      copyObj[i].showContent  = "showContent" + number++
    }
    store.commit('add_league_data',copyObj);
  },

  childShowTitle: function (clirdShow, e, that) {
    let data = store.state.datas;
    let copyMsg = store.state.copyMsg;
    for (let i in data) {
      if (data[i]['showContent'] === e) {
        if (store.state.baseParam.dateType + '' === '1') {
          data[i]['maxHeight'].animate = !data[i]['maxHeight'].animate
        } else {
          copyMsg[i]['maxHeight'].animate = data[i]['maxHeight'].animate = !data[i]['maxHeight'].animate
          data[i] = copyMsg[i]
        }
        store.state.leagueNames.set(i, data[i]['maxHeight'])
        break
      }
    }
    store.commit("add_datas",data);
    that.clirdShow = clirdShow
  },

  goToMorePlay(data){
    let curParmas = store.state.params;
    let moreParams={
      dateType: curParmas.dateType,
      gameType:curParmas.gameType,
      isMix:curParmas.isMix,
      type:curParmas.type,
      league:data.leagueId+'',
      onlykey:data.onlykey,
      playType: curParmas.playType,
      pageNo: '1',
      plate:base.methods.getPlate(),
      Live:'1',
      sort:store.state.sort,
    };
    store.commit("add_moreParams",moreParams);
    // store.state.isMore = true;
    base.methods.getMorePlay(moreParams,true);
    // Router.push({path: '/more'+curParmas.gameType});
    //跳转路由
  },
  //左侧菜单数据改造处理
  bindleftMenuData: function (data) {
    data.map((x, i) => {
      x.showContent = "showContent" + i;
      x.categoryList.map((v,j)=> {
        switch (v.category) {
          case "TYZQ":
            v.class = "rs-football";
            v.number = x.ft;
            break;
          case "TYLM":
            v.class = "rs-basketball";
            v.number = x.bk;
            break;
          case "TYBQ":
            v.class = "rs-baseball";
            v.number = x.bs;
            break;
          case "TYWQ":
            v.class = "rs-tennis";
            v.number = x.tn;
            break;
          case "TYPQ":
            v.class = "rs-volleyball";
            v.number = x.vb;
            break;
          case "TYQT":
            v.class = "rs-other";
            v.number = x.op;
            break;
          case "TYYM":
            v.class = "rs-badminton";
            v.number = x.bm;
            break;
          case "TYSK":
            v.class = "rs-snooker";
            v.number = x.sk;
            break;
          case "TYPP":
            v.class = "rs-tabletennis";
            v.number = x.tt;
            break;
        }
      })
    });
    let leftData = new Array();
    leftData.push(data[1],data[0],data[2]);
    store.commit("setLeftData",leftData);
  },
  handleResultData(resultData){
    for (let i in resultData) {
      resultData[i].showContent = "showContent" + resultData[i].leaId;
      resultData[i].animate = true;
    }
    return resultData;
  },
  setMaintenancePlayNum(baseParam){
      //首先后去到缓存的openItem
    let typeSum = store.state.typeSumData;
    //修改里面的值
    let dateTypeData = typeSum[baseParam.dateType];
    for(let v in dateTypeData){
      if(dateTypeData[v].category===baseParam.gameType){
        dateTypeData[v].size = 0;
      }
    }
  },
  chargePlate(data){
    if(data.result && data.result.plate) {
      let plateSwitch = data.result.plate.plateSwitch;
      if (plateSwitch) {
        //自动设置盘口
        let newPlate = data.result.plate.first;
        base.methods.setPlate(newPlate);
        //弹出提示
        store.state.infoMsg = data.result.plate.message;
        setTimeout(() => {
          tools.showMessege(store.state.infoMsg);
        }, 50)
      }
    }
  },
  newOddsChargePlate(data){
    if(data.result) {
      let plateSwitch = data.result[0].plateInfo.plateSwitch;
      if (plateSwitch) {
        //自动设置盘口
        let newPlate = data.result[0].plateInfo.first;
        base.methods.setPlate(newPlate);
        //弹出提示
        store.state.infoMsg = data.result[0].plateInfo.message;
        store.state.toasting = true;
        setTimeout(() => {
          store.state.toasting = false;
        }, 3000)
      }
    }
  },
  getNewOddsParams(){
    let newOddsParams = [];
    let gameType = store.state.baseParam.gameType;
    switch (gameType){
      case "TYZQ":
        newOddsParams = store.state.zqOddsParams;
        break;
      case "TYLM":
        newOddsParams = store.state.lmOddsParams;
        break;
      case "TYWQ":
        newOddsParams = store.state.wqOddsParams;
        break;
      case "TYPQ":
        newOddsParams = store.state.pqOddsParams;
        break;
      case "TYBQ":
        newOddsParams = store.state.bqOddsParams;
        break;
      case "TYQT":
        newOddsParams = store.state.qtOddsParams;
        break;
    }
    return newOddsParams;
  },
  setSysFreqParams(data){
    if(data.result.liveFreq>0 && data.result.liveFreq !=null)
      store.state.sysFreqParams.liveFreq = data.result.liveFreq/1000;
    if(data.result.todayFreq>0 && data.result.todayFreq !=null)
      store.state.sysFreqParams.todayFreq = data.result.todayFreq/1000;
    if(data.result.morningFreq>0 && data.result.morningFreq !=null)
      store.state.sysFreqParams.morningFreq = data.result.morningFreq/1000;
    if(data.result.hotFreq>0 && data.result.hotFreq !=null)
      store.state.sysFreqParams.hotFreq = data.result.hotFreq/1000;
    if(data.result.noticeFreq>0 && data.result.noticeFreq !=null)
      store.state.sysFreqParams.noticeFreq = data.result.noticeFreq/1000;
    if(data.result.betFreq>0 && data.result.betFreq !=null)
      store.state.sysFreqParams.betFreq = data.result.betFreq/1000;
    if(data.result.playMFreq>0 && data.result.playMFreq !=null)
      store.state.sysFreqParams.playMFreq = data.result.playMFreq/1000;
    if(data.result.systemMFreq>0 && data.result.systemMFreq !=null)
      store.state.sysFreqParams.systemMFreq = data.result.systemMFreq/1000;
    if(data.result.mixFreq>0 && data.result.mixFreq !=null)
      store.state.sysFreqParams.mixFreq = data.result.mixFreq/1000;
    if(data.result.httpTimeout>0 && data.result.httpTimeout !=null)
      store.state.sysFreqParams.httpTimeout = data.result.httpTimeout;
    if(data.result.noticePollNum>0 && data.result.noticePollNum !=null)
      store.state.sysFreqParams.noticePollNum = data.result.noticePollNum;
    if(data.result.chartPollNum>0 && data.result.chartPollNum !=null)
      store.state.sysFreqParams.chartPollNum = data.result.chartPollNum;
  },
  setOddsChangeTag(isMix){
    let oddsTag = store.state.oddsChangeTag;
    oddsTag.oldTag = oddsTag.newTag;
    oddsTag.newTag = isMix;
    store.commit("setOddsChangeTag",oddsTag);
  },
  setSystemMaintance(error){
    store.state.timerFresh = true;
    store.state.is_mix_showModal = false;
    store.state.is_showModal = false;
    store.state.systemMainCode = 'D000';
    let playMaintenance = {
      title: '系统维护中',
      question_reason: '1',
      content: '',
      content_time_before: '预计将会在',
      content_time: error.data.result.beijingEndTime,
      content_time_after: '（GMT+8)完成，感谢您的耐心等待',
    }
    store.commit("add_playMaintenance", playMaintenance);
    //跳转到玩法维护
    this.goToPlayMaintenance();
  },
  setStopVis(){
    store.state.systemMaintanceCode = ''
    store.state.is_showModal = false;
    this.goAreaLimit();
  }
}
