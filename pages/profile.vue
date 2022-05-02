<template>
  <div class="page">
    <div class="container">
      <back-button v-if="$route.query.id" />
      <div class="page__wrapper">
        <div class="page__profile">
          <div class="page__profile__avatar">
            <div class="image-container">
              <img :src="user.avatarPath ? 'http://localhost:8080/avatar/' + user.avatarPath : ''" height="200">
            </div>
            <div v-if="canEdit" class="actions">
              <div class="field file submit-btn">
                <label class="file__field">
                  <input type="file" accept="image/png, image/jpeg" @change="avatarUpdate">
                </label>
                <span class="file__select">Загрузить</span>
              </div>
              <button class="cancel-btn" @click="deleteAvatar">
                Удалить
              </button>
            </div>
          </div>
          <div class="page__profile__info">
            <div class="group">
              <div class="group__key">
                ФИО:
              </div>
              <div class="group__value">
                {{ user.fullName || '-' }}
              </div>
            </div>
            <div class="group">
              <div class="group__key">
                Дата рождения:
              </div>
              <div class="group__value">
                {{ $options.filters.formatDate(user.birthDate) || '-' }}
              </div>
            </div>
            <div class="group">
              <div class="group__key">
                Логин:
              </div>
              <div class="group__value">
                {{ user.username }}
              </div>
            </div>
            <div v-if="canEdit" class="group">
              <a class="btn-link" @click="showEditProfile = true">Редактировать данные</a>
              <a class="btn-link" @click="showEditPassword = true">Изменить пароль</a>
            </div>
          </div>
        </div>
        <div v-if="user.group" class="page__education">
          <div class="page__contact__title">
            Образование
          </div>
          <div class="group">
            <div class="group__key">
              Институт:
            </div>
            <div class="group__value">
              {{ user.group.course.institute.title || '-' }}
            </div>
          </div>
          <div class="group">
            <div class="group__key">
              Направление:
            </div>
            <div class="group__value">
              {{ user.group.course.title || '-' }}
            </div>
          </div>
          <div class="group">
            <div class="group__key">
              Группа:
            </div>
            <div class="group__value">
              {{ user.group.num || '-' }}
            </div>
          </div>
        </div>
        <div v-if="user.lessons" class="page__work">
          <div class="page__contact__title">
            Работа
          </div>
          <div v-for="lesson of user.lessons" :key="lesson.id" class="work-group">
            <div class="group">
              <div class="group__key">
                Институт:
              </div>
              <div class="group__value">
                {{ lesson.course.institute.title || '-' }}
              </div>
            </div>
            <div class="group">
              <div class="group__key">
                Направление:
              </div>
              <div class="group__value">
                {{ lesson.course.title || '-' }}
              </div>
            </div>
            <div class="group">
              <div class="group__key">
                Предмет:
              </div>
              <div class="group__value">
                {{ lesson.title || '-' }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="user.institute && !user.lessons" class="page__work">
          <div class="page__contact__title">
            Работа
          </div>
          <div class="group">
            <div class="group__key">
              Институт:
            </div>
            <div class="group__value">
              {{ user.institute.title || '-' }}
            </div>
          </div>
          <div class="group">
            <div class="group__key">
              Должность:
            </div>
            <div class="group__value">
              Сотрудник деканата
            </div>
          </div>
        </div>
      </div>
    </div>
    <edit-profile-popup v-if="showEditProfile" :user="user" @close="showEditProfile = false" />
    <change-password-popup v-if="showEditPassword" @close="showEditPassword = false" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { User } from '~/types/user'
import BackButton from '~/components/BackButton.vue'
import EditProfilePopup from '~/components/popup/EditProfilePopup.vue'
import ChangePasswordPopup from '~/components/popup/ChangePasswordPopup.vue'

@Component({
  components: { ChangePasswordPopup, EditProfilePopup, BackButton }
})
export default class extends Vue {
  otherUser!: User
  showEditProfile: boolean = false
  showEditPassword: boolean = false

  async asyncData (context: any) {
    if (context.query.id) {
      const otherUser = await context.$axios.$get('/api/user/' + context.query.id).then((response: User) => response)

      return {
        otherUser
      }
    }
  }

  get canEdit () {
    return !this.$route.query.id
  }

  get user (): User {
    return this.otherUser || this.$store.getters['user/getUser']
  }

  avatarUpdate (e: any) {
    const files = e.target.files || e.dataTransfer.files
    if (files) {
      const formData = new FormData()
      formData.append('file', files[0], files[0]?.name)

      this.$axios.$post('/api/user/avatar', formData).then((user: User) => {
        this.$store.commit('user/setUser', user)
      })
    }
  }

  deleteAvatar () {
    this.$axios.$delete('/api/user/avatar').then(() => {
      delete this.user.avatarPath
      this.$store.commit('user/setUser', this.user)
    })
  }
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #f0f0f0;

  &__wrapper {
    display: grid;
    grid-gap: 15px;

    @include bp-min($mq-tablet-small) {
      grid-template-columns: 1fr 1fr;
      margin-top: 30px;
    }

    @include bp-max($mq-tablet-small-max) {
      grid-template-columns: 1fr;
      margin: 0 -15px;
    }
  }

  &__contact, &__documents, &__education, &__work {
    background-color: white;
    box-shadow: 0 0 1px 0 black;
    padding: 15px;

    &__title {
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 15px;
    }

    .group__key {
      max-width: 80px;
    }
  }

  &__education {
    .group__key {
      max-width: 100px;
    }
  }

  &__documents {
    .group__key {
      max-width: 110px;
    }
  }

  &__profile {
    background-color: white;
    box-shadow: 0 0 1px 0 black;
    display: flex;

    @include bp-min($mq-tablet-small) {
      grid-column: 1/3;
      padding: 30px;
    }

    @include bp-max($mq-tablet-small-max) {
      flex-direction: column;
      padding: 15px;
    }

    &__avatar {
      display: flex;
      flex-direction: column;
      align-items: center;

      @include bp-max($mq-tablet-small-max) {
        padding-bottom: 15px;
        margin-bottom: 15px;
        border-bottom: 1px solid rgba(0, 0, 0, .5);
      }

      .image-container {
        border: 1px solid #A9A9A9;
        background-color: #f0f0f0;
        border-radius: 50%;
        width: 200px; height: 200px;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 70%;
        background-image: url(~@/assets/img/btns/profile.svg);
        text-align: center;

        img {
          &[src=""] {
            display: none;
          }
        }
      }

      .actions {
        display: flex;
        margin-top: 15px;

        @include bp-min(375px) {
          .cancel-btn {
            margin-left: 15px;
          }
        }

        @include bp-max(374px) {
          flex-direction: column;
          width: 100%;

          .submit-btn .file__select {
            margin: 0 auto;
          }

          .cancel-btn {
            width: 100%;
            margin-top: 8px;
          }
        }
      }
    }

    &__info {
      @include bp-min($mq-tablet-small) {
        margin-left: 30px;
      }
    }
  }

  &__work {
    .group__key {
      max-width: 100px;
    }
  }
}

.template-btn {
  line-height: 48px;
  margin-top: 30px;
  display: block;
}

.work-group {
  & + & {
    border-top: 1px solid rgba(0, 0, 0, .5);
    margin-top: 15px;
    padding-top: 15px;
  }
}

.btn-link {
  & + & {
    @include bp-min($mq-mobile-medium + 1) {
      margin-left: 24px;
    }

    @include bp-max($mq-mobile-medium) {
      margin-top: 12px;
    }
  }
}
</style>
