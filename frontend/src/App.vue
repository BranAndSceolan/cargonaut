<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view/>
    <footBar></footBar>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import NavBar from '@/components/NavBar'
import FootBar from '@/components/FootBar'
export default {
  components: { FootBar, NavBar }
}
</script>
