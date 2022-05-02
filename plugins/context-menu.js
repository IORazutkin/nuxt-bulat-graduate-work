import Vue from 'vue'

Vue.directive('context', function (el, binding) {
  let delayTimer = null
  el.addEventListener('touchstart', () => {
    delayTimer = setTimeout(() => {
      binding.value()
    }, 500)
  })

  el.addEventListener('touchend', () => {
    clearTimeout(delayTimer)
  })
})
