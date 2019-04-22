/**
 * 公共工具类统一出口函数
 * Luffy 2018-7-27
 */
import CONST from '@/js/public/const'
import tools from '@/js/public/tools'
import storages from '@/js/public/storages'
import router from '../../router'
import axios from 'axios'
import store from '@/js/store'
import base from '@/js/public/base'
import vuei18n from 'vue-i18n'
import LangEn from '@/../static/lang/en'
import LangZhCHS from '@/../static/lang/zhCHS'
import LangZhCHT from '@/../static/lang/zhCHT'
import process from '@/js/public/process'
import showBet from '@/js/public/showBet'
import bet from '@/js/public/bet'
/*import Timer from '@/components/public/Timer.vue'*/
import util from '../util/util.js'
import oddsChange from '@/js/oddColor/oddsChange'
import BScroll from 'better-scroll';

export {
    CONST,
    tools,
    storages,
    axios,
    router,
    store,
    base,
    vuei18n,
    LangEn,
    LangZhCHS,
    LangZhCHT,
    process,
    /*Timer,*/
    util,
    oddsChange,
    showBet,
    bet,
  BScroll
}
