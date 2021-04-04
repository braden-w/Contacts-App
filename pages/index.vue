<template>
  <div class="dashboard">
    <v-container class="my-5">
      <h1 class="subtitle-1 grey--text">Dashboard</h1>
      <v-divider></v-divider>
      <v-row class="ma-3 mb-1">
        <v-tooltip v-for="sort in sorts" :key="sort.query" top>
          <template #activator="{ on: onButton }">
            <v-btn
              small
              color="light-grey"
              v-on="onButton"
              @click="sortBy(sort.query)"
              ><v-icon left>{{ sort.icon }}</v-icon>
              <span class="caption text-lowercase">By {{ sort.title }}</span>
            </v-btn>
          </template>

          <span>Sort projects by {{ sort.title }}</span>
        </v-tooltip>
      </v-row>
      <v-container fluid
        ><v-card v-for="project in projects" :key="project.title" class="pa-3">
          <v-row :class="`project ${project.status}`">
            <v-col cols="12" md="6">
              <div class="caption grey--text">Project Title</div>
              <div>{{ project.title }}</div>
            </v-col>
            <v-col cols="6" md="2">
              <div class="caption grey--text">Person</div>
              <div>{{ project.person }}</div>
            </v-col>
            <v-col cols="6" md="2">
              <div class="caption grey--text">Due</div>
              <div>{{ project.due }}</div>
            </v-col>
            <v-col cols="22" md="2">
              <div id="chips-container" class="right">
                <v-chip
                  small
                  my-auto
                  :class="`${project.status} caption white--text `"
                >
                  {{ project.status }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card></v-container
      >
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        {
          title: 'Design a new website',
          person: 'Braden Wong',
          due: '1st Jan 2019',
          status: 'ongoing',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!',
        },
        {
          title: 'Code up the homepage',
          person: 'Jason',
          due: '10th Jan 2019',
          status: 'complete',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!',
        },
        {
          title: 'Design video thumbnails',
          person: 'Ruobin',
          due: '20th Dec 2018',
          status: 'complete',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!',
        },
        {
          title: 'Create a community forum',
          person: 'Sam',
          due: '20th Oct 2018',
          status: 'overdue',
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!',
        },
      ],
      sorts: [
        { icon: 'mdi-folder', title: 'project name', query: 'title' },
        { icon: 'mdi-account', title: 'person', query: 'person' },
        { icon: 'mdi-folder', title: 'project status', query: 'status' },
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
<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}
#chips-container .complete {
  background: #3cd1c2;
}
#chips-container .ongoing {
  background: #ffaa2c;
}
#chips-container .overdue {
  background: #f83e70;
}
</style>
