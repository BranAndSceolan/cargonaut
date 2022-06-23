<template>
  <div class="container">
    <div>
      <b-input-group class="search">
        <template #prepend>
          <b-input-group-text >Icon</b-input-group-text>
        </template>
        <b-form-input></b-form-input>

        <template #append>
          <b-dropdown text="Sort" variant="success">
            <b-dropdown-item>Action A</b-dropdown-item>
            <b-dropdown-item>Action B</b-dropdown-item>
          </b-dropdown>
        </template>
      </b-input-group>
      <div class="row">
        <div class="col card-columns">
          <travel-card class="mx-5 mt-4" v-for="(offer, index) in offers" v-bind:key="index"  :name="offer.name" :start="offer.start"
                       :stop="offer.stop" :seats="offer.seats" :room="offer.room" :price="offer.price" :date="offer.date"></travel-card>
        </div>
        <div class="filter text-left">
          <div class="title"> Filter </div>
          <div>
            <div> Platz   v </div>
            <div>
              <div>
                <input type="radio" name="room" aria-label="1m" class="checkbox">
                <div> &#62;1m&sup3; </div>
              </div>
              <div>
                <input type="radio" name="room" aria-label="<5m>" class="checkbox">
                <div> &#60;5m&sup3; </div>
              </div>
              <div>
                <input type="radio" name="room" aria-label=">5m" class="checkbox">
                <div> &#62;5m&sup3; </div>
              </div>
            </div>
          </div>
          <div>
            <div> Sitze   v </div>
            <div>
              <div>
                <input type="radio" name="seats" aria-label="1 Sitz" class="checkbox">
                <div> 1 Sitz </div>
              </div>
              <div>
                <input type="radio" name="seats" aria-label="2 Sitze" class="checkbox">
                <div> 2 Sitze </div>
              </div>
              <div>
                <input type="radio" name="seats" aria-label="3 Sitze" class="checkbox">
                <div> 3 Sitze </div>
              </div>
              <div>
                <input type="radio" name="seats" aria-label=">3 Sitze" class="checkbox">
                <div> &#62;3 Sitze </div>
              </div>
            </div>
          </div>
          <div>
            <div> Preis   v </div>
            <div>
              <div>
                <input type="radio" name="price" aria-label="Unter 5" class="checkbox">
                <div> Unter 5€ </div>
              </div>
              <div>
                <input type="radio" name="price" aria-label="Unter 10" class="checkbox">
                <div> Unter 10€ </div>
              </div>
              <div>
                <input type="radio" name="price" aria-label="Unter 15" class="checkbox">
                <div> Unter 15€ </div>
              </div>
              <div>
                <input type="radio" name="price" aria-label="Unter 30" class="checkbox">
                <div> Unter 30€ </div>
              </div>
              <div>
                <input type="radio" name="price" aria-label="Über 30" class="checkbox">
                <div> Über 30€ </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import travelCard from '@/components/travel-card'
import axios from 'axios'

export default {
  name: 'OverviewView',
  components: { travelCard },
  data () {
    return {
      offers:
        [{ name: 'Entspannte Fahrt', start: 'City1', stop: 'City2', seats: '5', room: '6', price: '19,99', date: '25.04.2030' },
          { name: 'looper2', start: 'City2', stop: 'City3', seats: '6', room: '8', price: '29,99', date: '25.04.2030' },
          { name: 'looper3', start: 'City1', stop: 'city2', seats: '5', room: '6', price: '19,99', date: '25.04.2030' },
          { name: 'looper4', start: 'City2', stop: 'city3', seats: '6', room: '8', price: '29,99', date: '25.04.2030' },
          { name: 'looper5', start: 'City1', stop: 'city2', seats: '5', room: '6', price: '19,99', date: '25.04.2030' },
          { name: 'looper6', start: 'City2', stop: 'city3', seats: '6', room: '8', price: '29,99', date: '25.04.2030' },
          { name: 'looper7', start: 'City1', stop: 'city2', seats: '5', room: '6', price: '19,99', date: '25.04.2030' },
          { name: 'looper8', start: 'City2', stop: 'city3', seats: '6', room: '8', price: '29,99', date: '25.04.2030' },
          { name: 'looper9', start: 'City1', stop: 'city2', seats: '5', room: '6', price: '19,99', date: '25.04.2030' }]
    }
  },
  methods: {
    getOffers () {
      // axios routes are in extra methods at the moment, because I can't test them atm
      axios.get('/ride/getAll').then(response => (this.offers = response.data))
    }
  },
  mounted () {
    this.getOffers()
  }
}
</script>

<style scoped>
.container{
  max-width: 1500px!important;
  overflow: hidden;
}
.filter{
  float: left;
  width: 10%;
  overflow: visible;
}
.search{
  margin-bottom: 20px;
}
.title{
  font-size: 20px;
  border: 2px solid white;
  border-bottom-color: grey;
}
.checkbox{
  float: left;
  margin-right: 10px;
}
.card-columns {
  column-count: 1;
}
</style>
