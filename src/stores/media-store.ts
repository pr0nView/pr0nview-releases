import {defineStore} from 'pinia';
import {toRaw} from "vue";
import {createUUID} from "../../shared/Utils";

export const useMediaStore = defineStore('media', {
  state: () => ({
    videoMedia: [] as IMediaVideo[],
    imageMedia: [] as MediaImage[]
  }),
  getters: {
    getSelectedFiles(): IMediaVideo[] {
      return this.videoMedia.filter((media: { isSelected: any; }) => media.isSelected);
    },
    getAllTags(): IMediaTag[] {
      return this.mediaTags;
    }
  },
  actions: {
    getMediaById(_id: string) {
      return this.videoMedia.find((media) => media.id === _id);
    },
    async retrieveFromDB() {
      this.videoMedia = await getMedia();
      for (const video of this.videoMedia) {
        video.isSelected = false;
        video.isConverting = false;
      }
    },
    async addMediaToStore(_media: IMediaVideo[]) {
      for (const addedVideo of _media) {
        await storeMedia(addedVideo);
      }
      this.videoMedia.push(..._media);
    },
    async updateMediaInStore(_media: IMediaVideo) {
      let foundMediaItem = this.getMediaById(_media.id)
      if (foundMediaItem) {
        foundMediaItem.isSelected = false;
        foundMediaItem.isConverting = false;
        foundMediaItem.fileName = _media.fileName;
        foundMediaItem.metaData = _media.metaData;
        foundMediaItem.tags = {..._media.tags};
        const foundMediaItemRaw = {...toRaw(foundMediaItem)};
        await storeMedia(foundMediaItemRaw);
      }
    },
    async removeMediaFromStore(_media: IMediaVideo) {
      let foundMediaItem = this.getMediaById(_media.id)
      if (foundMediaItem) {
        await deleteMedia(foundMediaItem);
        this.videoMedia.splice(this.videoMedia.indexOf(foundMediaItem), 1);
      }
    },
    async addTagToMedia(_media: IMediaVideo[], _tag: IMediaTag) {
      for (const _mediaItem of _media) {
        let foundMediaItem = this.getMediaById(_mediaItem.id)
        if (foundMediaItem) {
          foundMediaItem.tags.push(_tag);
          await storeMedia(toRaw(foundMediaItem));
        }
      }
    },
    async addNewTag(_newTagName:any) {
      this.mediaTags.push({id: createUUID(), label: _newTagName});
    }
  },
});
