
/**
* 系统公用方法，如开发人员需要类似的，另外单独建立
* colin 2018-3-21 21:10:10
*/
<template>
  <my-header></my-header>
</template>

<script>
/* eslint-disable quotes */

import {MyHeader} from '../router/api'

export default{
  components: {
    'my-header': MyHeader
  },
  mounted () {
    window.localStorage.setItem("tabType", this.$route.query.type)
    this.$router.push({path: this.$route.query.url, query: {params: this.$route.query.params}})
  }
}
</script>

<style scoped>

</style>
