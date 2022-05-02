import { User } from '~/types/user'

export const state = (): { user: null | User } => ({
  user: null
})

export const getters = {
  getUser: (state: any) => state.user,
  isAdmin: (state: any) => state.user?.role.id === 1
}

export const mutations = {
  setUser (state: any, user: User | null) {
    if (user === null) {
      state.user = null
    } else {
      state.user = Object.assign({}, state.user, user)
    }
  }
}

export default {
  namespace: true,
  state,
  getters,
  mutations
}
