<template>
  <div class="card" style="width: 20rem;">
    <div class="wrapper">
      <img class="card-img-top" src="https://i.auto-bild.de/mdb/extra_large/96/amarok-d8f.png" alt="Card image cap">
    </div>
    <div class="card-body">
      <div class="dateBubble px-2"> {{ date }}</div>
      <h3 class="card-title mb-1"> {{ name }}</h3>
      <div class="mb-3">
        <p class="card-text my-0">Sitze: {{seats}}</p>
        <p class="card-text">Platz: {{room}}m³</p>
      </div>
      <div>
        <div class="row align-items-center">
          <div class="col-1">
            <font-awesome-icon class="dot" icon="fa-solid fa-circle-dot"></font-awesome-icon>
          </div>
          <div class="col ml-3">
            <p class="card-text cityText">{{start}}</p>
          </div>
        </div>
        <div class="line"></div>
        <div class="spacer"></div>
        <div class="row">
          <div class="col-1">
            <font-awesome-icon class="dot" icon="fa-solid fa-circle-dot"></font-awesome-icon>
          </div>
          <div class="col-7 ml-3">
            <p class="card-text cityText">{{stop}}</p>
          </div>
          <div class="text-right mt-1" style="color: grey; font-size: 1.1em">{{price}}€</div>
        </div>
      </div>
    </div>
  </div>
    <!--
    <b-card
    :title=name
    img-src="https://i.auto-bild.de/mdb/extra_large/96/amarok-d8f.png"
    img-top
    img-height="130px"
    style="width: 20rem;"
    class="mb-2 text-left"
    >
      <b-card-text>
        Sitze: {{ seats }}
      </b-card-text>
      <b-card-text>
        Platz: {{room}}m&sup3;
      </b-card-text>
      <b-card-text class="targets">
        Start: {{start}}
      </b-card-text>
      <b-card-text class="targets float">
        Ziel: {{stop}}
        <b-card-text class="text-right" style="color: grey">{{price}}€</b-card-text>
      </b-card-text>
    </b-card>
  -->
</template>

<script>
export default {
  name: 'travel-card',
  props: {
    date: Date,
    name: String,
    seats: Number,
    room: Number,
    start: String,
    layover: String,
    stop: String,
    price: Number
  }
}

</script>

<style scoped>
.wrapper {
  justify-content: center;
  max-height: 100px;
  overflow: hidden;
}
.card{
  border-radius: 23px;
  overflow: hidden;
  text-align: start;
  box-shadow: 0 0 8px #BBBBBB;
}
.line {
  width: 2px;
  height: 34px;
  background-color: #005b52;
  margin-left: 12px;
  top: 265px;
  position: absolute;
}
.spacer {
  width: 2px;
  height: 20px;
}
.dot {
  margin-top: 3px;
  color: #005b52;
  font-size: 1.7em;
}
.cityText {
  color: #005b52!important;
}
.dateBubble {
  position: absolute;
  top: 90px;
  left: 210px;
  background-color: white;
  box-shadow: 0 0 8px #BBBBBB;
  border-radius: 15px;
}
p {
  font-size: 1.3em;
  color: grey;
}
h3 {
  color: #616161;
}
</style>
