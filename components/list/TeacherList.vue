<template>
  <div class="block">
    <div class="block__title">
      Преподаватели
    </div>
    <div class="block__search-bar">
      <input v-model="filter" placeholder="Поиск..." class="block__search">
      <button class="block__add" @click="showAddPopup = true">
        &nbsp;
      </button>
    </div>
    <div class="block__list">
      <template v-if="filteredList.length > 0">
        <div v-for="item of filteredList" :key="item.id" v-context="() => mobileActive = item" class="block__list__item item">
          {{ item.fullName }}
          <div class="item__actions">
            <button class="item__btn edit" @click.stop="updatePopup.show = true; updatePopup.active = item">
              &nbsp;
            </button>
            <button class="item__btn delete" @click.stop="deletePopup.show = true; deletePopup.active = item">
              &nbsp;
            </button>
          </div>
        </div>
      </template>
      <div v-else class="block__list__empty">
        Список пуст
      </div>
    </div>

    <delete-popup v-if="deletePopup.show" title="Удаление учителя" @delete="deleteTeacher" @close="deletePopup.show = false">
      Вы уверены, что хотите удалить "{{ deletePopup.active.fullName }}"
    </delete-popup>
    <update-teacher-popup v-if="updatePopup.show" :user="updatePopup.active" @close="updatePopup.show = false" />
    <add-teacher-popup v-if="showAddPopup" :institute="institute" @add="addTeacher" @close="showAddPopup = false" />
    <context-popup v-if="mobileActive" @close="mobileActive = null">
      <li @click="updatePopup.show = true; updatePopup.active = mobileActive">
        Редактировать
      </li>
      <li class="delete" @click="deletePopup.show = true; deletePopup.active = mobileActive">
        Удалить
      </li>
    </context-popup>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { User } from '~/types/user'
import { Institute } from '~/types/institute/institute'
import DeletePopup from '~/components/popup/DeletePopup.vue'
import AddTeacherPopup from '~/components/popup/add-popup/AddTeacherPopup.vue'
import UpdateTeacherPopup from '~/components/popup/update-popup/UpdateTeacherPopup.vue'
import ContextPopup from '~/components/ContextPopup.vue'

interface UserPopup {
  show: boolean
  active: User | null
}

@Component({
  components: { ContextPopup, UpdateTeacherPopup, AddTeacherPopup, DeletePopup }
})
export default class extends Vue {
  @Prop() list!: User[]
  @Prop() institute!: Institute

  filter: string = ''
  showAddPopup: boolean = false
  deletePopup: UserPopup = {
    active: null,
    show: false
  }

  updatePopup: UserPopup = {
    active: null,
    show: false
  }

  mobileActive: any = null

  get filteredList () {
    return this.list.filter(item => item.fullName?.toLowerCase().includes(this.filter.toLowerCase()))
  }

  addTeacher (deanery: User) {
    this.list.push(deanery)
  }

  deleteTeacher () {
    this.$axios.$delete('/api/user/' + this.deletePopup.active?.id).then(() => {
      const index = this.list.indexOf(this.deletePopup.active as User)
      this.list.splice(index, 1)
    })
  }
}
</script>

<style lang="scss" scoped>
.block {
  background-color: white;
  box-shadow: 0 0 1px 0 black;
  display: flex;
  flex-direction: column;
  padding: 10px 15px 0;

  &__title {
    font-size: 20px;
    font-weight: bold;
    color: #005590;
    margin-bottom: 10px;
    flex: 0 0;
  }

  &__search-bar {
    margin: 0 -15px;
    border-bottom: 1px solid #cccccc;
    border-top: 1px solid #cccccc;
    background-color: #f0f0f0;
    display: flex;
    flex: 0 0;
  }

  &__search {
    background-color: transparent;
    border: none;
    flex-grow: 1;
    outline: none;
    padding: 8px 15px;
  }

  &__add {
    border: none;
    border-left: 1px solid #cccccc;
    background: #f9f9f9 url(~@/assets/img/icons/add.svg) no-repeat center/24px;
    width: 40px;
  }

  &__list {
    flex: 1 1;
    margin: 0 -15px;
    background-color: #f9f9f9;

    &__item {
      padding: 6px 15px;
      cursor: pointer;
      background: white;

      &:hover {
        background-color: #f9f9f9;
      }

      & + & {
        border-top: 1px solid #f0f0f0;
      }
    }

    &__empty {
      padding: 6px 15px;
      text-align: center;
      color: #999;
      height: 100%;
    }
  }
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__actions {
    display: flex;
    visibility: hidden;

    @include bp-max($mq-mobile-small-max) {
      display: none;
    }
  }

  &:hover &__actions {
    visibility: visible;
  }

  &__btn {
    display: block;
    background-color: transparent;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 14px;
    width: 22px; height: 22px;
    border: 1px solid transparent;
    border-radius: 2px;

    &:hover {
      background-color: #fff;
      border: 1px solid #ccc;
    }

    & + & {
      margin-left: 8px;
    }

    &.edit {
      background-image: url(~@/assets/img/icons/edit.svg);
    }

    &.delete {
      background-image: url(~@/assets/img/icons/delete.svg);
    }
  }
}
</style>
