<template>
  <div class="collapse" :class="{'open': isOpened}">
    <div class="collapse__trigger" @click="switchCollapse">
      <div class="collapse__trigger__title">
        <span
          class="collapse__checkbox"
          :class="{'indeterminate': checkStatus === null, 'checked': checkStatus}"
          @click.stop="checkStatus = !checkStatus"
        />
        {{ title }}
      </div>
      <div class="collapse__trigger__arrow" />
    </div>
    <div v-show="isOpened" class="collapse__content">
      <template v-if="list && list.length">
        <div v-for="user of list" :key="user.id" class="collapse__list-item" @click.stop="toggleCheck(user)">
          <span
            class="collapse__checkbox"
            :class="{'checked': isChecked(user)}"
          />
          {{ user.fullName }}
        </div>
      </template>
      <div v-else class="collapse__content__empty">
        Пусто
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { User } from '~/types/user'

@Component
export default class extends Vue {
  @Prop() title!: string
  @Prop() list!: User[]
  @Prop() result!: User[]

  isOpened: boolean = false
  _checkStatus: boolean | null = false

  switchCollapse () {
    this.isOpened = !this.isOpened

    if (this.isOpened) {
      this.$emit('open')
    }
  }

  get resultList () {
    return this.result.filter(item => this.list.find(student => student.id === item.id))
  }

  get checkStatus () {
    if (this.resultList.length === 0) {
      return (this._checkStatus = false)
    } else if (this.resultList.length === this.list.length) {
      return (this._checkStatus = true)
    }

    return (this._checkStatus = null)
  }

  set checkStatus (val: boolean | null) {
    this._checkStatus = val

    if (val === null) {
      return
    }

    this.resultList.forEach((item) => {
      const index = this.result.indexOf(item)
      this.result.splice(index, 1)
    })

    if (val) {
      this.result.push(...this.list)
    }
  }

  isChecked (user: User) {
    const index = this.result.findIndex(item => item.id === user.id)
    return index >= 0
  }

  toggleCheck (user: User) {
    if (this.isChecked(user)) {
      const index = this.result.findIndex(item => item.id === user.id)
      this.result.splice(index, 1)
    } else {
      this.result.push(user)
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse {
  overflow: hidden;

  & + & {
    border-top: 1px solid #dcdcdc;
  }

  &__trigger {
    cursor: pointer;
    font-weight: bold;
    padding: 6px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    box-shadow: 0 0 5px 0 #A9A9A9;
    user-select: none;

    &__arrow {
      transition: transform .1s linear;
      width: 16px; height: 16px;
      margin-right: 4px;
      background: url(~@/assets/img/icons/right-chevron.svg) no-repeat center/16px;
      transform: rotate(90deg);
    }

    &__title {
      display: flex;
      align-items: center;
    }
  }

  &__checkbox {
    width: 16px; height: 16px;
    border-radius: 4px;
    border: 1px solid #A9A9A9;
    margin-right: 6px;

    &.indeterminate {
      background-color: #005590;
      border-color: #005590;
      display: flex;
      align-items: center;
      justify-content: center;

      &::before {
        content: '';
        display: block;
        width: 8px; height: 8px;
        background-color: white;
        border-radius: 1px;
      }
    }

    &.checked {
      background-color: #005590;
      border-color: #005590;
      background-image: url(~@/assets/img/icons/check.svg);
      background-repeat: no-repeat;
      background-size: 12px;
      background-position: center;
    }
  }

  &.open > &__trigger > &__trigger__arrow {
    transform: rotate(-90deg);
  }

  &__content {
    background: #f0f0f0;
    border-top: 1px solid #dcdcdc;

    &__empty {
      text-align: center;
      opacity: .5;
      padding: 15px;
    }
  }

  & .collapse {
    .collapse__trigger {
      background-color: #f0f0f0;
    }
  }

  &__list-item {
    padding: 6px 16px;
    background-color: white;
    display: flex;
    align-items: center;
    cursor: pointer;

    & + & {
      border-top: 1px solid #dcdcdc;
    }
  }
}
</style>
