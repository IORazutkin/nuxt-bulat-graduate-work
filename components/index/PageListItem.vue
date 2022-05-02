<template>
  <div v-context="() => showMobilePopup = true" class="page__list__item" @click="$router.push({ path: data.id.toString(), append: true })">
    <div class="title">
      {{ data.title }}
    </div>
    <div class="actions">
      <button class="action-btn edit" @click.stop="showUpdatePopup = true">
        Редактировать
      </button>
      <button class="action-btn delete" @click.stop="showDeletePopup = true">
        Удалить
      </button>
    </div>

    <delete-popup v-if="showDeletePopup" title="Удаление" @delete="deleteInstitute" @close="showDeletePopup = false">
      Вы уверены, что хотите удалить "{{ data.title }}"?
    </delete-popup>

    <update-institute-popup v-if="showUpdatePopup" :institute="data" @close="showUpdatePopup = false" />
    <context-popup v-if="showMobilePopup" @close="showMobilePopup = false">
      <li @click="showUpdatePopup = true">
        Редактировать
      </li>
      <li class="delete" @click="showDeletePopup = true">
        Удалить
      </li>
    </context-popup>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import DeletePopup from '~/components/popup/DeletePopup.vue'
import { Institute } from '~/types/institute/institute'
import UpdateInstitutePopup from '~/components/popup/update-popup/UpdateInstitutePopup.vue'
import ContextPopup from '~/components/ContextPopup.vue'

@Component({
  components: { ContextPopup, UpdateInstitutePopup, DeletePopup }
})
export default class extends Vue {
  @Prop() data!: Institute

  showDeletePopup: boolean = false
  showUpdatePopup: boolean = false
  showMobilePopup: boolean = false

  deleteInstitute () {
    return this.$axios.$delete('/api/institute/' + this.data.id).then(() => {
      this.$eventBus.$emit('DeleteInstituteEvent', this.data)
    })
  }
}
</script>

<style lang="scss" scoped>
.page__list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 56px 16px 16px;
  cursor: pointer;
  background: transparent url(~@/assets/img/icons/right-arrow.svg) no-repeat right 32px center/12px;

  @include bp-max($mq-mobile-small-max) {
    background-position: right 15px center;
  }

  .title {
    font-weight: bold;
  }

  .actions {
    display: flex;
    visibility: hidden;

    @include bp-max($mq-mobile-small-max) {
      display: none;
    }
  }

  &:hover .actions {
    visibility: visible;
  }

  .group + .group {
    margin-top: 8px;
  }

  & + & {
    border-top: 1px solid #f0f0f0;
  }

  &:hover {
    background-color: #fcfcfc;
  }
}

.action-btn {
  display: block;
  border: 1px solid black;
  color: white;
  padding: 3px 12px;
  border-radius: 4px;

  &:hover {
    opacity: .9;
  }

  & + & {
    margin-left: 16px;
  }

  &.edit {
    background-color: #005590;
  }

  &.delete {
    background-color: indianred;
  }
}
</style>
