<template>
  <div class="page__list__item" @click="$router.push({ path: data.id.toString(), append: true })">
    <div class="title">
      {{ data.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import DeletePopup from '~/components/popup/DeletePopup.vue'
import { Institute } from '~/types/institute/institute'
import UpdateInstitutePopup from '~/components/popup/update-popup/UpdateInstitutePopup.vue'

@Component({
  components: { UpdateInstitutePopup, DeletePopup }
})
export default class extends Vue {
  @Prop() data!: Institute
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
    margin-left: 15px;
  }

  &.edit {
    background-color: #005590;
  }

  &.delete {
    background-color: indianred;
  }
}
</style>
