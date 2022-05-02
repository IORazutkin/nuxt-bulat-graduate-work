<template>
  <div class="page">
    <div class="container">
      <div class="page__wrapper">
        <bread-crumbs :list="breadcrumbList" class="page__block-full" />
        <group-list :list="groups" :course="course" class="page__block" />
        <lesson-list :list="lessons" :course="course" class="page__block" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { Course } from '~/types/institute/course'
import { Group } from '~/types/institute/group'
import { Lesson } from '~/types/lesson'
import BreadCrumbs from '~/components/BreadCrumbs.vue'
import GroupList from '~/components/list/GroupList.vue'
import LessonList from '~/components/list/LessonList.vue'
@Component({
  components: { LessonList, GroupList, BreadCrumbs }
})
export default class extends Vue {
  course!: Course
  groups!: Group[]
  lessons!: Lesson[]

  async asyncData (context: Context) {
    const courseId = context.params.course
    const course = await context.$axios.$get('/api/course/' + courseId)
    const groups = await context.$axios.$get('/api/group/course/' + courseId)
    const lessons = await context.$axios.$get('/api/lesson/course/' + courseId)

    return {
      course,
      groups,
      lessons
    }
  }

  get breadcrumbList () {
    return [
      {
        title: 'Главная',
        url: '/main/deanery'
      },
      {
        title: this.course.title,
        url: '/main/admin/' + this.course.id
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #f0f0f0;

  &__wrapper {
    display: grid;
    grid-gap: 15px;

    @include bp-min($mq-mobile-medium) {
      grid-template-columns: 1fr 1fr;
      margin-top: 30px;
    }

    @include bp-max($mq-mobile-small-max) {
      margin: 0 -15px 0;
    }
  }

  &__block {
    height: 350px;

    @include bp-max($mq-mobile-small-max) {
      height: 300px;
    }
  }

  &__block-full {
    @include bp-min($mq-mobile-medium) {
      grid-column: 1/3;
    }
  }
}
</style>
