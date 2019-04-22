/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Router from 'vue-router'
import Live from '@/views/live'
import Morning from '@/views/morning'
import Today from '@/views/today'
import Reload from '../components/Reload'
import accountHistory from '@/views/mine/accountHistory'
import accountHisDay from '@/views/mine/accountHistory/accountHisDay'
import betRecordByBillNo from '@/views/mine/accountHistory/betRecordByBillNo'
import Order from '@/views/mine/order'
import noclearingOrder from '@/views/mine/noclearingOrder'
import Login from '@/views/mine/login/login'
import Register from '@/views/mine/login/register'
import Forget from '@/views/mine/login/forget'
import FootBall from '@/components/FootBall.vue'
import BasketBall from '@/components/BasketBall.vue'
import BaseBall from '@/components/BaseBall.vue'
import Tennis from '@/components/Tennis.vue'
import VolleyBall from '@/components/VolleyBall.vue'
import Other from '@/components/Other.vue'
import footBall from '@/views/show/footBall.vue'
import basketBall from '@/views/show/basketBall.vue'
import baseBall from '@/views/show/baseBall.vue'
import tennis from '@/views/show/tennis.vue'
import volleyBall from '@/views/show/volleyBall.vue'
import other from '@/views/show/other.vue'
import Notice from '@/views/notice'
import Header from '@/components/Header.vue'
import siteUpdate from '@/views/update/siteUpdate'
import Privacy from '@/views/privacy'
import Responsibility from '@/views/responsibility'
import Result from '@/views/result'
import Setting from '@/views/setting'
import Handicap from '@/views/setting/handicap'
import Language from '@/views/setting/language'
import Odds_view from '@/views/setting/odds_view'
import Rule from '@/views/rule'
import Download from '@/views/download'
import areaLimit from '@/views/update/areaLimit'
// import lost404 from '@/views/update/lost404'
 //import ipLimit from '@/views/update/ip-limit'
// import Loading from '@/components/Loading'
// import Qpage from '@/components/QuestionPage'

Vue.use(Router)
const BallComponent = [
      {
            path: 'TYZQ',
            component: FootBall
      },
      {
            path: 'TYLM',
            component: BasketBall
      },
      {
            path: 'TYBQ',
            component: BaseBall
      },
      {
            path: 'TYWQ',
            component: Tennis
      },
      {
            path: 'TYPQ',
            component: VolleyBall
      },
      {
            path: 'TYQT',
            component: Other
      }
]


export const router = new Router({
      routes: [
            {path: '/', component: Header},
            {path: '/live', name: 'Live', component: Live, children: BallComponent},
            {path: '/today', name: 'Toady', component: Today, children: BallComponent},
            {path: '/notice/', name: 'Notice', component: Notice},
            {path: '/morning', name: 'Morning', component: Morning, children: BallComponent},
            {path: '/login', name: 'Login', component: Login, meta: {keepAlive: true}},
            {path: '/mine/login/register', name: 'Register', component: Register},
            {path: '/mine/login/forget', name: 'Forget', component: Forget},
            {path: '/mine/accountHistory/accountHisDay', name: 'accountHisDay', component: accountHisDay},
            {
                  path: '/mine/accountHistory/betRecordByBillNo/:time',
                  name: 'betRecordByBillNo',
                  component: betRecordByBillNo
            },
            {path: '/mine/accountHistory/', name: 'accountHistory', component: accountHistory},
            {path: '/mine/order/', name: 'Order', component: Order},
            {path: '/mine/noclearingOrder/', name: 'noclearingOrder', component: noclearingOrder},
            {path: '/reload', name: 'Reload', component: Reload},
            {path: '/moreTYZQ', name: 'MoreTYZQ', component: footBall},
            {path: '/moreTYLM', name: 'MoreTYLM', component: basketBall},
            {path: '/moreTYBQ', name: 'MoreTYBQ', component: baseBall},
            {path: '/moreTYWQ', name: 'MoreTYWQ', component: tennis},
            {path: '/moreTYPQ', name: 'MoreTYPQ', component: volleyBall},
            {path: '/moreTYQT', name: 'MoreTYQT', component: other},
            {path: '/update/siteUpdate', name: 'siteUpdate', component: siteUpdate},
            {path: '/update/areaLimit', name: 'ipLimit', component: areaLimit},
            {path: '/privacy', name: 'Privacy', component: Privacy},
            {path: '/responsibility', name: 'Responsibility', component: Responsibility},
            {path: '/result', name: 'Result', component: Result},
            {path: '/setting', component: Setting},
            {path: '/setting/handicap', component: Handicap},
            {path: '/setting/language', component: Language},
            {path: '/setting/odds_view', component: Odds_view},
            {path: '/rule', component: Rule},
            {path:'/download',component: Download}
            //测试dylan
            // {path: '/update/lost404', name: 'lost404', component: lost404},
            // {path: '/update/ipLimit', name: 'ipLimit', component: ipLimit},
            // {path: '/sx', component: Loading},
            // {path: '/error', component: Qpage},
      ]
})

export default router;
