<template>
  <header class="header">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-auto header__logo">
          <nuxt-link :to="$store.getters['user/getUser'] ? '/main' : '/'">
            <img class="header__logo__img d-none d-md-block" src="~/assets/img/kfu/kpfu_logo.svg" alt="Логотип КФУ">
            <img class="header__logo__img d-md-none" src="~/assets/img/kfu/kpfu_logo_mobile.svg" alt="Логотип КФУ">
          </nuxt-link>
        </div>
        <div v-if="$route.path !== '/login' && $route.path !== '/registration'" class="col-auto">
          <template v-if="$store.getters['user/getUser']">
            <button class="header__profile icon-btn" title="Профиль" @click="$router.push('/profile')">
              &nbsp;
            </button>
            <button class="header__logout icon-btn" title="Выход" @click="logout">
              &nbsp;
            </button>
          </template>
          <button v-else class="header__login icon-btn" title="Вход" @click="$router.push('/login')">
            &nbsp;
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  logout () {
    this.$axios.$get('/logout').then(() => {
      this.$store.commit('user/setUser', null)
      this.$router.push('/login')
    })
  }
}
</script>

<style lang="scss" scoped>
$header-background-color: #005590;
$header-padding: 12px 0;
$header-padding-md: 16px 0;
$header-image-height: 36px;
$header-image-height-md: 52px;

.header {
  padding: $header-padding-md;
  background-color: $header-background-color;

  @include bp-max($mq-mobile-max) {
    padding: $header-padding;
  }

  &__logo {
    &__img {
      height: $header-image-height-md;

      @include bp-max($mq-mobile-max) {
        height: $header-image-height;
      }
    }
  }

  &__logout {
    background: transparent url(~@/assets/img/btns/logout.svg) no-repeat center/50%;
    border: none;
    width: $header-image-height-md;
    height: $header-image-height-md;
    padding: 0;

    @include bp-max($mq-mobile-max) {
      height: $header-image-height;
    }
  }

  &__login {
    background: transparent url(~@/assets/img/btns/login.svg) no-repeat center/70%;
    border: none;
    width: $header-image-height-md;
    height: $header-image-height-md;
    padding: 0;

    @include bp-max($mq-mobile-max) {
      height: $header-image-height;
    }
  }

  &__profile {
    background: transparent url(~@/assets/img/btns/profile.svg) no-repeat center/50%;
    border: none;
    width: $header-image-height-md;
    height: $header-image-height-md;
    padding: 0;

    @include bp-max($mq-mobile-max) {
      height: $header-image-height;
    }
  }

  &__statement {
    background: transparent url(~@/assets/img/btns/document.svg) no-repeat center/50%;
    border: none;
    width: $header-image-height-md;
    height: $header-image-height-md;
    padding: 0;

    @include bp-max($mq-mobile-max) {
      height: $header-image-height;
    }
  }
}
</style>
