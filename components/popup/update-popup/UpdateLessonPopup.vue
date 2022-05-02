<template>
  <popup title="Изменение предмета" @close="$emit('close')">
    <form @submit.prevent="updateLesson">
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
          Сохранить
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
import { Lesson } from '~/types/lesson'

@Component({
  components: {
    Popup
  }
})
export default class extends Vue {
  @Prop() lesson!: Lesson

  formData: any = {
    title: this.lesson.title,
    course: this.lesson.course
  }

  updateLesson () {
    this.$v.$touch()

    if (this.$v.$error) {
      return
    }

    this.$axios.$patch('/api/lesson/' + this.lesson.id, this.formData).then((lesson: Lesson) => {
      Object.assign(this.lesson, lesson)
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
