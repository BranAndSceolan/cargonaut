<template>
  <b-navbar class="navbar">
    <b-navbar-brand>
      <router-link to="/login" class="link">
        <img src="../assets/cargonaut-white.png" class="logo" alt="Cargonaut Logo">
      </router-link>
    </b-navbar-brand>
    <b-navbar-nav>
      <!-- <b-nav-item href="/overview" class="link"> Angebote </b-nav-item> -->
      <router-link v-if="dataIsLogin === false" to="/overview" class="link">Overview</router-link>
      <router-link v-if="dataIsLogin === true" to="/login" class="link">Overview</router-link>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto box">
      <router-link v-if="dataIsLogin === false" to="/profile">
        <font-awesome-icon icon="fa-solid fa-user" class="link icon mr-5"></font-awesome-icon>
      </router-link>
      <router-link v-if="dataIsLogin === true" to="/login">
        <font-awesome-icon icon="fa-solid fa-user" class="link icon mr-5"></font-awesome-icon>
      </router-link>
    </b-navbar-nav>
  </b-navbar>

</template>

<script>
export default {
  name: 'navBar',
  props: {
    isLogin: Boolean
  },
  data () {
    return {
      dataIsLogin: false
    }
  },
  mounted () {
    if (this.isLogin === true) this.dataIsLogin = true
  }
}
</script>

<style scoped>
.navbar{
  background: #005b52;
  margin-bottom: 2%;
}
.logo{
  height: 60px;
  margin-left: 4rem;
}
.link{
  color: white;
  font-size: 25px;
  margin-left: 10px;
}
.icon {
  font-size: 2.2em;
  margin-right: 2rem;
  margin-left: 1rem;
}
.box {
  margin-right: 12rem;
}
</style>
