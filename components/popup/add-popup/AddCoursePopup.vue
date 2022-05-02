<template>
  <popup title="Добавление направления" @close="$emit('close')">
    <form @submit.prevent="addCourse">
      <div class="input-group" :class="{'error': $v.formData.title.$error}">
        <input
          v-model.trim="$v.formData.title.$model"
          class="field no-icon"
          placeholder="Название направления"
          autofocus
          @input="$v.formData.title.$reset"
        >
      </div>

      <div class="input-group" :class="{'error': $v.formData.num.$error}">
        <input
          v-model.trim="$v.formData.num.$model"
          class="field no-icon"
          placeholder="Код направления"
          autofocus
          @input="$v.formData.num.$reset"
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
import { Institute } from '~/types/institute/institute'
import { Course } from '~/types/institute/course'

@Component({
  components: {
    Popup
  }
})
export default class extends Vue {
  @Prop() institute!: Institute

  formData: any = {
    title: '',
    num: '',
    institute: this.institute
  }

  addCourse () {
    this.$v.$touch()

    if (this.$v.$error) {
      return
    }

    this.$axios.$post('/api/course', this.formData).then((response: Course) => {
      this.$emit('add', response)
      this.$emit('close')
    })
  }

  validations () {
    return {
      formData: {
        title: {
          required
        },
        num: {
          required
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
