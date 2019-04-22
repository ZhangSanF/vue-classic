<template>

  <div class="login-page passport">
    <x-header class="header" :left-options="{backText:' '}"> {{ $t("msg.login") }} </x-header>
    <div class="login">
      <form action="">
        <!--<p>-->
        <!--帐号<input v-validate="'required|confirmed:name'" name="name" ref="account" type="text" placeholder="请输入帐号">-->
        <!--<span v-show="errors.has('name')"  >{{ errors.first("name") }}</span>-->
        <!--</p>-->
        <!--<p>-->
        <!--密码<input v-validate="'required|confirmed:password'" name="password" type="text" ref="password" placeholder="请输入密码">-->
        <!--<span v-show="errors.has('password')"  >{{ errors.first("password") }}</span>-->
        <!--</p>-->
        <p>{{ $t("msg.login_name") }}<input ref="account" type="text" :placeholder="$t('msg.login_input_name')"><span></span></p>
        <p>{{ $t("msg.login_password") }}<input type="password" ref="password" :placeholder="$t('msg.login_input_password')"></p>
        <!--<router-link to="/mine/login/forget" class="btn_lose">忘记密码</router-link>-->
        <!--<p class="yzm">验证码<br/> <input type="text" placeholder="请输入验证码"><img src="" alt="验证码"> </p>-->
        <Box class="check_rember" @click.native="isRemember">
          <icon :type="remember ? 'success':'circle'"></icon><span>{{tips}}</span>
        </Box>
        <p class="btn_login" @click="login"> {{ $t("msg.login") }}</p>
        <!--<p class="btn_regis" @click="getMoney2">获取金额,验证是否登录成功</p>-->
        <p class="btn_regis" @click="getMoney3('zhCHS')">点击切换汉语</p>
        <p class="btn_regis" @click="getMoney3('zhCHT')">点击切换繁体</p>
        <p class="btn_regis" @click="getMoney3('en')">点击切换英语</p>
      </form>
      <div class="warning" :class="{'hide':ishide}"><i class="rs rs-danger"></i>{{msgData}}</div>
    </div>
  </div>

</template>

<script>

  import { XHeader,Box, Icon } from 'vux';
  import {store,base,tools,CONST,storages,axios} from "@/js/public/port";
  import { Validator } from 'vee-validate';
  export default{
    components: {
      XHeader,
      Box,
      Icon
    },
    data() {
      return {
        username:"",
        password:"",
        msgData:this.$t("msg.login_error"),
        ishide:true,
        checked: true,
        tips:'记住密码',
        remember:false
      };
    },
    methods:{
      isRemember(){
        this.remember = !this.remember
      },
      login:function () {
        let _this = this;
        _this.username = _this.$refs.account.value;
        _this.password = _this.$refs.password.value;
        if (_this.username === '' || _this.password === '') {
          alert('请输入用户名密码');
          return;
        }
        _this.$vux.loading.show();
        axios({
          baseURL: CONST.AGENCY,
          url: CONST.LOGIN,
          method: 'post',
          params: {username: this.username, password: this.password}
        }).then(function (data) {
          _this.$vux.loading.hide();
          if(data.success){
            storages.setUserObjSession('user',{username:data.username,money:data.money});
            store.state.user = {username:data.username,money:data.money};
            _this.$router.push('/live/TYZQ');
            _this.$vux.loading.hide();
          }else {
            tools.showMessege("1登录请求错误"+data.message)
          }

        }).catch(function (err) {
        //  _this.$iView.Message.error(err)
        });

      },
      getMoney:function () {
        let _this = this;
        let obj = {};
        obj.username = _this.username;
        window.localStorage.setItem("user",JSON.stringify(obj));
        //Base.methods.getMoney(true);
        window.localStorage.setItem("tabType",1);
        _this.$vux.loading.hide();

      },
      getMoney2:function () { //一次性多个请求(例子)
        this.$http.all([this.$http.get('/getMoney.html'),this.$http.get('/getMoney.html')])
          .then(this.$http.spread(function (a,b) {//全部请求正确时候触发
            console.log(a);
            console.log(b);
            console.log("请求全部加载完毕");
          }));
      },
      getMoney3:function(language){
        this.$i18n.locale=language;
       // Base.methods.settingLanguage(language);
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import '../../../themes/mine/passport.scss';
</style>
