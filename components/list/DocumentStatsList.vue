<template>
  <div class="block">
    <div class="block__title">
      Статистика
    </div>
    <div class="block__search-bar">
      <input v-model="filter" placeholder="Поиск..." class="block__search">
    </div>
    <div class="block__list">
      <template v-if="filteredEntry.length > 0">
        <div
          v-for="[key, value] of filteredEntry"
          :key="key"
          class="block__list__item item"
        >
          {{ key }}
          <div class="item-value">
            {{ value }}
          </div>
        </div>
      </template>
      <div v-else class="block__list__empty">
        Список пуст
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import DeletePopup from '~/components/popup/DeletePopup.vue'
import AddDocumentPopup from '~/components/popup/add-popup/AddDocumentPopup.vue'
import UpdateFullDocumentPopup from '~/components/popup/update-popup/UpdateFullDocumentPopup.vue'
import ContextPopup from '~/components/ContextPopup.vue'

@Component({
  components: { ContextPopup, UpdateFullDocumentPopup, AddDocumentPopup, DeletePopup }
})
export default class extends Vue {
  @Prop() list!: Record<string, number>

  filter: string = ''

  get filteredEntry () {
    return Object.entries(this.list).filter(([key]) => {
      return key.toLowerCase().includes(this.filter.toLowerCase())
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

  &-value {
    margin-left: auto;
    font-weight: bold;
    color: #005590;
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

    &.agree {
      background-image: url(~@/assets/img/icons/agree.svg);
    }

    &.disagree {
      background-image: url(~@/assets/img/icons/disagree.svg);
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
