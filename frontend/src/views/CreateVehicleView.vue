<template>
  <b-card
    style="width: 25rem; margin: auto; border-radius: 20px"
    class="cardArea mb-2 text-left shadow"
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
          <b-input-group id="sitze" class="seat no-padding">
            <b-form-input v-model="seat" type="number" placeholder="Sitze" class="input shadow-sm"></b-form-input>
          </b-input-group>
          <b-input-group id="platz" class="space no-padding">
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
        axios.post('/vehicle/createAndLink',
          {
            type: this.title,
            numberOfSeats: this.seat,
            notes: this.desc,
            spaceLength: Number(this.space)
          }).then(() => {
          this.$router.push('/profile')
        }).catch(reason => { console.log(reason) })
      } else {
        this.warning = true
      }
    },
    selectType (type) {
      this.title = type
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
  margin-left: 23px;
}
.info .row {
  margin-left: 0;
  margin-bottom: 10px;
}
.foot {
  background: white;
}
.create {
  background: #005b52;
  border-radius: 12px;
}
.no-padding {
  padding-right: 0;
  padding-left: 0;
}

@media ( max-width: 420px ){
  .cardArea {
    max-width: 300px!important;
  }
  .space {
    width: 45%;
    margin-left: 15px;
  }
  .head{
    font-size: 24px;
    color: grey;
    font-weight: bold;
  }
}
</style>
