<template>
  <footer class="footer fixed-bottom">
    <div><img src="../assets/cargonaut-white.png" class="logo" alt="Cargonaut logo"></div>
    <div class="text-white sitemap">
      <div class="headline">Sitemap</div>
      <div class="content">
        <a href="/"> Angebot </a>
      </div>
      <div class="content">
        <a href="/"> Gesuche </a>
      </div>
    </div>
    <div class="text-white about-us">
      <div class="headline">About us</div>
      <div class="content">Cargonaut ist ein aufstrebendes Unternehmen in dem Nutzer sich zusammentun können
      um gemeinsam weitere Strecken zu überwinden.</div>
    </div>
    <div class="text-white socials">
      <div class="headline">Social Media</div>
      <div class="ml-4 mt-0">
        <a class="socialIcons mx-2" href="https://www.Twitter.com/">
          <font-awesome-icon icon="fa-brands fa-twitter" />
        </a>
        <a class="socialIcons mx-2" href="https://www.Youtube.com/">
          <font-awesome-icon icon="fa-brands fa-youtube" />
        </a>
        <a class="socialIcons mx-2" href="https://www.Facebook.com/">
          <font-awesome-icon icon="fa-brands fa-facebook" />
        </a>
      </div>
    </div>
  </footer>

</template>

<script>
export default {
  name: 'footBar'
}
</script>

<style scoped>
.footer{
  display: flex;
  background: #005b52;
  position: sticky;
  width: 100%;
  height: 150px;
}
.logo{
  color: white;
  height: 70px;
  margin-top: 30px;
  margin-left: 50px;
  margin-right: 20px;
  float: left;
}
.text-white{
  color: white;
}
a{
  color: white;
  text-decoration: none;
}
.headline{
  font-size: 25px;
}
.content{
  font-size: 20px;
}
.footer div{
  margin-left: 30px;
  margin-top: 10px;
}
.sitemap .content{

}
.about-us{
  width: 50%;
}
.about-us .headline {
  text-align: left;
}
.about-us .content{
  text-align: left;
}
div{
  margin-left: 150px;
}
.socialIcons {
  font-size: 2em;
}
</style>
