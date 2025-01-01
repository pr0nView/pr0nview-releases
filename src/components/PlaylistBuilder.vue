<template>
  <q-card flat @dragover="handleDragOver" @drop="handleDrop" @dragleave="isDragging = false" class="playlist-builder bg-transparent">
    <div class="drop-area flex flex-center text-white column bg-secondary">
      <div v-if="!waitingForFiles">
        <q-icon size="md" :name="mediaType === 'video' ? 'video_library' : 'perm_media'" class="q-mb-md"></q-icon>
        <div>{{ isDragging ? 'Drop files here' : `Drag and drop ${mediaType}s  here` }}</div>
      </div>
      <div v-else>
        <q-spinner-gears size="lg"></q-spinner-gears>
        <div class="q-mt-lg">Parsing file data for {{ totalFiles }} files</div>
      </div>
    </div>
    <q-card-actions align="center" class="q-mt-sm">
      <q-btn class="q-mx-sm" size="sm" label="Select Files" @click="spawnFileBrowser" color="accent"></q-btn>
      <q-btn class="q-mx-sm" size="sm"  label="Select Folder" @click="spawnFolderBrowser" color="accent"></q-btn>
      <q-btn class="q-mx-sm" size="sm"  label="Load Playlist" @click="spawnFolderBrowser" color="accent"></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {createUUID, isVideoOrImage} from "../../shared/Utils";
import {
  COMPATIBLE_IMAGE_FORMATS,
  COMPATIBLE_VIDEO_FORMATS, RESPONSES,
  SELECTABLE_IMAGE_FORMATS,
  SELECTABLE_VIDEO_FORMATS
} from "../../shared/Settings";
import {useSettingsStore} from "stores/settings-store";

const props = defineProps<{
  mediaType: 'video' | 'image',
  playerId: string
}>()

const emit = defineEmits<{
  (e: 'registerFiles', files: any[]): void
}>()

const $settingsStore = useSettingsStore();

const isDragging = ref(false);
const waitingForFiles = ref(false);
const builderId = createUUID();
const permittedFileTypes = props.mediaType === 'video' ? COMPATIBLE_VIDEO_FORMATS : COMPATIBLE_IMAGE_FORMATS;
const totalFiles = ref(0);
const fileProgress = ref(0);

window.api.receive(builderId, (options: any) => {
  switch (options.type) {
    case RESPONSES.FILE_COUNT:
      totalFiles.value = options.data;
      break
  }
});

async function spawnFileBrowser() {
  const defaultFolder = props.mediaType === 'video' ? $settingsStore.videoRootFolder : $settingsStore.imageRootFolder;
  const defaultFileTypes = props.mediaType === 'video' ? COMPATIBLE_VIDEO_FORMATS : COMPATIBLE_IMAGE_FORMATS;
  const filesSelected = await window.api.openFileBrowser({
    builderId: builderId,
    rootFolder: defaultFolder,
    mediaType: props.mediaType,
    fileTypes: defaultFileTypes
  });
  waitingForFiles.value = false;
  emit('registerFiles', filesSelected);
}

async function spawnFolderBrowser() {
  const defaultFolder = props.mediaType === 'video' ? $settingsStore.videoRootFolder : $settingsStore.imageRootFolder;
  const defaultFileTypes = props.mediaType === 'video' ? COMPATIBLE_VIDEO_FORMATS : COMPATIBLE_IMAGE_FORMATS;
  waitingForFiles.value = true;
  const filesSelected = await window.api.openFolderBrowser({
    builderId: builderId,
    rootFolder: defaultFolder,
    mediaType: props.mediaType,
    fileTypes: defaultFileTypes
  });
  waitingForFiles.value = false;
  emit('registerFiles', filesSelected);
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
  isDragging.value = true;
}

async function handleDrop(ev: DragEvent) {
  ev.preventDefault();
  waitingForFiles.value = true;
  isDragging.value = false;
  const transferredFiles = [...ev.dataTransfer.files];
  const filesSelected: any = await window.api.readFiles(transferredFiles, builderId, permittedFileTypes);
  console.log(filesSelected);
  emit('registerFiles', filesSelected);
}
</script>

<style scoped lang="scss">
.playlist-builder {
  width: 75%;
  max-width: 350px;
}

.drop-area {
  text-align: center;
  cursor: pointer;
  position: relative;
  outline: 3px dashed #999;
  aspect-ratio: 2.5;
  pointer-events: none;
  border-radius: 10px;
}
</style>
