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
