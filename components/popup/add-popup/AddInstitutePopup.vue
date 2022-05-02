<template>
  <popup title="Добавление института" @close="$emit('close')">
    <form @submit.prevent="addInstitute">
      <div class="input-group" :class="{'error': $v.formData.title.$error}">
        <input
          v-model.trim="$v.formData.title.$model"
          class="field no-icon"
          placeholder="Название института"
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
import { Component, Vue } from 'nuxt-property-decorator'
import { required } from 'vuelidate/lib/validators'
import Popup from '~/components/Popup.vue'
import { Institute } from '~/types/institute/institute'

@Component({
  components: {
    Popup
  }
})
export default class extends Vue {
  formData: any = {
    title: ''
  }

  addInstitute () {
    this.$v.$touch()

    if (this.$v.$error) {
      return
    }

    this.$axios.$post('/api/institute', this.formData).then((response: Institute) => {
      this.$eventBus.$emit('AddInstituteEvent', response)
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
