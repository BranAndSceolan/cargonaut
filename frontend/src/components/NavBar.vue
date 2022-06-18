<template>
  <b-navbar class="navbar">
    <b-navbar-brand>
      <img src="../assets/cargonaut-white.png" class="logo" alt="Cargonaut Logo">
    </b-navbar-brand>
    <b-navbar-nav>
      <!-- <b-nav-item href="/overview" class="link"> Angebote </b-nav-item> -->
      <router-link to="/overview" class="link">Overview</router-link>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <div class="link">ICON</div>
    </b-navbar-nav>
  </b-navbar>

</template>

<script>
export default {
  name: 'navBar'
}
</script>

<style scoped>
.navbar{
  background: #005b52;
}
.logo{
  height: 60px;
}
.link{
  color: white;
  font-size: 25px;
}

</style>
