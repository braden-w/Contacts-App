<template>
  <v-app class="dashboard">
    <v-container class="my-5">
      <v-row>
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

      <v-card v-for="contact in contacts" :key="contact.name" class="pa-3">
        <v-row>
          <v-col
            v-for="column in layout"
            :key="column"
            :cols="column.columnsWide"
          >
            <v-icon v-if="column.icon">{{ contact[column.id] }}</v-icon>
            <h1 v-else class="caption">{{ contact[column.id] }}</h1>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
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
      contacts: [
        {
          picture: '',
          name: 'Braden Wong',
          email: 'braden.wong@yale.edu',
          phone: '6266274599',
          birthday: 'July 12',
          lastContact: 'August 8',
        },
      ],
      sorts: [
        { icon: 'mdi-folder', title: 'contact name', query: 'title' },
        { icon: 'mdi-account', title: 'person', query: 'person' },
        { icon: 'mdi-folder', title: 'contact status', query: 'status' },
      ],
    }
  },
  created() {
    this.$fire.firestore.collection('projects').onSnapshot((res) => {
      const changes = res.docChanges()
      changes.forEach((change) => {
        if (change.type === 'added') {
          this.projects.push({ ...change.doc.data(), id: change.doc.id })
        }
      })
    })
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1))
    },
  },
}
</script>

<style></style>
