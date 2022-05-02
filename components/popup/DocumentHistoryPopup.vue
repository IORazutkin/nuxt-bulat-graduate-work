<template>
  <popup title="История обновлений" @close="$emit('close')">
    <div class="input-group">
      <div class="history-list">
        <div class="history-list__item history-item history-item--title">
          {{ document.title }}
        </div>
        <div
          v-for="(document, index) of historyList"
          :key="document.id"
          class="history-list__item history-item"
          :class="{'old': index !== 0}"
          @click="openLink(document)"
        >
          <div class="history-item__active" :class="{'active': index === 0}" />
          {{ document.createdAt | formatDate }}
          <div class="history-item__status" :title="document.verifiedBy && document.verifiedBy.fullName" :class="verifyStatus(document).class">
            {{ verifyStatus(document).text }}
          </div>
          <button class="history-item__btn" title="Сделать актуальным" @click.stop="makeActual(document.id)">
            &nbsp;
          </button>
        </div>
      </div>
    </div>
    <div class="input-group d-flex justify-content-start">
      <button type="submit" class="submit-btn" @click="$emit('close')">
        Понятно
      </button>
    </div>
  </popup>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Popup from '~/components/Popup.vue'
import { Document } from '~/types/document'

@Component({
  components: {
    Popup
  }
})
export default class extends Vue {
  @Prop() document!: Document

  historyList: Document[] = []

  fetch () {
    this.createHistory(this.document)
  }

  verifyStatus (document: Document) {
    switch (document.verifiedStatus) {
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

  makeActual (id: number) {
    this.$axios.$get('/api/document/actual', {
      params: {
        currentId: this.document.id,
        newId: id
      }
    }).then((document) => {
      Object.assign(this.document, document)
      this.historyList.splice(0, this.historyList.length)
      this.createHistory(this.document)
    })
  }

  openLink (document: Document) {
    window.open('http://localhost:8080/document/' + document.filePath, 'blank')
  }

  createHistory (document: Document) {
    this.historyList.push(document)

    if (document.prevVersion) {
      this.createHistory(document.prevVersion)
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin: 0;

  .placeholder {
    color: #757575;
  }

  input[type='file'] {
    display: none;
  }
}

.history-list {
  max-height: 300px;
  overflow: auto;
}

.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 4px 0 4px 12px;
  cursor: pointer;

  &__active {
    position: absolute;
    left: 0;
    height: 100%; width: 4px;
    background: #A9A9A9;

    &.active {
      background: #005590;
    }
  }

  &__status {
    text-transform: uppercase;
    font-size: 14px;

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

  &--title {
    padding: 8px 0;
    font-weight: bold;
  }

  &__btn {
    position: absolute;
    right: 0; top: 2px;
    height: 28px; width: 28px;
    border: 1px solid #757575;
    border-radius: 4px;
    background: #f0f0f0 url(~@/assets/img/icons/actual.svg) no-repeat center/16px;
    display: none;
  }

  &.old:hover {
    padding-right: 36px;
  }

  &.old:hover &__btn {
    display: block;
  }
}
</style>
