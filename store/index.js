import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  dialog: false,
})

  activateModal(state) {
    state.dialog = true
  },
  deactivateModal(state) {
    state.dialog = false
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
