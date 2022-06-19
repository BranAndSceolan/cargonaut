<template>
    <div class="container">
      <div class="row">
        <div class="col-sm-2">
          <img class="profilePic" src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Helmut_Kohl_%281996%29.jpg">
        </div>
        <div class="col-xl-10">
          <p class="name m-3">Mike Jefferson</p>
          <p class="desc m-3">Ich bin der Mike. Früher war ich erfolgreicher Consultingmanager bei TheCompany. Als sich jedoch
            herausstellte, dass TheCompany sich nur über ein Schneeballsystem über Wasser halten konnte,
            bin ich in Frührente und versuche mir jetzt über Cargonaut etwas extra zu verdienen, damit ich für die
            nächste Miete nicht wieder eine Niere verkaufen muss. </p>
        </div>
      </div>
      <div class="row">
        <OverBar title="Fahrzeuge"></OverBar>
      </div>
    </div>
</template>

<script>
import OverBar from '../components/OverBar'
export default {
  name: 'ProfileView',
  components: { OverBar }
}
</script>

<style scoped>
.profilePic {
  height: 200px;
  width: 200px;
  border-radius: 50%;
}
.container {
  max-width: 1500px!important;
}
p {
  text-align: left;
}
.name {
  font-size: 2em;
}
.desc {
  font-size: 1.1em;
}
</style>
