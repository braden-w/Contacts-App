<template>
  <v-container
    ><v-card width="600" class="mx-auto mt-5">
      <v-card-title> <h1 class="display-1">Login</h1></v-card-title>
      <v-card-text>
        <v-form ref="form"
          ><v-text-field
            v-model="form.email"
            :rules="form.emailRules"
            name="email"
            label="Username"
            prepend-icon="mdi-account-circle"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            name="password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            required
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="info" @click="createUser(form.email, form.password)"
          >Register</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn color="success" @click="signIn(form.email, form.password)"
          >Login</v-btn
        >
        <v-btn color="success" @click="signInWithGoogle"
          >Login with Google</v-btn
        >
        <v-btn color="success" @click="signOut()">Logout</v-btn>
      </v-card-actions>
    </v-card></v-container
  >
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RegisterPage',
  data() {
    return {
      showPassword: false,
      form: {
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        password: '',
        passwordConfirm: '',
      },
    }
  },
  methods: {
    createUser(email, password) {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('auth/createUser', { email, password })
      }
    },
    signIn(email, password) {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('auth/signIn', { email, password })
      }
    },
    ...mapActions({ signInWithGoogle: 'auth/signInWithGoogle' }),
    signOut() {
      this.$store.dispatch('auth/signOut')
    },
  },
}
</script>

<style></style>
