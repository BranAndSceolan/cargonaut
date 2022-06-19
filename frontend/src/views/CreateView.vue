<template>
  <b-card
    style="width: 60rem; margin: auto"
    class="mb-2 text-left shadow"
  >
    <b-card-body class="body">
      <div class="info">
        <div class="head"> Create offer </div>
        <b-input-group id="title" class="title row">
          <b-form-input placeholder="Title" class="input shadow-sm"></b-form-input>
        </b-input-group>
        <div class="row">
          <b-input-group id="sitze" class="seat">
            <b-form-input placeholder="Sitze" class="input shadow-sm"></b-form-input>
          </b-input-group>
          <b-input-group id="platz" class="space">
            <b-form-input placeholder="Platz" class="input shadow-sm"></b-form-input>
          </b-input-group>
        </div>
        <b-input-group id="desc" class="desc row">
          <b-form-input placeholder="Beschreibung" class="input shadow-sm"></b-form-input>
        </b-input-group>
      </div>
      <div class="data">
        <b-dropdown id="dropdown-1" text="Fahrzeug" class="m-md-2 dropdown">
          <b-dropdown-item>First Action</b-dropdown-item>
          <b-dropdown-item>Second Action</b-dropdown-item>
          <b-dropdown-item>Third Action</b-dropdown-item>
        </b-dropdown>
        <div class="row">
          <b-input-group id="herkunft" class="town">
            <b-form-input placeholder="Herkunft" class="input shadow-sm"></b-form-input>
          </b-input-group>
          <b-input-group id="hdate" class="date">
            <b-form-input placeholder="Datum" class="input shadow-sm"></b-form-input>
          </b-input-group>
        </div>
        <div class="row">
          <b-input-group id="platz" class="town">
            <b-form-input placeholder="Zwischenstop" class="input shadow-sm"></b-form-input>
          </b-input-group>
          <b-input-group id="breakdate" class="date">
            <b-form-input placeholder="Datum" class="input shadow-sm"></b-form-input>
          </b-input-group>
        </div>
        <div class="row">
          <b-input-group id="platz" class="town">
            <b-form-input placeholder="Ziel" class="input shadow-sm"></b-form-input>
          </b-input-group>
          <b-input-group id="zdate" class="date">
            <b-form-input placeholder="Datum" class="input shadow-sm"></b-form-input>
          </b-input-group>
        </div>
      </div>
    </b-card-body>
    <b-card-footer class="foot">
      <div></div>
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  name: 'CreateView.vue'
}
</script>

<style scoped>
.foot {
  background: white;
}
.body {
  overflow: hidden;
}
.info {
  float: left;
  width: 50%;
  border-style: solid;
  border-width: 0;
  border-right-width: 1px;
  border-color: lightgray;
}
.data {
  float: left;
  width: 50%;
}
.date {
  width: 40%;
  margin-left: 10px;
}
.town {
  width: 40%;
}
.dropdown {
  width: 98%;
}
.head{
  font-size: 36px;
  color: grey;
  font-weight: bold;
}
.title {
  width: 90%;
}
.desc {
  width: 90%;
}
.seat {
  width: 42%;
}
.space {
  width: 42%;
  margin-left: 14px;
}
.data .row {
  margin-left: 7px;
  margin-bottom: 10px;
}
.info .row {
  margin-left: 0;
  margin-bottom: 10px;
}
</style>
