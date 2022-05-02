<template>
  <div class="login">
    <div class="container">
      <form class="login__form" @submit.prevent="login">
        <div class="login__form__title">
          Авторизация
        </div>
        <div class="input-group" :class="{'error': $v.formData.username.$error}">
          <input
            v-model="$v.formData.username.$model"
            class="field no-icon"
            placeholder="Логин"
            autocomplete="username"
            @input="$v.formData.username.$reset"
          >
        </div>
        <div class="input-group" :class="{'error': $v.formData.password.$error}">
          <input
            v-model="$v.formData.password.$model"
            type="password"
            class="field no-icon"
            placeholder="Пароль"
            autocomplete="current-password"
            @input="$v.formData.password.$reset"
          >
        </div>
        <div class="login__form__actions">
          <button type="submit" class="submit-btn login__form__submit">
            Вход
          </button>
        </div>
        <div v-if="showAlert" class="alert">
          Неверный логин или пароль
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { required } from 'vuelidate/lib/validators'
import { User } from '~/types/user'

@Component
export default class extends Vue {
  showAlert: boolean = false
  formData: any = {
    username: '',
    password: ''
  }

  login () {
    this.$v.$touch()

    if (this.$v.$error) {
      return
    }

    const form = new FormData()
    form.append('username', this.formData.username)
    form.append('password', this.formData.password)

    this.$axios.$post('/login', form).then((response: User) => {
      this.$store.commit('user/setUser', response)
      this.$router.push('/main/')
    }).catch(() => {
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false
      }, 3000)
    })
  }

  validations () {
    return {
      formData: {
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
$form-title-color: #005590;

.login {
  min-height: 100%;

  @include bp-min($mq-mobile-medium) {
    display: flex;
    align-items: center;
    background-color: #f0f0f0;
  }

  &__form {
    max-width: 600px;
    background-color: white;
    position: relative;

    @include bp-min($mq-mobile-medium) {
      box-shadow: 0 0 1px 0 black;
      margin: 0 auto;
      padding: 32px;
    }

    @include bp-max($mq-mobile-small-max) {
      margin: 0 -15px;
      padding: 15px;
    }

    &__title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 16px;
      color: $form-title-color;
    }

    &__actions {
      margin-top: 16px;
      display: flex;

      .cancel-btn {
        margin-left: 16px;
      }
    }

    &__submit {
      @include bp-min($mq-tablet-min) {
        width: 240px;
      }

      @include bp-max($mq-mobile-max) {
        width: 100%;
      }
    }
  }
}

.alert {
  color: white;
  background: indianred url(~/assets/img/icons/error.svg) no-repeat left 16px center/32px;
  position: absolute;
  left: 0; bottom: 0;
  width: 100%;
  transform: translateY(100%);
  box-shadow: 0 0 0 1px indianred;
  padding: 16px 16px 16px 64px;
  font-weight: bold;
}
</style>
