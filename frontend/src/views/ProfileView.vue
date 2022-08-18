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
        <OverBar title="Fahrzeuge" v-on:contentHidden="carsHidden = $event" address="/vehicle/new"></OverBar>
        <div class="w-100 mr-5" v-if="!carsHidden">
          <CarEntry v-on:delete="deleteVehicle" v-for="(vehicle, index) in this.userVehicles" v-bind:key="vehicle._id"
                    :id="vehicle._id" :index="index" :name="vehicle.type" :seats="vehicle.numberOfSeats" :room="vehicle.spaceLength"></CarEntry>
        </div>
      </div>
      <div class="row mx-4">
        <OverBar class="mb-4" title="Angebote" v-on:contentHidden="offersHidden = $event" address="/create" ></OverBar>
        <div class="col w-100">
          <div v-if="!offersHidden" class="card-columns">
            <travel-card class="mx-4 mt-4" v-for="offer in offers" v-bind:key="offer._id" :id="offer._id"  :title="offer.title" :origin="offer.origin"
                         :destination="offer.destination" :seats="offer.numberOfFreeSeats" :price="offer.price" :date="offer.date" :vehicle="offer.vehicle">
            </travel-card>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col text-center">
          <b-button @click="modalOpen=true" class="button"> Löschen </b-button>
        </div>
        <div class="col text-center">
          <b-button @click="logout" class="button"> Ausloggen </b-button>
        </div>
      </div>
      <modal v-if="modalOpen" :text="'Willst du deinen Account wirklich?'" @accept="deleteProfile" @decline="modalOpen=false"></modal>
    </div>
</template>

<script>
import OverBar from '../components/OverBar'
import CarEntry from '../components/CarEntry'
import axios from 'axios'
import TravelCard from '../components/travel-card'
import Modal from '@/components/ModalSM'
export default {
  name: 'ProfileView',
  components: { Modal, TravelCard, CarEntry, OverBar },
  data () {
    return {
      user: {},
      offers: [],
      userVehicles: [],
      reviewsHidden: false,
      carsHidden: false,
      offersHidden: false,
      modalOpen: false
    }
  },
  mounted () {
    document.title = 'Profile - Cargonaut'
    axios.get('/user/current').then(response => {
      this.user = response.data
      this.getVehicles()
    })
    axios.get('/ride/getAll').then(response => {
      this.getOffers(response.data)
    })
  },
  methods: {
    getVehicles () {
      for (const i in this.user.vehicles) {
        axios.get('/vehicle/findById/' + this.user.vehicles[i]).then(response => {
          this.userVehicles.push(response.data)
        }).catch((reason) => {
          console.log(reason)
        })
      }
    },
    deleteVehicle (id, index) {
      this.userVehicles.splice(index, 1)
      this.user.vehicles.splice(index, 1)
      axios.delete('/vehicle/deleteAndUnlink/' + id)
    },
    getOffers (offers) {
      for (const i in offers) {
        if (offers[i].user === this.user._id) {
          this.offers.push(offers[i])
        }
      }
    },
    deleteProfile () {
      axios.delete('/user/deleteAndUnlink/' + this.user._id).then(() => {
        this.$router.push('/login')
      })
    },
    logout () {
      axios.post('/user/logout').then(() => {
        this.$router.push('/login')
      })
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
.button {
  margin-left: 2.5rem;
  width: 25rem;
  background: #005b52;
  border-radius: 20px;
}
</style>
