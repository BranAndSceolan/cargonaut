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
        <OverBar title="Fahrzeuge" v-on:contentHidden="carsHidden = $event" address="/createVeh"></OverBar>
        <div class="w-100 mr-5" v-if="!carsHidden">
          <CarEntry v-for="vehicle in this.user.vehicles" v-bind:key="vehicle.id" :name="vehicle.type" :seats="vehicle.numberOfSeats" :room="vehicle.spaceLength"></CarEntry>
        </div>
      </div>
      <div class="row mx-4">
        <OverBar class="mb-4" title="Angebote" v-on:contentHidden="offersHidden = $event" address="/create" ></OverBar>
        <div class="col w-100">
          <div v-if="!offersHidden" class="card-columns">
            <travel-card class="mx-4 mt-4" v-for="offer in userOffers" v-bind:key="offer.id"  :title="offer.title" :origin="offer.origin"
                         :destination="offer.destination" :seats="offer.numberOfFreeSeats" :height="'X'" :length="'X'"
                         :width="'X'" :price="offer.price" :date="offer.date">
            </travel-card>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import OverBar from '../components/OverBar'
import CarEntry from '../components/CarEntry'
import ReviewEntry from '@/components/ReviewEntry'
import axios from 'axios'
import TravelCard from '../components/travel-card'
export default {
  name: 'ProfileView',
  components: { TravelCard, CarEntry, OverBar },
  data () {
    return {
      user: {
        id: '1',
        name: 'Max Mustermann',
        birthday: 'Juni 2020',
        description: 'Ich biete eine entspannte und lässige fahrt von Hannover nach Gießen mit einem kleinen Zwischenstopp in Bielefeld zu meiner' +
          'Tante Hildegard. Für Musik und Snacks auf der Fahrt sind gesorgt, wobei besondes Jazz Fans sich abgeholt fühlen werden.' +
          'Snacks gibt es auch und zudem noch ausreichend Stauraum für Gepäck egal ob klein oder groß.',
        averageEvalOfRides: 1,
        vehicles: [{ _id: '1', type: 'VW Amarok', numberOfSeats: 2, spaceWidth: 6, spaceHeight: 4, spaceLength: 4 }]
      },
      offers: [],
      reviews: [{
        name: 'Berta Gutenberg',
        date: 'Juni 2020',
        desc: 'Tolle Fahrte und toller Fahrer. Hat mehrere interessante Geschichten aus seiner Jugend erzählt. ' +
          'Generell war eine gute Luft im Auto anstelle des übliche Gestanks, das man von derartigen Autos erwarten würde.',
        stars: 5
      }],
      reviewsHidden: false,
      carsHidden: false,
      offersHidden: false
    }
  },
  mounted () {
    axios.get('/users/user/getAll').then(response => (this.user = response.data[0]))
    for (const i in this.user.vehicles) {
      axios.get('/vehicle/findById/' + i).then(response => (this.user.vehicles.add(response.data))).catch((reason) => {
        console.log(reason)
      })
    }
    axios.get('/rides/getAll').then(response => (this.offers = response.data))
  },
  computed: {
    userOffers () {
      return this.offers.filter(offer => offer.user === this.user.id)
    }
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
