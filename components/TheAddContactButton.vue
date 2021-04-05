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
              prepend-icon="mdi-email"
              required
            >
            </v-text-field>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Picker without buttons"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @input="menu2 = false"
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
