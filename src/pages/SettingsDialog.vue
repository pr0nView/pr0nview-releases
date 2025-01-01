<template>
  <q-page padding class="flex flex-center">
    <q-card flat class="settings-dialog">
      <q-splitter v-model="splitterModel">
        <template v-slot:before>
          <q-tabs
            v-model="tab"
            vertical
            active-color="accent"
            class="text-teal"
          >
            <q-tab no-caps name="videos" icon="movie" label="Videos"/>
            <q-tab no-caps name="images" icon="image" label="Images"/>
            <q-tab no-caps name="renamer" icon="edit_note" label="Renamer"/>
            <q-tab no-caps name="models" icon="face" label="Model List"/>
            <q-tab no-caps name="database" icon="table_eye" label="Database"/>
            <q-tab no-caps name="integrations" icon="integration_instructions" label="Integrations"/>
            <q-tab no-caps name="privacy" icon="lock" label="Privacy"/>
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            animated
            vertical
            transition-prev="jump-up"
            transition-next="jump-up">
            <q-tab-panel name="images">
              <div class="text-h5 q-mb-md">Image Paths</div>
              <div class="subheading">Watch folders</div>
              <WatchFolderChooser alias="Hello World" definition="I:\\ModelSight"></WatchFolderChooser>
              <q-btn color="primary" no-caps label="New Watch Folder" icon="add"></q-btn>
              <q-space class="q-my-md"></q-space>
              <q-input dense outlined label="Default Folder" v-model="$settingsStore.imageRootFolder"></q-input>
              <q-separator class="q-my-lg"></q-separator>
              <div class="text-h5 q-mb-md">Image Options</div>
              <div>Watch folders</div>
              <q-input dense outlined label="Default Folder" v-model="$settingsStore.videoRootFolder"></q-input>
              <q-separator class="q-my-lg"></q-separator>
              <div class="text-h5 q-mb-md">Image Tags</div>
              <div>
                <q-chip label="Lesbian" clickable color="accent" removable></q-chip>
                <q-chip label="Big Dick" clickable color="accent" removable></q-chip>
                <q-input outlined dense type="text" label="Add tag" class="q-mt-md"></q-input>
              </div>
            </q-tab-panel>
            <q-tab-panel name="videos">
              <div class="text-h5 q-mb-md">Video Paths</div>
              <div>Watch folders</div>
              <div>Base path</div>
              <q-separator class="q-my-lg"></q-separator>
              <div class="text-h5 q-mb-md">Video Options</div>
              <q-toggle label="Single audio focus"></q-toggle>
              <q-toggle label="Mouse hover audio"></q-toggle>
              <q-separator class="q-my-lg"></q-separator>
              <div class="text-h5 q-mb-md">Video Tags</div>
              <div>
                <q-chip label="Lesbian" clickable color="accent" removable></q-chip>
                <q-chip label="Big Dick" clickable color="accent" removable></q-chip>
                <q-input outlined dense type="text" label="Add tag" class="q-mt-md"></q-input>
              </div>
            </q-tab-panel>
            <q-tab-panel name="renamer">
              <div class="text-h5 q-mb-md">Image Renamer</div>
              <div>Image rename template</div>
              <div>Default Destination folder</div>
              <q-toggle label="Rename in place"></q-toggle>
              <q-separator class="q-my-lg"></q-separator>
              <div class="text-h5 q-mb-md">Video Renamer</div>
              <div>Video rename template</div>
              <div>Default Destination folder</div>
              <q-toggle label="Rename in place"></q-toggle>
            </q-tab-panel>
            <q-tab-panel name="integrations">
              <div class="text-h5 q-mb-md">OpenAI</div>
              <q-input v-model="$settingsStore.openAIKey" outlined label="OpenAI Key"></q-input>
              <q-separator class="q-my-lg"></q-separator>
              <div class="text-h5 q-mb-md">FFMpeg</div>
              <q-input outlined type="text" dense label="FFMpeg Path" class="q-mt-md"></q-input>
              <q-btn class="q-mt-sm" size="sm" label="Check for updates" color="accent"></q-btn>
            </q-tab-panel>

            <q-tab-panel name="models">
              <div class="text-h5 q-mb-md">Model Directory</div>
              <q-select outlined v-model="selectedModel" options-dense :options="modelList" label="Model List" use-input
                        new-value-mode="add-unique"
                        @new-value="handleNewModel" option-label="name"></q-select>
              <q-separator class="q-my-lg"></q-separator>
              <div class="text-h5 q-mb-md">Model Tags</div>
              <div>
                <q-chip label="Fashion model" clickable color="accent" removable></q-chip>
                <q-chip label="Celebrity" clickable color="accent" removable></q-chip>
                <q-chip label="British" clickable color="accent" removable></q-chip>
                <q-input outlined dense type="text" label="Add tag" class="q-mt-md"></q-input>
              </div>
            </q-tab-panel>

            <q-tab-panel name="privacy">
              <div class="text-h5 q-mb-md">Privacy Settings</div>
              <div>Panic Key definition</div>
              <div>Panic Media</div>
              <div>Require password</div>
            </q-tab-panel>

            <q-tab-panel name="database">
              <div class="text-h4 q-mb-md">Database Maintenance</div>
              <div>Backup database</div>
              <div>Restore database</div>
              <div>Add/Edit/Remove database entries</div>
              <div>Move to temp trash</div>
            </q-tab-panel>
          </q-tab-panels>
        </template>

      </q-splitter>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">

import {onBeforeMount, ref} from "vue";
import {getModels, storeModel} from "src/services/DatabaseController";
import {getAllModels} from "src/services/ModelController";
import {createUUID} from "../../shared/Utils";
import {useSettingsStore} from "stores/settings-store";
import WatchFolderChooser from "components/WatchFolderChooser.vue";

const $settingsStore = useSettingsStore();

const tab = ref('videos')
const splitterModel = ref(12);
const modelList = ref<IModel[]>([]);

onBeforeMount(async () => {
  modelList.value = await getAllModels();
})

const handleNewModel = async (val: string, done: any) => {
  const modelObject: IModel = {
    id: createUUID(),
    name: val,
    tags: [] as IMediaTag[]
  }
  await storeModel(modelObject)
}
</script>

<style lang="scss">
.settings-dialog {
  width: 800px;
  border: 2px solid $accent;

  .subheading {
    font-size: 16px;
    margin-bottom: 10px;
  }
}
</style>
