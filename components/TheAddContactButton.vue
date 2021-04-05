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
              v-model="form.email"
              :rules="form.emailRules"
              name="email"
              label="Username"
              prepend-icon="mdi-account-circle"
              required
            >
            </v-text-field
            ><v-text-field
              v-model="form.email"
              :rules="form.emailRules"
              name="email"
              label="Username"
              prepend-icon="mdi-account-circle"
              required
            >
            </v-text-field>
            <v-file-input
              :rules="rules"
              chips
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
            ></v-file-input>
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
      form: {
        picture: '',
        name: '',
        email: '',
        phone: '',
        birthday: '',
        lastContact: '',
      },
    }
  },
}
</script>
