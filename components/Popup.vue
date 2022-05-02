<template>
  <transition name="opacity" appear>
    <div class="popup-container" @click.stop="" @mousedown.self="close">
      <transition name="drop-down" appear>
        <div class="popup" @click.stop="">
          <div class="popup__title">
            {{ title }}
            <button class="icon-btn popup__close" @click="close">
              &nbsp;
            </button>
          </div>
          <div class="popup__body">
            <slot />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  @Prop() title!: string

  mounted () {
    window.onkeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.close()
      }
    }
  }

  close () {
    setTimeout(() => {
      this.$emit('close')
    }, 100)
  }
}
</script>

<style lang="scss" scoped>
.popup-container {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, .3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
}

.popup {
  background-color: white;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  padding: 15px;
  box-shadow: 0 0 5px 0 #212529;

  &__title {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 20px;
    line-height: 30px;
    color: #005590;
    border-bottom: 1px solid #005590;
    padding-bottom: 12px;
    margin-bottom: 15px;
  }

  &__close {
    background: transparent url(~@/assets/img/icons/cancel.svg) no-repeat center/16px;
    border: none;
    width: 30px; height: 30px;
  }
}
</style>
