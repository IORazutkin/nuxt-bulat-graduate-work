<template>
  <div class="page">
    <div class="container">
      <div class="page__wrapper">
        <bread-crumbs :list="breadcrumbList" class="page__block-full" />
        <course-list :list="courses" :institute="institute" class="page__block" />
        <deanery-list :list="deaneries" :institute="institute" class="page__block" />
        <teacher-list :list="teachers" :institute="institute" class="page__block" />
        <student-list :list="students" :institute="institute" class="page__block" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { Course } from '~/types/institute/course'
import { User } from '~/types/user'
import CourseList from '~/components/list/CourseList.vue'
import { Institute } from '~/types/institute/institute'
import DeaneryList from '~/components/list/DeaneryList.vue'
import TeacherList from '~/components/list/TeacherList.vue'
import StudentList from '~/components/list/StudentList.vue'
import BreadCrumbs from '~/components/BreadCrumbs.vue'
@Component({
  components: { BreadCrumbs, StudentList, TeacherList, DeaneryList, CourseList }
})
export default class extends Vue {
  institute!: Institute
  courses!: Course[]
  deaneries!: User[]
  teachers!: User[]
  students!: User[]

  async asyncData (context: Context) {
    const instituteId = context.params.institute
    const institute = await context.$axios.$get('/api/institute/' + instituteId)
    const courses = await context.$axios.$get('/api/course/institute/' + instituteId)
    const deaneries = await context.$axios.$get('/api/deanery/institute/' + instituteId)
    const teachers = await context.$axios.$get('/api/teacher/institute/' + instituteId)
    const students = await context.$axios.$get('/api/student/institute/' + instituteId)

    return {
      institute,
      courses,
      deaneries,
      teachers,
      students
    }
  }

  get breadcrumbList () {
    return [
      {
        title: 'Главная',
        url: '/main/admin'
      },
      {
        title: this.institute.title,
        url: '/main/admin/' + this.institute.id
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
