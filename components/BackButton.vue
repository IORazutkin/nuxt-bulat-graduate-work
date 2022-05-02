<template>
  <button class="back-link" @click="$router.back()">
    Назад
  </button>
</template>

<script>
export default {
  name: 'BackButton'
}
</script>

<style lang="scss" scoped>
.back-link {
  border: 1px solid #005590;
  background: white url(~@/assets/img/btns/back.svg) no-repeat left 16px center/16px;
  color: #005590;
  padding: 8px 16px 8px 48px;
  margin-top: 16px;
  border-radius: 8px;
}
</style>
