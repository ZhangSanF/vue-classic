<template>
      <div class="chess_teaching_box">
            <div class="chess_box_mask">
                  <div class="chess_content_container">
                        <p class="back_to_desk">
                              <a class="back_to_desk_btn" v-if="showBackToDesk" @click="showDownloadBtn">
                                    <i class="dot_first"></i>
                                    <i class="dot_second"></i>
                                    <i class="dot_third"></i>
                                    <b>请到桌面查看进度</b>
                              </a>
                              <a class="install_app_now" v-else @click="showBackToDest"></a>
                              <a class="close_cur_page_btn" @click="goBack"></a>
                        </p>
                        <p class="open_setting">安装后请打开手机设置，通用-设备管理-选择-信任，才能使用，可参照以下教程进行操作。</p>
                        <p class="trust_statement">
                              <span>本游戏是由苹果公司颁发的企业证书发布，安装过程中需设置信任开发者。</span>
                              <i>请放心选择“信任”。</i>
                        </p>
                        <p class="teaching_step_1">
                              1、返回桌面查看，确认App安装完成，打开App若提示
                              “未受信任企业开发者”，请记住图中下划线的名称。
                        </p>
                        <div class="step_1_tip">
                              <p class="tip_title">未受信任的企业级开发者</p>
                              <p class="tip_content">
                                    <span>"iPhone Distribuyion:</span>
                                    <span class="tip_cpn_name">Shenzhen Apexls Optoelectronic Co.Ltd.</span>
                                    <span>"在此iPhone上尚未受信任,在信任该开发者之前,其企业级应用将不可使用.</span>
                              </p>
                              <p class="tip_cancel_btn">取消</p>
                        </div>
                        <p class="teaching_step_2">2、打开“设置”</p>
                        <div class="step_2_tip"></div>
                        <p class="teaching_step_3">3、选择“通用”</p>
                        <div class="step_3_tip"></div>
                        <p class="teaching_step_4">4、找到设备管理选项，点击进入管理</p>
                        <div class="step_4_tip">设备管理</div>
                        <p class="teaching_step_5">5、找到需要授权信任的企业级应用</p>
                        <div class="step_5_tip">Shenzhen Apexls Optoelectronic Co.Ltd.</div>
                        <p class="teaching_step_6">6、信任该证书，并在弹窗中点击信任</p>
                        <div class="step_6_tip">
                              <div class="trust_txt">
                                    信任
                                    <span>"Shenzhen Apexls Optoelectronic Co.Ltd."</span>
                              </div>
                              <div class="come_from_txt">
                                    <span>来自开发者”</span>
                                    <span class="dev_name">IPHONE DISTRIBUTION:SHENZHEN APEXLS OPTOELECTRONIC CO.,LTD.
                                    </span>
                                    <span>”的应用</span>
                              </div>
                              <div class="verified_txt">
                                    <span class="game_logo_icon">
                                          <i></i>
                                          <span>新皇冠体育</span>
                                    </span>
                                    <span class="result_txt">已验证</span>
                              </div>

                        </div>
                        <p class="teaching_finish">完成操作，即可开启最火热的棋牌游戏之旅！</p>
                  </div>
            </div>
      </div>
</template>

<script>
      export default {
            data() {
                  return {
                        showBackToDesk: false,
                  }
            },
            methods: {
                  goBack() {  //退出下载教程页
                        this.$emit('closeTeaching');
                  },
                  showBackToDest() {   //显示返回桌面按钮
                        this.showBackToDesk = true;
                  },
                  showDownloadBtn() {  //显示下载APP按钮
                        this.showBackToDesk = false;
                  }
            }
      }
</script>

<style scoped lang="scss">
      @import "../../themes/download/download_teaching";
</style>