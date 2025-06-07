/**
 * author: joshxviii 
 */

//#region General setup
const preferences = window.settings;

document.addEventListener('DOMContentLoaded', () => {
    updateLanguage(preferences.get('lang'));
});

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

function updateLanguage(lang) {// language selection update
    preferences.set('lang', lang);
    window.translator.load(lang);
    window.translator.update();
}
//#endregion

//#region Key press detect
window.api.onKeyDown( (keyInfo) => {
    const { keycode, isCapsLock, isShiftDown, finalSound } = keyInfo;

    if (finalSound === undefined) return;
    const isVoice = finalSound.startsWith('&');
    const isInstrument = finalSound.startsWith('%');
    const isSfx = finalSound.startsWith('sfx')
    const options = {}
    if (!preferences.get('hold_repeat')) Object.assign(options, { hold: keycode });
    switch (true) {
        case ( isVoice ):
            // uppercase typing has higher pitch and variation
            Object.assign(options, {
                yelling: isCapsLock !== isShiftDown
            });
        break;
        // notes should always hold until released with keyup 
        case ( isInstrument ):
            Object.assign(options, {
                hold: keycode,
                pitchShift: isCapsLock? -12 : 0
            });
        break;
    }
    window.audio.play(finalSound, options);
});
window.api.onKeyUp( (keyInfo) => {
    const { keycode, finalSound } = keyInfo;

    if (finalSound === undefined) return;
    switch (true) {
        case ( finalSound.startsWith('%') ):
            window.audio.release(keycode, true /* cutOff */)
        break;
        default:
            window.audio.release(keycode, false)
        break;
    }
});
//#endregion