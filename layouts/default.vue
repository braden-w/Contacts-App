<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item class="ma-n6">
          <v-list-item-action v-if="miniVariant">
            <v-container
              v-if="signedIn"
              class="d-flex flex-column align-center justify-center"
            >
              <v-avatar size="30" class="ma-5">
                <v-img :src="userCredentials.photoURL" />
              </v-avatar>
            </v-container>
          </v-list-item-action>
          <v-list-item-content>
            <v-container
              v-if="signedIn"
              class="d-flex flex-column align-center justify-center"
            >
              <v-avatar size="100">
                <v-img
                  :src="userCredentials.photoURL"
                  :alt="userCredentials.displayName"
                />
              </v-avatar>
              <h1 class="subtitle-1 mt-1">{{ userCredentials.displayName }}</h1>
              <h2 class="subtitle-2 mt-1">{{ userCredentials.university }}</h2>
            </v-container>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="signedIn">
          <v-container>
            <TheAddContactButton :mini="miniVariant" />
          </v-container>
        </v-list-item>
        <v-list-item v-if="!miniVariant">
          <v-list-item-content><TheGoogleLoginButton /></v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(page, i) in pages"
          :key="i"
          :to="page.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ page.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="page.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click.stop="miniVariant = !miniVariant">
          <v-list-item-action>
            <v-icon>
              mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>Collapse</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="darkMode">
        <v-icon>mdi-lightbulb-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <nuxt id="nuxt" />
    </v-main>
  </v-app>
</template>

<script>
import TheGoogleLoginButton from '@/components/TheGoogleLoginButton.vue'
import TheAddContactButton from '@/components/TheAddContactButton.vue'
import { mapState } from 'vuex'
export default {
  components: {
    TheGoogleLoginButton,
    TheAddContactButton,
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      pages: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/',
        },
      ],
      miniVariant: false,
      title: 'Contacts',
    }
  },
  computed: {
    ...mapState('auth', ['signedIn', 'userCredentials']),
  },
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
}
</script>

<style>
#nuxt {
  height: 100%;
}
</style>
