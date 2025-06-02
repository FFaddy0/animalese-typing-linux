import { app, Tray, BrowserWindow, Menu, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import Store from 'electron-store';
import isDev from 'electron-is-dev';
import { spawn } from 'child_process';
import { activeWindow as getFocusedWindow } from '@deepfocus/get-windows';
import pkg from 'electron-updater'; const { autoUpdater } = pkg;

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
    value = preferences.get('always_active') ? false : value;
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
    startup_run: false,
    hold_repeat: true,
    always_active: true,
    selected_apps: [],
    selected_active: true,
    voice_profile: {
        voice_type: 'f1',
        pitch_shift: 0.0,
        pitch_variation: 0.2,
        intonation: 0.0
    },
    instrument: 'guitar',
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
    if (key==='startup_run') updateTrayMenu();
});
ipcMain.handle('store-reset', async (e) => {// set settings to default and trigger store update messages
    const resetable = [
        'startup_run',
        'hold_repeat',
        'audio_mode',
        'voice_profile',
        'instrument',
        'saved_voice_profiles',
        'remapped_keys',
        'selected_apps',
        'selected_active',
        'always_active'
    ];
    resetable.forEach(r=>{
        preferences.reset(r);
        bgwin.webContents.send(`updated-${r}`, defaults[r]);
        if (r==='startup_run') updateTrayMenu();
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
ipcMain.on('set-run-on-startup', (e, value) => setRunOnStartup(value));

var bgwin = null;
var tray = null;
var disabled = !preferences.get('always_active');
let lastFocusedWindow = null;
let focusedWindows = [];

// check for active window changes and update `lastFocusedWindow` when the window changes
async function monitorFocusedWindow() {
    const focusedWindow = await getFocusedWindow();

    if (!focusedWindow?.owner?.name) return;// return early if invlaid window

    const winName = focusedWindow.owner.name
    if (winName === lastFocusedWindow?.owner?.name) return;// return early if the active window hasn't changed.
    
    const selectedApps = preferences.get('selected_apps');

    // change disable value when focusing in or out of selecte-apps.
    setDisable( (preferences.get('selected_active')?selectedApps.includes(winName):!selectedApps.includes(winName)) && 
    (focusedWindow?.owner?.processId !== process.pid || winName === 'Animalese Typing') );

    lastFocusedWindow = focusedWindow;
    if (!focusedWindows.includes(winName)) {
        focusedWindows.push(winName);
        if (focusedWindows.length > 8) focusedWindows.shift();
        bgwin.webContents.send('focused-window-changed', focusedWindows);
    }
}

function startWindowMonitoring() {
    setInterval(monitorFocusedWindow, 500); // check window every .5 seconds
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

function updateTrayMenu() {
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show Settings',
            click: () => { showIfAble(); }
        },
        {
            id: 'startup',
            label: 'Run on startup',
            type: 'checkbox',
            checked: preferences.get('startup_run'),
            click: (menuItem) => {
                const value = menuItem.checked;    
                const settings = {
                    openAtLogin: value,
                    openAsHidden: true,
                };
                if (process.platform === 'win32') settings.path = app.isPackaged ? app.getPath('exe') : process.execPath;
                preferences.set('startup_run', value);
                bgwin.webContents.send(`updated-startup_run`, value);
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
    if(tray) tray.setContextMenu(contextMenu);
}

function createTrayIcon() {
    if(tray !== null) return; // prevent dupe tray icons

    tray = new Tray(SYSTRAY_ICON);
    tray.setToolTip('Animalese Typing');

    updateTrayMenu();

    // On Windows, clicking shows the window, while on macOS it shows the context menu
    if (process.platform != 'darwin') tray.on('click', () => { showIfAble(); });
    tray.displayBalloon({
        title: "Animalese Typing",
        content: "Animalese Typing is Running!"
    });
}

//#region KeyListener
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
                        shiftKey: event.shift,
                        ctrlKey: event.ctrl,
                        altKey: event.alt,
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
//#endregion

function stopKeyListener() {
    if (keyListener) {
        keyListener.kill();
        keyListener = null;
    }
}

app.on('ready', () => {
    startWindowMonitoring();
    createMainWin();
    createTrayIcon();
    if (!disabled) startKeyListener();
    if (process.platform === 'darwin') app.dock.hide();
    bgwin.hide();

    if (app.isPackaged) autoUpdater.checkForUpdatesAndNotify();
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