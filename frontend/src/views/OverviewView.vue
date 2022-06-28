<template>
  <div class="container">
    <div>
      <b-input-group class="search">
        <template #prepend>
          <b-input-group-text class="icon">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </b-input-group-text>
        </template>
        <b-form-input></b-form-input>

        <template #append>
          <b-dropdown text="Sort" variant="success">
            <b-dropdown-item-btn v-on:click="sort('price')">Price</b-dropdown-item-btn>
            <b-dropdown-item-btn v-on:click="sort('seats')">Seats</b-dropdown-item-btn>
            <b-dropdown-item-btn v-on:click="sort('date')">Date</b-dropdown-item-btn>
          </b-dropdown>
        </template>
      </b-input-group>
      <div class="row">
        <div class="col-9">
          <div class="row">
            <div class="col-4" v-for="offer in offers" v-bind:key="offer._id">
              <travel-card class="mx-4 mt-4" :id="offer._id" :title="offer.title" :origin="offer.origin"
                           :destination="offer.destination" :seats="offer.numberOfFreeSeats" :height="'X'" :length="'X'"
                           :width="'X'" :price="offer.price" :date="offer.date">
              </travel-card>
            </div>
          </div>
        </div>
        <filter-list v-on:priceFilter="filter" v-on:seatsFilter="filter" class="col-2 offset-1"></filter-list>
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
      offers: [],
      sortVal: 'default',
      searchVal: ''
    }
  },
  methods: {
    getOffers () {
      axios.get('/ride/getAll').then(response => (this.offers = response.data))
    },
    filter (filterString, filterType) {
      axios.get('/ride/getAll').then(response => {
        this.offers = response.data
        console.log(filterString, filterType)
        const filterAr = filterString.split('|')
        const compare = {
          '<': function (x, y) { return x < y },
          '=': function (x, y) { return x === y },
          '>': function (x, y) { return x > y }
        }
        switch (filterType) {
          case 'price':
            for (const offer in this.offers) {
              if (compare[filterAr[0]](this.offers[Number(offer)].price, Number(filterAr[1])) === false) {
                this.offers.splice(Number(offer), 1)
              }
            }
            break
          case 'room':
            break
          case 'seats':
            for (const offer in this.offers) {
              if (compare[filterAr[0]](this.offers[Number(offer)].numberOfFreeSeats, Number(filterAr[1])) === false) {
                this.offers.splice(Number(offer), 1)
              }
            }
            break
        }
      })
    },
    sort (sortVal) {
      this.sortVal = sortVal
      switch (sortVal) {
        case 'price':
          this.offers.sort((a, b) => a.price - b.price)
          break
        case 'seats':
          this.offers.sort((a, b) => a.numberOfFreeSeats - b.numberOfFreeSeats)
          break
        case 'date':
          this.offers.sort((a, b) => a.date - b.date)
          break
      }
    },
    search () {
      this.offers.filter(offer => offer.title === this.searchVal)
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
.icon {
  background: white;
}
</style>
