<template>
  <b-navbar class="navbar">
    <b-navbar-brand>
      <img src="../assets/cargonaut-white.png" class="logo" alt="Cargonaut Logo">
    </b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item href="#" class="link"> Angebote </b-nav-item>
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
