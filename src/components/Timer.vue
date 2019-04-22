<template>
  <div v-if="systemMainCode!='D000'" class="refresh" @click="refresh">
    <span class="refresh-span">
      {{ countDown }}
    </span>
  </div>
</template>
<script>

  import {store,base,process} from '../js/public/port'

  export default {
    data() {
      return {
        countDown: 90,
        timerTask: null,
        stop: false
      }
    },
    props: [
      'timeCalculation'
    ],
    methods: {
      refresh() {
        if (!this.timerTask) {
          this.generateTask();
        } else {
          this.calculation();
        }
        process.getData();

      },

      task() {
        if (this.countDown === 0) {
          this.calculation();
          process.getData();
        } else {
          this.countDown = this.countDown - 1
        }
      },
      generateTask() {
        process.getData();
        this.calculation();
        this.timer();
      },
      calculation() {
        let dateType = store.state.baseParam.dateType;
        let maintanceCode = store.state.maintanceCode;
        let systemMainCode = store.state.systemMainCode;
        if(dateType=='1'){
          this.countDown = store.state.sysFreqParams.liveFreq;
        }else if(dateType=='0'){
          this.countDown = store.state.sysFreqParams.todayFreq;
        }else if(dateType=='2'){
          this.countDown = store.state.sysFreqParams.morningFreq;
        }
        if(maintanceCode=='D000'){
          this.countDown = store.state.sysFreqParams.playMFreq;
        }
        if(systemMainCode=='D000'){
          this.countDown = store.state.sysFreqParams.systemMFreq;
        }
      },

      timer() {
        let _this = this;
        _this.timerTask = setTimeout(function () {
          _this.task();
          _this.timer();
        }, 1000);
      },

    },
    computed:{
      systemMainCode(){
        return store.state.systemMainCode;
      }
    },
    watch: {
      timeCalculation() {
        this.calculation();
      }
    },

    mounted() {
      this.generateTask();
    },
    destroyed() {
      store.state.refreshStatus = false;
      window.clearInterval(this.timerTask)
    }

  }
</script>
