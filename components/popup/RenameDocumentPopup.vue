<template>
  <popup title="Переименовать документ" @close="$emit('close')">
    <form @submit.prevent="renameDocument">
      <div class="input-group" :class="{'error': $v.formData.title.$error}">
        <input
          v-model.trim="$v.formData.title.$model"
          class="field no-icon"
          placeholder="Название документа"
          autofocus
          @input="$v.formData.title.$reset"
        >
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
    title: this.document.title
  }

  renameDocument () {
    this.$v.$touch()

    if (this.$v.$error) {
      return
    }

    this.$axios.$patch('/api/document/' + this.document.id, this.formData).then((document: Document) => {
      Object.assign(this.document, document)
      this.$emit('close')
    })
  }

  validations () {
    return {
      formData: {
        title: {
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
