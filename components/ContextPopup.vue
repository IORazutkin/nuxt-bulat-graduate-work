<template>
  <transition name="opacity" appear>
    <div class="popup-container" @click.stop="" @mousedown.self="close">
      <transition name="drop-down" appear>
        <div class="popup" @click.stop="">
          <ul class="popup__body" @click.stop="close">
            <slot />
          </ul>
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
  align-items: center;
  cursor: default;
}

.popup {
  position: absolute;
  bottom: 0;
  background-color: white;
  border-radius: 8px 8px 0 0;
  max-width: 500px;
  width: 100%;
  padding: 15px;
  box-shadow: 0 0 5px 0 #212529;

  &__body {
    margin: 0;
    list-style: none;
    padding: 0;
  }
}
</style>

<style lang="scss">
.popup__body > li {
  color: #005590;
  font-size: 20px;
  font-weight: bold;

  & + li {
    margin-top: 8px;
  }
}
.popup__body > li.delete {
  color: indianred;
}
</style>
