<template>
  <v-app class="dashboard">
    <v-container v-if="!signedIn" class="my-5">
      <v-row class="pa-3">
        <v-col
          v-for="column in layout"
          :key="column.name"
          :cols="column.columnsWide"
        >
          <v-icon v-if="column.icon">{{ column.icon }}</v-icon>
          <h1 v-else class="caption">{{ column.name }}</h1>
        </v-col>
      </v-row>
      <v-card class="mx-auto pa-4">
        <h1 class="heading-1 text-center">Please sign in with Google</h1>
      </v-card>
    </v-container>
    <v-container v-else class="my-5">
      <v-row class="pa-3">
        <v-col
          v-for="column in layout"
          :key="column.name"
          :cols="column.columnsWide"
        >
          <v-icon v-if="column.icon">{{ column.icon }}</v-icon>
          <h1 v-else class="caption">{{ column.name }}</h1>
        </v-col>
      </v-row>
      <v-divider />

      <v-card
        v-for="contact in contacts"
        :key="contact.name"
        class="pa-3"
        @click="activateModal(contact)"
      >
        <v-row>
          <v-col
            v-for="column in layout"
            :key="column.id"
            :cols="column.columnsWide"
          >
            <v-container v-if="column.icon">
              <v-row align="center">
                <v-avatar size="20">
                  <v-img :src="contact[column.id]"></v-img>
                </v-avatar>
              </v-row>
            </v-container>
            <h1 v-else class="caption">{{ contact[column.id] }}</h1>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      layout: [
        { icon: 'mdi-account', columnsWide: 1, id: 'picture' },
        { name: 'Name', columnsWide: 2.5, id: 'name' },
        { name: 'Email', columnsWide: 2, id: 'email' },
        { name: 'Phone', columnsWide: 2, id: 'phone' },
        { name: 'Birthday', columnsWide: 2, id: 'birthday' },
        { name: 'Last Contact', columnsWide: 2, id: 'lastContact' },
      ],
    }
  },
  computed: {
    ...mapState(['contacts']),
    ...mapState('auth', ['signedIn']),
  },
  methods: {
    activateModal(contact) {
      this.$store.commit('buffer/updateBuffer', contact)
      this.$store.commit('editMode')
      this.$store.commit('activateModal')
    },
  },
}
</script>

<style></style>
