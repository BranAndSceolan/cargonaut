<template>
  <nav class="navbar">

      <div class="nav-elements">
        <img src="../assets/cargonaut-white.png" class="logo" alt="Cargonaut logo">
        <a href="/"> Angebot </a>
        <a href="/"> Gesuche </a>
      </div>

    <div class="profil-icon">icon</div>
  </nav>

</template>

<script>
export default {
  name: 'navBar'
}
</script>

<style scoped>
.navbar{
  background: #005b52;
  height: 100px;
  position: relative;
  top: -8px;
  width: 97%;
  padding-right: 43px;
  margin-left: -8px;

}
.logo{
  color: white;
  height: 70px;
  margin-top: 10px;
  margin-left: 50px;
  margin-right: 20px;
  float: left;
}
.nav-elements{
  width: 60%;
}

.nav-elements a{
  text-decoration: none;
  color: white;
  font-size: 30px;
  margin: 25px;
  float: left;
  margin-top: 30px;

}

.profil-icon{
  margin-right: 150px;
  margin-top: 30px;
  font-size: 30px;
  color: white;
  float: right;

}

</style>
