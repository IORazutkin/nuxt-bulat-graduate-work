<template>
  <popup title="Добавление студента" @close="$emit('close')">
    <form @submit.prevent="addStudent">
      <div class="input-group" :class="{'error': $v.formData.fullName.$error}">
        <input
          v-model.trim="$v.formData.fullName.$model"
          class="field no-icon"
          placeholder="ФИО"
          autofocus
          @input="$v.formData.fullName.$reset"
        >
      </div>

      <div class="input-group" :class="{'error': $v.formData.course.$error}">
        <multiselect
          v-model="$v.formData.course.$model"
          class="field no-icon"
          placeholder="Направление"
          label="title"
          track-by="id"
          :options="courseList"
          style="padding: 0"
          @input="$v.formData.course.$reset"
          @select="loadGroupByCourse"
          @blur.stop=""
        />
      </div>

      <div class="input-group" :class="{'error': $v.formData.group.$error}">
        <multiselect
          v-model="$v.formData.group.$model"
          class="field no-icon"
          placeholder="Группа"
          label="num"
          track-by="id"
          :options="groupList"
          style="padding: 0"
          @input="$v.formData.group.$reset"
          @blur="() => {}"
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
import Multiselect from 'vue-multiselect'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { required } from 'vuelidate/lib/validators'
import Popup from '~/components/Popup.vue'
import { Institute } from '~/types/institute/institute'
import { User } from '~/types/user'
import { Course } from '~/types/institute/course'
import { Group } from '~/types/institute/group'

@Component({
  components: {
    Popup,
    Multiselect
  }
})
export default class extends Vue {
  @Prop() institute!: Institute

  formData: any = {
    fullName: '',
    username: '',
    password: '',
    course: null,
    group: null
  }

  courseList: Course[] = []
  groupList: Group[] = []
  isEmailExist: boolean = false

  async fetch () {
    await this.$axios.$get('/api/course/institute/' + this.institute.id).then((lessons) => {
      this.courseList.push(...(lessons || []))
    })
  }

  loadGroupByCourse (course: Course) {
    this.formData.group = null
    return this.$axios.$get('/api/group/course/' + course.id).then((groups) => {
      this.groupList.push(...(groups || []))
    })
  }

  addStudent () {
    this.isEmailExist = false
    this.$v.$touch()

    if (this.$v.$error) {
      return
    }

    this.$axios.$post('/api/student', this.formData).then((user: User) => {
      this.$emit('add', user)
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
        course: {},
        group: {
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

<style lang="scss">
.multiselect {
  display: block;
  position: relative;
  text-align: left;

  &__select {
    position: absolute;
    width: 40px; height: 100%;
    right: 0; top: 0;
    padding: 4px 8px;
    text-align: center;
    transition: transform .2s ease;

    &::before {
      position: relative;
      right: 0; top: 21px;
      color: #999;
      margin-top: 4px;
      border-style: solid;
      border-width: 5px 5px 0;
      border-color: #999 transparent transparent;
      content: "";
    }
  }

  &--active &__select {
    transform: rotate(180deg);
  }

  &__input {
    position: relative;
    display: inline-block;
    min-height: 20px;
    line-height: 20px;
    border: none;
    border-radius: 5px;
    background: #fff;
    width: 100%;
    transition: border .1s ease;
    box-sizing: border-box;
    margin-bottom: 8px;
    vertical-align: top;
    outline: none;
    font-size: 16px;
  }

  &__tag {
    position: relative;
    display: inline-block;
    padding: 4px 26px 4px 10px;
    border-radius: 5px;
    margin-right: 10px;
    color: #fff;
    line-height: 1;
    background: #005590;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;

    &-icon {
      cursor: pointer;
      margin-left: 7px;
      position: absolute;
      right: 0; top: -1px; bottom: 0;
      font-weight: 700;
      font-style: normal;
      width: 22px;
      text-align: center;
      line-height: 22px;
      transition: all .2s ease;
      border-radius: 5px;

      &::after {
        content: "\D7";
        color: white;
        font-size: 14px;
      }
    }
  }

  &__tags {
    height: 100%;
    display: block;
    padding: 10px 40px 0 16px;
    font-size: 14px;

    &-wrap {
      display: inline;
    }
  }

  &__content-wrapper {
    position: absolute;
    left: -1px; top: 44px;
    display: block;
    background: #fff;
    width: calc(100% + 2px);
    max-height: 240px;
    overflow: auto;
    border: 1px solid #A9A9A9;
    border-top: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 3;
  }

  &__single, &__placeholder {
    font-size: 16px;
  }

  &__placeholder {
    color: #757575;
  }

  &__content {
    list-style: none;
    display: inline-block;
    padding: 0;
    margin: 0;
    min-width: 100%;
    vertical-align: top;
  }

  &__element {
    display: block;
  }

  &__option {
    display: block;
    padding: 12px;
    min-height: 40px;
    line-height: 16px;
    text-decoration: none;
    text-transform: none;
    vertical-align: middle;
    position: relative;
    cursor: pointer;
    white-space: nowrap;

    &--highlight {
      background: #005590;
      outline: none;
      color: #fff;
    }

    &--selected {
      background: #f3f3f3;
      color: #35495e;
      font-weight: 700;
    }
  }
}

.multiselect__option--selected.multiselect__option--highlight {
  background: #ff6a6a;
  color: #fff;
}
</style>
