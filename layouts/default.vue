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
        <v-list-item><TheGoogleLoginButton /></v-list-item>
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
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import TheGoogleLoginButton from '@/components/TheGoogleLoginButton.vue'
export default {
  components: {
    TheGoogleLoginButton,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      dark: false,
      pages: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Login',
          to: '/login',
        },
        {
          icon: 'mdi-map-marker',
          title: 'MVP',
          to: '/mvp',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Contacts',
    }
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
