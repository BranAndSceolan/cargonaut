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
        <div class="col-10 card-columns">
          <travel-card class="mx-4 mt-4" v-for="(offer, index) in offers" v-bind:key="index"  :name="offer.name" :start="offer.start"
                       :stop="offer.stop" :seats="offer.seats" :room="offer.room" :price="offer.price" :date="offer.date">
          </travel-card>
        </div>
        <filter-list></filter-list>
      </div>
    </div>
  </div>
</template>

<script>
import travelCard from '@/components/travel-card'
import axios from 'axios'
import FilterList from '../components/FilterList'

export default {
  name: 'OverviewView',
  components: { FilterList, travelCard },
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
.search{
  margin-bottom: 20px;
}
.card-columns {
  column-count: 1;
}
</style>
