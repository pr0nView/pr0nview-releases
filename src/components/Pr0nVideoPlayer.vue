<template>
  <div class="pr0n-video-player relative-position" :style="`grid-area: ${playerGridArea}`" ref="pronVideoPlayer"
       @dragover="handleDragOver"
       @drop="handleDrop" :class="isDragging ? 'dragging-over' : ''" @dragleave="isDragging = false"
       @mouseenter="handleMouseEnter" @mouseleave="handleMouseOut" :draggable="true"
       @dragstart="dragStartHandler">
      <div class="next-video absolute-right z-top animated fadeInRight" v-if="mouseIsOver &&!settingsStore.presentationMode && currentLoadedVideo">
        <q-btn round icon="chevron_right" size="10px" color="accent" class="text-black" @click="getNextVideo"></q-btn>
      </div>
      <div class="next-video absolute-left z-top animated fadeInLeft" v-if="mouseIsOver &&!settingsStore.presentationMode && currentLoadedVideo">
        <q-btn round icon="chevron_left" size="10px" color="accent" class="text-black" @click="getPrevVideo"></q-btn>
      </div>
    <div class="absolute-full flex flex-center column" v-if="!currentLoadedVideo && !busyConvertingFile">
      <PlaylistBuilder media-type="video" @register-files="receiveNewFiles" :player-id="playerId"></PlaylistBuilder>
    </div>
    <div class="absolute-top animated fadeInDown z-top" v-if="showHeaderAndFooter">
      <div class="quick-bar row q-pa-xs" style="background: rgba(0,0,0,0.3)">
        <FileListButton :local-files="localPlaylist" @dropdown-open="dropdownOpen = true"
                        @dropdown-close="dropdownOpen = false" @file-click="playFromPlaylist"
                        v-if="localPlaylist.length"></FileListButton>
        <q-space></q-space>
        <q-btn color="accent" size="sm" label="Save Playlist" icon="folder_open"></q-btn>
        <!--            <q-btn color="accent" class="q-mr-sm" size="sm" label="Save Playlist" v-if="localPlaylist.length" @click="handleCreatePlaylist" icon="playlist_play"></q-btn>-->
      </div>
    </div>
    <!--    <div class="absolute-bottom quick-footer z-max  animated fadeInUp" v-if="localPlaylist.length && showHeaderAndFooter">
          <q-toolbar style="background: rgba(0,0,0,0.3);">
            <q-toggle
              dark
              v-model="randomActive"
              color="accent"
              icon="shuffle"
              label="Shuffle"
              class="text-white"
            />
            <q-space></q-space>
            <div class="text-white">{{ currentLoadedVideo.fileName }}</div>
            <q-space></q-space>
          </q-toolbar>
        </div>-->
    <!--        <div class="absolute-top-right z-max q-ma-sm">
              <q-btn round color="secondary" icon="playlist_play" class="q-mx-xs">
                <q-menu max-width="400px">
                  <q-list separator>
                    <q-item clickable dense @click="savePlaylist" v-if="!!localPlaylist.length">
                      <q-item-section avatar>
                        <q-avatar icon="save"></q-avatar>
                      </q-item-section>
                      <q-item-section>Create playlist from files</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple v-for="(mediaItem, index) in localPlaylist" @click="playFromPlaylist(index)"
                            v-close-popup>
                      <q-item-section style="max-width: 100%; overflow:hidden">
                        <q-item-label>{{ mediaItem.fileName }}</q-item-label>
                        <q-item-label caption>{{ mediaItem.filePath }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <q-btn round color="secondary" icon="folder_open" class="q-mx-xs">
                <q-menu max-width="500px">
                  <q-list separator>
                    <q-item clickable v-ripple v-for="(playlist, index) in playListStore.allPlaylists"
                            @click="loadPlaylist(playlist)" v-close-popup>
                      <q-item-section>
                        <q-item-label>{{ playlist.name }}</q-item-label>
                        <q-item-label caption>User created playlist</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>-->

    <video-player v-if="currentLoadedVideo && !busyConvertingFile"
                  :autoplay="true"
                  :src="sanitisedUrl"
                  :volume="playerVolume"
                  :controls="!settingsStore.presentationMode"
                  fill
                  @error="handleError"
                  @ended="getNextVideo"
                  draggable="true"
    ></video-player>

    <div class="absolute-full flex flex-center column" v-if="busyConvertingFile">
      <q-spinner-gears size="lg"></q-spinner-gears>
      <q-linear-progress stripe size="10px" style="width: 50%" class="q-mt-lg"
                         :value="conversionProgress"></q-linear-progress>
      <div class="q-mt-lg">Optimising video file for real-time playback</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, toRaw, watch} from 'vue';
import {VideoPlayer} from "@videojs-player/vue";
import {usePlayerStore} from "stores/video-store";
import {useQuasar} from "quasar";
import {createUUID} from "../../shared/Utils";
import PlaylistBuilder from "components/PlaylistBuilder.vue";
import 'video.js/dist/video-js.css'
import {COMPATIBLE_VIDEO_FORMATS, CUSTOM_PROTOCOL, IRREGULAR_CHARACTERS} from "../../shared/Settings";
import FileListButton from "./FileListButton.vue";
import {useSettingsStore} from "stores/settings-store";

const props = defineProps({
  initialArea: {
    type: String,
    required: true
  }
});

enum PLAYMODE {
  RANDOM,
  SEQUENTIAL
}

let unduckedVolume = 0.5;
let currentPlaylistIndex = 0;

const $q = useQuasar();
const playerStore = usePlayerStore();
const settingsStore = useSettingsStore();
const isDragging = ref(false);
const busyConvertingFile = ref(false);
const conversionProgress = ref(0);
const mouseIsOver = ref(false);
const dropdownOpen = ref(false);
const localPlaylist = ref<IMediaVideo[]>([]);
const randomActive = ref(true)
const currentLoadedVideo = ref<IMediaVideo>();
const pronVideoPlayer = ref(null);
const pattern = new RegExp(Object.keys(IRREGULAR_CHARACTERS).map(key => "\\" + key).join("|"), "g");
const playerId = props.initialArea;

defineExpose({
  getState
})

const showHeaderAndFooter = computed(() => {
  if (settingsStore.presentationMode) return false;
  if (!currentLoadedVideo.value) return false;
  if (mouseIsOver.value) return true;
  if (dropdownOpen.value) return true;
  return false;
})

playerStore.registerPlayerWithStore(playerId, {volume: unduckedVolume, gridLocation: props.initialArea});

const sanitisedUrl = computed(() => {
  if (!currentLoadedVideo.value) return '';
  const renamedFile: string = (CUSTOM_PROTOCOL.VIDEO + ':///' + currentLoadedVideo.value.filePath + '\\' + currentLoadedVideo.value.fileName).replace(pattern, (match: string | number) => IRREGULAR_CHARACTERS[match]);
  console.debug(renamedFile);
  return renamedFile;
});

const playerVolume = computed(() => {
  return playerStore.getVideoPlayerState(playerId).playerState.volume;
});

const playerGridArea = computed(() => {
  return playerStore.getVideoPlayerState(playerId).playerState.gridLocation;
});

const playMode = computed(() => {
  return randomActive.value ? PLAYMODE.RANDOM : PLAYMODE.SEQUENTIAL;
});

watch(mouseIsOver, (newValue) => {
  if (newValue) {
    playerStore.setVolume(playerId, 1);
  }
});

function getState() {
  return {
    playerId: playerId,
    playerGridArea: toRaw(playerGridArea.value),
    currentLoadedVideo: toRaw(currentLoadedVideo.value),
    playMode: toRaw(playMode.value),
    localPlaylist: toRaw(localPlaylist.value),
    playerVolume: toRaw(playerVolume.value),
  }
}

function playSelectedVideo(video: any) {

}

function receiveNewFiles(fileList: IMediaVideo[]) {
  // TODO: Create a new full playlist object
  localPlaylist.value = fileList;
  /*  for (const playlistItem of localPlaylist.value) {
      storeMedia(toRaw(playlistItem));
    }*/
  getNextVideo();
}

async function savePlaylist() {
  $q.dialog({
    title: 'Save Playlist',
    message: 'Enter a name for the playlist',
    prompt: {
      model: '',
      type: 'text'
    },
    cancel: true,
    persistent: true
  }).onOk(async (data) => {
    const newPlaylist: IPlaylist = {
      files: localPlaylist.value,
      name: data,
      id: createUUID(),
      parentFolder: ''
    }
    await playListStore.saveSinglePlaylistToDb(newPlaylist);
  });
}

async function loadPlaylist(_playList: IPlaylist) {
  localPlaylist.value = _playList.files;
  getNextVideo();
}

async function handleError(e: any) {
  //console.log(e);
  busyConvertingFile.value = true;
  //await window.api.convertFile(currentLoadedVideo.value?.filePath,currentLoadedVideo.value?.fileName, playerId);
  //window.api.send('start-video-stream', currentLoadedVideo.value?.filePath, currentLoadedVideo.value?.fileName, playerId);
}

function dragStartHandler(e) {
  e.dataTransfer.dropEffect = 'move';
  e.dataTransfer.setData('text/plain', playerGridArea.value);
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
  const transferredItems = event.dataTransfer?.items || [];
  if (transferredItems[0].kind === 'string') {

  } else {
    isDragging.value = true;
  }
}

async function handleDrop(ev: DragEvent) {
  ev.preventDefault();
  isDragging.value = false;

  const transferredItems = ev.dataTransfer?.items || [];

  if (transferredItems[0].kind === 'string') {
    const id = ev.dataTransfer?.getData('text/plain') || '';
    console.log(`Should swap ${id} with ${playerGridArea.value}`);
    playerStore.requestSwap(id, playerGridArea.value);
    return
  }
}

function playFromPlaylist(index: number) {
  currentPlaylistIndex = index;
  currentLoadedVideo.value = localPlaylist.value[currentPlaylistIndex];
}

function getNextVideo() {
  if (playMode.value === PLAYMODE.SEQUENTIAL && currentPlaylistIndex < localPlaylist.value.length) {
    currentPlaylistIndex++
  } else if (playMode.value === PLAYMODE.RANDOM) {
    currentPlaylistIndex = Math.floor(Math.random() * localPlaylist.value.length);
  }
  currentLoadedVideo.value = localPlaylist.value[currentPlaylistIndex];
  return;
}

function getPrevVideo() {
  if (playMode.value === PLAYMODE.SEQUENTIAL && currentPlaylistIndex > 0) {
    currentPlaylistIndex--
  } else if (playMode.value === PLAYMODE.RANDOM) {
    currentPlaylistIndex = Math.floor(Math.random() * localPlaylist.value.length);
  }
  currentLoadedVideo.value = localPlaylist.value[currentPlaylistIndex];
  return;
}

async function spawnFileBrowser() {
  await window.api.openFileBrowser(playerId);
}

async function spawnFolderBrowser() {
  await window.api.openFolderBrowser(playerId, COMPATIBLE_VIDEO_FORMATS);
}

function handleMouseEnter() {
  mouseIsOver.value = true;
}

function handleMouseOut() {
  mouseIsOver.value = false;
}

function handleDragEnter() {
  isDragging.value = true;
}

function handleDragLeave() {
  isDragging.value = false;
}
</script>
<style lang="scss">
.pr0n-video-player {
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 1;
  transition: all 0.3s ease;
  background: $dark;

  &.dragging-over {

  }

}

.next-video {
  top: calc(50% - 20px);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
