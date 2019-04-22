// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'
require('babel-polyfill')
import Vue from 'vue'
import App from './App'
import {router} from './router/index.js'
import 'iview/dist/styles/iview.css'
import {LoadingPlugin,ToastPlugin} from 'vux'
import {vuei18n, LangEn, LangZhCHS, LangZhCHT,base} from '../src/js/public/port'
let option = {
  vuei18n,LoadingPlugin,ToastPlugin
}
window.Vue = Vue
const i18n = new vuei18n({
  locale: base.methods.getLanguage(),
  messages:{
    'en': LangEn,
    'zhCHS': LangZhCHS,
    'zhCHT': LangZhCHT
  }
})
/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})

function scrollFunc (evt) {
  evt = evt || window.event
  if (evt.preventDefault) {
    // Firefox
    evt.preventDefault()
    evt.stopPropagation()
  } else {
    // IE
    evt.cancelBubble = true
    evt.returnValue = false
  }
  return false
}
function disabledMouseWheel (obj) {
  if (document.addEventListener) {
    obj.addEventListener('DOMMouseScroll', scrollFunc, false)
  }
  obj.onmousewheel = scrollFunc
}
window.onload = disabledMouseWheel(window)
if (window.location.hash !== '#/login') router.push('/live/TYZQ')

