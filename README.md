# Contacts-App

A simple CRUD app displaying a user's contacts.

- [Contacts-App](#contacts-app)
  - [Overview](#overview)
    - [Dashboard](#dashboard)
    - [Create Contact](#create-contact)
    - [View/Edit Contact](#viewedit-contact)
    - [Light Mode](#light-mode)
    - [Minified Mode](#minified-mode)
    - [Login](#login)
  - [Data Storage](#data-storage)
    - [FireStore](#firestore)
      - [Contacts](#contacts)
    - [Buffer](#buffer)
  - [Other technologies](#other-technologies)
    - [Vuex](#vuex)
    - [Vuexfire](#vuexfire)
    - [mapFields](#mapfields)
  - [Setup](#setup)
    - [To Develop](#to-develop)
    - [To Serve Static Site](#to-serve-static-site)
  - [Todos](#todos)

## Overview

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

You can toggle minified mode using the bar button on the top right:
<img src="assets/readme/dark%20minified%20bar.png">

<img src="assets/readme/minified%20bar.png">

### Login

If not logged in, the user is prompted to do so:
<img src="assets/readme/login.png">

## Data Storage

Storage of contact data is handled through [FireStore](###FireStore) and [contact objects](####Contacts), whereas editing is handled through the [buffer](###Buffer).

### FireStore

The storage for the entire application is the following:

```
users
- user1
  - contacts
    - ...
  - displayName
  - email
  - emailVerified
  - photoURL
  - userID
- ...
```

#### Contacts

**Contacts** are stored as an array of **Contact** objects, and each object has the following structure:

```typescript
export interface Contact {
  birthday: string
  email: string
  lastContact: string
  name: string
  phone: string
  picture: string
}
```

### Buffer

The **buffer** is a locally-stored Contact that contains the information of the currently edited contact. When a new Contact is being created, the buffer is blank. A user edits the buffer through the Add/Edit Contact modal, and upon submit, the buffer is sent to the FireStore.

## Other technologies

### Vuex

Vuex stores relevant data from FireStore and globally accessible UI properties for this project, with the following namespaced modules:

1. Index: This stores general states that the user is in

   - Dialog: Toggles whether to open and overlay the contact modal
   - Editing mode: Toggles whether the contact modal's UI should display text for editing or creating a new contact
   - Contacts: The contacts of the users, stored as an array of contact objects
   - VuexFire bindings: VuexFire mutations create a one-way binding from a user's contacts on Firestore with the contacts in this Vuex store. More elaborated [in the Vuexfire section](###Vuexfire)

2. Auth: This stores a user's login status and credentials

   - signedIn: The user is signed in, used to change elements of UI
   - signingIn: Whether the user is signed in
   - userCredentials: Stores user email, name, profile picture, user ID pulled from Firebase Auth

3. Buffer: This stores information of the currently edited contact, which is displayed when the modal is opened. Before the modal opens, it is autopopulated when a contact is clicked, and cleared when the "Add Contact" is clicked.

### Vuexfire

Vuexfire is used to set a real-time one way binding from a user's contacts on Firestore to their contacts in Vuex. Therefore, Firestore is the source of truth over Vuex for **user contacts.**

When adding and editing contacts, the changes are written to Firestore directly, which are then automatically pulled and updated into the Vuex store, which subsequently updates the application.

### mapFields

You may encounter the mapFields plugin, which is used to simplify a two-way data-binding with a form. This is used to synchronize the modal values with the values stored in the **buffer** module of the Vuex store

## Setup

1. Clone this repo to your local machine
2. Add a .env file to the root with the following variables

```dotenv
FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID
FIREBASE_MEASUREMENT_ID
```

### To Develop

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev
```

### To Serve Static Site

```bash

# generate static project, for hosting on CDN/serverless platforms like Netlify
$ npm run generate

# serve using statically generated project
$ npm run start
```

## Todos

- [ ] Unique Contact ID's
  - Currently, contact names are used as the document names in Firestore.
  - Because of this, changing a contact's name creates a new contact rather than editing that contact directly
  - [ ] Creating a unique id per each contact would help avoid overwriting contacts when there is name collision.
- [ ] Logout button/Proper Logout handling
  - Currently, logging in with other accounts temporarily displays residual information from the last account, because there is no proper logout handling
  - [ ] Create a button tha triggers the logout function in Firebase auth. You can respond to the logout detected state in auth.js. **Make sure to clear the Vuex store**.
- [ ] Persistent login
  - The login state of Vuex does not last after a refresh or close/open.
  - [ ] Make the Vuex persist, perhaps through writing to cookies or storing a JWT token
- [ ] Profile Upload (with Firebase storage)
  - [ ] Hook up Firebase storage so profile pictures are uploaded, then store the url with the rest of the buffer into the contact
- [ ] Duplicate names
  - Currently, contact names are used as the document names in Firestore.
  - [ ] Creating a unique id per each contact would help avoid overwriting contacts when there is name collision.
- [ ] Change data types
  - Dates and phone numbers are currently stored as strings; changing these to the appropriate types could be useful.
