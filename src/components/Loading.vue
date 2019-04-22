<template>
  <div id="loading">
    <div class="loading-box">
      <div class="xzbox">
        <i class="iconfont icon-football"></i>
      </div>
      <div class="shadom"></div>
      <div class="loadlite">
        <span>加载中</span>
        <div class="animition1"></div>
        <div class="animition1"></div>
        <div class="animition1"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading',
  }
</script>

<style scoped lang='scss'>

  #loading{font-size: 13px;position: fixed;width: 100%;height: 100%;background: rgba(#000000,0.2);top: 0;left: 0;z-index: 120000;}
  // animation: football .5s infinite linear;
  .loading-box{position: fixed;margin: auto;left: 0;right: 0;top: 0;bottom: 0;width: 90px;height: 90px;overflow: inherit;color: #C3C3C3;text-align: center;
    background:rgba(#000000, 0.73);border-radius: 14px;
    .xzbox{animation: football .7s infinite linear;position: relative;top:0;margin-top:5px;
      .icon-football{font-size: 40px;}
    }
    .shadom{width: 10px;height: 5px;background: #0c0c0c;display: block;position: absolute;margin: auto;left: 0;right: 0;top: 50px;
      border-radius: 50%;z-index: -1;animation: shadomfra .7s infinite linear;animation-delay:.4s;}
    .loadlite{text-align: center;}
  }

  @keyframes football{
    0%{transform: rotate(0deg);top:5px}
    50%{transform: rotate(180deg) ;top:-5px}
    100%{transform: rotate(360deg) ;top:5px}
  }

  @keyframes shadomfra {
    0%{width: 10px}
    50%{width: 20px}
    100%{width: 10px}
  }


  @keyframes animi1 {
    0% {
      background: #C3C3C3;
    }
    50% {
      background: none;
    }
    100% {
      background: #C3C3C3;
    }
  }

  .animition1 {
    width: 3px;
    height: 3px;
    border-radius: 100%;
    background: #C3C3C3;
    display: inline-block;
    overflow: hidden;
  }
  .animition1:nth-of-type(1) {
    animation: animi1 1s infinite linear;
  }
  .animition1:nth-of-type(2) {
    animation: animi1 1s 0.2s infinite linear;
  }
  .animition1:nth-of-type(3) {
    animation: animi1 1s .3s infinite linear;
  }

</style>

