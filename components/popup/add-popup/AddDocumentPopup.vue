<template>
  <popup title="Добавление документа" @close="$emit('close')">
    <form @submit.prevent="addDocument">
      <div class="input-group" :class="{'error': $v.formData.title.$error}">
        <input
          v-model.trim="$v.formData.title.$model"
          class="field no-icon"
          placeholder="Название документа"
          autofocus
          @input="$v.formData.title.$reset"
        >
      </div>
      <div class="input-group" :class="{'error': $v.formData.file.$error}">
        <label
          class="field no-icon"
        >
          <input
            type="file"
            @change="formData.file = $event.target.files[0]"
            @input="$v.formData.file.$reset"
          >
          <span v-if="!formData.file" class="placeholder">
            Выберите файл
          </span>
          <span v-else>
            {{ formData.file.name }}
          </span>
        </label>
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
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { required } from 'vuelidate/lib/validators'
import Popup from '~/components/Popup.vue'
import { Task } from '~/types/task'

@Component({
  components: {
    Popup
  }
})
export default class extends Vue {
  @Prop() task!: Task

  formData: any = {
    title: '',
    file: null
  }

  addDocument () {
    this.$v.$touch()

    if (this.$v.$error) {
      return
    }

    const formData = new FormData()
    formData.append('title', this.formData.title)
    formData.append('file', this.formData.file, this.formData.file.name)

    if (this.task) {
      this.$axios.$post('/api/document/task/' + this.task.id, formData).then((document: Document) => {
        this.$eventBus.$emit('AddDocumentEvent', document)
        this.$emit('add', document)
        this.$emit('close')
      })
    } else {
      this.$axios.$post('/api/document/deanery', formData).then((document: Document) => {
        this.$eventBus.$emit('AddDocumentEvent', document)
        this.$emit('add', document)
        this.$emit('close')
      })
    }
  }

  validations () {
    return {
      formData: {
        title: {
          required
        },
        file: {
          required
        }
      }
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
</style>
