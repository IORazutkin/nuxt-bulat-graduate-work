<template>
  <div class="page">
    <div class="container">
      <div class="page__wrapper">
        <bread-crumbs :list="breadcrumbList" class="page__block-full" />
        <div class="page__block">
          <task-search-block v-model="filter" />
          <div class="page__list">
            <template v-if="taskList.length">
              <task-item v-for="institute in taskList" :key="institute.id" :data="institute" @delete="deleteTask" />
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
import { Lesson } from '~/types/lesson'
import { Task } from '~/types/task'
import TaskSearchBlock from '~/components/index/TaskSearchBlock.vue'
import TaskItem from '~/components/index/TaskItem.vue'

@Component({
  components: { TaskItem, TaskSearchBlock, BreadCrumbs }
})
export default class extends Vue {
  lesson!: Lesson
  tasks!: Task[]
  filter: any = { search: '' }

  async asyncData (context: Context) {
    const lessonId = context.params.lesson
    const lesson = await context.$axios.$get('/api/lesson/' + lessonId)
    const tasks = await context.$axios.$get('/api/task/lesson/' + lessonId)

    return {
      lesson,
      tasks
    }
  }

  get taskList () {
    return this.tasks.filter((item: Task) => item.title.toLowerCase().includes(this.filter.search.toLowerCase()))
  }

  get breadcrumbList () {
    return [
      {
        title: 'Главная',
        url: '/main/teacher'
      },
      {
        title: this.lesson.title,
        url: '/main/teacher/' + this.lesson.id
      }
    ]
  }

  deleteTask (task: Task) {
    const index = this.tasks.indexOf(task)
    this.tasks.splice(index, 1)
  }
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #f0f0f0;

  &__wrapper {
    display: grid;

    @include bp-min($mq-mobile-medium) {
      grid-template-columns: 1fr;
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
