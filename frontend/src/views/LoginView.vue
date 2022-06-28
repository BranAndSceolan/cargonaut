<template>
  <b-card
    title="Login"
    style="width: 25rem; margin: auto; border-radius: 20px"
    class="mb-2 text-left shadow"
  >
    <b-card-body>
      <b-input-group id="login">
        <b-form-input placeholder="Username" class="input shadow-sm"></b-form-input>
      </b-input-group>
      <b-input-group id="password">
        <b-form-input placeholder="Passwort" type="password" class="input shadow-sm"></b-form-input>
      </b-input-group>
      <b-card-text class="text">
        Forgot your <span class="link">Password</span>?
      </b-card-text>
      <b-btn class="button"> Login </b-btn>
      <b-card-text class="text">
        Need an Account? <router-link to="/register" class="link">Register here</router-link>
      </b-card-text>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'LoginView.vue'
}
</script>

<style scoped>
#login {
  padding-bottom: 15px;
}
.button {
  width: 100%;
  border-radius: 20px;
  background: #005b52;
}
.text {
  font-size: 15px;
  color: gray;
}
.link {
  color: #005b52;
}
</style>
