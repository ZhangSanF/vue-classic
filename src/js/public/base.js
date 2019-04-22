import {router,store,CONST,tools,storages,process, axios,util} from '../../js/public/port'
import api from '../../js/public/api'
import Bet from '../public/bet'
import mixBet from '../public/mixBet'
import Util from "../util/util";
//用于公共的入口，这个如口是具体功能是：页面发起请求，由这个入口进行统一处理，再与后端台进行交互。
export default {
    methods: {
        //判断是否登陆
        isLogin:function(){
            if(storages.isLogin()){
                return true;
            }
            return false;
        },
        //获取设置语言
        getLanguage: function () {
            let language = "zhCHS"; //默认中文
            let newlanguage = window.localStorage.getItem("language");
            if (newlanguage === undefined || newlanguage === null)
                newlanguage = language;
            return newlanguage;
        },
        //设置语言
        settingLanguage: function (language) {
            if (language != null && language != "") {
                window.localStorage.setItem("language", language);
            }
        },
        //获取盘口
        getPlate: function () {
            let plate = window.sessionStorage.getItem("plate");
            if (plate === null || plate === undefined || plate === '')
                plate = 'H';
            return plate;
        },

        //设置盘口
        setPlate: function (plate) {
            if (plate != null && plate != "") {
                window.sessionStorage.setItem("plate", plate);
            }
        },

        /* 改变球类的玩法导航条 */
        changePlayActiveTab: function(isMix){
            let baseParam = store.state.baseParam;
            baseParam.isMix = isMix+"";
            store.commit('setBaseParam', baseParam);
        },

        /* 球类切换设置 dateType：0今日 1滚球 2早盘 */
        changeBall(gameType){
        //  store.commit("newOddsParams", []);
          store.state.active.gameType={};
          store.state.active.gameType[gameType] = true;
          store.state.baseParam.gameType = gameType;
          let baseParam = store.state.baseParam;
          this.updBaseParam(baseParam.gameType,baseParam.isMix);
          this.getMatches(true);
        },
        /* 更新基础参数值 */
        updBaseParam(gameType, isMix){
            if(gameType == undefined || gameType == null || gameType == '')
                gameType = 'TYZQ';//默认设置为足球
            if(isMix == undefined || isMix == null || isMix == '')
                isMix = '0';//默认设置单式玩法
            let baseParam = store.state.baseParam;
            baseParam.gameType = gameType;
            baseParam.isMix = isMix;
            store.commit('setBaseParam', baseParam);
            store.commit("setPlayType", baseParam);
            return baseParam;
        },

        //得到赔率颜色样式
        getOddsColor(){
            let oddsColor = window.sessionStorage.getItem("oddsCss");
            if (oddsColor === null || oddsColor === undefined || oddsColor === '')
                oddsColor = 'oddsCss1';
            return oddsColor;
        },
        //设置赔率颜色
        setOddsColor(color){
            if (color != null && color != "") {
                window.sessionStorage.setItem("oddsCss", color);
            }
        },

        //================= 公用请求方法 ===================

        //获取球赛,球赛数量
        getGameType:function () {
            let curParams={
                action:'type_sum',
                params: {
                    dateType: store.state.baseParam.dateType,
                    matchType: ''
                }
            }
            api.Axios('post',CONST.PROCESSURL,curParams,function (data) {
                //赛事数量获取成功以后修改in的值
                store.state.init.gameNum = true;
                process.chargePlate(data);
                store.commit('changeInit',store.state.init);
                process.ballKinds_process(data.result);
                process.chargeMixOrChampion(data.result.openItem);
            })
        },

      systemMainThread:function(){
        let curParams={
          action:'result_sum',
          params: {
          }
        }
        api.Axios('post',CONST.PROCESSURL,curParams,function (data) {
             //如果解除系统维护，则返回首页
          let systemMainCode = store.state.systemMainCode;
          if(systemMainCode!='D000'){
            router.push('/live/TYZQ');
          }
        },false)
      },


      //获取所有早盘今日滚球的球类，数量
      getGameTypeSum:function () {
        let curParams={
          action:'result_sum',
          params: {
          }
        }
        api.Axios('post',CONST.PROCESSURL,curParams,function (data) {
          //处理所有玩法，由于点击左侧是判断禁用或者冠军，综合过关等情况
          let dateType = store.state.baseParam.dateType;
          let matchType = data.result.matchAllType;
          store.commit("setTopData",matchType[dateType]);
          process.bindleftMenuData(data.result.matchType);
          store.commit("setAllPlayCharge",data.result.openItem);
          process.chargeMixOrChampion(data.result.openItem[store.state.baseParam.dateType]);
        })
      },

        /**
         * 获取赛事赔率（统一）
         * @param params
         */
        getMatches: function (isGoto) {
          //查询赛事之前，如果是综合过关查询，判断该球类是否有综合过关玩法，及冠军赛玩法，
          //如果没有，则重置为单式玩法查询
          let baseParam = store.state.baseParam;
           if(!process.resetOddsConditons(baseParam,baseParam.isMix)){
              baseParam.isMix = "0";
              store.state.playType = "single";
              store.state.baseParam = baseParam;
              store.commit("setPlayType", baseParam);
            }
          process.setOddsChangeTag(baseParam.isMix);
            let curParams = {
                action:'odds',
                params:  {
                    dateType:baseParam.dateType,
                    isMix:baseParam.isMix+'',
                    gameType:baseParam.gameType,
                    type: store.state.Type,
                    sort:store.state.sort,
                    startTime:store.state.startTime,
                    playType: store.state.playType,
                    pageNum:'1',
                    Live:store.state.Live,
                    plate:this.getPlate(),
                    lsids:store.state.matchesId+'',
                    type_sum:store.state.type_sum
                }
            };
            if (baseParam.dateType != '1') {
                delete curParams.params.Live;
            }
            api.Axios('post', CONST.PROCESSURL, curParams, function(data) {
                store.state.maintanceCode = '';
                store.state.refreshStatus = true;
                store.commit('add_params', curParams.params);
                if(data && data.result){
                  process.chargePlate(data);
                    if(data.code==='D000'){
                        store.state.maintanceCode = data.code;
                        store.state.is_playMaintenance = true;
                        store.commit('add_datas',[]);
                        process.setPlayMaintenance(data);
                        //当玩法维护时，设置当前玩法的数量为0
                        process.setMaintenancePlayNum(baseParam);
                    }else if(data.result.data){
                        store.commit("setTopData",data.result.type_sum[baseParam.dateType]);
                        store.commit("setTypeSumData",data.result.type_sum);
                        store.state.is_playMaintenance = false;
                        process.chargeMixOrChampion(data.result.openItem);
                        process.getGamePlayObj2(data,baseParam);
                        process.ballKinds_process(data.result.type_sum[baseParam.dateType]);
                        store.commit('mixBetLimit', {mixMax: data.result.mixMax, mixMin: data.result.mixMin});
                        process.filterData(data.result.data,data.result.leagueId);

                    }else{
                      process.chargeMixOrChampion(data.result.openItem);
                      store.commit("setTopData",data.result.type_sum[baseParam.dateType]);
                      store.state.is_playMaintenance = false;
                      process.setPlayTable(data,baseParam);
                      store.commit('add_datas',[]);
                      process.setNoData();
                    }
                }
            },isGoto);
               store.commit('showLoading',false);
              router.push({path: '/'+store.state.objPath+'/'+baseParam.gameType});

        },
        //公告  createTimeType 24小时(0)，48小时(1)，本周(2)，本月(3)
        getAllAnnouncement:function (params,flag) {
            let curParams = {
                action:'notice',
                params: params
            };
            api.Axios('post', CONST.PROCESSURL, curParams, function(data) {
                let len = data.result.data.length;

                if(data.code === '200' && len > 0){
                  store.commit('add_announcement_data', data.result.data);
                  }else {
                  store.commit('add_announcement_data',[]);
                    process.setNoData();
                }
              store.commit('showLoading',false);
            },flag);
        },

        //账户历史
        getAccountHis:function(params,flag){
            let curParams = {
                action:'wallet',
                params:params
            };
            api.Axios('post', CONST.SECURITYURL, curParams, function(data) {
                if(data.code ==='D006'){
                    //为登陆
                    tools.showMessege("2账户历史请求返回未登录"+data.message);
                }else {
                  let resultData = data.result.data;
                  if(resultData.length>0){
                    if(store.state.pullUpStart){
                      store.state.pullUpStart = false;
                      store.state.pullUpSuccess = true;
                      setTimeout(() => {
                        store.state.pullUpSuccess = false;
                      },1000);
                    }
                    if(store.state.pullDownStart){
                      store.state.pullDownStart = false;
                      store.state.pullDownSuccess = true;
                      setTimeout(() => {
                        store.state.pullDownSuccess = false;
                      },1000);
                    }
                    store.state.wallet_record_num = data.result.count;
                    //处理日期格式
                    for (let i = 0; i < resultData.length; i++) {
                      // resultData[i].transactionDate = tools.dateFormat(resultData[i].transactionDate, 'm-d H:i');
                      resultData[i].transactionDate = util.formatDate.UnixToDate(resultData[i].transactionDate,-12,'MDhhm','');
                    }
                    if(params.pageNum !== '1'){
                      resultData = store.state.accountHis.concat(resultData);
                    }
                    store.commit('add_accountHis_data',{
                      accountHis: resultData,
                      accountHisPageSum:data.result.pageSum,
                      accountHisMonthSum:data.result.pageSumAll

                    });


                  }else{
                    store.state.wallet_record_num = 0;
                    store.commit('add_accountHis_data', {
                      accountHis: [],
                      accountHisPageSum:data.result.pageSum,
                      accountHisMonthSum:data.result.pageSumAll
                    });
                    process.setNoData();
                  }
                }
              store.commit('showLoading',false);
            },flag);
        },

        //投注历史/已结算/未结算账单
        getBetRecord: function(params,flag) {
            let curParams = {
                action:'bet_his',
                params: params
            };
            api.Axios('post', CONST.SECURITYURL, curParams, function(data) {
              //未结算注单数据加载成功后隐藏加载样式，显示加载成功并在一秒后隐藏加载成功

                if(data.result.data.result.length===0){
                  store.commit('add_betRecord_data', []);
                  process.setNoData();
                }else {
                  if(store.state.pullUpStart){
                    store.state.pullUpStart = false;
                    store.state.pullUpSuccess = true;
                    setTimeout(() => {
                      store.state.pullUpSuccess = false;
                    },1000);
                  }
                  if(store.state.pullDownStart){
                    store.state.pullDownStart = false;
                    store.state.pullDownSuccess = true;
                    setTimeout(() => {
                      store.state.pullDownSuccess = false;
                    },1000);
                  }
                    process.betRecordProcess(data);
                }
              store.commit('showLoading',false);
            },flag);
        },

        //下注流程
        //投注
        bet: function(params,that) {
          let _this = this;
            let curParams = {
                action:'bet',
                params: params
            };
            that.betStatus = 'Y';
            api.Axios('post', CONST.SECURITYURL, curParams, function(data) {
               store.state.maintanceCode = '';
              if(data && data.code ==="D000"){ //判断玩法维护
                store.state.maintanceCode = data.code;
                store.state.infoMsg = data.message;
                store.state.toasting = true;
                setTimeout(() => {
                  store.state.toasting = false;
                },1000);
                store.state.is_showModal = false;
                store.state.newOddsParams = [];
                process.getData();
              }else{
                let isMix = store.state.baseParam.isMix;
                if('0'==isMix){
                  Bet.methods.afterBet(data,that);
                }else if('1'==isMix){
                  mixBet.methods.afterBet(data,that);
                }
                _this.getMoney();
              }
            });
        },

        //获取赛果
        getResult: function(param) {
            let curParams = {
                action:'result',
                params: {
                    date: param.date,
                    currPage: param.currPage,
                    lottery: param.lottery
                }
            };
            api.Axios('post', CONST.PROCESSURL, curParams, function(data) {
              let resultInfo = JSON.parse(data.result.data);
              if(resultInfo){
                for(let key in resultInfo){
                  for(let k in resultInfo[key]){
                    resultInfo[key][k].startTimeStr = resultInfo[key][k].startTimeStr.substr(5,11);
                  }

                }
                store.commit('add_result_data', resultInfo);
              }else{
                store.commit('add_result_data', []);
                process.setNoData();
              }
            });
        },


        //点击赔率是获取最新赔率 getNowoddsAndLimit
        queryNewOdds: function (params) {
            let curParams = {
                action:'new_odds',
                params: params
            };
            api.Axios('post', CONST.SECURITYURL, curParams, function(data) {
                if(data){
                  store.state.maintanceCode = '';
                  if(data.code ==='D000'){
                    store.state.maintanceCode = data.code;
                    store.state.is_showModal = false;
                    store.state.newOddsParams = [];
                    process.getData();
                  }else{
                    process.newOddsChargePlate(data);
                    store.commit('newOddsResp', data);
                  }
                }else{
                     process.newOddsChargePlate(data);
                    store.commit('newOddsResp', []);
                }
            },false);
        },

        //更多玩法
        getMorePlay:function(params,isGoto){
            let curParams = {
                action:'more_odds',
                params: params
            };
            api.Axios('post', CONST.PROCESSURL, curParams, function(data) {
              store.state.refreshStatus = true;
                if(data.result){
                    process.chargePlate(data);
                    store.commit('add_more_datas', data);
                    process.playTypeIsShow(data);
                  router.push({path: '/more'+params.gameType});
                  store.state.isMore = true;
                }else{
                  store.commit('showLoading',false);
                  store.commit('add_more_datas', []);
                }

            },isGoto);

        },

        //队名超长滚动设置
      teamNameRolling: function () {
        let _this = this;
        let loopTimer = store.state.loopTimer;
        if (loopTimer != null) {
          window.clearInterval(loopTimer);
        }
        loopTimer = setInterval(function () {
          _this.fun1();
        }, 200);
        store.commit("loopTimer", loopTimer);
      },
      fun1: function () {
        let pTeam = document.getElementsByName('team');
        for (var itemIndex = 0; itemIndex < pTeam.length; itemIndex++) {
          if (pTeam[itemIndex].scrollLeft != undefined) {
            let p = pTeam[itemIndex];
            if (p.scrollWidth - p.offsetWidth > 2 && p.scrollWidth - p.offsetWidth > p.scrollLeft) {
              p.scrollLeft++;
              if (p.scrollWidth - p.offsetWidth === parseInt(p.scrollLeft)) {
                setTimeout(function () { //这个定时器清除不用管
                  p.scrollLeft = 0;
                }, 1500);
              }
            }
          }
        }
      },

        getToken:function () {
            axios({
                baseURL: CONST.AGENCY,
                url: "data/Token.html",
                method: 'post',
                params: {}
            }).then(function (data) {
                let tokenData ={
                    tokenDate:data.result.tokenDate,
                    token:data.result.token,
                    rightNow:new Date().getTime()
                }
                store.commit("add_tokenData",tokenData);
            }).catch(function (err) {
                tools.Message.error(err)
            });

        },

        //api登陆
        apiLogin:function () {
            store.state.init = {};
            let token = Util.getQueryByName("token");
            let apiToken =storages.getSession('apiToken');
            if(!Util.isTarEmpty(token) || token===apiToken){
              store.state.loginStatus = true;
              return
            }
            //如果已经登入或者token一致就不用再请求token验证.
            storages.setSession('apiToken',token);
            let user = JSON.parse(storages.getUserObjSession());
            if(user!=null&&user.token!=null&&user.token==token){
              store.state.loginStatus = true;
              return;
            }
            axios({
                url:"/api/token.html?"+encodeURIComponent(token)
            }).then(function(data){
                if(Util.isTarEmpty(data)&&data.success){
                    storages.setUserObjSession('user',{username:data.username,money:data.money,token:token});
                    store.state.user = {username:data.username,money:data.money,token:token};
                }
            }).catch(function(err){
                storages.removeSession("user");
                console.log(err,"api登录错误")

            }).finally(function () {
              store.state.loginStatus = true;
                storages.removeSession("apiToken");
            });

        },
      //更新金额
      getMoney(){
        let _this = this;
        axios({
          baseURL: CONST.AGENCY,
          url: "getMoney.html",
          method: 'post',
          params: {}
        }).then(function (data) {
         storages.updataMoney(data.data);
         store.state.user.money = data.data;
        }).catch(function (err) {
          if(err.status == 600){
            tools.showMessege("会话过期, 请重新登入");
          }else if(err.status == 606){
            tools.showMessege("异地登入, 您已被踢出");
          }else if(err.status == 607){
            store.state.systemMainCode = 'D000'
            store.state.is_showModal = false;
            document.title = '網站維護中';
            let playMaintenance = {
              title: '系统维护中',
              question_reason: '1',
              content: '',
              content_time_before: '预计将会在',
              content_time: err.data.result.beijingEndTime+ '\xa0'+'(GMT+8)',
              content_time_after: '完成，感谢您的耐心等待',
            }
            store.commit("add_playMaintenance", playMaintenance);
            //跳转到玩法维护
            process.goToSystemMaintenance();
          }
          storages.removeSession('user');
          store.state.user = {};
        });
      },
      //登出
      logOut:function () {
        axios({
          baseURL: CONST.AGENCY,
          url: CONST.LOGOUT,
          method: 'post',
        }).then(function (data) {
          storages.removeSession('user');
          store.state.user = {};
        }).catch(function (err) {
          tools.Message.error(err)
        });

      },

      //获取规则初始化的json
      getRuleJson:function () {
        axios({
          baseURL: CONST.AGENCY,
          url: CONST.RULEURL,
          method:'get',
          responseType:"json"
        }).then(function(res){
          let ruleList=[];
          let ruleNameList= new Array();
          let ruleNameLists= new Array();
          ruleList=res.theme.day.items;
          for(let i=0;i<ruleList.length;i++)
          {
            if("规则与条款"!=ruleList[i].name && "平台隐私条款"!=ruleList[i].name && "博彩责任"!=ruleList[i].name && "赔率计算"!=ruleList[i].name)
            {
              ruleNameList.push(ruleList[i].name)
            }

          }
          ruleNameLists.push(ruleNameList)
          store.commit('setRuleNameList',ruleNameLists);
          store.commit('setRuleJson',res.theme.day.items);

          console.log(ruleNameLists,'ruleNameLists')
          console.log(ruleJson,'ruleJson')
        }).catch(function(err){
        });
      },

      //获取规则页面
      getRuleHtml:function (url) {
          if(url==undefined || url=='')
            url = 'normal.html';
        axios({
          baseURL: CONST.AGENCY,
          url:'/rcenter/play/rule/h5/day/' + url,
          method:'get',
          responseType:"html"
        }).then(function(res){
          store.state.ruleHtml = res;
          store.commit('setRuleHtml',res);
        }).catch(function(err){
          console.log(err,"请求规则页面错误")
        });
      },

      getSourceConfig(){
        let curParams = {
          action:'source',
          params:[],
        };
        api.Axios('post', CONST.PROCESSURL, curParams, function(data) {
          if(data.result){
            //设置系统参数
            process.setSysFreqParams(data);
          }
        },false);

      },

    }
}

