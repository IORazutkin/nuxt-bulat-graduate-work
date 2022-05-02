<template>
  <popup title="Добавление работника" @close="$emit('close')">
    <form @submit.prevent="addCourse">
      <div class="input-group" :class="{'error': $v.formData.fullName.$error}">
        <input
          v-model.trim="$v.formData.fullName.$model"
          class="field no-icon"
          placeholder="ФИО"
          autofocus
          @input="$v.formData.fullName.$reset"
        >
      </div>

      <div class="input-group" :class="{'error': $v.formData.username.$error}">
        <input
          v-model.trim="$v.formData.username.$model"
          class="field no-icon"
          placeholder="Логин"
          @input="$v.formData.username.$reset"
        >
      </div>

      <div class="input-group" :class="{'error': $v.formData.password.$error}">
        <input
          v-model.trim="$v.formData.password.$model"
          class="field no-icon"
          placeholder="Пароль"
          type="password"
          autocomplete="new-password"
          @input="$v.formData.password.$reset"
        >
      </div>
      <div v-if="isEmailExist" class="input-group alert">
        Пользователь с данным логином уже существует
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
    fullName: '',
    username: '',
    password: '',
    institute: this.institute
  }

  isEmailExist: boolean = false

  addCourse () {
    this.isEmailExist = false
    this.$v.$touch()

    if (this.$v.$error) {
      return
    }

    this.$axios.$post('/api/deanery', this.formData).then((response: Course) => {
      this.$emit('add', response)
      this.$emit('close')
    }).catch((err) => {
      if (err.response.status === 422) {
        this.isEmailExist = true
      } else {
        return Promise.reject(err)
      }
    })
  }

  validations () {
    return {
      formData: {
        fullName: {
          required
        },
        username: {
          required
        },
        password: {
          required
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.alert {
  color: white;
  background: indianred url(~/assets/img/icons/error.svg) no-repeat left 11px center/28px;
  width: 100%;
  border: 1px solid #983636;
  padding: 11px 11px 11px 52px;
  border-radius: 4px;
}
</style>
