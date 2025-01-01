<template>
  <q-layout view="hHh LpR fFf" class="bg-dark">
    <q-header>
      <q-toolbar class="bg-dark text-accent">
        <q-btn flat stretch icon="menu" aria-label="Menu" @click="toggleLeftDrawer"></q-btn>
        <img src="~/assets/pronview-logo-white.svg" style="max-height: 40px" class="q-ml-md">
        <q-separator vertical class="q-ml-lg"></q-separator>
        <q-toggle color="accent" v-model="settings.presentationMode" class="q-mr-md" label="Focus Mode"/>
        <q-separator vertical></q-separator>
        <q-space></q-space>
        <q-btn flat stretch label="Layouts" icon-right="expand_more" color="accent">
          <q-menu>
            <q-list style="min-width: 300px" v-for="(layout, index) in layoutStore.layouts">
              <q-item clickable v-close-popup @click="changeLayout(index as number)">
                <q-item-section>
                  <TemplateThumb :layout-id="index as number"></TemplateThumb>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-space></q-space>
        <q-icon class="q-mx-sm" name="volume_down" size="md" color="accent"></q-icon>
        <q-slider color="accent" style="max-width: 10vw" v-model="mainVolume" :min="0" :max="100" :step="10"></q-slider>
        <q-icon class="q-mx-sm" name="volume_up" size="md" color="accent"></q-icon>
        <q-separator vertical></q-separator>
        <q-btn flat stretch icon="settings" name="settings" size="md" color="accent">
          <q-menu>
            <q-list style="min-width: 20vw">
              <q-item>
                <q-toggle v-model="settings.presentationMode" label="Presentation Mode"/>
              </q-item>
              <q-item>
                <q-select label="Select Audio In" outlined dense v-model="settings.audioSetup.inputDevice"
                          :options="audioInputDevices"></q-select>
              </q-item>
              <q-separator></q-separator>
            </q-list>
          </q-menu>

        </q-btn>
        <q-separator vertical></q-separator>
        <q-btn class="q-ml-md" color="accent" label="Panic Button"></q-btn>
      </q-toolbar>
      <q-separator></q-separator>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered :width="400">
      <q-list bordered separator>
        <q-item clickable active-class="text-accent" v-ripple :to="item.path"
                v-for="(item, index) in settings.menuItems">
          <q-item-section avatar>
            <q-avatar>
              <q-icon size="md" :name="item.icon"></q-icon>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
            <q-item-label caption>{{ item.caption }}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>
    <q-page-container>
      <q-page class="flex flex-center" v-if="settings.showFullScreenLoader">
        <LoaderSpinner :loading-text="settings.fullScreenLoaderText"></LoaderSpinner>
      </q-page>
      <router-view v-else></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import {useLayoutStore} from "stores/layout-store";
import {useSettingsStore} from "stores/settings-store";
import {useQuasar} from "quasar";
import TemplateThumb from "components/TemplateThumb.vue";
import {useRouter} from "vue-router";
import LoaderSpinner from "../components/LoaderSpinner.vue";

const mainVolume = ref(10);

const leftDrawerOpen = ref(false)
const $q = useQuasar();
const router = useRouter();
const layoutStore = useLayoutStore();
const settings = useSettingsStore();
const audioInputDevices = ref();

$q.dark.set(true);

settings.setLoading(true, 'Performing bootup tasks');

watch(mainVolume, (newVal) => {
  window.api.setVolume(newVal/100);
})

function changeLayout(index: number) {
  layoutStore.setLayout(index);
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

onMounted(async () => {

  audioInputDevices.value = await getAudioInputs();
  settings.setAudioInputDevice(audioInputDevices.value[0]);
  await setAudioDevice();

  settings.setLoading(false);

  await router.push('/display');
})

async function getAudioInputs() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === 'audioinput');
  } catch (error) {
    console.error('Error enumerating audio devices:', error);
  }
}

async function setAudioDevice() {
  navigator.mediaDevices.getUserMedia({audio: {deviceId: settings.audioSetup.inputDevice}})
    .then(function (stream) {
      const audioContext = new AudioContext();
      const microphoneSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      microphoneSource.connect(analyser);
      analyser.fftSize = 256; // Adjust the FFT size based on your visualization needs.
      analyser.smoothingTimeConstant = 0.8; // Adjust the smoothing factor.

    })
    .catch(function (error) {
      console.error('Error accessing selected microphone:', error);
    });
}
</script>
<style lang="scss">
#donate-button-container {
  margin-top: 5px;
  border-radius: 12px;

  img {
    width: 100%;
    max-width: 100%;
    border-radius: 4px;
  }
}
</style>
