export const state = () => ({
  signedIn: false,
  signingIn: false,
  userCredentials: {},
})

export const mutations = {
  setUser(state, payload) {
    state.userCredentials = payload
  },
  setSignedIn(state, bool) {
    state.signedIn = bool
  },
  setSigningIn(state, bool) {
    state.signingIn = bool
  },
}

export const actions = {
  async onAuthStateChangedAction({ commit, dispatch }, { authUser }) {
    if (!authUser) {
      // Perform logout operations
    } else {
      // Perform login operations
      console.log(authUser)
      const {
        uid: userID,
        email,
        emailVerified,
        photoURL,
        displayName,
      } = authUser
      const emailDomain = email.split('@')[1]
      const request = await axios.get(
        `http://universities.hipolabs.com/search?domain=${emailDomain}`
      )
      const university = request.data[0]
      const payload = {
        userID,
        email,
        emailVerified,
        photoURL,
        displayName,
        university: university.name,
      }
      try {
        commit('setUser', payload)
        dispatch('bindUserDataBetweenFirestoreAndVuex', userID, { root: true })
        await this.$fire.firestore
          .collection('users')
          .doc(userID)
          .set(payload, { merge: true })
      } catch (err) {
        alert(err)
      }
    }
  },
  async signInWithGoogle({ commit }) {
    commit('setSigningIn', true)
    try {
      // Use fireAuthObj to refer to service instance itself rather than auth service https://github.com/nuxt-community/firebase-module/issues/192
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      // Add additional permission, per https://developers.google.com/identity/protocols/oauth2/scopess
      provider.addScope('profile') // View basic user profile info
      provider.addScope('email') // View email address
      await this.$fire.auth.signInWithPopup(provider)
      commit('setSignedIn', true)
    } catch (err) {
      alert(err)
    } finally {
      commit('setSigningIn', false)
    }
  },
  async signOut({ commit }) {
    try {
      commit('setUser', await this.$fire.auth.signOut())
      commit('setSignedIn', false)
    } catch (err) {
      alert(err)
    }
  },
}
