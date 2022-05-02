<template>
  <popup :title="title" @close="$emit('close')">
    <div class="content">
      <slot />
    </div>
    <div class="input-group d-flex justify-content-start">
      <button type="submit" class="delete-btn" @click="$emit('close'); $emit('delete')">
        Удалить
      </button>
      <button type="button" class="cancel-btn ml-3" @click="$emit('close')">
        Отмена
      </button>
    </div>
  </popup>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Popup from '~/components/Popup.vue'

@Component({
  components: {
    Popup
  }
})
export default class extends Vue {
  @Prop() title!: string
}
</script>

<style lang="scss" scoped>
.content {
  padding-bottom: 16px;
  border-bottom: 1px solid #005590;
  margin-bottom: 16px;
}
</style>
