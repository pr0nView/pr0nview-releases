import {app, BrowserWindow, nativeTheme, net, protocol, Menu} from 'electron';
import path from 'path';
import os from 'os';
import fs from 'fs';
import {useHandler} from "./event-handler";
import {fileURLToPath} from 'url'
import {CUSTOM_PROTOCOL} from "../shared/Settings";
const platform = process.platform || os.platform();
const currentDir = fileURLToPath(new URL('.', import.meta.url));

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors) {
    fs.unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    );
  }
} catch (_) {
}

let mainWindow: BrowserWindow | undefined;

protocol.registerSchemesAsPrivileged([
  {
    scheme: CUSTOM_PROTOCOL.IMAGE,
    privileges: {
      secure: true,
      supportFetchAPI: true,
      bypassCSP: true
    }
  }
]);

protocol.registerSchemesAsPrivileged([
  {
    scheme: CUSTOM_PROTOCOL.VIDEO,
    privileges: {
      secure: true,
      supportFetchAPI: true,
      bypassCSP: true,
      stream: true
    }
  }
]);

async function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(currentDir, 'icons/icon.png'), // tray icon
    width: 1920,
    height: 1080,
    fullscreen: false,
    useContentSize: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.resolve(
        currentDir,
        path.join(process.env.QUASAR_ELECTRON_PRELOAD_FOLDER, 'electron-preload' + process.env.QUASAR_ELECTRON_PRELOAD_EXTENSION)
      ),
    },
  });

  if (process.env.DEV) {
    await mainWindow.loadURL(process.env.APP_URL);
  } else {
    Menu.setApplicationMenu(null);
    await mainWindow.loadFile('index.html');
  }

  if (process.env.DEBUGGING) {
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

app.whenReady().then(() => {
    protocol.handle(CUSTOM_PROTOCOL.IMAGE, async (req) => {
      const pathToMedia = new URL(req.url).pathname;
      return net.fetch(`file://${pathToMedia}`);
    });
    protocol.registerFileProtocol(CUSTOM_PROTOCOL.VIDEO, (request, callback) => {
      const url = request.url.replace(`${CUSTOM_PROTOCOL.VIDEO}://`, "");
      try {
        return callback(decodeURIComponent(url));
      } catch (error) {
        // Handle the error as needed
        console.error(error);
      }
    });
    createWindow().then(() => {
      useHandler(mainWindow!);
    });
  }
).catch((e) => {
  console.log(e)
});

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  if (mainWindow === undefined) {
    await createWindow();
  }
});



