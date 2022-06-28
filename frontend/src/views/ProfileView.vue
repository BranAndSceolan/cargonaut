<template>
    <div class="container">
      <div class="row">
        <div class="col-sm-2">
          <div class="picContainer">
            <img class="profilePic" alt="Profile pic" src="../assets/ProfilPicture.jpg">
          </div>
        </div>
        <div class="col-xl-10">
          <p class="name m-3">{{this.user.name}}</p>
          <p class="desc m-3">{{this.user.description}}</p>
        </div>
      </div>
      <div class="row mx-4">
        <OverBar title="Fahrzeuge" v-on:contentHidden="carsHidden = $event" address="/createVeh"></OverBar>
        <div class="w-100 mr-5" v-if="!carsHidden">
          <CarEntry v-for="vehicle in this.user.vehicles" v-bind:key="vehicle.id" :name="vehicle.type" :seats="vehicle.numberOfSeats" :room="vehicle.spaceLength"></CarEntry>
        </div>
      </div>
      <div class="row mx-4">
        <OverBar class="mb-4" title="Angebote" v-on:contentHidden="offersHidden = $event" address="/create" ></OverBar>
        <div class="col w-100">
          <div v-if="!offersHidden" class="card-columns">
            <travel-card class="mx-4 mt-4" v-for="offer in userOffers" v-bind:key="offer.id"  :title="offer.title" :origin="offer.origin"
                         :destination="offer.destination" :seats="offer.numberOfFreeSeats" :height="'X'" :length="'X'"
                         :width="'X'" :price="offer.price" :date="offer.date">
            </travel-card>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import OverBar from '../components/OverBar'
import CarEntry from '../components/CarEntry'
import ReviewEntry from '@/components/ReviewEntry'
import axios from 'axios'
import TravelCard from '../components/travel-card'
export default {
  name: 'ProfileView',
  components: { TravelCard, CarEntry, OverBar },
  data () {
    return {
      user: {},
      offers: [],
      reviewsHidden: false,
      carsHidden: false,
      offersHidden: false
    }
  },
  mounted () {
    axios.get('/user/current').then(response => {
      this.user = response.data
      this.getVehicles()
    })
    axios.get('/ride/getAll').then(response => (this.offers = response.data))
  },
  methods: {
    getVehicles () {
      for (const i in this.user.vehicles) {
        axios.get('/vehicle/findById/' + this.user.vehicles[i]).then(response => (this.user.vehicles.push(response.data))).catch((reason) => {
          console.log(reason)
        })
      }
    }
  },
  computed: {
    userOffers () {
      return this.offers.filter(offer => offer.user === this.user.id)
    }
  }
}
</script>

<style scoped>

.profilePic {
  height: auto;
  width: 100%;
}
.picContainer {
  overflow: hidden;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  box-shadow: 0 0 8px #BBBBBB;
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
.card-columns {
  column-count: 1;
}
</style>
