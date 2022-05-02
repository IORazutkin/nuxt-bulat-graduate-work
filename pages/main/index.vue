<template>
  <div />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  middleware ({ store, redirect }) {
    if (!store.getters['user/getUser']) {
      return redirect('/')
    }

    if (store.getters['user/getUser'].role.id === 1) {
      return redirect('/main/student')
    } else if (store.getters['user/getUser'].role.id === 2) {
      return redirect('/main/teacher')
    } else if (store.getters['user/getUser'].role.id === 3) {
      return redirect('/main/deanery')
    } else if (store.getters['user/getUser'].role.id === 4) {
      return redirect('/main/admin')
    }

    return redirect('/')
  }
})
export default class extends Vue {}
</script>

<style scoped>

</style>
