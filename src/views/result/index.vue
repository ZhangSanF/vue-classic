<template>
  <div class="result-page">
    <secondary-head :title="title"></secondary-head>
    <!--<my-header></my-header>-->
      <!--<h1 class="title">{{resultType == 30 ? '足球' :-->
                          <!--resultType == 31 ? '篮球&美式足球' :-->
                          <!--resultType == 32 ? '网球' :-->
                          <!--resultType == 33 ? '排球' :-->
                          <!--resultType == 34 ? '棒球' : '其他'}}：赛果</h1>-->
      <div class="title-filter">
        <div class="right-type">
          <popup-radio :options="ballTabList" v-model="resultType" @on-change="typeResult"></popup-radio>
        </div>
        <div class="right-time" >
          <Datetime type="date" :value="resultTime"  id="datePicker" @on-change="dateResult" :endDate="resultEndDate" :data-cancel-text="zhCn" :data-confirm-text="zhCm"></Datetime>
        </div>
      </div>
      <!--<div class="title-2"><span class="time">时间</span><p>赛果</p></div>-->
    <div class='wrapper' ref='wrapper'>
       <div class="content">
         <div class="zhedie" v-for="item in keys">
           <div v-if="resultType === 30" >
             <football-result :resultData="resultData[item]" @showResult="displayResult"></football-result>
           </div>
           <div v-if="resultType === 31">
             <basketball-result :resultData="resultData[item]" @showResult="displayResult"></basketball-result>
           </div>
           <div v-if="resultType === 32">
             <tennis-result :resultData="resultData[item]" @showResult="displayResult"></tennis-result>
           </div>
           <div v-if="resultType === 33">
             <volleyball-result :resultData="resultData[item]" @showResult="displayResult"></volleyball-result>
           </div>
           <div v-if="resultType === 34">
             <baseball-result :resultData="resultData[item]" @showResult="displayResult"></baseball-result>
           </div>
           <div v-if="resultType === 35">
             <other-result :resultData="resultData[item]" @showResult="displayResult"></other-result>
           </div>
         </div>
         <!--<my-footer></my-footer>-->
       </div>
    </div>
  </div>
</template>

<script>
import { Scroller, PopupRadio, Datetime } from 'vux'
import {BScroll, MyFooter, MyHeader,Util} from '../../router/api'
import {footballResult, basketballResult, tennisResult, volleyballResult, baseballResult, otherResult} from '../../js/publicBall/result'
import SecondaryHead from '@/components/SecondaryHead'
import {base,store,tools} from "../../js/public/port";
export default{
  components: {
    'my-header': MyHeader,
    'my-footer': MyFooter,
    SecondaryHead,
    PopupRadio,
    Scroller,
    Datetime,
    footballResult,
    basketballResult,
    tennisResult,
    volleyballResult,
    baseballResult,
    otherResult
  },
  data () {
    return {
      currPage:'1',
      date:'',
      title:'赛果',
      resultEndDate:'',
      resultTime:'',
      zhCn:'取消',
      zhCm:'确认',
      resultType: 30,
      ballTabList: [
        {key: 30, value: '足球'},
        {key: 31, value: '篮球&美式足球'},
        {key: 32, value: '网球'},
        {key: 33, value: '排球'},
        {key: 34, value: '棒球'},
        {key: 35, value: '其他'},
        ],
    }
  },
  methods: {
    typeResult: function (value) {
      this.resultType = value
      let param={
        date: this.resultTime,
        currPage: this.currPage,
        lottery: value+''

      }
      base.methods.getResult(param)
    },
    dateResult: function (value) {
      this.resultTime = value
      let param={
        date: value,
        currPage: this.currPage,
        lottery: this.resultType+''

      }
      base.methods.getResult(param)
    },

    displayResult(showContent,resultData){
      let showCount
      for (let i in resultData) {
        showCount = resultData[i].showContent;
        if (showContent === showCount) {
          resultData[i].animate = !resultData[i].animate;
        }
      }
    },
    scrollInit: function () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
      })
    }
  },
  mounted () {
    let path = this.$route.query.path;
    if (path.endsWith('TYZQ')) {
      this.resultType = 30
    } else if (path.endsWith('TYLM')) {
      this.resultType = 31
    } else if (path.endsWith('TYWQ')) {
      this.resultType = 32
    } else if (path.endsWith('TYPQ')) {
      this.resultType = 33
    } else if (path.endsWith('TYBQ')) {
      this.resultType = 34
    } else if (path.endsWith('TYQT')) {
      this.resultType = 35
    }

    this.resultTime = tools.formatDate(new Date().getTime()- 12 * 60 * 60 * 1000,'YY-MM-DD')

    let param={
      date: this.resultTime,
      currPage: this.currPage,
      lottery: this.resultType+''

    }
    base.methods.getResult(param)

    this.resultEndDate = Util.formatDate.UnixToDate(Util.getDateForTimezone(-4).getTime(),0,'yMD').trim();
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      })
    })
  },
  computed:{
    resultData(){
      return store.state.matchsResult;
    },
    keys(){
      return Object.keys(store.state.matchsResult);
    }
  }
}

</script>

