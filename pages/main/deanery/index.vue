<template>
  <div class="page">
    <div class="container">
      <div class="page__wrapper">
        <document-stats-list :list="stats" class="page__block" />
        <document-list :list="documents" class="page__block" />
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
import { Document } from '~/types/document'
import DocumentList from '~/components/list/DocumentList.vue'
import DocumentStatsList from '~/components/list/DocumentStatsList.vue'
@Component({
  components: { DocumentStatsList, DocumentList, BreadCrumbs, StudentList, TeacherList, DeaneryList, CourseList }
})
export default class extends Vue {
  institute!: Institute
  courses!: Course[]
  deaneries!: User[]
  teachers!: User[]
  stats!: Record<string, number>
  students!: User[]
  documents!: Document[]

  async asyncData (context: Context) {
    const instituteId = context.store.getters['user/getUser'].institute?.id
    const institute = await context.$axios.$get('/api/institute/' + instituteId)
    const courses = await context.$axios.$get('/api/course/institute/' + instituteId)
    const deaneries = await context.$axios.$get('/api/deanery/institute/' + instituteId)
    const teachers = await context.$axios.$get('/api/teacher/institute/' + instituteId)
    const students = await context.$axios.$get('/api/student/institute/' + instituteId)
    const stats = await context.$axios.$get('/api/document/deanery/stats/' + instituteId)
    const documents = await context.$axios.$get('/api/document/deanery')

    return {
      institute,
      courses,
      deaneries,
      teachers,
      students,
      stats,
      documents
    }
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
}
</style>
