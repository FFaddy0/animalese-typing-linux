const { Howl, Howler } = require('howler');
const path = require('path');
const { ipcRenderer } = require('electron');

// listens for volume changes and update master volume
ipcRenderer.on('updated-volume', (_, volume) => {
    Howler.volume(volume);
    Howler.masterGain.gain.value = volume * 2;
});

ipcRenderer.on('keyup', (_, e) => {
    releaseSound(e.keycode);
});

function releaseSound(release_id) {
    cutOffAudio(waitingForRelease[release_id], 0.075);
    delete waitingForRelease[release_id];
}

let v = ipcRenderer.sendSync('get-store-data-sync').voice_profile;
ipcRenderer.on('updated-voice_profile', (_, voice_profile) => v = voice_profile);
let mode = ipcRenderer.sendSync('get-store-data-sync').audio_mode;
ipcRenderer.on('updated-audio_mode', (_, audio_mode) => mode = audio_mode);


//TODO: convert file type from .wav to .acc
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
}

// TODO: change the note's pitch with js rather than having a different hard-coded sound per note.
// This will make adding custom sounds much easier later.
// (60,000) / 60bpm = 1000ms
const notes_sprite = {
    C4:  [1000 * 0,  1000],
    Db4: [1000 * 1,  1000],
    D4:  [1000 * 2,  1000],
    Eb4: [1000 * 3,  1000],
    E4:  [1000 * 4,  1000],
    F4:  [1000 * 5,  1000],
    Gb4: [1000 * 6,  1000],
    G4:  [1000 * 7,  1000],
    Ab4: [1000 * 8,  1000],
    A4:  [1000 * 9,  1000],
    Bb4: [1000 * 10, 1000],
    B4:  [1000 * 11, 1000],
    C5:  [1000 * 12, 1000],
    Db5: [1000 * 13, 1000],
    D5:  [1000 * 14, 1000],
    Eb5: [1000 * 15, 1000],
    E5:  [1000 * 16, 1000],
    F5:  [1000 * 17, 1000],
    Gb5: [1000 * 18, 1000],
    G5:  [1000 * 19, 1000],
    Ab5: [1000 * 20, 1000],
    A5:  [1000 * 21, 1000],
    Bb5: [1000 * 22, 1000],
    B5:  [1000 * 23, 1000],
}
// (60,000) / 100bpm = 600ms
const special_sprite = {
    OK:     [600 * 0, 600],
    Deska:  [600 * 1, 600],
    Gwah:   [600 * 2, 600]
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
    filePath = path.join(audio_path, fileName + file_type);
    return new Howl({
        src: [audio_path + fileName + file_type], sprite,
        onloaderror: (id, err) => console.error('Load error:', err)
    });
}
function buildSoundBanks() {
    const groups = ['f1', 'f2', 'f3', 'f4', 'm1', 'm2', 'm3', 'm4'];
    const bank = {};
    for (const group of groups) {
        bank[group] = {
            voice: createAudioInstance(`${group}_voice`, voice_sprite),
            sing: createAudioInstance(`${group}_sing`, notes_sprite),
            special: createAudioInstance(`${group}_special`, special_sprite)
        };
    }
    bank['sfx'] = createAudioInstance('sfx', sfx_sprite);
    return bank;
}
// audio intonation logic TODO
function applyIntonation(bank, id, intonation, currentRate) {
    const duration = 400; // ms duration for ramp
    const startRate = currentRate;
    const endRate = startRate*(1 + intonation * 0.8);
    const steps = 20;
    const interval = duration / steps;

    for (let i = 1; i <= steps; i++) {
        const progress = i / steps;
        const rate = startRate * Math.pow(endRate / startRate, progress);
        setTimeout(() => {
            bank.rate(rate, id);
        }, i * interval);
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
function createAudioManager(userVolume /* volume settings are passed in from [preload.js] */) {
    Howler.volume(userVolume);
    Howler.masterGain.gain.value = userVolume * 2;

    const audioFileCache = {};
    const soundBanks = buildSoundBanks();

    // main audio playback function
    function playSound(path, options = {/*volume, pitch_shift, pitch_variation, intonation, channel*/}) {
        if (!path || path === '') return;
        if (waitingForRelease[options.hold]) return;

        const isAnimalese = path.startsWith('&');
        const isSfx = path.startsWith('sfx')
        
        if (mode===1 && isSfx) path = 'sfx.default';
        if (mode===2 && isAnimalese) path = 'sfx.default';
        if (mode===3) {
            if (isAnimalese) {// play random animalese sound
                const sounds = Object.keys(voice_sprite)
                path = `&.voice.${ sounds[Math.floor(Math.random() * sounds.length)] }`;
            }
            else if (isSfx) {// play random sound effect
                const sounds = Object.keys(sfx_sprite)
                path = `sfx.${ sounds[Math.floor(Math.random() * sounds.length)] }`;
            }
        }

        if (isAnimalese) { // apply animalese voice profile
            const profileOptions = {
                pitch_shift: options.pitch_shift ?? v.pitch_shift,
                pitch_variation: options.pitch_variation ?? v.pitch_variation,
                intonation: options.intonation ?? v.intonation,
            };
            if (path.startsWith('&.voice')) {
                Object.assign(options, profileOptions, {
                    volume: options.volume ?? 0.65,
                    channel: options.channel ?? 1,
                });
            }
            else if (path.startsWith('&.special')) {
                Object.assign(options, profileOptions);
            } 
            else {
                Object.assign(options, {
                    volume: options.volume ?? 1.0,
                    channel: options.channel ?? path
                });
            }
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

        if (!bank) {
            console.warn(`Sound not found: ${path}`);
            return;
        }

        // AUDIO OPTIONS
        if (options.channel !== undefined) cutOffAudio(activeChannels[options.channel]);

        const id = (bank._sprite) ? bank.play(sprite) : bank.play();

        // apply volume
        if (options.volume !== undefined) bank.volume(options.volume, id);
        // calculate pitch with variation
        if (options.pitch_shift !== undefined || options.pitch_variation !== undefined) {
            const basePitch = options.pitch_shift ?? 0;
            const variation = options.pitch_variation ?? 0;
            const finalPitch = basePitch + (Math.random()*2-1.0)*variation;
            rate = Math.min(Math.max( Math.pow(2, finalPitch / 12.0) , 0.5), 2.0);
            bank.rate(rate, id);
        }
        // apply intonation
        if (options.intonation !== undefined) applyIntonation(bank, id, options.intonation, bank.rate(id));
        // add this sound to a cutoff channel
        if (options.channel !== undefined) activeChannels[options.channel] = { bank, id };
        if (options.hold !== undefined) waitingForRelease[options.hold] = { bank, id };
    }
    return { play: playSound, release: releaseSound };
}

module.exports = { createAudioManager };
//#endregion