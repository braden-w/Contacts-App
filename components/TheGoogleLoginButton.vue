<template>
  <v-btn
    id="button"
    class="px-2"
    :color="color"
    :disabled="signedIn"
    :loading="signingIn"
    @click="signInWithGoogle"
  >
    <img :src="src" alt="" />
    <span id="text"> {{ signedIn ? 'Signed' : 'Sign' }} in with Google</span>
  </v-btn>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    dark() {
      return this.$vuetify.theme.dark
    },
    color() {
      return this.dark ? '#4285F4' : '#FFFFFF'
    },
    src() {
      return require(`~/assets/btn_google_${
        this.dark ? 'dark' : 'light'
      }_normal_ios.svg`)
    },
    ...mapState('auth', ['signedIn', 'signingIn']),
  },
  methods: {
    ...mapActions({ signInWithGoogle: 'auth/signInWithGoogle' }),
  },
}
</script>

<style scoped>
#button {
  width: 100%;
  min-height: 40px;
  max-height: 40px;
  padding: 8px 16px;
  text-align: left;
}
#text {
  font-size: 14px;
  font-family: 'Roboto';
  font-weight: 500;
  color: #000000 / 0, 0, 0 (54%);
  text-transform: none;
}
</style>
