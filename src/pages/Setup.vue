<template>

  <q-page class="flex flex-center">
    <q-stepper
      flat
      class="setup-stepper"
      v-model="step"
      bordered
      ref="stepper"
      header-class="setup-stepper-header"
      color="primary"
      active-color="accent"
      animated
    >
      <q-step
        :name="1"
        title="Folders"
        icon="folder"
        caption="Set up paths"
        :done="step > 1"
      >
        <div class="setup-stepper-content overflow-hidden">
          <div class="pv-text-heading-2">Root folder</div>
          <div class="pv-text-body-2 text-grey-6">This is the root folder for all pr0nView content. This can be changed
            in the Settings menu.
          </div>
          <div class="row q-gutter-sm q-mt-xs">
            <div class="row col-grow">
              <q-input dense outlined class="full-width" v-model="$settingsStore.masterRootFolder"></q-input>
            </div>
            <div class="row col-shrink">
              <q-btn label="Select Folder" color="secondary" @click="selectMasterRootFolder"></q-btn>
            </div>
          </div>
          <q-separator class="q-my-md"></q-separator>
          <div class="pv-text-heading-2">Videos folder</div>
          <div class="pv-text-body-2 text-grey-6">This is the folder than contains all your videos. For best results
            this should be a sub-folder of the Root Folder. This can be changed
            in the Settings menu.
          </div>
          <div class="row q-gutter-sm q-mt-xs">
            <div class="row col-grow">
              <q-input dense outlined class="full-width" v-model="$settingsStore.videoRootFolder"></q-input>
            </div>
            <div class="row col-shrink">
              <q-btn label="Select Folder" color="secondary" @click="selectVideosFolder"></q-btn>
            </div>
          </div>
          <q-separator class="q-my-md"></q-separator>
          <div class="pv-text-heading-2">Images folder</div>
          <div class="pv-text-body-2 text-grey-6">This is the folder than contains images if they exist outside the
            video path. For best results this should be a sub-folder of the Root Folder. This can be changed
            in the Settings menu.
          </div>
          <div class="row q-gutter-sm q-mt-xs">
            <div class="row col-grow">
              <q-input dense outlined class="full-width" v-model="$settingsStore.imageRootFolder"></q-input>
            </div>
            <div class="row col-shrink">
              <q-btn label="Select Folder" color="secondary" @click="selectImagesFolder"></q-btn>
            </div>
          </div>

        </div>
      </q-step>
      <q-step
        :name="2"
        title="Import"
        icon="library_add"
        caption="Scrape your media"
        :done="step > 2"
      >
        <div class="setup-stepper-content overflow-hidden">
          <div class="pv-text-heading-2">Root folder</div>
          <div class="pv-text-body-2 text-grey-6">This is the root folder for all pr0nView content. This can be changed
            in the Settings menu.
          </div>
          <div class="row q-gutter-sm q-mt-xs">
            <div class="row col-grow">
              <q-input dense outlined class="full-width" v-model="$settingsStore.masterRootFolder"></q-input>
            </div>
            <div class="row col-shrink">
              <q-btn label="Select Folder" color="secondary"></q-btn>
            </div>
          </div>
          <q-separator class="q-my-md"></q-separator>
          <div class="pv-text-heading-2">Videos folder</div>
          <div class="pv-text-body-2 text-grey-6">This is the folder than contains all your videos. For best results
            this should be a sub-folder of the Root Folder. This can be changed
            in the Settings menu.
          </div>
          <div class="row q-gutter-sm q-mt-xs">
            <div class="row col-grow">
              <q-input dense outlined class="full-width" v-model="$settingsStore.videoRootFolder"></q-input>
            </div>
            <div class="row col-shrink">
              <q-btn label="Select Folder" color="secondary"></q-btn>
            </div>
          </div>
          <q-separator class="q-my-md"></q-separator>
          <div class="pv-text-heading-2">Images folder</div>
          <div class="pv-text-body-2 text-grey-6">This is the folder than contains images if they exist outside the
            video path. For best results this should be a sub-folder of the Root Folder. This can be changed
            in the Settings menu.
          </div>
          <div class="row q-gutter-sm q-mt-xs">
            <div class="row col-grow">
              <q-input dense outlined class="full-width" v-model="$settingsStore.imageRootFolder"></q-input>
            </div>
            <div class="row col-shrink">
              <q-btn label="Select Folder" color="secondary"></q-btn>
            </div>
          </div>

        </div>
      </q-step>

      <q-step
        :name="3"
        title="FFMPEG"
        caption="Video Metadata"
        icon="settings"
        :done="step > 3"
      >
        <div class="setup-stepper-content overflow-hidden">
          <div class="pv-text-heading-2">FFMPEG location</div>
          <div class="pv-text-body-2 text-grey-6">In order to convert files from formats that pr0nView doesn't support
            natively (e.g. MKV), you can use FFMPEG. If you don't have the FFMPEG binary (exe) already on your computer, you can
            let pr0nView download it.
          </div>
          <div class="row q-gutter-sm q-mt-xs">
            <div class="row col-grow">
              <q-input dense outlined class="full-width" v-model="$settingsStore.ffmpegPath"></q-input>
            </div>
            <div class="row col-shrink">
              <q-btn label="Find FFPMEG" color="secondary"></q-btn>
            </div>
            <div class="row col-shrink">
              <q-btn label="Download" color="secondary"></q-btn>
            </div>
          </div>
          <q-separator class="q-my-md"></q-separator>
          <div class="pv-text-heading-2">FFPROBE location</div>
          <div class="pv-text-body-2 text-grey-6">To get metadata like duration and codecs for video items, you can also
            nominate a path for FFPROBE. If you don't have the FFPROBE binary (exe) already on your computer, you can
            let pr0nView download it.
          </div>
          <div class="row q-gutter-sm q-mt-xs">
            <div class="row col-grow">
              <q-input dense outlined class="full-width" v-model="$settingsStore.ffprobePath"></q-input>
            </div>
            <div class="row col-shrink">
              <q-btn label="Find FFPROBE" color="secondary"></q-btn>
            </div>
            <div class="row col-shrink">
              <q-btn label="Download" color="secondary"></q-btn>
            </div>
          </div>
        </div>
      </q-step>

      <q-step
        :name="4"
        title="OpenAI"
        icon="automation"
        caption="Auto-tagging"
        :done="step > 4"
      >
        <div class="setup-stepper-content overflow-hidden">
          <div class="pv-text-heading-2">OpenAI Integration</div>
          <div class="pv-text-body-2 text-grey-6">pr0nView can use AI to help you rename or tag items in your library. In order to do so you will need to sign up to OpenAI and get an API key. WARNING: Using AI exposes at least the names of your files. However, using the OpenAI API is private and secured.
          </div>
          <div class="row q-gutter-sm q-mt-xs">
            <div class="row col-grow">
              <q-input dense outlined label="Paste your openAI key here" class="full-width"
                       v-model="$settingsStore.openAIKey"></q-input>
            </div>
            <div class="row col-shrink">
              <q-btn label="Save" color="secondary"></q-btn>
            </div>

          </div>
          <q-btn class="q-mt-md" outline label="Help me set up an OpenAI account" size="sm" no-caps color="accent"></q-btn>
        </div>
      </q-step>

      <q-step
        :name="5"
        title="Privacy"
        icon="lock"
        caption="Super useful"
      >
        <div class="setup-stepper-content overflow-hidden">
          <div class="pv-text-heading-2">Password</div>
          <div class="pv-text-body-2 text-grey-6">You can protect your pr0nView instance with a password. Setting this
            password will require you input it every time you run the application.
          </div>
          <div class="row q-gutter-sm q-mt-xs">
            <div class="row col-grow">
              <q-input dense outlined label="Type password" type="password" class="full-width"
                       v-model="$settingsStore.password"></q-input>
            </div>
            <div class="row col-grow">
              <q-input dense outlined label="Repeat password" type="password" class="full-width"
                       v-model="$settingsStore.repeatPassword"></q-input>
            </div>

          </div>
          <q-separator class="q-my-md"></q-separator>
          <div class="pv-text-heading-2">Panic Button</div>
          <div class="pv-text-body-2 text-grey-6">The Panic Button allows you to nominate a keystroke that will hide all
            contents immediately, stop all videos and mute sound. pr0nView can show an image, a video, or a web page
            when you hit the Panic Button. A duplicate Panic Button is available in the top header bar.
          </div>
          <div class="row q-gutter-sm q-mt-xs">
            <div class="row col-shrink">
              <q-input dense outlined label="Shortcut" class="full-width"
                       v-model="$settingsStore.panicButton"></q-input>
            </div>
            <div class="row col-shrink">
              <q-btn color="secondary" label="Set Keyboard Shortcut"></q-btn>
            </div>

          </div>
        </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="flex q-mt-md">
          <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 5 ? 'Finish' : 'Continue'"/>
          <q-btn v-if="step > 1" outline color="primary" @click="$refs.stepper.previous()" label="Back"
                 class="q-ml-sm"/>
          <q-btn outline color="primary" @click="$refs.stepper.next()" label="Skip" class="q-ml-auto"/>
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>

</template>

<script setup lang="ts">
import {ref} from "vue";
import {useSettingsStore} from "stores/settings-store";

const $settingsStore = useSettingsStore();

const step = ref(1)
const stepper = ref()

const selectMasterRootFolder = async () => {
  const selectedFolder = await window.api.chooseFolder();
  console.log(selectedFolder);
  if (!selectedFolder.canceled) {
    $settingsStore.masterRootFolder = selectedFolder.filePaths[0];
  }
}

const selectVideosFolder = async () => {
  const selectedFolder = await window.api.chooseFolder();
  console.log(selectedFolder);
  if (!selectedFolder.canceled) {
    $settingsStore.videoRootFolder = selectedFolder.filePaths[0];
  }
}

const selectImagesFolder = async () => {
  const selectedFolder = await window.api.chooseFolder();
  console.log(selectedFolder);
  if (!selectedFolder.canceled) {
    $settingsStore.imageRootFolder = selectedFolder.filePaths[0];
  }
}
</script>

<style lang="scss">
.setup-stepper {
  width: 850px;

  &-header {
    background: $secondary;
    color: white;
  }

  &-content {
    min-height: 120px;
  }
}
</style>
