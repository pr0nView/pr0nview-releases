<template>
  <q-page class="relative-position">
    <div class="video-grid absolute-full" :class="`layout-${currentLayout}`" :style="`grid-template-columns: ${currentLayoutDefinition.gridColumns}; grid-template-rows: ${currentLayoutDefinition.gridRows}; grid-template-areas: ${currentLayoutDefinition.gridAreas}`">
      <template v-for="(value, index) in videoCount" :key="index+1">
        <Pr0nVideoPlayer :initial-area="`video${index+1}`" ref="videoReferences"></Pr0nVideoPlayer>
      </template>
      <div class="pr0n-video-wrapper" v-for="(value, index2) in slideshowCount" :data-area="`slideshow${index2+1}`" :style="`grid-area: slideshow${index2+1}`">
        <pr0n-slideshow :key="index2+1"></pr0n-slideshow>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';

import Pr0nVideoPlayer from "components/Pr0nVideoPlayer.vue";
import Pr0nSlideshow from "components/Pr0nSlideshow.vue";
import {useLayoutStore} from "stores/layout-store";

const layoutStore = useLayoutStore();
const currentLayout = ref(2);
const videoReferences = ref([]);

const currentLayoutDefinition = computed( () => {
  return layoutStore.getCurrentLayout;
});

const videoCount = computed( () => {
  return layoutStore.getCurrentLayout.videoCount;
});

const slideshowCount = computed( () => {
  return layoutStore.getCurrentLayout.slideshowCount;
});

</script>
<style lang="scss">
.video-grid {
  display: grid;
  width: 100%;
  height: 100%;
  background-color: #000;
  overflow: hidden;
  grid-gap: 10px;
}
</style>
