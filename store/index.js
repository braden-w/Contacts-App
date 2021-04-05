import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  picture: '',
  name: '',
  email: '',
  phone: '',
  birthday: '',
  lastContact: '',
  emailRules: '',
  phoneRules: '',
})

export const getters = { getField }
export const mutations = { ...vuexfireMutations, updateField }

export const actions = {
  bindUserDataBetweenFirestoreAndVuex: firestoreAction(async function (
    { bindFirestoreRef },
    userID
  ) {
    const ref = this.$fire.firestore
      .collection('users')
      .doc(userID)
      .collection('contacts')
    return await bindFirestoreRef('contacts', ref, { wait: true })
  }),
  unbindUserDataBetweenFirestoreAndVuex: firestoreAction(function ({
    unbindFirestoreRef,
  }) {
    unbindFirestoreRef('userdata', false)
  }),
  async submitBuffer({ commit }) {
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
}
