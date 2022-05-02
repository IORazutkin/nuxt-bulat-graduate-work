<template>
  <popup title="Добавление предмета" @close="$emit('close')">
    <form @submit.prevent="addLesson">
      <div class="input-group" :class="{'error': $v.formData.title.$error}">
        <input
          v-model.trim="$v.formData.title.$model"
          class="field no-icon"
          placeholder="Название предмета"
          autofocus
          @input="$v.formData.title.$reset"
        >
      </div>
      <div class="input-group d-flex justify-content-start">
        <button type="submit" class="submit-btn">
          Добавить
        </button>
        <button type="button" class="cancel-btn ml-3" @click="$emit('close')">
          Отмена
        </button>
      </div>
    </form>
  </popup>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { required } from 'vuelidate/lib/validators'
import Popup from '~/components/Popup.vue'
import { Course } from '~/types/institute/course'
import { Lesson } from '~/types/lesson'

@Component({
  components: {
    Popup
  }
})
export default class extends Vue {
  @Prop() course!: Course

  formData: any = {
    title: '',
    course: this.course
  }

  addLesson () {
    this.$v.$touch()

    if (this.$v.$error) {
      return
    }

    this.$axios.$post('/api/lesson', this.formData).then((lesson: Lesson) => {
      this.$emit('add', lesson)
      this.$emit('close')
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

<style scoped>

</style>
