<template>
  <b-card
    style="width: 60rem; margin: auto; border-radius: 20px"
    class="mb-2 text-left shadow"
  >
    <b-card-body class="body">
      <div class="info">
        <div class="head"> Create offer </div>
        <b-input-group id="title" class="title row">
          <b-form-input v-model="title" placeholder="Title" class="input shadow-sm"></b-form-input>
        </b-input-group>
        <div class="row">
          <b-input-group id="sitze" class="seat">
            <b-form-input type="number" v-model="seat" placeholder="Sitze" class="input shadow-sm"></b-form-input>
          </b-input-group>
          <b-input-group id="platz" class="space">
            <b-form-input v-model="space" placeholder="Platz" type="number" class="input shadow-sm"></b-form-input>
          </b-input-group>
        </div>
        <b-input-group id="desc" class="desc row">
          <b-form-input v-model="desc" placeholder="Beschreibung" class="input shadow-sm"></b-form-input>
        </b-input-group>
      </div>
      <div class="data">
        <b-dropdown id="dropdown-1" text="Fahrzeug" class="m-md-2 dropdown">
          <b-dropdown-item-btn v-on:click="fillVehicleInfo(index)" v-for="(vehicle, index) in vehicles" v-bind:key="index">{{vehicle.type}}</b-dropdown-item-btn>
        </b-dropdown>
        <div class="row mb-5">
          <b-input-group id="herkunft" class="town">
            <b-form-input v-model="navData[0].town" placeholder="Herkunft" class="input shadow-sm"></b-form-input>
          </b-input-group>
          <b-input-group id="date" class="date">
            <b-form-input type="date" v-model="navData[0].date" placeholder="Datum" class="input shadow-sm"></b-form-input>
          </b-input-group>
        </div>
        <div class="row mt-1">
          <b-input-group id="platz" class="town">
            <b-form-input v-model="navData[2].town" placeholder="Ziel" class="input shadow-sm"></b-form-input>
          </b-input-group>
          <b-input-group id="zdate" class="date">
            <b-form-input type="date" v-model="navData[2].date" placeholder="Datum" class="input shadow-sm"></b-form-input>
          </b-input-group>
        </div>
      </div>
    </b-card-body>
    <b-card-footer class="foot">
        <b-input-group class="foot-template">
          <b-button id="create" v-on:click="create" class="create"> Create </b-button>
          <b-input-group-append>
            <b-form-input v-model="price" placeholder="Preis" type="number" class="input shadow-sm price" id="price"></b-form-input>
          </b-input-group-append>
        </b-input-group>
      <warning-component v-if="warning"></warning-component>
    </b-card-footer>
  </b-card>
</template>

<script>
import axios from 'axios'
import WarningComponent from '../components/WarningComponent'

export default {
  name: 'CreateView.vue',
  components: { WarningComponent },
  data () {
    return {
      title: '',
      seat: '',
      space: '',
      desc: '',
      navData: [{ town: '', date: '' }, { town: '', date: '' }, { town: '', date: '' }],
      price: '',
      vehicles: [],
      warning: false,
      vehicle: {}
    }
  },
  methods: {
    create () {
      if (this.title !== '' && this.seat !== '' && this.desc !== '' && this.price !== '') {
        axios.post('/ride/create',
          {
            date: this.navData[0].date,
            origin: this.navData[0].town,
            destination: this.navData[2].town,
            title: this.title,
            description: this.desc,
            price: Number(this.price),
            numberOfFreeSeats: Number(this.seat),
            user: 'none',
            pendingReqs: [],
            accReqs: [],
            vehicle: this.vehicle._id
          })
          .then(response => (this.$router.push('/overview'))).catch(reason => { console.log(reason) })
      } else {
        this.warning = true
      }
    },
    fillVehicleInfo (index) {
      const vehicle = this.vehicles[index]
      this.seat = vehicle.numberOfSeats
      this.desc = vehicle.notes
      this.vehicle = vehicle
    }
  },
  mounted () {
    axios.get('/user/current').then(response => {
      const vehicleIdArray = response.data.vehicles
      for (const i in vehicleIdArray) {
        axios.get('/vehicle/findById/' + vehicleIdArray[i]).then(response => {
          this.vehicles.push(response.data)
        })
      }
    })
    this.warning = false
  }
}
</script>

<style scoped>
.foot {
  background: white;
}
.body {
  overflow: hidden;
}
.info {
  float: left;
  width: 50%;
  border-style: solid;
  border-width: 0;
  border-right-width: 1px;
  border-color: lightgray;
}
.data {
  float: left;
  width: 50%;
}
.date {
  width: 40%;
  margin-left: 10px;
}
.town {
  width: 40%;
}
.dropdown {
  width: 98%;
}
.head{
  font-size: 36px;
  color: grey;
  font-weight: bold;
}
.title {
  width: 90%;
}
.desc {
  width: 90%;
}
.seat {
  width: 42%;
}
.space {
  width: 42%;
  margin-left: 14px;
}
.data .row {
  margin-left: 7px;
  margin-bottom: 10px;
}
.info .row {
  margin-left: 0;
  margin-bottom: 10px;
}
.foot-template {
  width: 40%;
  margin: auto;
}
.create {
  background: #005b52;
}
</style>
