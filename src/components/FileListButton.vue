<template>
  <q-btn color="accent" size="sm" label="Local Files" icon="playlist_play">
    <q-menu max-width="600px" auto-close @before-show="emits('dropdownOpen')" @before-hide="emits('dropdownClose')">
      <q-list separator>
        <q-item clickable dense @click="emits('createNewPlaylist')" v-if="!!localFiles.length">
          <q-item-section avatar>
            <q-avatar icon="save"></q-avatar>
          </q-item-section>
          <q-item-section>Create playlist from files</q-item-section>
        </q-item>
        <q-item @click="emits('fileClick', index)" clickable v-ripple v-for="(mediaItem, index) in localFiles" v-close-popup>
          <q-item-section style="max-width: 100%; overflow:hidden">
            <q-item-label>{{ mediaItem.fileName }}</q-item-label>
            <q-item-label caption :lines="1">{{ mediaItem.filePath }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">

const props = defineProps({
  localFiles: {
    type: Array<IMediaImage | IMediaVideo>,
    default: []
  }
})

const emits = defineEmits(['fileClick', 'dropdownOpen', 'dropdownClose', 'createNewPlaylist'])
</script>

<style lang="scss">

</style>
