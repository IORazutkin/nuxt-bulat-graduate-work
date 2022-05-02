<template>
  <popup title="Изменение группы" @close="$emit('close')">
    <form @submit.prevent="updateGroup">
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
import { Group } from '~/types/institute/group'

@Component({
  components: {
    Popup
  }
})
export default class extends Vue {
  @Prop() group!: Group

  formData: any = {
    num: this.group.num,
    course: this.group.course
  }

  updateGroup () {
    this.$v.$touch()

    if (this.$v.$error) {
      return
    }

    this.$axios.$patch('/api/group/' + this.group.id, this.formData).then((group: Group) => {
      Object.assign(this.group, group)
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
