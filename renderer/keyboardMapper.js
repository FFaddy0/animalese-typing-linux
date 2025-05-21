const noneLayout = []

const voiceLayout = [
    [
        {label:'A', btnType:'s', sound:`&.voice.a`},
        {label:'B', btnType:'s', sound:`&.voice.b`},
        {label:'C', btnType:'s', sound:`&.voice.c`},
        {label:'D', btnType:'s', sound:`&.voice.d`},
        {label:'E', btnType:'s', sound:`&.voice.e`},
        {label:'F', btnType:'s', sound:`&.voice.f`},
        {label:'G', btnType:'s', sound:`&.voice.g`},
        {label:'H', btnType:'s', sound:`&.voice.h`},
        {label:'I', btnType:'s', sound:`&.voice.i`},
        {label:'J', btnType:'s', sound:`&.voice.j`},
        {label:'K', btnType:'s', sound:`&.voice.k`},
        {label:'L', btnType:'s', sound:`&.voice.l`},
        {label:'M', btnType:'s', sound:`&.voice.m`}
    ],
    [
        {label:'N', btnType:'s', sound:`&.voice.n`},
        {label:'O', btnType:'s', sound:`&.voice.o`},
        {label:'P', btnType:'s', sound:`&.voice.p`},
        {label:'Q', btnType:'s', sound:`&.voice.q`},
        {label:'R', btnType:'s', sound:`&.voice.r`},
        {label:'S', btnType:'s', sound:`&.voice.s`},
        {label:'T', btnType:'s', sound:`&.voice.t`},
        {label:'U', btnType:'s', sound:`&.voice.u`},
        {label:'V', btnType:'s', sound:`&.voice.v`},
        {label:'W', btnType:'s', sound:`&.voice.w`},
        {label:'X', btnType:'s', sound:`&.voice.x`},
        {label:'Y', btnType:'s', sound:`&.voice.y`},
        {label:'Z', btnType:'s', sound:`&.voice.z`}
    ],
    //TODO: create more phonemes
    [
        {label:'AA', btnType:'s', sound:`&.voice.a`},
        {label:'AE', btnType:'s', sound:`&.voice.a`},
        {label:'CH', btnType:'s', sound:`&.voice.a`},
        {label:'EH', btnType:'s', sound:`&.voice.a`},
        {label:'EU', btnType:'s', sound:`&.voice.a`},
        {label:'IE', btnType:'s', sound:`&.voice.a`},
        {label:'KH', btnType:'s', sound:`&.voice.a`},
        {label:'NG', btnType:'s', sound:`&.voice.a`},
        {label:'SH', btnType:'s', sound:`&.voice.a`},
        {label:'WA', btnType:'s', sound:`&.voice.a`},
        {label:'WA', btnType:'s', sound:`&.voice.a`},
        {label:'WE', btnType:'s', sound:`&.voice.a`},
        {label:'WI', btnType:'s', sound:`&.voice.a`}
    ],
    [
        {label:'WO', btnType:'s', sound:`&.voice.a`},
        {label:'Y', btnType:'s', sound:`&.voice.a`},
        {label:'YA', btnType:'s', sound:`&.voice.a`},
        {label:'YAE', btnType:'s', sound:`&.voice.a`},
        {label:'YEH', btnType:'s', sound:`&.voice.a`},
        {label:'YEO', btnType:'s', sound:`&.voice.a`},
        {label:'YO', btnType:'s', sound:`&.voice.a`},
        {label:'YU', btnType:'s', sound:`&.voice.a`},
    ]
];

const pianoLayout = [
    {label:'C4', btnType:'l',sound:'&.sing.C4'},
    {label:'Db4', btnType:'b',sound:'&.sing.Db4'},
    {label:'D4', btnType:'m',sound:'&.sing.D4'},
    {label:'Eb4', btnType:'b',sound:'&.sing.Eb4'},
    {label:'E4', btnType:'r',sound:'&.sing.E4'},
    {label:'F4', btnType:'l',sound:'&.sing.F4'},
    {label:'Gb4', btnType:'b',sound:'&.sing.Gb4'},
    {label:'G4', btnType:'m',sound:'&.sing.G4'},
    {label:'Ab4', btnType:'b',sound:'&.sing.Ab4'},
    {label:'A4', btnType:'m',sound:'&.sing.A4'},
    {label:'Bb4', btnType:'b',sound:'&.sing.Bb4'},
    {label:'B4', btnType:'r',sound:'&.sing.B4'},
    {label:'C5', btnType:'l',sound:'&.sing.C5'},
    {label:'Db5', btnType:'b',sound:'&.sing.Db5'},
    {label:'D5', btnType:'m',sound:'&.sing.D5'},
    {label:'Eb5', btnType:'b',sound:'&.sing.Eb5'},
    {label:'E5', btnType:'r',sound:'&.sing.E5'},
    {label:'F5', btnType:'l',sound:'&.sing.F5'},
    {label:'Gb5', btnType:'b',sound:'&.sing.Gb5'},
    {label:'G5', btnType:'m',sound:'&.sing.G5'},
    {label:'Ab5', btnType:'b',sound:'&.sing.Ab5'},
    {label:'A5', btnType:'r',sound:'&.sing.A5'}
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
        const back = $(`<div id="paino_back"></div>`);
        const keys = $(`<div id="paino_keys"></div>`);
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
    }
});

function press(btn, holdKey=false) {
    if (!btn.classList.contains('pressed')) {
        const sound = btn.getAttribute('sound') ?? 'sfx.default';
        const label = btn.getAttribute('label') ?? '';
        btn.classList.add('pressed');
        if (holdKey) {
            window.audio.play(sound, {hold: 0});
        }
        else {
            window.audio.play(sound);
            setTimeout(() => btn.classList.remove('pressed'), 100);
            setTimeout(() => btn.classList.remove('pressed'), 100);
        }
        window.api.sendRemapData({
            label: label,
            sound: sound
        });
    }
}

function release(btn) {
    btn.classList.remove('pressed');
    window.audio.release(0);
}