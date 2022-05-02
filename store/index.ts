import { User } from '~/types/user'

export const actions = {
  nuxtServerInit ({ commit }: any, context: any) {
    return context.$axios.$get('/api/user').then((response: User) => {
      commit('user/setUser', response)
    }).catch(() => {})
  }
}
