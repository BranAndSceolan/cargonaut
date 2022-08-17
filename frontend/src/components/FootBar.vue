<template>
  <footer class="footer fixed-bottom">
    <div><img src="../assets/cargonaut-white.png" class="logo" alt="Cargonaut logo"></div>
    <div class="text-white about-us">
      <div class="headline">About us</div>
      <div class="content">Cargonaut ist ein aufstrebendes Unternehmen in dem Nutzer sich zusammentun können
      um gemeinsam weitere Strecken zu überwinden.</div>
    </div>
    <div class="text-white">
      <div class="headline sm-text">Social Media</div>
      <div class="ml-4 mt-0 sm-icon-holder">
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
  position: fixed;
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
  margin-top: 0!important;
}
.footer div{
  margin-left: 30px;
  margin-top: 10px;
}
.sitemap .content{

}
.about-us{
  width: 60%;
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

@media (max-width: 1260px) {
  .logo {
    margin-right: 5px!important;
    margin-left: 5px!important;
  }
  .about-us {
    margin-left: 0!important;
  }
}

@media (max-width: 1035px) {
  .sm-text {
    display: none;
  }
  .sm-icon-holder {
    margin-top: 20px!important;
  }
}

@media (max-width: 833px) {
  .sm-icon-holder {
    margin-left: 0!important;
  }
  .logo {
    display: none;
  }
  .about-us {
    width: 80%;
  }
}

@media (max-width: 630px) {
  .content {
    font-size: 15px;
  }
}
@media (max-width: 540px) {
  .sm-icon-holder {
    display: none;
  }
  .about-us {
    width: 95%;
  }
}

</style>
