<template>
  <div v-context="() => showMobilePopup = true" class="page__list__item" @click="openLink">
    <div class="title">
      {{ data.title }}
    </div>
    <div v-if="canEdit" class="actions">
      <button class="action-btn edit" @click.stop="showRenamePopup = true">
        Переименовать
      </button>
      <button class="action-btn edit" @click.stop="showUpdatePopup = true">
        Обновить
      </button>
      <button class="action-btn delete" @click.stop="showDeletePopup = true">
        Удалить
      </button>
      <button v-if="data.prevVersion" class="action-btn history" @click.stop="showHistoryPopup = true">
        &nbsp;
      </button>
    </div>
    <div v-if="canEdit" class="status" :class="verifyStatus.class">
      {{ verifyStatus.text }}
    </div>

    <delete-popup v-if="showDeletePopup" title="Удаление" @delete="deleteDocument" @close="showDeletePopup = false">
      Вы уверены, что хотите удалить "{{ data.title }}"?
    </delete-popup>

    <rename-document-popup v-if="showRenamePopup" :document="data" @close="showRenamePopup = false" />
    <update-document-popup v-if="showUpdatePopup" :document="data" @close="showUpdatePopup = false" />
    <document-history-popup v-if="showHistoryPopup" :document="data" @close="showHistoryPopup = false" />
    <context-popup v-if="showMobilePopup && canEdit" @close="showMobilePopup = false">
      <li @click="showRenamePopup = true">
        Переименовать
      </li>
      <li @click="showUpdatePopup = true">
        Обновить
      </li>
      <li @click="showHistoryPopup = true">
        История изменений
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
import UpdateInstitutePopup from '~/components/popup/update-popup/UpdateInstitutePopup.vue'
import { Document } from '~/types/document'
import RenameDocumentPopup from '~/components/popup/RenameDocumentPopup.vue'
import UpdateDocumentPopup from '~/components/popup/update-popup/UpdateDocumentPopup.vue'
import DocumentHistoryPopup from '~/components/popup/DocumentHistoryPopup.vue'
import ContextPopup from '~/components/ContextPopup.vue'

@Component({
  components: { ContextPopup, DocumentHistoryPopup, UpdateDocumentPopup, RenameDocumentPopup, UpdateInstitutePopup, DeletePopup }
})
export default class extends Vue {
  @Prop() data!: Document
  @Prop({
    type: Boolean,
    default: true
  }) canEdit!: boolean

  showDeletePopup: boolean = false
  showRenamePopup: boolean = false
  showUpdatePopup: boolean = false
  showHistoryPopup: boolean = false
  showMobilePopup: boolean = false

  get verifyStatus () {
    switch (this.data.verifiedStatus) {
      case true:
        return {
          class: 'verified',
          text: 'Подтвержден'
        }
      case false:
        return {
          class: 'not-verified',
          text: 'Отклонен'
        }
      default:
        return {
          class: 'pending',
          text: 'На проверке'
        }
    }
  }

  deleteDocument () {
    return this.$axios.$delete('/api/document/' + this.data.id).then(() => {
      this.$emit('delete', this.data)
    })
  }

  openLink () {
    window.open('http://localhost:8080/document/' + this.data.filePath, 'blank')
  }
}
</script>

<style lang="scss" scoped>
.page__list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 76px 15px 15px;
  cursor: pointer;
  background: transparent url(~@/assets/img/icons/link.svg) no-repeat right 30px center/20px;

  @include bp-max($mq-mobile-small-max) {
    background-position: right 15px center;
    padding-right: 48px;
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

  .status {
    text-transform: uppercase;
    font-weight: bold;

    &.pending {
      color: #A9A9A9;
    }

    &.verified {
      color: #005590;
    }

    &.not-verified {
      color: indianred;
    }
  }

  &:hover .actions {
    visibility: visible;
  }

  &:hover .status {
    @include bp-min($mq-mobile-medium) {
      display: none;
    }
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
    margin-left: 15px;
  }

  &.edit {
    background-color: #005590;
  }

  &.delete {
    background-color: indianred;
  }

  &.history {
    background: url(~@/assets/img/icons/history.svg) no-repeat center/14px;
  }
}
</style>
