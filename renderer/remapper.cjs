const currentMapping = preferences.get('remapped_keys');
const defatulMapping = window.api.getDefaultMapping();

console.log(currentMapping);

function renderSoundToKeysTable(mapping) {
    const tbody = document.querySelector('#remap-table tbody');
    tbody.innerHTML = '';

    const combos = [
        { label: '', prop: 'sound' },
        { label: 'Shift + ', prop: 'shiftSound' },
        { label: 'Ctrl + ', prop: 'ctrlSound' },
        { label: 'Alt + ', prop: 'altSound' }
    ];

    // sound -> [key combos]
    const soundMap = {};

    Object.entries(mapping).forEach(([keycode, map]) => {
        combos.forEach(({ label, prop }) => {
            if (Object.prototype.hasOwnProperty.call(map, prop)) {
                let sound = map[prop];
                if (sound && sound.trim() !== '') {
                    const comboLabel = `${label}${map.key}`;
                    if (!soundMap[sound]) soundMap[sound] = [];
                    soundMap[sound].push(comboLabel);
                }
            }
        });
    });

    Object.entries(soundMap).forEach(([sound, combos]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${sound}</td>
            <td>${combos.join('<br>')}</td>
        `;
        tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderSoundToKeysTable(defatulMapping);
});

/** example of `defatulMapping`
 * {
    "8": {
        "key": "Backspace",
        "sound": "sfx.backspace",
        "shiftSound": "sfx.backspace",
        "ctrlSound": "",
        "altSound": ""
    },
    "9": {
        "key": "Tab",
        "sound": "sfx.tab",
        "shiftSound": "sfx.tab",
        "ctrlSound": "",
        "altSound": ""
    },
    "13": {
        "key": "Num Enter",
        "sound": "sfx.enter",
        "shiftSound": "sfx.enter",
        "ctrlSound": "",
        "altSound": ""
    },
    "19": {
        "key": "Pause",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "20": {
        "key": "Caps Lock",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "27": {
        "key": "Esc",
        "sound": "sfx.enter",
        "shiftSound": "sfx.enter",
        "ctrlSound": "",
        "altSound": ""
    },
    "32": {
        "key": "Space",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "33": {
        "key": "PageUp",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "34": {
        "key": "PageDown",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "35": {
        "key": "End",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "36": {
        "key": "Home",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "37": {
        "key": "Left",
        "sound": "sfx.arrow_left",
        "shiftSound": "sfx.arrow_left",
        "ctrlSound": "",
        "altSound": ""
    },
    "38": {
        "key": "Up",
        "sound": "sfx.arrow_up",
        "shiftSound": "sfx.arrow_up",
        "ctrlSound": "",
        "altSound": ""
    },
    "39": {
        "key": "Right",
        "sound": "sfx.arrow_right",
        "shiftSound": "sfx.arrow_right",
        "ctrlSound": "",
        "altSound": ""
    },
    "40": {
        "key": "Down",
        "sound": "sfx.arrow_down",
        "shiftSound": "sfx.arrow_down",
        "ctrlSound": "",
        "altSound": ""
    },
    "44": {
        "key": "Print Screen",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "45": {
        "key": "Insert",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "46": {
        "key": "Delete",
        "sound": "sfx.at",
        "shiftSound": "sfx.at",
        "ctrlSound": "",
        "altSound": ""
    },
    "48": {
        "key": "0",
        "sound": "%.76",
        "shiftSound": "sfx.parenthesis_closed",
        "ctrlSound": "%.77",
        "altSound": ""
    },
    "49": {
        "key": "1",
        "sound": "%.60",
        "shiftSound": "&.Gwah",
        "ctrlSound": "%.61",
        "altSound": ""
    },
    "50": {
        "key": "2",
        "sound": "%.62",
        "shiftSound": "sfx.at",
        "ctrlSound": "%.63",
        "altSound": ""
    },
    "51": {
        "key": "3",
        "sound": "%.64",
        "shiftSound": "sfx.pound",
        "ctrlSound": "%.65",
        "altSound": ""
    },
    "52": {
        "key": "4",
        "sound": "%.65",
        "shiftSound": "sfx.dollar",
        "ctrlSound": "%.66",
        "altSound": ""
    },
    "53": {
        "key": "5",
        "sound": "%.67",
        "shiftSound": "sfx.percent",
        "ctrlSound": "%.68",
        "altSound": ""
    },
    "54": {
        "key": "6",
        "sound": "%.69",
        "shiftSound": "sfx.caret",
        "ctrlSound": "%.70",
        "altSound": ""
    },
    "55": {
        "key": "7",
        "sound": "%.71",
        "shiftSound": "sfx.ampersand",
        "ctrlSound": "%.72",
        "altSound": ""
    },
    "56": {
        "key": "8",
        "sound": "%.72",
        "shiftSound": "sfx.asterisk",
        "ctrlSound": "%.73",
        "altSound": ""
    },
    "57": {
        "key": "9",
        "sound": "%.74",
        "shiftSound": "sfx.parenthesis_open",
        "ctrlSound": "%.75",
        "altSound": ""
    },
    "65": {
        "key": "a",
        "sound": "&.a",
        "shiftSound": "&.a",
        "ctrlSound": "sfx.parenthesis_open",
        "altSound": ""
    },
    "66": {
        "key": "b",
        "sound": "&.b",
        "shiftSound": "&.b",
        "ctrlSound": "",
        "altSound": ""
    },
    "67": {
        "key": "c",
        "sound": "&.c",
        "shiftSound": "&.c",
        "ctrlSound": "sfx.slash_forward",
        "altSound": ""
    },
    "68": {
        "key": "d",
        "sound": "&.d",
        "shiftSound": "&.d",
        "ctrlSound": "",
        "altSound": ""
    },
    "69": {
        "key": "e",
        "sound": "&.e",
        "shiftSound": "&.e",
        "ctrlSound": "",
        "altSound": ""
    },
    "70": {
        "key": "f",
        "sound": "&.f",
        "shiftSound": "&.f",
        "ctrlSound": "",
        "altSound": ""
    },
    "71": {
        "key": "g",
        "sound": "&.g",
        "shiftSound": "&.g",
        "ctrlSound": "",
        "altSound": ""
    },
    "72": {
        "key": "h",
        "sound": "&.h",
        "shiftSound": "&.h",
        "ctrlSound": "",
        "altSound": ""
    },
    "73": {
        "key": "i",
        "sound": "&.i",
        "shiftSound": "&.i",
        "ctrlSound": "",
        "altSound": ""
    },
    "74": {
        "key": "j",
        "sound": "&.j",
        "shiftSound": "&.j",
        "ctrlSound": "",
        "altSound": ""
    },
    "75": {
        "key": "k",
        "sound": "&.k",
        "shiftSound": "&.k",
        "ctrlSound": "",
        "altSound": ""
    },
    "76": {
        "key": "l",
        "sound": "&.l",
        "shiftSound": "&.l",
        "ctrlSound": "",
        "altSound": ""
    },
    "77": {
        "key": "m",
        "sound": "&.m",
        "shiftSound": "&.m",
        "ctrlSound": "",
        "altSound": ""
    },
    "78": {
        "key": "n",
        "sound": "&.n",
        "shiftSound": "&.n",
        "ctrlSound": "",
        "altSound": ""
    },
    "79": {
        "key": "o",
        "sound": "&.o",
        "shiftSound": "&.o",
        "ctrlSound": "",
        "altSound": ""
    },
    "80": {
        "key": "p",
        "sound": "&.p",
        "shiftSound": "&.p",
        "ctrlSound": "",
        "altSound": ""
    },
    "81": {
        "key": "q",
        "sound": "&.q",
        "shiftSound": "&.q",
        "ctrlSound": "",
        "altSound": ""
    },
    "82": {
        "key": "r",
        "sound": "&.r",
        "shiftSound": "&.r",
        "ctrlSound": "",
        "altSound": ""
    },
    "83": {
        "key": "s",
        "sound": "&.s",
        "shiftSound": "&.s",
        "ctrlSound": "sfx.asterisk",
        "altSound": ""
    },
    "84": {
        "key": "t",
        "sound": "&.t",
        "shiftSound": "&.t",
        "ctrlSound": "",
        "altSound": ""
    },
    "85": {
        "key": "u",
        "sound": "&.u",
        "shiftSound": "&.u",
        "ctrlSound": "",
        "altSound": ""
    },
    "86": {
        "key": "v",
        "sound": "&.v",
        "shiftSound": "&.v",
        "ctrlSound": "sfx.pound",
        "altSound": ""
    },
    "87": {
        "key": "w",
        "sound": "&.w",
        "shiftSound": "&.w",
        "ctrlSound": "",
        "altSound": ""
    },
    "88": {
        "key": "x",
        "sound": "&.x",
        "shiftSound": "&.x",
        "ctrlSound": "sfx.at",
        "altSound": ""
    },
    "89": {
        "key": "y",
        "sound": "&.y",
        "shiftSound": "&.y",
        "ctrlSound": "sfx.ampersand",
        "altSound": ""
    },
    "90": {
        "key": "z",
        "sound": "&.z",
        "shiftSound": "&.z",
        "ctrlSound": "sfx.ampersand",
        "altSound": ""
    },
    "91": {
        "key": "Meta",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "92": {
        "key": "Meta",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "93": {
        "key": "Menu",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "96": {
        "key": "Num 0",
        "sound": "%.58",
        "shiftSound": "%.58",
        "ctrlSound": "",
        "altSound": ""
    },
    "97": {
        "key": "Num 1",
        "sound": "%.60",
        "shiftSound": "%.60",
        "ctrlSound": "",
        "altSound": ""
    },
    "98": {
        "key": "Num 2",
        "sound": "%.62",
        "shiftSound": "%.62",
        "ctrlSound": "",
        "altSound": ""
    },
    "99": {
        "key": "Num 3",
        "sound": "%.63",
        "shiftSound": "%.63",
        "ctrlSound": "",
        "altSound": ""
    },
    "100": {
        "key": "Num 4",
        "sound": "%.65",
        "shiftSound": "%.65",
        "ctrlSound": "",
        "altSound": ""
    },
    "101": {
        "key": "Num 5",
        "sound": "%.67",
        "shiftSound": "%.67",
        "ctrlSound": "",
        "altSound": ""
    },
    "102": {
        "key": "Num 6",
        "sound": "%.68",
        "shiftSound": "%.68",
        "ctrlSound": "",
        "altSound": ""
    },
    "103": {
        "key": "Num 7",
        "sound": "%.70",
        "shiftSound": "%.70",
        "ctrlSound": "",
        "altSound": ""
    },
    "104": {
        "key": "Num 8",
        "sound": "%.72",
        "shiftSound": "%.72",
        "ctrlSound": "",
        "altSound": ""
    },
    "105": {
        "key": "Num 9",
        "sound": "%.74",
        "shiftSound": "%.74",
        "ctrlSound": "",
        "altSound": ""
    },
    "106": {
        "key": "Num *",
        "sound": "sfx.asterisk",
        "shiftSound": "sfx.asterisk",
        "ctrlSound": "",
        "altSound": ""
    },
    "107": {
        "key": "Num +",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "109": {
        "key": "Num -",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "110": {
        "key": "Num .",
        "sound": "sfx.default",
        "shiftSound": "sfx.default",
        "ctrlSound": "",
        "altSound": ""
    },
    "111": {
        "key": "Num /",
        "sound": "sfx.slash_forward",
        "shiftSound": "sfx.slash_forward",
        "ctrlSound": "",
        "altSound": ""
    },
    "112": {
        "key": "F1",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "113": {
        "key": "F2",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "114": {
        "key": "F3",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "115": {
        "key": "F4",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "116": {
        "key": "F5",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "117": {
        "key": "F6",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "118": {
        "key": "F7",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "119": {
        "key": "F8",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "120": {
        "key": "F9",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "121": {
        "key": "F10",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "122": {
        "key": "F11",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "123": {
        "key": "F12",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "124": {
        "key": "F13",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "125": {
        "key": "F14",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "126": {
        "key": "F15",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "144": {
        "key": "Num Lock",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "145": {
        "key": "Scroll Lock",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "160": {
        "key": "Shift",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "161": {
        "key": "Shift",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "162": {
        "key": "Ctrl",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "163": {
        "key": "Ctrl",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "164": {
        "key": "Alt",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "165": {
        "key": "Alt",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "173": {
        "key": "Vol Mute",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "174": {
        "key": "Vol Down",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "175": {
        "key": "Vol Up",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "176": {
        "key": "Next",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "177": {
        "key": "Prev",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "179": {
        "key": "Play",
        "sound": "",
        "shiftSound": "",
        "ctrlSound": "",
        "altSound": ""
    },
    "186": {
        "key": ";",
        "sound": "sfx.default",
        "shiftSound": "sfx.default",
        "ctrlSound": "",
        "altSound": ""
    },
    "187": {
        "key": "=",
        "sound": "%.79",
        "shiftSound": "sfx.default",
        "ctrlSound": "%.80",
        "altSound": ""
    },
    "188": {
        "key": ",",
        "sound": "sfx.default",
        "shiftSound": "sfx.default",
        "ctrlSound": "",
        "altSound": ""
    },
    "189": {
        "key": "-",
        "sound": "%.77",
        "shiftSound": "sfx.default",
        "ctrlSound": "%.78",
        "altSound": ""
    },
    "190": {
        "key": ".",
        "sound": "sfx.default",
        "shiftSound": "sfx.default",
        "ctrlSound": "",
        "altSound": ""
    },
    "191": {
        "key": "/",
        "sound": "sfx.slash_forward",
        "shiftSound": "&.Deska",
        "ctrlSound": "",
        "altSound": ""
    },
    "192": {
        "key": "`",
        "sound": "",
        "shiftSound": "sfx.tilde",
        "ctrlSound": "",
        "altSound": ""
    },
    "219": {
        "key": "[",
        "sound": "sfx.bracket_open",
        "shiftSound": "sfx.brace_open",
        "ctrlSound": "",
        "altSound": ""
    },
    "220": {
        "key": "\\",
        "sound": "sfx.slash_back",
        "shiftSound": "sfx.default",
        "ctrlSound": "",
        "altSound": ""
    },
    "221": {
        "key": "]",
        "sound": "sfx.bracket_closed",
        "shiftSound": "sfx.brace_closed",
        "ctrlSound": "",
        "altSound": ""
    },
    "222": {
        "key": "'",
        "sound": "sfx.default",
        "shiftSound": "sfx.default",
        "ctrlSound": "",
        "altSound": ""
    }
}
 */