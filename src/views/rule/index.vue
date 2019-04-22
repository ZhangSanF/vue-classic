/**
* 规则页面
*
*/
<template>
  <div class="rule">
    <secondary-head :title="title"></secondary-head>

    <!--tab-->
    <div class="tab-box" v-model="activeTab">
        <span class="xian-box" v-for="item in tabList" :class="[activeTab === item.name ? 'actives' : '', 'tab-text']" @click="activeState(item.name)">
            {{ item.label }}
            <transition name="fade">
                <span class="xian" v-show="activeTab === item.name"></span>
            </transition>
        </span>
    </div>

    <!--content-->
    <div class="main_body">
      <!--体育-->
      <div class="select-style" v-model="activeTab" v-if="activeTab == 'sportsRules'">
        <popup-picker cancelText="取消" confirmText="确定" :data="ruleNameList" v-model="value" @on-change="change()" @on-show="selectShow" @on-hide="selectHide(value)"></popup-picker>
        <div class="icon-box" ref="iconBox"><span class="iconfont icon-left icon-style"></span></div>
      </div>
      <div ref="outerWrapper" class="outerWrapper" :style="{top: activeTab == 'sportsRules' ? '160px' : '111px'}">
        <div v-model="activeTab">
          <!--体育规则-->
          <!--<div v-if="activeTab == 'sportsRules'"v-html="ruleHtml">-->
          <div v-html="ruleHtml">
            <!--<div class="rule-content-box">-->
              <!--<div class="rule-content">-->
                <!--<component :is="currentView"></component>-->
              <!--</div>-->
            <!--</div>-->
          </div>
          <!--规则与条款-->
          <!--<div v-else-if="activeTab == 'rulesProvisions'">-->
            <!--<div class="clause-box">-->
              <!--<div class="clause-content">-->
                <!--<div class="title">一般体育说明</div>-->
                <!--<p style="margin:20px;">使用条款<br/><br/>-->
                  <!--享用本公司提供的服务是客户本人的意愿，其风险应由客户本人承担。参与我们服务的同时就说明客户认同本公司所提供<br/>-->
                  <!--的服务是正常、合理、公正、公平的。<br/><br/>-->
                  <!--某些法律规则在贵国居住的司法管辖区, 并未明文规定在线和非在线博彩是否允许客户有责任确保任何时候您的博彩行为<br/>-->
                  <!--在您所属地是属合法行为。<br/><br/>-->
                <!--<p style="margin:20px;">投注接受条件<br/><br/>-->
                  <!--如果阁下的投注信息正确，阁下是唯一对此投注承担责任的人。一旦本司确认您的注单，该注单不得取消，撤回或更改，<br/>-->
                  <!--并且该注单会视为您投注的有效证据。<br/><br/>-->
                  <!--所有在本公司客户账户交易记录显示确认信息的注单，本司都视为有效注单。每笔交易完成后，请查您的交易记录，<br/>-->
                  <!--若有任何问题请联系上线核查，否则您接受您的注单是正确的。<br/><br/>-->
                  <!--如果客户有欺诈，合谋，非法或其它不当行为，我们有权(唯一决定人)取消投注单或任何彩金。<br/>-->
                  <!--我们保留权利以任何理由拒绝任何交易或注单。<br/><br/>-->
                <!--<p style="margin:20px;">免责条款<br/><br/>-->
                  <!--对于任何情况下由于卫星收讯不良或延误，网路中断，或个人使用网站服务时的失误，疏忽，或对网站内容的误解所产生<br/>-->
                  <!--的任何损失，本公司概不负责。<br/><br/>-->
                  <!--公司不赋予任何责任对于公司的网站，服务器或网络中断，公司的服务器丢失信息或信息遭受破坏，不法分子攻击网站，<br/>-->
                  <!--服务器或网络供应商进入网站时候由于网络供应商原因造成的网络缓慢。<br/><br/>-->
                <!--</p>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--&lt;!&ndash;赔率计算&ndash;&gt;-->
          <!--<div v-else>-->
            <!--<div class="odds-box">-->
              <!--<div class="odds-content">-->
                <!--<ul>-->
                  <!--<li class="list-item">-->
                    <!--<div class="item-content">盘口类型</div>-->
                    <!--<div class="item-content">投注金额</div>-->
                    <!--<div class="item-content">赔率</div>-->
                    <!--<div class="item-content">输</div>-->
                    <!--<div class="item-content">赢</div>-->
                  <!--</li>-->
                  <!--<li class="list-item">-->
                    <!--<div class="item-content">香港盘</div>-->
                    <!--<div class="item-content">1000</div>-->
                    <!--<div class="item-content">0.800</div>-->
                    <!--<div class="item-content">800</div>-->
                    <!--<div class="item-content">-1000</div>-->
                  <!--</li>-->
                  <!--<li class="list-item">-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content">1.130</div>-->
                    <!--<div class="item-content">1130</div>-->
                    <!--<div class="item-content">-1000</div>-->
                  <!--</li>-->
                  <!--<li class="list-item">-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content"></div>-->
                  <!--</li>-->
                  <!--<li class="list-item">-->
                    <!--<div class="item-content">马来盘</div>-->
                    <!--<div class="item-content">1000</div>-->
                    <!--<div class="item-content">0.800</div>-->
                    <!--<div class="item-content">800</div>-->
                    <!--<div class="item-content">-1000</div>-->
                  <!--</li>-->
                  <!--<li class="list-item">-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content" style="color: #D50926">-0.880</div>-->
                    <!--<div class="item-content">1000</div>-->
                    <!--<div class="item-content" style="color: #D50926">-880</div>-->
                  <!--</li>-->
                  <!--<li class="list-item">-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content"></div>-->
                  <!--</li>-->
                  <!--<li class="list-item">-->
                    <!--<div class="item-content">印尼盘</div>-->
                    <!--<div class="item-content">1000</div>-->
                    <!--<div class="item-content">1.131</div>-->
                    <!--<div class="item-content">1130</div>-->
                    <!--<div class="item-content">-1000</div>-->
                  <!--</li>-->
                  <!--<li class="list-item">-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content" style="color: #D50926">-1.250</div>-->
                    <!--<div class="item-content">1000</div>-->
                    <!--<div class="item-content" style="color: #D50926">-1250</div>-->
                  <!--</li>-->
                  <!--<li class="list-item">-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content"></div>-->
                  <!--</li>-->
                  <!--<li class="list-item">-->
                    <!--<div class="item-content">欧洲盘</div>-->
                    <!--<div class="item-content">1000</div>-->
                    <!--<div class="item-content">1.800</div>-->
                    <!--<div class="item-content">800</div>-->
                    <!--<div class="item-content">-1000</div>-->
                  <!--</li>-->
                  <!--<li class="list-item">-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content"></div>-->
                    <!--<div class="item-content">2.130</div>-->
                    <!--<div class="item-content">1130</div>-->
                    <!--<div class="item-content">-1000</div>-->
                  <!--</li>-->
                <!--</ul>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {  PopupPicker } from 'vux'
  import BScroll from 'better-scroll'
  import SecondaryHead from '@/components/SecondaryHead'
  import QA_sport from "./QA_sport";
  import outright from './outright'
  import parlays_multiples from './parlays_multiples'
  import roulNf from './roul_nf'
  import archery from './archery'
  import athletic from './athletic'
  import aussie from './aussie'
  import cricket from './cricket'
  import cycling from './cycling'
  import darts from './darts'
  import e_sports from './e_sports'
  import field_hockey from './field_hockey'
  import football from './football'
  import badminton from './badminton'
  import baseball from './baseball'
  import basketball from './basketball'
  import beach_soccer from './beach-soccer'
  import beach_volleyball from './beach-volleyball'
  import boxing from './boxing'
  import golf from './golf'
  import gymnastics from './gymnastics'
  import handball from './handball'
  import futsal from './futsal'
  import ice_hockey from './ice-hockey'
  import judo from './judo'
  import lacrosse from './lacrosse'
  import medal_betting from './medal-betting'
  import motor_sports from './motor-sports'
  import olympics from './olympics'
  import rowing from './rowing'
  import rugby_league from './rugby-league'
  import snooker from './snooker'
  import softball from './softball'
  import table_tennis from './table-tennis'
  import tennis from './tennis'
  import tamp from './tamp'
  import volleyball from './volleyball'
  import water_polo from './water-polo'
  import weightlifting from './weightlifting'
  import  wintersports_winterolympics from './wintersports-winterolympics'
  import {store,base,} from '../../../src/js/public/port.js';

  export default {
    data() {
      return {
        title:'规则',
        value: ['一般体育说明'],
        list:[['一般体育说明','冠军','连串过关/复式过关','美式足球','射箭和射击','田径','澳式足球','板球','自行车','飞镖', '电子竞技',
          '曲棍球', '足球','室内足球', '羽毛球','棒球','篮球','沙滩足球', '沙滩排球','拳击 / 搏斗','高尔夫', '体操','手球', '冰球','柔道、摔交、跆拳道',
          '长曲棍球','体育/奖章投注','赛车','奥林匹克或相关事件投注','赛艇和皮划艇','橄榄球联盟','斯诺克/台球', '垒球','乒乓球', '网球','三项全能和现代五项运',
          '排球','水球','举重','冬季运动 冬季奥运会/比赛'
         ]
        ],
        tabList: [
          {label:'体育规则', name:'sportsRules'},//体育规则
          {label:'规则与条款', name:'rulesProvisions'},//规则与条款
          {label:'赔率计算', name:'priceCalculation'}//赔率计算
        ],
        activeTab:'sportsRules',
        currentView: 'QA_sport',
      }
    },
    components: {
      PopupPicker,
      SecondaryHead,
      QA_sport,
      outright,
      parlays_multiples,
      roulNf,
      archery,
      athletic,
      aussie,
      cricket,
      cycling,
      darts,
      e_sports,
      field_hockey,
      football,
      futsal,
      badminton,
      baseball,
      basketball,
      beach_soccer,
      beach_volleyball,
      boxing,
      golf,
      gymnastics,
      handball,
      ice_hockey,
      judo,
      lacrosse,
      medal_betting,
      motor_sports,
      olympics,
      rowing,
      rugby_league,
      snooker,
      softball,
      table_tennis,
      tennis,
      tamp,
      volleyball,
      water_polo,
      weightlifting,
      wintersports_winterolympics
    },
    methods: {
      //横向滚动
      activeState(tabName) {
        this.activeTab = tabName;
        if( tabName === 'sportsRules' ) {
          this.change();
        }else if ( tabName === 'rulesProvisions') {
          base.methods.getRuleHtml('senondpage.html');
        }else if ( tabName === 'priceCalculation') {
          base.methods.getRuleHtml('oddsCompute.html');
        }
        this.scroll.scrollTo(0, 0)
      },
      //iconfont旋转--当select出现时
      selectShow(){
        this.$refs.iconBox.style.transform = 'translate(0,-50%) rotate(90deg)';
      },
      //iconfont旋转--当select关闭时
      selectHide(value){
        this.$refs.iconBox.style.transform = 'translate(0,-50%) rotate(-90deg)';
        switch(value[0]){
          case "一般体育说明":
            this.currentView = QA_sport;
            break;
          case "冠军":
            this.currentView = outright;
            break;
          case "连串过关/复式过关":
            this.currentView = parlays_multiples;
            break;
          case "美式足球":
            this.currentView = roulNf;
            break;
          case "射箭和射击":
            this.currentView = archery;
            break;
          case "田径":
            this.currentView = athletic;
            break;
          case "澳式足球":
            this.currentView = aussie;
            break;
          case "板球":
            this.currentView = cricket;
            break;
          case "自行车":
            this.currentView = cycling;
            break;
          case "飞镖":
            this.currentView = darts;
            break;
          case "电子竞技":
            this.currentView = e_sports;
            break;
          case "曲棍球":
            this.currentView = field_hockey;
            break;
          case "足球":
            this.currentView = football;
            break;
          case "室内足球":
            this.currentView = futsal;
            break;
          case "羽毛球":
            this.currentView = badminton;
            break;
          case "棒球":
            this.currentView = baseball;
            break;
          case "篮球":
            this.currentView = basketball;
            break;
          case "沙滩足球":
            this.currentView = beach_soccer;
            break;
          case "沙滩排球":
            this.currentView = beach_volleyball;
            break;
          case "拳击 / 搏斗":
            this.currentView = boxing;
            break;
          case "高尔夫":
            this.currentView = golf;
            break;
          case "体操":
            this.currentView = gymnastics;
            break;
          case "手球":
            this.currentView = handball;
            break;
          case "冰球":
            this.currentView = ice_hockey;
            break;
          case "柔道、摔交、跆拳道":
            this.currentView = judo;
            break;
          case "长曲棍球":
            this.currentView = lacrosse;
            break;
          case "体育/奖章投注":
            this.currentView = medal_betting;
            break;
          case "赛车":
            this.currentView = motor_sports;
            break;
          case "奥林匹克或相关事件投注":
            this.currentView = olympics;
            break;
          case "赛艇和皮划艇":
            this.currentView = rowing;
            break;
          case "橄榄球联盟":
            this.currentView = rugby_league;
            break;
          case "斯诺克/台球":
            this.currentView = snooker;
            break;
          case "垒球":
            this.currentView = softball;
            break;
          case "乒乓球":
            this.currentView = table_tennis;
            break;
          case "网球":
            this.currentView = tennis;
            break;
          case "三项全能和现代五项运":
            this.currentView = tamp;
            break;
          case "排球":
            this.currentView = volleyball;
            break;
          case "水球":
            this.currentView = water_polo;
            break;
          case "举重":
            this.currentView = weightlifting;
            break;
          case "冬季运动 冬季奥运会/比赛":
            this.currentView = wintersports_winterolympics;
            break;
        }
      },
      choose(){
        console.log('1')
      },
      change() {
        let val = this.value[0];
        base.methods.getRuleHtml(this.getRuleUrl(val));
      },
      getRuleUrl(ruleName) {
        for(let i=0;i<this.ruleJson.length;i++)
        {
          if(ruleName==this.ruleJson[i].name)
          {
            return this.ruleJson[i].file;
          }
        }
      }
    },
    computed: {
      ruleNameList: {
        get: function () {
          console.log(store.state.ruleNameList,'store.state.ruleNameList')
          return store.state.ruleNameList;
        },
        set: function (newValue) {
          store.state.ruleNameList = newValue;
        }
      },
      ruleJson: {
        get: function () {
          console.log(store.state.ruleJson,'store.state.ruleJson')
          return store.state.ruleJson;
        },
        set: function (newValue) {
          store.state.ruleNameList = newValue;
        }
      },
      ruleHtml:{
        get:function () {
          return store.state.ruleHtml;
        }
      }
    },
    mounted(){
      this.change();
      //当内容多时滚动
      this.$nextTick(function () {
        //页面一滚动
        if(!this.scroll) {
          this.scroll = new BScroll(this.$refs.outerWrapper,{
            hasVerticalScroll: true,
            tap:true,
            click:true
          })
        } else {
          this.scroll.refresh();
        }

      })
    }
  }


</script>
<style lang="scss">
  @import '../../themes/rule/rule';
</style>

