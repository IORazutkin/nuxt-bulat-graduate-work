<template>
  <popup title="Изменение документа" @close="$emit('close')">
    <form @submit.prevent="updateDocument">
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
          Сохранить
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
import { Document } from '~/types/document'

@Component({
  components: {
    Popup
  }
})
export default class extends Vue {
  @Prop() document!: Document

  formData: any = {
    title: this.document.title,
    file: null
  }

  updateDocument () {
    this.$v.$touch()

    if (this.$v.$error) {
      return
    }

    const formData = new FormData()
    formData.append('title', this.formData.title)
    if (this.formData.file) {
      formData.append('file', this.formData.file, this.formData.file.name)
    }

    this.$axios.$patch('/api/document/deanery/' + this.document.id, formData).then((document: Document) => {
      Object.assign(this.document, document)
      this.$emit('close')
    })
  }

  validations () {
    return {
      formData: {
        title: {
          required
        },
        file: {}
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
