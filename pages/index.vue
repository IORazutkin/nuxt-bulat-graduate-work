<template>
  <div class="page">
    <div class="container">
      <div class="page__wrapper">
        <div class="page__block">
          <document-search-block v-model="filter" :can-add="false" />
          <div class="page__list">
            <template v-if="documentList.length">
              <document-item v-for="document in documentList" :key="document.id" :can-edit="false" :data="document" />
            </template>
            <div v-else class="page__list__empty">
              Список пуст
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import BreadCrumbs from '~/components/BreadCrumbs.vue'
import { Document } from '~/types/document'
import DocumentSearchBlock from '~/components/index/DocumentSearchBlock.vue'
import DocumentItem from '~/components/index/DocumentItem.vue'

@Component({
  components: { DocumentItem, DocumentSearchBlock, BreadCrumbs }
})
export default class extends Vue {
  documents!: Document[]
  filter: any = { search: '' }

  async asyncData (context: Context) {
    const documents = await context.$axios.$get('/api/document/student')

    return {
      documents
    }
  }

  get documentList () {
    return this.documents.filter((item: Document) => item.title.toLowerCase().includes(this.filter.search.toLowerCase()))
  }
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #f0f0f0;

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 15px;

    @include bp-min($mq-mobile-medium) {
      margin-top: 32px;
    }
  }

  &__block {
    background-color: white;
    box-shadow: 0 0 1px 0 black;

    @include bp-max($mq-mobile-small-max) {
      margin: 0 -15px;
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
