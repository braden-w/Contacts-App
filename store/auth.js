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
}
