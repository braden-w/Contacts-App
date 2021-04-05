<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="600"
  >
    <template #activator="{ on, attrs }">
      <v-btn v-if="mini" block class="ma-n7">
        <v-icon @click="activateModal">mdi-account</v-icon></v-btn
      >
      <v-btn
        v-else
        color="primary"
        v-bind="attrs"
        v-on="on"
        @click="activateModal"
        >Add/Edit Contact</v-btn
      >
    </template>
    <template #default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-card-title>
            <h1 class="display-1">
              {{ edit ? 'View a Contact' : 'Create a New Contact' }}
            </h1></v-card-title
          >
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="name"
              label="Contact Name"
              prepend-icon="mdi-account-circle"
              required
            >
            </v-text-field>
            <v-text-field
              v-model="email"
              label="Email"
              prepend-icon="mdi-email"
              required
            >
            </v-text-field>
            <v-text-field
              v-model="phone"
              label="Phone Number"
              prepend-icon="mdi-phone"
              required
            >
            </v-text-field>
            <v-menu
              v-model="datePickerBirthday"
              :close-on-content-click="true"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="birthday"
                  label="Birthday"
                  prepend-icon="mdi-cake"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="birthday"
                @input="datePickerBirthday = false"
              ></v-date-picker>
            </v-menu>
            <v-menu
              v-model="datePickerLastContact"
              :close-on-content-click="true"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="lastContact"
                  label="Last Contact"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="lastContact"
                @input="datePickerLastContact = false"
              ></v-date-picker>
            </v-menu>
            <v-file-input prepend-icon="mdi-camera" label="Image">
            </v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" @click="submitAndDeactivateModal"
            >{{ edit ? 'Update Contact' : 'Save Contact' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  data() {
    return {
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          'Avatar size should be less than 2 MB!',
      ],
      datePickerBirthday: false,
      datePickerLastContact: false,
    }
  },
  computed: {
    ...mapFields([
      'picture',
      'name',
      'email',
      'phone',
      'birthday',
      'lastContact',
    ]),
    dialog: {
      get() {
        return this.$store.state.dialog
      },
      set(value) {
        this.$store.commit(value ? 'activateModal' : 'deactivateModal')
        this.$store.commit('buffer/clearBuffer')
      },
    },
    ...mapState(['edit']),
  },
  methods: {
    submitAndDeactivateModal() {
      this.$store.dispatch('buffer/submitBuffer')
      this.$store.commit('deactivateModal')
    },
    activateModal() {
      this.$store.commit('activateModal')
      this.$store.commit('addMode')
    },
  },
}
</script>
