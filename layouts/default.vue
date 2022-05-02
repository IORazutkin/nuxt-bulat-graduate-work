<template>
  <div class="layout">
    <layout-header />
    <main class="layout__main">
      <Nuxt class="layout__main__content" />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LayoutHeader from '~/components/layout/Header.vue'

@Component({
  components: {
    LayoutHeader
  }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__main {
    flex-grow: 1;
    display: flex;
    padding-bottom: 15px;

    &__content {
      flex-grow: 1;
    }
  }
}
</style>
