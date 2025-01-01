import {defineStore} from 'pinia';
import {SORT_BY} from "../../shared/Settings";

enum CursorMode {
  Move = 'move',
  Audio = 'audio',
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    presentationMode: false,
    cursorMode: CursorMode.Move,
    mediaLibrary: {
      previewWithSound: false,
      sortBy: SORT_BY.NAME
    },
    imageLibrary: {
      sortBy: SORT_BY.NAME
    },
    menuItems: <{ label: string, icon: string, caption: string, path: string }[]>[
      {
        label: 'Grid Display',
        icon: 'grid_view',
        caption: 'Show the grid',
        path: '/display'
      },
      {
        label: 'Settings',
        icon: 'settings',
        caption: 'Set it up',
        path: '/settings'
      }
    ],
    audioSetup: {
      inputDevice: '',
      inputDeviceId: 0
    },
    showFullScreenLoader: true,
    fullScreenLoaderText: 'Performing bootup tasks',
    password: '',
    repeatPassword: '',
    panicButton: 'Crtl-X',
  }),
  getters: {},
  actions: {
    setPresentationMode(_mode: boolean) {
      this.presentationMode = _mode;
    },
    setAudioInputDevice(_device: string) {
      this.audioSetup.inputDevice = _device;
    },
    setLoading(state: boolean, caption?: string) {
      if (caption) this.fullScreenLoaderText = caption;
      this.showFullScreenLoader = state;
    }
  },
});
