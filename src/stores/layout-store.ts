import {defineStore} from 'pinia';
import {getLayouts, storeLayout} from "src/services/DatabaseController";
import {createUUID} from "../../shared/Utils";

export const useLayoutStore = defineStore('layoutstore', {
  state: () => ({
    layouts: <ILayout[]>[
      {
        gridColumns: `repeat(4, 1fr)`,
        gridRows: `repeat(4, 1fr)`,
        gridAreas: `"video1 slideshow1 slideshow1 video2"
                    "video3 slideshow1 slideshow1 video4"
                    "video5 slideshow1 slideshow1 video6"
                    "video7 slideshow1 slideshow1 video8"`,
        videoCount: 8,
        slideshowCount: 1,
        id: '1234'
      },
      {
        gridColumns: `repeat(4, 1fr)`,
        gridRows: `repeat(4, 1fr)`,
        gridAreas: `"video1 video2 slideshow1 video3"
                    "video4 video5 slideshow1 video6"
                    "video7 video8 slideshow2 video9"
                    "video10 video11 slideshow2 video12"`,
        videoCount: 12,
        slideshowCount: 2,
        id: '5678'
      },
      {
        gridColumns: `repeat(4, 1fr)`,
        gridRows: `repeat(3, 1fr)`,
        gridAreas: `"video1 video2 slideshow1 video3"
                    "video4 video5 slideshow1 video6"
                    "video7 video8 slideshow1 video9"`,
        videoCount: 9,
        slideshowCount: 1,
        id: '2345'
      },
      {
        gridColumns: `repeat(5, 1fr)`,
        gridRows: `repeat(3, 1fr)`,
        gridAreas: `"video1 slideshow2 slideshow2 slideshow1 slideshow1"
                    "video1 slideshow2 slideshow2 slideshow1 slideshow1"
                    "video2 slideshow2 slideshow2 slideshow1 slideshow1"`,
        videoCount: 2,
        slideshowCount: 2,
        id: '3456'
      },
      {
        gridColumns: `repeat(2, 1fr)`,
        gridRows: `repeat(2, 1fr)`,
        gridAreas: `"video1 video2" "video3 video4"`,
        videoCount: 4,
        slideshowCount:0,
        id: '6985'
      },
    ] as ILayout[],
    currentLayout: 0
  }),
  getters: {
    getCurrentLayout(): ILayout {
      return this.layouts[this.currentLayout];
    }
  },
  actions: {
    async retrieveFromDB() {
      this.layouts = await getLayouts();
    },
    async saveActiveLayout() {
      await storeLayout(this.layouts[this.currentLayout]);
    },
    async saveDefaultLayouts() {
      for (const layout of this.layouts) {
        await storeLayout(layout);
      }
    },
    setLayout(layoutId: any) {
      this.currentLayout = layoutId;
    },
    getLayoutById(layoutId: any) {
      return this.layouts[layoutId];
    }
  },
});
