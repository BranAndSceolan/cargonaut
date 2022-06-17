<template>
  <div id="app">
    <NavBar></NavBar>
    <nav>
      <div>
        <b-card-group deck>
          <travel-card name="Test" start="Gießen" stop="Frankfurt" seats="3" room="2" price="19,99"></travel-card>
          <travel-card name="Ich entführe euch alle" start="???" stop="Polen" seats="2" room="8" price="0,00"></travel-card>
          <travel-card name="Free Candy" start="Pausenhof" stop="???" seats="2" room="8" price="0,00"></travel-card>
          <travel-card name="Pazifik fahrt" start="Irrenhaus" stop="Marianengraben" seats="2" room="8" price="0,00"></travel-card>
          <travel-card name="Free Ethanol" start="Keller" stop="Krankenhaus" seats="1" room="2" price="15000,00"></travel-card>
          <travel-card name="*nuscheln*" start="???" stop="Bett" seats="?" room="?" price="0,00"></travel-card>
          <travel-card name="Wirres Zeug" start="Dusche" stop="Nobelpreis" seats="?" room="?" price="0,00"></travel-card>
        </b-card-group>
      </div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
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
import TravelCard from '@/components/travel-card'
export default {
  components: { TravelCard, FootBar, NavBar }
}
</script>
