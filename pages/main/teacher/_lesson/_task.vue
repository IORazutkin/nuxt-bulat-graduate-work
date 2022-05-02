<template>
  <div class="page">
    <div class="container">
      <div class="page__wrapper">
        <bread-crumbs :list="breadcrumbList" class="page__block-full" />
        <div class="page__block">
          <document-search-block v-model="filter" :task="task" />
          <div class="page__list">
            <template v-if="documentList.length">
              <document-item v-for="document in documentList" :key="document.id" :data="document" @delete="deleteDocument" />
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
import { Task } from '~/types/task'
import { Document } from '~/types/document'
import DocumentSearchBlock from '~/components/index/DocumentSearchBlock.vue'
import DocumentItem from '~/components/index/DocumentItem.vue'

@Component({
  components: { DocumentItem, DocumentSearchBlock, BreadCrumbs }
})
export default class extends Vue {
  task!: Task
  documents!: Document[]
  filter: any = { search: '' }

  async asyncData (context: Context) {
    const taskId = context.params.task
    const task: Task = await context.$axios.$get('/api/task/' + taskId)
    const documents = await context.$axios.$get('/api/document/task/' + taskId)

    return {
      task,
      documents
    }
  }

  get documentList () {
    return this.documents.filter((item: Document) => item.title.toLowerCase().includes(this.filter.search.toLowerCase()))
  }

  get breadcrumbList () {
    return [
      {
        title: 'Главная',
        url: '/main/teacher'
      },
      {
        title: this.task.lesson.title,
        url: '/main/teacher/' + this.task.lesson.id
      },
      {
        title: this.task.title,
        url: '/main/teacher/' + this.task.id
      }
    ]
  }

  mounted () {
    this.$eventBus.$on('AddDocumentEvent', (document: Document) => {
      this.documents.push(document)
    })
  }

  deleteDocument (document: Document) {
    const index = this.documents.indexOf(document)
    this.documents.splice(index, 1)
  }
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #f0f0f0;

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr;

    @include bp-min($mq-mobile-medium) {
      margin-top: 30px;
      grid-gap: 15px;
    }

    @include bp-max($mq-mobile-small-max) {
      margin: 0 -15px 0;
    }
  }

  &__block {
    background-color: white;
    box-shadow: 0 0 1px 0 black;
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
