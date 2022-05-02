<template>
  <popup title="Редактирование данных" @close="$emit('close')">
    <form @submit.prevent="editUser">
      <div class="input-group" :class="{'error': $v.formData.fullName.$error}">
        <input
          v-model.trim="$v.formData.fullName.$model"
          class="field no-icon"
          placeholder="ФИО"
          @input="$v.formData.fullName.$reset"
        >
      </div>
      <div class="input-group" :class="{'error': $v.formData.birthDate.$error}">
        <date-field
          v-model="$v.formData.birthDate.$model"
          placeholder="Дата рождения"
          @input="$v.formData.birthDate.$reset"
        />
      </div>
      <div class="input-group" :class="{'error': $v.formData.username.$error}">
        <input
          v-model.trim="$v.formData.username.$model"
          class="field no-icon"
          placeholder="Логин"
          @input="$v.formData.username.$reset"
        >
      </div>
      <div v-if="isEmailExist" class="input-group alert">
        Пользователь с данным логином уже существует
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
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import DateField from '../DateField.vue'
import Popup from '~/components/Popup.vue'
import { User } from '~/types/user'

@Component({
  components: { DateField, Popup }
})
export default class extends Vue {
  @Prop() user!: User

  isEmailExist: boolean = false
  formData: any = {
    fullName: this.user.fullName,
    birthDate: this.user.birthDate,
    username: this.user.username
  }

  editUser () {
    this.$v.$touch()
    this.isEmailExist = false

    if (this.$v.$error) {
      return
    }

    this.$axios.$patch('/api/user', this.formData).then((user: User) => {
      this.$store.commit('user/setUser', user)
      this.$emit('close')
    }).catch((err: any) => {
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
          required,
          isValid (val: string) {
            if (!val) {
              return false
            }

            return val.split(' ').length >= 2
          }
        },
        birthDate: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(10),
          isValid (val: string) {
            return /^\d\d\d\d-\d\d-\d\d$/.test(val)
          },
          isTrueDate: (date: string) => {
            if (!date) {
              return false
            }

            const d = new Date(date)
            return +date.substr(8, 2) === d.getDate()
          }
        },
        username: {
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
