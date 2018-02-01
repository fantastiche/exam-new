<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created: function () {
      let SHOPCODE = location.href.split('?')[1].split('&')[0].split('=')[1]
      let USERID = location.href.split('?')[1].split('&')[1].split('=')[1]
      let LEVEL = location.href.split('?')[1].split('&')[2].split('=')[1]
      let CATALOGUE = location.href.split('?')[1].split('&')[3].split('=')[1]
      localStorage.setItem('SHOPCODE', SHOPCODE)
      localStorage.setItem('USERID', USERID)
      localStorage.setItem('LEVEL', LEVEL)
      localStorage.setItem('CATALOGUE', CATALOGUE)
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
    width: 100%;
    height: 100%;
    background: #ffffff;
  }

  body {
    background-color: #fbf9fe;
  }
</style>
