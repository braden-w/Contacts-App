import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  picture: '',
  name: '',
  email: '',
  phone: '',
  birthday: '',
  lastContact: '',
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
  async submitBuffer({ state, rootState }) {
    try {
      await this.$fire.firestore
        .collection('users')
        .doc(rootState.auth.userCredentials.userID)
        .collection('contacts')
        .doc(state.name)
        .set(state, { merge: true })
    } catch (err) {
      alert(err)
    }
  },
}
