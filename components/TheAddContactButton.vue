<template>
  <v-dialog
    v-model="dialogue"
    transition="dialog-bottom-transition"
    max-width="600"
  >
    <template #activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">Add Contact</v-btn>
    </template>
    <template #default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-card-title> <h1 class="display-1">Add Contact</h1></v-card-title>
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
            <v-file-input
              :rules="rules"
              chips
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Image"
            >
            </v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="submit">Close</v-btn>
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
      dialogue: false,
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
  },
  methods: {
    submit() {
      this.$store.dispatch('submitBuffer')
      this.dialogue = false
    },
  },
}
</script>
