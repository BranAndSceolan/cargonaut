<template>
  <div class="col-2 filter text-left ">
    <p class="title"> Filter </p>
    <div class="ml-3">
      <div class="mt-2">
        <div class="row">
          <p class="col-9">Platz</p>
          <button v-on:click="roomHidden = !roomHidden" class="col-1">
            <font-awesome-icon icon="fa-solid fa-angle-down"></font-awesome-icon>
          </button>
        </div>
        <div v-if="!roomHidden" class="ml-1">
          <div class="row">
            <label class="col-1">
              <input v-model="roomFilter" @change="roomFilterChange" value="<|1" type="radio" name="filter" aria-label="1m" class="checkbox">
              <font-awesome-icon class="icon" icon="fa-solid fa-circle-dot"></font-awesome-icon>
            </label>
            <p class="col"> &#60;1m&sup3; </p>
          </div>
          <div class="row">
            <label class="col-1">
              <input v-model="roomFilter" value="<|5" type="radio" name="filter" aria-label="1m" class="checkbox">
              <font-awesome-icon class="icon" icon="fa-solid fa-circle-dot"></font-awesome-icon>
            </label>
            <p class="col"> &#60;5m&sup3; </p>
          </div>
          <div class="row">
            <label class="col-1">
              <input v-model="roomFilter" value=">|5" type="radio" name="filter" aria-label="1m" class="checkbox">
              <font-awesome-icon class="icon" icon="fa-solid fa-circle-dot"></font-awesome-icon>
            </label>
            <p class="col"> &#62;5m&sup3; </p>
          </div>
        </div>
      </div>
      <div>
        <div class="row">
          <p class="col-9">Sitze</p>
          <button v-on:click="seatsHidden = !seatsHidden" class="col-1">
            <font-awesome-icon icon="fa-solid fa-angle-down"></font-awesome-icon>
          </button>
        </div>
        <div v-if="!seatsHidden" class="ml-1">
          <div class="row">
            <label class="col-1">
              <input v-model="seatsFilter" @change="seatsFilterChange" value="=|1" type="radio" name="filter" aria-label="1m" class="checkbox">
              <font-awesome-icon class="icon" icon="fa-solid fa-circle-dot"></font-awesome-icon>
            </label>
            <p class="col"> 1 Sitz </p>
          </div>
          <div class="row">
            <label class="col-1">
              <input v-model="seatsFilter" @change="seatsFilterChange" value="=|2" type="radio" name="filter" aria-label="1m" class="checkbox">
              <font-awesome-icon class="icon" icon="fa-solid fa-circle-dot"></font-awesome-icon>
            </label>
            <p class="col"> 2 Sitze </p>
          </div>
          <div class="row">
            <label class="col-1">
              <input v-model="seatsFilter" @change="seatsFilterChange" value="=|3" type="radio" name="filter" aria-label="1m" class="checkbox">
              <font-awesome-icon class="icon" icon="fa-solid fa-circle-dot"></font-awesome-icon>
            </label>
            <p class="col"> 3 Sitze </p>
          </div>
          <div class="row">
            <label class="col-1">
              <input v-model="seatsFilter" @change="seatsFilterChange" value=">|3" type="radio" name="filter" aria-label="1m" class="checkbox">
              <font-awesome-icon class="icon" icon="fa-solid fa-circle-dot"></font-awesome-icon>
            </label>
            <p class="col"> >3 Sitze </p>
          </div>
        </div>
      </div>
      <div>
        <div class="row">
          <p class="col-9">Preis</p>
          <button v-on:click="priceHidden = !priceHidden" class="col-1">
            <font-awesome-icon icon="fa-solid fa-angle-down"></font-awesome-icon>
          </button>
        </div>
        <div v-if="!priceHidden" class="ml-1">
          <div class="row">
            <label class="col-1">
              <input v-model="priceFilter" @change="priceFilterChange" value="<|5" type="radio" name="filter" aria-label="1m" class="checkbox">
              <font-awesome-icon class="icon" icon="fa-solid fa-circle-dot"></font-awesome-icon>
            </label>
            <p class="col"> &#60;5€ </p>
          </div>
          <div class="row">
            <label class="col-1">
              <input v-model="priceFilter" @change="priceFilterChange" value="<|10" type="radio" name="filter" aria-label="1m" class="checkbox">
              <font-awesome-icon class="icon" icon="fa-solid fa-circle-dot"></font-awesome-icon>
            </label>
            <p class="col"> &#60;10€ </p>
          </div>
          <div class="row">
            <label class="col-1">
              <input v-model="priceFilter" @change="priceFilterChange" value="<|15" type="radio" name="filter" aria-label="1m" class="checkbox">
              <font-awesome-icon class="icon" icon="fa-solid fa-circle-dot"></font-awesome-icon>
            </label>
            <p class="col"> &#60;15€ </p>
          </div>
          <div class="row">
            <label class="col-1">
              <input v-model="priceFilter" @change="priceFilterChange" value="<|30" type="radio" name="filter" aria-label="1m" class="checkbox">
              <font-awesome-icon class="icon" icon="fa-solid fa-circle-dot"></font-awesome-icon>
            </label>
            <p class="col"> &#60;30€ </p>
          </div>
          <div class="row">
            <label class="col-1">
              <input v-model="priceFilter" @change="priceFilterChange" value=">|30" type="radio" name="filter" aria-label="1m" class="checkbox">
              <font-awesome-icon class="icon" icon="fa-solid fa-circle-dot"></font-awesome-icon>
            </label>
            <p class="col"> >30€ </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterList',
  data () {
    return {
      priceHidden: false,
      seatsHidden: false,
      roomHidden: false,
      priceFilter: 'none',
      seatsFilter: 'none',
      roomFilter: 'none'
    }
  },
  methods: {
    priceFilterChange () {
      this.$emit('priceFilter', this.priceFilter, 'price')
    },
    seatsFilterChange () {
      this.$emit('seatsFilter', this.seatsFilter, 'seats')
    },
    roomFilterChange () {
      this.$emit('roomFilter', this.roomFilter, 'room')
    }
  }
}
</script>

<style scoped>
.title{
  font-size: 25px;
  border: 2px solid white;
  border-bottom-color: grey;
}
.checkbox{
  float: left;
  margin-right: 10px;
}
.filter{
  float: left;
  width: 10%;
  overflow: visible;
}
[type=radio] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
[type=radio] + .icon {
  cursor: pointer;
  color: #005b52;
}
[type=radio]:checked + .icon {
  background-color: #005b52;
  border-radius: 50%;
}
label, p {
  margin-bottom: 0;
  color: grey;
}
button {
  border: none;
  background-color: transparent;
}
</style>
