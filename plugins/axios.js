/**
 * @param {*} root0 - root
 * @param {*} root0.$axios - axios
 * @param {*} root0.redirect - redirect function
 */
export default function ({ $axios, route, redirect }) {
  $axios.onError((error) => {
    if (route.path !== '/' && error.response.status === 401) {
      redirect('/login')
    }
  })
}
