<template>
  <div class="page">
    <div class="container">
      <div class="page__wrapper">
        <task-search-block v-model="filter" :can-add="false" />
        <div class="page__list">
          <template v-if="taskList.length">
            <task-item v-for="task in taskList" :key="task.id" :can-edit="false" :data="task" />
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
import { Context } from '@nuxt/types'
import SearchBlock from '~/components/index/SearchBlock.vue'
import PageListItem from '~/components/index/PageListItem.vue'
import { Institute } from '~/types/institute/institute'
import LessonItem from '~/components/index/LessonItem.vue'
import { Task } from '~/types/task'
import TaskSearchBlock from '~/components/index/TaskSearchBlock.vue'
import TaskItem from '~/components/index/TaskItem.vue'

@Component({
  components: { TaskItem, TaskSearchBlock, LessonItem, PageListItem, SearchBlock }
})
export default class extends Vue {
  filter: any = { search: '' }
  tasks!: Task[]

  async asyncData (context: Context) {
    const tasks = await context.$axios.$get('/api/task/student/' + context.store.getters['user/getUser'].id)

    return {
      tasks
    }
  }

  get taskList () {
    return this.tasks.filter((item: Institute) => item.title.toLowerCase().includes(this.filter.search.toLowerCase()))
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
