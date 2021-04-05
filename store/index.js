import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  dialog: false,
})

export const mutations = {
  ...vuexfireMutations,
  activateModal(state) {
    state.dialog = true
  },
  deactivateModal(state) {
    state.dialog = false
  },
  addMode(state) {
    state.edit = false
  },
  editMode(state) {
    state.edit = true
  },
}

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
}
