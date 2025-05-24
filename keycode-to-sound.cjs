'use strict';

const platforms = {
  win32: 0,
  darwin: 1,
  linux: 2,
};

const keyDefinitions = [
  { keycodes: [49, 18, null], key: '1', sound: '&.sing.C4', shiftSound: 'sfx.exclamation' },
  { keycodes: [50, 19, null], key: '2', sound: '&.sing.D4', shiftSound: 'sfx.at' },
  { keycodes: [51, 20, null], key: '3', sound: '&.sing.E4', shiftSound: 'sfx.pound' },
  { keycodes: [52, 21, null], key: '4', sound: '&.sing.F4', shiftSound: 'sfx.dollar' },
  { keycodes: [53, 23, null], key: '5', sound: '&.sing.G4', shiftSound: 'sfx.percent' },
  { keycodes: [54, 22, null], key: '6', sound: '&.sing.A4', shiftSound: 'sfx.caret' },
  { keycodes: [55, 26, null], key: '7', sound: '&.sing.B4', shiftSound: 'sfx.ampersand' },
  { keycodes: [56, 28, null], key: '8', sound: '&.sing.C5', shiftSound: 'sfx.asterisk' },
  { keycodes: [57, 25, null], key: '9', sound: '&.sing.D5', shiftSound: 'sfx.parenthesis_open' },
  { keycodes: [48, 29, null], key: '0', sound: '&.sing.E5', shiftSound: 'sfx.parenthesis_closed' },
  //Letters
  { keycodes: [65, 0, null], key: 'a', sound: '&.voice.a', shiftSound: '' },
  { keycodes: [66, 11, null], key: 'b', sound: '&.voice.b', shiftSound: '' },
  { keycodes: [67, 8, null], key: 'c', sound: '&.voice.c', shiftSound: '' },
  { keycodes: [68, 2, null], key: 'd', sound: '&.voice.d', shiftSound: '' },
  { keycodes: [69, 14, null], key: 'e', sound: '&.voice.e', shiftSound: '' },
  { keycodes: [70, 3, null], key: 'f', sound: '&.voice.f', shiftSound: '' },
  { keycodes: [71, 5, null], key: 'g', sound: '&.voice.g', shiftSound: '' },
  { keycodes: [72, 4, null], key: 'h', sound: '&.voice.h', shiftSound: '' },
  { keycodes: [73, 34, null], key: 'i', sound: '&.voice.i', shiftSound: '' },
  { keycodes: [74, 38, null], key: 'j', sound: '&.voice.j', shiftSound: '' },
  { keycodes: [75, 40, null], key: 'k', sound: '&.voice.k', shiftSound: '' },
  { keycodes: [76, 37, null], key: 'l', sound: '&.voice.l', shiftSound: '' },
  { keycodes: [77, 46, null], key: 'm', sound: '&.voice.m', shiftSound: '' },
  { keycodes: [78, 45, null], key: 'n', sound: '&.voice.n', shiftSound: '' },
  { keycodes: [79, 31, null], key: 'o', sound: '&.voice.o', shiftSound: '' },
  { keycodes: [80, 35, null], key: 'p', sound: '&.voice.p', shiftSound: '' },
  { keycodes: [81, 12, null], key: 'q', sound: '&.voice.q', shiftSound: '' },
  { keycodes: [82, 15, null], key: 'r', sound: '&.voice.r', shiftSound: '' },
  { keycodes: [83, 1, null], key: 's', sound: '&.voice.s', shiftSound: '' },
  { keycodes: [84, 17, null], key: 't', sound: '&.voice.t', shiftSound: '' },
  { keycodes: [85, 32, null], key: 'u', sound: '&.voice.u', shiftSound: '' },
  { keycodes: [86, 9, null], key: 'v', sound: '&.voice.v', shiftSound: '' },
  { keycodes: [87, 13, null], key: 'w', sound: '&.voice.w', shiftSound: '' },
  { keycodes: [88, 7, null], key: 'x', sound: '&.voice.x', shiftSound: '' },
  { keycodes: [89, 16, null], key: 'y', sound: '&.voice.y', shiftSound: '' },
  { keycodes: [90, 6, null], key: 'z', sound: '&.voice.z', shiftSound: '' },
  // Function Keys
  { keycodes: [112, 122, null], key: 'F1', sound: '', shiftSound: '' },
  { keycodes: [113, 120, null], key: 'F2', sound: '', shiftSound: '' },
  { keycodes: [114, 99, null], key: 'F3', sound: '', shiftSound: '' },
  { keycodes: [115, 118, null], key: 'F4', sound: '', shiftSound: '' },
  { keycodes: [116, 96, null], key: 'F5', sound: '', shiftSound: '' },
  { keycodes: [117, 97, null], key: 'F6', sound: '', shiftSound: '' },
  { keycodes: [118, 98, null], key: 'F7', sound: '', shiftSound: '' },
  { keycodes: [119, 100, null], key: 'F8', sound: '', shiftSound: '' },
  { keycodes: [120, 101, null], key: 'F9', sound: '', shiftSound: '' },
  { keycodes: [121, 109, null], key: 'F10', sound: '', shiftSound: '' },
  { keycodes: [122, 103, null], key: 'F11', sound: '', shiftSound: '' },
  { keycodes: [123, 111, null], key: 'F12', sound: '', shiftSound: '' },
  { keycodes: [124, 105, null], key: 'F13', sound: '', shiftSound: '' },
  { keycodes: [125, 107, null], key: 'F14', sound: '', shiftSound: '' },
  { keycodes: [126, 113, null], key: 'F15', sound: '', shiftSound: '' },
  // Special Keys and Characters
  { keycodes: [27, 53, null], key: 'Esc', sound: 'sfx.enter', shiftSound: '' },
  { keycodes: [9, 48, null], key: 'Tab', sound: 'sfx.tab', shiftSound: '' },
  { keycodes: [20, 57, null], key: 'Caps Lock', sound: '', shiftSound: '' },
  { keycodes: [192, 50, null], key: '`', sound: '', shiftSound: 'sfx.tilde' },
  { keycodes: [189, 27, null], key: '-', sound: '&.sing.F5', shiftSound: 'sfx.default' },
  { keycodes: [187, 24, null], key: '=', sound: '&.sing.G5', shiftSound: 'sfx.default' },
  { keycodes: [219, 33, null], key: '[', sound: 'sfx.bracket_open', shiftSound: 'sfx.brace_open' },
  { keycodes: [221, 30, null], key: ']', sound: 'sfx.bracket_closed', shiftSound: 'sfx.brace_closed' },
  { keycodes: [220, 42, null], key: '\\', sound: 'sfx.slash_back', shiftSound: 'sfx.default' },
  { keycodes: [191, 44, null], key: '/', sound: 'sfx.slash_forward', shiftSound: 'sfx.question' },
  { keycodes: [186, 41, null], key: ';', sound: 'sfx.default', shiftSound: 'sfx.default' },
  { keycodes: [222, 39, null], key: '\'', sound: 'sfx.default', shiftSound: 'sfx.default' },
  { keycodes: [188, 43, null], key: ',', sound: 'sfx.default', shiftSound: 'sfx.default' },
  { keycodes: [190, 47, null], key: '.', sound: 'sfx.default', shiftSound: 'sfx.default' },
  { keycodes: [13, 36, null], key: 'Enter', sound: 'sfx.enter', shiftSound: '' },
  { keycodes: [8, 51, null], key: 'Backspace', sound: 'sfx.backspace', shiftSound: '' },
  { keycodes: [32, 49, null], key: 'Space', sound: '', shiftSound: '' },
  // Navigation Keys
  { keycodes: [45, null, null], key: 'Insert', sound: '', shiftSound: '' },
  { keycodes: [46, 51, null], key: 'Delete', sound: '', shiftSound: '' },
  { keycodes: [36, 115, null], key: 'Home', sound: '', shiftSound: '' },
  { keycodes: [35, 119, null], key: 'End', sound: '', shiftSound: '' },
  { keycodes: [33, 116, null], key: 'PageUp', sound: '', shiftSound: '' },
  { keycodes: [34, 121, null], key: 'PageDown', sound: '', shiftSound: '' },
  { keycodes: [38, 126, null], key: 'Up', sound: 'sfx.arrow_up', shiftSound: '' },
  { keycodes: [37, 123, null], key: 'Left', sound: 'sfx.arrow_left', shiftSound: '' },
  { keycodes: [39, 124, null], key: 'Right', sound: 'sfx.arrow_right', shiftSound: '' },
  { keycodes: [40, 125, null], key: 'Down', sound: 'sfx.arrow_down', shiftSound: '' },
  // Modifier Keys
  { keycodes: [160, 56, null], key: 'Shift', sound: '', shiftSound: '' }, // Left Shift
  { keycodes: [161, 60, null], key: 'Shift', sound: '', shiftSound: '' }, // Right Shift
  { keycodes: [162, 59, null], key: 'Ctrl', sound: '', shiftSound: '' }, // Left Ctrl
  { keycodes: [163, 62, null], key: 'Ctrl', sound: '', shiftSound: '' }, // Right Ctrl
  { keycodes: [164, 58, null], key: 'Alt', sound: '', shiftSound: '' }, // Left Alt
  { keycodes: [165, 61, null], key: 'Alt', sound: '', shiftSound: '' }, // Right Alt
  { keycodes: [91, 55, null], key: 'Meta', sound: '', shiftSound: '' }, // Left Meta (Win/Cmd)
  { keycodes: [92, 54, null], key: 'Meta', sound: '', shiftSound: '' }, // Right Meta (Win/Cmd)
  { keycodes: [93, null, null], key: 'Menu', sound: '', shiftSound: '' },
  // Numpad Keys
  { keycodes: [144, 71, null], key: 'Num Lock', sound: '', shiftSound: '' },
  { keycodes: [111, 75, null], key: 'Num /', sound: '', shiftSound: '' },
  { keycodes: [106, 67, null], key: 'Num *', sound: '', shiftSound: '' },
  { keycodes: [109, 78, null], key: 'Num -', sound: '', shiftSound: '' },
  { keycodes: [107, 69, null], key: 'Num +', sound: '', shiftSound: '' },
  { keycodes: [13, 76, null], key: 'Num Enter', sound: 'sfx.enter', shiftSound: '' },
  { keycodes: [110, 65, null], key: 'Num .', sound: '', shiftSound: '' },
  { keycodes: [96, 82, null], key: 'Num 0', sound: '&.sing.Eb5', shiftSound: '' },
  { keycodes: [97, 83, null], key: 'Num 1', sound: '&.sing.C4', shiftSound: '' },
  { keycodes: [98, 84, null], key: 'Num 2', sound: '&.sing.D4', shiftSound: '' },
  { keycodes: [99, 85, null], key: 'Num 3', sound: '&.sing.Eb4', shiftSound: '' },
  { keycodes: [100, 86, null], key: 'Num 4', sound: '&.sing.F4', shiftSound: '' },
  { keycodes: [101, 87, null], key: 'Num 5', sound: '&.sing.G4', shiftSound: '' },
  { keycodes: [102, 88, null], key: 'Num 6', sound: '&.sing.Ab4', shiftSound: '' },
  { keycodes: [103, 89, null], key: 'Num 7', sound: '&.sing.Bb4', shiftSound: '' },
  { keycodes: [104, 91, null], key: 'Num 8', sound: '&.sing.C5', shiftSound: '' },
  { keycodes: [105, 92, null], key: 'Num 9', sound: '&.sing.D5', shiftSound: '' },
];

function buildKeyMap(platform) {
  const platformIdx = platforms[platform];
  if (platformIdx === undefined) throw new Error(`Unsupported platform: ${platform}`);

  const map = {};
  for (const def of keyDefinitions) {
    const code = def.keycodes[platformIdx];
    if (code == null) continue;

    map[code] = {
      key: def.key,
      sound: def.sound,
      shiftSound: def.shiftSound,
    };
  }
  return map;
}

module.exports = {
  win32: buildKeyMap('win32'),
  darwin: buildKeyMap('darwin'),
  linux: buildKeyMap('linux'),
};