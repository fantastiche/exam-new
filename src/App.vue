<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created: function () {
      if (!localStorage.getItem('OPENID')) {
        let openId = location.href.split('?')[1].split('=')[1]
        localStorage.setItem('OPENID', openId)
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  html {
    height: 100%;
    width: 100%;
  }

  body {
    height: 100%;
    width: 100%;
    overflow-y: hidden;
    position: fixed;
  }

  #app {
    height: 100%;
  }

  body {
    background-color: #fbf9fe;
  }
</style>
