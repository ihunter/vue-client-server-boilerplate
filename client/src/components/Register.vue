<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6 xl4>

        <v-alert
          v-model="alert"
          transition="scale-transition"
          origin="center center"
          icon="warning"
          dismissible
          error
        >
          <span v-html="error"></span>
        </v-alert>

        <v-card>
          <v-card-text>
            <v-form v-model="valid" ref="loginForm">
              <v-text-field
                name="firstname"
                label="First Name"
                v-model="firstname"
                type="text"
                :rules="rules.name"
                validate-on-blur
                required
              ></v-text-field>

              <v-text-field
                name="lastname"
                label="Last Name"
                v-model="lastname"
                type="text"
                :rules="rules.name"
                validate-on-blur
                required
              ></v-text-field>

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
                name="phone"
                label="Phone"
                mask="phone"
                v-model="phone"
                type="text"
                :rules="rules.phone"
                validate-on-blur
                required
              ></v-text-field>

              <v-text-field
                name="address"
                label="Address"
                v-model="address"
                type="text"
                :rules="rules.address"
                validate-on-blur
                required
              ></v-text-field>

              <v-text-field
                name="city"
                label="City"
                v-model="city"
                type="text"
                :rules="rules.city"
                validate-on-blur
                required
              ></v-text-field>

              <v-select
                name="state"
                label="State"
                v-model="state"
                :items="states"
                type="text"
                :rules="rules.state"
                autocomplete
                validate-on-blur
                required
              ></v-select>

              <v-text-field
                name="zipcode"
                label="Zip Code"
                v-model="zipcode"
                type="text"
                :rules="rules.zipcode"
                validate-on-blur
                required
              ></v-text-field>

              <v-text-field
                name="country"
                label="Country"
                v-model="country"
                type="text"
                :rules="rules.country"
                validate-on-blur
                required
              ></v-text-field>

              <v-text-field
                name="username"
                label="Username"
                v-model="username"
                type="text"
                :rules="rules.username"
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
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      skype: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      username: '',
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
      },
      states: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ]
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthService.register({
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          phone: this.phone,
          skype: this.skype,
          address: this.address,
          city: this.city,
          state: this.state,
          zipcode: this.zipcode,
          country: this.country,
          username: this.username,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({ name: 'Home' })
      } catch (error) {
        this.alert = true
        this.error = error.response.data.error
        console.log(error.response.data.error)
      }
    },
    submit () {
      if (this.$refs.loginForm.validate()) {
        this.register()
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
