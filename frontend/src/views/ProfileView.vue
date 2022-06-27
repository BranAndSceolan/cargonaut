<template>
    <div class="container">
      <div class="row">
        <div class="col-sm-2">
          <div class="picContainer">
            <img class="profilePic" alt="Profile pic" src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Helmut_Kohl_%281996%29.jpg">
          </div>
        </div>
        <div class="col-xl-10">
          <p class="name m-3">Mike Jefferson</p>
          <p class="desc m-3">Ich bin der Mike. Früher war ich erfolgreicher Consultingmanager bei TheCompany. Als sich jedoch
            herausstellte, dass TheCompany sich nur über ein Schneeballsystem über Wasser halten konnte,
            bin ich in Frührente und versuche mir jetzt über Cargonaut etwas extra zu verdienen, damit ich für die
            nächste Miete nicht wieder eine Niere verkaufen muss. </p>
        </div>
      </div>
      <div class="row mx-4">
        <OverBar title="Fahrzeuge" v-on:contentHidden="carsHidden = $event"></OverBar>
        <div class="w-100 mr-5" v-if="!carsHidden">
          <CarEntry v-for="(car, index) in cars" v-bind:key="index" :name="car.name" :seats="car.seats" :room="car.room"></CarEntry>
        </div>
      </div>
      <div class="row mx-4">
        <OverBar class="mb-4" title="Angebote" v-on:contentHidden="offersHidden = $event"></OverBar>
        <div class="col w-100">
          <div v-if="!offersHidden" class="card-columns">
            <travel-card class="mb-4 mx-1 mr-4" v-for="(offer, index) in offers" v-bind:key="index"  :name="offer.name" :start="offer.start"
                         :stop="offer.stop" :seats="offer.seats" :room="offer.room" :price="offer.price"></travel-card>
          </div>
        </div>
      </div>
      <div class="area">
        <OverBar class="mb-4" title="Reviews" v-on:contentHidden="reviewsHidden = $event"></OverBar>
        <div v-if="!reviewsHidden">
          <review-entry v-bind:key="index" v-for="(review, index) in reviews" :name="review.name" :date="review.date"
                        :desc="review.desc" :stars="review.stars"></review-entry>
        </div>
      </div>
    </div>
</template>

<script>
import OverBar from '../components/OverBar'
import CarEntry from '../components/CarEntry'
import ReviewEntry from "@/components/ReviewEntry";
import axios from 'axios'
import TravelCard from '../components/travel-card'
export default {
  name: 'ProfileView',
  components: {ReviewEntry, TravelCard, CarEntry, OverBar },
  data () {
    return {
      cars: [{ name: 'VW Amarok', seats: '2', room: '6' },
        { name: 'Wroom Wroom', seats: '2', room: '1' }],
      offers: [{ name: 'looper1', start: 'City1', stop: 'city2', seats: '5', room: '6', price: '19,99' },
        { name: 'looper2', start: 'City2', stop: 'city3', seats: '6', room: '8', price: '29,99' },
        { name: 'Ich entführe euch alle', start: 'Pausenhof', stop: '???', seats: '6', room: '8', price: '29,99' },
        { name: 'looper2', start: 'City2', stop: 'city3', seats: '6', room: '8', price: '29,99' },
        { name: 'looper2', start: 'City2', stop: 'city3', seats: '6', room: '8', price: '29,99' }],
      desc: 'Ich biete eine entspannte und lässige fahrt von Hannover nach Gießen mit einem kleinen Zwischenstopp in Bielefeld zu meiner' +
        'Tante Hildegard. Für Musik und Snacks auf der Fahrt sind gesorgt, wobei besondes Jazz Fans sich abgeholt fühlen werden.' +
        'Snacks gibt es auch und zudem noch ausreichend Stauraum für Gepäck egal ob klein oder groß.',
      reviews: [{name: 'Berta Gutenberg' , date: 'Juni 2020', desc: 'Tolle Fahrte und toller Fahrer. Hat mehrere interessante Geschichten aus seiner Jugend erzählt. ' +
          'Generell war eine gute Luft im Auto anstelle des übliche Gestanks, das man von derartigen Autos erwarten würde.', stars: 5},
        {name: "Max Mustermann", date: "Juni 2020", desc: "Schlechte Fahrt, schlechter Fahrer, 5/7 niewieder!", stars: 1}],
      reviewsHidden: false,
      carsHidden: false,
      offersHidden: false
    }
  },
  mounted () {
    /*
    axios.get('/vehicle/getAll').then(response => (this.cars = response.data)).catch((reason) => {
      console.log(reason)
    })

     */
  }
}
</script>

<style scoped>

.profilePic {
  height: auto;
  width: 100%;
}
.picContainer {
  overflow: hidden;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  box-shadow: 0 0 8px #BBBBBB;
}
.container {
  max-width: 1500px!important;
}
p {
  text-align: left;
}
.name {
  font-size: 2em;
}
.desc {
  font-size: 1.1em;
}
.card-columns {
  column-count: 1;
}
</style>
