import {defineStore} from 'pinia';
import {createUUID} from "../../shared/Utils";

export const usePlaylistStore = defineStore('playlist', {
  state: () => ({
    currentPlaylist: {} as IPlaylist,
    allPlaylists: [] as IPlaylist[]
  }),
  getters: {},
  actions: {
    setCurrentPlaylist(_id: string) {
      this.currentPlaylist = this.allPlaylists.find(playlist => playlist.id === _id) as IPlaylist;
    },
    setDefaultPlaylist() {
      this.currentPlaylist = this.allPlaylists[0];
    },
    async retrieveFromDB() {
      this.allPlaylists = await getPlaylists();
    },
    async saveSinglePlaylistToDb(_playlist: IPlaylist) {
      await storePlaylist(_playlist);
      await this.retrieveFromDB();
    },
    async saveCurrentPlaylistToDb() {
      await storePlaylist(this.currentPlaylist);
      await this.retrieveFromDB();
    },
    async createNewBlankPlaylist(_playlistName: string) {
      const newPlaylist: IPlaylist = {
        name: _playlistName,
        id: createUUID(),
        files: []
      }
      this.allPlaylists.push(newPlaylist);
      await this.saveSinglePlaylistToDb(newPlaylist);
    },
    async removeAFileFromPlaylist(_playlistId: string, _fileId: string) {

    },
    async addFilesToPlaylist(_playlistId: string, _files: IMediaVideo[]) {
      // Find the playlist by id
      const playlist = this.allPlaylists.find((playlist) => playlist.id === _playlistId);
      playlist?.files.push(..._files.map((file, index) => {
        return {
          ...file,
          id: createUUID(),
        }
      }));
      await this.saveSinglePlaylistToDb(playlist as IPlaylist);
    }
  }
});
