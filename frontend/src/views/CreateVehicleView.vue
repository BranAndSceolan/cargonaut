<template>
  <b-card
    style="width: 25rem; margin: auto"
    class="mb-2 text-left shadow"
  >
    <b-card-body class="body">
      <div class="info">
        <div class="head"> Create Vehicle </div>
        <b-input-group id="title" class="title row">
          <b-form-input v-model="title" placeholder="Title" class="input shadow-sm"></b-form-input>
        </b-input-group>
        <div class="row">
          <b-input-group id="sitze" class="seat">
            <b-form-input v-model="seat" placeholder="Sitze" class="input shadow-sm"></b-form-input>
          </b-input-group>
          <b-input-group id="platz" class="space">
            <b-form-input v-model="space" placeholder="Platz" class="input shadow-sm"></b-form-input>
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
  </b-card>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'CreateVehicleView.vue',
  data () {
    return {
      title: '',
      seat: '',
      space: '',
      desc: ''
    }
  }//,
  //  methods: {
  //  create () {
  //    axios.post('/ride/create',
  //      { title: this.title, seats: this.seats, space: this.space, desc: this.desc })
  //      .then().catch(reason => { console.log(reason) })
  //  }
  //  }
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
