/* eslint-disable eqeqeq,no-undef,quotes,indent,curly,one-var,no-unused-vars */
var SIGN_REGEXP = /([yMdhsm])(\1*)/g
var DEFAULT_PATTERN = 'yyyy-MM-dd'

export default {
  getQueryByName:function(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  },
  getQueryStringByName: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
    var r = window.location.search.substr(1).match(reg)
    var context = ""
    if (r != null) {
      context = r[2]
    }
    reg = null
    r = null
    return context == null || context == "" || context == "undefined" ? "" : context
  },
  formatDate: {
    format: function (date, pattern) {
      pattern = pattern || DEFAULT_PATTERN
      return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
          case 'y': return padding(date.getFullYear(), $0.length)
          case 'M': return padding(date.getMonth() + 1, $0.length)
          case 'd': return padding(date.getDate(), $0.length)
          case 'w': return date.getDay() + 1
          case 'h': return padding(date.getHours(), $0.length)
          case 'm': return padding(date.getMinutes(), $0.length)
          case 's': return padding(date.getSeconds(), $0.length)
        }
      })
    },
  parse: function (dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP)
      var matchs2 = dateString.match(/(\d)+/g)
      if (matchs1.length == matchs2.length) {
        var _date = new Date(1970, 0, 1)
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i])
          var sign = matchs1[i]
          switch (sign.charAt(0)) {
            case 'y': _date.setFullYear(_int); break
            case 'M': _date.setMonth(_int - 1); break
            case 'd': _date.setDate(_int); break
            case 'h': _date.setHours(_int); break
            case 'm': _date.setMinutes(_int); break
            case 's': _date.setSeconds(_int); break
          }
        }
        return _date
      }
      return null
    },
    /**
     * 时间戳转换
     * @param unixTime 时间毫秒数
     * @param timeZone 时区-12至12
     * @param ymd 日期格式y-M-D h:m:s.ss
     * @param isCN 是否加上汉字
     * @returns {string}
     * @constructor
     */
    UnixToDate: function (unixTime, timeZone, ymd, isCN) {
      if (unixTime == 0 || unixTime == "" || unixTime == null) {
        return 0;
      } else {
        if (typeof (timeZone) == 'number') {
          unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60 * 1000
        }
        let time = new Date(unixTime)
        let y = '', M = '', D = '', h = '', m = '', s = '', t = ''
        if (ymd) {
          if (ymd.indexOf("y") != -1) y = time.getFullYear() + "-"
          if (ymd.indexOf("M") != -1) M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) + "-" : time.getMonth() + 1 + "-")
          if (ymd.indexOf("D") != -1) D = (time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate())
          if (ymd.indexOf("h") != -1) h = (time.getHours() < 10 ? '0' + (time.getHours()) : time.getHours())
          if (ymd.indexOf("m") != -1) m = ":" + (time.getMinutes() < 10 ? '0' + (time.getMinutes()) : time.getMinutes())
          if (ymd.indexOf("s") != -1) s = ":" + (time.getSeconds() < 10 ? '0' + (time.getSeconds()) : time.getSeconds())
          if (ymd.indexOf("t") != -1 && unixTime.toString().length >= 13) t = "." + unixTime % 1000
        }
        return y + M + D + " " + h + m + s + t
      }
    }
  },
  /**
   * 判断对象是否为空
   * @param e
   * @returns {boolean}
   */
  isEmptyObject: function (e) {
    let t
     for (t in e)
      return !1
    return !0
  },
  /**
   * 判断变量是否为不为空
   */
  isNotEmpty: function () {
    let b
    for (let i in arguments) {
      b = typeof (arguments[i]) != "undefined" && arguments[i] != null
    }
    return b
  },
  /**
   * 判断变量是否为不为空(包含空字符串)
   */
  isTarEmpty: function () {
    let b
    for (let i in arguments) {
      b = typeof (arguments[i]) != "undefined" && arguments[i] != null && arguments[i] != ""
    }
    return b
  },
  /**
   * 获取一周的时间
   */
  getWeekTime: function (mix = 1, max = 8) {
    let arr = []
    let _this = this
    /*for (let i = mix; i < max; i++) {
      let obj = {}
      obj['key'] = _this.formatDateYMD(new Date(new Date().setDate(_this.getDateForTimezone(-4).getDate() + (i - mix))))
      obj['value'] = obj['key']
      arr.push(obj)
    }*/
    let weekDate = _this.getDateForTimezone(-4);
    for (let i = mix; i < max; i++) {
      if(i != mix)
        weekDate.setDate(weekDate.getDate() + 1);
      let obj = {};
      obj['key'] = _this.formatDateYMD(weekDate);
      obj['value'] = obj['key'];
      arr.push(obj);
    }
    return arr
  },
  /**
   * 根据传进的时区来获取时间
   *
   * 东八区:8,西四区:-4
   */
  getDateForTimezone (timezone) {
    if (typeof timezone === 'number') {
      let localDate = new Date()
      let localTime = localDate.getTime()
      let offset = localDate.getTimezoneOffset() * 60000
      let utcTime = localTime + offset
      return new Date(utcTime + 3600000 * timezone)
    }
  },
  formatDateYMD: function (date) {
    let month = (date.getMonth() + 1)
    month = month < 10 ? '0' + month : month
    let day = date.getDate()
    day = day < 10 ? '0' + day : day
    return date.getFullYear() + '-' + month + '-' + day
  },
  arrObjToMap (arrobj, attr) {
    let obj = {}
    for (let i in arrobj.command) {
      obj[arrobj.command[i][attr]] = arrobj.command[i]
    }
    return obj
  },
  formatOdds:function (data) {
    if(data==null){
      return
    }
    let odds = parseFloat(data);
    let format = Math.round(odds*100)/100;
    let s = format.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
  },
  showData(betData ,that){
    let type = betData.betType;
    let playName;
    switch (type) {
      case 3010012:
      case 3020012:
        playName = "足球-让球"
        break
      case 3010013:
      case 3020013:
        playName = "足球-大小"
        if (betData.host) {
          that.showDetail = true;
          that.dx = "大"
        } else {
          that.showDetail = true;
          that.dx = "小"
        }
        break
      case 3010014:
      case 3020014:
        playName = "足球-单双"
        break
      case 3010011:
      case 3020011:
        playName = "足球-独赢"
        break
      case 3020021:
      case 3010021:
        playName = "足球-独赢-上半场"
        break
      case 3020023:
      case 3010023:
        playName = "足球-大小-上半场"
        break
      case 3010022:
      case 3020022:
        playName = "足球-让球-上半场"
        break
      case 3040010:
      case 3040020:
      case 3040030:
      case 3040040:
      case 3040050:
      case 3040060:
      case 3040110:
      case 3040120:
      case 3040130:
      case 3040140:
      case 3040160:
        playName = "足球-波胆-上半场"
        break
      case 3030010:
      case 3030020:
      case  3030030:
      case  3030040:
      case  3030050:
      case  3030060:
      case  3030070:
      case  3030080:
      case  3030090:
      case  3030100:
      case  3030110:
      case  3030120:
      case  3030130:
      case  3030140:
      case  3030150:
      case  3030160:
        playName = "足球-波胆"
        break
      case  3050010:
      case  3050020:
      case  3050030:
      case  3050040:
        playName = "足球-总进球数"
        break
      case  3060010:
      case  3060020:
      case  3060030:
      case  3060040:
      case  3060050:
      case  3060060:
      case  3060070:
      case  3060080:
      case  3060090:
        playName = "足球-半场/全场"
        break
      case 3110010:
      case 3120010:
        playName = "篮球&美式足球-让球"
        break
      case 3110020:
      case 3120020:
        playName = "篮球&美式足球-大小"
        if (betData.host) {
          that.showDetail = true;
          that.dx = "大"
        } else {
          that.showDetail = true;
          that.dx = "小"
        }
        break
      case 3110040:
      case 3120040:
        playName = "篮球&美式足球-独赢"
        break
      case 3110050:
      case 3120050:
        playName = "篮球&美式足球-球队得分"
        if(betData.isWho==="0"||betData.isWho==="1") {
          if (betData.host) {
            playName = "篮球&美式足球-球队得分:" + betData.hteam + '-大/小'
            that.showDetail = true;
            that.dx = "大"
          } else {
            playName = "篮球&美式足球-球队得分:" + betData.hteam + '-大/小'
            that.showDetail = true;
            that.dx = "小"
          }
        }else if(betData.isWho==="2"||betData.isWho==="3"){
          if (betData.host) {
            playName = "篮球&美式足球-球队得分:" + betData.gteam + '-大/小'
            that.showDetail = true;
            that.dx = "大"
          } else {
            playName = "篮球&美式足球-球队得分:" + betData.gteam + '-大/小'
            that.showDetail = true;
            that.dx = "小"
          }
        }
        break;
      case 3420010:
      case 3410020:
        playName = "棒球-让球"
        break
      case 3420020:
      case 3410030:
        playName = "棒球-大小"
        if (betData.host) {
          that.showDetail = true;
          that.dx = "大"
        } else {
          that.showDetail = true;
          that.dx = "小"
        }
        break
      case 3410040:
      case 3420040:
        playName = "棒球-单双"
        break;
      case 3410010:
      case 3420030:
        playName = "棒球-独赢"
        break;
      case 3410070:
      case 3420050:
        playName = "棒球-首五局/主客和"
        break;
      case 3410050:
      case 3420060:
        playName = "棒球-首五局/让球"
        break;
      case 3410060:
      case 3420070:
        playName = "棒球-首五局/大小"
        if (betData.host) {
          that.showDetail = true;
          that.dx = "大"
        } else {
          that.showDetail = true;
          that.dx = "小"
        }
        break;
      case 3210010:
      case 3220030:
        playName = "网球-独赢"+this.titleReg(betData.hteam);
        break
      case 3210020:
      case 3220010:
        playName = "网球-"+this.titleRP(type,betData.hteam)+this.titleReg(betData.hteam);
        break
      case 3210030:
      case 3220020:
        playName = "网球-总局数:大小"+this.titleReg(betData.hteam);
        if (betData.host) {
          that.showDetail = true;
          that.dx = "大"
        } else {
          that.showDetail = true;
          that.dx = "小"
        }
        break
      case 3210050:
      case 3220040:
        if(betData.isWho==="0"||betData.isWho==="1") {
          if (betData.host) {
            playName = "网球:球员局数:" + betData.hteam + '-大/小'
            that.showDetail = true;
            that.dx = "大"
          } else {
            playName = "网球:球员局数:" + betData.hteam + '-大/小'
            that.showDetail = true;
            that.dx = "小"
          }
        }else if(betData.isWho==="2"||betData.isWho==="3"){
          if (betData.host) {
            playName = "网球:球员局数:" + betData.gteam + '-大/小'
            that.showDetail = true;
            that.dx = "大"
          } else {
            playName = "网球:球员局数:" + betData.gteam + '-大/小'
            that.showDetail = true;
            that.dx = "小"
          }
        }
        break
      case 3510020:
      case 3520020:
        playName = "其他-让球"
        break
      case 3510030:
      case 3520030:
        playName = "其他-大小"
        if (betData.host) {
          that.showDetail = true;
          that.dx = "大"
        } else {
          that.showDetail = true;
          that.dx = "小"
        }
        break
      case 3510010:
      case 3520010:
        playName = "其他-独赢"
        break
      case 3510040:
      case 3520040:
        playName = "其他-单双"
        break
      case 3310010:
      case 3320030:
        playName = "排球-独赢"+this.titleReg(betData.hteam);
        break
      case 3310020:
      case 3320010:
        playName = "排球-"+this.titleRP(type,betData.hteam)+this.titleReg(betData.hteam);
        break
      case 3310030:
      case 3320020:
        playName= "排球-总分大小"+this.titleReg(betData.hteam)
        if (betData.host) {
          that.showDetail = true;
          that.dx = "大"
        } else {
          that.showDetail = true;
          that.dx = "小"
        }
        break
      case 3310050:
      case 3320040:
        if(betData.isWho==="0"||betData.isWho==="1") {
          if (betData.host) {
            playName = "排球-球队得分:" + betData.hteam + '-大/小'
            that.showDetail = true;
            that.dx = "大"
          } else {
            playName = "排球-球队得分:" + betData.hteam + '-大/小'
            that.showDetail = true;
            that.dx = "小"
          }
        }else if(betData.isWho==="2"||betData.isWho==="3") {
          if (betData.host) {
            playName = "排球-球队得分:" + betData.gteam + '-大/小'
            that.showDetail = true;
            that.dx = "大"
          } else {
            playName = "排球-球队得分:" + betData.gteam + '-大/小'
            that.showDetail = true;
            that.dx = "小"
          }
        }
        break
    }
    return playName
  },
  titleReg(string){
    let title
    if (string.indexOf("-") === -1) {
      title = ''
    } else {
      let reg = /\((.+)\)/g
      let name;
      name = string.split("-")[1].match(reg)
      if(name!==null){
        if(name.indexOf('(让局)')!==-1){
          title=''
        }else{
          title='-'+name
        }
      } else{
        title=''
      }
    }
    return title
  },
  titleRP(type,team){
   let title
    if(type===3210020||type==3220010){
   if(team.indexOf("-")===-1){
     title= '让盘'
   } else {
     title= '让局'
   }
    }else{
      if(team.indexOf("-")===-1){
        title= '让局'
      } else {
        title= '让分'
      }
    }
   return title
  },
  /**
   * 可赢金额截取2位有效数字
   */
  formatMoney:function (data) {
    if (data == null) {
      return;
    }
    let odds = parseFloat(data);
    let format = Math.round(odds * 1000) / 1000;
    let s = format.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    //将S截取两位
    return s.substr(0,s.indexOf(".")+3);
  },
  //计算未结算注单的可赢金额
  betAward: function (currentOdds, amount) {
    if(currentOdds<0){
      return amount;
    }else {
      var money= Math.round(amount * currentOdds*10000)/10000;
//          var money= amount * currentOdds;
//          console.log(money)
      if (money < money.toFixed(2)) {
        return (Math.floor(parseFloat(money) * 100) / 100).toFixed(2)
      } else if (money > (money).toFixed(2)) {
        return money.toFixed(2);
      }else {
        return money;
      }

    }
  },
  playName: function (playname, betContent) {
    var playNames = ['3020022', '3020012', '3010022', '3420010', '3410050', '3420060', '3510020', '3410020', '3520020', '3610020', '3620020', '3010012', '3520050','3110010','3120010','3210020','3220010','3310020','3320010','3710020','3720020','3810020','3820020'];
    if (playNames.indexOf(playname) >= 0) {
      if (JSON.parse(betContent).isHteam === 'Y') {
        return 0
      } else {
        return 1
      }
    } else {
      return 2
    }
  },
  getMonthAndDayAndHours: function (data) {
    if (data == null) {
      return
    }
    let s="";
    let timeArray=[];
    let year = '';
    let month="";
    let day="";
    let hours="";
    if(data.split(" ").length!=2)
    {
      return "";
    }
    hours=data.split(" ")[1];
    timeArray=data.split(" ")[0];

    if(timeArray.split("-").length!=3)
    {
      return "";
    }
    let strDate = this.getDate(timeArray);

    let weekNum = this.getWeekNum(strDate);

    month=timeArray.split("-")[1];
    day=timeArray.split("-")[2];
    s=month+"月"+day+"日"+" "+weekNum+" "+hours;
    return s;
  },
  getNewHours: function (data) {
    if (data == null) {
      return
    }
    let hours="";
    if(data.split(" ").length!=2)
    {
      return "";
    }
    hours=data.split(" ")[1];
    return hours;
  },
  getMondy:function(data){
    if (data == null) {
      return
    }

    let timeArray=[];
    if(data.split(" ").length!=2)
    {
      return "";
    }
    timeArray=data.split(" ")[0];
    if(timeArray.split("-").length!=3)
    {
      return "";
    }
    let strDate = this.getDate(timeArray);
    let weekNum = this.getWeekNum(strDate);
    return weekNum;
  },
  getMonthDay: function (data) {
    if (data == null) {
      return
    }
    let s="";
    let timeArray=[];
    let year = '';
    let month="";
    let day="";
    if(data.split(" ").length!=2)
    {
      return "";
    }
    timeArray=data.split(" ")[0];
    if(timeArray.split("-").length!=2)
    {
      return "";
    }
    let strDate = this.getDate(timeArray);
    let weekNum = this.getWeekNum(strDate);
    console.log(weekNum,"weekNum")
    month=timeArray.split("-")[0];
    day=timeArray.split("-")[1];
    s=month+"月"+day+"日";
    return s;
  },
  getMonthAndDay: function (data) {
    if (data == null) {
      return
    }
    let s="";
    let timeArray=[];
    let year = '';
    let month="";
    let day="";
    if(data.split(" ").length!=2)
    {
      return "";
    }
    timeArray=data.split(" ")[0];
    if(timeArray.split("-").length!=2)
    {
      return "";
    }
    let strDate = this.getDate(timeArray);
    let weekNum = this.getWeekNum(strDate);
    console.log(weekNum,"weekNum")
    month=timeArray.split("-")[0];
    day=timeArray.split("-")[1];
    s=month+"月"+day+"日"+" "+weekNum;
    return s;
  },
  getDate(strDate){
    var regEx = new RegExp("\\-","gi");
    strDate = strDate.replace(regEx,"/");
    var milliseconds = Date.parse(strDate);

    var date = new Date();
    date.setTime(milliseconds);
    return date;
  },
  getWeekNum(strDate){
    let weekStr = new Date(strDate).getDay();
    console.log(weekStr,"weekStr")
    let weekNum = '';
    switch (weekStr+''){
      case '1':
        weekNum = '星期一';
        break;
      case '2':
        weekNum = '星期二';
        break;
      case '3':
        weekNum = '星期三';
        break;
      case '4':
        weekNum = '星期四';
        break;
      case '5':
        weekNum = '星期五';
        break;
      case '6':
        weekNum = '星期六';
        break;
      case '0':
        weekNum = '星期日';
        break;

    }
    return weekNum;
  }
}
