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
        <div class="col-9">
          <div class="row">
            <div class="col-4" v-for="offer in offers" v-bind:key="offer._id">
              <travel-card class="mx-4 mt-4" v-for="offer in offers" v-bind:key="offer._id" :id="offer._id" :title="offer.title" :origin="offer.origin"
                           :destination="offer.destination" :seats="offer.numberOfFreeSeats" :height="'X'" :length="'X'"
                           :width="'X'" :price="offer.price" :date="offer.date">
              </travel-card>
            </div>
          </div>
        </div>
        <filter-list class="col-2 offset-1"></filter-list>
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
      offers: []
    }
  },
  methods: {
    getOffers () {
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