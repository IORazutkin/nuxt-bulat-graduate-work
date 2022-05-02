import Vue from 'vue'

Vue.filter('formatDate', function (value, time = false) {
  if (value) {
    const date = new Date(value.replace(/-/g, '/'))
    let day = date.getDate()
    let month = (date.getMonth() + 1)
    if (day < 10) {
      day = '0' + day
    }
    if (month < 10) {
      month = '0' + month
    }

    return day + '.' + month + '.' + date.getFullYear() + (time ? ' ' + value.split(' ')[1].substr(0, 5) : '')
  }
})
