<template>
  <div>
    <b-card
    :title=name
    style="width: 20rem"
    class="mb-2 text-left"
    >
      <b-card-text>
        Sitze: {{ seats }}
      </b-card-text>
      <b-card-text>
        Platz: {{room}}m&sup3;
      </b-card-text>
      <b-card-text class="targets">
        Start: {{start}}
      </b-card-text>
      <b-card-text class="targets float">
        Ziel: {{stop}}
        <b-card-text class="text-right" style="color: grey">{{price}}€</b-card-text>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'travel-card',
  props: {
    date: Date,
    name: String,
    seats: Number,
    room: Number,
    start: String,
    layover: String,
    stop: String,
    price: Number
  }
}

</script>

<style scoped>

.targets{
  color: #005b52;
}
</style>
