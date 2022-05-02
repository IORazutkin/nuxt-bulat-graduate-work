<template>
  <div class="breadcrumbs">
    <template v-for="(item, index) of list">
      <span v-if="index !== 0" :key="'span-' + item.title" class="breadcrumbs__divider">
        /
      </span>
      <nuxt-link :key="'link-' + item.title" :to="item.url" :class="{'disabled': index === list.length - 1}" class="breadcrumbs__link">
        {{ item.title }}
      </nuxt-link>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { BreadcrumbItem } from '~/types/breadcrumb-item'

@Component
export default class extends Vue {
  @Prop() list!: BreadcrumbItem[]
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
  background: white;
  box-shadow: 0 0 1px 0 black;
  padding: 8px 16px;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: auto;

  &__divider {
    color: #cccccc;
  }

  &__link {
    color: #005590;

    &.disabled {
      pointer-events: none;
      color: black;
    }
  }
}
</style>
