<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6 xl4>

        <v-alert
          v-model="alert"
          :value="error"
          transition="scale-transition"
          origin="center center"
          icon="warning"
          dismissible
          error
        >
        </v-alert>

        <v-card>
          <v-card-text>
            <v-form v-model="valid" ref="loginForm">
              <v-text-field
                name="email"
                label="E-mail"
                v-model="email"
                type="email"
                :rules="rules.email"
                validate-on-blur
                required
              ></v-text-field>

              <v-text-field
                name="password"
                label="Password"
                v-model="password"
                :rules="rules.password"
                :type="visibility ? 'text' : 'password'"
                :append-icon="visibility ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (visibility = !visibility)"
                required
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                @click="submit"
              >
                submit
              </v-btn>

              <v-btn
                @click="clear"
              >
                clear
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  data () {
    return {
      email: '',
      password: '',
      visibility: false,
      valid: false,
      alert: false,
      error: '',
      rules: {
        email: [
          v => !!v || 'Email is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        password: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 8) || 'Password must be 8 characters or more'
        ]
      }
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({ name: 'Home' })
      } catch (error) {
        this.alert = true
        this.error = error.response.data.error
      }
    },
    submit () {
      if (this.$refs.loginForm.validate()) {
        this.login()
      }
    },
    clear () {
      this.$refs.loginForm.reset()
      this.alert = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
