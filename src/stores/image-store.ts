import {defineStore} from 'pinia';
import {
  deleteImage,
  deleteMedia,
  getMedia,
  getPlaylists,
  storeImage,
  storeMedia
} from "src/services/DatabaseController";
import {toRaw} from "vue";
import {createUUID} from "../../shared/Utils";

export const useImageStore = defineStore('images', {
  state: () => ({
    imageMedia: [] as IMediaImage[],
    mediaTags: [
      {label: 'Lesbian', id: createUUID()}
    ] as IMediaTag[],
    shortcuts: [] as IShortCut[]
  }),
  getters: {
    getSelectedFiles(): IMediaImage[] {
      return this.imageMedia.filter((media: { isSelected: any; }) => media.isSelected);
    },
    getAllTags(): IMediaTag[] {
      return this.mediaTags;
    }
  },
  actions: {
    getMediaById(_id: string) {
      return this.imageMedia.find((media) => media.id === _id);
    },
    async retrieveFromDB() {
      this.imageMedia = await getMedia();
      for (const video of this.imageMedia) {
        video.isSelected = false;
      }
    },
    async addMediaToStore(_media: IMediaVideo[]) {
      for (const addedImage of _media) {
        await storeMedia(addedImage);
      }
      this.imageMedia.push(..._media);
    },
    async updateMediaInStore(_media: IMediaVideo) {
      let foundMediaItem = this.getMediaById(_media.id)
      if (foundMediaItem) {
        foundMediaItem.isSelected = false;
        foundMediaItem.fileName = _media.fileName;
        foundMediaItem.metaData = _media.metaData;
        foundMediaItem.tags = {..._media.tags};
        const foundMediaItemRaw = {...toRaw(foundMediaItem)};
        await storeImage(foundMediaItemRaw);
      }
    },
    async removeMediaFromStore(_media: IMediaImage) {
      let foundMediaItem = this.getMediaById(_media.id)
      if (foundMediaItem) {
        await deleteImage(foundMediaItem);
        this.imageMedia.splice(this.imageMedia.indexOf(foundMediaItem), 1);
      }
    },
    async addTagToMedia(_media: IMediaVideo[], _tag: IMediaTag) {
      for (const _mediaItem of _media) {
        let foundMediaItem = this.getMediaById(_mediaItem.id)
        if (foundMediaItem) {
          foundMediaItem.tags.push(_tag);
          await storeImage(toRaw(foundMediaItem));
        }
      }
    },
    async addNewTag(_newTagName:any) {
      this.mediaTags.push({id: createUUID(), label: _newTagName});
    }
  },
});
