<template>
  <div v-context="() => showMobilePopup = true" class="page__list__item" @click="$router.push({ path: data.id.toString(), append: true })">
    <div class="title">
      {{ data.lesson.title }}: {{ data.title }} - {{ data.creator.fullName }}
    </div>
    <div v-if="canEdit" class="actions">
      <button class="action-btn edit" @click.stop="$router.push({ path: 'update-task/' + data.id, append: true })">
        Редактировать
      </button>
      <button class="action-btn delete" @click.stop="showDeletePopup = true">
        Удалить
      </button>
    </div>

    <delete-popup v-if="showDeletePopup" title="Удаление" @delete="deleteTask" @close="showDeletePopup = false">
      Вы уверены, что хотите удалить "{{ data.title }}"?
    </delete-popup>

    <context-popup v-if="showMobilePopup && canEdit" @close="showMobilePopup = false">
      <li @click="$router.push({ path: 'update-task/' + data.id, append: true })">
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
import UpdateInstitutePopup from '~/components/popup/update-popup/UpdateInstitutePopup.vue'
import { Task } from '~/types/task'
import ContextPopup from '~/components/ContextPopup.vue'

@Component({
  components: { ContextPopup, UpdateInstitutePopup, DeletePopup }
})
export default class extends Vue {
  @Prop() data!: Task
  @Prop({
    type: Boolean,
    default: true
  }) canEdit!: boolean

  showDeletePopup: boolean = false
  showMobilePopup: boolean = false

  deleteTask () {
    return this.$axios.$delete('/api/task/' + this.data.id).then(() => {
      this.$emit('delete', this.data)
    })
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
  background: transparent url(~@/assets/img/icons/right-arrow.svg) no-repeat right 30px center/12px;

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
