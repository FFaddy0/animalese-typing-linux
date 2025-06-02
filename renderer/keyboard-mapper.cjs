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
        {label:'OK', btnType:'s', sound:`&.OK`},
        {label:'Gwah', btnType:'m', sound:`&.Gwah`},
        {label:'Deska', btnType:'m', sound:`&.Deska`},
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

        function scrollPianoKeys() {
            if (scrollDirection !== 0) {
                piano_keys.scrollLeft += scrollDirection;
                animationFrameId = requestAnimationFrame(scrollPianoKeys);
            }
        }

        piano_keys.addEventListener('mousemove', (e) => {
            const bounds = piano_keys.getBoundingClientRect();
            const x = e.clientX - bounds.left;
            const threshold = bounds.width * 0.15;
            const maxSpeed = 10;

            if (x < threshold) scrollDirection = -maxSpeed * (1 - x / threshold);
            else if (x > bounds.width - threshold) scrollDirection = maxSpeed * ((x - (bounds.width - threshold)) / threshold);
            else scrollDirection = 0;

            if (scrollDirection !== 0 && !animationFrameId) {
                animationFrameId = requestAnimationFrame(scrollPianoKeys);
            }
            if (scrollDirection === 0 && animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        });

        piano_keys.addEventListener('mouseleave', () => {
            scrollDirection = 0;
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
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