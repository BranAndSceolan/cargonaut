<template>
  <diV>
    <div class="greyShade"></div>
    <div class="modalHolder">
      <div class="modalSM">
        <p class="modalText pt-4 mb-4">{{ text }}</p>
        <div class="row">
          <div class="col ml-2">
            <b-button @click="$emit('accept')" class="greenBackground modalButton"> Ja </b-button>
          </div>
          <div class="col mr-2">
            <b-button @click="$emit('decline')" class="modalButton"> Nein </b-button>
          </div>
        </div>
      </div>
    </div>
  </diV>
</template>

<script>
export default {
  name: 'modalSm',
  props: {
    text: String
  }
}
</script>

<style scoped>
.modalSM {
  position: relative;
  left: -50%;
  width: 400px;
  height: 150px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 0 8px #BBBBBB;
}
.greyShade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 60%;
  background: #444444;
}
.modalHolder {
  position: absolute;
  left: 50%;
  top:50%;
  transform: translateY(-50%);
}
.greenBackground {
  background: #005b52;
}
.modalText {
  text-align: center;
  font-size: 1.1em;
}
.modalButton {
  width: 50%;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
