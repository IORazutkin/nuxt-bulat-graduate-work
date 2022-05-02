<template>
  <div class="search-block">
    <div class="row">
      <div class="col-12 col-sm">
        <div class="input-group">
          <input
            v-model="filter.search"
            type="tel"
            class="field no-icon"
            placeholder="Поиск"
            autocomplete="off"
          >
        </div>
      </div>
      <div v-if="canAdd" class="col-12 col-sm-auto mt-3 mt-sm-0">
        <div class="input-group">
          <button class="submit-btn add-btn" @click="showAddPopup = true">
            Добавить документ
          </button>
        </div>
      </div>
    </div>

    <add-document-popup v-if="showAddPopup" :task="task" @close="showAddPopup = false" />
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'nuxt-property-decorator'
import AddDocumentPopup from '~/components/popup/add-popup/AddDocumentPopup.vue'
import { Task } from '~/types/task'

@Component({
  components: { AddDocumentPopup }
})
export default class extends Vue {
  @Prop() task!: Task
  @Prop({
    type: Boolean,
    default: true
  }) canAdd!: boolean

  @Model() filter!: { search: string }

  showAddPopup: boolean = false
}
</script>

<style lang="scss" scoped>
.search-block {
  background-color: #f0f0f0;
  padding: 15px;
  border-bottom: 1px solid #A9A9A9;
  z-index: 1;
}

.input-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
