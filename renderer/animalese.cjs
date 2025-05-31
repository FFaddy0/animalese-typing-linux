/**
 * author: joshxviii 
 */

const preferences = window.settings;
let currentKey = {};

// custom svg button element
customElements.define('svg-button', class extends HTMLElement {
    connectedCallback() {
        const icon = this.getAttribute('icon');
        
        fetch(`assets/svg/${icon}.svg`)
        .then(res => res.text())
        .then(svg => {
            this.innerHTML = svg;
            const svgEl = this.querySelector('svg');
            svgEl.classList.add('svg-button');
        });
    }
});


document.getElementById('version').innerHTML = `v${window.api.getAppInfo().version}`;

document.getElementById('reset_settings').addEventListener('animationend', (e) => {
    resetSettings();
});

//#region Initialize controls and listeners
const controls = [
    'master_volume',
    'voice_type',
    'pitch_shift',
    'pitch_variation',
    'intonation'
];
let voiceProfile = null;
let voiceProfileSlots = null;
const profileName = document.getElementById('voice_profile_name');
const checkStartupRun = document.getElementById('check_startup_run');
profileName.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\p{Letter}0-9\s]/gu, '').substring(0, 12);
    document.documentElement.style.setProperty('--label-length', e.target.value.length);
});

window.api.onSettingUpdate('updated-startup_run', (value) => checkStartupRun.checked = value );

function initControls() {
    voiceProfile = preferences.get('voice_profile');
    voiceProfileSlots = preferences.get('saved_voice_profiles');
    profileName.value = voiceProfileSlots[parseInt(document.getElementById('voice_profile_slot').value)]?.name || ``;
    profileName.dispatchEvent(new Event('input', { bubbles: true }));
    for (let i = 0; i < 5; i++) document.getElementById('voice_profile_slot').options[i].innerHTML = `${i+1}. ${(voiceProfileSlots[i+1]?.name || '')}`;

    document.getElementById('lang_select').value = preferences.get('lang');
    checkStartupRun.checked = preferences.get('startup_run');
    document.getElementById('check_always_enabled').checked = preferences.get('always_enabled');
    document.getElementById('check_hold_repeat').checked = preferences.get('hold_repeat');
    document.getElementById('apps_table').setAttribute('disabled', preferences.get('always_enabled'));
    document.querySelectorAll('input[name="audio_mode"]').forEach(radio => {// audio mode initilize 
        //radio.replaceWith(radio.cloneNode(true));
        radio.checked = parseInt(radio.value) === preferences.get('audio_mode');
        radio.addEventListener('change', () => {
            if (radio.checked) preferences.set('audio_mode', parseInt(radio.value));
        });
    });

    // voice profile slider controls
    controls.forEach(control => {
        let el = document.getElementById(control);
        if (!el) return;

        let outputEl = document.getElementById(control + '_out');
        const isSlider = el.type === 'range';
        const displayMode = (outputEl)?outputEl.getAttribute('display') || 'float':undefined;

        const updateValue = (value) => {
            if (isSlider) {
                value = parseFloat(value) || 0.0;
                value = Math.min(Math.max(value, parseFloat(el.min)), parseFloat(el.max));
                el.value = value;
                if (outputEl) {
                    outputEl.value = displayMode === 'percent' 
                    ? (parseFloat(el.value) * 100).toFixed(0) + "%" 
                    : ((parseFloat(el.value) > 0) ? "+" : "") + parseFloat(el.value).toFixed(1);
                }
            } else {
                el.value = value;
            }
            if (control==='master_volume') {
                preferences.set('volume', value);
                
                if (el.getAttribute('playing')==='false') {
                    el.setAttribute('playing', 'true');
                    window.audio.play('sfx.default', {static: true, channel: 2});
                    setTimeout(() => el.setAttribute('playing', 'false'), 50);
                }
            }
            else {
                voiceProfile[control] = value;
                preferences.set('voice_profile', voiceProfile);
                if(control==='voice_type') setTimeout(() => {window.audio.play('&.special.OK', {static: true, channel: 2, volume:.55});}, 10);
            }
        };

        // clear event listeners and reset element
        el.replaceWith(el.cloneNode(true));
        el = document.getElementById(control);
        if (outputEl) {
            outputEl.replaceWith(outputEl.cloneNode(true));
            outputEl = document.getElementById(control + '_out');
        }
        if (isSlider) {
            if (control === 'master_volume') el.value = preferences.get('volume');
            else el.value = voiceProfile[control];
            const step = parseFloat((el.max - el.min) * 0.05);

            el.addEventListener('input', (e) => updateValue(e.target.value));
            el.addEventListener('wheel', (e) => {
                updateValue(parseFloat(el.value) + (e.deltaY < 0 ? step : -step));
            }, {passive: true});
            el.addEventListener('dblclick', () => updateValue(el.getAttribute('defaultValue')));
            if (outputEl) {
                outputEl.value = displayMode === 'percent' 
                ? (parseFloat(el.value) * 100).toFixed(0) + "%" 
                : ((parseFloat(el.value) > 0) ? "+" : "") + parseFloat(el.value).toFixed(1);

                outputEl.addEventListener('click', () => outputEl.select());
                outputEl.addEventListener('focusout', () => updateValue(outputEl.value));
                outputEl.addEventListener('keydown', (e) => {
                    if (e.key === "Enter") updateValue(outputEl.value);
                    else if (["ArrowUp", "ArrowRight"].includes(e.key)) updateValue(parseFloat(outputEl.value) + 0.1);
                    else if (["ArrowDown", "ArrowLeft"].includes(e.key)) updateValue(parseFloat(outputEl.value) - 0.1);
                });
                outputEl.addEventListener('dblclick', () => updateValue(el.getAttribute('defaultValue')));
            }
        } else {
            el.value = voiceProfile[control];
            el.addEventListener('input', (e) => updateValue(e.target.value));
            //el.addEventListener('change', (e) => updateValue(e.target.value));
        }
    });

    if (voiceProfile.voice_type) {
        if(voiceProfile.voice_type.startsWith('m')) {
            document.getElementById('voice_type').className = 'male'
            document.getElementById('male').setAttribute('pressed', 'true');
            document.getElementById('female').setAttribute('pressed', 'false');
        }
        else if(voiceProfile.voice_type.startsWith('f')) {
            document.getElementById('voice_type').className = 'female'
            document.getElementById('female').setAttribute('pressed', 'true');
            document.getElementById('male').setAttribute('pressed', 'false');
        }
    }

    document.querySelectorAll('#apps_tbody tr input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
}
initControls();

function selectVoiceType(type) {
    const oppositeType = type === 'male' ? 'female' : 'male';

    if (document.getElementById(type).getAttribute('pressed') === 'true') {
        window.audio.play('&.special.OK', { channel: 2, volume: 0.55 });
        return;
    }

    const voiceTypeElement = document.getElementById('voice_type');
    voiceTypeElement.value = type === 'male' ? 'm1' : 'f1';
    voiceTypeElement.dispatchEvent(new Event('input', { bubbles: true }));

    document.getElementById(type).setAttribute('pressed', 'true');
    document.getElementById(oppositeType).setAttribute('pressed', 'false');
    voiceTypeElement.className = type;
}
//#endregion

//#region General setup
// keep consistant aspect ratio and scales all elements on the window
function scaleWindow() {
    const wrapper = document.getElementById('main-win');
    // const overlay = document.getElementById('settings_overlay');
    const scaleX = window.innerWidth / 720;
    const scaleY = window.innerHeight / 360;
    const scale = Math.min(scaleX, scaleY);
    wrapper.style.transform = `scale(${scale*1})`;
    // overlay.style.transform = `scale(${scale*1})`;
}
window.addEventListener('resize', scaleWindow);
window.addEventListener('load', scaleWindow);
scaleWindow();

//#region Translation stuff
updateLanguage(preferences.get('lang'));

function updateLanguage(lang) {// language selection update
    preferences.set('lang', lang);
    window.translator.load(lang);
    window.translator.update();
}
//#endregion

function updatedActiveWindows(activeWindows = []) {
    const enabledApps = preferences.get('enabled_apps');
    const tableBody = document.getElementById('apps_tbody');
    tableBody.innerHTML = '';
    [...new Set([...enabledApps, ...activeWindows])].forEach(appName => {
        if (appName !== undefined) {
            const row = document.createElement('tr');

            // checkbox cell
            const checkboxCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = enabledApps.includes(appName);
            checkbox.id = `app_${appName}`;
            checkbox.addEventListener('change', () => updateEnabledApps(appName, checkbox.checked));
            checkboxCell.appendChild(checkbox);
            row.appendChild(checkboxCell);

            // app name cell
            const nameCell = document.createElement('td');
            const label = document.createElement('label');
            label.setAttribute('for', `app_${appName}`);
            label.textContent = appName;
            nameCell.appendChild(label);
            row.appendChild(nameCell);

            tableBody.appendChild(row);
        }
    });
}

function updateEnabledApps(appName, isChecked) {
    let enabledApps = preferences.get('enabled_apps')

    if (isChecked && !enabledApps.includes(appName)) enabledApps.push(appName);
    else enabledApps = enabledApps.filter(name => name !== appName);

    preferences.set('enabled_apps', enabledApps)
}
window.api.onActiveWindowChanged((activeWindows) => {
    updatedActiveWindows(activeWindows);
});

//#region Key press detect
window.api.onKeyDown( (keyInfo) => {
    currentKey = keyInfo;
    //if (isRemapping || remapIn === document.activeElement) return;
    const { keycode, isCapsLock, isShiftDown, shiftSound, isCtrlDown, ctrlSound, sound } = keyInfo;
    const path = isCtrlDown?ctrlSound:(isShiftDown?shiftSound:sound);
    if (path === undefined) return;
    const options = {}
    if (!preferences.get('hold_repeat')) Object.assign(options, { hold: keycode });
    switch (true) {
        // uppercase typing has higher pitch and variation
        case ( path.startsWith('&.voice') && isCapsLock !== isShiftDown ):
            Object.assign(options, {
                volume: .75,
                pitch_shift: 1.5 + voiceProfile.pitch_shift,
                pitch_variation: 1 + voiceProfile.pitch_variation,
            });
        break;
        // notes should always hold until released with keyup 
        case ( path.startsWith('&.sing') ):
            Object.assign(options, {
                hold: keycode
            });
        break;
    }
    window.audio.play(path, options);
});
window.api.onKeyUp( (keyInfo) => {
    const { keycode, isShiftDown, shiftSound, isCtrlDown, ctrlSound, sound } = keyInfo;
    const path = isCtrlDown?ctrlSound:(isShiftDown?shiftSound:sound)
    if (path === undefined) return;
    switch (true) {
        case ( path.startsWith('&.sing') ):
            window.audio.release(keycode, true /* cutOff */)
        break;
        default:
            window.audio.release(keycode, false)
        break;
    }
});
//#endregion

//#region Savable voice profiles

//TODO make a custom notification popup for alerts
function deleteVoiceProfile() {
    const selectedSlot = document.getElementById('voice_profile_slot').value;

    let savedVoiceProfiles = preferences.get('saved_voice_profiles');
    savedVoiceProfiles = new Map(Object.entries(savedVoiceProfiles));
    savedVoiceProfiles.delete(selectedSlot);
    const savedProfilesObject = Object.fromEntries(savedVoiceProfiles);
    document.getElementById('voice_profile_slot').options[parseInt(selectedSlot)-1].innerHTML = `${selectedSlot}. `;

    profileName.value = '';
    profileName.dispatchEvent(new Event('input', { bubbles: true }));

    preferences.set('saved_voice_profiles', savedProfilesObject);
}

function saveVoiceProfile() {
    const currentVoiceProfile = preferences.get('voice_profile');
    const selectedSlot = parseInt(document.getElementById('voice_profile_slot').value);
    
    if (!profileName.value) return;

    let savedVoiceProfiles = new Map(Object.entries(preferences.get('saved_voice_profiles')));
    savedVoiceProfiles.set(selectedSlot, { name: profileName.value, profile: currentVoiceProfile });
    const savedProfilesObject = Object.fromEntries(savedVoiceProfiles);
    document.getElementById('voice_profile_slot').options[parseInt(selectedSlot)-1].innerHTML = `${selectedSlot}. ${profileName.value}`;

    preferences.set('saved_voice_profiles', savedProfilesObject);
}

function loadVoiceProfile() {
    const selectedSlot = document.getElementById('voice_profile_slot').value;
    const savedVoiceProfiles = preferences.get('saved_voice_profiles');
    const selectedProfile = savedVoiceProfiles[selectedSlot];

    if (selectedProfile) {
        profileName.value = selectedProfile.name;
        preferences.set('voice_profile', selectedProfile.profile);
        voiceProfile = preferences.get('voice_profile')
        initControls();
    } else profileName.value = '';

    profileName.dispatchEvent(new Event('input', { bubbles: true }));
}
//#endregion

function openSettings() {
    const show = document.getElementById('focus_out').getAttribute('show')==="true"?false:true;
    document.getElementById('focus_out').setAttribute('show', show);
}

function resetSettings() {
    window.settings.reset();
    setTimeout( () => {
        initControls();
    }, 10)
}


function isAlpha(str) {return str?(str.length === 1)?(/\p{Letter}/gu).test(str.charAt(0)):false:false;}

//#region Key Remapper
let tabIndex = 1;
let isRemapping = false;

const remapAcceptBtn = document.getElementById('remap_accept');
const remapResetBtn = document.getElementById('remap_reset');
const remapMonitor = document.getElementById('remap_monitor');
const remapIn = document.getElementById('remap_in');

function remapStart() {
    if (isRemapping == true) return;
    remapAcceptBtn.setAttribute('disabled', false);
    remapResetBtn.setAttribute('disabled', false);
    remapMonitor.classList.add('remapping');
    isRemapping = true;
}

function remapStop() {
    if (tabIndex == 0) window.api.sendRemapData({label: '', sound: ''});// index 0 is "No Sound"
    setTimeout(()=>{
        isRemapping = false;
        remapAcceptBtn.setAttribute('disabled', true);
        remapResetBtn.setAttribute('disabled', true);
        remapMonitor.setAttribute('monitoring', false)
        remapMonitor.classList.remove('remapping');
        remapMonitor.innerHTML = remapIn.getAttribute('placeholder');
        document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
    },1)
}

function remapReset() {
    const defaultKey = window.api.getDefaultKey(currentKey.keycode);
    const sound = currentKey.isCtrlDown?defaultKey.ctrlSound:(isShiftDown? (defaultKey.shiftSound ?? defaultKey.sound):defaultKey.sound);
    changeTab(!sound||sound===''?0:sound.startsWith('&.voice')?1:sound.startsWith('&.sing')?2:sound.startsWith('sfx')?3:0);
    window.api.sendRemapData({ sound });
    console.log(defaultKey);
}

window.api.onRemapReceived((remapButton) => {
    if (!(remapIn === document.activeElement || isRemapping)) return;

    const keycode = `${currentKey.keycode}`;
    const defaultKey = window.api.getDefaultKey(keycode);
    //const defaultSound = currentKey.isShiftDown? (defaultKey.shiftSound ?? defaultKey.sound):currentKey.isCtrlDown?(defaultKey.ctrlSound):'';
    const defaultSound = currentKey.isCtrlDown?defaultKey.ctrlSound:(isShiftDown? (defaultKey.shiftSound ?? defaultKey.sound):defaultKey.sound);
    
    const reset = remapButton.sound === defaultSound;// if the key is being mapped to it's default sound, reset and clear the mapping in settings

    const remappedKeys = new Map(Object.entries(preferences.get('remapped_keys')));
    const mapping = { ...remappedKeys.get(keycode) || {} };

    if (reset) delete mapping[currentKey.isCtrlDown?'ctrlSound':(currentKey.isShiftDown?'shiftSound':'sound')];
    else mapping[currentKey.isCtrlDown?'ctrlSound':(currentKey.isShiftDown?'shiftSound':'sound')] = remapButton.sound;

    if (Object.keys(mapping).length === 0) remappedKeys.delete(keycode);
    else remappedKeys.set(keycode, mapping);
    
    document.querySelector('.highlighted')?.classList.remove('highlighted');
    document.querySelector(`[sound="${remapButton.sound}"]`)?.classList.add('highlighted');

    preferences.set('remapped_keys', Object.fromEntries(remappedKeys));
});

remapIn.addEventListener('focusin', e => remapMonitor.setAttribute('monitoring', true));
remapIn.addEventListener('focusout', e => isRemapping?undefined:remapMonitor.setAttribute('monitoring', false));
remapIn.addEventListener('selectstart', e => e.preventDefault());
remapIn.addEventListener('mousedown', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if ( !(remapIn === document.activeElement || isRemapping) ) return;
    e.preventDefault();
    remapStart();
    
    let { key, isShiftDown, shiftSound, isCtrlDown, ctrlSound, sound } = currentKey;
    if ((key === "Shift") || (key === "Ctrl"))  key = key;
    else if (isCtrlDown) key = `Ctrl + ${key}`;
    else if (isShiftDown) key = `Shift + ${key}`;
    remapMonitor.innerHTML = key.toUpperCase();

    const path = isCtrlDown?ctrlSound:(isShiftDown?shiftSound:sound);
    //window.audio.play(sound, { channel: 2, volume: 0.55 });

    document.querySelector('.highlighted')?.classList.remove('highlighted');
    document.querySelector(`[sound="${path}"]`)?.classList.add('highlighted');
    changeTab(!path||path===''?0:path.startsWith('&.voice')?1:path.startsWith('&.sing')?2:path.startsWith('sfx')?3:0);
});

function changeTab(newTabIndex = 1) {
    const allTabs = document.querySelectorAll('#remap_tabs .remap_tab');
    allTabs.forEach(el => {
        el.setAttribute('pressed',false)
        el.classList.remove('highlighted');
    });
    allTabs[newTabIndex].setAttribute('pressed',true);
    if(isRemapping) allTabs[newTabIndex].classList.add('highlighted');

    if (newTabIndex === tabIndex) return;
    const allControllers = document.querySelectorAll('#remap_controllers .remap_controller');
    const allEditors = document.querySelectorAll('#bottom_row .audio_editor');

    allControllers.forEach(el => el.setAttribute('show',false));
    allEditors.forEach(el => el.setAttribute('show',false));

    allControllers[newTabIndex].setAttribute('show',true);
    allEditors[newTabIndex].setAttribute('show',true);

    tabIndex = newTabIndex;
}

document.addEventListener('DOMContentLoaded', () => {
    // Close settings when clicking outside
    const focusOut = document.getElementById('focus_out');
    const settingsOverlay = document.getElementById('settings_overlay');
    focusOut.addEventListener('mousedown', function(event) {
        if (focusOut.getAttribute('show') === 'true' && !settingsOverlay.contains(event.target)) {
            focusOut.setAttribute('show', 'false');
        }
    });
});
//#endregion