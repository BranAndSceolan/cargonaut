<template>
  <b-card
    style="width: 40rem; margin: auto; border-radius: 20px"
    class="mb-2 text-left shadow"
  >
    <b-card-body class="body">
      <div class="info">
        <div class="head"> Review </div>
        <b-textarea rows="5" no-resize v-model="desc" class="desc"></b-textarea>
        <b-rating v-model="value" color="#005b52" class="rating"></b-rating>
      </div>
    </b-card-body>
    <b-card-footer class="foot">
      <b-button id="create" v-on:click="create" class="create"> Create </b-button>
    </b-card-footer>
  </b-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CreateReviewView.vue',
  props: {
    id: String,
    user: String
  },
  data () {
    return {
      value: 0,
      desc: ''
    }
  },
  methods: {
    create () {
      if (this.desc !== '') {
        axios.post('/eval/create',
          {
            result: this.value,
            ride: this.id,
            user: this.user
          })
          .then(() => (this.$router.push('/overview'))).catch(reason => { console.log(reason) })
      }
    }
  }
}
</script>

<style scoped>
.head{
  font-size: 36px;
  color: grey;
  font-weight: bold;
}
.foot {
  background: white;
}
.create {
  margin-left: 15rem;
  background: #005b52;
  border-radius: 12px;
}
.rating {
  margin-top: 1rem;
}
</style>
