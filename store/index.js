import { vuexfireMutations, firestoreAction } from 'vuexfire'
export const state = () => ({})

export const mutations = { ...vuexfireMutations }

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
