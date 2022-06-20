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
      <div class="row mx-4">
        <OverBar title="Fahrzeuge" v-on:contentHidden="carsHidden = $event"></OverBar>
        <div class="w-100 mr-5" v-if="!carsHidden">
          <CarEntry v-for="(car, index) in cars" v-bind:key="index" :name="car.name" :seats="car.seats" :room="car.room"></CarEntry>
        </div>
      </div>
      <div class="row mx-4">
        <OverBar class="mb-4" title="Angebote" v-on:contentHidden="offersHidden = $event"></OverBar>
        <div class="col w-100">
          <b-card-group v-if="!offersHidden" deck class="deck">
            <travel-card class="mb-4" v-for="(offer, index) in offers" v-bind:key="index"  :name="offer.name" :start="offer.start"
                         :stop="offer.stop" :seats="offer.seats" :room="offer.room" :price="offer.price"></travel-card>
          </b-card-group>
        </div>
      </div>
    </div>
</template>

<script>
import OverBar from '../components/OverBar'
import CarEntry from '../components/CarEntry'
import axios from 'axios'
import TravelCard from '../components/travel-card'
export default {
  name: 'ProfileView',
  components: { TravelCard, CarEntry, OverBar },
  data () {
    return {
      cars: [{ name: 'VW Amarok', seats: '2', room: '6' },
        { name: 'Wroom Wroom', seats: '2', room: '1' }],
      offers: [{ name: 'looper1', start: 'City1', stop: 'city2', seats: '5', room: '6', price: '19,99' },
        { name: 'looper2', start: 'City2', stop: 'city3', seats: '6', room: '8', price: '29,99' },
        { name: 'Ich entführe euch alle', start: 'Pausenhof', stop: '???', seats: '6', room: '8', price: '29,99' },
        { name: 'looper2', start: 'City2', stop: 'city3', seats: '6', room: '8', price: '29,99' },
        { name: 'looper2', start: 'City2', stop: 'city3', seats: '6', room: '8', price: '29,99' }],
      carsHidden: false,
      offersHidden: false
    }
  },
  mounted () {
    /*
    axios.get('/vehicle/getAll').then(response => (this.cars = response.data)).catch((reason) => {
      console.log(reason)
    })

     */
  }
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
