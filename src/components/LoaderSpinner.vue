<template>
  <div class="flex column items-center loader-spinner">
    <q-spinner-gears color="accent" size="120px"></q-spinner-gears>
    <div class="q-mt-md text-accent text-center loader-caption animated pulse slower infinite" v-html="loadingText"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  loadingText: {
    type: String,
    default: `Please wait a moment`
  }
})
</script>

<style lang="scss">
.loader {

  &-caption {
    font-size: 16px;
  }

}
</style>
