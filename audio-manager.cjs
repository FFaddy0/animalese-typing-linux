const { Howl, Howler } = require('howler');// TODO: handle audio plakback manually, without howler.js.
// handling it manually will allow me to change pitch without changing playback rate, which is not supported by howler.js
const path = require('path');
const { ipcRenderer } = require('electron');

let master_volume = ipcRenderer.sendSync('get-store-data-sync').volume;
ipcRenderer.on('updated-volume', (_, value) => master_volume = value);
let v = ipcRenderer.sendSync('get-store-data-sync').voice_profile;
ipcRenderer.on('updated-voice_profile', (_, value) => v = value);
let instrument = ipcRenderer.sendSync('get-store-data-sync').instrument;
ipcRenderer.on('updated-instrument', (_, value) => instrument = value);
let mode = ipcRenderer.sendSync('get-store-data-sync').audio_mode;
ipcRenderer.on('updated-audio_mode', (_, value) => mode = value);

const audio_path = path.join(__dirname, './assets/audio/');
const file_type = ".ogg";

const waitingForRelease = {};// a list of audio paths waiting for key up event to be released
const activeChannels = {};// map of currently playing sounds on a given channel (only one sound per channel)

//#region Audio Sprite Maps
// (60,000/2) / 150bpm = 200ms
const voice_sprite = {
    a: [200 * 0,    200],
    b: [200 * 1,    200],
    c: [200 * 2,    200],
    d: [200 * 3,    200],
    e: [200 * 4,    200],
    f: [200 * 5,    200],
    g: [200 * 6,    200],
    h: [200 * 7,    200],
    i: [200 * 8,    200],
    j: [200 * 9,    200],
    k: [200 * 10,   200],
    l: [200 * 11,   200],
    m: [200 * 12,   200],
    n: [200 * 13,   200],
    o: [200 * 14,   200],
    p: [200 * 15,   200],
    q: [200 * 16,   200],
    r: [200 * 17,   200],
    s: [200 * 18,   200],
    t: [200 * 19,   200],
    u: [200 * 20,   200],
    v: [200 * 21,   200],
    w: [200 * 22,   200],
    x: [200 * 23,   200],
    y: [200 * 24,   200],
    z: [200 * 25,   200],
    OK:     [600 * 0 +200*26, 600],
    Gwah:   [600 * 1 +200*26, 600],
    Deska:  [600 * 2 +200*26, 600]
}

const sing = { 
    Nah: [2000 * 0,  2000],
    Me:  [2000 * 1,  2000],
    Now: [2000 * 2,  2000],
    Way: [2000 * 3,  2000],
    Oh:  [2000 * 4,  2000],
    Oh2: [2000 * 5,  2000],
    Me2: [2000 * 6,  2000],
}

// 60,000 / 100bpm = 600ms
const sfx_sprite = {
    backspace           : [600 * 0,  600],
    enter               : [600 * 1,  600],
    tab                 : [600 * 2,  600],
    question            : [600 * 3,  600],
    exclamation         : [600 * 4,  600],
    at                  : [600 * 5,  600],
    pound               : [600 * 6,  600],
    dollar              : [600 * 7,  600],
    caret               : [600 * 8,  600],
    ampersand           : [600 * 9,  600],
    asterisk            : [600 * 10, 600],
    parenthesis_open    : [600 * 11, 600],
    parenthesis_closed  : [600 * 12, 600],
    bracket_open        : [600 * 13, 600],
    bracket_closed      : [600 * 14, 600],
    brace_open          : [600 * 15, 600],
    brace_closed        : [600 * 16, 600],
    tilde               : [600 * 17, 600],
    default             : [600 * 18, 600],
    arrow_left          : [600 * 19, 600],
    arrow_up            : [600 * 20, 600],
    arrow_right         : [600 * 21, 600],
    arrow_down          : [600 * 22, 600],
    slash_forward       : [600 * 23, 600],
    slash_back          : [600 * 24, 600],
    percent             : [600 * 25, 600]
}
//endregion

function createAudioInstance(fileName, sprite = null) {
    return new Howl({
        src: [path.join(audio_path, fileName + file_type)], sprite,
        onloaderror: (id, err) => console.error('Load error:', err)
    });
}
function buildSoundBanks() {
    const voices = ['f1', 'f2', 'f3', 'f4', 'm1', 'm2', 'm3', 'm4'];

    const instrumentVoices = ['girl', 'boy', 'cranky', 'kk_slider'];
    const instruments = ['organ', 'guitar', 'e_piano', 'synth', 'whistle'];

    const bank = {};
    for (const voice of voices) bank[voice] = createAudioInstance(`voice/${voice}`, voice_sprite)

    bank['inst'] = {}
    for (const inst of instrumentVoices) bank.inst[inst] = createAudioInstance(`instrument/${inst}`, sing); 
    for (const inst of instruments) bank.inst[inst] = createAudioInstance(`instrument/${inst}`);

    bank['sfx'] = createAudioInstance('sfx', sfx_sprite);
    return bank;
}

function releaseSound(release_id, cut = true) {
    if (cut) cutOffAudio(waitingForRelease[release_id], 0.15);
    delete waitingForRelease[release_id];
}

function applyIntonation(bank, id, intonation, currentRate, ramp = 2) {
const duration = 3200; // ms duration for ramp
    const startRate = currentRate;
    const endRate = startRate * (
        intonation >= 0
            ? 1 + intonation * 3
            : 1 - ((Math.sqrt(Math.abs(1 - intonation * 3)) - 1) * 0.75)
    );
    const steps = 64;
    const interval = duration / steps;

    for (let i = 1; i <= steps; i++) {
        const t = i / steps;

        let easedT;
        if (ramp < 0) easedT = Math.pow(t, 1 - ramp); // ease-in
        else if (ramp > 0) easedT = 1 - Math.pow(1 - t, 1 + ramp); // ease-out
        else easedT = t; // linear
    
        const rate = startRate * ((endRate / startRate) ** easedT);

        setTimeout(() => bank.rate(rate, id), i * interval);
    }
}

// audio channel cutoff logic
function cutOffAudio(audio, release=0.025) {
    CUTOFF_DURATION=release;
    const prev = audio;
    if (!prev || !prev.bank.playing(prev.id)) return;

    prev.bank.fade(prev.bank.volume(prev.id), 0, CUTOFF_DURATION * 1000, prev.id);
    setTimeout(() => prev.bank.stop(prev.id), CUTOFF_DURATION * 1000);
};

//#region Init Audio Manager
function createAudioManager() {

    const audioFileCache = {};
    const soundBanks = buildSoundBanks();

    // main audio playback function
    function playSound(path, {volume=1, pitchShift=0, pitchVariation=0, intonation=0, note=60, channel=undefined, hold=undefined, noRandom=false, yelling=false} = {}) {
        if (!path || path === '') return;
        if (waitingForRelease[hold]) return;

        if(path === '&.Gwah' && mode!==3) playSound('sfx.exclamation');
        if(path === '&.Deska' && mode!==3) playSound('sfx.question');

        const isVoice = path.startsWith('&');
        const isInstrument = path.startsWith('%');
        const isSfx = path.startsWith('sfx')
        
        if (mode===1 && isSfx) path = 'sfx.default';
        if (mode===2 && isVoice) path = 'sfx.default';
        if (mode===3 && !noRandom) {
            if (isVoice) { // play random animalese sound
                const sounds = Object.assign(Object.keys(voice_sprite))
                path = `&.${ sounds[Math.floor(Math.random() * 26)] }`;
            }
            else if (isInstrument) { // play random note pitch
                path = `%.${ Math.floor(Math.random() * 36) + 36 }`;
            }
            else if (isSfx) { // play random sound effect
                const sounds = Object.keys(sfx_sprite)
                path = `sfx.${ sounds[Math.floor(Math.random() * sounds.length)] }`;
            }
        }

        if (isInstrument) {
            const parsedNote = parseInt(path.replace('%.', ''));
            note = isNaN(parsedNote) ? note : parsedNote;
            if ( mode===2 ) path = 'inst.guitar'
            else  path = 'inst.'+instrument;
        }

        if (isVoice ) { // apply animalese voice profile
            volume = yelling? .75: .65;
            pitchShift = (yelling? 1.5: 0) + v.pitch_shift;
            pitchVariation = (yelling? 1: 0) +  v.pitch_variation;
            intonation = v.intonation;
            channel = channel ?? 1;
            path = path.replace('&', v.voice_type);
        }

        const parts = path.split(".");
        let bank, sprite;
        
        //parse audio identifier
        switch (parts.length) {
            case 1: {
                if (audioFileCache[path]) bank = audioFileCache[path];  
                else {
                    bank = new Howl({
                        src: [audio_path + path + file_type],
                        onloaderror: (id, err) => console.warn(`Load error for ${path}:`)
                    });
                    audioFileCache[path] = bank;
                }
                break;
            }
            case 2: {
                const [bankKey, soundName] = parts;
                bank = soundBanks[bankKey];
                sprite = soundName;
                break;
            }
            case 3: {
                const [bankKey, typeKey, soundName] = parts;
                bank = soundBanks[bankKey]?.[typeKey];
                sprite = soundName;
                break;
            }
            default:
                console.warn(`Unrecognized audio path format: ${path}`);
                return;
        }

        if (isInstrument){
            bank = bank[`${sprite}`];
            if (bank._sprite.length === 0) bank._sprite = {[`${sprite}`]: [0, 1000]};
            else {
                const sounds = Object.keys(bank._sprite);
                sprite = `${ sounds[Math.floor(Math.random() * sounds.length)] }`;
            }
        } 

        if (!bank) {
            console.warn(`Sound not found: ${path}`);
            return;
        }
        if (channel !== undefined) cutOffAudio(activeChannels[channel]);

        // play the audio
        const id = (bank._sprite) ? bank.play(sprite) : bank.play();

        // apply volume
        bank.volume(master_volume*volume, id);

        // calculate pitch with variation
        const finalPitch = (note - 60) + pitchShift + (Math.random()*2-1.0)*pitchVariation;
        const rate = Math.pow(2, finalPitch / 12.0);
        bank.rate(rate, id);
        
        // apply intonation
        if (intonation !== undefined) applyIntonation(bank, id, intonation, bank.rate(id));
        // add this sound to a cutoff channel
        if (channel !== undefined) activeChannels[channel] = { bank, id };
        if (hold !== undefined) waitingForRelease[hold] = { bank, id };
    }
    return { play: playSound, release: releaseSound };
}

module.exports = { createAudioManager };
//#endregion