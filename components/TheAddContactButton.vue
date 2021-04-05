<template>
  <v-dialog transition="dialog-bottom-transition" max-width="600">
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
              v-model="form.name"
              label="Contact Name"
              prepend-icon="mdi-account-circle"
              required
            >
            </v-text-field>
            <v-text-field
              v-model="form.email"
              :rules="form.emailRules"
              label="Email"
              prepend-icon="mdi-email"
              required
            >
            </v-text-field>
            <v-text-field
              v-model="form.phone"
              :rules="form.phoneRules"
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
                  v-model="form.birthday"
                  label="Birthday"
                  prepend-icon="mdi-cake"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.birthday"
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
                  v-model="form.birthday"
                  label="Last Contact"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.lastContact"
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
          <v-btn text @click="dialog.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
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
      form: {
        picture: '',
        name: '',
        email: '',
        phone: '',
        birthday: '',
        lastContact: '',
        emailRules: '',
        phoneRules: '',
      },
    }
  },
}
</script>
