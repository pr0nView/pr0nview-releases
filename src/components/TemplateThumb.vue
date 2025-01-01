
<template>
  <div class="template-grid" :class="`layout-${layoutId}`"
       :style="`grid-template-columns: ${currentLayoutDefinition.gridColumns}; grid-template-rows: ${currentLayoutDefinition.gridRows}; grid-template-areas: ${currentLayoutDefinition.gridAreas}`">
    <template v-for="(value, index) in currentLayoutDefinition.videoCount" :key="index+1">
      <div :style="`grid-area: video${index+1}`" class="outlined-thumb">
        <q-icon name="video_library" size="xs"></q-icon>
      </div>
    </template>
    <div v-for="(value, index2) in currentLayoutDefinition.slideshowCount" class="outlined-thumb" :style="`grid-area: slideshow${index2+1}`">
      <q-icon name="photo_library" size="xs"></q-icon>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useLayoutStore} from "stores/layout-store";
import {computed} from "vue";

const props = defineProps({
  layoutId: {
    type: Number,
    required: true
  },
});

const layoutStore = useLayoutStore();

const currentLayoutDefinition = computed(() => {
  return layoutStore.getLayoutById(props.layoutId);
});

</script>


<style scoped lang="scss">
.template-grid {
  display: grid;
aspect-ratio: 16/9;
  min-height: 100px;
}
.outlined-thumb {
  outline: 1px solid rgba(255,255,255,0.2);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
