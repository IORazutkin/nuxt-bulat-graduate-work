<template>
  <popup title="Добавление группы" @close="$emit('close')">
    <form @submit.prevent="addGroup">
      <div class="input-group" :class="{'error': $v.formData.num.$error}">
        <input
          v-model.trim="$v.formData.num.$model"
          class="field no-icon"
          placeholder="Номер группы"
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
import { Course } from '~/types/institute/course'
import { Group } from '~/types/institute/group'

@Component({
  components: {
    Popup
  }
})
export default class extends Vue {
  @Prop() course!: Course

  formData: any = {
    num: '',
    course: this.course
  }

  addGroup () {
    this.$v.$touch()

    if (this.$v.$error) {
      return
    }

    this.$axios.$post('/api/group', this.formData).then((group: Group) => {
      this.$emit('add', group)
      this.$emit('close')
    })
  }

  validations () {
    return {
      formData: {
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
