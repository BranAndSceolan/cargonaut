<template>
  <router-link :to=address class="link">
    <div class="card" style="width: 20rem;">
      <div class="wrapper">
        <img class="card-img-top" src="../assets/amarok-d8f.png" alt="Card image cap">
      </div>
      <div class="card-body">
        <div class="dateBubble px-2"> {{ formDate }}</div>
        <h3 class="card-title mb-1"> {{ title }}</h3>
        <div class="mb-3">
          <p class="card-text my-0">Sitze: {{seats}}</p>
          <p class="card-text">Platz: {{space}}m x {{space}}m x {{space}}m</p>
        </div>
        <div>
          <div class="row align-items-center">
            <div class="col-1">
              <font-awesome-icon class="dot" icon="fa-solid fa-circle-dot"></font-awesome-icon>
            </div>
            <div class="col ml-3">
              <p class="card-text cityText">{{origin}}</p>
            </div>
          </div>
          <div class="line"></div>
          <div class="spacer"></div>
          <div class="row">
            <div class="col-1">
              <font-awesome-icon class="dot" icon="fa-solid fa-circle-dot"></font-awesome-icon>
            </div>
            <div class="col-7 ml-3">
              <p class="card-text cityText">{{destination}}</p>
            </div>
            <div class="text-right mt-1 col" style="color: grey; font-size: 1.1em">{{price}}€</div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import axios from 'axios'

export default {
  name: 'travel-card',
  data () {
    return {
      space: 0
    }
  },
  props: {
    id: String,
    date: String,
    title: String,
    seats: Number,
    origin: String,
    layover: String,
    destination: String,
    price: Number,
    vehicle: String
  },
  computed: {
    address: function () {
      return '/detail/' + this.id
    },
    formDate () {
      const dateParts = this.date.slice(0, 10).split('-')
      return dateParts[2] + '.' + dateParts[1] + '.' + dateParts[0]
    }
  },
  mounted () {
    axios.get('/vehicle/findById/' + this.vehicle).then(response => {
      this.space = response.data.spaceLength
    })
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
  top: 262px;
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
  margin-left: 6px;
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
* {
  text-decoration: none;
}
</style>
