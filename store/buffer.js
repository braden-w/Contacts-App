export const state = () => ({
  picture: '',
  name: '',
  email: '',
  phone: '',
  birthday: '',
  lastContact: '',
})

export const actions = {
  async submitBuffer({ state, commit, rootState }) {
    if (!state.name) return
    try {
      await this.$fire.firestore
        .collection('users')
        .doc(rootState.auth.userCredentials.userID)
        .collection('contacts')
        .doc(state.name)
        .set(
          {
            picture: state.picture,
            name: state.name,
            email: state.email,
            phone: state.phone,
            birthday: state.birthday,
            lastContact: state.lastContact,
          },
          { merge: true }
        )
      commit('clearBuffer')
    } catch (err) {
      alert(err)
    }
  },
}
