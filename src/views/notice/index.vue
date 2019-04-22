<template>
  <div class="notice-page">
    <!--<my-header ref="myHeader"></my-header>-->
    <secondary-head :title="title"></secondary-head>
    <div class='wrapper' ref='wrapper'>
      <div class="content">
        <!--<h1 class="title">公告</h1>-->
        <tab class="tabBox"  > <!--custom-bar-width="50px"-->
          <tab-item selected @click.native="getAnnouncement(0)">全部</tab-item>
          <tab-item @click.native="getAnnouncement(1)">今日</tab-item>
          <tab-item @click.native="getAnnouncement(2)">昨天</tab-item>
        </tab>
        <div class="list">
          <group>
            <cell class="item" v-for="(item,index) in announcement" :key="index" primary="content" :title="time(item.createTime)" :value="item.content"></cell>
          </group>
          <load-more tip="正在加载" v-show=false></load-more>
          <load-more :show-loading="false" tip="暂无数据" background-color="#fbf9fe" v-show="loadShow"></load-more>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { XHeader, Tab, TabItem, Group, Cell, LoadMore } from 'vux'
import {BScroll,Util} from '../../router/api'
import MyHeader from '@/components/Header.vue'
import SecondaryHead from '@/components/SecondaryHead'
import {base,store,storages,tools} from '@/js/public/port'

export default{
  components: {
    XHeader, Tab, TabItem, Group, Cell, LoadMore, 'my-header': MyHeader,SecondaryHead
  },
  data () {
    return {
      title:'消息公告',
      noticeList: [],
      count:0,
      options: {
        pullDownRefresh: {
          threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
          stop: 0 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
        },
        pullUpLoad: {
          threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
        },
//          pullDownRefresh: false, //关闭下拉
//          pullUpLoad: false, // 关闭上拉
        click: true,
        probeType: 3,
        startY: 0,
        scrollbar: false
      },
      loadShow: false,
      pageNum: 1,
      createTimeType: 0,
      params:{
        pageNum:'1',
        startDate:'',
        endDate: tools.formatDate(new Date())
      }
    }
  },
  methods: {
    scrollInit: function () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper,this.options)
        this.scroll.on('pullingDown', () => {
          this.getAnnouncement( this.createTimeType)
          this.pageNum = 1  //下拉刷新后初始化当前页面数
          this.loadShow=false //隐藏暂无数据
          this.$nextTick(() => {
            this.pullingDownUp()
          })
        })
        // 上拉
        this.scroll.on('pullingUp', () => {
          let num = Math.ceil(this.count/20)
          if (this.pageNum<num) { //判断是否继续上拉刷新
            this.pullingUp()
            this.$nextTick(() => {
              this.pullingDownUp()
            })
          }else {
            this.loadShow = true
            this.$nextTick(() => {
              this.pullingDownUp()
            })
          }
        })
      })
    },
    getAnnouncement:function (createTimeType) {
      let _this = this;
      if(createTimeType === 0){
        _this.params.endDate = '';
        _this.params.startDate = tools.formatDate(new Date());
      }else if(createTimeType === 1){
        _this.params.endDate = tools.formatDate(new Date());
        _this.params.startDate = tools.formatDate(new Date(new Date(new Date().toLocaleDateString()).getTime()));
      }else if(createTimeType === 2){
        _this.params.startDate = tools.formatDate(new Date(new Date(new Date().toLocaleDateString()).getTime()-24*60*60*1000));
        _this.params.endDate = tools.formatDate(new Date(new Date(new Date().toLocaleDateString()).getTime()));
      }
//      _this.params.startDate = new Date(new Date(new Date().toLocaleDateString()).getTime());
      base.methods.getAllAnnouncement(this.params,false);
//      _this.$vux.loading.show();
//      _this.createTimeType=createTimeType
//      this.$http({
//        url: '/announcement/getVueAnnouncementList.html',
//        method: 'post',
//        params:{pageNum:1,createTimeType: _this.createTimeType},
//    }).then(
//      function (res) {
//        _this.noticeList=res.data.result
//        _this.count=res.data.count
//        if(_this.count==0){
//          _this.loadShow=true;
//        }else {
//          _this.loadShow=false;
//        }
//      }
//      ).catch(
//        function (err) {
//          console.log(err)
//        }
//      ).finally(function (res) {
//        _this.$vux.loading.hide();
//      })
    },
    pullingUp :function () {
      let _this = this
      _this.$vux.loading.show();
      this.pageNum = this.pageNum+1
      this.$http({
        url: '/announcement/getVueAnnouncementList.html',
        method: 'post',
        params:{pageNum:this.pageNum,createTimeType: _this.createTimeType}
      }).then(
        function (res) {
          _this.noticeList= _this.noticeList.concat(res.data.result)
          _this.count=res.data.count
        }
      ).catch(
        function (err) {
          console.log(err)
        }
      ).finally(function (res) {
        _this.$vux.loading.hide();
      });
    },
    time: function (timestamp) {
      return Util.formatDate.UnixToDate(timestamp,-12, 'yMD')
    },
    pullingDownUp () {
      this.scroll.finishPullDown()
      this.scroll.finishPullUp()
      this.scroll.refresh() //重新计算元素高度
    }
  },
  mounted () {
    base.methods.getAllAnnouncement(this.params,true);
    this.$nextTick(() => {
      this.scrollInit()
    })
  },
  created(){
//    this.getAnnouncement(this.createTimeType)
  },
  beforeRouteUpdate () {
    this.noticeList = []
    this.getAnnouncement(this.createTimeType)
    this.$refs.myHeader.closeRightMeun()
  },
  computed:{
    announcement(){
      return store.state.announcement_data;
    }
  }
}

</script>

<style lang="scss">
  @import  "../../themes/notice/notice.scss";
</style>
