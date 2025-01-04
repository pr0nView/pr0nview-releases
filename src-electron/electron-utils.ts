import fs from "fs";
import {RESPONSES} from "../shared/Settings";
import path from "path";
import {isVideoOrImage} from "../shared/Utils";
import sizeOf from 'image-size';
import mediaInfoFactory from 'mediainfo.js'
import type {MediaInfo, ReadChunkFunc} from 'mediainfo.js'
import Case from 'case';

let recursiveFileCount = 0;
let fileCount = 0;
let mediainfo: MediaInfo | undefined;

export async function recursiveFileFind(fileList: any, builderId: string, fileTypes: string[], startAt: number, receiverWindow?: any) {
  let returnFiles: any[] = [];
  for (const fileEntry of fileList) {
    const foundFile = await fs.promises.stat(fileEntry);
    if (foundFile.isFile() && fileTypes.includes(path.extname(fileEntry).toLowerCase())) {
      recursiveFileCount++;
      if (isVideoOrImage(fileEntry) === 'video') {
        returnFiles.push({
          type: 'video',
          filePath: splitFileName(fileEntry).path,
          fileName: splitFileName(fileEntry).filename
        });
      } else if (isVideoOrImage(fileEntry) === 'image') {
        try {
          returnFiles.push({
            type: 'image',
            filePath: splitFileName(fileEntry).path,
            fileName: splitFileName(fileEntry).filename
          });
        } catch(e) {
          console.error(e);
        }
      }
      if (receiverWindow) receiverWindow.webContents.send(builderId, {
        type: RESPONSES.FILE_COUNT,
        data: recursiveFileCount
      });
    } else if (foundFile.isDirectory()) {
      const directoryContents = await fs.promises.readdir(fileEntry);
      const directoryFiles = directoryContents.map((file) => {
        return `${fileEntry}\\${file}`
      })
      const subFiles = await recursiveFileFind(directoryFiles, builderId, fileTypes, recursiveFileCount, receiverWindow);
      returnFiles = returnFiles.concat(subFiles);
      if (receiverWindow) receiverWindow.webContents.send(builderId, {
        type: RESPONSES.FILE_COUNT,
        data: recursiveFileCount
      });
    }
  }
  return returnFiles;
}

export async function fileFind(fileList: any[], builderId: string, fileTypes: string[], startAt: number, receiverWindow?: any) {
  fileCount = startAt;
  let returnFiles: any[] = [];
  for (const fileEntry of fileList) {
    const foundFile = await fs.promises.stat(fileEntry);
    if (foundFile.isFile() && fileTypes.includes(path.extname(fileEntry).toLowerCase())) {
      if (receiverWindow) receiverWindow.webContents.send(builderId, {
        type: RESPONSES.FILE_COUNT,
        data: fileCount
      });
      if (isVideoOrImage(fileEntry.path) === 'video') {
        returnFiles.push({
          type: 'video',
          filePath: splitFileName(fileEntry).path,
          fileName: splitFileName(fileEntry).filename
        });
      } else {
        returnFiles.push({
          type: 'image',
          filePath: splitFileName(fileEntry).path,
          fileName: splitFileName(fileEntry).filename
        });
      }
    }
  }
  return returnFiles;
}

export function splitFileName(_filePath: string) {
  const lastSlashIndex = _filePath.lastIndexOf('\\');
  const path = _filePath.substring(0, lastSlashIndex);
  const name = _filePath.substring(lastSlashIndex + 1);
  return {
    path: path,
    filename: name
  };
}

async function getVideoInfo(_filePath: string, size: number): Promise<any> {
  let fileHandle: fs.promises.FileHandle | undefined;
  const readChunk: ReadChunkFunc = async (size, offset) => {
    if (fileHandle === undefined) {
      throw new Error('File unavailable')
    }
    const buffer = new Uint8Array(size)
    await fileHandle.read(buffer, 0, size, offset)
    return buffer
  }

  fileHandle = await fs.promises.open(_filePath, 'r')

  const mediaMetaData = await mediainfo.analyzeData(() => size, readChunk);
  await fileHandle.close();
  return convertKeysToCamelCase(mediaMetaData.media.track[0]);
}

function convertKeysToCamelCase(obj: any) {
  const result = {};

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) { // Ensure it's the object's own property
      const camelCaseKey = Case.camel(key); // Convert the key to camelCase
      result[camelCaseKey] = obj[key]; // Add to the new object
    }
  }

  return result;
}


