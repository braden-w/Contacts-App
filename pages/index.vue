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
          <h1 v-else class="caption">{{ column.name }}</h1></v-col
        >
      </v-row>

      <h1 class="subtitle-1 grey--text">Dashboard</h1>
      <v-divider></v-divider>

      <v-container fluid>
        <v-card
          v-for="contact in contacts"
          :key="contact.fullName"
          class="pa-3"
        >
          <v-row :class="`contact ${contact.status}`">
            <v-col cols="12" md="6">
              <div class="caption grey--text">Project Title</div>
              <div>{{ contact.title }}</div>
            </v-col>
            <v-col cols="6" md="2">
              <div class="caption grey--text">Person</div>
              <div>{{ contact.person }}</div>
            </v-col>
            <v-col cols="6" md="2">
              <div class="caption grey--text">Due</div>
              <div>{{ contact.due }}</div>
            </v-col>
            <v-col cols="22" md="2">
              <div id="chips-container" class="right">
                <v-chip
                  small
                  my-auto
                  :class="`${contact.status} caption white--text `"
                >
                  {{ contact.status }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card></v-container
      >
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      layout: [
        { icon: 'mdi-account', columnsWide: 2 },
        { name: 'Email', columnsWide: 2 },
        { name: 'Phone', columnsWide: 2 },
        { name: 'Birthday', columnsWide: 2 },
        { name: 'Last Contact', columnsWide: 2 },
      ],
      contacts: [
        {
          image: '',
          fullName: 'Braden Wong',
          email: 'braden.wong@yale.edu',
          phone: '6266274599',
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
