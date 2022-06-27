<template>
  <b-card
    style="width: 25rem; margin: auto"
    class="mb-2 text-left shadow"
  >
    <b-card-body class="body">
      <div class="info">
        <div class="head"> Registrieren </div>
        <b-input-group id="title" class="name">
          <b-form-input v-model="name" placeholder="Name" class="input shadow-sm"></b-form-input>
        </b-input-group>
        <b-input-group id="sitze" class="date">
          <b-form-input v-model="date" placeholder="Geburtsdatum" class="input shadow-sm"></b-form-input>
        </b-input-group>
        <b-input-group id="platz" class="email">
          <b-form-input v-model="email" placeholder="E-Mail" class="input shadow-sm"></b-form-input>
        </b-input-group>
        <b-input-group id="desc" class="desc">
          <b-form-input v-model="desc" placeholder="Beschreibung" class="input shadow-sm"></b-form-input>
        </b-input-group>
        <b-input-group id="desc" class="pw1">
          <b-form-input v-model="password1" placeholder="Passwort" type="password" class="input shadow-sm"></b-form-input>
        </b-input-group>
        <b-input-group id="desc" class="pw2">
          <b-form-input v-model="password2" placeholder="Passwort (Wdh.)" type="password" class="input shadow-sm"></b-form-input>
        </b-input-group>
      </div>
    </b-card-body>
    <b-card-footer class="foot">
      <b-button id="create" v-on:click="create" class="create"> Create </b-button>
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  name: "RegisterView.vue",
  data () {
    return {
      name: '',
      date: '',
      email: '',
      password1: '',
      password2: '',
      desc: ''
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
</style>
