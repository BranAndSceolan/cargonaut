<template>
  <b-card
    title="Login"
    style="width: 25rem; margin: auto; border-radius: 20px"
    class="cardArea mb-2 text-left shadow"
  >
    <b-card-body>
      <b-input-group id="login">
        <b-form-input placeholder="Username" v-model="user" className="input shadow-sm"></b-form-input>
      </b-input-group>
      <b-input-group id="password">
        <b-form-input placeholder="Passwort" type="password" v-model="password"
                      className="input shadow-sm"></b-form-input>
      </b-input-group>
      <b-card-text class="text">
        Forgot your <span class="link">Password</span>?
      </b-card-text>
      <b-btn className="button" v-on:click="login"> Login</b-btn>
      <b-card-text className="text">
        Need an Account?
        <router-link to="/register" className="link">Register here</router-link>
      </b-card-text>
      <warning-component v-if="warning"></warning-component>
    </b-card-body>
  </b-card>
</template>

<script>
import axios from 'axios'
import WarningComponent from '../components/WarningComponent'

export default {
  name: 'LoginView.vue',
  components: { WarningComponent },
  data () {
    return {
      user: '',
      password: '',
      warning: false
    }
  },
  methods: {
    login () {
      if (this.user !== '' && this.password !== '') {
        axios.post('/user/login',
          {
            name: this.user,
            password: this.password
          })
          .then(() => (this.$router.push('/overview'))).catch(reason => {
            this.warning = true
            console.log(reason)
          })
      } else {
        this.warning = true
      }
    }
  },
  mounted () {
    document.title = 'Login - Cargonaut'
    this.warning = false
  }
}
</script>

<style scoped>
#login {
  padding-bottom: 15px;
}

.text {
  font-size: 15px;
  color: gray;
}

.link {
  color: #005b52;
}

@media ( max-width: 410px ){
  .cardArea {
    max-width: 300px;
  }
}
</style>
