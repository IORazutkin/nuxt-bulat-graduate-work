<template>
  <popup title="Изменить пароль" @close="$emit('close')">
    <form @submit.prevent="changePassword">
      <div class="input-group" :class="{'error': $v.formData.oldPassword.$error}">
        <input
          v-model="$v.formData.oldPassword.$model"
          class="field no-icon"
          type="password"
          placeholder="Старый пароль"
          @input="$v.formData.oldPassword.$reset"
        >
      </div>
      <div class="input-group" :class="{'error': $v.formData.newPassword.$error}">
        <input
          v-model="$v.formData.newPassword.$model"
          class="field no-icon"
          type="password"
          placeholder="Новый пароль"
          @input="resetPassword"
        >
      </div>
      <div class="input-group" :class="{'error': $v.formData.confirmNewPassword.$error}">
        <input
          v-model="$v.formData.confirmNewPassword.$model"
          class="field no-icon"
          type="password"
          placeholder="Повторите новый пароль"
          @input="resetPassword"
        >
      </div>
      <div class="input-group d-flex">
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
import { Component, Vue } from 'nuxt-property-decorator'
import { required } from 'vuelidate/lib/validators'
import Popup from '~/components/Popup.vue'

@Component({
  components: { Popup }
})
export default class extends Vue {
  isPasswordValid: boolean = true
  isNewPasswordValid: boolean = true
  formData: any = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }

  resetPassword () {
    (this.$v.formData as any).newPassword.$reset();
    (this.$v.formData as any).confirmNewPassword.$reset()
  }

  changePassword () {
    this.$v.$touch()
    this.isPasswordValid = true
    this.isNewPasswordValid = true

    if (this.$v.$error) {
      return
    }

    this.$axios.$patch('/api/user/password', this.formData).then(() => {
      this.$emit('close')
    }).catch((err: any) => {
      if (err.response.status === 409) {
        this.isPasswordValid = false
      } else {
        this.isNewPasswordValid = false
      }
    })
  }

  validations () {
    return {
      formData: {
        oldPassword: {
          required,
          isValid: () => {
            return this.isPasswordValid
          }
        },
        newPassword: {
          required,
          isValid: (val: string) => {
            return val === this.formData.confirmNewPassword && this.isNewPasswordValid
          }
        },
        confirmNewPassword: {
          required,
          isValid: (val: string) => {
            return val === this.formData.newPassword
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
