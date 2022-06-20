<template>
  <div class="row w-100 ml-2 mr-1 mt-1 entryContainer align-items-center">
    <div class="col col-xl-2 p-0">
      <img class="float-left" src="https://i.auto-bild.de/mdb/extra_large/96/amarok-d8f.png">
    </div>
    <div class="col col-xl-2 ml-xl-4">
      <p class="mb-0"> {{name}}</p>
    </div>
    <div class="col col-xl-2 offset-xl-2">
      <p class="mb-0"> Seats: {{seats}}</p>
    </div>
    <div class="col-lg-2">
      <p class="mb-0"> Platz: {{room}}</p>
    </div>
    <div class="col-lg-1.5">
        <font-awesome-icon class="icon mr-lg-4" icon="fa-solid fa-pen"></font-awesome-icon>
        <font-awesome-icon class="icon ml-lg-4" icon="fa-solid fa-trash"></font-awesome-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarEntry',
  props: {
    name: String,
    seats: String,
    room: String
  }
}
</script>

<style scoped>

.entryContainer {
  box-shadow: 2px 2px 4px;
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
  max-width: 200px;
  min-width: 100px;
  height: auto;
}

</style>
