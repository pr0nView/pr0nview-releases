<template>
  <q-layout view="hHh LpR fFf" class="bg-dark">
    <q-page-container>
      <q-page class="flex flex-center panic-screen">
        <div class="absolute-top-right">
          <q-btn round icon="close" class="text-white" to="/"></q-btn>
        </div>
        <div>
          <img src="panic-google.png" class="panic-graphic" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.panic {
  &-screen {
    background-color: rgb(32,33,36)
  }
  &-graphic {
    width: 30vw;
    max-width: 982px;
    height: auto;
  }
}
</style>
