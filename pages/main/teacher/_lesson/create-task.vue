<template>
  <div class="page">
    <div class="container">
      <div class="page__wrapper">
        <bread-crumbs :list="breadcrumbList" class="page__block-full" />
        <form class="page__block page__form" @submit.prevent="createTask">
          <div class="input-group" :class="{'error': $v.formData.title.$error}">
            <input
              v-model.trim="$v.formData.title.$model"
              type="tel"
              class="field no-icon"
              placeholder="Название"
              @input="$v.formData.title.$reset"
            >
          </div>
          <div class="input-group f-group mt-4">
            <div class="f-group__title">
              Список студентов
            </div>
            <div class="f-group__content">
              <collapse-checkbox v-for="(value, key) in studentList" :key="key" :result="formData.students" :list="value" :title="key" />
            </div>
          </div>
          <div class="input-group">
            <button class="submit-btn">
              Добавить
            </button>
            <button class="cancel-btn mt-3 mt-sm-0 ml-sm-3" type="button" @click="$router.push('/main/teacher/' + lesson.id)">
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { required } from 'vuelidate/lib/validators'
import BreadCrumbs from '~/components/BreadCrumbs.vue'
import { Lesson } from '~/types/lesson'
import CollapseCheckbox from '~/components/CollapseCheckbox.vue'
import { User } from '~/types/user'

@Component({
  components: { CollapseCheckbox, BreadCrumbs }
})
export default class extends Vue {
  lesson!: Lesson
  studentList!: Record<string, User[]>
  formData: any = {
    title: '',
    students: [],
    lesson: this.lesson
  }

  async asyncData (context: Context) {
    const lessonId = context.params.lesson
    const lesson: Lesson = await context.$axios.$get('/api/lesson/' + lessonId)
    const studentList = await context.$axios.$get('/api/student/course/' + lesson.course.id)

    return {
      lesson,
      studentList
    }
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
      },
      {
        title: 'Создать задание',
        url: '/main/teacher/' + this.lesson.id + '/create-task'
      }
    ]
  }

  createTask () {
    this.$axios.$post('/api/task', this.formData).then(() => {
      this.$router.push('/main/teacher/' + this.lesson.id)
    })
  }

  validations () {
    return {
      formData: {
        title: {
          required
        }
      }
    }
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
    padding: 15px;
  }
}

.f-group {
  border-top: 1px solid #A9A9A9;
  border-bottom: 1px solid #A9A9A9;
  margin-left: -15px;
  margin-right: -15px;
  width: calc(100% + 30px);
  position: relative;

  &__title {
    background-color: white;
    padding: 2px 6px;
    font-size: 14px;
    color: #666;
    position: absolute;
    left: 15px; top: -14px;
    border: 1px solid #A9A9A9;
    border-radius: 4px;
  }

  &__content {
    padding: 24px 0 8px;
    background-color: #f0f0f0;
    max-height: 350px;
    overflow: auto;
  }
}
</style>
