
<template>
  <div class="synthesize">

    <div v-if="orderState !== 'betSuccess'">
      <div class="t-title">
        <p>
          <span class="trading-card">{{ $t('msg.trade_order')}}</span>
          <span class="money">{{$t('msg.current_balance') }}: <em>{{userBalance}}</em></span>
        </p>
        <p>
          <span class="iconfont icon-left close-style" @click="closeMixDialog"></span>
        </p>
      </div>
      <div class="t-content">
        <div class="content-box">
          <div class='wrapper-box' ref='wrapper'>
            <div>
              <ul>
                <li class="list-item" v-for="(item, index) in showTextObj" v-if="showTextObj.length == oddsData.length">
                  <p class="league-name">西班牙甲组联赛</p>
                  <p class="ball-name">{{item.playName}}
                    <span v-if="oddsData[index].hScore >= 0 || oddsData[index].hScore == -1">({{oddsData[index].hScore == -1 ? 'A':oddsData[index].hScore}}:{{item == -1 ? 'A':oddsData[index].gScore}})</span>
                  </p>
                  <p class="title-names">
                    {{item.hTeam}}
                    <span class="number-fen">{{oddsData[index].isWho == '0' || oddsData[index].isWho == '1' ? oddsData[index].detail : ' '}}</span>
                    VS
                    {{item.gTeam}}
                    <span class="number-fen">{{oddsData[index].isWho == '2' || oddsData[index].isWho == '3' ? oddsData[index].detail : ' '}}</span>
                  </p>
                  <p class="names">
                    {{item.betPoint}}
                    <span class="number-fen">{{oddsData[index].xDetail == null ? '' : oddsData[index].xDetail}}</span>
                    <span class="number-fen">@{{oddsData[index].exOdds}}</span>
                  </p>
                  <span class="iconfont icon-close1 close-style" @click="deleteItem(index)"></span>
                </li>
              </ul>
            </div>
            <div class="mask"></div>
          </div>
          <div class="t-bet">
            <div class="bet-money">
              <p>
                {{$t('msg.single_bet_min') }}: <span class="number-money">{{minBet}}</span>
                {{$t('msg.single_bet_max') }}: <span class="number-money">{{maxBet}}</span>
              </p>
              <p  @click="deleteAllItem" >
                <i class="eliminate-font">清空</i>
                <i class="iconfont icon-eliminate eliminate"></i>
              </p>
            </div>
            <div class="bet-e">
              <div class="input-box">
                <input placeholder="投注额" class="input" type="tel" v-model="inputMoney"  pattern="\d*"
                       v-focus="focusState" contenteditable="true" >
                <i class="iconfont icon-close1 input-close" @click="clearMoney"></i>
              </div>
              <p @click="radioState">
                <span class="select-yuan" v-if="!chooseRadio" ></span>
                <span class="select-tu" v-if="chooseRadio" ><img style="width: 30px" src="../../../static/images/check1.png" alt=""></span>
                <span class="select-font"  >{{$t('msg.accept_higher_bet_auto') }}</span>
              </p>
            </div>
          </div>

        </div>
        <p class="warn" v-if="infoMsg!=''&& infoMsg!=null"><i class="rs rs-danger"></i><span>{{infoMsg}}</span></p>
      </div>
      <div class="t-footer">
        <!--<div class="not-content">请输入投注金额</div>-->
        <div v-if="betStatus==='N'" class="btn-content" @click="changeConfirmState">
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

    <div v-if="orderState === 'betSuccess'">
      <div class="su-title">
        <div class="title-left">
          <span class="iconfont icon-win close-style"></span>
          <div>
            <p class="submit-su">{{$t('msg.submit_success') }} <span>滚球待确认，请稍后查看</span</p>
            <p class="odds-su">{{$t('msg.bet_order_code') }}：{{betCode}}</p>
          </div>
        </div>
        <div>
          <span class="iconfont icon-close1 close-style" @click="closeMixDialog"></span>
        </div>
      </div>
      <div class="su-content">
        <div class="content-box">
          <div class='wrapper-box' ref='wrapper'>
            <div>
              <ul>
                <li class="list-item" v-for="(item, index) in showTextObj" v-if="showTextObj.length == oddsData.length">
                  <p class="league-name">西班牙甲组联赛</p>
                  <p class="ball-name">{{item.playName}}
                    <span v-if="oddsData[index].hScore >= 0 || oddsData[index].hScore == -1">({{oddsData[index].hScore == -1 ? 'A':oddsData[index].hScore}}:{{item == -1 ? 'A':oddsData[index].gScore}})</span>
                  </p>
                  <p class="title-names">{{item.hTeam}} <span class="number-fen">{{oddsData[index].isWho == '0' || oddsData[index].isWho == '1' ? oddsData[index].detail : ' '}}</span>
                    VS
                    {{item.gTeam}} <span class="number-fen">{{oddsData[index].isWho == '2' || oddsData[index].isWho == '3' ? oddsData[index].detail : ' '}}</span></p>
                  <p class="names">{{item.betPoint}}
                    <span class="number-fen">{{oddsData[index].xDetail == null ? '' : oddsData[index].xDetail}}</span>
                    <span class="number-fen">@{{oddsData[index].exOdds}}</span></p>
                  <!--<span class="iconfont icon-close1 close-style" @click="deleteItem(index)"></span>-->
                </li>
              </ul>
            </div>
            <div class="mask"></div>
          </div>
        </div>
        <div class="su-predict">
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

<script src="../../js/public/mixBet.js">
</script>

<style lang="scss">
  .synthesize{width: 100%;background: #F0F0F0;//height: 569px;
    .t-title{height: 48px;background: #BC7D10;display: flex;justify-content: space-between;align-items: center;padding-left: 12px;color: #FFFFFF;
      p:nth-child(1){display: flex;justify-content: space-between;align-items: center;
        .trading-card{font-size: 15px;margin-right: 5px}
        .money{font-size: 12px}
      }
      .close-style{font-size: 25px;margin-right: 5px;display: inline-block;transform:rotate(-90deg);}
    }
    .t-content{padding: 8px;
      .content-box{background: #FFFFFF;box-shadow:0px 2px 2px rgba(#000,0.2);
        .wrapper-box{height: 264px;overflow: hidden;position: relative;
          .mask{position: absolute;width: 100%;height: 42px;bottom: 0;background: linear-gradient(top, #FFFFFF, #F6F6F6);opacity: .86 }
          .list-item{border-bottom: 1px solid #F0F0F0;padding: 10px 13px;position: relative;
            .league-name{font-size: 16px;color: #323232;padding-bottom: 8px}
            .ball-name{font-size: 14px;color: #999999}
            .title-names{font-size: 15px;color: #323232;padding: 6px 0;//line-height: 35px;
              .number-fen{font-size: 15px;color: #C7270A}
            }
            .names{font-size: 15px;color: #323232;
              .number-fen{font-size: 15px;color: #C7270A}
            }
            .close-style{position: absolute;color: #999999;top: 0;right: 5px;font-size: 22px}
          }
        }
        .t-bet{padding: 12px 13px 14px 13px;
          .bet-money{height: 36px;font-size: 12px;color: #999999;display: flex;justify-content: space-between;align-items: center;
            .number-money{font-size: 12px;color: #333333;font-weight: bold}
            .eliminate-font{vertical-align: middle}
            .eliminate{vertical-align: middle}
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
        i{color:#ff9200;font-size:28px;padding: 0 5px}
      }
    }
    .t-footer{height: 64px;box-sizing: border-box;background: #FFFFFF;padding: 8px;
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
      .content-box{background: #FFFFFF;box-shadow:0px 2px 2px rgba(#000,0.2);
        .wrapper-box{height: 332px;overflow: hidden;position: relative;
          .mask{position: absolute;width: 100%;height: 42px;bottom: 0;background: linear-gradient(top, #FFFFFF, #F6F6F6);opacity: .86 }
          .list-item{border-bottom: 1px solid #F0F0F0;padding: 10px 13px;
            .league-name{font-size: 16px;color: #323232;padding-bottom: 8px}
            .ball-name{font-size: 14px;color: #999999}
            .title-names{font-size: 15px;color: #323232;padding: 6px 0;//line-height: 35px;
              .number-fen{font-size: 15px;color: #C7270A}
            }
            .names{font-size: 15px;color: #323232;
              .number-fen{font-size: 15px;color: #C7270A}
            }
          }
        }
      }
      .su-predict{height: 32px;background: #FFFFFF;margin-top: 8px;display: flex;justify-content: space-between;align-items: center;padding: 0 8px;box-shadow:0px 2px 2px rgba(#000,0.2);
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
  }
</style>

