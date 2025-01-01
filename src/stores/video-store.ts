import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('playerstore', {
  state: () => ({
    playerList: [] as any,
    registeredPlayers: [] as string[]
  }),
  getters: {

  },
  actions: {
    getVideoPlayerState(_playerId:string) {
      return this.playerList.find((player:any) => player.playerId === _playerId);
    },
    triggerReregister() {
      this.playerList = [];
      this.registeredPlayers = [];
    },
    registerPlayerWithStore(_playerId:string, _playerState:any) {
      if (this.registeredPlayers.includes(_playerId)) {
        return
      }
      this.registeredPlayers.push(_playerId);
      this.playerList.push({playerId: _playerId, playerState: _playerState});
    },
    setVolume(_playerId:string, _volume:number) {
      for (const player of this.playerList) {
        if (player.playerId === _playerId) {
          player.playerState.volume = _volume;
        } else {
          player.playerState.volume = 0;
        }
      }
    },
    requestSwap(_sourceId:string, _destinationId:string) {
      const sourcePlayer = this.playerList.find((player:any) => player.playerState.gridLocation === _sourceId);
      const destinationPlayer = this.playerList.find((player:any) => player.playerState.gridLocation === _destinationId);
      if (sourcePlayer && destinationPlayer) {
        const temp = sourcePlayer.playerState.gridLocation;
        sourcePlayer.playerState.gridLocation = destinationPlayer.playerState.gridLocation;
        destinationPlayer.playerState.gridLocation = temp;
      }
    }
  },
});
