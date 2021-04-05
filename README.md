# Contacts-App

## Description

### Dashboard

The default dashboard for the app looks like the following:
<img src="assets/readme/dashboard.png">

### Create Contact

To create a contact, click the create contact button:
<img src="assets/readme/create%20contact.png">

### View/Edit Contact

To view or edit a contact, click the row corresponding to that contact:
<img src="assets/readme/view%20contact.png">

### Light Mode

You can toggle light mode using the lightbulb button on the top right:
<img src="assets/readme/light%20mode.png">

### Minified Mode

You can toggle minified mode using the lightbulb button on the top right:
<img src="assets/readme/dark%20minified%20bar.png">

<img src="assets/readme/minified%20bar.png">

### Login

<img src="assets/readme/login.png">

## Features

### Vuex

Vuex is the source of truth for this project, with the following namespaced modules:

1. Index: This stores general states that the user is in

   - Dialog: It toggles whether to overlay the contact modal or not
   - Editing mode: It toggles whether the contact modal's UI should display text for editing or creating a new contact
   - Contacts: The contacts of the users, stored as an array of contact objects
   - VuexFire bindings: VuexFire mutations create a one-way binding from a user's contacts on Firestore with the contacts in the Vuex store. More elaborated [in the Vuexfire section](###Vuexfire)

2. Auth: This stores user a user's login status and credentials pulled from Firebase Auth

3. Buffer: This stores information of the currently edited contact, which is displayed when the modal is opened. It is autopopulated when a contact is clicked, and cleared when the "Add Contact" is clicked.
- Persistent login
- Upload (with Firebase storage)

## Setup

Clone this repo to your local machine

### To Develop

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev
```

### To Serve

```bash

# generate static project, for hosting on CDN/serverless platforms like Netlify
$ npm run generate

# serve using statically generated project
$ npm run start
```
