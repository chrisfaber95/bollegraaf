<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
	overflow: scroll;
  overflow-x: hidden;
  background-color: rgba(20,20,255,0.4);
}

#app::after{
  content: "";
  background: url('./assets/bollegraaf_background.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  opacity: 0.5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}
.backimg{
  width:100vw;
  height: 100vh;
  position: absolute;
  z-index:0;
}
.backimg img{
  width:100%;
  height: 100%;
  filter: opacity(30%);
}
</style>
<style lang="scss">
  @import '@/assets/scss/app.scss';
</style>