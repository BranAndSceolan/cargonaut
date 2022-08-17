<template>
  <div class="row w-100 ml-2 mr-1 mt-1 entryContainer align-items-center">
    <div class="col-xl-2 col-lg-3 col-md-3 p-0 img-holder">
      <img v-if="this.name === 'standard car'" class="float-left" alt="Car picture" src="../assets/standardcar.jpg">
      <img v-else-if="this.name === 'truck'" class="float-left" alt="Car picture" src="../assets/truck.jpg">
      <img v-else-if="this.name === 'motorcycle'" class="float-left" alt="Car picture" src="../assets/motorcycle.jpg">
      <img v-else class="float-left" alt="Car picture" src="../assets/standardcar.jpg">
    </div>
    <div class="col-xl-2 col-lg-2 col-md-3 ml-xl-4">
      <p class="mb-0"> {{name}}</p>
    </div>
    <div class="col-xl-2 col-lg-2 col-md-2 offset-xl-2 offset-lg-1 offset-md-0">
      <p class="mb-0"> Sitze: {{seats}}</p>
    </div>
    <div class="col-lg-2 col-md-2">
      <p class="mb-0"> Platz: {{room}}</p>
    </div>
    <div class="col-2">
      <button>
        <font-awesome-icon class="icon mr-lg-4" icon="fa-solid fa-pen"></font-awesome-icon>
      </button>
      <button v-on:click="sendDelete">
        <font-awesome-icon class="icon ml-lg-4" icon="fa-solid fa-trash"></font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarEntry',
  props: {
    id: String,
    name: String,
    seats: String,
    room: String,
    index: Number
  },
  methods: {
    sendDelete () {
      this.$emit('delete', this.id, this.index)
    }
  }
}
</script>

<style scoped>

.entryContainer {
  box-shadow: 0 0 8px #BBBBBB;
}
p, .icon{
  color: #707070;
  text-align: left;
  font-size: 1.7em;
  font-weight: bold;
}
.icon {
  color: #005b52 ;
  font-size: 2em;
}
img {
  object-fit: cover;
  max-width: 200px;
  min-width: 100px;
  height: auto;
}
button {
  border: none;
  background-color: transparent;
}

</style>
