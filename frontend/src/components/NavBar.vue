<template>
  <b-navbar class="navbar">
    <b-navbar-brand>
      <img src="../assets/cargonaut-white.png" class="logo" alt="Cargonaut Logo">
    </b-navbar-brand>
    <b-navbar-nav>
      <!-- <b-nav-item href="/overview" class="link"> Angebote </b-nav-item> -->
      <router-link to="/overview" class="link">Overview</router-link>
      <router-link to="/login" class="link">login</router-link>
      <router-link to="/create" class="link">create</router-link>
      <router-link to="/createVeh" class="link">createVehicle</router-link>
      <router-link to="/createReview" class="link">createReview</router-link>
      <router-link to="/register" class="link">register</router-link>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <router-link to="/profile">
        <font-awesome-icon icon="fa-solid fa-user" class="link icon mr-5"></font-awesome-icon>
      </router-link>
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
  margin-bottom: 2%;
}
.logo{
  height: 60px;
}
.link{
  color: white;
  font-size: 25px;
  margin-left: 10px;
}
.icon {
  font-size: 2.2em;
}

</style>
