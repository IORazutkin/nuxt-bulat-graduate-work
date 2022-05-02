<template>
  <div class="block">
    <div class="block__title">
      Группы
    </div>
    <div class="block__search-bar">
      <input v-model="filter" placeholder="Поиск..." class="block__search">
      <button class="block__add" @click="showAddPopup = true">
        &nbsp;
      </button>
    </div>
    <div class="block__list">
      <template v-if="filteredList.length > 0">
        <div
          v-for="item of filteredList"
          :key="item.id"
          v-context="() => mobileActive = item"
          class="block__list__item item"
        >
          {{ item.num }}
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

    <delete-popup v-if="deletePopup.show" title="Удаление группы" @delete="deleteGroup" @close="deletePopup.show = false">
      Вы уверены, что хотите удалить "{{ deletePopup.active.num }}"
    </delete-popup>
    <update-group-popup v-if="updatePopup.show" :group="updatePopup.active" @close="updatePopup.show = false" />
    <add-group-popup v-if="showAddPopup" :course="course" @add="addGroup" @close="showAddPopup = false" />
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
import { Course } from '~/types/institute/course'
import DeletePopup from '~/components/popup/DeletePopup.vue'
import { Group } from '~/types/institute/group'
import AddGroupPopup from '~/components/popup/add-popup/AddGroupPopup.vue'
import UpdateGroupPopup from '~/components/popup/update-popup/UpdateGroupPopup.vue'
import ContextPopup from '~/components/ContextPopup.vue'

@Component({
  components: { ContextPopup, UpdateGroupPopup, AddGroupPopup, DeletePopup }
})
export default class extends Vue {
  @Prop() list!: Group[]
  @Prop() course!: Course

  filter: string = ''
  showAddPopup: boolean = false
  deletePopup: any = {
    active: null,
    show: false
  }

  updatePopup: any = {
    active: null,
    show: false
  }

  mobileActive: any = null

  get filteredList () {
    return this.list.filter(item => item.num.toLowerCase().includes(this.filter.toLowerCase()))
  }

  addGroup (group: Group) {
    this.list.push(group)
  }

  deleteGroup () {
    this.$axios.$delete('/api/group/' + this.deletePopup.active.id).then(() => {
      const index = this.list.indexOf(this.deletePopup.active)
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
  padding: 10px 16px 0;

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
