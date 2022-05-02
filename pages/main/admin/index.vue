<template>
  <div class="page">
    <div class="container">
      <div class="page__wrapper">
        <search-block v-model="filter" />
        <div class="page__list">
          <template v-if="instituteList.length">
            <page-list-item v-for="institute in instituteList" :key="institute.id" :data="institute" />
          </template>
          <div v-else class="page__list__empty">
            Список пуст
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SearchBlock from '~/components/index/SearchBlock.vue'
import PageListItem from '~/components/index/PageListItem.vue'
import { Institute } from '~/types/institute/institute'

@Component({
  components: { PageListItem, SearchBlock }
})
export default class extends Vue {
  filter: any = { search: '' }
  institutes!: Institute[]

  asyncData (context: any) {
    return context.$axios.$get('/api/institute').then((response: any) => ({
      institutes: response
    }))
  }

  get instituteList () {
    return this.institutes.filter((item: Institute) => item.title.toLowerCase().includes(this.filter.search.toLowerCase()))
  }

  mounted () {
    this.$eventBus.$on('AddInstituteEvent', (institute: Institute) => {
      this.institutes.push(institute)
    })

    this.$eventBus.$on('DeleteInstituteEvent', (institute: Institute) => {
      const index = this.institutes.indexOf(institute)
      this.institutes.splice(index, 1)
    })
  }
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #f0f0f0;

  &__wrapper {
    background-color: white;
    box-shadow: 0 0 1px 0 black;

    @include bp-max($mq-mobile-small-max) {
      margin: 0 -15px;
    }

    @include bp-min($mq-mobile-medium) {
      margin-top: 32px;
    }
  }

  &__list {
    &__empty {
      padding: 15px 0;
      text-align: center;
      color: #A9A9A9;
    }
  }
}
</style>
