/**
 * 表单验证处理
 * colin 2018-3-18 21:10:10
 */
import VeeValidate, { Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';

Validator.updateDictionary({
  zh_CN: {
    zh_CN
  }
});

const config = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'zh_CN',
  messages: null,
  strict: true
};

export default {
  // 对Validate的实例重新封装成一个plugin
  install: function(Vue, Option) {
    Vue.use(VeeValidate,config);
    //Object.defineProperty(Vue.prototype, "$validator", { value: Validator });
  }
};

// 自定义validate
const dictionary = {
  zh_CN: {
    messages: {
      email: () => '请输入正确的邮箱格式',
      required: ( field )=> "请输入" + field
    },
    attributes:{
      password:'密码',
      name: '账号'
    }
  }
};

Validator.updateDictionary(dictionary);

