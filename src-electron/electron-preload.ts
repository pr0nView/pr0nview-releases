import {contextBridge, ipcRenderer, dialog} from 'electron'
import loudness from "loudness";
import {MAIN_REQUESTS} from "../shared/Settings";
import {webUtils} from 'electron'

contextBridge.exposeInMainWorld('api', {
  readFiles: async (fileList: File[], playerId: string, fileTypes: string[]) => {
    const allFiles: any = fileList.map((file: File) => {
      return webUtils.getPathForFile(file);
    })
    return await ipcRenderer.invoke(MAIN_REQUESTS.DRAG_DROP_FILES, {allFiles, playerId, fileTypes});
  },
  setVolume: async (_volume: number) => {
    await loudness.setVolume(_volume);
  },
  getWindowsDrives: async () => {
    return await ipcRenderer.invoke(MAIN_REQUESTS.GET_WINDOWS_DRIVES);
  },
  openFileBrowser: async (openFileEvent: IOpenFilesEvent) => {
    return await ipcRenderer.invoke(MAIN_REQUESTS.OPEN_FILE_BROWSER, openFileEvent);
  },
  openFolderBrowser: async (openFolderEvent: IOpenFolderEvent) => {
    return await ipcRenderer.invoke(MAIN_REQUESTS.OPEN_FOLDER_BROWSER, openFolderEvent);
  },
  renameFile: async (rootFolder: any, fileList: IMediaImage[], modelName: string, renameStrategy: any, delimiter: string) => {
    return await ipcRenderer.invoke(MAIN_REQUESTS.RENAME_FILE, rootFolder, fileList, modelName, renameStrategy, delimiter);
  },
  saveConfig: async (saveInformation: ISaveFile): Promise<boolean> => {
    return await ipcRenderer.invoke('saveConfig', saveInformation);
  },
  getAppPath: async (): Promise<string> => {
    return await ipcRenderer.invoke(MAIN_REQUESTS.GET_APP_PATH);
  },
  chooseFolder: async (): Promise<string> => {
    return await ipcRenderer.invoke(MAIN_REQUESTS.CHOOSE_FOLDER);
  },
  databaseCall: async (databaseCallId: string, args: any): Promise<any> => {
    return await ipcRenderer.invoke(MAIN_REQUESTS.DATABASE_CALL, databaseCallId, args);
  },
  receive: (channel: string, func: (args: any) => void) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args))
  }
})

