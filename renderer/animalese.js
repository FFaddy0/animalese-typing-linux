/**
 * author: joshxviii 
 */

const preferences = window.settings;
let currentKey = {};

// custom svg button element
customElements.define('svg-button', class extends HTMLElement {
    connectedCallback() {
        this.setAttribute('pressed','false');
        const name = this.getAttribute('name');
        this.id = `${name}`
        
        fetch(`assets/svg/${name}.svg`)
        .then(res => res.text())
        .then(svg => {
            this.innerHTML = svg;
            const svgEl = this.querySelector('svg');
            svgEl.classList.add('svg-button');
           
        });
    }
});

let voiceProfile = preferences.get('voice_profile');

//#region Initialize controls and listeners
const controls = [
    'master_volume',
    'voice_type',
    'pitch_shift',
    'pitch_variation',
    'intonation'
];
document.querySelectorAll('input[name="audio_mode"]').forEach(radio => {// audio mode initilize 
    radio.checked = parseInt(radio.value) === preferences.get('audio_mode');
    radio.addEventListener('change', () => {
        if (radio.checked) preferences.set('audio_mode', parseInt(radio.value));
    });
});
function initControls() {
    document.getElementById('lang_select').value = preferences.get('lang');
    document.getElementById('check_always_enabled').checked = preferences.get('always_enabled');
    document.getElementById('apps_table').setAttribute('disabled', preferences.get('always_enabled'));
    document.getElementById('version').innerHTML = `v${window.api.getAppInfo().version}`;


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
                    window.audio.play('sfx.default', {channel: 3});
                    setTimeout(() => el.setAttribute('playing', 'false'), 50);
                }
            }
            else {
                voiceProfile[control] = value;
                preferences.set('voice_profile', voiceProfile);
                setTimeout(() => {window.audio.play('&.special.OK', {channel: 2, volume:.55});}, 10);
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
            
            if (outputEl) {
            outputEl.value = displayMode === 'percent' 
            ? (parseFloat(el.value) * 100).toFixed(0) + "%" 
            : ((parseFloat(el.value) > 0) ? "+" : "") + parseFloat(el.value).toFixed(1);
            }

            el.addEventListener('input', (e) => updateValue(e.target.value));
            el.addEventListener('wheel', (e) => {
            e.preventDefault();
            const step = parseFloat((el.max - el.min) * 0.05);
            updateValue(parseFloat(el.value) + (e.deltaY < 0 ? step : -step));
            });
            el.addEventListener('dblclick', () => updateValue(el.getAttribute('defaultValue')));
            if (outputEl) {
            outputEl.addEventListener('click', () => outputEl.select());
            outputEl.addEventListener('focusout', () => updateValue(outputEl.value));
            outputEl.addEventListener('keydown', (e) => { if (e.key === "Enter") updateValue(outputEl.value); });
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
    const scaleX = window.innerWidth / 720;
    const scaleY = window.innerHeight / 360;
    const scale = Math.min(scaleX, scaleY);
    wrapper.style.transform = `scale(${scale*1})`;
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
updatedActiveWindows();
function updateEnabledApps(appName, isChecked) {
    let enabledApps = preferences.get('enabled_apps')

    if (isChecked && !enabledApps.includes(appName)) enabledApps.push(appName);
    else enabledApps = enabledApps.filter(name => name !== appName);

    preferences.set('enabled_apps', enabledApps)
}
window.api.onActiveWindowChanged((activeWindows) => {
    updatedActiveWindows(activeWindows);
});

function updateAlwaysEnabled(value) {
    window.settings.set('always_enabled', value)
    document.getElementById('apps_table').setAttribute('disabled', value)
}

//#region Key press detect
window.api.onKeyPress( (keyInfo) => {
    currentKey = keyInfo;
    if (isRemapping || remapIn === document.activeElement) return;
    const path = (keyInfo.isShiftDown && keyInfo.data.shiftSound) || keyInfo.data.sound;
    if (path === undefined) return;
    switch (true) {
        case ( path.startsWith('&.voice') ):
            // Uppercase
            if (keyInfo.isCapsLock !== keyInfo.isShiftDown) window.audio.play(path, {
                volume: .75,
                pitch_shift: 1.5 + voiceProfile.pitch_shift,
                pitch_variation: 1 + voiceProfile.pitch_variation,
            });
            // Lowercase
            else window.audio.play(path);
        break;
        case ( path.startsWith('&.sing') ):
            window.audio.play(path, {
                hold: keyInfo.keycode// lock keycode until it is released with keyup 
            });
        break;
        default: window.audio.play(path);
        break;
    }
});
//#endregion

//#region Savable voice profiles
const voiceProfileSlots = preferences.get('saved_voice_profiles');
for (let i = 0; i < 5; i++) {
    document.getElementById('voice_profile_slots').options[i].innerHTML = voiceProfileSlots[i+1]?.name || `Slot ${i+1}`;
}

function deleteVoiceProfile() {
    const selectedSlot = document.getElementById('voice_profile_slots').value;

    let savedVoiceProfiles = preferences.get('saved_voice_profiles');

    savedVoiceProfiles = new Map(Object.entries(savedVoiceProfiles));
    savedVoiceProfiles.delete(selectedSlot);
    document.getElementById('voice_profile_slots').options[parseInt(selectedSlot)-1].innerHTML = `Slot ${selectedSlot}`;
    const savedProfilesObject = Object.fromEntries(savedVoiceProfiles);

    preferences.set('saved_voice_profiles', savedProfilesObject);
}

function saveVoiceProfile() {
    // Get the current voice profile
    const currentVoiceProfile = preferences.get('voice_profile');
    const selectedSlot = parseInt(document.getElementById('voice_profile_slots').value);
    const profileName = document.getElementById('save_profile_name').value.trim();

    if (!profileName) {
        //alert('Please enter a valid profile name');
        return;
    }

    let savedVoiceProfiles = new Map(Object.entries(preferences.get('saved_voice_profiles')));
    savedVoiceProfiles.set(selectedSlot, { name: profileName, profile: currentVoiceProfile });
    document.getElementById('voice_profile_slots').options[parseInt(selectedSlot)-1].innerHTML = profileName;
    const savedProfilesObject = Object.fromEntries(savedVoiceProfiles);

    preferences.set('saved_voice_profiles', savedProfilesObject);

    //alert(`Voice profile "${profileName}" saved successfully`);
}

function loadVoiceProfile() {
    const selectedSlot = document.getElementById('voice_profile_slots').value;
    const savedVoiceProfiles = preferences.get('saved_voice_profiles');
    const selectedProfile = savedVoiceProfiles[selectedSlot];

    if (selectedProfile) {
        preferences.set('voice_profile', selectedProfile.profile);
        voiceProfile = preferences.get('voice_profile')
        initControls();
    } else {
        //alert('No saved voice profile found in this slot.');
    }
}
//#endregion

function openSettings() {
    const show = document.getElementById('focus_out').getAttribute('show')==="true"?false:true;
    document.getElementById('focus_out').setAttribute('show', show);
}



function isAlpha(str) {return str?(str.length === 1)?(/\p{Letter}/gu).test(str.charAt(0)):false:false;}

//#region Key Remapper
let isRemapping = false;

const remapMonitor = document.getElementById('remap_monitor');
const remapIn = document.getElementById('remap_in');
const remapCancel = document.getElementById('remap_cancel');

function remapStart() {
    if (isRemapping == true) return;
    remapMonitor.classList.add('remapping');
    isRemapping = true;
    remapCancel.disabled = false;
}

function remapStop() {
    isRemapping = false;
    remapMonitor.setAttribute('monitoring', false)
    remapMonitor.classList.remove('remapping');
    remapMonitor.innerHTML = remapIn.getAttribute('placeholder');
    remapCancel.disabled = true;
    document.querySelector('.highlighted')?.classList.remove('highlighted');
}


window.api.onRemapButtonPress( (remapButton) => {
    if ( !(remapIn === document.activeElement || isRemapping) ) return;

    if( (currentKey.isShiftDown && currentKey.data.shiftSound != remapButton.sound) ||
        (!currentKey.isShiftDown && currentKey.data.sound != remapButton.sound)
    ) {
        let remappedKeys = new Map(Object.entries(preferences.get('remapped_keys')));
        if (currentKey.isShiftDown) currentKey.data.shiftSound = remapButton.sound;
        else currentKey.data.sound = remapButton.sound;
        remappedKeys.set(currentKey.keycode, currentKey.data);
        const newRemappedKeys = Object.fromEntries(remappedKeys);

        document.querySelector('.highlighted')?.classList.remove('highlighted');
        document.querySelector(`[sound="${remapButton.sound}"]`)?.classList.add('highlighted');

        preferences.set('remapped_keys', newRemappedKeys);
    }

});

remapIn.addEventListener('focusin', e => remapMonitor.setAttribute('monitoring', true));
remapIn.addEventListener('focusout', e => isRemapping?undefined:remapMonitor.setAttribute('monitoring', false));
remapIn.addEventListener('selectstart', e => e.preventDefault());
remapIn.addEventListener('mousedown', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if ( !(remapIn === document.activeElement || isRemapping) ) return;
    remapStart();
    
    remapMonitor.innerHTML = ((currentKey.isShiftDown && currentKey.data.key !== "Shift"?"Shift + ":"") + currentKey.data.key).toUpperCase();

    const sound = (currentKey.isShiftDown && currentKey.data.shiftSound) || currentKey.data.sound
    const tabIndex = !sound||sound===''?0:sound.startsWith('&.voice')?1:sound.startsWith('&.sing')?2:sound.startsWith('sfx')?3:0        
    document.querySelector('.highlighted')?.classList.remove('highlighted');
    document.querySelector(`[sound="${sound}"]`)?.classList.add('highlighted');

    document.querySelectorAll('input[name="remap_type"]').forEach( (radio, index) => {
        if (index === tabIndex) {
            radio.checked = true;
            radio.dispatchEvent(new Event('change'));
        }
    });
});
 


document.querySelectorAll('input[name="remap_type"]').forEach( (radio, index) => {
    radio.addEventListener('change', () => {
        const allTypes = document.querySelectorAll('#remap_types .remap_type');
        const allControllers = document.querySelectorAll('#remap_controllers .remap_controller');
        allTypes.forEach(el => el.setAttribute('show',false));
        allControllers.forEach(el => el.setAttribute('show',false));

        // Show the selected one (index is 0-based)
        const selectedIndex = parseInt(radio.value) - 1;
        if (selectedIndex == 0) window.api.sendRemapData({
            label: '',
            sound: ''
        });
        if (allTypes[selectedIndex]) {
            allTypes[selectedIndex].setAttribute('show',true);
            allControllers[selectedIndex].setAttribute('show',true);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const checked = document.querySelector('input[name="remap_type"]:checked');
    if (checked) checked.dispatchEvent(new Event('change'));

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