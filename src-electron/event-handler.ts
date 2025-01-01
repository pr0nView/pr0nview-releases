import {app, BrowserWindow, dialog, ipcMain} from "electron";
import {MAIN_REQUESTS} from "../shared/Settings";
import {fileFind, recursiveFileFind} from "./electron-utils";
import sizeOf from 'image-size';
import Case from 'case';
import * as si from 'systeminformation';
import fs from "fs";
import path from "path";


export function useHandler(_mainWindow: BrowserWindow) {

  ipcMain.handle(MAIN_REQUESTS.GET_APP_PATH, async () => {
    return `${app.getPath('appData')}\\${app.getName()}\\`
  });

  ipcMain.handle(MAIN_REQUESTS.DELETE_MEDIA, async (event, mediaItem: IMediaVideo) => {
    const inputPath = mediaItem.filePath + '\\' + mediaItem.fileName;
    fs.unlink(inputPath, (err) => {
      if (err) console.log(err); //handle your error the way you want to;
      console.log(`${inputPath} was deleted`);//or else the file will be deleted
    });
  });

  ipcMain.handle(MAIN_REQUESTS.GET_WINDOWS_DRIVES, async (event, mediaItem: IMediaVideo) => {
    return await si.fsSize();
  });

  ipcMain.handle(MAIN_REQUESTS.RENAME_FILE, async (event, imageRootFolder: string, images: string[], metaData: IMeta, renameStrategy: string[], delimiter: string) => {
    console.log(metaData);
    const rootFolder = `i:\\Transcend\\New`;
    const modelNameCapitalised: string = Case.capital(metaData.modelName);
    console.log(`modelName is ${modelNameCapitalised}`)
    let renameList: string[] = [];
    if (metaData.photographer) renameList.push(metaData.photographer);
    if (metaData.publication) renameList.push(metaData.publication);
    if (metaData.year) renameList.push(metaData.year.toString());
    const renameString = renameList.join(` - `);
    const finalModelFolder: string = `${rootFolder}\\${modelNameCapitalised}\\${modelNameCapitalised} - ${renameString}`;

    // If the model folder already exists
    if (fs.existsSync(finalModelFolder)) {
      console.log('Folder exists.');
    } else {
      console.log('Folder does not exist.');
      fs.mkdirSync(finalModelFolder, {recursive: true});
    }
    // First find the last item in the target directory
    const existingFiles = fs.readdirSync(finalModelFolder);
    let currentCounter: number = existingFiles.length || 0;
    // Loop through files and rename/move
    for (const imageFile of images) {
      currentCounter++;
      const finalImageExtension: string = path.extname(imageFile);
      // Find the image size
      const dimensions = sizeOf(`${imageFile}`);
      const imageCounter: string = currentCounter.toString().padStart(4, '0');

      const renamedFile: string = `${finalModelFolder}\\${modelNameCapitalised} - ${imageCounter} - ${renameString} - ${dimensions.width}x${dimensions.height}${finalImageExtension}`;
      console.log(renamedFile);
      fs.copyFileSync(imageFile, renamedFile)
    }
  });

  ipcMain.handle(MAIN_REQUESTS.GET_FILES_AND_FOLDERS, async (event, path: string) => {
    const files = fs.readdirSync(path, {withFileTypes: true});
    console.log(files);
    return files.map(file => ({
      name: file.isDirectory() ? file.name : encodeURI(file.name.replace('#', '%23')),
      path: path,
      isDirectory: file.isDirectory(),
    }));
  });

  ipcMain.handle(MAIN_REQUESTS.CHOOSE_FOLDER, async (event, openFolderEvent: IOpenFolderEvent) => {
    return await dialog.showOpenDialog({
      properties: ['openDirectory']
    })
  });

  ipcMain.handle(MAIN_REQUESTS.OPEN_FOLDER_BROWSER, async (event, openFolderEvent: IOpenFolderEvent) => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'], defaultPath: openFolderEvent.rootFolder
    });
    return await recursiveFileFind(result.filePaths, openFolderEvent.builderId, openFolderEvent.fileTypes, 0, _mainWindow)
  });

  ipcMain.handle(MAIN_REQUESTS.OPEN_FILE_BROWSER, async (event, openFileEvent: IOpenFilesEvent) => {
    let filterExtensions = openFileEvent.fileTypes.map((format: string) => {
      return `*${format}`
    })
    const filters: IFileFilters = {
      name: openFileEvent.mediaType === 'video' ? `Videos (${filterExtensions.join(',')})` : `Images (${filterExtensions.join(',')})`,
      extensions: openFileEvent.fileTypes.map((ext: string) => {
        return ext.slice(1);
      })
    }
    const result = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'], defaultPath: openFileEvent.rootFolder, filters: [filters]
    });
    return await fileFind(result.filePaths, openFileEvent.builderId, openFileEvent.fileTypes, 0, _mainWindow);
  });

  ipcMain.handle(MAIN_REQUESTS.DRAG_DROP_FILES, async (event, params) => {
    return await recursiveFileFind(params.allFiles, params.playerId, params.fileTypes, 0, _mainWindow);
  });
}
