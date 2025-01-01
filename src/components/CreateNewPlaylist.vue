<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="new-playlist">
      <q-btn round icon="close" @click="onDialogCancel" class="absolute-top-right z-top"></q-btn>
      <q-card-section>
        <div class="pv-text-heading-1">Create new playlist</div>
        <div class="pv-text-body-1">Creating new playlist with {{ fileList.length }} files</div>
      </q-card-section>
      <q-card-section>
        <q-scroll-area class="image-scroll-area">
          <div class="image-grid">
            <q-img v-for="(mediaItem, index) in fileList" :src="getPathForImage(mediaItem)"></q-img>
          </div>
        </q-scroll-area>
      </q-card-section>
      <q-card-section class="q-gutter-sm">
        <q-input outlined v-model="playlistName" label="Playlist name"></q-input>
        <q-input outlined v-model="playlistDescription" label="Playlist description (optional)"></q-input>
        <q-select outlined dense color="accent" label="Add tags" use-chips multiple v-model="selectedTags" :options="['thing', 'another thing']"></q-select>
        <q-select outlined dense label="Add model(s)" use-chips multiple v-model="selectedModels" :options="['Paula', 'another thing']"></q-select>
      </q-card-section>
      <q-card-actions align="center" class="q-mb-sm">
        <q-btn color="accent" outline label="Cancel" @click="onDialogCancel"/>
        <q-btn color="accent" label="OK" @click="onOKClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {useDialogPluginComponent} from 'quasar'
import {CUSTOM_PROTOCOL, IRREGULAR_CHARACTERS} from "../../shared/Settings";
import {ref} from "vue";

const props = defineProps({
  fileList: {
    type: Array<IMediaImage | IMediaVideo>,
    default: []
  }
})

const playlistName = ref('')
const playlistDescription = ref('')
const selectedTags = ref([]);
const selectedModels = ref([]);

const pattern = new RegExp(Object.keys(IRREGULAR_CHARACTERS).map(key => "\\" + key).join("|"), "g");

function getPathForImage(image: IMediaImage):string {
  return (CUSTOM_PROTOCOL.IMAGE + ':///' + image.filePath + '\\' + image.fileName).replace(pattern, (match: string | number) => IRREGULAR_CHARACTERS[match]);
}

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits
])

const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  onDialogOK()
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
<style lang="scss">
.new-playlist {
  min-width: 800px;

  .image-grid {
    display: grid;
    grid-template-columns: repeat(12, minmax(32px, 1fr));
    grid-gap: 5px;
  }

  .image-scroll-area {
    width: 100%;
    height: 170px;
  }
}
</style>
