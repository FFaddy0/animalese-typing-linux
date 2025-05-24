const { app, shell, contextBridge, ipcRenderer } = require('electron');
const keycodeToSound = require('./keycode-to-sound.cjs');
const translator = require('./translator.cjs'); 
const { createAudioManager } = require('./audio-manager.cjs');
const { initCapsLockState, isCapsLockActive } = require('./caps-lock-state.cjs');
initCapsLockState();

const settingsData = ipcRenderer.sendSync('get-store-data-sync');
const appInfo = ipcRenderer.sendSync('get-app-info');

// general app messages 
contextBridge.exposeInMainWorld('api', {
    closeWindow: () => ipcRenderer.send('close-window'),
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    onKeyPress: (callback) => ipcRenderer.on('keydown', (_event, e) => {
        const data = keycodeToSound[appInfo.platform][e.keycode];
        if (data === undefined) return;
        const keyInfo = {
            data: data,
            keycode: e.keycode,
            isShiftDown: e.shiftKey,
            isCapsLock: isCapsLockActive()
        }
        callback(keyInfo);
    }),
    onSettingUpdate: (key, callback) => {
        const channel = `${key}`;
        const handler = (_, value) => {
            if (document.readyState === 'loading') {
                window.addEventListener('load', () => callback(value));
            } else {
                callback(value);
            }
        };
        ipcRenderer.on(channel, handler);
        
        return () => {
            ipcRenderer.removeListener(channel, handler);
        };
    },
    onActiveWindowChanged: (callback) => ipcRenderer.on('active-windows-updated', (_event, e) => callback(e)),
    getAppInfo: () => appInfo,
    goToUrl: (url) => shell.openExternal(url),
    onPermissionError: (callback) => {
      ipcRenderer.on('permission-error', (_event, message) => callback(message));
    }
});

// translation functions
contextBridge.exposeInMainWorld('translator', {
    load: (lang) => translator.loadLanguage(lang),
    update: () => translator.updateHtmlDocumentTranslations()
});

// user settings get/set
contextBridge.exposeInMainWorld('settings', {
    get: (key) => settingsData[key],
    set: (key, value) => {
        settingsData[key] = value;
        return ipcRenderer.invoke('store-set', key, value)
    }
});

// audio manager
contextBridge.exposeInMainWorld('audio', createAudioManager(settingsData.volume || 0.5));