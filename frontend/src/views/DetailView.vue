<template>
 <div>
   <div>
     <img class="banner shadow" alt="Car Banner" src="../assets/amarok-d8f.png">
   </div>
   <div class="bar">
     <div class="own-card">
      <b-card class="shadow" style="width: 20rem; border-radius: 15px">
        <b-card-body>
          <div>
            <div class="card-head"> {{ offer.title }} </div>
            <div class="row">
              <div class="col-sm-4"> Sitze: {{ offer.numberOfFreeSeats }} </div>
              <div class="col-sm-4"> Platz: {{ vehicle.spaceLength }} </div>
              <div class="col-sm-4"> {{ offer.price }}€ </div>
            </div>
          </div>
        </b-card-body>
      </b-card>
     </div>
     <div>
       <b-button class="book shadow" v-if="currentUser !== offer.user" v-on:click="book"> Anmelden </b-button>
       <b-button class="book shadow" v-if="currentUser === offer.user" v-on:click="deleteOffer"> Löschen </b-button>
     </div>
   </div>
   <div class="area">
     <div class="title"> Orte </div>
     <div class="row positionArea">
       <div class="col-4">
         <div class="row justify-content-center">
           <font-awesome-icon class="icon" icon="fa-solid fa-circle-dot"></font-awesome-icon>
         </div>
         <div class="row justify-content-center">
           <p>{{ offer.origin }}</p>
         </div>
       </div>
       <div class="line line1"></div>
       <div class="col-4">
         <div class="row justify-content-center">
           <font-awesome-icon class="icon" icon="fa-solid fa-circle-dot"></font-awesome-icon>
         </div>
         <div class="row justify-content-center">
           <p>Auf dem Weg!</p>
         </div>
       </div>
       <div class="line line2"></div>
       <div class="col-4">
         <div class="row justify-content-center">
           <font-awesome-icon class="icon" icon="fa-solid fa-circle-dot"></font-awesome-icon>
         </div>
         <div class="row justify-content-center">
           <p>{{ offer.destination }}</p>
         </div>
       </div>
     </div>
   </div>
   <div class="area">
     <div class="title"> Beschreibung </div>
     <div class="desc-content">
       {{ offer.description }}
     </div>
   </div>
   <div class="area">
     <div class="title"> Fahrzeug </div>
     <CarEntry :name="vehicle.type" :seats="vehicle.numberOfSeats" :room="vehicle.spaceLength"></CarEntry>
   </div>
   <div class="area">
     <OverBar class="mb-4" title="Reviews" v-on:contentHidden="reviewsHidden = $event" :address=address ></OverBar>
     <div v-if="!reviewsHidden">
       <review-entry v-bind:key="index" v-for="(review, index) in reviews" :name="review.name" :date="review.date"
       :desc="review.desc" :stars="review.stars"></review-entry>
     </div>
   </div>
 </div>
</template>

<script>
import CarEntry from '@/components/CarEntry'
import OverBar from '@/components/OverBar'
import ReviewEntry from '@/components/ReviewEntry'
import axios from 'axios'

export default {
  name: 'DetailView',
  components: { ReviewEntry, CarEntry, OverBar },
  props: {
    id: String,
    creator: String
  },
  data () {
    return {
      offer: {},
      title: 'Schnelle fahrt nach Gießen',
      seats: 2,
      room: 1,
      price: 28.55,
      desc: 'Ich biete eine entspannte und lässige fahrt von Hannover nach Gießen mit einem kleinen Zwischenstopp in Bielefeld zu meiner' +
        'Tante Hildegard. Für Musik und Snacks auf der Fahrt sind gesorgt, wobei besondes Jazz Fans sich abgeholt fühlen werden.' +
        'Snacks gibt es auch und zudem noch ausreichend Stauraum für Gepäck egal ob klein oder groß.',
      cars: [{ name: 'VW Amarok', seats: '2', room: '6' }],
      reviews: [{
        name: 'Berta Gutenberg',
        date: 'Juni 2020',
        desc: 'Tolle Fahrte und toller Fahrer. Hat mehrere interessante Geschichten aus seiner Jugend erzählt. ' +
          'Generell war eine gute Luft im Auto anstelle des übliche Gestanks, das man von derartigen Autos erwarten würde.',
        stars: 5
      },
      { name: 'Max Mustermann', date: 'Juni 2020', desc: 'Schlechte Fahrt, schlechter Fahrer, 5/7 niewieder!', stars: 1 }],
      reviewsHidden: false,
      currentUser: '',
      vehicle: {}
    }
  },
  mounted () {
    document.title = 'Detail - Cargonaut'
    axios.get('/ride/findById/' + this.id).then(response => {
      this.offer = response.data

      axios.get('/vehicle/findById/' + this.offer.vehicle).then(response => {
        this.vehicle = response.data
      })

      axios.get('/user/current').then(response => {
        this.currentUser = response.data._id
      }).catch(reason => console.log(reason))
    })
  },
  computed: {
    address: function () {
      return '/createReview/' + this.id + '/' + this.offer.user
    }
  },
  methods: {
    book () {
      if (this.offer.numberOfFreeSeats > 1) {
        axios.get('/user/current').then(response => {
          const ride = this.offer
          ride.numberOfFreeSeats--
          if (ride.accReqs === undefined) {
            ride.accReqs = []
          }
          ride.accReqs.push(response.data._id)
          axios.post('/ride/update/' + this.id, ride).then().catch(reason => console.log(reason))
        }).catch(reason => console.log(reason))
      }
    },
    deleteOffer () {
      axios.delete('/ride/delete/' + this.id).then(() => this.$router.push('/overview')).catch(reason => console.log(reason))
    }
  }
}
</script>

<style scoped>
.banner {
  width: 100%;
  height: 25rem;
  object-fit: cover;
  margin-top: -2%;
}
.book {
  background: #005b52;
  font-weight: bold;
  width: 9rem;
  height: 3rem;
  border-radius: 12px;
}
.card-head {
  font-weight: bold;
  color: gray;
  text-align: left;
  margin-left: 3px;
  font-size: larger;
}
.bar {
  overflow: hidden;
  margin-top: -4rem;
  margin-bottom: 5rem;
}
.own-card {
  float: left;
  margin-left: 10rem;
}
.book {
  margin-top: 2.5rem;
  float: right;
  margin-right: 10rem;
  position: relative;
}
.area {
  width: 84%;
  margin: auto auto 3rem;
}
.title{
  font-size: 2rem;
  font-weight: bold;
  color: gray;
  text-align: left;
}
.desc-content {
  color: gray;
  text-align: left;
  font-size: 1.2rem;
}
.positionArea p{
  color: #005b52;
  text-align: center;
  font-size: 1.3em;
}
.icon {
  color: #005b52;
  font-size: 1.5em;
  text-align: center;
}
.line{
  position: absolute;
  width: 27%;
  height: 2px;
  background: #005b52;
  margin-top: 10px;
}
.line1{
  left:330px;
}
.line2 {
  right:330px;
}

</style>
