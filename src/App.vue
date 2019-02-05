<template>
  <div id="app">
    <MenuTop></MenuTop>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
  import MenuTop from './components/top/menu-top'
  import Footer from './components/footer/Footer'
export default {
  name: 'App',
  components: {
    'MenuTop': MenuTop,
    'Footer': Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:90%;
  margin-left: 5%;
  margin-top: 0;
  background-color: #ffffff;
}
</style>
