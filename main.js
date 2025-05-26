import { app, Tray, BrowserWindow, Menu, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import Store from 'electron-store';
import isDev from 'electron-is-dev';
import { spawn } from 'child_process';
import { activeWindow as getActiveWindow } from '@deepfocus/get-windows';
import { updateElectronApp } from 'update-electron-app';
updateElectronApp()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTRAY_ICON = (process.platform === 'darwin') ? path.join(__dirname, '/assets/images/icon_18x18.png') : path.join(__dirname, '/assets/images/icon.png');
const SYSTRAY_ICON_OFF = (process.platform === 'darwin') ? path.join(__dirname, '/assets/images/icon_off_18x18.png') : path.join(__dirname, '/assets/images/icon_off.png');
const ICON = path.join(__dirname, '/assets/images/icon.png');
const gotTheLock = app.requestSingleInstanceLock();

function showIfAble() { // focus the existing window if it exists
    if (bgwin) {
        bgwin.show();
        bgwin.focus();
    }
}

function setDisable(value) {
    value = preferences.get('always_enabled') ? false : value;
    if (disabled === value) return;
    disabled = value;
    if (tray) {
        tray.setImage(disabled?SYSTRAY_ICON_OFF:SYSTRAY_ICON);
        tray.setToolTip(disabled?'Animalese Typing: Disabled':'Animalese Typing');
    }
    if (disabled) stopKeyListener(); else startKeyListener();
}

if (!gotTheLock) app.quit(); // if another instance is already running then quit
else app.on('second-instance', () => showIfAble()); // show instance that is running

app.setAppUserModelId('com.joshxviii.animalese-typing');

const defaults = {
    lang: 'en',
    volume: 0.5,
    audio_mode: 0,
    always_enabled: true,
    enabled_apps: [],
    voice_profile: {
        voice_type: 'f2',
        pitch_shift: 0.0,
        pitch_variation: 0.2,
        intonation: 0.0
    },
    saved_voice_profiles: new Map(),
    remapped_keys: new Map()
}

const preferences = new Store({
    defaults: defaults
});

ipcMain.on('get-store-data-sync', (e) => {
    e.returnValue = preferences.store;
});
ipcMain.handle('store-set', async (e, key, value) => {
    preferences.set(key, value);
    bgwin.webContents.send(`updated-${key}`, value);
});
ipcMain.handle('store-reset', async (e) => {// set settings to default and trigger store update messages
    const resetable = [
        'audio_mode',
        'voice_profile',
        'saved_voice_profiles',
        'remapped_keys',
        'enabled_apps',
        'always_enabled'
    ];
    resetable.forEach(r=>{
        preferences.reset(r);
        bgwin.webContents.send(`updated-${r}`, defaults[r]);
    });
});
ipcMain.on('close-window', (e) => {
    if (bgwin) bgwin.close();
});
ipcMain.on('minimize-window', (e) => {
    if (bgwin) bgwin.minimize();
});
ipcMain.on('remap-key-press', (e, data) => {
    if (bgwin) bgwin.webContents.send(`remap-key-set`, data);
});
ipcMain.on('get-app-info', (e) => {
    e.returnValue = {
        version: app.getVersion(),
        name: app.getName(),
        platform: process.platform
    }
});

var bgwin = null;
var tray = null;
var disabled = !preferences.get('always_enabled');
let lastActiveWindow = null;
let activeWindows = [];

// check for active window changes and update `lastActiveWindow` when the window changes
async function monitorActiveWindow() {
    const activeWindow = await getActiveWindow();

    if (!activeWindow?.owner?.name) return;// return early if invlaid window

    const winName = activeWindow.owner.name
    if (winName === lastActiveWindow?.owner?.name) return;// return early if the active window hasn't changed.
    
    const enabledApps = preferences.get('enabled_apps');

    // change disable value when focusing in or out of an animalese-enabled app.
    setDisable( !(enabledApps.includes(winName) || activeWindow?.owner?.processId === process.pid) )

    lastActiveWindow = activeWindow;
    if (!activeWindows.includes(winName)) {
        activeWindows.push(winName);
        if (activeWindows.length > 8) activeWindows.shift();
        bgwin.webContents.send(`active-windows-updated`, activeWindows);
    }
}

function startActiveWindowMonitoring() {
    setInterval(monitorActiveWindow, 500); // check window every .5 seconds
}
function createMainWin() {
    if(bgwin !== null) return;
    bgwin = new BrowserWindow({
        width: 720,
        height: 360,
        icon: ICON,
        resizable: true,
        frame: false,
        skipTaskbar: false,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false
        }
    });
    bgwin.removeMenu();
    bgwin.loadFile('editor.html');
    bgwin.setAspectRatio(2);
    bgwin.setMinimumSize(720, 360);
    
    bgwin.on('close', function (e) {
        if (!app.isQuiting) {
            if (process.platform === 'darwin') app.dock.hide();
            e.preventDefault();
            bgwin.hide();
        }
        return false;
    });

    bgwin.on('closed', function () {
        bgwin = null;
    });

    bgwin.webContents.on('before-input-event', (e, input) => {
        if (input.control && input.shift && input.key.toLowerCase() === 'i') {
            const wc = bgwin.webContents;
            if (wc.isDevToolsOpened()) wc.closeDevTools();
            else  wc.openDevTools({ mode: 'detach' });
            e.preventDefault();
        }
    });
}

function createTrayIcon() {
    if(tray !== null) return; // prevent dupe tray icons

    tray = new Tray(SYSTRAY_ICON);
    tray.setToolTip('Animalese Typing');

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show Settings',
            click: () => { showIfAble(); }
        },
        {
            label: 'Run on startup',
            type: 'checkbox',
            checked: app.getLoginItemSettings().openAtLogin,
            click: (menuItem) => {
                const settings = {
                    openAtLogin: menuItem.checked,
                    openAsHidden: true,
                };
                if (process.platform === 'win32') settings.path = app.isPackaged ? app.getPath('exe') : process.execPath;

                app.setLoginItemSettings(settings);
            }
        },
        {
            label: 'Quit',
            click: () => {
                stopKeyListener();
                app.quit();
            }
        }
    ]);
    tray.setContextMenu(contextMenu);
    // On Windows, clicking shows the window, while on macOS it shows the context menu
    if (process.platform != 'darwin') tray.on('click', () => { showIfAble(); });
    tray.displayBalloon({
        title: "Animalese Typing",
        content: "Animalese Typing is Running!"
    });
}

let keyListener;

async function startKeyListener() {
    const platform = process.platform;
    let listenerPath;

    if (platform === 'win32') {
        listenerPath = isDev
            ? path.join(__dirname, 'libs', 'key-listeners', 'animalese-listener.exe')
            : path.join(process.resourcesPath, 'animalese-listener.exe');
    } else if (platform === 'darwin') {
        listenerPath = isDev
            ? path.join(__dirname, 'libs', 'key-listeners', 'swift-key-listener')
            : path.join(process.resourcesPath, 'swift-key-listener');
    } else if (platform === 'linux') {
        //TODO: create linux key listener
    } else {
        console.error('Unsupported platform');
        return;
    }

    keyListener = spawn(listenerPath);
    keyListener.stdout.on('data', data => {
        const lines = data.toString().split('\n').filter(Boolean);

        for (const line of lines) {
            if (line.toLowerCase().includes('accessibility') || line.toLowerCase().includes('permission')) {
                bgwin.webContents.send('permission-error', line);
                continue;
            }
            try {
                const event = JSON.parse(line);
                if (event.type === 'keydown' || event.type === 'keyup') {
                    bgwin.webContents.send(event.type, {
                        keycode: event.keycode,
                        shiftKey: event.shift
                    });
                }
            } catch (err) {
                console.error(`Invalid JSON from ${platform}:`, line);
            }
        }
    });
    keyListener.stderr.on('data', data => {
        console.error(`${platform} error:`, data.toString());
    });
}

function stopKeyListener() {
    if (keyListener) {
        keyListener.kill();
        keyListener = null;
    }
}

app.whenReady().then(() => {
    startActiveWindowMonitoring();
    createMainWin();
    createTrayIcon();
    if (!disabled) startKeyListener();
    if (process.platform === 'darwin') app.dock.hide();
    bgwin.hide();
});

app.on('activate', function () {
    if (bgwin === null) createMainWin();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
    stopKeyListener();
    if (keyListener) {
        keyListener.kill('SIGKILL');
        keyListener = null;
    }
    if (bgwin) {
        bgwin.removeAllListeners();
        bgwin.close();
    }
    if (tray) tray.destroy();

    ipcMain.removeAllListeners();
});

app.on('quit', () => {
    if (keyListener) {
        keyListener.kill('SIGKILL');
    }
    app.exit(0);
});

export default app;