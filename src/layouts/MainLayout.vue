<template>
  <q-layout view="hHh LpR fFf" class="bg-dark">
    <q-header>
      <q-toolbar class="bg-dark text-accent">
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
        <div id="donate-button-container" style="max-width: 120px" class="q-mx-md">
          <div id="donate-button"></div>
        </div>
        <q-separator vertical></q-separator>
        <q-btn class="q-ml-md" color="accent" label="Panic Button" to="/panic"></q-btn>
      </q-toolbar>
      <q-separator></q-separator>
    </q-header>
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
import {loadScript} from "vue-plugin-load-script";
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

let paypal: any;

$q.dark.set(true);

settings.setLoading(true, 'Performing bootup tasks');

watch(mainVolume, (newVal) => {
  window.api.setVolume(newVal);
})

function changeLayout(index: number) {
  layoutStore.setLayout(index);
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

onMounted(async () => {
  settings.setLoading(false);
  await router.push('/display');

  loadScript('https://www.paypalobjects.com/donate/sdk/donate-sdk.js')
    .then(() => {
      console.log('PayPal JS SDK loaded');
      PayPal.Donation.Button({
        env: 'production',
        hosted_button_id: 'B4RCXADZAJ4JN',
        image: {
          src: 'donate.png',
          alt: 'Donate with PayPal button',
          title: 'PayPal - The safer, easier way to pay online!',
        }
      }).render('#donate-button');
    })

})

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
