
<template>
  <div class="test" >
      <div v-if="orderState !== 'betSuccess'">
          <div class="title" >
            <p>
              <span class="trading-card">{{ $t('msg.trade_order')}}</span>
              <span class="money">{{$t('msg.current_balance') }}: <em>{{userBalance}}</em></span>
            </p>
            <p>
              <span class="iconfont icon-close1 close-style" @click="closeDialog"></span>
            </p>
          </div>
          <div class="content">
            <ul>
              <li class="league-name">
                <div>西班牙甲组联赛</div>
              </li>
              <li class="title-names">
                <div>
                  <p class="name-ball">{{showTextObj[0].playName}}
                    <span v-show="oddsData[0].hScore >= 0 || oddsData[0].hScore == -1">({{oddsData[0].hScore == -1 ? 'A':oddsData[0].hScore}}:{{oddsData[0].gScore == -1 ? 'A':oddsData[0].gScore}})</span>
                  </p>
                  <p class="name-vs">
                    {{showTextObj[0].hTeam}}
                    <span class="number-fen">{{oddsData[0].isWho == '0' || oddsData[0].isWho == '1' ? oddsData[0].detail : ' '}}</span>
                    VS
                    {{showTextObj[0].gTeam}}
                    <span class="number-fen">{{oddsData[0].isWho == '2' || oddsData[0].isWho == '3' ? oddsData[0].detail : ' '}}</span>
                  </p>
                </div>
              </li>
              <li class="names">
                <div> {{showTextObj[0].betPoint}}
                  <span>{{oddsData[0].xDetail == null ? '' : oddsData[0].xDetail}}</span>
                  <span>@{{oddsData[0].exOdds}}</span>
                </div>
              </li>
              <li class="bet">
                <div class="bet-money">{{$t('msg.single_bet_min') }}: <span class="number-money">{{minBet}}</span> {{$t('msg.single_bet_max') }}: <span class="number-money">{{maxBet}}</span></div>
                <div class="bet-e">
                  <div class="input-box">
                    <input placeholder="投注额" class="input" type="tel" v-model="inputMoney"  pattern="\d*"
                           v-focus="focusState" contenteditable="true">
                    <i class="iconfont icon-close1 input-close" @click="clearMoney"></i>
                  </div>
                  <p @click="radioState" >
                    <span class="select-yuan" v-if="!chooseRadio" ></span>
                    <span class="select-tu" v-if="chooseRadio" ><img style="width: 30px" src="../../../static/images/check1.png" alt=""></span>
                    <span class="select-font"  >{{$t('msg.accept_higher_bet_auto') }}</span>
                  </p>
                </div>
              </li>
            </ul>
           <p class="warn" v-if="infoMsg!=''&& infoMsg!=null"><i class="rs rs-danger"></i><span>{{infoMsg}}</span></p>
          </div>
          <div class="footer">
           <!-- <div class="not-content" v-if="!showBtn">请输入投注金额</div>-->
            <div v-if="betStatus==='N'"  class="btn-content" @click="changeConfirmState">
              <h3>{{$t('msg.comfire_bet') }}</h3>
              <h4>{{$t('msg.may_win_amount') }} {{mayWinMoney}} RMB</h4>
            </div>
            <div v-if="betStatus==='Y'" class="the-bet">
                <h3>
                  下注提交中
                  <i class="iconfont icon-loading"></i>
                </h3>
                <h4>滚球盘投注会稍有延迟</h4>
            </div>
          </div>
      </div>

    <!-- 提交成功展示 -->
      <div v-if="orderState === 'betSuccess'">
        <div class="su-title">
          <div class="title-left">
            <span class="iconfont icon-win close-style"></span>
            <div>
              <p class="submit-su">{{$t('msg.submit_success') }} <span>滚球待确认，请稍后查看</span></p>  <!--{{infoMsg}}-->
              <p class="odds-su">{{$t('msg.bet_order_code') }}：{{betCode}}</p>
            </div>
            <!--<div><span style="color: darkorange;font-size: small;align-items: center;"  v-if="infoMsg!=''&& infoMsg!=null">{{infoMsg}}</span></div>-->
          </div>
          <div>
            <span class="iconfont icon-close1 close-style" @click="closeDialog"></span>
          </div>
        </div>
        <div class="su-content">
          <ul>
            <li class="league-name">
              <div>西班牙甲组联赛</div>
            </li>
            <li class="title-names">
              <div>
                <p class="name-ball">{{showTextObj[0].playName}}
                  <span v-show="oddsData[0].hScore >= 0 || oddsData[0].hScore == -1">({{oddsData[0].hScore == -1 ? 'A':oddsData[0].hScore}}:{{oddsData[0].gScore == -1 ? 'A':oddsData[0].gScore}})</span>
                </p>
                <p class="name-vs">
                  {{showTextObj[0].hTeam}}
                  <span class="number-fen">{{oddsData[0].isWho == '0' || oddsData[0].isWho == '1' ? oddsData[0].detail : ' '}}</span>
                  VS
                  {{showTextObj[0].gTeam}}
                  <span class="number-fen">{{oddsData[0].isWho == '2' || oddsData[0].isWho == '3' ? oddsData[0].detail : ' '}}</span>
                </p>
              </div>
            </li>
            <li class="names">
              <div> {{showTextObj[0].betPoint}}
                <span>{{oddsData[0].xDetail == null ? '' : oddsData[0].xDetail}}</span>
                <span>@{{oddsData[0].exOdds}}</span>
              </div>
            </li>
          </ul>
          <div class="predict-su">
            <p>{{$t('msg.bet_amount') }}: <span class="number-money">{{inputMoney}} RMB</span></p>
            <p>{{$t('msg.may_win_amount') }}: <span class="number-money">{{mayWinMoney}} RMB</span></p>
          </div>
        </div>
        <div class="su-footer">
          <p class="btn-left" @click="goHistory">{{$t('msg.show_bet_history') }}</p>
          <p class="btn-right" @click="goBackPage">{{$t('msg.continue') }}</p>
        </div>
      </div>

  </div>
</template>

<script src="../../js/public/bet.js">
</script>

<style lang="scss">
.test{width: 100%;background: #F0F0F0;//height: 383px;
  .title{    height: 48px;  background: #BC7D10;    padding-left: 12px;display: flex;justify-content: space-between;color: #FFFFFF;align-items: center;
    p:nth-child(1){display: flex;justify-content: space-between;align-items: center;
      .trading-card{font-size: 15px;margin-right: 5px}
      .money{font-size: 12px}
    }
    .close-style{font-size: 25px;margin-right: 5px}
  }
  .content{box-sizing:border-box;padding: 8px;//height: 271px;
    ul{background: #ffffff;box-shadow:0px 2px 2px rgba(#000,0.2);
      .league-name{padding: 0 13px;
        div{border-bottom: 1px dashed #E3E2E2;height: 42px;line-height: 42px;font-size: 16px;color: #323232}
      }
      .title-names{padding: 10px 13px 0 13px;
        div{border-bottom: 1px dashed #E3E2E2;padding-bottom: 11px;line-height: 24px;
          .name-ball{font-size: 14px;color: #999999;
            span{font-size: 14px}
          }
          .name-vs{font-size: 15px;color: #323232;
            .number-fen{font-size: 15px;color: #C7270A}
          }
        }
      }
      .names{border-bottom: 1px solid #F0F0F0;padding: 8px 13px;//height: 41px;line-height: 41px;
        div{font-size: 15px;color: #323232;
          span{font-size: 15px;color:#C7270A }
        }
      }
      .bet{padding: 0 13px 14px 13px;
        .bet-money{height: 36px;line-height: 36px;font-size: 12px;color: #999999;
          .number-money{font-size: 12px;color: #333333;font-weight: bold}
        }
        .bet-e{height: 46px;display: flex;justify-content: space-between;align-items: center;
          .input-box{width: 45%;position: relative;
            .input{width: 100%;height: 46px;border-radius: 4px;border: 1px solid #323232;    font-size: 15px;  padding: 0 8px;}
            .input-close{position: absolute;top: 50%;right: 5px;transform: translate(0,-50%);font-size: 25px;color: #999}
          }
          p{display: flex;justify-content: space-between;align-items: center;
            .select-yuan{width: 30px;height: 30px;border-radius: 50%;border: 1px solid #707070;display: inline-block;margin-right: 10px}
            .select-tu{width: 30px;height: 30px;display: inline-block;margin-right: 10px;}
            .select-font{font-size: 15px;color: #999999}
          }

        }
      }
    }
    .warn{height: 40px;border: 1px solid #BA4B30;margin-top: 8px;background:#ffffff;display: flex;align-items: center;font-size: 12px;color: #BA4B30;box-shadow:0px 2px 2px rgba(#000,0.2);
      i{font-size:28px;padding: 0 5px}
    }
  }
  .footer{height: 64px;box-sizing: border-box;background: #FFFFFF;padding: 8px;
    .not-content{height: 48px;line-height: 48px;text-align: center;background: #999999;border-radius: 4px;color: #FFFFFF;font-size: 16px}
    .btn-content{background: #51A47D;border-radius: 4px;height: 48px;padding: 3px 0;text-align: center;
      h3 {font-size: 16px; color: #fff; font-weight: initial;
        i.weui-loading {position: relative;top: -2px;}
      }
      h4 {font-size: 12px; color:rgba(#F8F8F7,0.5);font-weight:normal; }
    }
    .the-bet{
      background: #51A47D;border-radius: 4px;height: 48px;padding: 3px 0;text-align: center;
      h3 {font-size: 16px; color: #fff; font-weight: initial;position: relative;
        i{position: absolute;font-size: 22px;color: #fff;height: 24px;line-height: 24px;animation: rotateBet 1s linear infinite}
      }
      h4 {font-size: 12px; color:rgba(#F8F8F7,0.5);font-weight:normal; }
    }
  }

  //success
  .su-title{height: 48px;display: flex;justify-content: space-between;background: #BC7D10;align-items: center;
    .title-left{display: flex;justify-content: space-between;align-items: center;color: #FFFFFF;
      .close-style{margin-left: 5px}
      .submit-su{font-size: 15px;
        span{font-size: 12px;color: rgba(255,255,255,.62)}
      }
      .odds-su{font-size: 12px}
    }
    .close-style{color: #FFFFFF;font-size: 25px;margin-right: 5px}
  }
  .su-content{padding: 8px;
    ul{background: #ffffff;box-shadow:0px 2px 2px rgba(#000,0.2);
      .league-name{padding: 0 13px;
        div{border-bottom: 1px dashed #E3E2E2;height: 42px;line-height: 42px;font-size: 16px;color: #323232}
      }
      .title-names{padding: 10px 13px 0 13px;
        div{border-bottom: 1px dashed #E3E2E2;padding-bottom: 11px;line-height: 24px;
          .name-ball{font-size: 14px;color: #999999;
            span{font-size: 14px}
          }
          .name-vs{font-size: 15px;color: #323232;
            .number-fen{font-size: 15px;color: #C7270A}
          }
        }
      }
      .names{border-bottom: 1px solid #F0F0F0;padding: 8px 13px;//height: 40px;line-height: 40px;
        div{font-size: 15px;color: #323232;
          span{font-size: 15px;color:#C7270A }
        }
      }
    }
    .predict-su{height: 32px;background: #FFFFFF;margin-top: 8px;display: flex;justify-content: space-between;align-items: center;padding: 0 8px;box-shadow:0px 2px 2px rgba(#000,0.2);
      p{font-size: 12px;color: #999999;
        .number-money{font-size: 12px;color: #51A47D;font-weight: bold}
      }
    }
  }
  .su-footer{height: 64px;padding: 8px;background: #FFFFFF;display: flex;justify-content: space-between;align-items: center;
    p{width: 49%;height: 48px;line-height: 48px;text-align: center;border-radius: 4px}
    .btn-left{font-size: 16px;color: #333333;background: #E5E0DC}
    .btn-right{font-size: 16px;color: #FFFFFF;background: #51A47D}
  }
  @keyframes rotateBet {
    0% {transform : rotate(0deg);}
    100% {transform : rotate(360deg);}
  }
}
</style>

