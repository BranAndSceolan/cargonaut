<template>
  <div>
    <div class="container">
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
      <div>
        <b-card-group deck class="deck">
          <travel-card v-for="(offer, index) in offers" v-bind:key="index"  :name="offer.name" :start="offer.start" :stop="offer.stop" :seats="offer.seats" :room="offer.room" :price="offer.price"></travel-card>
          <travel-card name="Ich entführe euch alle" start="???" stop="Polen" seats="2" room="8" price="0,00"></travel-card>
          <travel-card name="Free Candy" start="Pausenhof" stop="???" seats="2" room="8" price="0,00"></travel-card>
          <travel-card name="Pazifik fahrt" start="Irrenhaus" stop="Marianengraben" seats="2" room="8" price="0,00"></travel-card>
          <travel-card name="Free Ethanol" start="Keller" stop="Krankenhaus" seats="1" room="2" price="15000,00"></travel-card>
          <travel-card name="*nuscheln*" start="???" stop="Bett" seats="?" room="?" price="0,00"></travel-card>
          <travel-card name="Wirres Zeug" start="Dusche" stop="Nobelpreis" seats="?" room="?" price="0,00"></travel-card>
          <travel-card name="Test" start="Gießen" stop="Frankfurt" seats="3" room="2" price="19,99"></travel-card>
          <travel-card name="Test" start="Gießen" stop="Frankfurt" seats="3" room="2" price="19,99"></travel-card>
        </b-card-group>
      </div>
      <div class="filter text-left">
        <div class="title"> Filter </div>
        <div>
          <div> Platz   v </div>
          <div>
            <div>
              <input type="checkbox" aria-label="1m" class="checkbox">
              <div> &#62;1m&sup3; </div>
            </div>
            <div>
              <input type="checkbox" aria-label="<5m>" class="checkbox">
              <div> &#60;5m&sup3; </div>
            </div>
            <div>
              <input type="checkbox" aria-label=">5m" class="checkbox">
              <div> &#62;5m&sup3; </div>
            </div>
          </div>
        </div>
        <div>
          <div> Sitze   v </div>
          <div>
            <div>
              <input type="checkbox" aria-label="1 Sitz" class="checkbox">
              <div> 1 Sitz </div>
            </div>
            <div>
              <input type="checkbox" aria-label="2 Sitze" class="checkbox">
              <div> 2 Sitze </div>
            </div>
            <div>
              <input type="checkbox" aria-label="3 Sitze" class="checkbox">
              <div> 3 Sitze </div>
            </div>
            <div>
              <input type="checkbox" aria-label=">3 Sitze" class="checkbox">
              <div> &#62;3 Sitze </div>
            </div>
          </div>
        </div>
        <div>
          <div> Preis   v </div>
          <div>
            <div>
              <input type="checkbox" aria-label="Unter 5" class="checkbox">
              <div> Unter 5€ </div>
            </div>
            <div>
              <input type="checkbox" aria-label="Unter 10" class="checkbox">
              <div> Unter 10€ </div>
            </div>
            <div>
              <input type="checkbox" aria-label="Unter 15" class="checkbox">
              <div> Unter 15€ </div>
            </div>
            <div>
              <input type="checkbox" aria-label="Unter 30" class="checkbox">
              <div> Unter 30€ </div>
            </div>
            <div>
              <input type="checkbox" aria-label="Über 30" class="checkbox">
              <div> Über 30€ </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import travelCard from '@/components/travel-card'

export default {
  name: 'OverviewView',
  components: { travelCard },
  data () {
    return {
      offers: [{ name: 'looper1', start: 'City1', stop: 'city2', seats: '5', room: '6', price: '19,99€' },
        { name: 'looper2', start: 'City2', stop: 'city3', seats: '6', room: '8', price: '29,99€' }]
    }
  }
}
</script>

<style scoped>
.container{
  overflow: hidden;
  max-width: 90%;
  }
.deck{
  float: left;
  width: 85%;
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
</style>