<template>
  <b-card
    style="width: 25rem; margin: auto; border-radius: 20px"
    class="mb-2 text-left shadow"
  >
    <b-card-body class="body">
      <div class="info">
        <div class="head"> Create Vehicle </div>
        <b-dropdown :text="title" variant="secondary" class="title row">
          <b-dropdown-item-btn v-on:click="selectType('pick up truck')">pick up truck</b-dropdown-item-btn>
          <b-dropdown-item-btn v-on:click="selectType('standard car')">standard car</b-dropdown-item-btn>
          <b-dropdown-item-btn v-on:click="selectType('truck')">truck</b-dropdown-item-btn>
          <b-dropdown-item-btn v-on:click="selectType('motorcycle')">motorcycle</b-dropdown-item-btn>
          <b-dropdown-item-btn v-on:click="selectType('other')">other</b-dropdown-item-btn>
        </b-dropdown>
        <div class="row">
          <b-input-group id="sitze" class="seat">
            <b-form-input v-model="seat" type="number" placeholder="Sitze" class="input shadow-sm"></b-form-input>
          </b-input-group>
          <b-input-group id="platz" class="space">
            <b-form-input v-model="space" type="number" placeholder="Platz" class="input shadow-sm"></b-form-input>
          </b-input-group>
        </div>
        <b-input-group id="desc" class="desc row">
          <b-form-input v-model="desc" placeholder="Beschreibung" class="input shadow-sm"></b-form-input>
        </b-input-group>
      </div>
    </b-card-body>
    <b-card-footer class="foot">
      <b-button id="create" v-on:click="create" class="create"> Create </b-button>
    </b-card-footer>
    <warning-component v-if="warning"></warning-component>
  </b-card>
</template>

<script>
import axios from 'axios'
import WarningComponent from '../components/WarningComponent'

export default {
  name: 'CreateVehicleView.vue',
  components: { WarningComponent },
  data () {
    return {
      title: 'truck',
      seat: Number,
      space: Number,
      desc: '',
      id: '',
      warning: false
    }
  },
  methods: {
    create () {
      if (this.seat === undefined || this.space === undefined) {
        this.warning = true
        return
      }
      if (this.title !== '' && this.desc !== '' && this.price !== '') {
        axios.post('/vehicle/create',
          {
            type: this.title,
            numberOfSeats: this.seat,
            notes: 'looks ugly, but moves'
          })
          .then(response => {
            this.id = response.data
            this.addVehicleToUser()
          }).catch(reason => { console.log(reason) })
      } else {
        this.warning = true
      }
    },
    selectType (type) {
      this.title = type
    },
    addVehicleToUser () {
      axios.get('/user/current').then(response => {
        const user = response.data
        user.vehicles.push(this.id)
        axios.post('/user/update/' + user._id, user)
          .then(response => (this.$router.push('/overview')))
      })
    },
    removeVehicleFromUser () {
      axios.get('/user/current').then(response => {
        const user = response.data
        const index = user.vehicles.indexOf(this.id)
        user.vehicles.splice(index, 1)
        axios.post('/user/update/' + user._id, user)
          .then(response => (this.$router.push('/overview')))
      })
    }
  },
  mounted () {
    this.warning = false
  }
}

</script>

<style scoped>
.head{
  font-size: 36px;
  color: grey;
  font-weight: bold;
}
.seat {
  width: 45%;
}
.space {
  width: 45%;
  margin-left: 17px;
}
.info .row {
  margin-left: 0;
  margin-bottom: 10px;
}
.foot {
  background: white;
}
.create {
  margin-left: 7.5rem;
  background: #005b52;
  border-radius: 12px;
}
</style>
