/**
 * author: joshxviii 
 */
document.addEventListener('DOMContentLoaded', () => {
    initControls();
    updatedFocusedWindows();
    
    // close settings when clicking outside
    const focusOut = document.getElementById('focus_out');
    const settingsOverlay = document.getElementById('settings_overlay');
    focusOut.addEventListener('mousedown', function(event) {
        if (focusOut.getAttribute('show') === 'true' && !settingsOverlay.contains(event.target)) {
            focusOut.setAttribute('show', 'false');
        }
    });
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
    document.getElementById('inst_type').value = preferences.get('instrument');
    document.getElementById('check_always_active').checked = preferences.get('always_active');
    document.getElementById('check_hold_repeat').checked = preferences.get('hold_repeat');
    document.querySelectorAll('#apps_table, #apps_toggle').forEach(el => el.setAttribute('disabled', preferences.get('always_active')));
    document.getElementById('check_selected_active').checked = preferences.get('selected_active')
    document.querySelectorAll(`[translation='settings.apps.active'], [translation='settings.apps.inactive']`).forEach(el => el.setAttribute('translation', preferences.get('selected_active')?'settings.apps.active':'settings.apps.inactive'));
    document.getElementById('apps_tbody').setAttribute('inactive', !preferences.get('selected_active'));
    document.querySelectorAll('input[name="audio_mode"]').forEach(radio => {// audio mode initilize 
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
                    window.audio.play('sfx.default', {noRandom: true, channel: 2});
                    setTimeout(() => el.setAttribute('playing', 'false'), 50);
                }
            }
            else {
                voiceProfile[control] = value;
                preferences.set('voice_profile', voiceProfile);
                if(control==='voice_type') setTimeout(() => {window.audio.play('&.ok', {noRandom: true, channel: 2, volume:.55});}, 10);
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

function selectVoiceType(type) {
    const oppositeType = type === 'male' ? 'female' : 'male';

    if (document.getElementById(type).getAttribute('pressed') === 'true') {
        window.audio.play('&.ok', { channel: 2, volume: 0.55 });
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

//#region Focused Windows
function updatedFocusedWindows(activeWindows = []) {
    const enabledApps = preferences.get('selected_apps');
    const tableBody = document.getElementById('apps_tbody');
    tableBody.innerHTML = '';
    [...new Set([...enabledApps, ...activeWindows])].forEach(appName => {
        if (appName !== undefined) {
            const row = document.createElement('tr');

            // checkbox cell
            //const checkboxCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = enabledApps.includes(appName);
            checkbox.id = `app_${appName}`;
            checkbox.addEventListener('change', () => updateEnabledApps(appName, checkbox.checked));
            //checkboxCell.appendChild(checkbox);
            //row.appendChild(checkboxCell);

            // app name cell
            const nameCell = document.createElement('td');
            const label = document.createElement('label');
            //label.setAttribute('for', `app_${appName}`);
            label.appendChild(checkbox);
            label.innerHTML += appName;
            nameCell.appendChild(label);
            row.appendChild(nameCell);

            tableBody.appendChild(row);
        }
    });
}

function updateEnabledApps(appName, isChecked) {
    let enabledApps = preferences.get('selected_apps')

    if (isChecked && !enabledApps.includes(appName)) enabledApps.push(appName);
    else enabledApps = enabledApps.filter(name => name !== appName);

    preferences.set('selected_apps', enabledApps)
}

window.api.onFocusedWindowChanged((activeWindows) => updatedFocusedWindows(activeWindows));
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

//#region Key Remapper
window.api.onKeyDown( (keyInfo) => {
    currentKey = keyInfo;
    if ( remapIn === document.activeElement || isRemapping ) remapStart();
});

let tabIndex = 1;
let isRemapping = false;

const remapAcceptBtn = document.getElementById('remap_accept');
const remapResetBtn = document.getElementById('remap_reset');
const remapMonitor = document.getElementById('remap_monitor');
const remapIn = document.getElementById('remap_in');

function remapStop() {
    if (tabIndex == 0) window.api.sendRemapSound('');// index 0 is "No Sound"
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
    const { defaultSound } = currentKey;
    window.api.sendRemapSound(defaultSound);
}

window.api.onRemapSound((remapSound) => {
    if (!(remapIn === document.activeElement || isRemapping)) return;
    const { keycode, isCtrlDown, isAltDown, isShiftDown, finalSound, defaultSound } = currentKey;
    const reset = remapSound === defaultSound;// if the key is being mapped to it's default sound, reset and clear the mapping in settings

    console.log("reset:", reset, "remapSound:", remapSound, "defaultSound:", defaultSound)

    const remappedKeys = new Map(Object.entries(preferences.get('remapped_keys')));
    const mapping = { ...remappedKeys.get(`${keycode}`) || {} };

    if (reset) delete mapping[isCtrlDown?'ctrlSound':isAltDown?'altSound':isShiftDown?'shiftSound':'sound'];
    else mapping[isCtrlDown?'ctrlSound':isAltDown?'altSound':isShiftDown?'shiftSound':'sound'] = remapSound;

    if (Object.keys(mapping).length === 0) remappedKeys.delete(`${keycode}`);
    else remappedKeys.set(`${keycode}`, mapping);
    
    document.querySelector('.highlighted')?.classList.remove('highlighted');
    document.querySelector(`[sound="${remapSound}"]`)?.classList.add('highlighted');

    preferences.set('remapped_keys', Object.fromEntries(remappedKeys));

    changeTab(!remapSound||remapSound===''?0:remapSound.startsWith('&')?1:remapSound.startsWith('%')?2:remapSound.startsWith('sfx')?3:0);
});

remapIn.addEventListener('focusin', e => remapMonitor.setAttribute('monitoring', true));
remapIn.addEventListener('focusout', e => isRemapping?undefined:remapMonitor.setAttribute('monitoring', false));
remapIn.addEventListener('selectstart', e => e.preventDefault());
remapIn.addEventListener('mousedown', e => e.preventDefault());
document.addEventListener('keydown', e => { if(isRemapping) e.preventDefault(); });
function remapStart() {
    isRemapping = true;
    remapAcceptBtn.setAttribute('disabled', false);
    remapResetBtn.setAttribute('disabled', false);
    remapMonitor.classList.add('remapping');
    
    const { key, isShiftDown, isCtrlDown, isAltDown, finalSound } = currentKey;

    let keyLabel = key;
    if (["Ctrl", "Alt", "Shift"].includes(key)) keyLabel = key;
    else if (isCtrlDown)keyLabel = `Ctrl + ${key}`;
    else if (isAltDown)keyLabel = `Alt + ${key}`;
    else if (isShiftDown) keyLabel = `Shift + ${key}`;
    remapMonitor.innerHTML = keyLabel.toUpperCase();

    document.querySelector('.highlighted')?.classList.remove('highlighted');
    const highlightedBtn = document.querySelector(`[sound="${finalSound}"]`);
    highlightedBtn?.classList.add('highlighted');
    highlightedBtn?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    

    changeTab(!finalSound||finalSound===''?0:finalSound.startsWith('&')?1:finalSound.startsWith('%')?2:finalSound.startsWith('sfx')?3:0);
}

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
//#endregion


//#region Remap controllers
const noneLayout = []

const voiceLayout = [
    [
        {label:'A', btnType:'s', sound:`&.a`},
        {label:'B', btnType:'s', sound:`&.b`},
        {label:'C', btnType:'s', sound:`&.c`},
        {label:'D', btnType:'s', sound:`&.d`},
        {label:'E', btnType:'s', sound:`&.e`},
        {label:'F', btnType:'s', sound:`&.f`},
        {label:'G', btnType:'s', sound:`&.g`},
        {label:'H', btnType:'s', sound:`&.h`},
        {label:'I', btnType:'s', sound:`&.i`},
        {label:'J', btnType:'s', sound:`&.j`},
        {label:'K', btnType:'s', sound:`&.k`},
        {label:'L', btnType:'s', sound:`&.l`},
        {label:'M', btnType:'s', sound:`&.m`}
    ],
    [
        {label:'N', btnType:'s', sound:`&.n`},
        {label:'O', btnType:'s', sound:`&.o`},
        {label:'P', btnType:'s', sound:`&.p`},
        {label:'Q', btnType:'s', sound:`&.q`},
        {label:'R', btnType:'s', sound:`&.r`},
        {label:'S', btnType:'s', sound:`&.s`},
        {label:'T', btnType:'s', sound:`&.t`},
        {label:'U', btnType:'s', sound:`&.u`},
        {label:'V', btnType:'s', sound:`&.v`},
        {label:'W', btnType:'s', sound:`&.w`},
        {label:'X', btnType:'s', sound:`&.x`},
        {label:'Y', btnType:'s', sound:`&.y`},
        {label:'Z', btnType:'s', sound:`&.z`}
    ],
    [
        {label:'OK', btnType:'s', sound:`&.ok`},
        {label:'GWAH', btnType:'m', sound:`&.gwah`},
        {label:'DESKA', btnType:'m', sound:`&.deska`},
    ]
    //TODO: create more phonemes
    // [
    //     {label:'AA', btnType:'s', sound:`&.a`},
    //     {label:'AE', btnType:'s', sound:`&.a`},
    //     {label:'CH', btnType:'s', sound:`&.a`},
    //     {label:'EH', btnType:'s', sound:`&.a`},
    //     {label:'EU', btnType:'s', sound:`&.a`},
    //     {label:'IE', btnType:'s', sound:`&.a`},
    //     {label:'KH', btnType:'s', sound:`&.a`},
    //     {label:'NG', btnType:'s', sound:`&.a`},
    //     {label:'SH', btnType:'s', sound:`&.a`},
    //     {label:'WA', btnType:'s', sound:`&.a`},
    //     {label:'WA', btnType:'s', sound:`&.a`},
    //     {label:'WE', btnType:'s', sound:`&.a`},
    //     {label:'WI', btnType:'s', sound:`&.a`}
    // ],
    // [
    //     {label:'WO', btnType:'s', sound:`&.a`},
    //     {label:'Y', btnType:'s', sound:`&.a`},
    //     {label:'YA', btnType:'s', sound:`&.a`},
    //     {label:'YAE', btnType:'s', sound:`&.a`},
    //     {label:'YEH', btnType:'s', sound:`&.a`},
    //     {label:'YEO', btnType:'s', sound:`&.a`},
    //     {label:'YO', btnType:'s', sound:`&.a`},
    //     {label:'YU', btnType:'s', sound:`&.a`},
    // ]
];

const pianoLayout = [
    {label:'C3', btnType:'l', sound:'%.48'},
    {label:'Db3', btnType:'b',sound:'%.49'},
    {label:'D3', btnType:'m', sound:'%.50'},
    {label:'Eb3', btnType:'b',sound:'%.51'},
    {label:'E3', btnType:'r', sound:'%.52'},
    {label:'F3', btnType:'l', sound:'%.53'},
    {label:'Gb3', btnType:'b',sound:'%.54'},
    {label:'G3', btnType:'m', sound:'%.55'},
    {label:'Ab3', btnType:'b',sound:'%.56'},
    {label:'A3', btnType:'m', sound:'%.57'},
    {label:'Bb3', btnType:'b',sound:'%.58'},
    {label:'B3', btnType:'r', sound:'%.59'},

    {label:'C4', btnType:'l', sound:'%.60'},
    {label:'Db4', btnType:'b',sound:'%.61'},
    {label:'D4', btnType:'m', sound:'%.62'},
    {label:'Eb4', btnType:'b',sound:'%.63'},
    {label:'E4', btnType:'r', sound:'%.64'},
    {label:'F4', btnType:'l', sound:'%.65'},
    {label:'Gb4', btnType:'b',sound:'%.66'},
    {label:'G4', btnType:'m', sound:'%.67'},
    {label:'Ab4', btnType:'b',sound:'%.68'},
    {label:'A4', btnType:'m', sound:'%.69'},
    {label:'Bb4', btnType:'b',sound:'%.70'},
    {label:'B4', btnType:'r', sound:'%.71'},

    {label:'C5', btnType:'l', sound:'%.72'},
    {label:'Db5', btnType:'b',sound:'%.73'},
    {label:'D5', btnType:'m', sound:'%.74'},
    {label:'Eb5', btnType:'b',sound:'%.75'},
    {label:'E5', btnType:'r', sound:'%.76'},
    {label:'F5', btnType:'l', sound:'%.77'},
    {label:'Gb5', btnType:'b',sound:'%.78'},
    {label:'G5', btnType:'m', sound:'%.79'},
    {label:'Ab5', btnType:'b',sound:'%.80'},
    {label:'A5', btnType:'m', sound:'%.81'},
    {label:'Bb5', btnType:'b',sound:'%.82'},
    {label:'B5', btnType:'r', sound:'%.83'},
]

const sfxLayout = [
    [
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.backspace'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.enter'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.tab'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.question'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.exclamation'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.at'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.pound'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.dollar'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.caret'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.ampersand'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.asterisk'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.parenthesis_open'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.parenthesis_closed'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.bracket_open'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.bracket_closed'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.brace_open'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.brace_closed'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.tilde'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.default'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.arrow_left'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.arrow_up'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.arrow_right'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.arrow_down'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.slash_forward'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.slash_back'},
        {label:'sfx', icon:'question', btnType:'s', sound:'sfx.percent'}
    ]
]

customElements.define('key-button', class extends HTMLElement {
    connectedCallback() {
        const btnType =this.getAttribute('btn-type') ?? 's';
        const label = this.getAttribute('label');
        const svgIcon = this.getAttribute('icon');
        this.id = `key-${label}`
        this.data = {
            label: label ?? '',
            sound: this.getAttribute('sound') ?? 'sfx.default'
        }

        fetch(`assets/svg/key_${btnType}.svg`)
        .then(res => res.text())
        .then(svg => {
            this.innerHTML = `
                <div class='key-label-wrapper key_${btnType}'>
                    ${svg}
                    ${
                        svgIcon?`<div class="key-icon-wrapper"></div>`:
                        label?`<span class='key-label'>${label}</span>`:''
                    }
                </div>
            `;
            this.querySelector('svg').classList.add(`key_${btnType}`);

            // if an icon is specified, fetch and use that for the label
            if (svgIcon) {
                fetch(`assets/svg/${svgIcon}.svg`)
                .then(iconRes => iconRes.text())
                .then(iconSvg => {
                    const iconWrapper = this.querySelector('.key-icon-wrapper');
                    iconWrapper.innerHTML = iconSvg;
                    iconWrapper.querySelector('svg').classList.add('key-icon');
                });
            }
            this.addEventListener('mouseenter', (e) => {if (e.buttons >0) press(this);});
            this.addEventListener('mousedown', (e) => {press(this);});
        });
    }
});
customElements.define('key-board', class extends HTMLElement {
    connectedCallback() {
        const layoutType = this.getAttribute('layout-type');
        const layout = layoutType==="voice"?voiceLayout:layoutType==="sfx"?sfxLayout:noneLayout

        for (let row of layout){
        const _row = $( `<div class='key-row'></div>`);
            for (let key of row) {
                const label = key.label?`label=${key.label}`:'';
                const sound = key.sound?`sound=${key.sound}`:'';
                const btnType = key.btnType?`btn-type=${key.btnType}`:'';
                const icon = key.icon?`icon=${key.icon}`:'';
                const _key = $(
                    key.label?`<key-button ${label} ${sound} ${btnType} ${icon} style="--label-length: ${key.label.length};"></key-button>`:
                    `<div class='key_blank'></div>`
                );
                _key.appendTo(_row);
            }
        _row.appendTo(this);
        }
    }
});

customElements.define('piano-key', class extends HTMLElement {
    connectedCallback() {
        const btnType = this.getAttribute('btn-type');
            this.data = {
            label: this.getAttribute('label') ?? '',
            sound: this.getAttribute('sound') ?? 'sfx.default'
        }

        fetch(`assets/svg/piano_${btnType}.svg`)
        .then(res => res.text())
        .then(svg => {
            this.innerHTML = `
                <div class='piano_${btnType}'>
                    ${svg}
                </div>
            `;
            this.querySelector('svg').classList.add(`piano_${btnType}`);

            this.addEventListener('mouseenter', (e) => {if (e.buttons > 0) press(this, true);});
            this.addEventListener('mousedown', (e) => {press(this, true);});
            this.addEventListener('mouseleave', (e) => {release(this);});
            this.addEventListener('mouseup', (e) => {release(this);});
        });
    }
});

customElements.define('piano-board', class extends HTMLElement {
    connectedCallback() {
        const back = $(`<div id="piano_back"></div>`);
        const keys = $(`<div id="piano_keys"></div>`);
        keys.appendTo(this);
        for (let key of pianoLayout) {
            const label = key.label?`label=${key.label}`:'';
            const sound = key.sound?`sound=${key.sound}`:'';
            const btnType = key.btnType?`btn-type=${key.btnType}`:'';
            const _key = $(
                `<piano-key ${label} ${sound} ${btnType} ></piano-key>`
            );
            _key.appendTo(keys);
        }
        back.appendTo(this);
        keys.appendTo(this);

        // auto scroll keys when near the edges
        const piano_keys = document.getElementById('piano_keys');
        let scrollDirection = 0;
        let animationFrameId = null;
        let wheelTimeoutId = null;

        function scrollPianoKeys() {
            if (scrollDirection !== 0) {
                piano_keys.scrollLeft += scrollDirection;
                animationFrameId = requestAnimationFrame(scrollPianoKeys);
            } else if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        }

        function startScroll() {
            if (!animationFrameId) animationFrameId = requestAnimationFrame(scrollPianoKeys);
        }
        function stopScroll() {
            scrollDirection = 0;
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        }

        piano_keys.addEventListener('wheel', (e) => {
            e.preventDefault();
            scrollDirection = (e.deltaY || e.detail || e.wheelDelta) > 0 ? 10 : -10;
            startScroll();
            if (wheelTimeoutId) clearTimeout(wheelTimeoutId);
            wheelTimeoutId = setTimeout(stopScroll, 80);
        });
    }
});

function press(btn, holdKey=false) {
    if (!btn.classList.contains('pressed')) {
        const sound = btn.getAttribute('sound') ?? 'sfx.default';
        const label = btn.getAttribute('label') ?? '';
        btn.classList.add('pressed');
        if (holdKey) {
            window.audio.play(sound, {noRandom: true, hold: 0});
        }
        else {
            window.audio.play(sound, {noRandom: true});
            setTimeout(() => btn.classList.remove('pressed'), 100);
            setTimeout(() => btn.classList.remove('pressed'), 100);
        }
        window.api.sendRemapSound(sound);
    }
}

function release(btn) {
    btn.classList.remove('pressed');
    window.audio.release(0);
}